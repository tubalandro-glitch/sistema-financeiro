/* ======================================
   TEMA.JS - GERENCIAR TEMAS ESCURO/CLARO
   ======================================
   
   OBJETIVO: Permitir que usuário mude tema
   e a escolha seja LEMBRADA (localStorage)
   
   COMO FUNCIONA:
   1. Carrega tema salvo ao abrir página
   2. Usuário clica botão trocar tema
   3. JavaScript muda a classe CSS
   4. CSS muda as cores (variáveis)
   5. Salva preferência em localStorage
   6. Próxima vez que abrir, lembra!
   
   ====================================== */

// ======================================
// PARTE 1: CONFIGURAÇÃO INICIAL
// ======================================

// A classe CSS que vai mudar:
// data-theme="escuro" ou data-theme="claro"
const CLASSE_TEMA = 'data-theme';
const TEMA_ESCURO = 'escuro';
const TEMA_CLARO = 'claro';
const ARMAZENAMENTO_CHAVE = 'tema-preferido';

// ======================================
// PARTE 2: FUNÇÃO - APLICAR TEMA
// ======================================

/**
 * Aplica um tema ao documento
 * 
 * EXPLICAÇÃO:
 * document.documentElement = <html> tag
 * setAttribute = muda um atributo
 * data-theme="claro" = novo atributo
 * 
 * CSS lê isto:
 * [data-theme="claro"] { cores diferentes }
 * 
 * @param {string} tema - "escuro" ou "claro"
 */
function aplicarTema(tema) {
    console.log(`✨ Aplicando tema: ${tema}`);
    
    // Muda o atributo data-theme no <html>
    document.documentElement.setAttribute(CLASSE_TEMA, tema);
    
    // Salva a preferência em localStorage
    // Próxima vez que abrir a página, lembra!
    localStorage.setItem(ARMAZENAMENTO_CHAVE, tema);
}

// ======================================
// PARTE 3: FUNÇÃO - OBTER TEMA SALVO
// ======================================

/**
 * Obtém o tema que o usuário salvou
 * 
 * LÓGICA:
 * 1. Procura em localStorage
 * 2. Se não encontra, retorna tema padrão
 * 3. Usa tema salvo ou padrão
 * 
 * @returns {string} "escuro" ou "claro"
 */
function obterTemaSalvo() {
    // localStorage.getItem retorna null se não existe
    const temaSalvo = localStorage.getItem(ARMAZENAMENTO_CHAVE);
    
    console.log(`💾 Tema salvo encontrado: ${temaSalvo}`);
    
    // Se tem salvo, retorna. Se não, retorna "escuro" como padrão
    return temaSalvo || TEMA_ESCURO;
}

// ======================================
// PARTE 4: FUNÇÃO - ALTERNAR TEMA
// ======================================

/**
 * Muda entre tema escuro e claro
 * 
 * LÓGICA:
 * 1. Obtém tema atual
 * 2. Se é escuro, muda para claro
 * 3. Se é claro, muda para escuro
 * 4. Aplica o novo tema
 * 
 * EXEMPLO PRÁTICO:
 * Usuário vê tema escuro
 * Clica no botão
 * alternartema() faz:
 *   - obtém "escuro"
 *   - vê que é escuro, então muda para "claro"
 *   - aplica "claro"
 * Pronto! Página fica clara!
 */
function alternarTema() {
    // Obtém o tema atual do documento
    const temaAtual = document.documentElement.getAttribute(CLASSE_TEMA);
    
    // Decide qual será o novo tema
    // Se é escuro, muda para claro
    // Se é claro, muda para escuro
    const novoTema = temaAtual === TEMA_ESCURO ? TEMA_CLARO : TEMA_ESCURO;
    
    console.log(`🔄 Alternando de ${temaAtual} para ${novoTema}`);
    
    // Aplica o novo tema
    aplicarTema(novoTema);
}

// ======================================
// PARTE 5: FUNÇÃO - INICIALIZAR
// ======================================

/**
 * Executa quando página carrega
 * 
 * OBJETIVO: Carregar tema salvo
 * 
 * PASSO A PASSO:
 * 1. Página carrega
 * 2. Procura tema salvo em localStorage
 * 3. Aplica o tema
 * 4. Usuário vê a página com seu tema preferido!
 */
function inicializarTema() {
    console.log('🎨 Inicializando sistema de tema...');
    
    // Obtém o tema que foi salvo
    const tema = obterTemaSalvo();
    
    // Aplica este tema
    aplicarTema(tema);
    
    console.log('✅ Tema inicializado!');
}

// ======================================
// PARTE 6: CARREGAR AO INICIAR PÁGINA
// ======================================

/**
 * DOMContentLoaded = Página carregou completamente
 * 
 * Por que usar isto?
 * - Garante que HTML foi carregado
 * - Garante que CSS foi carregado
 * - JavaScript pode modificar com segurança
 */
document.addEventListener('DOMContentLoaded', inicializarTema);

// ======================================
// PARTE 7: BOTÃO DO TEMA (HTML)
// ======================================

/**
 * No HTML, deve ter algo assim:
 * 
 * <button onclick="alternarTema()" class="btn-tema">
 *     🌙 Tema
 * </button>
 * 
 * Quando usuário clica:
 * 1. HTML chama onclick="alternarTema()"
 * 2. JavaScript executa alternarTema()
 * 3. Tema muda!
 * 4. localStorage guarda preferência
 */

// ======================================
// RESUMO DO FLUXO
// ======================================

/*
FLUXO COMPLETO:

1. PRIMEIRA VEZ QUE ABRE:
   - Página carrega
   - DOMContentLoaded dispara
   - inicializarTema() executa
   - Procura em localStorage (não encontra)
   - Usa tema padrão "escuro"
   - Página fica escura ✅

2. USUÁRIO CLICA BOTÃO "🌙 Tema":
   - onclick="alternarTema()"
   - alternarTema() executa
   - Vê que é "escuro"
   - Muda para "claro"
   - aplicarTema("claro") executa
   - Página fica clara ✨
   - localStorage.setItem salva escolha

3. USUÁRIO FECHA E ABRE NOVAMENTE:
   - Página carrega
   - DOMContentLoaded dispara
   - inicializarTema() executa
   - localStorage tem "claro"
   - Aplica "claro"
   - Página abre já clara! ✅

MAGIA: localStorage faz a escolha ser LEMBRADA!
*/
