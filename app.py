from flask import Flask, render_template, request, jsonify
import sqlite3
import re
from datetime import datetime

app = Flask(__name__)

CATEGORIAS = [
    'Comida',
    'Transporte',
    'Contas',
    'Saúde',
    'Lazer',
    'Trabalho',
    'Educação',
    'Casa',
    'Investimentos',
    'Outro'
]

DB_PATH = 'banco.db'


def conectar_db():
    conexao = sqlite3.connect(DB_PATH)
    conexao.row_factory = sqlite3.Row
    return conexao


def criar_banco_dados():
    conexao = conectar_db()
    cursor = conexao.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS movimentacoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tipo TEXT NOT NULL,
            categoria TEXT NOT NULL,
            valor REAL NOT NULL,
            descricao TEXT DEFAULT '',
            data TEXT NOT NULL
        )
    ''')

    conexao.commit()
    conexao.close()


criar_banco_dados()


@app.route('/')
def home():
    return render_template('index.html', active_page='dashboard', categorias=CATEGORIAS)


@app.route('/configuracoes')
def configuracoes():
    return render_template('configuracoes.html', active_page='configuracoes')


@app.route('/relatorios')
def relatorios():
    mes = request.args.get('mes', '')
    categoria = request.args.get('categoria', '')

    if mes and not re.match(r'^\d{4}-\d{2}$', mes):
        mes = ''

    if categoria not in CATEGORIAS:
        categoria = ''

    condicoes = []
    parametros = []

    if mes:
        condicoes.append('data LIKE ?')
        parametros.append(f'{mes}%')

    if categoria:
        condicoes.append('categoria = ?')
        parametros.append(categoria)

    where = 'WHERE ' + ' AND '.join(condicoes) if condicoes else ''

    conexao = conectar_db()
    cursor = conexao.cursor()

    cursor.execute(f'SELECT * FROM movimentacoes {where} ORDER BY data DESC, id DESC', parametros)
    movimentacoes = [dict(row) for row in cursor.fetchall()]

    def buscar_total(tipo=None):
        filtros = list(condicoes)
        parametros_tipo = list(parametros)
        if tipo:
            filtros.append('tipo = ?')
            parametros_tipo.append(tipo)

        where_tipo = 'WHERE ' + ' AND '.join(filtros) if filtros else ''
        cursor.execute(f'SELECT SUM(valor) as total FROM movimentacoes {where_tipo}', parametros_tipo)
        return cursor.fetchone()['total'] or 0

    total_entradas = buscar_total('ENTRADA')
    total_gastos = buscar_total('GASTO')
    saldo = total_entradas - total_gastos

    filtros_gastos = list(condicoes)
    filtros_gastos.append('tipo = ?')
    where_gastos = 'WHERE ' + ' AND '.join(filtros_gastos)
    parametros_gastos = list(parametros) + ['GASTO']

    cursor.execute(
        f'SELECT categoria, SUM(valor) AS total FROM movimentacoes {where_gastos} GROUP BY categoria ORDER BY total DESC',
        parametros_gastos
    )
    categoria_gastos = [dict(row) for row in cursor.fetchall()]

    cursor.execute(
        f'SELECT categoria, SUM(valor) AS total FROM movimentacoes {where_gastos} GROUP BY categoria ORDER BY total DESC LIMIT 1',
        parametros_gastos
    )
    categoria_mais = cursor.fetchone()
    categoria_mais_gastos = categoria_mais['categoria'] if categoria_mais else 'Nenhuma'

    cursor.execute(f'SELECT tipo, SUM(valor) AS total FROM movimentacoes {where} GROUP BY tipo', parametros)
    tipo_totais = [dict(row) for row in cursor.fetchall()]

    cursor.execute(
        f'SELECT categoria, tipo, SUM(valor) AS total FROM movimentacoes {where} GROUP BY categoria, tipo',
        parametros
    )
    agrupamento = cursor.fetchall()

    categoria_map = {categoria: {'categoria': categoria, 'entrada': 0, 'gasto': 0} for categoria in CATEGORIAS}
    for row in agrupamento:
        categoria_nome = row['categoria']
        tipo = row['tipo']
        total = row['total'] or 0
        if tipo == 'ENTRADA':
            categoria_map[categoria_nome]['entrada'] = total
        else:
            categoria_map[categoria_nome]['gasto'] = total

    categoria_comparacao = [categoria_map[c] for c in CATEGORIAS if categoria_map[c]['entrada'] or categoria_map[c]['gasto']]

    conexao.close()

    return render_template(
        'relatorios.html',
        active_page='relatorios',
        categorias=CATEGORIAS,
        filtro_mes=mes,
        filtro_categoria=categoria,
        total_entradas=total_entradas,
        total_gastos=total_gastos,
        saldo=saldo,
        total_movimentacoes=len(movimentacoes),
        categoria_mais_gastos=categoria_mais_gastos,
        movimentacoes=movimentacoes,
        categoria_gastos=categoria_gastos,
        tipo_totais=tipo_totais,
        categoria_comparacao=categoria_comparacao
    )


@app.route('/adicionar', methods=['POST'])
def adicionar_movimentacao():
    try:
        dados = request.get_json()
        tipo = dados.get('tipo')
        categoria = dados.get('categoria')
        valor = dados.get('valor')
        descricao = dados.get('descricao', '').strip()
        data = dados.get('data')

        if not all([tipo, categoria, valor]):
            return jsonify({'sucesso': False, 'mensagem': 'Preencha todos os campos obrigatórios.'})

        if tipo not in ['ENTRADA', 'GASTO']:
            return jsonify({'sucesso': False, 'mensagem': 'Tipo inválido.'})

        if categoria not in CATEGORIAS:
            return jsonify({'sucesso': False, 'mensagem': 'Categoria inválida.'})

        try:
            valor = float(valor)
        except ValueError:
            return jsonify({'sucesso': False, 'mensagem': 'Valor deve ser um número.'})

        if valor <= 0:
            return jsonify({'sucesso': False, 'mensagem': 'Valor deve ser maior que zero.'})

        if not data:
            data = datetime.now().strftime('%Y-%m-%d')

        conexao = conectar_db()
        cursor = conexao.cursor()
        cursor.execute(
            'INSERT INTO movimentacoes (tipo, categoria, valor, descricao, data) VALUES (?, ?, ?, ?, ?)',
            (tipo, categoria, valor, descricao, data)
        )
        conexao.commit()
        conexao.close()

        return jsonify({'sucesso': True, 'mensagem': 'Movimentação adicionada com sucesso.'})
    except Exception as erro:
        return jsonify({'sucesso': False, 'mensagem': f'Erro: {str(erro)}'})


@app.route('/listar')
def listar_movimentacoes():
    try:
        conexao = conectar_db()
        cursor = conexao.cursor()
        cursor.execute('SELECT * FROM movimentacoes ORDER BY data DESC, id DESC')
        movimentacoes = [dict(row) for row in cursor.fetchall()]
        conexao.close()
        return jsonify(movimentacoes)
    except Exception as erro:
        return jsonify({'erro': str(erro)})


@app.route('/deletar/<int:id>', methods=['DELETE'])
def deletar_movimentacao(id):
    try:
        conexao = conectar_db()
        cursor = conexao.cursor()
        cursor.execute('DELETE FROM movimentacoes WHERE id = ?', (id,))
        conexao.commit()
        conexao.close()
        return jsonify({'sucesso': True, 'mensagem': 'Movimentação removida.'})
    except Exception as erro:
        return jsonify({'sucesso': False, 'mensagem': f'Erro: {str(erro)}'})


@app.route('/stats')
def obter_stats():
    try:
        conexao = conectar_db()
        cursor = conexao.cursor()
        cursor.execute('SELECT SUM(valor) FROM movimentacoes WHERE tipo = "ENTRADA"')
        total_entradas = cursor.fetchone()[0] or 0
        cursor.execute('SELECT SUM(valor) FROM movimentacoes WHERE tipo = "GASTO"')
        total_gastos = cursor.fetchone()[0] or 0
        conexao.close()
        saldo = total_entradas - total_gastos
        return jsonify({'total_entradas': total_entradas, 'total_gastos': total_gastos, 'saldo': saldo})
    except Exception as erro:
        return jsonify({'erro': str(erro)})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
