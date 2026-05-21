# 💰 Dashboard Financeiro - Projeto de Aprendizado

Um projeto completo de programação para **iniciantes aprender de verdade**!

## 🎯 Objetivo

Criar um dashboard bonito para controlar dinheiro, aprendendo:
- Flask (Python)
- HTML/CSS/JavaScript
- SQLite
- Como frontend e backend se conectam

## 📦 O Que Tem Aqui?

- **app.py** - Python que processa dados
- **templates/index.html** - Página que você vê
- **static/style.css** - Design bonito
- **banco.db** - Guarda os dados
- **APRENDA.md** - Tudo explicado linha por linha! 📚

## 🚀 Como Rodar

### 1️⃣ Abra o Terminal

```bash
cd ~/Documentos/"sistema financeiro"
```

### 2️⃣ Instale Flask (se não tiver)

```bash
pip3 install flask
```

### 3️⃣ Rode o Projeto

```bash
python3 app.py
```

Você vai ver:
```
 * Running on http://127.0.0.1:5000
```

### 4️⃣ Abra no Navegador

Copie e cole: **http://localhost:5000**

Pronto! 🎉 Veja o dashboard funcionando!

### Para Parar

Aperte **CTRL + C** no terminal

---

## 📚 Aprender

Leia o arquivo **APRENDA.md** (está nesta pasta)

Ele tem:
- ✅ Como o projeto funciona
- ✅ Explicação de cada arquivo
- ✅ Linha por linha de código
- ✅ Como dados viajam entre frontend e backend
- ✅ 8 desafios para você tentar
- ✅ Dicas de aprendizado

---

## ✨ Funcionalidades

✅ Adicionar entrada de dinheiro  
✅ Adicionar gasto  
✅ Ver saldo total  
✅ Listar movimentações  
✅ Deletar movimentações  
✅ Ver total de entradas  
✅ Ver total de gastos  
✅ Categorias (Comida, Transporte, etc)  
✅ Datas das movimentações  
✅ Design moderno dark mode  
✅ Responsivo (funciona em celular)  

---

## 🎨 Tecnologias

| Tecnologia | O Que Faz |
|-----------|-----------|
| **Python** | Processa dados |
| **Flask** | Servidor web |
| **SQLite** | Guarda dados |
| **HTML** | Estrutura da página |
| **CSS** | Design bonito |
| **JavaScript** | Inteligência da página |

---

## 📁 Estrutura do Projeto

```
sistema-financeiro/
│
├── README.md              ← Este arquivo!
├── APRENDA.md             ← Tudo explicado (LEIA ISTO!)
│
├── app.py                 ← Python (cérebro)
├── banco.db               ← Banco de dados
│
├── templates/
│   └── index.html         ← HTML (página)
│
└── static/
    └── style.css          ← CSS (visual)
```

---

## 🆘 Problemas?

### "ModuleNotFoundError: No module named 'flask'"

```bash
pip3 install flask
```

### "Port 5000 already in use"

Outra aplicação está usando a porta 5000.

**Solução:**
```bash
python3 app.py  # Tente rodar de novo
```

Ou mude a porta em `app.py`:
```python
app.run(debug=True, host='0.0.0.0', port=5001)  # Porta 5001
```

### Banco de dados não funciona

Delete `banco.db` e rode novamente:
```bash
rm banco.db
python3 app.py
```

---

## 💡 Próximos Passos

1. **Leia APRENDA.md** - Entenda cada linha
2. **Faça os desafios** - Crie novos recursos
3. **Modifique cores** - Personalize o design
4. **Adicione funcionalidades** - Seja criativo!

---

## 🎓 O Que Você Vai Aprender

- Como um servidor web funciona
- CRUD (Create, Read, Update, Delete)
- Como HTML, CSS e JavaScript trabalham juntos
- Como banco de dados guarda dados
- Como fazer requisições entre frontend e backend
- Design responsivo e moderno

---

## 🚀 Desafios

Já quer ir além? Leia a seção **Desafios** em APRENDA.md:

1. Filtro por categoria
2. Editar movimentação
3. Exportar para CSV
4. Gráfico de gastos
5. Dark mode alternável
6. Sistema de login
7. Metas financeiras
8. Relatório mensal

---

## 📧 Suporte

Dúvidas sobre código? Leia **APRENDA.md**!

Lá tem:
- Explicações detalhadas
- Exemplos de cada função
- Fluxo de dados visual
- Dicas de aprendizado

---

**Criado com ❤️ para você aprender programação do zero!**

Bom aprendizado! 🚀

