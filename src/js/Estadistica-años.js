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
            'rgba(75, 192, 192, 0.8)',   // turquesa
            'rgba(153, 102, 255, 0.8)'   // púrpura
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
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
        ],
        programs: [
            'Administración', 'Enfermería', 'Medicina', 'Psicología', 'Ingeniería', 
            'Educación', 'Teología', 'Contaduría', 'Comunicación', 'Nutrición'
        ]
    },

    // Datos del slider
    data: {
        enrollment: {
            2024: [125, 98, 85, 112, 78, 63, 52, 72, 58, 67],
            2023: [120, 95, 80, 110, 75, 60, 50, 70, 55, 65],
            2022: [115, 90, 75, 105, 70, 55, 45, 65, 50, 60]
        },
        sparkline: {
            2024: [70, 75, 82, 88, 95, 105, 125],
            2023: [65, 70, 78, 85, 92, 102, 120],
            2022: [60, 65, 72, 78, 85, 95, 115]
        }
    },

    // Estado del slider
    state: {
        currentSlideIndex: 0,
        totalSlides: 3,
        charts: {}
    },

    // Inicialización
    init: function() {
        // Solo inicializar si los elementos del slider existen
        if (!document.getElementById('enrollmentSliderWrapper')) {
            return;
        }

        this.createCharts();
        this.createSparklines();
        this.updateSlider();
        this.bindEvents();
    },

    // Crear gráficas principales
    createCharts: function() {
        const years = [2024, 2023, 2022];
        
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
                        text: `Distribución por Programa Académico`,
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
        const years = [2024, 2023, 2022];
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
                20 + ((value - minValue) / range) * 80 : 
                50;
            
            bar.style.height = `${heightPercent}%`;
            bar.style.left = `${index * 12}px`;
            bar.style.animationDelay = `${index * 0.1}s`;
            
            container.appendChild(bar);
        });
    },

    // Navegación del slider
    changeSlide: function(direction) {
        const newIndex = this.state.currentSlideIndex + direction;
        
        if (newIndex >= 0 && newIndex < this.state.totalSlides) {
            this.state.currentSlideIndex = newIndex;
            this.updateSlider();
        }
    },

    // Ir a slide específico
    goToSlide: function(slideNumber) {
        this.state.currentSlideIndex = slideNumber - 1;
        this.updateSlider();
    },

    // Actualizar slider
    updateSlider: function() {
        const wrapper = document.getElementById('enrollmentSliderWrapper');
        const dots = document.querySelectorAll('.slider-dot');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (!wrapper) return;

        // Mover el slider
        const translateX = -this.state.currentSlideIndex * 33.333;
        wrapper.style.transform = `translateX(${translateX}%)`;
        wrapper.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        // Actualizar indicadores
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.state.currentSlideIndex);
        });

        // Actualizar botones
        if (prevBtn) prevBtn.disabled = this.state.currentSlideIndex === 0;
        if (nextBtn) nextBtn.disabled = this.state.currentSlideIndex === this.state.totalSlides - 1;
    },

    // Vincular eventos
    bindEvents: function() {
        // Eventos de hover en slides
        const slides = document.querySelectorAll('.enrollment-slide');
        slides.forEach(slide => {
            slide.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            slide.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Navegación con teclado (solo si el slider está visible)
        document.addEventListener('keydown', (event) => {
            // Verificar si el slider está visible en la página
            const sliderSection = document.querySelector('.enrollment-slider-section');
            if (!sliderSection) return;

            const rect = sliderSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
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

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si Chart.js está disponible
    if (typeof Chart !== 'undefined') {
        EnrollmentSlider.init();
    } else {
        console.warn('Chart.js no está disponible. El slider de matrícula no se inicializará.');
    }
});

// Exportar para uso en otros scripts si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnrollmentSlider;
}