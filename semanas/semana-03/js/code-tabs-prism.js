// ===== INICIALIZACIÓN DE PRISM.JS Y TABS DE CÓDIGO =====
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Prism en todos los bloques de código
    Prism.highlightAll();

    // ===== TABS DE CÓDIGO =====
    const setupCodeTabs = () => {
        console.log('setupCodeTabs function called.');
        const tabContainers = document.querySelectorAll('.code-tabs-container');
        console.log('Found tab containers:', tabContainers.length);

        tabContainers.forEach(container => {
            const tabButtons = container.querySelectorAll('.code-tab-btn');
            const tabContents = container.querySelectorAll('.code-tab-content');
            console.log('Container:', container, 'Buttons:', tabButtons.length, 'Contents:', tabContents.length);

            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetTab = button.getAttribute('data-tab');
                    console.log('Tab button clicked:', targetTab);

                    // Remover clase active de todos los botones y contenidos
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));

                    // Agregar clase active al botón clickeado
                    button.classList.add('active');

                    // Mostrar el contenido correspondiente
                    const targetContent = container.querySelector(`.code-tab-content[data-tab="${targetTab}"]`);
                    if (targetContent) {
                        targetContent.classList.add('active');
                        console.log('Activated tab content for:', targetTab);

                        // Re-highlight del código cuando se muestra la tab
                        setTimeout(() => {
                            const codeBlocks = targetContent.querySelectorAll('code[class*="language-"]');
                            codeBlocks.forEach(block => {
                                Prism.highlightElement(block);
                            });
                            console.log('Re-highlighted code for:', targetTab);
                        }, 10);
                    }
                });
            });
        });
    };

    // Inicializar tabs
    setupCodeTabs();

    // ===== BOTONES DE COPIAR CÓDIGO =====
    const setupCopyButtons = () => {
        const copyButtons = document.querySelectorAll('.copy-code-btn');

        copyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const codeContainer = button.closest('.code-container');
                const codeBlock = codeContainer.querySelector('code');
                const codeText = codeBlock.textContent;

                // Copiar al portapapeles
                navigator.clipboard.writeText(codeText).then(() => {
                    // Cambiar apariencia del botón
                    const originalHTML = button.innerHTML;
                    button.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                    button.classList.add('copied');

                    // Restaurar después de 2 segundos
                    setTimeout(() => {
                        button.innerHTML = originalHTML;
                        button.classList.remove('copied');
                    }, 2000);
                }).catch(err => {
                    console.error('Error al copiar:', err);
                    button.innerHTML = '<i class="fas fa-times"></i> Error';
                    setTimeout(() => {
                        button.innerHTML = '<i class="fas fa-copy"></i> Copiar';
                    }, 2000);
                });
            });
        });
    };

    // Inicializar botones de copiar
    setupCopyButtons();

    // ===== RE-HIGHLIGHT AL CAMBIAR DE SLIDE =====
    // Escuchar cambios de slide para re-highlight
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const slide = mutation.target;
                if (slide.classList.contains('active')) {
                    // Re-highlight código en el slide activo
                    setTimeout(() => {
                        const codeBlocks = slide.querySelectorAll('code[class*="language-"]');
                        codeBlocks.forEach(block => {
                            Prism.highlightElement(block);
                        });
                    }, 100);
                }
            }
        });
    });

    // Observar todos los slides
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        observer.observe(slide, {
            attributes: true,
            attributeFilter: ['class']
        });
    });

    // Highlight inicial del primer slide
    setTimeout(() => {
        Prism.highlightAll();
    }, 500);
});
