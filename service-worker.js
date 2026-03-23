// ============================================================================
// SERVICE WORKER — Bosque Abierto MTB
// Estrategia: stale-while-revalidate
// - Sirve desde cache inmediatamente
// - Actualiza en segundo plano para la próxima visita
// ============================================================================

const VERSION = "bosque-abierto-v3";

const CORE_ASSETS = [
  "/MAPA-ENERO-26/",
  "/MAPA-ENERO-26/index.html",
  "/MAPA-ENERO-26/css/styles.css",
  "/MAPA-ENERO-26/js/app.js",
  "/MAPA-ENERO-26/data/trails.js"
];

const KMZ_ASSETS = [
  "/MAPA-ENERO-26/kmz/SKILL_BIKE_DH_DICHATO_BIKE_PARK_NEGRO.kmz",
  "/MAPA-ENERO-26/kmz/LOS_LAGOS_BIKE_PARK.kmz",
  "/MAPA-ENERO-26/kmz/CICLISMO_ZONA_7_XC_CAUQUENES_XCM_AZUL.kmz",
  "/MAPA-ENERO-26/kmz/FUNDO_MANCO_DH_CORONEL_NEGRO.kmz",
  "/MAPA-ENERO-26/kmz/HIJOS_DE_PENCO_DH_PENCO_BIKE_PARK_NEGRO.kmz",
  "/MAPA-ENERO-26/kmz/LANPU_BIKE_XC_ARAUCO_LOS_CASTANOS_AZUL.kmz",
  "/MAPA-ENERO-26/kmz/LEFU_BIKE_XC_LEBU_AZUL.kmz",
  "/MAPA-ENERO-26/kmz/MAULEN_RIDERS_XC_GORBEA_XCM_GORBEA_AZUL.kmz",
  "/MAPA-ENERO-26/kmz/MTB_3_PEDALES_XC_MAFIL_Ruta_del_Oro_AZUL.kmz",
  "/MAPA-ENERO-26/kmz/MTB_LOS_ALAMOS_XC_ARAUCO_LOS_ALAMOS_XC_AZUL.kmz",
  "/MAPA-ENERO-26/kmz/PRO_BIKE_DH_CUREPTO_DH_Series_NEGRO.kmz",
  "/MAPA-ENERO-26/kmz/PUMONES_FAST_RACING_DH_CONSTITUCION_PUMONES_NEGRO.kmz",
  "/MAPA-ENERO-26/kmz/PUTU_BIKE_XC_Constitucion_XCM_PUTU_PEDALES_AZUL.kmz",
  "/MAPA-ENERO-26/kmz/ASSEM_Maule_DH_Colbun_Meloza_NEGRO.kmz",
  "/MAPA-ENERO-26/kmz/ARAUCANIA_DH_TEMUCO.kmz",
  "/MAPA-ENERO-26/kmz/EL_NADI_PAILLACO_DH.kmz",
  "/MAPA-ENERO-26/kmz/RUKA_RACE_COELEMU_DH.kmz",
  "/MAPA-ENERO-26/kmz/BUSTAMANTE_BIKE_PARK.kmz",
  "/MAPA-ENERO-26/kmz/COLORADO_BIKE_PARK.kmz",
  "/MAPA-ENERO-26/kmz/LA_MISION_BIKE_PARK.kmz",
  "/MAPA-ENERO-26/kmz/PARQUE_COLLICO_VALDIVIA.kmz",
  "/MAPA-ENERO-26/kmz/LOTA_LIMPIO.kmz",
  "/MAPA-ENERO-26/kmz/BIKE_PARK_SANTA_JUANA.kmz",
  "/MAPA-ENERO-26/kmz/Yungay_XCO_MTB.kmz",
  "/MAPA-ENERO-26/kmz/CUMBRES_DE_NAHUELBUTA.KMZ"
];

// ============================================================================
// INSTALL — cachear archivos core inmediatamente
// ============================================================================
self.addEventListener("install", event => {
  console.log("[SW] Instalando versión:", VERSION);
  event.waitUntil(
    caches.open(VERSION).then(cache => {
      // Core assets: obligatorios
      return cache.addAll(CORE_ASSETS).then(() => {
        // KMZ: los cacheamos en background, no bloqueamos la instalación
        cache.addAll(KMZ_ASSETS).catch(err => {
          console.warn("[SW] Algunos KMZ no se pudieron cachear:", err);
        });
      });
    }).then(() => {
      console.log("[SW] Instalación completa");
      return self.skipWaiting();
    })
  );
});

// ============================================================================
// ACTIVATE — limpiar caches viejos
// ============================================================================
self.addEventListener("activate", event => {
  console.log("[SW] Activando versión:", VERSION);
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== VERSION)
          .map(key => {
            console.log("[SW] Eliminando cache antiguo:", key);
            return caches.delete(key);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// ============================================================================
// FETCH — stale-while-revalidate
// Sirve desde cache inmediatamente + actualiza en segundo plano
// Tiles del mapa OSM: network first (necesitan conexión)
// ============================================================================
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // Tiles OSM y recursos externos: siempre network, sin cache
  if (
    url.hostname.includes("tile.openstreetmap.org") ||
    url.hostname.includes("unpkg.com") ||
    url.hostname.includes("cdnjs.cloudflare.com") ||
    url.hostname.includes("demotiles.maplibre.org") ||
    url.hostname.includes("fonts.googleapis.com") ||
    url.hostname.includes("fonts.gstatic.com")
  ) {
    return; // Dejar pasar sin interceptar
  }

  // Archivos KMZ y GPX: siempre network, nunca cache
  if (url.pathname.includes("/kmz/") || url.pathname.includes("/gpx/")) {
    return;
  }

  // Para todo lo demás: stale-while-revalidate
  event.respondWith(
    caches.open(VERSION).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request)
          .then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => {
            // Sin red y sin cache: nada que hacer
            console.warn("[SW] Sin red para:", event.request.url);
          });

        // Servir cache inmediatamente, actualizar en background
        return cachedResponse || fetchPromise;
      });
    })
  );
});
