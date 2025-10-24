// Configuración de Reveal.js
Reveal.initialize({
    hash: true,
    transition: 'slide',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',
    plugins: [RevealMarkdown, RevealHighlight, RevealNotes],

    // Navigation
    controls: true,
    progress: true,
    center: true,
    touch: true,
    loop: false,

    // Presentation size
    width: 1024,
    height: 768,
    margin: 0.1,
    minScale: 0.2,
    maxScale: 2.0
});

// Simple Flashcard System
function flipCard(card) {
    card.classList.toggle('flipped');
}

// Initialize Mermaid
mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    themeVariables: {
        primaryColor: '#233570',
        primaryTextColor: '#233570',
        primaryBorderColor: '#233570',
        lineColor: '#666666'
    }
});