# 📄 Generar PDF de la Presentación

Genera un PDF de `presentacion.html` respetando todos los estilos, diagramas Mermaid y syntax highlighting.

## 🚀 Uso Rápido

### Windows
```bash
# Doble clic en: generar_pdf.bat

# O manualmente:
pip install playwright
playwright install chromium
python generar_pdf.py
```

### Mac/Linux
```bash
pip3 install playwright
playwright install chromium
python3 generar_pdf.py
```

---

## 🔧 Solución Técnica

### El Problema
Las presentaciones tipo slider usan `position: absolute` para apilar slides. Al imprimir, todos los slides se montan uno sobre otro.

### La Solución
El script cambia `position: absolute` → `position: static` y añade `page-break-after: always` para separar cada slide en su propia página.

```
ANTES (navegador):          DESPUÉS (PDF):
┌─────────────┐            ┌─────────────┐
│ Slide 1 ●   │            │ Slide 1     │ Página 1
│ Slide 2     │            ├─────────────┤
│ Slide 3     │  ────►     │ Slide 2     │ Página 2
│ (apilados)  │            ├─────────────┤
└─────────────┘            │ Slide 3     │ Página 3
position: absolute         └─────────────┘
                           position: static
```

---

## ✅ Resultado

- **Archivo:** `presentacion.pdf`
- **Páginas:** ~23 (una por slide)
- **Formato:** A4 horizontal
- **Calidad:** Alta resolución
- **Diagramas Mermaid:** ✅ Renderizados
- **Syntax highlighting:** ✅ Preservado
- **Fondos oscuros:** ✅ Incluidos

---

## ❓ Problemas Comunes

### Error: "playwright no está instalado"
```bash
pip install playwright
playwright install chromium
```

### Los diagramas Mermaid no se ven
Edita `generar_pdf.py` y aumenta el tiempo de espera:
```python
page.wait_for_timeout(5000)  # De 2000 → 5000
```

### Cambiar orientación a vertical
Edita `generar_pdf.py`:
```python
page.pdf(
    landscape=False,  # Cambiar a False
    # ...
)
```

---

**Tiempo de ejecución:** ~5-10 segundos
**Tamaño del PDF:** ~500 KB - 2 MB
