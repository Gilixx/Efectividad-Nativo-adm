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

// Variables globales para las gráficas
let enrollmentChart = null;
let demographicChart = null;
let countriesChart = null;

// ... (defaultChartOptions - SIN CAMBIOS) ...
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
    
    // Valores iniciales: 1er Semestre y Todos los niveles
    const initialSemester = '1';
    const initialLevel = 'all';
    
    const data = matriculaData[initialSemester][initialLevel];
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
                    text: 'Total de estudiantes por facultad - 1er semestre 2024' // Título inicial
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

    // Llamada inicial para mostrar pregrado y posgrado si el nivel es 'all'
    updateEnrollmentChart(initialSemester, initialLevel);
    return enrollmentChart;
}

/**
 * Actualiza la gráfica de matrícula según los filtros
 */
function updateEnrollmentChart(semester, level) {
    if (!enrollmentChart) return;

    const dataSet = matriculaData[semester];
    if (!dataSet) return; // Evitar errores si no existen datos para el semestre

    const data = dataSet[level];
    const labels = Object.keys(data);

    let semesterText = semester === '1' ? '1er Semestre 2025' : '2do Semestre 2024';
    let titleText = `Total de estudiantes por facultad - ${semesterText}`;
    if (level !== 'all') {
        titleText += ` (${level})`;
    }

    // Si es nivel "all", mostrar pregrado y posgrado separados
    if (level === 'all') {
        const pregradoData = Object.values(dataSet['PREGRADO']);
        const posgradoData = Object.values(dataSet['POSGRADO']);
        
        enrollmentChart.data.labels = Object.keys(dataSet['PREGRADO']); // Usar etiquetas de pregrado para asegurar el orden
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
        const values = Object.values(data);
        enrollmentChart.data.labels = labels;
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

    enrollmentChart.options.plugins.title.text = titleText;
    enrollmentChart.update();
}

/**
 * Inicializa la gráfica demográfica
 */
function initDemographicChart() {
    const ctx = document.getElementById('demographicChart');
    if (!ctx) return null;

    const initialSemester = document.getElementById('demographic-semester-filter').value;
    const initialType = document.getElementById('demographic-type-filter').value;
    const initialLevel = document.getElementById('demographic-level-filter').value;
    
    const data = demograficosData[initialSemester][initialType][initialLevel];
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
                    text: 'Distribución por género - 1er Semestre (Todos los niveles)'
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

    const dataSet = demograficosData[semester];
    if (!dataSet) return;

    const data = dataSet[type][level];
    const labels = Object.keys(data);
    const values = Object.values(data);

    let chartType, titleText;
    let semesterText = semester === '1' ? '1er Semestre' : '2do Semestre';
    
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

    titleText += ` - ${semesterText}`;
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
                },
                scales: chartType === 'bar' ? defaultChartOptions.scales : {} // Mostrar escalas solo en gráficas de barras
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

    const initialSemester = document.getElementById('countries-semester-filter').value;
    const initialView = document.getElementById('countries-view-filter').value;
    const initialLevel = document.getElementById('countries-level-filter').value;
    
    const allData = paisesData[initialSemester][initialLevel];
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
                    text: 'Top 10 países por número de estudiantes - 1er Semestre (Todos los niveles)'
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

    const dataSet = paisesData[semester];
    if (!dataSet) return;

    const allData = dataSet[level];
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

    let semesterText = semester === '1' ? '1er Semestre' : '2do Semestre';
    let titleText = `${view === 'top10' ? 'Top 10' : view === 'top20' ? 'Top 20' : 'Todos los'} países por número de estudiantes`;
    titleText += ` - ${semesterText}`;
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
 */
function setupEnrollmentFilters() {
    const semesterFilter = document.getElementById('enrollment-semester-filter'); // Nuevo filtro
    const levelFilter = document.getElementById('enrollment-level-filter');
    
    if (semesterFilter && levelFilter) {
        [semesterFilter, levelFilter].forEach(filter => {
            filter.addEventListener('change', () => {
                updateEnrollmentChart(
                    semesterFilter.value,
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
                    semesterFilter.value,
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
                    semesterFilter.value,
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
    // Calculando para 1er Semestre 2025 (por defecto)
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
        
        console.log('✅ Estadísticas inicializadas correctamente (1er Semestre 2025 y 2do Semestre 2024 cargados)');
        
    } catch (error) {
        console.error('❌ Error inicializando estadísticas:', error);
    }
}


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