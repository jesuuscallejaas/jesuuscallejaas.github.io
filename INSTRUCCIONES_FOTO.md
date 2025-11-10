# 📸 Instrucciones para Añadir tu Foto al Portfolio

## ✅ Paso 1: Preparar tu foto

1. **Elige una buena foto tuya** (preferiblemente profesional o de perfil)
2. **Nombre recomendado**: `foto-perfil.jpg` o `foto-perfil.png`
3. **Tamaño recomendado**: Al menos 500x500 píxeles
4. **Formato**: JPG o PNG

## 📁 Paso 2: Colocar la foto

1. Abre la carpeta: `c:\Users\jesus\OneDrive\Escritorio\portfolio\images\`
2. Copia tu foto en esa carpeta
3. Asegúrate de que el nombre coincida con el que usarás en el código

## 🔧 Paso 3: Actualizar el código HTML

### Opción A: Foto en "Sobre Mí" (YA ESTÁ CONFIGURADO ✅)

En el archivo `index.html`, línea 103, cambia:
```html
<img src="images/tu-foto.jpg" alt="Jesús Callejas Soto - Foto de perfil">
```

Por:
```html
<img src="images/NOMBRE-DE-TU-FOTO.jpg" alt="Jesús Callejas Soto - Foto de perfil">
```

Reemplaza `NOMBRE-DE-TU-FOTO.jpg` por el nombre real de tu archivo.

### Opción B: Foto en el Hero Section (Página principal)

Si quieres añadir tu foto junto al balón de fútbol en la página principal:

1. Busca la línea que dice: `<div class="hero-image">`
2. Puedes añadir tu foto encima del balón o crear un diseño combinado

## 🎨 Estilos aplicados:

Tu foto tendrá:
- ✅ Forma circular
- ✅ Borde blanco con sombra verde
- ✅ Animación de flotación
- ✅ Efecto de brillo al pasar el mouse
- ✅ Zoom suave al hacer hover
- ✅ Efecto de resplandor animado

## 🔍 Verificación:

Después de añadir tu foto:
1. Guarda los cambios en `index.html`
2. Abre o recarga `index.html` en tu navegador
3. Ve a la sección "Sobre Mí"
4. Deberías ver tu foto con todos los efectos animados

## ⚠️ Solución de problemas:

**Si la foto no aparece:**
- Verifica que el nombre del archivo sea correcto (incluyendo mayúsculas/minúsculas)
- Asegúrate de que la foto esté en la carpeta `images/`
- Verifica que el formato sea JPG o PNG
- Recarga la página con Ctrl+F5 (forzar recarga)

**Si la foto se ve pixelada:**
- Usa una imagen de mayor resolución (mínimo 500x500px)
- Exporta la imagen con calidad alta

## 💡 Ejemplo completo:

Si tu foto se llama `jesus-perfil.jpg` y está en `images/`:

```html
<img src="images/jesus-perfil.jpg" alt="Jesús Callejas Soto - Foto de perfil">
```

---

¿Necesitas ayuda? Consulta este archivo o pide asistencia. 🚀
