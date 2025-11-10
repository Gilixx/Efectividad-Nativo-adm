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
        
        console.log('✅ Datos cargados correctamente desde JSON');
        console.log('📊 Matrícula:', matriculaData);
        console.log('👥 Demográficos:', demograficosData);
        console.log('🌍 Países:', paisesData);
        console.log('🏛️ Facultades:', facultades);
        console.log('📈 Histórico:', window.historicoData);
        
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