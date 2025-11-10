// Namespace para evitar conflictos con otros scripts
const EnrollmentSlider = {
    // Configuración y datos específicos del slider
    config: {
        colors: [
            'rgba(84, 68, 239, 0.8)',   // primary
            'rgba(133, 142, 255, 0.8)',  // secondary
            'rgba(242, 205, 0, 0.8)',    // accent
            'rgba(66, 0, 124, 0.8)',     // dark-accent
            'rgba(175, 149, 113, 0.8)',  // neutral-accent
            'rgba(255, 99, 132, 0.8)',   // rojo
            'rgba(54, 162, 235, 0.8)',   // azul
            'rgba(255, 206, 86, 0.8)',   // amarillo
            'rgba(75, 192, 192, 0.8)'    // turquesa
        ],
        borderColors: [
            'rgba(84, 68, 239, 1)',
            'rgba(133, 142, 255, 1)',
            'rgba(242, 205, 0, 1)',
            'rgba(66, 0, 124, 1)',
            'rgba(175, 149, 113, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
        ],
        programs: [] // Se carga desde JSON
    },

    // Datos del slider - Se cargan desde JSON
    data: {
        enrollment: {},
        sparkline: {}
    },

    // Estado del slider
    state: {
        currentSlideIndex: 0,
        totalSlides: 2, // 2023 y 2022
        charts: {}
    },

    // Inicialización
    init: function() {
        // Solo inicializar si los elementos del slider existen
        if (!document.getElementById('enrollmentSliderWrapper')) {
            return;
        }

        // Cargar datos desde el JSON global
        if (window.historicoData) {
            this.config.programs = window.historicoData.programs;
            this.data.enrollment = window.historicoData.enrollment;
            this.data.sparkline = window.historicoData.sparkline;
            console.log('✅ Datos históricos cargados desde JSON');
        } else {
            console.error('❌ No se encontraron datos históricos. Asegúrate de que data.json se haya cargado correctamente.');
            return;
        }

        this.createCharts();
        this.createSparklines();
        this.updateSlider();
        this.bindEvents();
    },

    // Crear gráficas principales
    createCharts: function() {
        const years = [2023, 2022];
        
        years.forEach(year => {
            const canvasId = `enrollmentChart${year}`;
            const canvas = document.getElementById(canvasId);
            
            if (canvas) {
                this.state.charts[year] = this.createChart(canvasId, year, this.data.enrollment[year]);
            }
        });
    },

    // Crear una gráfica individual
    createChart: function(canvasId, year, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        // Destruir gráfica existente si hay una
        if (ctx.chartInstance) {
            ctx.chartInstance.destroy();
        }

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.config.programs,
                datasets: [{
                    label: `Estudiantes ${year}`,
                    data: data,
                    backgroundColor: this.config.colors,
                    borderColor: this.config.borderColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: `Distribución por Facultad/Escuela`,
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        beginAtZero: true
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });

        // Guardar referencia para destruir después si es necesario
        ctx.chartInstance = chart;
        return chart;
    },

    // Crear todas las sparklines
    createSparklines: function() {
        const years = [2023, 2022];
        years.forEach(year => {
            this.createSparkline(`sparkline${year}`, this.data.sparkline[year]);
        });
    },

    // Crear una sparkline individual
    createSparkline: function(containerId, data) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Limpiar contenido previo
        container.innerHTML = '';

        const maxValue = Math.max(...data);
        const minValue = Math.min(...data);
        const range = maxValue - minValue;

        data.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'sparkline-bar';
            
            // Calcular altura proporcional
            const heightPercent = range > 0 ? 
                ((value - minValue) / range) * 100 : 50;
            
            bar.style.height = `${heightPercent}%`;
            bar.style.backgroundColor = 'var(--primary-color)';
            bar.style.opacity = 0.6 + (heightPercent / 200);
            
            container.appendChild(bar);
        });
    },

    // Actualizar slider
    updateSlider: function() {
        const wrapper = document.getElementById('enrollmentSliderWrapper');
        if (!wrapper) return;

        const offset = -this.state.currentSlideIndex * (100 / this.state.totalSlides);
        wrapper.style.transform = `translateX(${offset}%)`;

        // Actualizar indicadores
        this.updateIndicators();
    },

    // Actualizar indicadores de navegación
    updateIndicators: function() {
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            if (index === this.state.currentSlideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    },

    // Cambiar slide
    changeSlide: function(direction) {
        this.state.currentSlideIndex += direction;

        // Límites del slider
        if (this.state.currentSlideIndex < 0) {
            this.state.currentSlideIndex = this.state.totalSlides - 1;
        } else if (this.state.currentSlideIndex >= this.state.totalSlides) {
            this.state.currentSlideIndex = 0;
        }

        this.updateSlider();
    },

    // Ir a slide específico
    goToSlide: function(slideNumber) {
        this.state.currentSlideIndex = slideNumber - 1;
        this.updateSlider();
    },

    // Vincular eventos
    bindEvents: function() {
        // Navegación por teclado
        document.addEventListener('keydown', (event) => {
            const modalVisible = document.getElementById('dashboardModal') && 
                               document.getElementById('dashboardModal').classList.contains('active');
            
            if (!modalVisible) {
                if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    this.changeSlide(-1);
                } else if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    this.changeSlide(1);
                }
            }
        });

        // Redimensionamiento
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    },

    // Manejar redimensionamiento
    handleResize: function() {
        // Redimensionar gráficas
        Object.values(this.state.charts).forEach(chart => {
            if (chart && typeof chart.resize === 'function') {
                chart.resize();
            }
        });
        
        // Recrear sparklines después de un delay
        setTimeout(() => {
            this.createSparklines();
        }, 100);
    }
};

// Funciones globales para los eventos onclick del HTML
function changeSlide(direction) {
    EnrollmentSlider.changeSlide(direction);
}

function currentSlide(slideNumber) {
    EnrollmentSlider.goToSlide(slideNumber);
}

// NO auto-inicializar aquí - el controller lo hará después de cargar datos
// La función init() será llamada por el controller cuando los datos estén listos

// Exportar para uso en otros scripts si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnrollmentSlider;
}