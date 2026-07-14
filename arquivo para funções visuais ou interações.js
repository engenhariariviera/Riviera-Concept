/* ============================================
   RIVIERA EMPREENDIMENTOS - DASHBOARD ELEVADORES
   Arquivo de Funções e Interações
   ============================================ */

// ============================================
// INICIALIZAÇÃO DO DOCUMENTO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard Elevadores OTIS - Inicializado');
    
    // Inicializar gráficos
    initCharts();
    
    // Adicionar interatividade
    addTableInteractions();
    addCardAnimations();
    addScrollAnimations();
    
    // Atualizar data/hora
    updateDateTime();
    setInterval(updateDateTime, 60000); // Atualizar a cada minuto
});

// ============================================
// GRÁFICOS COM CHART.JS
// ============================================

function initCharts() {
    // Curva S Física
    const ctxCurvaS = document.getElementById('curvaSChart');
    if (ctxCurvaS) {
        new Chart(ctxCurvaS, {
            type: 'line',
            data: {
                labels: ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar'],
                datasets: [
                    {
                        label: 'Planejado',
                        data: [15, 25, 35, 50, 65, 75, 85, 92, 97, 100],
                        borderColor: '#1e40af',
                        backgroundColor: 'rgba(30, 64, 175, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 5,
                        pointBackgroundColor: '#1e40af',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointHoverRadius: 7,
                        pointHoverBackgroundColor: '#1e3a8a'
                    },
                    {
                        label: 'Realizado',
                        data: [15, 15, null, null, null, null, null, null, null, null],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 5,
                        pointBackgroundColor: '#10b981',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointHoverRadius: 7,
                        pointHoverBackgroundColor: '#059669'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            font: { size: 12, weight: 'bold' },
                            padding: 15,
                            usePointStyle: true,
                            boxWidth: 8,
                            boxHeight: 8
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: { size: 13, weight: 'bold' },
                        bodyFont: { size: 12 },
                        borderColor: '#1e40af',
                        borderWidth: 1,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            },
                            font: { size: 11 }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            font: { size: 11 }
                        }
                    }
                }
            }
        });
    }

    // Curva S Acumulada
    const ctxCurvaAcumulada = document.getElementById('curvaAcumuladaChart');
    if (ctxCurvaAcumulada) {
        new Chart(ctxCurvaAcumulada, {
            type: 'line',
            data: {
                labels: ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar'],
                datasets: [
                    {
                        label: 'Planejado Acumulado',
                        data: [15, 40, 75, 125, 190, 265, 350, 442, 539, 639],
                        borderColor: '#1e40af',
                        backgroundColor: 'rgba(30, 64, 175, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 5,
                        pointBackgroundColor: '#1e40af',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointHoverRadius: 7,
                        pointHoverBackgroundColor: '#1e3a8a'
                    },
                    {
                        label: 'Realizado Acumulado',
                        data: [15, 30, null, null, null, null, null, null, null, null],
                        borderColor: '#f59e0b',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 5,
                        pointBackgroundColor: '#f59e0b',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointHoverRadius: 7,
                        pointHoverBackgroundColor: '#d97706'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            font: { size: 12, weight: 'bold' },
                            padding: 15,
                            usePointStyle: true,
                            boxWidth: 8,
                            boxHeight: 8
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: { size: 13, weight: 'bold' },
                        bodyFont: { size: 12 },
                        borderColor: '#1e40af',
                        borderWidth: 1,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + ' dias';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + ' dias';
                            },
                            font: { size: 11 }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            font: { size: 11 }
                        }
                    }
                }
            }
        });
    }
}

// ============================================
// INTERATIVIDADE DE TABELAS
// ============================================

function addTableInteractions() {
    const tableRows = document.querySelectorAll('.gantt-table tbody tr');
    
    tableRows.forEach((row, index) => {
        // Hover effect
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(30, 64, 175, 0.08)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
        
        // Animação de entrada
        row.style.opacity = '0';
        row.style.transform = 'translateY(10px)';
        setTimeout(() => {
            row.style.transition = 'all 0.3s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// ============================================
// ANIMAÇÕES DE CARDS
// ============================================

function addCardAnimations() {
    const cards = document.querySelectorAll('.indicator-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
        
        // Efeito de hover com ripple
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ============================================
// ANIMAÇÕES DE SCROLL
// ============================================

function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    const sections = document.querySelectorAll('.indicators-section, .charts-section, .gantt-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// ============================================
// ATUALIZAR DATA E HORA
// ============================================

function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    const dateString = now.toLocaleDateString('pt-BR', options);
    console.log('Última atualização:', dateString);
}

// ============================================
// FUNÇÕES UTILITÁRIAS
// ============================================

/**
 * Formata um número como percentual
 */
function formatPercent(value) {
    return value.toFixed(1) + '%';
}

/**
 * Formata uma data no padrão DD/MM/YYYY
 */
function formatDate(date) {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return day + '/' + month + '/' + year;
}

/**
 * Calcula dias entre duas datas
 */
function daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((date1 - date2) / oneDay));
}

/**
 * Exibe notificação no console
 */
function logNotification(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    const prefix = type.toUpperCase();
    console.log(`[${timestamp}] ${prefix}: ${message}`);
}

// ============================================
// EXPORTAR DADOS (OPCIONAL)
// ============================================

/**
 * Exporta a tabela Gantt como CSV
 */
function exportGanttAsCSV() {
    const table = document.querySelector('.gantt-table');
    let csv = [];
    
    // Headers
    const headers = [];
    table.querySelectorAll('th').forEach(th => {
        headers.push(th.textContent.trim());
    });
    csv.push(headers.join(','));
    
    // Rows
    table.querySelectorAll('tbody tr').forEach(tr => {
        const row = [];
        tr.querySelectorAll('td').forEach(td => {
            row.push('"' + td.textContent.trim().replace(/"/g, '""') + '"');
        });
        csv.push(row.join(','));
    });
    
    // Download
    const csvContent = 'data:text/csv;charset=utf-8,' + csv.join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', 'cronograma-elevadores-otis.csv');
    link.click();
    
    logNotification('Cronograma exportado como CSV', 'success');
}

/**
 * Imprime o dashboard
 */
function printDashboard() {
    window.print();
    logNotification('Abrindo diálogo de impressão', 'info');
}

// ============================================
// EVENT LISTENERS GLOBAIS
// ============================================

// Detectar mudanças de orientação
window.addEventListener('orientationchange', function() {
    console.log('Orientação alterada para:', window.innerWidth > window.innerHeight ? 'Paisagem' : 'Retrato');
});

// Detectar redimensionamento de janela
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        console.log('Janela redimensionada:', window.innerWidth + 'x' + window.innerHeight);
    }, 250);
});

// ============================================
// MODO ESCURO (OPCIONAL)
// ============================================

/**
 * Ativa/desativa modo escuro
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Verificar preferência salva
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ============================================
// INICIALIZAÇÃO FINAL
// ============================================

logNotification('Dashboard Elevadores OTIS carregado com sucesso', 'success');