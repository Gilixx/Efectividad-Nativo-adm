// Variables globales para almacenar datos del JSON
let matriculaData = {};
let demograficosData = {};
let paisesData = {};
let facultades = [];

// Función asíncrona para cargar datos desde JSON
async function loadStatisticsData() {
    try {
        console.log('🔄 Cargando datos desde JSON...');
        
        // Cargar el archivo JSON desde src/js/data.json
        const response = await fetch('src/js/data.json');
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const jsonData = await response.json();
        
        // Verificar que los datos sean correctos
        if (jsonData.success !== 1) {
            throw new Error(jsonData.message || 'Error en la estructura del JSON');
        }
        
        // Asignar datos del JSON a variables globales
        matriculaData = jsonData.data.matricula;
        demograficosData = jsonData.data.demograficos;
        paisesData = jsonData.data.paises;
        facultades = jsonData.data.facultades;
        window.historicoData = jsonData.data.historico; // ← LÍNEA IMPORTANTE PARA MATRÍCULA HISTÓRICA
        window.indicadoresData = jsonData.data.indicadores; // ← NUEVA: Para indicadores
        window.dashboardStatsData = jsonData.data.dashboardStats; // ← NUEVA: Para stats del dashboard
        
        console.log('✅ Datos cargados correctamente desde JSON');
        console.log('📊 Matrícula:', matriculaData);
        console.log('👥 Demográficos:', demograficosData);
        console.log('🌍 Países:', paisesData);
        console.log('🏛️ Facultades:', facultades);
        console.log('📈 Histórico:', window.historicoData);
        console.log('📋 Indicadores:', window.indicadoresData);
        console.log('📊 Dashboard Stats:', window.dashboardStatsData);
        
        // Inicializar estadísticas después de cargar los datos
        if (typeof initStatistics === 'function') {
            initStatistics();
        }
        
        // Inicializar el slider histórico después de cargar los datos
        if (typeof EnrollmentSlider !== 'undefined' && EnrollmentSlider.init) {
            if (typeof Chart !== 'undefined') {
                EnrollmentSlider.init();
                console.log('✅ Slider histórico inicializado');
            } else {
                console.warn('⚠️ Chart.js no está disponible para el slider');
            }
        }
        
        // Renderizar indicadores dinámicamente
        renderIndicadores();
        renderDashboardStats();
        
    } catch (error) {
        console.error('❌ Error al cargar datos desde JSON:', error);
        alert('Error al cargar las estadísticas. Por favor, verifica que el archivo src/js/data.json existe y es válido.');
    }
}

// Cargar datos cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadStatisticsData);
} else {
    loadStatisticsData();
}

/**
 * Renderiza los indicadores dinámicamente desde el JSON
 */
function renderIndicadores() {
    if (!window.indicadoresData) {
        console.warn('⚠️ No hay datos de indicadores para renderizar');
        return;
    }

    const indicadoresContainer = document.querySelector('.indicators-column');
    if (!indicadoresContainer) {
        console.warn('⚠️ No se encontró el contenedor de indicadores');
        return;
    }

    // Limpiar contenedor
    indicadoresContainer.innerHTML = '';

    // Renderizar cada indicador
    Object.values(window.indicadoresData).forEach(indicador => {
        const indicadorHTML = `
            <div class="stat-indicator">
                <div class="stat-header">
                    <div class="stat-icon">
                        <i class="fas ${indicador.icono}"></i>
                    </div>
                    <div class="stat-info">
                        <h3>${indicador.titulo}</h3>
                        <div class="stat-value">${indicador.valor}</div>
                    </div>
                </div>
                <div class="stat-detail">
                    <span class="stat-trend ${indicador.tipo}">
                    </span>
                </div>
            </div>
        `;
        indicadoresContainer.innerHTML += indicadorHTML;
    });

    console.log('✅ Indicadores renderizados correctamente');
}

/**
 * Renderiza las estadísticas del dashboard dinámicamente desde el JSON
 */
function renderDashboardStats() {
    if (!window.dashboardStatsData) {
        console.warn('⚠️ No hay datos de dashboard stats para renderizar');
        return;
    }

    const statsContainer = document.querySelector('.dashboard-stats');
    if (!statsContainer) {
        console.warn('⚠️ No se encontró el contenedor de dashboard stats');
        return;
    }

    // Limpiar contenedor
    statsContainer.innerHTML = '';

    // Mapeo de keys a labels
    const labels = {
        'facultades': 'Facultades',
        'programas': 'Programas Académicos',
        'tesis': 'Tesis',
        'divisiones': 'Divisiones'
    };

    // Renderizar cada stat
    Object.entries(window.dashboardStatsData).forEach(([key, value]) => {
        const statHTML = `
            <div class="mini-stat">
                <span class="mini-stat-value">${value}</span>
                <div class="mini-stat-label">${labels[key]}</div>
            </div>
        `;
        statsContainer.innerHTML += statHTML;
    });

    console.log('✅ Dashboard stats renderizados correctamente');
}