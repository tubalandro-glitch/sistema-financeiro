# 🎯 DESAFIOS - Melhore Seu Dashboard!

Agora que você aprendeu como funciona, vamos **criar novos recursos**!

Cada desafio tem:
- 📝 Descrição
- 💡 Dicas
- 🎯 Objetivo
- 📊 Dificuldade

Comece do mais fácil!

---

## Desafio 1: Editar Movimentação ⭐ Fácil

**O que fazer:** Adicionar botão "Editar" para alterar movimentações

**Como:**

1. **No HTML** - Adicione um botão perto do Deletar:

```html
<button class="btn-editar" onclick="editarMovimentacao(${mov.id})">
    ✏️ Editar
</button>
```

2. **Em Python** - Crie rota para editar:

```python
@app.route('/editar/<int:id>', methods=['POST'])
def editar_movimentacao(id):
    dados = request.get_json()
    
    conexao = sqlite3.connect('banco.db')
    cursor = conexao.cursor()
    
    cursor.execute('''
        UPDATE movimentacoes 
        SET tipo = ?, categoria = ?, valor = ?, descricao = ?, data = ?
        WHERE id = ?
    ''', (dados['tipo'], dados['categoria'], dados['valor'], dados['descricao'], dados['data'], id))
    
    conexao.commit()
    conexao.close()
    
    return jsonify({'sucesso': True, 'mensagem': 'Movimentação editada!'})
```

3. **Em JavaScript** - Crie função:

```javascript
function editarMovimentacao(id) {
    // Pega a linha da tabela
    // Preenche o formulário com dados antigos
    // Ao clicar ADICIONAR, faz PATCH/PUT em vez de POST
}
```

**Dificuldade:** ⭐

---

## Desafio 2: Filtro por Categoria ⭐⭐ Médio

**O que fazer:** Mostrar apenas gastos de uma categoria

**Como:**

1. **No HTML** - Adicione filtro:

```html
<select id="filtro-categoria" onchange="filtrarPorCategoria(this.value)">
    <option value="">Todas as categorias</option>
    <option value="Comida">Comida</option>
    <option value="Transporte">Transporte</option>
    ...
</select>
```

2. **Em Python** - Nova rota:

```python
@app.route('/filtro/<categoria>')
def filtrar_categoria(categoria):
    conexao = sqlite3.connect('banco.db')
    cursor = conexao.cursor()
    
    cursor.execute('SELECT * FROM movimentacoes WHERE categoria = ? ORDER BY data DESC', (categoria,))
    movimentacoes = cursor.fetchall()
    
    conexao.close()
    
    # Converter para JSON (igual ao /listar)
    lista = [...]
    return jsonify(lista)
```

3. **Em JavaScript**:

```javascript
function filtrarPorCategoria(categoria) {
    if (categoria === '') {
        listarMovimentacoes(); // Mostra todas
    } else {
        fetch(`/filtro/${categoria}`)
            .then(r => r.json())
            .then(dados => {
                // Preenche tabela com dados filtrados
            })
    }
}
```

**Dificuldade:** ⭐⭐

---

## Desafio 3: Filtro por Data ⭐⭐ Médio

**O que fazer:** Mostrar movimentações entre duas datas

**Como:**

1. **No HTML**:

```html
<input type="date" id="data-inicio" placeholder="De">
<input type="date" id="data-fim" placeholder="Até">
<button onclick="filtrarPorData()">Filtrar</button>
```

2. **Em Python**:

```python
@app.route('/filtro-data/<data_inicio>/<data_fim>')
def filtrar_data(data_inicio, data_fim):
    conexao = sqlite3.connect('banco.db')
    cursor = conexao.cursor()
    
    cursor.execute('''
        SELECT * FROM movimentacoes 
        WHERE data BETWEEN ? AND ? 
        ORDER BY data DESC
    ''', (data_inicio, data_fim))
    
    movimentacoes = cursor.fetchall()
    conexao.close()
    
    lista = [...]
    return jsonify(lista)
```

3. **Em JavaScript**:

```javascript
function filtrarPorData() {
    const dataInicio = document.getElementById('data-inicio').value;
    const dataFim = document.getElementById('data-fim').value;
    
    fetch(`/filtro-data/${dataInicio}/${dataFim}`)
        .then(r => r.json())
        .then(dados => {
            // Preenche tabela
        })
}
```

**Dificuldade:** ⭐⭐

---

## Desafio 4: Exportar para CSV ⭐⭐⭐ Difícil

**O que fazer:** Baixar os dados em arquivo Excel/CSV

**Como:**

1. **Em Python** - Instale biblioteca:

```bash
pip3 install openpyxl
```

2. **Crie rota**:

```python
from openpyxl import Workbook
from io import BytesIO
from flask import send_file

@app.route('/exportar')
def exportar_dados():
    conexao = sqlite3.connect('banco.db')
    cursor = conexao.cursor()
    
    cursor.execute('SELECT * FROM movimentacoes ORDER BY data DESC')
    movimentacoes = cursor.fetchall()
    conexao.close()
    
    # Criar arquivo Excel
    wb = Workbook()
    ws = wb.active
    
    # Cabeçalho
    ws.append(['Data', 'Tipo', 'Categoria', 'Descrição', 'Valor'])
    
    # Dados
    for mov in movimentacoes:
        ws.append([mov[5], mov[1], mov[2], mov[4], mov[3]])
    
    # Salvar na memória
    buffer = BytesIO()
    wb.save(buffer)
    buffer.seek(0)
    
    return send_file(buffer, mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', as_attachment=True, download_name='financeiro.xlsx')
```

3. **No HTML**:

```html
<a href="/exportar" class="btn-primario">📥 Exportar Excel</a>
```

**Dificuldade:** ⭐⭐⭐

---

## Desafio 5: Gráfico de Gastos ⭐⭐⭐ Difícil

**O que fazer:** Mostrar um gráfico de pizza de gastos por categoria

**Como:**

1. **No HTML** - Adicione biblioteca Chart.js:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<div class="grafico-container">
    <canvas id="grafico-categorias"></canvas>
</div>
```

2. **Em Python** - Nova rota:

```python
@app.route('/stats-categoria')
def stats_categoria():
    conexao = sqlite3.connect('banco.db')
    cursor = conexao.cursor()
    
    # Agrupar por categoria
    cursor.execute('''
        SELECT categoria, SUM(valor) as total
        FROM movimentacoes
        WHERE tipo = 'GASTO'
        GROUP BY categoria
        ORDER BY total DESC
    ''')
    
    dados = cursor.fetchall()
    conexao.close()
    
    categorias = [d[0] for d in dados]
    valores = [d[1] for d in dados]
    
    return jsonify({
        'categorias': categorias,
        'valores': valores
    })
```

3. **Em JavaScript**:

```javascript
function carregarGrafico() {
    fetch('/stats-categoria')
        .then(r => r.json())
        .then(dados => {
            const ctx = document.getElementById('grafico-categorias').getContext('2d');
            
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: dados.categorias,
                    datasets: [{
                        data: dados.valores,
                        backgroundColor: ['#ff4757', '#ffa502', '#ffd93d', '#6bcf7f', '#4d96ff']
                    }]
                }
            });
        })
}

// Chamar ao carregar
document.addEventListener('DOMContentLoaded', carregarGrafico);
```

**Dificuldade:** ⭐⭐⭐

---

## Desafio 6: Relatório Mensal ⭐⭐⭐ Difícil

**O que fazer:** Ver resumo de um mês específico (Total entrada, total gasto, saldo)

**Como:**

1. **No HTML**:

```html
<input type="month" id="mes-relatorio">
<button onclick="gerarRelatorio()">Gerar Relatório</button>

<div id="relatorio-resultado">
    <!-- Resultado aparece aqui -->
</div>
```

2. **Em Python**:

```python
@app.route('/relatorio/<mes>')  # mes formato: 2026-05
def relatorio_mes(mes):
    conexao = sqlite3.connect('banco.db')
    cursor = conexao.cursor()
    
    # Total entradas
    cursor.execute('''
        SELECT SUM(valor) FROM movimentacoes
        WHERE tipo = 'ENTRADA' AND strftime('%Y-%m', data) = ?
    ''', (mes,))
    entradas = cursor.fetchone()[0] or 0
    
    # Total gastos
    cursor.execute('''
        SELECT SUM(valor) FROM movimentacoes
        WHERE tipo = 'GASTO' AND strftime('%Y-%m', data) = ?
    ''', (mes,))
    gastos = cursor.fetchone()[0] or 0
    
    conexao.close()
    
    return jsonify({
        'mes': mes,
        'entradas': entradas,
        'gastos': gastos,
        'saldo': entradas - gastos
    })
```

3. **Em JavaScript**:

```javascript
function gerarRelatorio() {
    const mes = document.getElementById('mes-relatorio').value;
    
    fetch(`/relatorio/${mes}`)
        .then(r => r.json())
        .then(dados => {
            const html = `
                <h3>${dados.mes}</h3>
                <p>Entradas: R$ ${dados.entradas.toFixed(2)}</p>
                <p>Gastos: R$ ${dados.gastos.toFixed(2)}</p>
                <p><strong>Saldo: R$ ${dados.saldo.toFixed(2)}</strong></p>
            `;
            document.getElementById('relatorio-resultado').innerHTML = html;
        })
}
```

**Dificuldade:** ⭐⭐⭐

---

## Desafio 7: Dark Mode Alternável ⭐⭐⭐ Difícil

**O que fazer:** Botão para trocar entre dark mode e light mode

**Como:**

1. **Em CSS** - Use variáveis:

```css
:root {
    --bg-primary: #0f0f1e;
    --bg-secondary: #1a1a2e;
    --text-primary: #e0e0e0;
    --color-primary: #00d4ff;
}

body[data-theme="light"] {
    --bg-primary: #ffffff;
    --bg-secondary: #f5f5f5;
    --text-primary: #333333;
    --color-primary: #0066cc;
}

body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
}
```

2. **No HTML** - Adicione botão:

```html
<button onclick="alternarTema()" class="btn-tema">🌙 Tema</button>
```

3. **Em JavaScript**:

```javascript
function alternarTema() {
    const body = document.body;
    const temaPersistente = localStorage.getItem('tema') || 'dark';
    
    const novoTema = temaPersistente === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', novoTema);
    localStorage.setItem('tema', novoTema);
}

// Ao carregar página
document.addEventListener('DOMContentLoaded', () => {
    const tema = localStorage.getItem('tema') || 'dark';
    document.body.setAttribute('data-theme', tema);
});
```

**Dificuldade:** ⭐⭐⭐

---

## Desafio 8: Metas Financeiras ⭐⭐⭐⭐ Muito Difícil

**O que fazer:** Definir meta de gastos mensal e alertar quando aproximar

**Como:**

1. **Em Python** - Crie tabela:

```python
def criar_tabela_metas():
    conexao = sqlite3.connect('banco.db')
    cursor = conexao.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS metas (
            id INTEGER PRIMARY KEY,
            categoria TEXT NOT NULL,
            limite_mensal REAL NOT NULL,
            mes TEXT NOT NULL,
            UNIQUE(categoria, mes)
        )
    ''')
    
    conexao.commit()
    conexao.close()

criar_tabela_metas()
```

2. **Rotas para CRUD de metas**:

```python
@app.route('/meta/adicionar', methods=['POST'])
def adicionar_meta():
    dados = request.get_json()
    # INSERT na tabela metas

@app.route('/meta/alerta/<mes>/<categoria>')
def alerta_meta(mes, categoria):
    # Calcula gasto da categoria naquele mês
    # Compara com limite
    # Retorna percentual e status
```

3. **No HTML** - Seção de metas com barra de progresso

4. **Mostrar aviso** quando gasto > 80% da meta

**Dificuldade:** ⭐⭐⭐⭐

---

## Desafio 9: Sistema de Login ⭐⭐⭐⭐⭐ Muito Muito Difícil

**O que fazer:** Usuários com senhas, cada um vê seus dados

**Como:**

1. **Instale bibliotecas**:

```bash
pip3 install Flask-Login python-dotenv
```

2. **Crie tabela de usuários**:

```python
cursor.execute('''
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL
    )
''')
```

3. **Crie rota de registro**:

```python
from werkzeug.security import generate_password_hash, check_password_hash

@app.route('/registrar', methods=['POST'])
def registrar():
    dados = request.get_json()
    email = dados.get('email')
    senha = dados.get('senha')
    
    # Hash da senha
    senha_hash = generate_password_hash(senha)
    
    # Inserir usuário
    # ...
```

4. **Rota de login**:

```python
@app.route('/login', methods=['POST'])
def login():
    dados = request.get_json()
    email = dados.get('email')
    senha = dados.get('senha')
    
    # Buscar usuário
    # Verificar senha com check_password_hash
    # Criar session
```

**Dificuldade:** ⭐⭐⭐⭐⭐

---

## Dica: Comece Pequeno!

Não tente todos de uma vez!

**Ordem recomendada:**

1. ✅ Editar (fácil)
2. ✅ Filtro categoria (médio)
3. ✅ Filtro data (médio)
4. ✅ Gráfico (difícil mas satisfatório)
5. ✅ Dark mode (legal e útil)
6. ⏭️ Relatorio (mais desafiador)
7. ⏭️ Metas (muito código)
8. ⏭️ Login (projeto novo!)

---

## 🆘 Precisa de Ajuda?

1. **Leia APRENDA.md** - Tem explicações
2. **Console do Navegador** - F12 → Console (vê erros JavaScript)
3. **Terminal Python** - Rodando app.py (vê erros Python)
4. **Teste pequeno** - Teste 1 coisa por vez

---

## 🎉 Quando Terminar!

Compartilhe seu projeto! Pode:
- Enviar para GitHub
- Mostrar para amigos
- Criar read me explicando
- Adicionar mais desafios!

---

**Bom aprendizado! Você consegue! 💪**

