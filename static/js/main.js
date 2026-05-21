/* ======================================
   main.js - Lógica do Dashboard
   ======================================
   Este arquivo organiza a parte de interação
   entre o HTML e o backend do Flask.
*/

function initPagina() {
    aplicarTema(obterTemaSalvo());

    const botaoTema = document.querySelector('#btnTema');
    if (botaoTema) {
        botaoTema.addEventListener('click', function () {
            alternarTema();
        });
    }

    const botaoTemaConfig = document.querySelector('#btnTemaConfig');
    if (botaoTemaConfig) {
        botaoTemaConfig.addEventListener('click', function () {
            alternarTema();
        });
    }

    const formulario = document.querySelector('#formulario');
    if (formulario) {
        formulario.addEventListener('submit', enviarFormulario);
        definirDataHoje();
        atualizarEstatisticas();
        listarMovimentacoes();
    }
}

function enviarFormulario(evento) {
    evento.preventDefault();

    const tipo = document.querySelector('#tipo').value;
    const categoria = document.querySelector('#categoria').value;
    const valor = document.querySelector('#valor').value;
    const descricao = document.querySelector('#descricao').value.trim();
    const data = document.querySelector('#data').value;

    const erro = validarFormulario({ tipo, categoria, valor, data });
    if (erro) {
        mostrarMensagem('❌ ' + erro, 'erro');
        return;
    }

    fetch('/adicionar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo, categoria, valor, descricao, data })
    })
    .then(resposta => resposta.json())
    .then(dados => {
        if (dados.sucesso) {
            mostrarMensagem('✅ ' + dados.mensagem, 'sucesso');
            document.querySelector('#formulario').reset();
            definirDataHoje();
            atualizarEstatisticas();
            listarMovimentacoes();
        } else {
            mostrarMensagem('❌ ' + dados.mensagem, 'erro');
        }
    })
    .catch(() => {
        mostrarMensagem('❌ Erro ao conectar com o servidor.', 'erro');
    });
}

function validarFormulario({ tipo, categoria, valor, data }) {
    if (!tipo) {
        return 'Escolha se é entrada ou gasto.';
    }
    if (!categoria) {
        return 'Escolha uma categoria.';
    }
    if (!valor || Number(valor) <= 0) {
        return 'O valor deve ser maior que zero.';
    }
    if (!data) {
        return 'Escolha uma data válida.';
    }
    return null;
}

function listarMovimentacoes() {
    fetch('/listar')
        .then(resposta => resposta.json())
        .then(movimentacoes => {
            const tabela = document.querySelector('#tabela-movimentacoes');
            const msgVazio = document.querySelector('#mensagem-vazio');
            tabela.innerHTML = '';

            if (!movimentacoes || movimentacoes.length === 0) {
                if (msgVazio) {
                    msgVazio.style.display = 'block';
                }
                return;
            }

            if (msgVazio) {
                msgVazio.style.display = 'none';
            }

            movimentacoes.forEach(mov => {
                const linha = document.createElement('tr');
                linha.classList.add(mov.tipo === 'ENTRADA' ? 'linha-entrada' : 'linha-gasto');

                const dataFormatada = new Date(mov.data).toLocaleDateString('pt-BR');
                const valorFormatado = 'R$ ' + parseFloat(mov.valor).toFixed(2).replace('.', ',');

                linha.innerHTML = `
                    <td>${dataFormatada}</td>
                    <td>${mov.tipo === 'ENTRADA' ? '➡️ Entrada' : '⬅️ Gasto'}</td>
                    <td>${mov.categoria}</td>
                    <td>${mov.descricao || '-'}</td>
                    <td class="valor">${valorFormatado}</td>
                    <td>
                        <button class="btn-deletar" type="button" onclick="deletarMovimentacao(${mov.id})">🗑️</button>
                    </td>
                `;
                tabela.appendChild(linha);
            });
        });
}

function deletarMovimentacao(id) {
    const confirmar = confirm('Tem certeza que deseja remover essa movimentação?');
    if (!confirmar) {
        return;
    }

    fetch(`/deletar/${id}`, { method: 'DELETE' })
        .then(resposta => resposta.json())
        .then(dados => {
            if (dados.sucesso) {
                mostrarMensagem('✅ ' + dados.mensagem, 'sucesso');
                atualizarEstatisticas();
                listarMovimentacoes();
            } else {
                mostrarMensagem('❌ ' + dados.mensagem, 'erro');
            }
        })
        .catch(() => {
            mostrarMensagem('❌ Erro ao deletar movimentação.', 'erro');
        });
}

function atualizarEstatisticas() {
    fetch('/stats')
        .then(resposta => resposta.json())
        .then(stats => {
            const saldoEl = document.querySelector('#saldo');
            const entradaEl = document.querySelector('#entradas');
            const gastoEl = document.querySelector('#gastos');

            const formatarReal = valor => 'R$ ' + Number(valor).toFixed(2).replace('.', ',');

            if (saldoEl) {
                saldoEl.textContent = formatarReal(stats.saldo);
                saldoEl.classList.toggle('saldo-negativo', stats.saldo < 0);
            }
            if (entradaEl) {
                entradaEl.textContent = formatarReal(stats.total_entradas);
            }
            if (gastoEl) {
                gastoEl.textContent = formatarReal(stats.total_gastos);
            }
        });
}

function mostrarMensagem(texto, tipo) {
    const elemento = document.querySelector('#mensagem');
    if (!elemento) return;

    elemento.textContent = texto;
    elemento.className = 'mensagem ' + tipo;
    elemento.style.display = 'block';
    elemento.classList.add('visivel');

    setTimeout(() => {
        elemento.style.opacity = '0';
        setTimeout(() => {
            elemento.style.display = 'none';
            elemento.style.opacity = '1';
        }, 300);
    }, 3000);
}

function definirDataHoje() {
    const campoData = document.querySelector('#data');
    if (!campoData) return;

    const hoje = new Date().toISOString().split('T')[0];
    campoData.value = hoje;
}

window.addEventListener('DOMContentLoaded', initPagina);
