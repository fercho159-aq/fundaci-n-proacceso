document.addEventListener('DOMContentLoaded', () => {
    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isOpen = item.classList.contains('active');
            
            // Close other items
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });

    // Hero Image Parallax Scroll
    // The image slowly follows the scroll inside the hero section
    const heroSection = document.querySelector('.hero');
    const heroImg = document.querySelector('.hero-image-container');

    if (heroSection && heroImg) {
        window.addEventListener('scroll', () => {
            const heroRect = heroSection.getBoundingClientRect();
            const heroHeight = heroSection.offsetHeight;
            const imgHeight = heroImg.offsetHeight;

            // Only animate when hero is visible
            if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
                // How far through the hero has the user scrolled (0 = top, 1 = bottom)
                const scrollProgress = Math.max(0, Math.min(1,
                    -heroRect.top / (heroHeight - window.innerHeight)
                ));

                // The max shift is the difference between the section height and image height
                const maxShift = Math.max(0, heroHeight - imgHeight - 60); // 60px buffer
                const shift = scrollProgress * maxShift;

                heroImg.style.transform = `translateY(${shift}px)`;
            }
        }, { passive: true });
    }

    // Register Datalabels Plugin
    Chart.register(ChartDataLabels);

    // Chart.js Configuration
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return ` ${context.label}: ${context.parsed}%`;
                    }
                }
            },
            datalabels: {
                color: '#fff',
                formatter: (value) => {
                    return value + '%';
                },
                font: {
                    weight: 'bold',
                    size: 14
                }
            }
        },
        cutout: '70%'
    };

    // RIA Chart
    const riaCtx = document.getElementById('riaChart').getContext('2d');
    new Chart(riaCtx, {
        type: 'doughnut',
        data: {
            labels: ['Facilitadores', 'Difusión', 'Renta', 'Soporte', 'Otros'],
            datasets: [{
                data: [23, 15, 12, 25, 25], // Approximate values based on prompt
                backgroundColor: [
                    '#0A1F44',
                    '#B2D1F9',
                    '#4A90E2',
                    '#1A3A6C',
                    '#D1E4FF'
                ],
                borderWidth: 0
            }]
        },
        options: chartOptions
    });

    // BD Chart
    const bdCtx = document.getElementById('bdChart').getContext('2d');
    new Chart(bdCtx, {
        type: 'doughnut',
        data: {
            labels: ['Equipamiento', 'Supervisión', 'Materiales', 'Capacitación', 'Infraestructura'],
            datasets: [{
                data: [22, 17, 12, 30, 19], // Approximate values based on prompt
                backgroundColor: [
                    '#0A1F44',
                    '#B2D1F9',
                    '#4A90E2',
                    '#1A3A6C',
                    '#D1E4FF'
                ],
                borderWidth: 0
            }]
        },
        options: chartOptions
    });
});
