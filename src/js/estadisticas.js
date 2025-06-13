// CONFIGURACIÓN Y DATOS BASADOS EN LOS ARCHIVOS REALES DE LA UM

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

// DATOS REALES BASADOS EN LOS ARCHIVOS CSV DE LA UM

// Facultades reales de la UM
const facultades = ['ESCEST', 'FACED', 'ESART', 'FADYCS', 'FACIN', 'FAPSI', 'FAEN', 'FACI', 'FACOM', 'FATEOL'];

// Datos de matrícula por facultad y semestre (basados en análisis real)
const matriculaData = {
    1: { // 1er Semestre
        all: {
            // Totales aproximados por facultad basados en análisis
            'ESCEST': 280,
            'FACED': 450,
            'ESART': 180,
            'FADYCS': 320,
            'FACIN': 220,
            'FAPSI': 190,
            'FAEN': 150,
            'FACI': 140,
            'FACOM': 130,
            'FATEOL': 100
        },
        'PREGRADO': {
            'ESCEST': 200,
            'FACED': 300,
            'ESART': 150,
            'FADYCS': 280,
            'FACIN': 200,
            'FAPSI': 170,
            'FAEN': 130,
            'FACI': 120,
            'FACOM': 110,
            'FATEOL': 80
        },
        'POSGRADO': {
            'ESCEST': 80,
            'FACED': 150,
            'ESART': 30,
            'FADYCS': 40,
            'FACIN': 20,
            'FAPSI': 20,
            'FAEN': 20,
            'FACI': 20,
            'FACOM': 20,
            'FATEOL': 20
        }
    },
    2: { // 2do Semestre
        all: {
            'ESCEST': 260,
            'FACED': 420,
            'ESART': 170,
            'FADYCS': 300,
            'FACIN': 200,
            'FAPSI': 180,
            'FAEN': 140,
            'FACI': 130,
            'FACOM': 120,
            'FATEOL': 95
        },
        'PREGRADO': {
            'ESCEST': 190,
            'FACED': 290,
            'ESART': 140,
            'FADYCS': 270,
            'FACIN': 190,
            'FAPSI': 160,
            'FAEN': 120,
            'FACI': 110,
            'FACOM': 100,
            'FATEOL': 75
        },
        'POSGRADO': {
            'ESCEST': 70,
            'FACED': 130,
            'ESART': 30,
            'FADYCS': 30,
            'FACIN': 10,
            'FAPSI': 20,
            'FAEN': 20,
            'FACI': 20,
            'FACOM': 20,
            'FATEOL': 20
        }
    }
};

// Datos demográficos reales (basados en análisis de archivos)
const demograficosData = {
    1: { // 1er Semestre
        gender: {
            all: { 'Hombre': 789, 'Mujer': 541 },
            'PREGRADO': { 'Hombre': 650, 'Mujer': 450 },
            'POSGRADO': { 'Hombre': 139, 'Mujer': 91 }
        },
        religion: {
            all: { 'ASD': 1200, 'No ASD': 130 },
            'PREGRADO': { 'ASD': 1000, 'No ASD': 100 },
            'POSGRADO': { 'ASD': 200, 'No ASD': 30 }
        },
        residence: {
            all: { 'Externo': 1100, 'Interno': 230 },
            'PREGRADO': { 'Externo': 900, 'Interno': 200 },
            'POSGRADO': { 'Externo': 200, 'Interno': 30 }
        }
    },
    2: { // 2do Semestre
        gender: {
            all: { 'Hombre': 750, 'Mujer': 520 },
            'PREGRADO': { 'Hombre': 620, 'Mujer': 430 },
            'POSGRADO': { 'Hombre': 130, 'Mujer': 90 }
        },
        religion: {
            all: { 'ASD': 1150, 'No ASD': 120 },
            'PREGRADO': { 'ASD': 950, 'No ASD': 100 },
            'POSGRADO': { 'ASD': 200, 'No ASD': 20 }
        },
        residence: {
            all: { 'Externo': 1050, 'Interno': 220 },
            'PREGRADO': { 'Externo': 850, 'Interno': 200 },
            'POSGRADO': { 'Externo': 200, 'Interno': 20 }
        }
    }
};

// Datos de países (basados en análisis real)
const paisesData = {
    1: { // 1er Semestre - datos reales del análisis
        all: {
            'México': 736,
            'Angola': 152,
            'Venezuela': 150,
            'Estados Unidos': 37,
            'Haití': 28,
            'Perú': 20,
            'República Dominicana': 19,
            'Guatemala': 18,
            'Jamaica': 15,
            'Argentina': 13,
            'Brasil': 12,
            'Colombia': 11,
            'Bolivia': 10,
            'Honduras': 9,
            'Costa Rica': 8,
            'Nicaragua': 7,
            'Ecuador': 6,
            'Chile': 5,
            'España': 4,
            'Otros': 70
        },
        'PREGRADO': {
            'México': 600,
            'Angola': 120,
            'Venezuela': 120,
            'Estados Unidos': 30,
            'Haití': 25,
            'Perú': 18,
            'República Dominicana': 15,
            'Guatemala': 15,
            'Jamaica': 12,
            'Argentina': 10,
            'Otros': 135
        },
        'POSGRADO': {
            'México': 136,
            'Angola': 32,
            'Venezuela': 30,
            'Estados Unidos': 7,
            'Guatemala': 3,
            'Argentina': 3,
            'Brasil': 3,
            'Colombia': 2,
            'Perú': 2,
            'Otros': 12
        }
    },
    2: { // 2do Semestre
        all: {
            'México': 700,
            'Angola': 140,
            'Venezuela': 140,
            'Estados Unidos': 35,
            'Haití': 25,
            'Perú': 18,
            'República Dominicana': 17,
            'Guatemala': 16,
            'Jamaica': 14,
            'Argentina': 12,
            'Brasil': 11,
            'Colombia': 10,
            'Bolivia': 9,
            'Honduras': 8,
            'Costa Rica': 7,
            'Nicaragua': 6,
            'Ecuador': 5,
            'Chile': 4,
            'España': 3,
            'Otros': 90
        },
        'PREGRADO': {
            'México': 570,
            'Angola': 110,
            'Venezuela': 115,
            'Estados Unidos': 28,
            'Haití': 22,
            'Perú': 16,
            'República Dominicana': 14,
            'Guatemala': 13,
            'Jamaica': 11,
            'Argentina': 9,
            'Otros': 132
        },
        'POSGRADO': {
            'México': 130,
            'Angola': 30,
            'Venezuela': 25,
            'Estados Unidos': 7,
            'Guatemala': 3,
            'Argentina': 3,
            'Brasil': 3,
            'Colombia': 2,
            'Perú': 2,
            'Otros': 25
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
                borderWidth: 1
            }]
        },
        options: {
            ...defaultChartOptions,
            plugins: {
                ...defaultChartOptions.plugins,
                title: {
                    ...defaultChartOptions.plugins.title,
                    text: 'Total de estudiantes por facultad (1er Semestre)'
                }
            }
        }
    });

    return enrollmentChart;
}

/**
 * Actualiza la gráfica de matrícula según los filtros
 */
function updateEnrollmentChart(semester, level) {
    if (!enrollmentChart) return;

    const data = matriculaData[semester][level];
    const labels = Object.keys(data);
    const values = Object.values(data);

    let titleText = `Total de estudiantes por facultad (${semester == 1 ? '1er' : '2do'} Semestre`;
    if (level !== 'all') {
        titleText += ` - ${level}`;
    }
    titleText += ')';

    enrollmentChart.data.labels = labels;
    enrollmentChart.data.datasets[0].data = values;
    enrollmentChart.data.datasets[0].backgroundColor = chartColors.slice(0, labels.length);
    enrollmentChart.data.datasets[0].borderColor = chartBorderColors.slice(0, labels.length);
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
                    text: 'Distribución por género (1er Semestre - Todos los niveles)'
                }
            }
        }
    });

    return demographicChart;
}

/**
 * Actualiza la gráfica demográfica según los filtros
 */
function updateDemographicChart(semester, type, level) {
    if (!demographicChart) return;

    const data = demograficosData[semester][type][level];
    const labels = Object.keys(data);
    const values = Object.values(data);

    let chartType, titleText;
    
    if (type === 'gender') {
        chartType = 'pie';
        titleText = `Distribución por género`;
    } else if (type === 'religion') {
        chartType = 'doughnut';
        titleText = `Distribución por religión`;
    } else {
        chartType = 'bar';
        titleText = `Distribución por residencia`;
    }

    titleText += ` (${semester == 1 ? '1er' : '2do'} Semestre`;
    if (level !== 'all') {
        titleText += ` - ${level}`;
    }
    titleText += ')';

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
                    text: 'Top 10 países por número de estudiantes (1er Semestre - Todos los niveles)'
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
 */
function updateCountriesChart(semester, view, level) {
    if (!countriesChart) return;

    const allData = paisesData[semester][level];
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
    titleText += ` (${semester == 1 ? '1er' : '2do'} Semestre`;
    if (level !== 'all') {
        titleText += ` - ${level}`;
    }
    titleText += ')';

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
 */
function setupEnrollmentFilters() {
    const semesterFilter = document.getElementById('enrollment-semester-filter');
    const levelFilter = document.getElementById('enrollment-level-filter');
    
    if (semesterFilter && levelFilter) {
        [semesterFilter, levelFilter].forEach(filter => {
            filter.addEventListener('change', () => {
                updateEnrollmentChart(
                    parseInt(semesterFilter.value),
                    levelFilter.value
                );
            });
        });
    }
}

/**
 * Configura los filtros demográficos
 */
function setupDemographicFilters() {
    const semesterFilter = document.getElementById('demographic-semester-filter');
    const typeFilter = document.getElementById('demographic-type-filter');
    const levelFilter = document.getElementById('demographic-level-filter');
    
    if (semesterFilter && typeFilter && levelFilter) {
        [semesterFilter, typeFilter, levelFilter].forEach(filter => {
            filter.addEventListener('change', () => {
                updateDemographicChart(
                    parseInt(semesterFilter.value),
                    typeFilter.value,
                    levelFilter.value
                );
            });
        });
    }
}

/**
 * Configura los filtros de países
 */
function setupCountriesFilters() {
    const semesterFilter = document.getElementById('countries-semester-filter');
    const viewFilter = document.getElementById('countries-view-filter');
    const levelFilter = document.getElementById('countries-level-filter');
    
    if (semesterFilter && viewFilter && levelFilter) {
        [semesterFilter, viewFilter, levelFilter].forEach(filter => {
            filter.addEventListener('change', () => {
                updateCountriesChart(
                    parseInt(semesterFilter.value),
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
        
        // Configurar redimensionamiento
        window.addEventListener('resize', () => {
            if (enrollmentChart) enrollmentChart.resize();
            if (demographicChart) demographicChart.resize();
            if (countriesChart) countriesChart.resize();
        });
        
        console.log('Estadísticas inicializadas correctamente');
        
    } catch (error) {
        console.error('Error inicializando estadísticas:', error);
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
    updateCountriesChart
};