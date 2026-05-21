# 💰 Dashboard Financeiro

Um sistema completo de controle financeiro pessoal, construído com **Flask**, **SQLite** e **JavaScript puro**. Perfeito para iniciantes em programação web que querem aprender enquanto constroem algo útil!

## ✨ Funcionalidades

- ✅ **Dashboard em Tempo Real** - Veja saldo, entradas e gastos de forma clara
- ✅ **Adicionar Movimentações** - Registre entradas e gastos com categorias
- ✅ **Relatórios Inteligentes** - Analise seus gastos por categoria e período
- ✅ **Gráficos Interativos** - Visualize dados com Chart.js (pizza e barras)
- ✅ **Tema Escuro/Claro** - Personalize com seus temas favoritos
- ✅ **Filtros por Mês e Categoria** - Encontre exatamente o que procura
- ✅ **Tabelas de Comparação** - Entradas x Gastos por categoria
- ✅ **Armazenamento Local** - Suas preferências são salvas no navegador
- ✅ **Design Responsivo** - Funciona em desktop, tablet e celular

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Função |
|-----------|--------|
| **Flask** | Backend em Python |
| **SQLite3** | Banco de dados local |
| **HTML/CSS/JS** | Frontend |
| **Chart.js** | Gráficos interativos |
| **CSS Variables** | Temas dinâmicos |
| **Fetch API** | Comunicação frontend/backend |

## 📚 Como Usar

### Requisitos

- Python 3.8+
- pip (gerenciador de pacotes Python)
- Navegador moderno (Chrome, Firefox, Edge, Safari)

### Instalação Rápida

```bash
# 1. Clonar o repositório
git clone https://github.com/SEU_USERNAME/sistema-financeiro.git
cd sistema-financeiro

# 2. Criar ambiente virtual
python3 -m venv venv

# 3. Ativar ambiente virtual
# No Linux/Mac:
source venv/bin/activate
# No Windows:
venv\Scripts\activate

# 4. Instalar Flask
pip install flask

# 5. Executar o servidor
python3 app.py
```

### Usar o Sistema

1. Abra o navegador em `http://localhost:5000`
2. Acesse a aba **Dashboard**
3. Preencha o formulário com:
   - **Tipo**: Entrada ou Gasto
   - **Categoria**: Escolha uma das 10 categorias
   - **Valor**: Quanto foi
   - **Data**: Quando aconteceu
   - **Descrição**: Opcional (ex: "Almoço com amigos")
4. Clique em **Adicionar**
5. Veja os dados aparecerem na tabela e nos cards
6. Vá em **Relatórios** para análises mais detalhadas
7. Alterne o tema em **Configurações**

## 📁 Estrutura do Projeto

```
sistema-financeiro/
│
├── app.py                      # Backend Flask (rotas, banco de dados)
├── banco.db                    # Banco de dados SQLite (criado automaticamente)
├── README.md                   # Este arquivo
├── .gitignore                  # Arquivos ignorados pelo git
│
├── templates/                  # Páginas HTML
│   ├── layout.html             # Template base (menu, sidebar)
│   ├── index.html              # Dashboard principal
│   ├── relatorios.html         # Página de relatórios com gráficos
│   └── configuracoes.html      # Página de configurações
│
└── static/                     # Arquivos estáticos
    ├── css/                    # Estilos CSS
    │   ├── style.css           # Estilos principais
    │   ├── tema.css            # Variáveis de cores para temas
    │   └── style-original.css  # Backup do estilo original
    │
    └── js/                     # Scripts JavaScript
        ├── main.js             # Lógica do dashboard
        ├── relatorios.js       # Gráficos e relatórios
        └── tema.js             # Sistema de tema escuro/claro
```

## 🚀 Como o Sistema Funciona

### Frontend → Backend → Banco de Dados

```
1️⃣  USUÁRIO PREENCHE FORMULÁRIO (index.html)
         ↓
2️⃣  JAVASCRIPT VALIDA DADOS (main.js)
         ↓
3️⃣  FETCH ENVIA JSON PARA /adicionar (HTTP POST)
         ↓
4️⃣  FLASK RECEBE E VALIDA (app.py)
         ↓
5️⃣  INSERE NO SQLITE (banco.db)
         ↓
6️⃣  RESPOSTA JSON RETORNA PARA JS
         ↓
7️⃣  JAVASCRIPT ATUALIZA A TABELA (DOM)
         ↓
8️⃣  USUÁRIO VÊ DADOS NA TELA
```

### Rotas Disponíveis

| Rota | Método | Função |
|------|--------|---------|
| `/` | GET | Dashboard principal |
| `/relatorios` | GET | Página de relatórios |
| `/configuracoes` | GET | Página de configurações |
| `/adicionar` | POST | Adiciona nova movimentação |
| `/listar` | GET | Retorna todas as movimentações em JSON |
| `/deletar/<id>` | DELETE | Remove uma movimentação pelo ID |
| `/stats` | GET | Retorna totais (entradas, gastos, saldo) |

## 💡 Conceitos de Programação Abordados

Este projeto é educativo e aborda:

- ✅ **Python e Flask** - Framework web backend
- ✅ **HTML e CSS** - Estrutura e styling de páginas
- ✅ **JavaScript ES6** - Manipulação do DOM, eventos, fetch API
- ✅ **SQLite** - Banco de dados e SQL básico
- ✅ **JSON** - Comunicação frontend/backend
- ✅ **CSS Variables** - Temas dinâmicos
- ✅ **LocalStorage** - Armazenamento no navegador
- ✅ **Chart.js** - Gráficos interativos
- ✅ **Jinja2 Templates** - Templates dinâmicos com Flask
- ✅ **Validação de Dados** - Backend e frontend
- ✅ **Git e GitHub** - Versionamento de código

## 🎓 Desafios para Melhorar Você Mesmo

- [ ] Adicionar campo de **conta bancária**
- [ ] Criar sistema de **metas financeiras**
- [ ] Exportar dados para **PDF** ou **Excel**
- [ ] Implementar **login simples**
- [ ] Adicionar **alertas de gastos altos**
- [ ] Criar **dashboard anual**
- [ ] Implementar **backup automático**
- [ ] Adicionar **busca por descrição**
- [ ] Criar **categorias personalizadas**
- [ ] Implementar **comparação entre meses**

## 🐛 Troubleshooting

### Erro: "Flask not found"
```bash
pip install flask
```

### Erro: "Address already in use"
Outra aplicação está usando a porta 5000:
```bash
# Matar o processo
lsof -ti:5000 | xargs kill -9
```

### Dados não aparecem
1. Verifique se `banco.db` foi criado
2. Abra o Console do Navegador (F12) para ver erros
3. Verifique o Terminal para erros do Flask

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente para fins educacionais.

## 👨‍💻 Autor

Construído com ❤️ para aprender programação web fullstack

---

**⭐ Se gostou, dê uma estrela no repositório!**

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

