"""
Genera PDF de presentacion.html con Playwright
Instalación: pip install playwright && playwright install chromium
Uso: python generar_pdf.py
"""

from playwright.sync_api import sync_playwright
from pathlib import Path

def generar_pdf_presentacion():
    # Configuración
    archivo_html = Path(__file__).parent / "presentacion.html"
    archivo_pdf = Path(__file__).parent / "presentacion.pdf"

    if not archivo_html.exists():
        print(f"❌ Error: No se encontró {archivo_html}")
        return

    print(f"📄 Entrada: {archivo_html}")
    print(f"💾 Salida: {archivo_pdf}")
    print("⏳ Generando PDF...")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(
            viewport={'width': 1920, 'height': 1080},
            device_scale_factor=2
        )

        page.goto(f"file:///{archivo_html.absolute()}")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)

        # CSS para impresión: position absolute → static + page breaks
        page.add_style_tag(content="""
            @page {
                size: A4 landscape;
                margin: 0;
            }

            @media print {
                body {
                    background: #0f1419 !important;
                    overflow: visible !important;
                    height: auto !important;
                }

                .presentation-container {
                    position: static !important;
                    height: auto !important;
                    display: block !important;
                }

                .slide {
                    position: static !important;
                    display: flex !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                    width: 100% !important;
                    height: 100vh !important;
                    min-height: 100vh !important;
                    page-break-after: always !important;
                    page-break-inside: avoid !important;
                    margin: 0 !important;
                    border: none !important;
                    border-radius: 0 !important;
                }

                .slide:last-child {
                    page-break-after: auto !important;
                }

                .nav-controls, .progress-bar, .slide-counter, .uide-logo {
                    display: none !important;
                }

                .mermaid, pre[class*="language-"], table {
                    page-break-inside: avoid !important;
                }
            }
        """)

        # Modificar DOM: position absolute → static
        page.evaluate("""
            () => {
                const slides = document.querySelectorAll('.slide');
                slides.forEach(slide => {
                    slide.classList.remove('active');
                    slide.style.display = 'flex';
                    slide.style.position = 'static';
                    slide.style.pageBreakAfter = 'always';
                });
                if (slides.length > 0) {
                    slides[slides.length - 1].style.pageBreakAfter = 'auto';
                }
                const container = document.querySelector('.presentation-container');
                if (container) {
                    container.style.position = 'static';
                    container.style.height = 'auto';
                    container.style.display = 'block';
                }
            }
        """)

        # Generar PDF
        page.pdf(
            path=str(archivo_pdf),
            format='A4',
            landscape=True,
            print_background=True,
            margin={'top': '0mm', 'right': '0mm', 'bottom': '0mm', 'left': '0mm'}
        )

        browser.close()

    print(f"✅ PDF generado exitosamente: {archivo_pdf}")
    print(f"📊 Tamaño: {archivo_pdf.stat().st_size / 1024:.2f} KB")

if __name__ == "__main__":
    try:
        generar_pdf_presentacion()
    except Exception as e:
        print(f"❌ Error: {e}")
        print("💡 Instala Playwright: pip install playwright && playwright install chromium")
