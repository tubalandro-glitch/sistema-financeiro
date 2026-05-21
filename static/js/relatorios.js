function criarGraficosRelatorios() {
    const graficoCategoria = document.querySelector('#grafico-categoria');
    const graficoTipos = document.querySelector('#grafico-tipos');
    if (!graficoCategoria || !graficoTipos) {
        return;
    }

    const elementoCategoria = document.querySelector('#dados-categoria');
    const elementoCategoriaComparacao = document.querySelector('#dados-categoria-comparacao');
    const dadosCategoria = elementoCategoria ? JSON.parse(elementoCategoria.textContent || '[]') : [];
    const dadosCategoriaComparacao = elementoCategoriaComparacao ? JSON.parse(elementoCategoriaComparacao.textContent || '[]') : [];

    const categorias = dadosCategoria.map(item => item.categoria);
    const valores = dadosCategoria.map(item => item.total);
    const categoriasComparacao = dadosCategoriaComparacao.map(item => item.categoria);
    const entradasPorCategoria = dadosCategoriaComparacao.map(item => item.entrada);
    const gastosPorCategoria = dadosCategoriaComparacao.map(item => item.gasto);

    const coresCategoria = [
        '#00d4ff', '#ff6b6b', '#ffd93d', '#2ed573', '#8e54e9', '#ff9f1a', '#1e90ff', '#6f42c1', '#20c997', '#fd7e14'
    ];

    if (categorias.length > 0) {
        new Chart(graficoCategoria, {
            type: 'doughnut',
            data: {
                labels: categorias,
                datasets: [{
                    data: valores,
                    backgroundColor: coresCategoria,
                    borderColor: '#10101f',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: {
                        callbacks: {
                            label: context => `R$ ${context.parsed.toLocaleString('pt-BR')}`
                        }
                    }
                }
            }
        });
    }

    if (categoriasComparacao.length > 0) {
        new Chart(graficoTipos, {
            type: 'bar',
            data: {
                labels: categoriasComparacao,
                datasets: [
                    {
                        label: 'Entradas',
                        data: entradasPorCategoria,
                        backgroundColor: '#2ed573',
                        borderRadius: 8,
                        borderSkipped: false
                    },
                    {
                        label: 'Gastos',
                        data: gastosPorCategoria,
                        backgroundColor: '#ff4757',
                        borderRadius: 8,
                        borderSkipped: false
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: {
                        callbacks: {
                            label: context => `${context.dataset.label}: R$ ${context.parsed.y.toLocaleString('pt-BR')}`
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            autoSkip: false,
                            maxRotation: 45,
                            minRotation: 0
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => 'R$ ' + value.toLocaleString('pt-BR')
                        }
                    }
                }
            }
        });
    }

}

window.addEventListener('DOMContentLoaded', criarGraficosRelatorios);
