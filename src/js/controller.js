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
        window.acreditacionesData = jsonData.data.acreditaciones; // ← NUEVA: Para acreditaciones
        window.juntaGobiernoData = jsonData.data.juntaGobierno; // ← NUEVA: Para Junta de Gobierno

        console.log('✅ Datos cargados correctamente desde JSON');
        console.log('📊 Matrícula:', matriculaData);
        console.log('👥 Demográficos:', demograficosData);
        console.log('🌍 Países:', paisesData);
        console.log('🏛️ Facultades:', facultades);
        console.log('📈 Histórico:', window.historicoData);
        console.log('📋 Indicadores:', window.indicadoresData);
        console.log('📊 Dashboard Stats:', window.dashboardStatsData);
        console.log('🎓 Acreditaciones:', window.acreditacionesData);
        console.log('👔 Junta de Gobierno:', window.juntaGobiernoData);

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

        // Renderizar tabla de recomendaciones de acreditaciones (si existe en la página)
        if (window.acreditacionesData) {
            renderEstadisticasAcreditacion();
            renderRecomendaciones();
            renderProgramasAcademicos();
        }

        // Renderizar Junta de Gobierno (si existe en la página)
        if (window.juntaGobiernoData) {
            renderJuntaGobierno();
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
                        <i class="fas fa-arrow-up"></i> ${indicador.tendencia}
                    </span>
                    <span>${indicador.comparacion}</span>
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

/**
 * Renderiza las estadísticas de acreditación dinámicamente desde el JSON
 */
function renderEstadisticasAcreditacion() {
    if (!window.acreditacionesData || !window.acreditacionesData.estadisticas) {
        console.warn('⚠️ No hay datos de estadísticas de acreditación para renderizar');
        return;
    }

    const statsGrid = document.querySelector('.stats-grid');
    if (!statsGrid) {
        console.warn('⚠️ No se encontró el contenedor de estadísticas de acreditación');
        return;
    }

    // Limpiar contenedor
    statsGrid.innerHTML = '';

    // Renderizar cada estadística
    window.acreditacionesData.estadisticas.forEach(stat => {
        const statCard = document.createElement('div');
        statCard.className = 'stat-card';
        statCard.innerHTML = `
            <i class="fas ${stat.icono}"></i>
            <h3>${stat.valor}</h3>
            <p>${stat.descripcion}</p>
        `;
        statsGrid.appendChild(statCard);
    });

    console.log('✅ Estadísticas de acreditación renderizadas correctamente');
}

/**
 * Renderiza la tabla de recomendaciones de acreditaciones dinámicamente desde el JSON
 */
function renderRecomendaciones() {
    if (!window.acreditacionesData || !window.acreditacionesData.recomendaciones) {
        console.warn('⚠️ No hay datos de recomendaciones para renderizar');
        return;
    }

    const data = window.acreditacionesData.recomendaciones;

    // Actualizar título con año
    const tituloElement = document.querySelector('.recommendations-section h2');
    if (tituloElement) {
        tituloElement.textContent = `${data.titulo} (${data.año})`;
    }

    // Actualizar párrafo de resumen con negritas
    const parrafoElement = document.querySelector('.recommendations-section p');
    if (parrafoElement) {
        parrafoElement.innerHTML = `La institución y sus programas académicos han recibido un total de <strong>${data.resumen.total}</strong> recomendaciones de los diferentes organismos acreditadores, de los cuales <strong>${data.resumen.institucionales}</strong> son de acreditaciones institucionales y <strong>${data.resumen.programasAcademicos}</strong> son de programas académicos. Actualmente, se encuentran cumplidas <strong>${data.resumen.cumplidas} (${data.resumen.cumlidasPorcentaje})</strong> recomendaciones, en proceso <strong>${data.resumen.enProceso} (${data.resumen.enProcesoPorcentaje})</strong> y no cumplidas <strong>${data.resumen.noCumplidas} (${data.resumen.noCumplidasPorcentaje})</strong>. A continuación, se presenta un resumen y la distribución por áreas, de acuerdo a su última visita a la institución.`;
    }

    // Renderizar tabla
    const tbody = document.querySelector('.recommendations-table tbody');
    if (!tbody) {
        console.warn('⚠️ No se encontró el tbody de la tabla de recomendaciones');
        return;
    }

    // Limpiar tbody
    tbody.innerHTML = '';

    // Renderizar filas de agencias
    data.tabla.forEach(agencia => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${agencia.agencia}</td>
            <td>${agencia.total}</td>
            <td>${agencia.cumplidas}</td>
            <td>${agencia.enProceso}</td>
            <td>${agencia.noCumplidas}</td>
        `;
        tbody.appendChild(tr);
    });

    // Renderizar fila de totales
    const trTotal = document.createElement('tr');
    trTotal.className = 'total-row';
    trTotal.innerHTML = `
        <td>TOTAL</td>
        <td>${data.totales.total}</td>
        <td>${data.totales.cumplidas} (${data.totales.cumlidasPorcentaje})</td>
        <td>${data.totales.enProceso} (${data.totales.enProcesoPorcentaje})</td>
        <td>${data.totales.noCumplidas} (${data.totales.noCumplidasPorcentaje})</td>
    `;
    tbody.appendChild(trTotal);

    console.log('✅ Tabla de recomendaciones renderizada correctamente');
}

/**
 * Renderiza los programas académicos acreditados dinámicamente desde el JSON
 */
function renderProgramasAcademicos() {
    if (!window.acreditacionesData || !window.acreditacionesData.programasAcademicos) {
        console.warn('⚠️ No hay datos de programas académicos para renderizar');
        return;
    }

    const programasSlider = document.querySelector('.programs-slider');
    if (!programasSlider) {
        console.warn('⚠️ No se encontró el contenedor de programas académicos');
        return;
    }

    // Limpiar contenedor
    programasSlider.innerHTML = '';

    // Renderizar cada programa
    window.acreditacionesData.programasAcademicos.forEach(programa => {
        const programCard = document.createElement('div');
        programCard.className = 'program-card';

        // Construir lista de detalles
        const detallesHTML = programa.detalles.map(detalle =>
            `<li><strong>${detalle.etiqueta}:</strong> ${detalle.valor}</li>`
        ).join('');

        programCard.innerHTML = `
            <div class="program-header">
                <div class="program-icon">
                    <i class="fas ${programa.icono}"></i>
                </div>
                <h3>${programa.nombre}</h3>
            </div>
            <p class="program-summary">${programa.resumen.replace(
            programa.organismo,
            `<a href="${programa.organismoUrl}" target="_blank">${programa.organismo}</a>`
        )}</p>
            <div class="program-details">
                <p>${programa.descripcion.replace(
            programa.organismo,
            `<a href="${programa.organismoUrl}" target="_blank">${programa.organismo}</a>`
        )}</p>
                <ul>
                    ${detallesHTML}
                </ul>
            </div>
            <button class="toggle-details">Ver más <i class="fas fa-chevron-down"></i></button>
        `;

        programasSlider.appendChild(programCard);
    });

    // Reinicializar funcionalidad del slider después de renderizar
    if (typeof initProgramsSlider === 'function') {
        initProgramsSlider();
    }

    // Reinicializar botones expandibles
    if (typeof initExpandButtons === 'function') {
        initExpandButtons();
    }

    console.log('✅ Programas académicos renderizados correctamente');
}

/**
 * Renderiza la Junta de Gobierno dinámicamente desde el JSON
 */
function renderJuntaGobierno() {
    if (!window.juntaGobiernoData) {
        console.warn('⚠️ No hay datos de Junta de Gobierno para renderizar');
        return;
    }

    // Actualizar texto de introducción
    const introText = document.querySelector('.members-section .intro-text');
    if (introText) {
        introText.textContent = window.juntaGobiernoData.introduccion;
    }

    // Renderizar filtros
    const filterContainer = document.querySelector('.filter-container');
    if (filterContainer) {
        filterContainer.innerHTML = '<button class="filter-btn active" data-filter="all">Todos</button>';

        window.juntaGobiernoData.categorias.forEach(categoria => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.setAttribute('data-filter', categoria.id);
            btn.textContent = categoria.filtro;
            filterContainer.appendChild(btn);
        });
    }

    // Renderizar miembros
    const membersGrid = document.querySelector('.members-grid');
    if (!membersGrid) {
        console.warn('⚠️ No se encontró el contenedor de miembros');
        return;
    }

    // Limpiar grid
    membersGrid.innerHTML = '';

    // Renderizar cada miembro
    window.juntaGobiernoData.miembros.forEach(miembro => {
        const memberCard = document.createElement('div');
        memberCard.className = `member-card category-${miembro.categoria}`;
        memberCard.innerHTML = `
            <div class="member-role-tag">${miembro.etiqueta}</div>
            <h3>${miembro.nombre}</h3>
            <p>${miembro.cargo}</p>
        `;
        membersGrid.appendChild(memberCard);
    });

    // Inicializar funcionalidad de filtros
    initMemberFilters();

    console.log('✅ Junta de Gobierno renderizada correctamente');
}

/**
 * Inicializa la funcionalidad de filtros de miembros de Junta de Gobierno
 */
function initMemberFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const memberCards = document.querySelectorAll('.member-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remover clase active de todos los botones
            filterBtns.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            memberCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.classList.contains(`category-${filter}`)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}