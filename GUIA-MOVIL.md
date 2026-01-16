# 📱 Guía de Uso Móvil - MAPA ENERO 3.0

## ✅ NUEVA FUNCIONALIDAD: Abrir GPX Directo en Strava

### 🎯 Cómo Funciona Ahora

**ANTES** (complicado):
1. Descargar GPX
2. Ir a Strava
3. Subir manualmente

**AHORA** (fácil):
1. Click en "🔥 Descargar Ruta Strava"
2. Tu teléfono pregunta: "¿Abrir con Strava?"
3. ¡Listo! Se abre directo en Strava

---

## 🔧 Mejoras Técnicas V3.0

### 1. **Tipo MIME Correcto**
```javascript
type: 'application/gpx+xml'  // Reconocido por apps GPS
```

### 2. **Web Share API**
En iOS y Android modernos:
- Usa API nativa de compartir
- El sistema ofrece apps compatibles (Strava, Komoot, Garmin)
- Fallback automático si no está disponible

### 3. **Etiquetas GPX Corregidas**
```xml
<name>Nombre Ruta</name>  ✅ Correcto
<n>Nombre Ruta</n>        ❌ Incorrecto (versión anterior)
```

---

## 📱 Compatibilidad

### ✅ iOS (Safari)
- iOS 14+: Abre menú compartir → Selecciona Strava
- iOS 13 o menos: Descarga archivo → Importa manualmente

### ✅ Android (Chrome)
- Android 10+: Pregunta "¿Abrir con?" → Strava aparece
- Android 9 o menos: Descarga → Importa desde archivos

### ✅ Desktop (Chrome/Edge/Firefox)
- Descarga archivo GPX
- Arrástralo a Strava.com o usa botón de subida

---

## 🧪 Cómo Probar

### En Tu Móvil:

1. **Abre el mapa** en tu navegador móvil
2. **Selecciona una ruta** (click en punto verde o línea)
3. **Click en "🔥 Descargar Ruta Strava"**
4. **Observa**:
   - En iOS: Aparece menú de compartir
   - En Android: Pregunta "¿Abrir con?"
5. **Selecciona Strava**
6. ✅ La ruta se abre directo en la app

---

## 🔍 Si No Funciona

### Opción A: Descargar y Abrir Manual
1. Descarga el GPX
2. Abre tu app de archivos
3. Busca el archivo .gpx
4. Click → "Abrir con Strava"

### Opción B: Desde Strava Directamente
1. Abre Strava app
2. Perfil → ⚙️ Configuración
3. "Subir actividad"
4. Selecciona el archivo GPX descargado

---

## 🎓 Para Desarrolladores

### Función Principal: `shareGPX()`

```javascript
async function shareGPX(gpxPath, trailName) {
  // 1. Descarga el GPX
  const response = await fetch(gpxPath);
  const blob = await response.blob();
  
  // 2. Crear blob con tipo MIME correcto
  const gpxBlob = new Blob([blob], { 
    type: 'application/gpx+xml' 
  });
  
  // 3. Crear File object
  const file = new File([gpxBlob], fileName, { 
    type: 'application/gpx+xml' 
  });
  
  // 4. Intentar compartir (Web Share API)
  if (navigator.share && navigator.canShare({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: trailName,
      text: `Ruta MTB: ${trailName}`
    });
  } else {
    // Fallback: descarga tradicional
    downloadGPX(gpxPath, trailName);
  }
}
```

### Por Qué Funciona

1. **`application/gpx+xml`**: Tipo MIME estándar para GPX
2. **Web Share API**: API nativa del navegador móvil
3. **File object**: Permite que el sistema vea el archivo como descargable
4. **Fallback**: Si Web Share no está disponible, usa descarga normal

---

## 📊 Estadísticas de Compatibilidad

| Plataforma | Web Share API | Descarga Normal |
|------------|---------------|-----------------|
| iOS 14+ | ✅ Perfecto | ✅ Funciona |
| iOS 13- | ❌ No soportado | ✅ Funciona |
| Android 10+ | ✅ Perfecto | ✅ Funciona |
| Android 9- | ❌ No soportado | ✅ Funciona |
| Desktop | ❌ No soportado | ✅ Funciona |

**Cobertura total**: 100% de usuarios pueden descargar GPX
**Experiencia mejorada**: ~80% de usuarios móviles (iOS 14+ y Android 10+)

---

## 🚀 Próximas Mejoras

### Posibles Features V3.1:
- [ ] Botón "Abrir en Komoot"
- [ ] Botón "Abrir en Garmin Connect"
- [ ] Vista previa 3D de la ruta antes de descargar
- [ ] Compartir ruta por WhatsApp/Telegram

---

**Desarrollado para ARAUCO - Guardianes del Bosque** 🌲🚵  
**Versión 3.0** - Enero 2025
