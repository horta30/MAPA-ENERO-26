// ============================================================================
// MAPA BOSQUE ABIERTO MTB - VERSION FINAL 0.0
// ============================================================================
// CARACTERÍSTICAS:
// - 16 rutas MTB con navegación GPS (Google Maps + Waze)
// - Descarga de rutas compatibles con Strava
// - Panel lateral oculto por defecto en móvil
// - Lazy loading de rutas optimizado
// - Welcome overlay de 1.5 segundos
// ============================================================================

let map;
let trailsGeoJSON = null;
let selectedTrailId = null;
let showOnlySelected = false;
let allTrailFeatures = [];
let trailCache = new Map();
let isMobile = false;

// V37: Control de carga de rutas
let routesLoaded = false;
let routesLoading = false;
const ZOOM_THRESHOLD = 9.5;

// V38: Almacén de coordenadas reales de puntos de inicio
let realStartCoords = new Map();

const DIFFICULTY_LABELS = {
  'verde': 'FÁCIL',
  'azul': 'INTERMEDIO',
  'negro': 'DIFÍCIL'
};

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  detectMobile();
  initMap();
  setupEventListeners();
  setupMobileExperience();
});

function detectMobile() {
  isMobile = window.innerWidth <= 768 || 
             /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 768;
  });
}

function initMap() {
  const initialZoom = isMobile ? 7.0 : 7.5;
  
  map = new maplibregl.Map({
    container: 'map',
    style: {
      version: 8,
      // V39: Agregar color de fondo para evitar negro
      glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
      sources: {
        osm: {
          type: 'raster',
          tiles: [
            'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
          ],
          tileSize: 256,
          attribution: '© OpenStreetMap contributors',
          minzoom: 0,
          maxzoom: 19
        }
      },
      layers: [
        // V39: Capa de fondo para evitar negro
        {
          id: 'background',
          type: 'background',
          paint: {
            'background-color': '#1a2e1a'  // Verde oscuro como fondo
          }
        },
        {
          id: 'osm-base',
          type: 'raster',
          source: 'osm',
          minzoom: 0,
          maxzoom: 22
        }
      ]
    },
    center: [-73.0, -37.8],
    zoom: initialZoom,
    maxZoom: 18,
    minZoom: 5.5,  // V39: Zoom mínimo más alto para evitar tiles faltantes
    attributionControl: true
  });

  map.addControl(
    new maplibregl.NavigationControl({
      showCompass: true,
      showZoom: true,
      visualizePitch: true
    }), 
    'top-right'
  );
  
  map.addControl(
    new maplibregl.ScaleControl({
      maxWidth: 100,
      unit: 'metric'
    }), 
    'bottom-right'
  );

  map.addControl(
    new maplibregl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    }),
    'top-right'
  );

  map.on('load', async () => {
    initStaticPins();
    renderRutasList();
    updateHeaderStats();
    setupMapInteractions();
    
    map.on('zoomend', checkZoomAndLoadRoutes);
    
    setTimeout(() => {
      fitAllPins();
    }, 300);
    
    // V15: Mostrar mini pop-ups exploratorios después de 4 segundos
    setTimeout(() => {
      showMiniPopups();
    }, 4000);
  });
}

// ============================================================================
// V38 - FUNCIONES DE NAVEGACIÓN
// ============================================================================

/**
 * Abre Google Maps con navegación al punto
 */
function openGoogleMaps(lat, lng, name) {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
  window.open(url, '_blank');
}

/**
 * Abre Waze con navegación al punto
 */
function openWaze(lat, lng) {
  const url = `https://www.waze.com/ul?ll=${lat},${lng}&navigate=yes`;
  window.open(url, '_blank');
}

/**
 * Obtiene coordenadas para navegación de una ruta
 * Prioriza: 1) Coordenadas reales del KMZ, 2) startCoords definidas, 3) Aproximadas
 */
function getNavCoordsForTrail(trailId) {
  // Primero buscar en coordenadas reales extraídas del KMZ
  if (realStartCoords.has(trailId)) {
    return realStartCoords.get(trailId);
  }
  
  // Luego buscar en datos de TRAILS
  const trail = TRAILS.find(t => t.id === trailId);
  if (trail && trail.startCoords) {
    return { lng: trail.startCoords[0], lat: trail.startCoords[1] };
  }
  
  // Fallback a coordenadas aproximadas
  if (trail) {
    const coords = getApproximateCoords(trail);
    return { lng: coords[0], lat: coords[1] };
  }
  
  return null;
}

/**
 * Genera HTML de botones de navegación
 */
function getNavigationButtonsHTML(lat, lng, name, size = 'normal') {
  const escapedName = escapeHtml(name).replace(/'/g, "\\'");
  const sizeClass = size === 'small' ? 'nav-btn-small' : '';
  
  return `
    <div class="navigation-buttons ${sizeClass}">
      <button class="nav-btn google-maps-btn" 
              onclick="event.stopPropagation(); openGoogleMaps(${lat}, ${lng}, '${escapedName}')" 
              title="Navegar con Google Maps">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <span>Google Maps</span>
      </button>
      <button class="nav-btn waze-btn" 
              onclick="event.stopPropagation(); openWaze(${lat}, ${lng})" 
              title="Navegar con Waze">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <span>Waze</span>
      </button>
    </div>
  `;
}

/**
 * Genera HTML compacto de botones de navegación para tarjetas
 */
function getCompactNavigationHTML(trailId) {
  const coords = getNavCoordsForTrail(trailId);
  if (!coords) return '';
  
  const trail = TRAILS.find(t => t.id === trailId);
  const name = trail ? trail.name : '';
  
  return `
    <div class="card-navigation-row">
      <span class="nav-label">📍 Cómo llegar:</span>
      <div class="card-nav-buttons">
        <button class="card-nav-btn gmaps" 
                onclick="event.stopPropagation(); openGoogleMaps(${coords.lat}, ${coords.lng}, '${escapeHtml(name).replace(/'/g, "\\'")}')" 
                title="Google Maps">
          <span class="nav-icon-mini">🗺️</span> Maps
        </button>
        <button class="card-nav-btn waze" 
                onclick="event.stopPropagation(); openWaze(${coords.lat}, ${coords.lng})" 
                title="Waze">
          <span class="nav-icon-mini">🚗</span> Waze
        </button>
      </div>
    </div>
  `;
}

// ============================================================================
// V37 - PUNTOS ESTÁTICOS (sin cargar KMZ)
// ============================================================================

function initStaticPins() {
  const pinFeatures = TRAILS.map(trail => {
    const coords = trail.startCoords || getApproximateCoords(trail);
    return {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: coords },
      properties: {
        id: trail.id,
        nombre: trail.name,
        type: trail.type,
        disciplina: trail.type,
        club: trail.club,
        dificultad: trail.difficulty,
        distancia_km: trail.distanceKm,
        desnivel_positivo: trail.ascent,
        desnivel_negativo: trail.descent,
        ubicacion: trail.location,
        region: trail.region,
        gpx: trail.gpx,
        // V38: Guardar coordenadas para navegación
        nav_lat: coords[1],
        nav_lng: coords[0]
      }
    };
  });

  const pinData = {
    type: 'FeatureCollection',
    features: pinFeatures
  };

  separateOverlappingPins(pinData.features);

  map.addSource('trail-pins', { type: 'geojson', data: pinData });

  // Halo de los puntos
  map.addLayer({
    id: 'trails-pins-halo',
    type: 'circle',
    source: 'trail-pins',
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 6, 6, 8, 8, 12, 10, 16, 12],
      'circle-color': '#00e5a0',
      'circle-opacity': 0.3,
      'circle-blur': 0.5
    }
  });

  // Puntos principales
  map.addLayer({
    id: 'trails-pins',
    type: 'circle',
    source: 'trail-pins',
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 6, 4, 8, 5, 12, 6, 16, 8],
      'circle-color': '#00e5a0',
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ffffff'
    }
  });

  console.log('✅ V38: Puntos estáticos inicializados con datos de navegación');
}

function getApproximateCoords(trail) {
  const locationCoords = {
    'DICHATO': [-72.9308, -36.5489],
    'LOS LAGOS': [-72.8167, -39.8500],
    'CAUQUENES': [-72.3167, -35.9667],
    'CORONEL': [-73.1500, -37.0167],
    'PENCO': [-72.9950, -36.7400],
    'ARAUCO': [-73.3167, -37.2500],
    'LEBU': [-73.6500, -37.6000],
    'GORBEA': [-72.6800, -39.1000],
    'MAFIL': [-72.9500, -39.6667],
    'CUREPTO': [-72.0167, -35.0833],
    'CONSTITUCIÓN': [-72.4167, -35.3333],
    'COELEMU': [-72.7000, -36.4833],
    'COLBÚN': [-71.4167, -35.6833],
    'OSORNO': [-73.1333, -40.5667]
  };
  
  return locationCoords[trail.location] || [-73.3, -37.5];
}

function separateOverlappingPins(features) {
  const coordBuckets = new Map();
  const offsetRadius = 0.015;

  features.forEach((f) => {
    const [lng, lat] = f.geometry.coordinates;
    const key = `${lng.toFixed(4)},${lat.toFixed(4)}`;
    const n = coordBuckets.get(key) || 0;
    coordBuckets.set(key, n + 1);

    if (n > 0) {
      const angle = (n * 137.5) * (Math.PI / 180);
      const dLng = offsetRadius * Math.cos(angle) / Math.max(0.25, Math.cos(lat * Math.PI / 180));
      const dLat = offsetRadius * Math.sin(angle);
      f.geometry.coordinates = [lng + dLng, lat + dLat];
      // V38: Actualizar coordenadas de navegación también
      f.properties.nav_lng = lng + dLng;
      f.properties.nav_lat = lat + dLat;
    }
  });
}

function fitAllPins() {
  const source = map.getSource('trail-pins');
  if (!source) return;

  const data = source._data;
  if (!data || !data.features || data.features.length === 0) return;

  const bounds = new maplibregl.LngLatBounds();
  data.features.forEach(f => {
    bounds.extend(f.geometry.coordinates);
  });

  // V39: Ajustar padding y zoom para evitar pantalla negra
  const padding = isMobile 
    ? { top: 100, bottom: 60, left: 30, right: 30 }
    : { top: 80, bottom: 80, left: 400, right: 50 };

  map.fitBounds(bounds, {
    padding: padding,
    duration: 1000,
    maxZoom: 9,
    minZoom: 6  // V39: No alejarse demasiado
  });
}

// ============================================================================
// V37 - LAZY LOADING DE RUTAS
// ============================================================================

function checkZoomAndLoadRoutes() {
  const currentZoom = map.getZoom();
  if (currentZoom >= ZOOM_THRESHOLD && !routesLoaded && !routesLoading) {
    console.log(`🔍 V38: Zoom ${currentZoom.toFixed(1)} >= ${ZOOM_THRESHOLD}, cargando rutas...`);
    loadRoutesIfNeeded();
  }
}

async function loadRoutesIfNeeded() {
  if (routesLoaded || routesLoading) return;
  
  routesLoading = true;
  console.log('🚀 V38: Iniciando carga lazy de rutas...');

  try {
    await loadKMZData();
    addTrailLayers();
    updatePinsWithRealCoords();
    routesLoaded = true;
    console.log('✅ V38: Rutas cargadas exitosamente');
  } catch (error) {
    console.error('❌ V38: Error cargando rutas:', error);
  } finally {
    routesLoading = false;
  }
}

function updatePinsWithRealCoords() {
  if (!allTrailFeatures || allTrailFeatures.length === 0) return;

  const pinFeatures = TRAILS.map(trail => {
    const trailFeatures = allTrailFeatures.filter(f => f.properties.id === trail.id);
    let coord;
    
    if (trailFeatures.length === 0) {
      coord = trail.startCoords || getApproximateCoords(trail);
    } else {
      const firstFeature = trailFeatures[0];
      const geom = firstFeature.geometry;
      
      if (geom.type === 'LineString') {
        coord = geom.coordinates[0];
      } else if (geom.type === 'MultiLineString') {
        coord = geom.coordinates[0][0];
      } else {
        coord = trail.startCoords || getApproximateCoords(trail);
      }
    }

    // V38: Guardar coordenadas reales para navegación
    realStartCoords.set(trail.id, { lng: coord[0], lat: coord[1] });

    return {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [coord[0], coord[1]] },
      properties: {
        id: trail.id,
        nombre: trail.name,
        type: trail.type,
        disciplina: trail.type,
        club: trail.club,
        dificultad: trail.difficulty,
        distancia_km: trail.distanceKm,
        desnivel_positivo: trail.ascent,
        desnivel_negativo: trail.descent,
        ubicacion: trail.location,
        region: trail.region || '',
        gpx: trail.gpx,
        // V38: Coordenadas de navegación
        nav_lat: coord[1],
        nav_lng: coord[0]
      }
    };
  });

  const pinData = { type: 'FeatureCollection', features: pinFeatures };
  separateOverlappingPins(pinData.features);

  const source = map.getSource('trail-pins');
  if (source) {
    source.setData(pinData);
    console.log('✅ V38: Puntos actualizados con coordenadas reales de navegación');
  }
}

// ============================================================================
// CARGA Y PROCESAMIENTO DE DATOS KMZ
// ============================================================================

async function loadKMZData() {
  try {
    console.log('🚀 V38 - Cargando KMZ...');
    console.log(`📊 Total rutas: ${TRAILS.length}`);
    
    const loadPromises = TRAILS.map(async (trail) => {
      if (trailCache.has(trail.id)) {
        return trailCache.get(trail.id);
      }

      try {
        console.log(`📍 [${trail.id}] ${trail.name}`);
        
        const kmzUrl = encodeURI(trail.kmz).replace(/#/g, '%23');
        const response = await fetch(kmzUrl);
        if (!response.ok) {
          console.error(`   ❌ HTTP ${response.status}`);
          return [];
        }

        const blob = await response.blob();
        const zip = await JSZip.loadAsync(blob);
        const kmlFile = Object.keys(zip.files).find(n => n.toLowerCase().endsWith('.kml'));
        
        if (!kmlFile) {
          console.error(`   ❌ No KML found`);
          return [];
        }

        const kmlText = await zip.files[kmlFile].async('string');
        const parser = new DOMParser();
        const kmlDoc = parser.parseFromString(kmlText, 'text/xml');
        const features = extractAllGeometries(kmlDoc, trail);
        
        trailCache.set(trail.id, features);
        console.log(`   ✅ ${features.length} features`);
        return features;
      } catch (error) {
        console.error(`   ❌ Error:`, error.message);
        return [];
      }
    });

    const results = await Promise.all(loadPromises);
    allTrailFeatures = results.flat().filter(f => f !== null);

    console.log(`\n📊 RESUMEN:`);
    console.log(`   Features totales: ${allTrailFeatures.length}`);
    console.log(`   Rutas cargadas: ${trailCache.size}/${TRAILS.length}\n`);

    trailsGeoJSON = {
      type: 'FeatureCollection',
      features: allTrailFeatures
    };

    if (!map.getSource('trails')) {
      map.addSource('trails', {
        type: 'geojson',
        data: trailsGeoJSON
      });
    }

    console.log(`✅ Source de rutas creado\n`);
  } catch (error) {
    console.error('❌ Error fatal:', error);
  }
}

function extractAllGeometries(kmlDoc, trail) {
  const features = [];
  const placemarks = kmlDoc.getElementsByTagName('Placemark');
  
  for (let i = 0; i < placemarks.length; i++) {
    const placemark = placemarks[i];
    
    // Buscar LineString con y sin namespace
    let lineStrings = placemark.getElementsByTagName('LineString');
    if (lineStrings.length === 0) {
      lineStrings = placemark.getElementsByTagNameNS('*', 'LineString');
    }
    
    for (let j = 0; j < lineStrings.length; j++) {
      const coordinates = extractCoordinates(lineStrings[j]);
      if (coordinates.length > 0) {
        features.push(createFeature(trail, coordinates, 'LineString'));
      }
    }
    
    // Buscar MultiGeometry con y sin namespace
    let multiGeometries = placemark.getElementsByTagName('MultiGeometry');
    if (multiGeometries.length === 0) {
      multiGeometries = placemark.getElementsByTagNameNS('*', 'MultiGeometry');
    }
    
    for (let j = 0; j < multiGeometries.length; j++) {
      let subLineStrings = multiGeometries[j].getElementsByTagName('LineString');
      if (subLineStrings.length === 0) {
        subLineStrings = multiGeometries[j].getElementsByTagNameNS('*', 'LineString');
      }
      
      const allCoords = [];
      for (let k = 0; k < subLineStrings.length; k++) {
        const coords = extractCoordinates(subLineStrings[k]);
        if (coords.length > 0) {
          allCoords.push(coords);
        }
      }
      if (allCoords.length > 0) {
        features.push(createFeature(trail, allCoords, 'MultiLineString'));
      }
    }
  }
  
  return features;
}

function extractCoordinates(lineString) {
  // Buscar coordinates con y sin namespace
  let coordsElement = lineString.getElementsByTagName('coordinates')[0];
  if (!coordsElement) {
    const nsCoords = lineString.getElementsByTagNameNS('*', 'coordinates');
    if (nsCoords.length > 0) {
      coordsElement = nsCoords[0];
    }
  }
  if (!coordsElement) return [];
  return parseCoordinatesText(coordsElement.textContent);
}

function parseCoordinatesText(text) {
  return text.trim()
    .split(/\s+/)
    .map(coord => {
      const parts = coord.split(',').map(Number);
      if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        return parts.length === 3 ? parts : [parts[0], parts[1], 0];
      }
      return null;
    })
    .filter(coord => coord !== null);
}

function createFeature(trail, coordinates, geometryType) {
  return {
    type: 'Feature',
    geometry: {
      type: geometryType,
      coordinates: coordinates
    },
    properties: {
      id: trail.id,
      nombre: trail.name,
      type: trail.type,
      disciplina: trail.type,
      club: trail.club,
      dificultad: trail.difficulty,
      distancia_km: trail.distanceKm,
      desnivel_positivo: trail.ascent,
      desnivel_negativo: trail.descent,
      ubicacion: trail.location,
      region: trail.region || '',
      gpx: trail.gpx
    }
  };
}

// ============================================================================
// CAPAS DEL MAPA - RUTAS
// ============================================================================

function addTrailLayers() {
  if (!trailsGeoJSON || !map.getSource('trails')) return;

  // Shadow
  if (!map.getLayer('trails-shadow')) {
    map.addLayer({
      id: 'trails-shadow',
      type: 'line',
      source: 'trails',
      paint: {
        'line-width': ['interpolate', ['linear'], ['zoom'], 5, 2.5, 8, 6, 12, 8, 16, 10],
        'line-color': '#000000',
        'line-opacity': 0.5,
        'line-blur': 3
      },
      layout: { 'line-cap': 'round', 'line-join': 'round' }
    });
  }

  // Line principal
  if (!map.getLayer('trails-line')) {
    map.addLayer({
      id: 'trails-line',
      type: 'line',
      source: 'trails',
      paint: {
        'line-width': ['interpolate', ['linear'], ['zoom'], 8, 1.5, 10, 2.5, 12, 3.5, 16, 5],
        'line-color': [
          'case',
          ['==', ['get', 'dificultad'], 'negro'], '#18181b',
          ['==', ['get', 'dificultad'], 'azul'], '#3b82f6',
          ['==', ['get', 'type'], 'BIKE PARK'], '#22c55e',
          ['==', ['get', 'type'], 'PARQUE'], '#22c55e',
          '#22c55e'
        ],
        'line-opacity': 1
      },
      layout: { 'line-cap': 'round', 'line-join': 'round' }
    });
  }

  // Glow
  if (!map.getLayer('trails-glow')) {
    map.addLayer({
      id: 'trails-glow',
      type: 'line',
      source: 'trails',
      paint: {
        'line-width': ['interpolate', ['linear'], ['zoom'], 8, 3, 10, 4.5, 12, 6, 16, 8],
        'line-color': [
          'case',
          ['==', ['get', 'dificultad'], 'negro'], '#ffffff',
          ['==', ['get', 'dificultad'], 'azul'], '#60a5fa',
          ['==', ['get', 'type'], 'BIKE PARK'], '#4ade80',
          ['==', ['get', 'type'], 'PARQUE'], '#66cc66',
          '#4ade80'
        ],
        'line-opacity': 0.25,
        'line-blur': 2.5
      },
      layout: { 'line-cap': 'round', 'line-join': 'round' }
    });
  }

  // Selected highlight
  if (!map.getLayer('trails-selected')) {
    map.addLayer({
      id: 'trails-selected',
      type: 'line',
      source: 'trails',
      paint: {
        'line-width': ['interpolate', ['linear'], ['zoom'], 8, 5, 12, 6, 16, 7],
        'line-color': '#00e5a0',
        'line-opacity': 0
      },
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      filter: ['==', ['get', 'id'], '']
    });
  }

  // Mover capas de puntos arriba de las líneas
  if (map.getLayer('trails-pins-halo')) {
    map.moveLayer('trails-pins-halo');
  }
  if (map.getLayer('trails-pins')) {
    map.moveLayer('trails-pins');
  }
}

// ============================================================================
// EXPERIENCIA MÓVIL
// ============================================================================

function setupMobileExperience() {
  const menuTrigger = document.getElementById('mobile-menu-trigger');
  if (menuTrigger) {
    menuTrigger.addEventListener('click', toggleMobileMenu);
  }

  // V17: Click en el hint del menú también abre el menú
  const menuHint = document.getElementById('menu-hint');
  if (menuHint) {
    menuHint.addEventListener('click', () => {
      toggleMobileMenu();
      menuHint.classList.add('hidden');
    });
  }

  // V39: Click en el botón de toggle del panel también cierra en móvil
  const panelToggleBtn = document.getElementById('panel-toggle');
  if (panelToggleBtn && isMobile) {
    panelToggleBtn.addEventListener('click', () => {
      const trigger = document.getElementById('mobile-menu-trigger');
      if (trigger) trigger.style.opacity = '1';
      const mHint = document.getElementById('menu-hint');
      if (mHint) mHint.classList.add('hidden');
    });
  }

  const welcomeClose = document.getElementById('welcome-close');
  const welcomeOverlay = document.getElementById('welcome-overlay');
  
  if (welcomeClose && welcomeOverlay) {
    welcomeClose.addEventListener('click', () => {
      welcomeOverlay.classList.add('hidden');
      localStorage.setItem('welcomeShown', 'true');
    });

    if (localStorage.getItem('welcomeShown') === 'true') {
      welcomeOverlay.classList.add('hidden');
    }

    setTimeout(() => {
      if (!welcomeOverlay.classList.contains('hidden')) {
        welcomeOverlay.classList.add('hidden');
      }
    }, 1500);  // VERSION FINAL: 1.5 segundos
  }

  // V39: Asegurar que el panel inicia minimizado en móvil
  if (isMobile) {
    const panel = document.getElementById('panel');
    if (panel) {
      panel.classList.add('minimized');
    }
  }

  // V13: Setup interaction hint
  setupInteractionHint();
}

// ============================================================================
// V15 - HINT DE INTERACCIÓN Y MINI POP-UPS
// ============================================================================

function setupInteractionHint() {
  const hint = document.getElementById('interaction-hint');
  if (!hint) return;

  // Mostrar hint después de 2 segundos (siempre en cada sesión)
  setTimeout(() => {
    hint.classList.remove('hidden');
    hint.style.display = 'flex';
  }, 2000);

  // Click en el hint lo oculta
  hint.addEventListener('click', hideInteractionHint);
  
  // Auto-ocultar después de 12 segundos
  setTimeout(() => {
    hideInteractionHint();
  }, 14000);
}

function hideInteractionHint() {
  const hint = document.getElementById('interaction-hint');
  if (hint) {
    hint.classList.add('hidden');
  }
}

// Llamar cuando el usuario interactúa con un punto
function onUserInteraction() {
  hideInteractionHint();
  hideMiniPopups();
}

// Mini pop-ups exploratorios
let miniPopupElements = [];
let miniPopupTimeout = null;

function showMiniPopups() {
  // Seleccionar 2-3 puntos aleatorios visibles
  const numPopups = 3;
  const shuffled = [...TRAILS].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, numPopups);
  
  selected.forEach((trail, index) => {
    setTimeout(() => {
      createMiniPopup(trail);
    }, index * 1000);
  });
  
  // Auto-ocultar después de 8 segundos
  miniPopupTimeout = setTimeout(() => {
    hideMiniPopups();
  }, 10000);
}

function createMiniPopup(trail) {
  if (!map || !trail.startCoords) return;
  
  const coords = trail.startCoords;
  const point = map.project([coords[0], coords[1]]);
  
  // Verificar que el punto esté visible en el viewport
  const mapContainer = map.getContainer();
  const bounds = mapContainer.getBoundingClientRect();
  
  if (point.x < 50 || point.x > bounds.width - 50 || 
      point.y < 50 || point.y > bounds.height - 50) {
    return; // Punto fuera del área visible
  }
  
  const popup = document.createElement('div');
  popup.className = 'mini-popup';
  popup.innerHTML = `
    <span class="mini-popup-name">${trail.name}</span>
  `;
  
  // Posicionar relativo al contenedor del mapa
  popup.style.left = `${point.x}px`;
  popup.style.top = `${point.y - 45}px`;
  popup.style.transform = 'translateX(-50%)';
  
  document.getElementById('map').appendChild(popup);
  miniPopupElements.push(popup);
  
  // Ocultar este popup después de 5 segundos con fade
  setTimeout(() => {
    popup.style.opacity = '0';
    popup.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      if (popup.parentNode) popup.remove();
    }, 500);
  }, 5000);
}

function hideMiniPopups() {
  if (miniPopupTimeout) {
    clearTimeout(miniPopupTimeout);
  }
  miniPopupElements.forEach(el => {
    if (el && el.parentNode) {
      el.remove();
    }
  });
  miniPopupElements = [];
}

function toggleMobileMenu() {
  const panel = document.getElementById('panel');
  const trigger = document.getElementById('mobile-menu-trigger');
  const menuHint = document.getElementById('menu-hint');
  const interactionHint = document.getElementById('interaction-hint');
  if (!panel) return;

  const isHidden = panel.classList.contains('minimized') || 
                   panel.classList.contains('minimized-mobile');

  if (isHidden) {
    // Abrir panel
    panel.classList.remove('minimized');
    panel.classList.remove('minimized-mobile');
    if (trigger) trigger.style.opacity = '0';
    if (menuHint) menuHint.classList.add('hidden');
    if (interactionHint) interactionHint.classList.add('hidden');
  } else {
    // Cerrar panel
    panel.classList.add('minimized');
    if (trigger) trigger.style.opacity = '1';
    // No volver a mostrar los hints una vez cerrados
  }

  const panelToggle = document.getElementById('panel-toggle');
  if (panelToggle) {
    panelToggle.setAttribute('aria-expanded', isHidden);
  }
}

// ============================================================================
// RENDERIZADO Y UI
// ============================================================================

function renderRutasList() {
  const list = document.getElementById('rutas-list');
  if (!list) return;

  list.innerHTML = '';

  TRAILS.forEach(trail => {
    const card = createRutaCard(trail);
    list.appendChild(card);
  });
}

function minimizePanelOnMobile() {
  if (isMobile) {
    const panel = document.getElementById('panel');
    const trigger = document.getElementById('mobile-menu-trigger');
    if (panel && !panel.classList.contains('minimized')) {
      panel.classList.add('minimized');
      // V39: Mostrar botón flotante al cerrar panel
      if (trigger) trigger.style.opacity = '1';
    }
  }
}

function createRutaCard(trail) {
  const card = document.createElement('div');
  card.className = 'ruta-card';
  card.dataset.id = trail.id;

  const desnivelText = formatDesnivelMejorado(trail.ascent, trail.descent);
  
  let difficultyIcon = '';
  let difficultyText = '';
  let geometryIcon = '';
  let showDifficulty = true;
  
  if (trail.type === 'XC') {
    difficultyIcon = '<span class="difficulty-icon xc-icon">■</span>';
    difficultyText = 'INTERMEDIO';
    geometryIcon = '<span class="geometry-icon xc-geometry">■</span>';
  } else if (trail.type === 'DH') {
    difficultyIcon = '<span class="difficulty-icon dh-icon">◆◆</span>';
    difficultyText = trail.difficulty === 'negro' ? 'MUY EXIGENTE' : 'EXIGENTE';
    geometryIcon = '<span class="geometry-icon dh-geometry">◆◆</span>';
  } else if (trail.type === 'BIKE PARK') {
    geometryIcon = '<span class="geometry-icon bikepark-geometry">🏔️</span>';
    showDifficulty = false;
  } else if (trail.type === 'PARQUE_DEPRECATED') {
    geometryIcon = '<span class="geometry-icon parque-geometry">🌲</span>';
    showDifficulty = false;
  }

  // V38: Agregar botones de navegación
  const navigationHTML = getCompactNavigationHTML(trail.id);
  
  // Fila de dificultad solo si corresponde
  const difficultyRow = showDifficulty ? `
      <div class="ruta-detail-row">
        <span class="detail-label"></span>
        <div class="detail-value difficulty-badge">
          ${difficultyIcon}
          <span class="difficulty-text">${difficultyText}</span>
        </div>
      </div>
  ` : '';
  
  // Stats solo para rutas individuales (no Bike Parks)
  const showStats = trail.type !== 'BIKE PARK' && (trail.distanceKm > 0 || trail.ascent > 0);
  const statsRow = showStats ? `
      <div class="ruta-stats-grid">
        <div class="stat-box">
          <span class="stat-label">DISTANCIA</span>
          <span class="stat-value">${trail.distanceKm.toFixed(2)} km</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">DESNIVEL</span>
          <span class="stat-value">${desnivelText}</span>
        </div>
      </div>
  ` : '';
  
  // Club solo si existe
  const clubText = trail.club ? `${escapeHtml(trail.club)} · ` : '';

  card.innerHTML = `
    <div class="ruta-card-header">
      <h3 class="ruta-title">${escapeHtml(trail.name)}</h3>
    </div>
    
    <div class="ruta-card-body">
      <div class="ruta-detail-row">
        <span class="detail-label">${trail.club ? 'Club / Comuna' : 'Ubicación'}</span>
        <span class="detail-value">${clubText}${escapeHtml(trail.location)}</span>
      </div>
      
      <div class="ruta-detail-row">
        <span class="detail-label">Tipo</span>
        <div class="specialty-container">
          ${geometryIcon}
          <span class="detail-value specialty-badge specialty-${trail.type.toLowerCase().replace(' ', '-')}">${trail.type}</span>
        </div>
      </div>
      
      ${difficultyRow}
      ${statsRow}
      ${navigationHTML}
    </div>
  `;

  // Click en tarjeta carga rutas + centra
  card.addEventListener('click', async () => {
    await loadRoutesIfNeeded();
    selectTrail(trail.id);
    centerOnTrail(trail.id);
    minimizePanelOnMobile();
  });

  return card;
}

function getFeaturesForTrail(trailId) {
  if (!trailsGeoJSON) return [];
  let features = trailsGeoJSON.features.filter(f => f && f.properties && f.properties.id === trailId);

  if (features.length === 0 && trailCache && trailCache.has(trailId)) {
    const cached = trailCache.get(trailId) || [];
    cached.forEach(f => {
      if (f && f.properties) f.properties.id = trailId;
    });

    const existing = new Set(trailsGeoJSON.features);
    cached.forEach(f => {
      if (f && !existing.has(f)) trailsGeoJSON.features.push(f);
    });

    if (map && map.getSource && map.getSource('trails')) {
      map.getSource('trails').setData(trailsGeoJSON);
    }

    features = trailsGeoJSON.features.filter(f => f && f.properties && f.properties.id === trailId);
  }

  return features;
}

function selectTrail(trailId) {
  selectedTrailId = trailId;

  document.querySelectorAll('.ruta-card').forEach(card => {
    card.classList.toggle('active', card.dataset.id === trailId);
  });

  if (map && map.getSource('trails')) {
    const source = map.getSource('trails');
    source.setData(trailsGeoJSON);
  }

  if (map && map.getLayer('trails-selected')) {
    map.setFilter('trails-selected', ['==', ['get', 'id'], trailId]);
    map.setPaintProperty('trails-selected', 'line-opacity', 1);
  }

  const card = document.querySelector(`.ruta-card[data-id="${trailId}"]`);
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  updateFocusToggle();
}

function centerOnTrail(trailId) {
  if (!trailsGeoJSON || !map) return;

  const features = getFeaturesForTrail(trailId);
  
  if (features.length === 0) {
    console.warn(`⚠️ No se encontraron features para ${trailId}`);
    const trail = TRAILS.find(t => t.id === trailId);
    if (trail) {
      const coords = trail.startCoords || getApproximateCoords(trail);
      map.flyTo({
        center: coords,
        zoom: 12,
        duration: 1500
      });
    }
    return;
  }

  const bounds = new maplibregl.LngLatBounds();

  features.forEach(feature => {
    const geom = feature.geometry;
    if (geom.type === 'LineString') {
      geom.coordinates.forEach(coord => bounds.extend(coord));
    } else if (geom.type === 'MultiLineString') {
      geom.coordinates.forEach(segment => {
        segment.forEach(coord => bounds.extend(coord));
      });
    }
  });

  if (!bounds.isEmpty()) {
    map.fitBounds(bounds, {
      padding: { top: 120, bottom: 120, left: 120, right: 120 },
      duration: 2000,
      maxZoom: 14,
      easing: (t) => t * (2 - t)
    });
  } else {
    console.warn(`⚠️ Bounds vacío para ${trailId}`);
  }
}

function updateFocusToggle() {
  const btn = document.getElementById('focus-toggle');
  if (!btn) return;

  if (!selectedTrailId) {
    btn.classList.add('hidden');
    return;
  }

  btn.classList.remove('hidden');
  btn.innerHTML = showOnlySelected 
    ? '<span>←</span> Volver al mapa completo'
    : '<span>🔍</span> Ver solo esta ruta';
}

function toggleFocusMode() {
  if (!map || !selectedTrailId) return;

  const layers = ['trails-line', 'trails-shadow', 'trails-glow'];
  
  if (showOnlySelected) {
    layers.forEach(layer => {
      if (map.getLayer(layer)) map.setFilter(layer, ['all']);
    });
    showOnlySelected = false;
  } else {
    layers.forEach(layer => {
      if (map.getLayer(layer)) map.setFilter(layer, ['==', ['get', 'id'], selectedTrailId]);
    });
    showOnlySelected = true;
  }

  updateFocusToggle();
}

function setupMapInteractions() {
  // Click en línea de ruta
  map.on('click', 'trails-line', (e) => {
    if (e.features.length > 0) {
      const feature = e.features[0];
      selectTrail(feature.properties.id);
      showPopup(e, feature);
      onUserInteraction(); // V13: Ocultar hints
    }
  });

  map.on('mouseenter', 'trails-line', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'trails-line', () => {
    map.getCanvas().style.cursor = '';
  });

  // V38: Click en punto verde - muestra popup con navegación
  map.on('click', 'trails-pins', async (e) => {
    if (e.features.length > 0) {
      const feature = e.features[0];
      await loadRoutesIfNeeded();
      selectTrail(feature.properties.id);
      showPinPopup(e, feature);
      onUserInteraction(); // V13: Ocultar hints
    }
  });

  map.on('mouseenter', 'trails-pins', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'trails-pins', () => {
    map.getCanvas().style.cursor = '';
  });
}

// V38: Popup mejorado con botones de navegación
function showPinPopup(e, feature) {
  const props = feature.properties;
  const lat = props.nav_lat || e.lngLat.lat;
  const lng = props.nav_lng || e.lngLat.lng;
  
  const desnivelText = formatDesnivelMejorado(props.desnivel_positivo, props.desnivel_negativo);
  const navigationButtons = getNavigationButtonsHTML(lat, lng, props.nombre);
  
  const popupHTML = `
    <div class="popup-content popup-v38">
      <h3>${escapeHtml(props.nombre)}</h3>
      <div class="popup-info">
        <strong>${props.club}</strong> · ${props.ubicacion}
      </div>
      <div class="popup-stats">
        <span>${props.distancia_km} km</span>
        <span>${props.type}</span>
        <span>${desnivelText}</span>
      </div>
      
      <div class="popup-navigation-section">
        <div class="popup-nav-title">📍 Cómo llegar</div>
        ${navigationButtons}
      </div>
      
      ${props.gpx ? `
        <div class="download-dropdown">
          <button class="btn-download-main" onclick="toggleDownloadMenu(event)">
            📲 Descargar Ruta GPX <span class="dropdown-arrow">▼</span>
          </button>
          <div class="download-menu" id="download-menu" style="display: none;">
            <button class="btn-download-option btn-garmin" onclick="downloadForApp('${props.gpx}', '${escapeHtml(props.nombre)}', 'garmin'); closeDownloadMenu();">
              🟦 Garmin Connect
            </button>
            <button class="btn-download-option btn-komoot" onclick="downloadForApp('${props.gpx}', '${escapeHtml(props.nombre)}', 'komoot'); closeDownloadMenu();">
              🟩 Komoot
            </button>
            <button class="btn-download-option btn-strava" onclick="openStravaWeb('${props.gpx}', '${escapeHtml(props.nombre)}'); closeDownloadMenu();">
              🟧 Strava (Web)
            </button>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  new maplibregl.Popup({ maxWidth: '320px' })
    .setLngLat(e.lngLat)
    .setHTML(popupHTML)
    .addTo(map);
}

function showPopup(e, feature) {
  const props = feature.properties;
  const coords = getNavCoordsForTrail(props.id);
  const lat = coords ? coords.lat : e.lngLat.lat;
  const lng = coords ? coords.lng : e.lngLat.lng;
  
  const desnivelText = formatDesnivelMejorado(props.desnivel_positivo, props.desnivel_negativo);
  const navigationButtons = getNavigationButtonsHTML(lat, lng, props.nombre);
  
  const popupHTML = `
    <div class="popup-content popup-v38">
      <h3>${escapeHtml(props.nombre)}</h3>
      <div class="popup-info">
        <strong>${props.club}</strong> · ${props.ubicacion}
      </div>
      <div class="popup-stats">
        <span>${props.distancia_km} km</span>
        <span>${props.type}</span>
      </div>
      
      <div class="popup-navigation-section">
        <div class="popup-nav-title">📍 Cómo llegar</div>
        ${navigationButtons}
      </div>
      
      ${props.gpx ? `
        <div class="download-dropdown">
          <button class="btn-download-main" onclick="toggleDownloadMenu(event)">
            📲 Descargar Ruta GPX <span class="dropdown-arrow">▼</span>
          </button>
          <div class="download-menu" id="download-menu" style="display: none;">
            <button class="btn-download-option btn-garmin" onclick="downloadForApp('${props.gpx}', '${escapeHtml(props.nombre)}', 'garmin'); closeDownloadMenu();">
              🟦 Garmin Connect
            </button>
            <button class="btn-download-option btn-komoot" onclick="downloadForApp('${props.gpx}', '${escapeHtml(props.nombre)}', 'komoot'); closeDownloadMenu();">
              🟩 Komoot
            </button>
            <button class="btn-download-option btn-strava" onclick="openStravaWeb('${props.gpx}', '${escapeHtml(props.nombre)}'); closeDownloadMenu();">
              🟧 Strava (Web)
            </button>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  new maplibregl.Popup({ maxWidth: '320px' })
    .setLngLat(e.lngLat)
    .setHTML(popupHTML)
    .addTo(map);
}

function setupEventListeners() {
  const panelToggle = document.getElementById('panel-toggle');
  if (panelToggle) {
    panelToggle.addEventListener('click', () => {
      const panel = document.getElementById('panel');
      if (panel) {
        panel.classList.toggle('minimized');
        const isMinimized = panel.classList.contains('minimized');
        panelToggle.setAttribute('aria-expanded', !isMinimized);
      }
    });
  }

  const focusToggle = document.getElementById('focus-toggle');
  if (focusToggle) {
    focusToggle.addEventListener('click', toggleFocusMode);
  }
}

function downloadGPX(gpxPath, trailName) {
  fetch(gpxPath)
    .then(response => response.blob())
    .then(blob => {
      // Crear blob con tipo MIME correcto para que móviles reconozcan GPX
      const gpxBlob = new Blob([blob], { 
        type: 'application/gpx+xml'  // Tipo MIME estándar para GPX
      });
      
      const url = window.URL.createObjectURL(gpxBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${trailName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.gpx`;
      
      // En móviles, esto hace que el sistema ofrezca abrir con apps compatibles
      document.body.appendChild(a);
      a.click();
      
      // Limpiar después de 100ms para dar tiempo al click
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 100);
    })
    .catch(error => {
      console.error('Error descargando GPX:', error);
      alert('Error al descargar el archivo GPX');
    });
}

// Función para descargar GPX para apps específicas que SÍ funcionan
async function downloadForApp(gpxPath, trailName, appType) {
  try {
    const response = await fetch(gpxPath);
    const blob = await response.blob();
    const gpxBlob = new Blob([blob], { type: 'application/gpx+xml' });
    const fileName = `${trailName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.gpx`;
    
    // Crear File object con tipo MIME correcto
    const file = new File([gpxBlob], fileName, { type: 'application/gpx+xml' });
    
    // Intentar compartir usando Web Share API (funciona en iOS/Android)
    if (navigator.share && navigator.canShare) {
      try {
        const canShareFiles = await navigator.canShare({ files: [file] });
        if (canShareFiles) {
          await navigator.share({
            files: [file],
            title: `Ruta MTB: ${trailName}`,
            text: `Abre en ${appType === 'garmin' ? 'Garmin Connect' : appType === 'komoot' ? 'Komoot' : 'tu app GPS'}`
          });
          console.log(`GPX compartido para ${appType}`);
          return; // Salir si compartió exitosamente
        }
      } catch (shareError) {
        console.log('Web Share no disponible, usando descarga directa');
      }
    }
    
    // Fallback: Descarga directa
    const url = window.URL.createObjectURL(gpxBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      // Mostrar instrucciones según la app
      showAppInstructions(appType);
    }, 200);
    
  } catch (error) {
    console.error('Error descargando GPX:', error);
    alert('Error al descargar el archivo GPX. Por favor intenta de nuevo.');
  }
}

// Función para abrir Strava Web con instrucciones
function openStravaWeb(gpxPath, trailName) {
  // Primero descargar el archivo
  downloadForApp(gpxPath, trailName, 'strava');
  
  // Mostrar instrucciones para Strava
  setTimeout(() => {
    if (confirm('Archivo descargado. ¿Abrir Strava Web para subir la ruta?')) {
      window.open('https://www.strava.com/routes/new', '_blank');
      
      setTimeout(() => {
        alert('📝 Instrucciones:\n\n1. En Strava Web, haz click en "Upload" (icono ⬆️)\n2. Selecciona el archivo GPX descargado\n3. Guarda la ruta\n4. Aparecerá en tu app Strava móvil');
      }, 1000);
    }
  }, 500);
}

// Mostrar instrucciones según app
function showAppInstructions(appType) {
  const instructions = {
    garmin: '📱 Archivo descargado.\n\nEn tu móvil:\n1. Abre el archivo\n2. Selecciona "Garmin Connect"\n3. La ruta se guardará automáticamente',
    komoot: '📱 Archivo descargado.\n\nEn tu móvil:\n1. Abre el archivo\n2. Selecciona "Komoot"\n3. La ruta se guardará automáticamente',
    strava: '📱 Archivo descargado.\n\nPara Strava:\n1. Abre Strava.com en navegador\n2. My Routes → Upload\n3. Selecciona el archivo GPX'
  };
  
  setTimeout(() => {
    alert(instructions[appType] || 'Archivo descargado');
  }, 500);
}

// Control del menú desplegable de descarga
function toggleDownloadMenu(event) {
  event.stopPropagation();
  const menu = document.getElementById('download-menu');
  const arrow = event.currentTarget.querySelector('.dropdown-arrow');
  
  if (menu.style.display === 'none') {
    menu.style.display = 'block';
    arrow.textContent = '▲';
    // Cerrar si se hace click fuera
    setTimeout(() => {
      document.addEventListener('click', closeDownloadMenuOutside);
    }, 100);
  } else {
    menu.style.display = 'none';
    arrow.textContent = '▼';
    document.removeEventListener('click', closeDownloadMenuOutside);
  }
}

function closeDownloadMenu() {
  const menu = document.getElementById('download-menu');
  const arrow = document.querySelector('.dropdown-arrow');
  if (menu) {
    menu.style.display = 'none';
  }
  if (arrow) {
    arrow.textContent = '▼';
  }
  document.removeEventListener('click', closeDownloadMenuOutside);
}

function closeDownloadMenuOutside(event) {
  const dropdown = document.querySelector('.download-dropdown');
  if (dropdown && !dropdown.contains(event.target)) {
    closeDownloadMenu();
  }
}

function updateHeaderStats() {
  const count = document.getElementById('ruta-count');
  if (count) {
    const stats = getTotalStats();
    count.textContent = `${stats.trails} rutas · ${stats.kilometers} km`;
  }
}

function formatDesnivelMejorado(ascent, descent) {
  if (!ascent && !descent) return 'N/A';
  if (ascent && descent) return `+${ascent}m/-${descent}m`;
  if (ascent) return `+${ascent}m`;
  if (descent) return `-${descent}m`;
  return 'N/A';
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ============================================================================
// FUNCIONALIDAD DE COMPARTIR EN REDES SOCIALES
// ============================================================================

// URL del proyecto (actualizar con la URL real cuando esté deployado)
const PROJECT_URL = window.location.href.split('?')[0]; // URL limpia sin parámetros

// Texto base para compartir
const SHARE_TEXT_GENERAL = "🚵 Descubre 23 rutas MTB en Chile con Guardianes Del Bosque - Bosque Abierto #AndarEsConservar";

/**
 * Genera URL de compartir para cada plataforma
 */
function getShareURL(platform, text, url) {
  const encodedText = encodeURIComponent(text);
  const encodedURL = encodeURIComponent(url);
  
  const urls = {
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedURL}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}&quote=${encodedText}`,
    instagram: null, // Instagram se maneja con copyToClipboard
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedURL}`,
    telegram: `https://t.me/share/url?url=${encodedURL}&text=${encodedText}`,
  };
  
  return urls[platform];
}

/**
 * Copia texto al portapapeles
 */
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('✅ Link copiado al portapapeles');
    return true;
  } catch (err) {
    // Fallback para navegadores antiguos
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      showToast('✅ Link copiado al portapapeles');
      return true;
    } catch (err) {
      showToast('❌ Error al copiar link');
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

/**
 * Muestra mensaje toast temporal
 */
function showToast(message, duration = 3000) {
  const existingToast = document.querySelector('.share-toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = 'share-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * Maneja el compartir en una plataforma específica
 */
function handleShare(platform, text, url) {
  if (platform === 'copy') {
    copyToClipboard(`${text} ${url}`);
  } else if (platform === 'instagram') {
    // Instagram no permite compartir via URL, copiamos el texto
    copyToClipboard(`${text} ${url}`);
    showToast('📷 Texto copiado para Instagram - Pégalo en tu post');
  } else {
    const shareURL = getShareURL(platform, text, url);
    window.open(shareURL, '_blank', 'width=600,height=400');
  }
}

/**
 * Inicializa el botón de compartir general
 */
function initGeneralShareButton() {
  const shareBtn = document.getElementById('share-general-btn');
  const shareMenu = document.getElementById('share-general-menu');
  
  if (!shareBtn || !shareMenu) return;
  
  // Toggle del menú
  shareBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    shareMenu.classList.toggle('hidden');
  });
  
  // Cerrar menú al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!shareMenu.contains(e.target) && e.target !== shareBtn) {
      shareMenu.classList.add('hidden');
    }
  });
  
  // Manejar clicks en opciones de compartir
  const shareOptions = shareMenu.querySelectorAll('.share-option');
  shareOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const platform = option.dataset.platform;
      handleShare(platform, SHARE_TEXT_GENERAL, PROJECT_URL);
      shareMenu.classList.add('hidden');
    });
  });
}

/**
 * Crea botón de compartir para una ruta específica
 */
function createRouteShareButton(trail) {
  const shareText = `🚵 Ruta ${trail.name} en ${trail.location} - ${trail.distanceKm}km | Tipo: ${trail.type} | Guardianes Del Bosque - Bosque Abierto #AndarEsConservar`;
  
  const button = document.createElement('button');
  button.className = 'share-route-btn';
  button.innerHTML = '<span class="share-platform-icon">📤</span> Compartir Ruta';
  
  const menuId = `share-route-menu-${trail.id}`;
  const menu = document.createElement('div');
  menu.id = menuId;
  menu.className = 'share-route-menu hidden';
  menu.innerHTML = `
    <div class="share-menu-header">Compartir Ruta</div>
  `;
  
  // Toggle menú
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('hidden');
  });
  
  // Manejar clicks en opciones
  const shareOptions = menu.querySelectorAll('.share-option');
  shareOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const platform = option.dataset.platform;
      handleShare(platform, shareText, PROJECT_URL);
      menu.classList.add('hidden');
    });
  });
  
  // Cerrar menú al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !button.contains(e.target)) {
      menu.classList.add('hidden');
    }
  });
  
  return { button, menu };
}

// Inicializar botón general cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGeneralShareButton);
} else {
  initGeneralShareButton();
}

/**
 * Toggle menú de compartir de ruta
 */
function toggleRouteShareMenu(trailId, event) {
  event.stopPropagation();
  const menu = document.getElementById(`share-route-menu-${trailId}`);
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

/**
 * Compartir ruta específica
 */
function shareRoute(trailId, platform, event) {
  event.stopPropagation();
  
  // Buscar información de la ruta
  const trail = TRAILS.find(t => t.id === trailId);
  if (!trail) return;
  
  const shareText = `🚵 Ruta ${trail.name} en ${trail.location} - ${trail.distanceKm}km | Tipo: ${trail.type} | Guardianes Del Bosque - Bosque Abierto #AndarEsConservar`;
  
  handleShare(platform, shareText, PROJECT_URL);
  
  // Cerrar menú
  const menu = document.getElementById(`share-route-menu-${trailId}`);
  if (menu) {
    menu.classList.add('hidden');
  }
}
