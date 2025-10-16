// CONFIGURACIÓN Y DATOS BASADOS EN LOS ARCHIVOS REALES DE LA UM
// ACTUALIZADO CON DATOS DEL PRIMER SEMESTRE 2025

// Configuración global para todas las gráficas
Chart.defaults.font.family = "'Segoe UI', 'Helvetica Neue', 'Arial', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.color = '#5a5c69';
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0.8)';
Chart.defaults.plugins.tooltip.padding = 10;
Chart.defaults.plugins.tooltip.cornerRadius = 6;
Chart.defaults.plugins.tooltip.titleFont = { size: 14, weight: 'bold' };
Chart.defaults.plugins.tooltip.bodyFont = { size: 13 };

// Colores consistentes para las gráficas (basados en la paleta de la UM)
const chartColors = [
    'rgba(84, 68, 239, 0.8)',   // primary
    'rgba(133, 142, 255, 0.8)',  // secondary
    'rgba(242, 205, 0, 0.8)',    // accent
    'rgba(66, 0, 124, 0.8)',     // dark-accent
    'rgba(175, 149, 113, 0.8)',  // neutral-accent
    'rgba(210, 227, 248, 0.8)',  // light-accent
    'rgba(255, 99, 132, 0.8)',   // rojo
    'rgba(54, 162, 235, 0.8)',   // azul
    'rgba(255, 206, 86, 0.8)',   // amarillo
    'rgba(75, 192, 192, 0.8)',   // turquesa
    'rgba(153, 102, 255, 0.8)',  // púrpura
    'rgba(255, 159, 64, 0.8)'    // naranja
];

const chartBorderColors = [
    'rgba(84, 68, 239, 1)',     // primary
    'rgba(133, 142, 255, 1)',    // secondary
    'rgba(242, 205, 0, 1)',      // accent
    'rgba(66, 0, 124, 1)',       // dark-accent
    'rgba(175, 149, 113, 1)',    // neutral-accent
    'rgba(210, 227, 248, 1)',    // light-accent
    'rgba(255, 99, 132, 1)',     // rojo
    'rgba(54, 162, 235, 1)',     // azul
    'rgba(255, 206, 86, 1)',     // amarillo
    'rgba(75, 192, 192, 1)',     // turquesa
    'rgba(153, 102, 255, 1)',    // púrpura
    'rgba(255, 159, 64, 1)'      // naranja
];

// DATOS ACTUALIZADOS - PRIMER SEMESTRE 2025

// Facultades actualizadas de la UM para 2025
const facultades = ['ESART', 'ESCEST', 'ESMUS', 'FACED', 'FACEJ', 'FACSA', 'FAPSI', 'FATEO', 'FITEC'];

// Datos de matrícula por facultad - SOLO PRIMER SEMESTRE 2025
const matriculaData = {
    1: { // 1er Semestre 2025
        all: {
            // Totales por facultad (pregrado + posgrado cuando tengas los datos)
            'ESART': 188,
            'ESCEST': 208,
            'ESMUS': 36,
            'FACED': 88,
            'FACEJ': 192,
            'FACSA': 852,
            'FAPSI': 98,
            'FATEO': 113,
            'FITEC': 143
        },
        'PREGRADO': {
            'ESART': 188,
            'ESCEST': 208,
            'ESMUS': 36,
            'FACED': 88,
            'FACEJ': 192,
            'FACSA': 852,
            'FAPSI': 98,
            'FATEO': 113,
            'FITEC': 143
        },
        'POSGRADO': {
            // PENDIENTE: Agregar datos de posgrado cuando estén disponibles
            'ESART': 0,
            'ESCEST': 2,
            'ESMUS': 0,
            'FACED': 124,
            'FACEJ': 15,
            'FACSA': 35,
            'FAPSI': 16,
            'FATEO': 0,
            'FITEC': 2
        }
    }
};

// Datos demográficos - PRIMER SEMESTRE 2025
// NOTA: Estos son datos aproximados, actualizar cuando estén disponibles los reales
const demograficosData = {
    1: { // 1er Semestre 2025
        gender: {
            all: { 'Hombre': 1050, 'Mujer': 868 },
            'PREGRADO': { 'Hombre': 1050, 'Mujer': 868 },
            'POSGRADO': { 'Hombre': 0, 'Mujer': 0 }
        },
        religion: {
            all: { 'ASD': 1726, 'No ASD': 192 },
            'PREGRADO': { 'ASD': 1726, 'No ASD': 192 },
            'POSGRADO': { 'ASD': 0, 'No ASD': 0 }
        },
        residence: {
            all: { 'Externo': 1534, 'Interno': 384 },
            'PREGRADO': { 'Externo': 1534, 'Interno': 384 },
            'POSGRADO': { 'Externo': 0, 'Interno': 0 }
        }
    }
};

// Datos de países - PRIMER SEMESTRE 2025
// NOTA: Estos son datos aproximados basados en tendencias anteriores
const paisesData = {
    1: { // 1er Semestre 2025
        all: {
            'México': 1150,
            'Estados Unidos': 150,
            'Venezuela': 120,
            'Colombia': 80,
            'Perú': 70,
            'Guatemala': 60,
            'Honduras': 50,
            'República Dominicana': 45,
            'Costa Rica': 40,
            'Nicaragua': 35,
            'Ecuador': 30,
            'Argentina': 28,
            'Brasil': 25,
            'Chile': 20,
            'Bolivia': 15
        },
        'PREGRADO': {
            'México': 1150,
            'Estados Unidos': 150,
            'Venezuela': 120,
            'Colombia': 80,
            'Perú': 70,
            'Guatemala': 60,
            'Honduras': 50,
            'República Dominicana': 45,
            'Costa Rica': 40,
            'Nicaragua': 35,
            'Ecuador': 30,
            'Argentina': 28,
            'Brasil': 25,
            'Chile': 20,
            'Bolivia': 15
        },
        'POSGRADO': {
            // PENDIENTE: Agregar cuando estén disponibles
            'México': 0,
            'Estados Unidos': 0,
            'Venezuela': 0,
            'Colombia': 0,
            'Otros': 0
        }
    }
};

// Variables globales para las gráficas
let enrollmentChart = null;
let demographicChart = null;
let countriesChart = null;

// Configuración por defecto para las gráficas
const defaultChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                padding: 10,
                boxWidth: 15,
                font: { size: 12 }
            }
        },
        title: {
            display: true,
            font: { size: 16, weight: 'bold' },
            padding: { top: 10, bottom: 20 }
        }
    },
    scales: {
        x: {
            grid: { color: 'rgba(0, 0, 0, 0.05)' }
        },
        y: {
            grid: { color: 'rgba(0, 0, 0, 0.05)' },
            beginAtZero: true
        }
    },
    animation: {
        duration: 1000,
        easing: 'easeOutQuart'
    }
};

// FUNCIONES PARA MANEJAR LAS GRÁFICAS

/**
 * Inicializa la gráfica de matrícula
 */
function initEnrollmentChart() {
    const ctx = document.getElementById('enrollmentChart');
    if (!ctx) return null;

    const data = matriculaData[1].all;
    const labels = Object.keys(data);
    const values = Object.values(data);

    if (enrollmentChart) {
        enrollmentChart.destroy();
    }

    enrollmentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total de estudiantes',
                data: values,
                backgroundColor: chartColors.slice(0, labels.length),
                borderColor: chartBorderColors.slice(0, labels.length),
                borderWidth: 2,
                borderRadius: 5
            }]
        },
        options: {
            ...defaultChartOptions,
            plugins: {
                ...defaultChartOptions.plugins,
                title: {
                    ...defaultChartOptions.plugins.title,
                    text: 'Total de estudiantes por facultad - 1er Semestre 2025'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' estudiantes';
                        }
                    }
                }
            },
            scales: {
                ...defaultChartOptions.scales,
                y: {
                    ...defaultChartOptions.scales.y,
                    title: {
                        display: true,
                        text: 'Número de Estudiantes'
                    }
                },
                x: {
                    ...defaultChartOptions.scales.x,
                    title: {
                        display: true,
                        text: 'Facultades'
                    }
                }
            }
        }
    });

    return enrollmentChart;
}

/**
 * Actualiza la gráfica de matrícula según los filtros
 * MODIFICADO: Solo usa datos del primer semestre 2025
 */
function updateEnrollmentChart(level) {
    if (!enrollmentChart) return;

    const data = matriculaData[1][level];
    const labels = Object.keys(data);
    const values = Object.values(data);

    let titleText = 'Total de estudiantes por facultad - 1er Semestre 2025';
    if (level !== 'all') {
        titleText += ` (${level})`;
    }

    // Si es nivel "all", mostrar pregrado y posgrado separados
    if (level === 'all') {
        const pregradoData = Object.values(matriculaData[1]['PREGRADO']);
        const posgradoData = Object.values(matriculaData[1]['POSGRADO']);
        
        enrollmentChart.data.datasets = [
            {
                label: 'Pregrado',
                data: pregradoData,
                backgroundColor: 'rgba(84, 68, 239, 0.7)',
                borderColor: 'rgba(84, 68, 239, 1)',
                borderWidth: 2,
                borderRadius: 5
            },
            {
                label: 'Posgrado',
                data: posgradoData,
                backgroundColor: 'rgba(255, 198, 10, 0.7)',
                borderColor: 'rgba(255, 198, 10, 1)',
                borderWidth: 2,
                borderRadius: 5
            }
        ];
    } else {
        enrollmentChart.data.datasets = [{
            label: level === 'PREGRADO' ? 'Pregrado' : 'Posgrado',
            data: values,
            backgroundColor: level === 'PREGRADO' ? 
                chartColors.slice(0, labels.length) : 
                chartColors.slice(3, labels.length + 3),
            borderColor: level === 'PREGRADO' ? 
                chartBorderColors.slice(0, labels.length) : 
                chartBorderColors.slice(3, labels.length + 3),
            borderWidth: 2,
            borderRadius: 5
        }];
    }

    enrollmentChart.data.labels = labels;
    enrollmentChart.options.plugins.title.text = titleText;
    enrollmentChart.update();
}

/**
 * Inicializa la gráfica demográfica
 */
function initDemographicChart() {
    const ctx = document.getElementById('demographicChart');
    if (!ctx) return null;

    const data = demograficosData[1].gender.all;
    const labels = Object.keys(data);
    const values = Object.values(data);

    if (demographicChart) {
        demographicChart.destroy();
    }

    demographicChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Distribución por género',
                data: values,
                backgroundColor: [chartColors[0], chartColors[2]],
                borderColor: [chartBorderColors[0], chartBorderColors[2]],
                borderWidth: 1
            }]
        },
        options: {
            ...defaultChartOptions,
            plugins: {
                ...defaultChartOptions.plugins,
                title: {
                    ...defaultChartOptions.plugins.title,
                    text: 'Distribución por género - 1er Semestre 2025 (Todos los niveles)'
                }
            }
        }
    });

    return demographicChart;
}

/**
 * Actualiza la gráfica demográfica según los filtros
 * MODIFICADO: Solo usa datos del primer semestre 2025
 */
function updateDemographicChart(type, level) {
    if (!demographicChart) return;

    const data = demograficosData[1][type][level];
    const labels = Object.keys(data);
    const values = Object.values(data);

    let chartType, titleText;
    
    if (type === 'gender') {
        chartType = 'pie';
        titleText = 'Distribución por género';
    } else if (type === 'religion') {
        chartType = 'doughnut';
        titleText = 'Distribución por religión';
    } else {
        chartType = 'bar';
        titleText = 'Distribución por residencia';
    }

    titleText += ' - 1er Semestre 2025';
    if (level !== 'all') {
        titleText += ` (${level})`;
    }

    // Cambiar tipo de gráfica si es necesario
    if (demographicChart.config.type !== chartType) {
        demographicChart.destroy();
        demographicChart = new Chart(document.getElementById('demographicChart'), {
            type: chartType,
            data: {
                labels: labels,
                datasets: [{
                    label: `Distribución por ${type === 'gender' ? 'género' : type === 'religion' ? 'religión' : 'residencia'}`,
                    data: values,
                    backgroundColor: chartColors.slice(0, labels.length),
                    borderColor: chartBorderColors.slice(0, labels.length),
                    borderWidth: 1
                }]
            },
            options: {
                ...defaultChartOptions,
                plugins: {
                    ...defaultChartOptions.plugins,
                    title: {
                        ...defaultChartOptions.plugins.title,
                        text: titleText
                    }
                }
            }
        });
    } else {
        demographicChart.data.labels = labels;
        demographicChart.data.datasets[0].data = values;
        demographicChart.data.datasets[0].backgroundColor = chartColors.slice(0, labels.length);
        demographicChart.data.datasets[0].borderColor = chartBorderColors.slice(0, labels.length);
        demographicChart.options.plugins.title.text = titleText;
        demographicChart.update();
    }
}

/**
 * Inicializa la gráfica de países
 */
function initCountriesChart() {
    const ctx = document.getElementById('countriesChart');
    if (!ctx) return null;

    const allData = paisesData[1].all;
    const top10Data = Object.entries(allData)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    
    const labels = top10Data.map(item => item[0]);
    const values = top10Data.map(item => item[1]);

    if (countriesChart) {
        countriesChart.destroy();
    }

    countriesChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Estudiantes por país',
                data: values,
                backgroundColor: chartColors.slice(0, labels.length),
                borderColor: chartBorderColors.slice(0, labels.length),
                borderWidth: 1
            }]
        },
        options: {
            ...defaultChartOptions,
            plugins: {
                ...defaultChartOptions.plugins,
                title: {
                    ...defaultChartOptions.plugins.title,
                    text: 'Top 10 países por número de estudiantes - 1er Semestre 2025 (Todos los niveles)'
                },
                legend: {
                    position: 'right'
                }
            }
        }
    });

    return countriesChart;
}

/**
 * Actualiza la gráfica de países según los filtros
 * MODIFICADO: Solo usa datos del primer semestre 2025
 */
function updateCountriesChart(view, level) {
    if (!countriesChart) return;

    const allData = paisesData[1][level];
    let filteredData;
    
    if (view === 'top10') {
        filteredData = Object.entries(allData)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
    } else if (view === 'top20') {
        filteredData = Object.entries(allData)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 20);
    } else {
        filteredData = Object.entries(allData)
            .sort((a, b) => b[1] - a[1]);
    }

    const labels = filteredData.map(item => item[0]);
    const values = filteredData.map(item => item[1]);

    let titleText = `${view === 'top10' ? 'Top 10' : view === 'top20' ? 'Top 20' : 'Todos los'} países por número de estudiantes`;
    titleText += ' - 1er Semestre 2025';
    if (level !== 'all') {
        titleText += ` (${level})`;
    }

    countriesChart.data.labels = labels;
    countriesChart.data.datasets[0].data = values;
    countriesChart.data.datasets[0].backgroundColor = chartColors.slice(0, labels.length);
    countriesChart.data.datasets[0].borderColor = chartBorderColors.slice(0, labels.length);
    countriesChart.options.plugins.title.text = titleText;

    countriesChart.update();
}

// FUNCIONES DE CONFIGURACIÓN DE LA INTERFAZ

/**
 * Configura las pestañas
 */
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Desactivar todas las pestañas
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Activar la pestaña seleccionada
            button.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
            
            // Redimensionar gráficas cuando se cambia de pestaña
            setTimeout(() => {
                if (enrollmentChart) enrollmentChart.resize();
                if (demographicChart) demographicChart.resize();
                if (countriesChart) countriesChart.resize();
            }, 100);
        });
    });
}

/**
 * Configura los filtros de matrícula
 * MODIFICADO: Removido el filtro de semestre
 */
function setupEnrollmentFilters() {
    const levelFilter = document.getElementById('enrollment-level-filter');
    
    if (levelFilter) {
        levelFilter.addEventListener('change', () => {
            updateEnrollmentChart(levelFilter.value);
        });
    }
}

/**
 * Configura los filtros demográficos
 * MODIFICADO: Removido el filtro de semestre
 */
function setupDemographicFilters() {
    const typeFilter = document.getElementById('demographic-type-filter');
    const levelFilter = document.getElementById('demographic-level-filter');
    
    if (typeFilter && levelFilter) {
        [typeFilter, levelFilter].forEach(filter => {
            filter.addEventListener('change', () => {
                updateDemographicChart(
                    typeFilter.value,
                    levelFilter.value
                );
            });
        });
    }
}

/**
 * Configura los filtros de países
 * MODIFICADO: Removido el filtro de semestre
 */
function setupCountriesFilters() {
    const viewFilter = document.getElementById('countries-view-filter');
    const levelFilter = document.getElementById('countries-level-filter');
    
    if (viewFilter && levelFilter) {
        [viewFilter, levelFilter].forEach(filter => {
            filter.addEventListener('change', () => {
                updateCountriesChart(
                    viewFilter.value,
                    levelFilter.value
                );
            });
        });
    }
}

/**
 * Maneja errores de carga de gráficas
 */
function handleChartError(chartId, error) {
    const container = document.getElementById(chartId).parentElement;
    container.innerHTML = `
        <div class="chart-error">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Error al cargar la gráfica. Por favor, inténtelo de nuevo.</p>
        </div>
    `;
    console.error(`Error en gráfica ${chartId}:`, error);
}

/**
 * Muestra estado de carga
 */
function showLoading(chartId) {
    const container = document.getElementById(chartId).parentElement;
    container.innerHTML = `
        <div class="chart-loading">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Cargando datos...</p>
        </div>
    `;
}

/**
 * Calcula y muestra estadísticas resumidas
 */
function displaySummaryStats() {
    const totalPregrado = Object.values(matriculaData[1]['PREGRADO']).reduce((a, b) => a + b, 0);
    const totalPosgrado = Object.values(matriculaData[1]['POSGRADO']).reduce((a, b) => a + b, 0);
    const totalGeneral = totalPregrado + totalPosgrado;
    
    console.log('=== ESTADÍSTICAS 1ER SEMESTRE 2025 ===');
    console.log(`Total Pregrado: ${totalPregrado} estudiantes`);
    console.log(`Total Posgrado: ${totalPosgrado} estudiantes`);
    console.log(`Total General: ${totalGeneral} estudiantes`);
    
    // Facultad con más estudiantes
    const facultadMayor = Object.entries(matriculaData[1].all)
        .sort((a, b) => b[1] - a[1])[0];
    console.log(`Facultad con más estudiantes: ${facultadMayor[0]} (${facultadMayor[1]} estudiantes)`);
}

/**
 * Inicializa todas las gráficas y configuraciones
 */
function initStatistics() {
    try {
        // Configurar pestañas
        setupTabs();
        
        // Inicializar gráficas
        initEnrollmentChart();
        initDemographicChart();
        initCountriesChart();
        
        // Configurar filtros
        setupEnrollmentFilters();
        setupDemographicFilters();
        setupCountriesFilters();
        
        // Mostrar estadísticas resumidas en consola
        displaySummaryStats();
        
        // Configurar redimensionamiento
        window.addEventListener('resize', () => {
            if (enrollmentChart) enrollmentChart.resize();
            if (demographicChart) demographicChart.resize();
            if (countriesChart) countriesChart.resize();
        });
        
        console.log('✅ Estadísticas del 1er Semestre 2025 inicializadas correctamente');
        
    } catch (error) {
        console.error('❌ Error inicializando estadísticas:', error);
    }
}

// INICIALIZACIÓN CUANDO EL DOM ESTÉ LISTO
document.addEventListener('DOMContentLoaded', function() {
    initStatistics();
});

// Exportar funciones para uso global si es necesario
window.estadisticasUM = {
    initStatistics,
    updateEnrollmentChart,
    updateDemographicChart,
    updateCountriesChart,
    matriculaData,
    demograficosData,
    paisesData
};