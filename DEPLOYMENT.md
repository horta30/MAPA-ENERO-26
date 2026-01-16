# 🚀 Guía de Despliegue - Bosque Abierto MTB

Esta guía te ayudará a subir el proyecto a GitHub Pages o cualquier servidor web.

## ✅ Pre-requisitos

- Cuenta de GitHub
- Git instalado localmente
- Archivos del proyecto

## 📋 Opción 1: GitHub Pages (Recomendado)

### Paso 1: Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `bosque-abierto-mtb` (o el que prefieras)
3. Descripción: "Mapa interactivo de senderos MTB en predios ARAUCO"
4. Público o Privado (tu eliges)
5. **NO** inicializar con README (ya tienes uno)
6. Click en "Create repository"

### Paso 2: Subir Proyecto desde tu Computadora

```bash
# Navega a la carpeta del proyecto
cd bosque-abierto-mtb

# Inicializa Git (si aún no lo hiciste)
git init

# Agrega todos los archivos
git add .

# Haz el primer commit
git commit -m "Initial commit: Mapa Bosque Abierto MTB V38"

# Conecta con GitHub (reemplaza TU_USUARIO y TU_REPO)
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git

# Sube los archivos
git branch -M main
git push -u origin main
```

### Paso 3: Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en "Settings" (⚙️)
3. En el menú lateral, click en "Pages"
4. En "Source", selecciona: **main branch**
5. Click en "Save"
6. Espera 1-2 minutos

✅ Tu sitio estará disponible en:
```
https://TU_USUARIO.github.io/TU_REPO
```

### Paso 4: Verificar Deployment

1. Espera el mensaje: "Your site is live at..."
2. Click en el link para abrir
3. Verifica que:
   - El mapa carga correctamente
   - Los 16 senderos aparecen
   - La descarga GPX funciona
   - La navegación GPS funciona

## 📋 Opción 2: Netlify (Alternativa)

### Paso 1: Crear cuenta en Netlify

1. Ve a https://www.netlify.com
2. Sign up (puedes usar tu cuenta de GitHub)

### Paso 2: Deploy

#### Método A - Drag & Drop

1. En Netlify Dashboard, click en "Sites"
2. Arrastra la carpeta del proyecto completa
3. ¡Listo! Netlify te dará una URL

#### Método B - Desde GitHub

1. Sube primero a GitHub (ver Opción 1, Paso 2)
2. En Netlify: "Add new site" > "Import from Git"
3. Conecta GitHub y selecciona tu repositorio
4. Build settings:
   - Build command: (dejar vacío)
   - Publish directory: `.` (punto)
5. Click en "Deploy"

✅ URL estará disponible en minutos

### Paso 3: Dominio Personalizado (Opcional)

1. En Netlify > Site settings > Domain management
2. Click en "Add custom domain"
3. Sigue las instrucciones para conectar tu dominio

## 📋 Opción 3: Servidor Web Tradicional

### Hosting compartido (cPanel, Plesk, etc.)

1. Comprime todo el proyecto en un ZIP
2. Accede a tu cPanel/Plesk
3. Ve al File Manager
4. Navega a `public_html` o `www`
5. Sube y descomprime el ZIP
6. ¡Listo!

### Servidor VPS (Linux)

```bash
# Conectar via SSH
ssh usuario@tu-servidor.com

# Navegar a directorio web
cd /var/www/html

# Clonar repositorio
git clone https://github.com/TU_USUARIO/TU_REPO.git

# Configurar permisos
chmod -R 755 TU_REPO

# Configurar Nginx/Apache para servir desde esta carpeta
```

## 🔄 Actualizar el Proyecto

### En GitHub Pages

```bash
# Hacer cambios en archivos locales
# Luego:

git add .
git commit -m "Descripción de cambios"
git push

# GitHub Pages se actualizará automáticamente en 1-2 minutos
```

### En Netlify

Si conectaste con GitHub:
- Netlify detecta cambios automáticamente
- Se redeploya automáticamente

Si usaste drag & drop:
- Arrastra la carpeta actualizada de nuevo

## ✅ Checklist Post-Deployment

Después de deployar, verifica:

- [ ] Mapa carga sin errores
- [ ] Los 16 puntos verdes aparecen
- [ ] Click en punto verde muestra información
- [ ] Navegación GPS abre Google Maps/Waze
- [ ] Descarga GPX funciona
- [ ] Responsive se ve bien en móvil
- [ ] No hay errores en consola (F12)

## 🐛 Troubleshooting

### "404 Not Found" en GitHub Pages

- Verifica que activaste Pages en Settings
- Asegúrate de seleccionar "main branch"
- index.html debe estar en la raíz

### Archivos GPX no se descargan

- Verifica que la carpeta `gpx/` esté subida
- Revisa permisos del servidor
- Chequea paths en `data/trails.js`

### Mapa no carga

- Abre consola (F12) y busca errores
- Verifica que `css/`, `js/`, `data/` estén subidos
- Confirma que MapLibre GL JS se carga desde CDN

### Estilos rotos

- Verifica que `css/styles.css` esté en la ruta correcta
- Revisa paths relativos en `index.html`

## 📊 Monitoring

### Google Analytics (Opcional)

Agrega antes del `</head>` en `index.html`:

```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TU_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'TU_ID');
</script>
```

## 🔐 Seguridad

### Headers de Seguridad (Netlify)

Crear `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "no-referrer"
```

## 📞 Soporte

Si encuentras problemas:

1. Revisa esta guía
2. Chequea la consola del navegador (F12)
3. Verifica que todos los archivos estén subidos
4. Contacta al equipo de desarrollo

---

✅ **Proyecto listo para producción**
🚀 **Despliega con confianza**
