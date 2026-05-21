# 🐛 ERROS COMUNS - Como Resolver

Quando algo não funciona, procure aqui! 

---

## 🐛 Erro: "ModuleNotFoundError: No module named 'flask'"

### ❌ O Que Significa?

Python não conseguiu encontrar o Flask. Significa que Flask não está instalado.

### ✅ Como Resolver?

```bash
pip3 install flask
```

Se ainda não funcionar, tente:

```bash
pip install flask
```

Ou no Fedora:

```bash
sudo dnf install python3-flask
```

---

## 🐛 Erro: "Address already in use" ou "Port 5000 in use"

### ❌ O Que Significa?

Porta 5000 já está sendo usada por outro programa.

### ✅ Como Resolver?

**Opção 1:** Mude a porta em `app.py`:

```python
# Antes:
app.run(debug=True, host='0.0.0.0', port=5000)

# Depois:
app.run(debug=True, host='0.0.0.0', port=5001)
```

**Opção 2:** Encontre quem está usando a porta:

```bash
lsof -i :5000
```

Copie o PID (número) e mate o processo:

```bash
kill -9 NUMERO_DO_PID
```

---

## 🐛 Erro: "TemplateSyntaxError: unexpected '.'"

### ❌ O Que Significa?

Há um erro na sintaxe do HTML (provavelmente em `index.html`).

### ✅ Como Resolver?

Procure por `{{ url_for(...) }}` ou `{% ... %}` que estejam comentadas ou erradas.

**❌ Errado:**
```html
<link href="{{ url_for(...) }}" <!-- comentário aqui -->
```

**✅ Correto:**
```html
<!-- Comentário antes -->
<link href="{{ url_for(...) }}">
```

---

## 🐛 Erro: "No such table: movimentacoes"

### ❌ O Que Significa?

O banco de dados não foi criado ou a tabela não existe.

### ✅ Como Resolver?

**Opção 1:** Delete o arquivo `banco.db` e rode novamente:

```bash
rm banco.db
python3 app.py
```

**Opção 2:** Verifique se `criar_banco_dados()` é chamado em `app.py`:

```python
criar_banco_dados()  # Esta linha DEVE estar no app.py!
```

---

## 🐛 Erro: Tabela não mostra dados após adicionar

### ❌ O Que Significa?

Dados foram salvos mas a tabela não atualiza.

### ✅ Como Resolver?

Procure no **console do navegador** (F12):

1. Abra **F12** → **Console**
2. Veja se há erros em vermelho
3. Se houver, leia a mensagem cuidadosamente

**Possíveis problemas:**

1. JavaScript não executou `listarMovimentacoes()`
2. A rota `/listar` retornou erro
3. Tabela está vazia porque não tem `id="tabela-movimentacoes"`

Teste adicionando `console.log()`:

```javascript
function listarMovimentacoes() {
    console.log('Listando...');
    
    fetch('/listar')
        .then(r => r.json())
        .then(dados => {
            console.log('Dados recebidos:', dados);
            // resto do código
        })
}
```

---

## 🐛 Erro: Botão ADICIONAR não funciona

### ❌ O Que Significa?

Ao clicar em ADICIONAR, nada acontece.

### ✅ Como Resolver?

**Passo 1:** Verifique o Console (F12)

Se há erro JavaScript, ele estará lá.

**Passo 2:** Procure por:

```javascript
document.getElementById('formulario').addEventListener('submit', function(e) {
    e.preventDefault();
    // ... resto do código
})
```

Se isto não tiver, adicione!

**Passo 3:** Verifique se o formulário tem `id="formulario"`:

```html
<form class="formulario" id="formulario">  ✅ Correto
```

---

## 🐛 Erro: Cards não atualizam o valor

### ❌ O Que Significa?

Saldo, Entradas e Gastos não mudam.

### ✅ Como Resolver?

**Passo 1:** Verifique se função existe:

```javascript
function atualizarEstatisticas() {
    fetch('/stats')
        .then(r => r.json())
        .then(stats => {
            document.getElementById('saldo').textContent = ...
        })
}
```

**Passo 2:** Verifique se é chamada após adicionar:

```javascript
atualizarEstatisticas();  // DEVE estar aqui!
```

**Passo 3:** Verifique se os IDs existem no HTML:

```html
<p class="card-valor" id="saldo">R$ 0,00</p>  ✅
<p class="card-valor" id="entradas">R$ 0,00</p>  ✅
<p class="card-valor" id="gastos">R$ 0,00</p>  ✅
```

---

## 🐛 Erro: "TypeError: 'NoneType' object is not subscriptable"

### ❌ O Que Significa?

Python tentou acessar um item de algo que é `None` (vazio).

**Exemplo:**
```python
resultado = cursor.fetchone()  # Retorna None se não houver resultado
valor = resultado[0]  # ERRO! None[0] não existe
```

### ✅ Como Resolver?

Use `or 0`:

```python
total = cursor.fetchone()[0] or 0  # Se None, use 0
```

---

## 🐛 Erro: "SyntaxError: invalid syntax"

### ❌ O Que Significa?

Há um erro de digitação em Python (falta parêntese, vírgula, etc).

### ✅ Como Resolver?

Procure pelo número da linha que está no erro:

```
File "app.py", line 45, in criar_banco_dados
```

Abra `app.py` na linha 45 e procure por:
- Parênteses não fechados: `(`
- Aspas não fechadas: `"`
- Vírgulas faltando: `,`
- Dois pontos: `:`

---

## 🐛 Erro: Banco de dados "locked"

### ❌ O Que Significa?

Dois programas estão tentando usar o banco ao mesmo tempo.

### ✅ Como Resolver?

**Opção 1:** Reinicie o Flask:

```bash
CTRL + C
python3 app.py
```

**Opção 2:** Delete e recrie:

```bash
rm banco.db
python3 app.py
```

---

## 🐛 Erro: CSS não carrega (página sem cores)

### ❌ O Que Significa?

`style.css` não foi encontrado.

### ✅ Como Resolver?

**Passo 1:** Verifique se arquivo existe:

```bash
ls -la static/
```

Deve mostrar `style.css`.

**Passo 2:** No HTML, procure por:

```html
<link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
```

**Passo 3:** Se ainda não funcionar, tente acessar direto:

- Abra: `http://localhost:5000/static/style.css`
- Deve mostrar o código CSS

Se der 404, o arquivo não está em `static/`.

---

## 🐛 Erro: "BadRequest: 400 Bad Request"

### ❌ O Que Significa?

Requisição enviada incorretamente.

### ✅ Como Resolver?

Verifique o `fetch()` em JavaScript:

```javascript
fetch('/adicionar', {
    method: 'POST',              // ✅ Correto
    headers: {
        'Content-Type': 'application/json'  // ✅ Necessário
    },
    body: JSON.stringify({...})  // ✅ Necessário
})
```

---

## 🐛 Erro: Mensagem de sucesso não aparece

### ❌ O Que Significa?

Depois de adicionar, não mostra "✅ Adicionado!".

### ✅ Como Resolver?

Procure pela função:

```javascript
function mostrarMensagem(texto, tipo) {
    const elemento = document.getElementById('mensagem');
    elemento.textContent = texto;
    elemento.className = 'mensagem ' + tipo;
    elemento.style.display = 'block';
    
    setTimeout(() => {
        elemento.style.display = 'none';
    }, 3000);
}
```

Verifique se `<div id="mensagem">` existe no HTML:

```html
<div class="mensagem" id="mensagem" style="display: none;"></div>
```

---

## 🐛 Erro: Data aparece errada na tabela

### ❌ O Que Significa?

Data aparece como `2026-05-20` em vez de `20/05/2026`.

### ✅ Como Resolver?

Procure no JavaScript:

```javascript
const dataFormatada = new Date(mov.data).toLocaleDateString('pt-BR');
```

Esta linha é responsável pela formatação. Se tiver sido removida, adicione de volta!

---

## 🐛 Erro: Não consegue deletar

### ❌ O Que Significa?

Botão Deletar não funciona.

### ✅ Como Resolver?

**Passo 1:** Verifique se função existe:

```javascript
function deletarMovimentacao(id) {
    if (confirm('Tem certeza?')) {
        fetch(`/deletar/${id}`, {
            method: 'DELETE'
        })
        ...
    }
}
```

**Passo 2:** Verifique se botão chama a função:

```html
<button class="btn-deletar" onclick="deletarMovimentacao(${mov.id})">
    🗑️ Deletar
</button>
```

**Passo 3:** Verifique rota em Python:

```python
@app.route('/deletar/<int:id>', methods=['DELETE'])
def deletar_movimentacao(id):
    # ... código
```

---

## 🐛 Erro: Valores aparecem com muitas casas decimais

### ❌ O Que Significa?

Aparece `150.5000000000001` em vez de `150.50`.

### ✅ Como Resolver?

Use `.toFixed(2)` no JavaScript:

```javascript
const valorFormatado = 'R$ ' + parseFloat(mov.valor).toFixed(2).replace('.', ',');
```

---

## 🐛 Erro: "UNIQUE constraint failed"

### ❌ O Que Significa?

Tentou adicionar um registro com valor que já existe (valor único).

### ✅ Como Resolver?

Se está usando `UNIQUE` em alguma coluna, verifique se há duplicadas no banco:

```python
cursor.execute('SELECT * FROM movimentacoes WHERE seu_campo = ?', (valor,))
```

Ou delete o banco e recrie:

```bash
rm banco.db
python3 app.py
```

---

## 🐛 Erro: Página muito lenta

### ❌ O Que Significa?

Leva muito tempo para carregar dados.

### ✅ Como Resolver?

**Se tem muitos dados (>1000):**

Use `LIMIT` em SQL:

```python
cursor.execute('SELECT * FROM movimentacoes LIMIT 100 ORDER BY data DESC')
```

**Se é lento no geral:**

- Verifique se há muitos loops em JavaScript
- Procure por `while True` sem fim em Python
- Verifique se banco está corrompido

---

## 🐛 Erro: Caracteres estranhos na tabela (acentos)

### ❌ O Que Significa?

Aparece `Sal?rio` em vez de `Salário`.

### ✅ Como Resolver?

Verifique se HTML tem charset:

```html
<meta charset="UTF-8">
```

Verifique se arquivo está salvo em UTF-8:

Em VS Code:
1. Canto inferior direito
2. Clique em "UTF-8"
3. Escolha "UTF-8 without BOM"

---

## 🆘 Nada Resolveu?

1. **Releia o erro completamente** - Muitas vezes a mensagem diz exatamente o que está errado

2. **Procure na internet** - Cole o erro no Google, provavelmente alguém já teve

3. **Teste uma coisa por vez** - Não mude tudo de uma vez

4. **Reverter mudanças** - Se mudou algo e não funcionou, desfaça

5. **Comece do zero** - Último recurso: delete tudo e crie novamente

---

## 💡 Dica de Ouro: USE O CONSOLE!

**F12** é seu melhor amigo!

### Para JavaScript:

1. Abra **F12**
2. Vá em **Console**
3. Veja erros em **vermelho**
4. Use `console.log()` para debugar

### Para Python:

1. Veja a **janela do Terminal** onde Flask está rodando
2. Erros aparecem ali
3. Use `print()` para debugar

---

**Lembre-se: Toda erro é uma oportunidade de aprender! 🚀**

