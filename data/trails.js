// ============================================================================
// MAPA BOSQUE ABIERTO MTB V9.0 - BASE DE DATOS DE RUTAS
// ============================================================================
// Versión 9.0 - Enero 2026
// - 16 rutas originales
// - 2 nuevas pistas DH (Temuco, Paillaco)
// - 4 nuevos Bike Parks / Parques
// - 1 ruta actualizada (Ruka Race reemplaza RukaFest)
// - 2 NUEVOS BIKE PARKS: Lota y Santa Juana (Enero 20, 2026)
// - Total: 23 ubicaciones
// - ruta-107: Cumbres de Nahuelbuta (Marzo 2026)
// ============================================================================

const TRAILS = [
  // ========================================================================
  // RUTAS ORIGINALES V7.0
  // ========================================================================
  {
    id: "ruta-001",
    name: "Pista Dichato Clasica",
    type: "DH",
    club: "SKILL BIKE",
    difficulty: "negro",
    distanceKm: 2.42,
    ascent: 29,
    descent: 270,
    location: "DICHATO",
    region: "Biobío",
    kmz: "kmz/SKILL_BIKE_DH_DICHATO_BIKE_PARK_NEGRO.kmz",
    gpx: "gpx/skill-bike-park-negro.gpx",
    startCoords: [-72.9308, -36.5489]
  },
  {
    id: "ruta-002",
    name: "Los Lagos",
    type: "BIKE PARK",
    club: "ADRENALINA DOWNHILL",
    difficulty: "negro",
    distanceKm: 5.36,
    ascent: 0,
    descent: 0,
    location: "LOS LAGOS",
    region: "Los Ríos",
    kmz: "kmz/LOS_LAGOS_BIKE_PARK.kmz",
    gpx: "gpx/los-lagos-bike-park.gpx",
    startCoords: [-72.81857, -39.86870],
    trails: [
      { name: "Villa Esperanza",       startCoords: [-72.820534, -39.871716], distanceKm: 2.17, ascent: 3, descent: 358 },
      { name: "Pista Clásica Antigua", startCoords: [-72.82336, -39.86199], distanceKm: 3.19,  ascent: 426, descent: 8 }
    ],
    description: "2 pistas DH. Incluye: Villa Esperanza, Pista Clásica Antigua."
  },
  {
    id: "ruta-003",
    name: "DESAFÍO ZONA 7",
    type: "XC",
    club: "CICLISMO ZONA 7",
    difficulty: "azul",
    distanceKm: 59.99,
    ascent: 1373,
    descent: 1369,
    location: "CAUQUENES",
    region: "Maule",
    kmz: "kmz/CICLISMO_ZONA_7_XC_CAUQUENES_XCM_AZUL.kmz",
    gpx: "gpx/ciclismo-zona-7-cauquenes-xcm-azul.gpx",
    startCoords: [-72.3167, -35.9667]
  },
  {
    id: "ruta-005",
    name: "FUNDO MANCO",
    type: "DH",
    club: "FUNDO MANCO",
    difficulty: "negro",
    distanceKm: 1.16,
    ascent: 2,
    descent: 113,
    location: "CORONEL",
    region: "Biobío",
    kmz: "kmz/FUNDO_MANCO_DH_CORONEL_NEGRO.kmz",
    gpx: "gpx/fundo-manco-negro.gpx",
    startCoords: [-73.1500, -37.0167]
  },
  {
    id: "ruta-006",
    name: "BikePark Penco",
    type: "BIKE PARK",
    club: "HIJOS DE PENCO",
    difficulty: "",
    distanceKm: 4.36,
    ascent: 61,
    descent: 683,
    location: "PENCO",
    region: "Biobío",
    kmz: "kmz/HIJOS_DE_PENCO_DH_PENCO_BIKE_PARK_NEGRO.kmz",
    gpx: "gpx/penco-bike-park-negro.gpx",
    startCoords: [-72.9894, -36.7479],
    trails: [
      { name: "DH Antigua",    startCoords: [-72.989423, -36.747942], distanceKm: 0.87, ascent: 2,  descent: 100 },
      { name: "DH Nueva",      startCoords: [-72.973110, -36.753756], distanceKm: 1.13, ascent: 0,  descent: 213 },
      { name: "Mirador",       startCoords: [-72.977719, -36.755249], distanceKm: 0.48, ascent: 0,  descent: 73  },
      { name: "Esquizofrenia", startCoords: [-72.948893, -36.746998], distanceKm: 1.88, ascent: 59, descent: 297 }
    ],
    description: "4 pistas DH. Incluye: DH Antigua, DH Nueva, Mirador, Esquizofrenia."
  },
  {
    id: "ruta-007",
    name: "POTRERITO MOLINO",
    type: "XC",
    club: "LANPU BIKE",
    difficulty: "azul",
    distanceKm: 43.23,
    ascent: 0,
    descent: 0,
    location: "ARAUCO",
    region: "Biobío",
    kmz: "kmz/LANPU_BIKE_XC_ARAUCO_LOS_CASTANOS_AZUL.kmz",
    gpx: "gpx/arauco-los-castan-os-bike-azul.gpx",
    startCoords: [-72.9894, -36.7479]
  },
  {
    id: "ruta-008",
    name: "LEFU XC",
    type: "XC",
    club: "LEFU BIKE",
    difficulty: "azul",
    distanceKm: 48.85,
    ascent: 0,
    descent: 0,
    location: "LEBU",
    region: "Biobío",
    kmz: "kmz/LEFU_BIKE_XC_LEBU_AZUL.kmz",
    gpx: "gpx/lefu-bike-xc-azul.gpx",
    startCoords: [-73.6500, -37.6000]
  },
  {
    id: "ruta-009",
    name: "DESAFÍO MEDIO AMT",
    type: "XC",
    club: "MAULEN RIDERS",
    difficulty: "azul",
    distanceKm: 18.75,
    ascent: 904,
    descent: 907,
    location: "GORBEA",
    region: "La Araucanía",
    kmz: "kmz/MAULEN_RIDERS_XC_GORBEA_XCM_GORBEA_AZUL.kmz",
    gpx: "gpx/maulen-riders-xc-gorbea-azul.gpx",
    startCoords: [-72.6800, -39.1000]
  },
  {
    id: "ruta-010",
    name: "XCM RUTA DEL ORO",
    type: "XC",
    club: "MTB 3 PEDALES",
    difficulty: "azul",
    distanceKm: 47.76,
    ascent: 1263,
    descent: 1262,
    location: "MAFIL",
    region: "Los Ríos",
    kmz: "kmz/MTB_3_PEDALES_XC_MAFIL_Ruta_del_Oro_AZUL.kmz",
    gpx: "gpx/ruta-del-oro-mtb-pedals-blue.gpx",
    startCoords: [-72.9500, -39.6667]
  },
  {
    id: "ruta-011",
    name: "LOS ALAMOS XC",
    type: "XC",
    club: "MTB LOS ALAMOS",
    difficulty: "azul",
    distanceKm: 58.3,
    ascent: 0,
    descent: 0,
    location: "LOS ALAMOS",
    region: "Biobío",
    kmz: "kmz/MTB_LOS_ALAMOS_XC_ARAUCO_LOS_ALAMOS_XC_AZUL.kmz",
    gpx: "gpx/los-alamos-xc-azul.gpx",
    startCoords: [-73.6411, -37.5841]
  },
  {
    id: "ruta-012",
    name: "DH Series",
    type: "DH",
    club: "PRO BIKE",
    difficulty: "negro",
    distanceKm: 2.56,
    ascent: 16,
    descent: 296,
    location: "CUREPTO",
    region: "Maule",
    kmz: "kmz/PRO_BIKE_DH_CUREPTO_DH_Series_NEGRO.kmz",
    gpx: "gpx/pro-bike-dh-curepto-negro.gpx",
    startCoords: [-72.019291, -35.104930]
  },
  {
    id: "ruta-013",
    name: "PUMONES",
    type: "DH",
    club: "PUMONES FAST",
    difficulty: "negro",
    distanceKm: 2.42,
    ascent: 0,
    descent: 0,
    location: "CONSTITUCIÓN",
    region: "Maule",
    kmz: "kmz/PUMONES_FAST_RACING_DH_CONSTITUCION_PUMONES_NEGRO.kmz",
    gpx: "gpx/pumones-fast-racing-negro.gpx",
    startCoords: [-72.3209, -35.3773]
  },
  {
    id: "ruta-014",
    name: "PUTÚ PEDALEA",
    type: "BIKE PARK",
    club: "PUTU BIKE",
    difficulty: "",
    distanceKm: 63.01,
    ascent: 2456,
    descent: 2470,
    location: "CONSTITUCIÓN",
    region: "Maule",
    kmz: "kmz/PUTU_BIKE_XC_Constitucion_XCM_PUTU_PEDALES_AZUL.kmz",
    gpx: "gpx/putu-u-bike-xc-constitucio-un-pedals-azul.gpx",
    startCoords: [-72.278685, -35.198329],
    trails: [
      { name: "DH El Guarda by Nelson",                  startCoords: [-72.278685, -35.198329], distanceKm: 14.99, ascent: 600,  descent: 595  },
      { name: "XCM Putu Pedalea",                        startCoords: [-72.293312, -35.234609], distanceKm: 50.58, ascent: 1105, descent: 1104 },
      { name: "Reconocimiento Oficial Putu Pedalea 4.0", startCoords: [-72.284423, -35.208964], distanceKm: 56.52, ascent: 1348, descent: 1350 },
      { name: "Putú Pedalea Recargado",                  startCoords: [-72.284059, -35.211638], distanceKm: 63.01, ascent: 2456, descent: 2470 }
    ],
    description: "4 rutas en torno al evento Putú Pedalea. Incluye: DH El Guarda by Nelson, XCM Putu Pedalea, Reconocimiento Oficial 4.0 y Putú Pedalea Recargado."
  },
  // RUTA 015 - REEMPLAZADA POR RUKA RACE (ver abajo)
  {
    id: "ruta-016",
    name: "Meloza",
    type: "DH",
    club: "ASSEM",
    difficulty: "negro",
    distanceKm: 2.17,
    ascent: 0,
    descent: 0,
    location: "COLBÚN",
    region: "Maule",
    kmz: "kmz/ASSEM_Maule_DH_Colbun_Meloza_NEGRO.kmz",
    gpx: "gpx/assem-meloza-negro.gpx",
    startCoords: [-71.2897, -35.7153]
  },

  // ========================================================================
  // NUEVAS PISTAS DH - V8.0
  // ========================================================================

  {
    id: "ruta-017",
    name: "Araucanía DH",
    type: "DH",
    club: "CLUB ARAUCANÍA DH",
    difficulty: "negro",
    distanceKm: 2.3,
    ascent: 0,
    descent: 0,
    location: "TEMUCO",
    region: "La Araucanía",
    kmz: "kmz/ARAUCANIA_DH_TEMUCO.kmz",
    gpx: "gpx/araucania-dh-temuco.gpx",
    startCoords: [-72.6710, -38.5867]
  },
  {
    id: "ruta-018",
    name: "El Ñadi",
    type: "DH",
    club: "CLUB EL ÑADI",
    difficulty: "negro",
    distanceKm: 3.66,
    ascent: 0,
    descent: 0,
    location: "PAILLACO",
    region: "Los Ríos",
    kmz: "kmz/EL_NADI_PAILLACO_DH.kmz",
    gpx: "gpx/el-nadi-paillaco-dh.gpx",
    startCoords: [-73.0123, -40.1172]
  },
  {
    id: "ruta-015",
    name: "Ruka Race",
    type: "DH",
    club: "CLUB RUKA",
    difficulty: "negro",
    distanceKm: 1.0,
    ascent: 0,
    descent: 0,
    location: "COELEMU",
    region: "Ñuble",
    kmz: "kmz/RUKA_RACE_COELEMU_DH.kmz",
    gpx: "gpx/ruka-race-coelemu.gpx",
    startCoords: [-72.7106, -36.4608]
  },

  // ========================================================================
  // BIKE PARKS Y PARQUES - V8.0
  // ========================================================================

  {
    id: "ruta-101",
    name: "Bustamante Bike Park",
    type: "BIKE PARK",
    club: "Mountain BUSTA",
    difficulty: "",
    distanceKm: 6.25,
    ascent: 0,
    descent: 0,
    location: "COIHUECO",
    region: "Ñuble",
    kmz: "kmz/BUSTAMANTE_BIKE_PARK.kmz",
    gpx: "gpx/bustamante-bike-park.gpx",
    startCoords: [-71.73776, -36.596287],
    trails: [
      { name: "El Boldo",             startCoords: [-71.737760, -36.596287], distanceKm: 1.33, ascent: 1, descent: 163 },
      { name: "Downtrail Bustamante", startCoords: [-71.737681, -36.596252], distanceKm: 1.32, ascent: 0, descent: 166 },
      { name: "La Resfalosa",         startCoords: [-71.737473, -36.595991], distanceKm: 1.31, ascent: 1, descent: 165 },
      { name: "Hardline Plus",        startCoords: [-71.726231, -36.598460], distanceKm: 0.99, ascent: 3, descent: 151 },
      { name: "Calabozo 2.0",         startCoords: [-71.738461, -36.603660], distanceKm: 1.30, ascent: 6, descent: 145 }
    ],
    description: "5 pistas DH. Incluye: El Boldo, Downtrail Bustamante, La Resfalosa, Hardline Plus, Calabozo 2.0."
  },
  {
    id: "ruta-102",
    name: "Colorado Bike Park",
    type: "BIKE PARK",
    club: "",
    difficulty: "",
    distanceKm: 38.89,
    ascent: 0,
    descent: 0,
    location: "CURANILAHUE",
    region: "Biobío",
    kmz: "kmz/COLORADO_BIKE_PARK.kmz",
    gpx: "gpx/colorado-bike-park.gpx",
    startCoords: [-73.3279, -37.4926]
  },
  {
    id: "ruta-103",
    name: "La Misión Bike Park",
    type: "BIKE PARK",
    club: "",
    difficulty: "",
    distanceKm: 7.46,
    ascent: 0,
    descent: 0,
    location: "OSORNO",
    region: "Los Lagos",
    kmz: "kmz/LA_MISION_BIKE_PARK.kmz",
    gpx: "gpx/la-mision-bike-park.gpx",
    startCoords: [-73.2973, -40.5322]
  },
  {
    id: "ruta-104",
    name: "Parque Collico",
    type: "BIKE PARK",
    club: "",
    difficulty: "",
    distanceKm: 54.68,
    ascent: 0,
    descent: 0,
    location: "VALDIVIA",
    region: "Los Ríos",
    kmz: "kmz/PARQUE_COLLICO_VALDIVIA.kmz",
    gpx: "gpx/parque-collico-valdivia.gpx",
    startCoords: [-73.2026, -39.8189]
  },

  // ========================================================================
  // NUEVOS BIKE PARKS - ENERO 20, 2026
  // ========================================================================

  {
    id: "ruta-105",
    name: "BikePark Lota",
    type: "BIKE PARK",
    club: "Bike Park Lota",
    difficulty: "",
    distanceKm: 12.88,
    ascent: 162,
    descent: 1494,
    location: "LOTA",
    region: "Biobío",
    kmz: "kmz/LOTA_BIKEPARK_ORIGINAL.kmz",
    gpx: "gpx/LOTA_BIKEPARK_ORIGINAL.gpx",
    startCoords: [-73.123917, -37.082142],
    trails: [
      { name: "Perro Muerto",    type: "DH",   startCoords: [-73.123917, -37.082142], distanceKm: 0.88, ascent: 0,  descent: 103 },
      { name: "Windows 21",      type: "DH",   startCoords: [-73.123885, -37.082024], distanceKm: 0.87, ascent: 1,  descent: 103 },
      { name: "Línea 3:16",      type: "DH",   startCoords: [-73.129349, -37.085787], distanceKm: 0.77, ascent: 7,  descent: 97  },
      { name: "Martillo y Flow", type: "Flow", startCoords: [-73.129288, -37.085772], distanceKm: 0.80, ascent: 10, descent: 101 },
      { name: "Laguna",          type: "XC",   startCoords: [-73.132449, -37.090410], distanceKm: 0.88, ascent: 5,  descent: 95  },
      { name: "DH Clásico",      type: "DH",   startCoords: [-73.132603, -37.090491], distanceKm: 0.81, ascent: 5,  descent: 75  },
      { name: "840",             type: "DH",   startCoords: [-73.132411, -37.090450], distanceKm: 0.80, ascent: 2,  descent: 76  },
      { name: "Raíces Trail",    type: "XC",   startCoords: [-73.132598, -37.090546], distanceKm: 0.79, ascent: 2,  descent: 77  },
      { name: "Isla de Pinos",   type: "XC",   startCoords: [-73.132599, -37.090455], distanceKm: 0.85, ascent: 17, descent: 101 },
      { name: "Smoke",           type: "DH",   startCoords: [-73.132569, -37.090465], distanceKm: 0.77, ascent: 3,  descent: 92  },
      { name: "Raíces Old",      type: "XC",   startCoords: [-73.132621, -37.090471], distanceKm: 1.79, ascent: 11, descent: 221 },
      { name: "Portal",          type: "DH",   startCoords: [-73.129325, -37.085760], distanceKm: 1.16, ascent: 0,  descent: 139 },
      { name: "Parapowerline",   type: "DH",   startCoords: [-73.123954, -37.082206], distanceKm: 0.91, ascent: 99, descent: 0   },
      { name: "Skill 1",         type: "DH",   startCoords: [-73.133736, -37.083923], distanceKm: 0.27, ascent: 0,  descent: 46  },
      { name: "Skill 2",         type: "DH",   startCoords: [-73.133715, -37.083924], distanceKm: 0.27, ascent: 0,  descent: 36  },
      { name: "Skill 3",         type: "DH",   startCoords: [-73.133745, -37.083915], distanceKm: 0.26, ascent: 0,  descent: 33  }
    ],
    description: "16 pistas. Incluye: Perro Muerto, Windows 21, DH Clásico, 840, Smoke, Raíces Trail, Isla de Pinos, Laguna, Raíces Old, Portal, Parapowerline, Skills 1-3 y más."
  },
  {
    id: "ruta-106",
    name: "BikePark Santa Juana",
    type: "BIKE PARK",
    club: "Mountain BUSTA",
    difficulty: "",
    distanceKm: 6.96,
    ascent: 28,
    descent: 742,
    location: "SANTA JUANA",
    region: "Biobío",
    kmz: "kmz/BIKE_PARK_SANTA_JUANA.kmz",
    gpx: "gpx/santa-juana-bikepark.gpx",
    startCoords: [-72.9310, -37.1940],
    trails: [
      { name: "Clásica DH",       startCoords: [-72.93011, -37.18968], distanceKm: 1.57, ascent: 10, descent: 175 },
      { name: "Pista EnduHuaso",  startCoords: [-72.93104, -37.19397], distanceKm: 1.30, ascent: 0,  descent: 166 },
      { name: "Pista Anfiteatro", startCoords: [-72.93009, -37.18979], distanceKm: 1.55, ascent: 12, descent: 161 },
      { name: "Pista EnduPaco",   startCoords: [-72.93010, -37.18969], distanceKm: 1.39, ascent: 1,  descent: 151 },
      { name: "Pista Sultan",     startCoords: [-72.93079, -37.19395], distanceKm: 1.15, ascent: 5,  descent: 89  }
    ],
    description: "5 pistas DH. Incluye: Clásica DH, Pista EnduHuaso, Pista Anfiteatro, Pista EnduPaco, Pista Sultan."
  },

  // ========================================================================
  // NUEVAS RUTAS - MARZO 2026
  // ========================================================================

  {
    id: "ruta-108",
    name: "Circuito XCO Yungay",
    type: "XC",
    club: "CD Cholguan",
    difficulty: "azul",
    distanceKm: 3.85,
    ascent: 125,
    descent: 127,
    location: "YUNGAY",
    region: "Biobío",
    kmz: "kmz/Yungay_XCO_MTB.kmz",
    gpx: "gpx/circuito-xco-yungay.gpx",
    startCoords: [-72.071464, -37.118327]
  },

  {
    id: "ruta-107",
    name: "Cumbres de Nahuelbuta",
    type: "BIKE PARK",
    club: "MTB Curanilahue",
    difficulty: "",
    distanceKm: 158.42,
    ascent: 4377,
    descent: 3956,
    location: "CURANILAHUE",
    region: "Biobío",
    kmz: "kmz/CUMBRES_DE_NAHUELBUTA.KMZ",
    gpx: "gpx/cumbres-de-nahuelbuta.gpx",
    startCoords: [-73.351359, -37.690323],
    trails: [
      { name: "Vuelta 2", startCoords: [-73.360974, -37.691117], distanceKm: 27.05, ascent: 828, descent: 830 }
      { name: "Caramavida 1", startCoords: [-73.351359, -37.690323], distanceKm: 21.89, ascent: 665, descent: 668 }
      { name: "Caramávida - Cuyinco Alto", startCoords: [-73.362784, -37.684873], distanceKm: 16.82, ascent: 725, descent: 193 }
      { name: "Tres-Río Caramavida", startCoords: [-73.403723, -37.626700], distanceKm: 23.13, ascent: 473, descent: 579 }
      { name: "Desafío COMPLETO XCM Caramavida", startCoords: [-73.356682, -37.692766], distanceKm: 69.53, ascent: 1684, descent: 1684 }
    ],
    description: "5 rutas XC en Nahuelbuta. Incluye: Vuelta 2, Caramavida 1, Caramávida - Cuyinco Alto, Tres-Río Caramavida, Desafío COMPLETO XCM Caramavida."
  }
];

// ============================================================================
// FUNCIONES DE NAVEGACIÓN
// ============================================================================

function getGoogleMapsUrl(lat, lng, name = '') {
  const encodedName = encodeURIComponent(name);
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
}

function getWazeUrl(lat, lng) {
  return `https://www.waze.com/ul?ll=${lat},${lng}&navigate=yes`;
}

function getNavigationCoords(trailId) {
  const trail = TRAILS.find(t => t.id === trailId);
  if (!trail) return null;
  
  if (trail.startCoords && trail.startCoords.length === 2) {
    return {
      lng: trail.startCoords[0],
      lat: trail.startCoords[1]
    };
  }
  
  return null;
}

function navigateWithGoogleMaps(lat, lng, name) {
  const url = getGoogleMapsUrl(lat, lng, name);
  window.open(url, '_blank');
}

function navigateWithWaze(lat, lng) {
  const url = getWazeUrl(lat, lng);
  window.open(url, '_blank');
}

// ============================================================================
// UTILIDADES
// ============================================================================

function calculateMetrics(geometry) {
  let totalDistance = 0;
  let totalAscent = 0;
  let totalDescent = 0;
  
  const coords = geometry.type === 'LineString' 
    ? [geometry.coordinates] 
    : geometry.coordinates;
  
  coords.forEach(segment => {
    for (let i = 0; i < segment.length - 1; i++) {
      const [lon1, lat1, ele1 = 0] = segment[i];
      const [lon2, lat2, ele2 = 0] = segment[i + 1];
      
      const R = 6371000;
      const φ1 = lat1 * Math.PI / 180;
      const φ2 = lat2 * Math.PI / 180;
      const Δφ = (lat2 - lat1) * Math.PI / 180;
      const Δλ = (lon2 - lon1) * Math.PI / 180;
      
      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      
      totalDistance += R * c;
      
      const elevDiff = ele2 - ele1;
      if (elevDiff > 0) {
        totalAscent += elevDiff;
      } else {
        totalDescent += Math.abs(elevDiff);
      }
    }
  });
  
  return {
    distanceKm: totalDistance / 1000,
    ascent: Math.round(totalAscent),
    descent: Math.round(totalDescent)
  };
}

function getTotalStats() {
  const totalTrails = TRAILS.length;
  const totalKm = TRAILS.reduce((sum, t) => sum + (t.distanceKm || 0), 0);
  const totalAscent = TRAILS.reduce((sum, t) => sum + (t.ascent || 0), 0);
  
  return {
    trails: totalTrails,
    kilometers: totalKm.toFixed(1),
    ascent: totalAscent
  };
}
