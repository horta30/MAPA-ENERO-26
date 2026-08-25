// ============================================================================
// MAPA BOSQUE ABIERTO MTB V9.2 - BASE DE DATOS DE RUTAS
// ============================================================================
// Versión 9.2 - Junio 2026
// - 16 rutas originales
// - 2 nuevas pistas DH (Temuco, Paillaco)
// - 4 nuevos Bike Parks / Parques
// - 1 ruta actualizada (Ruka Race reemplaza RukaFest)
// - 2 NUEVOS BIKE PARKS: Lota y Santa Juana (Enero 20, 2026)
// - Total: 23 ubicaciones
// - ruta-107: Cumbres de Nahuelbuta (Marzo 2026)
// - ruta-110: Lanco Bike Park - Econauta Expediciones (Junio 2026)
// - ruta-111: Cifon Rock DH - Itata Racing Club, Coelemu (Junio 2026)
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
    distanceKm: 2.37,
    uniqueKm: 2.37,
    ascent: 122,
    descent: 338,
    location: "DICHATO",
    region: "Biobío",
    kmz: "kmz/SKILL_BIKE_DH_DICHATO_BIKE_PARK_NEGRO.kmz",
    gpx: "gpx/skill-bike-park-negro.gpx",
    startCoords: [-72.9308, -36.5489]
  },
  {
    id: "ruta-002",
    name: "Los Lagos",
    type: "DH",
    club: "ADRENALINA DOWNHILL",
    difficulty: "negro",
    distanceKm: 5.27,
    uniqueKm: 5.27,
    ascent: 0,
    descent: 0,
    location: "LOS LAGOS",
    region: "Los Ríos",
    kmz: "kmz/LOS_LAGOS_BIKE_PARK.kmz",
    gpx: "gpx/los-lagos-bike-park.gpx",
    startCoords: [-72.81857, -39.86870],
    trails: [
      { name: "Villa Esperanza",       startCoords: [-72.820534, -39.871716], distanceKm: 2.17, ascent: 3,   descent: 358 },
      { name: "Pista Clásica Antigua", startCoords: [-72.82336,  -39.86199],  distanceKm: 3.19, ascent: 8,   descent: 426 }
    ],
    description: "2 pistas DH. Incluye: Villa Esperanza, Pista Clásica Antigua."
  },
  {
    id: "ruta-003",
    name: "DESAFÍO ZONA 7",
    type: "XC",
    club: "CICLISMO ZONA 7",
    difficulty: "azul",
    distanceKm: 59.97,
    uniqueKm: 50.09,
    ascent: 1136,
    descent: 1142,
    location: "CAUQUENES",
    region: "Maule",
    kmz: "kmz/CICLISMO_ZONA_7_XC_CAUQUENES_XCM_AZUL.kmz",
    gpx: "gpx/ciclismo-zona-7-cauquenes-xcm-azul.gpx",
    startCoords: [-72.3167, -35.9667]
  },
  {
    id: "ruta-005",
    name: "FUNDO MANCO",
    type: "PARQUE",
    club: "FUNDO MANCO",
    difficulty: "negro",
    distanceKm: 2.57,
    uniqueKm: 2.12,
    location: "CORONEL",
    region: "Biobío",
    kmz: "kmz/FUNDO_MANCO_DH_CORONEL_NEGRO.kmz",
    gpx: "gpx/fundo-manco-negro.gpx",
    startCoords: [-73.1500, -37.0167],
    trails: [
      { name: "Classic Line",     distanceKm: 1.42 },
      { name: "Sugar Rabbit Mix", distanceKm: 1.16 }
    ]
  },
  {
    id: "ruta-006",
    name: "BikePark Penco",
    type: "PARQUE",
    club: "HIJOS DE PENCO",
    difficulty: "",
    distanceKm: 4.31,
    uniqueKm: 4.31,
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
    distanceKm: 47.89,
    uniqueKm: 47.59,
    ascent: 1126,
    descent: 1119,
    location: "ARAUCO",
    region: "Biobío",
    kmz: "kmz/LANPU_BIKE_XC_ARAUCO_LOS_CASTANOS_AZUL.kmz",
    gpx: "gpx/arauco-los-castan-os-bike-azul.gpx",
    startCoords: [-72.9894, -36.7479],
    trails: [
      { name: "Potrerito Molino Pichilo", distanceKm: 43.23 },
      { name: "XC Los Castaños 2025",    distanceKm: 4.75  }
    ]
  },
  {
    id: "ruta-008",
    name: "LEFU XCM",
    type: "XC",
    club: "LEFU BIKE",
    difficulty: "azul",
    distanceKm: 66.84,
    uniqueKm: 54.58,
    ascent: 1392,
    descent: 1254,
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
    distanceKm: 21.91,
    uniqueKm: 21.25,
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
    distanceKm: 47.75,
    uniqueKm: 36.08,
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
    distanceKm: 66.35,
    uniqueKm: 66.34,
    ascent: 1974,
    descent: 1920,
    location: "LOS ALAMOS",
    region: "Biobío",
    kmz: "kmz/MTB_LOS_ALAMOS_XC_ARAUCO_LOS_ALAMOS_XC_AZUL.kmz",
    gpx: "gpx/los-alamos-xc-azul.gpx",
    startCoords: [-73.3571, -37.6927],
    trails: [
      { name: "Ruta para la Cooperativa", distanceKm: 58.94, ascent: 1732, descent: 1677 },
      { name: "Circuito Pilpilco",         distanceKm: 3.82,  ascent: 164,  descent: 164  },
      { name: "Circuito Cupaño",           distanceKm: 3.77,  ascent: 78,   descent: 79   }
    ]
  },
  {
    id: "ruta-012",
    name: "Curepto DH",
    type: "DH",
    club: "PRO BIKE",
    difficulty: "negro",
    distanceKm: 2.53,
    uniqueKm: 2.53,
    ascent: 94,
    descent: 373,
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
    distanceKm: 2.41,
    uniqueKm: 2.41,
    ascent: 46,
    descent: 385,
    location: "CONSTITUCIÓN",
    region: "Maule",
    kmz: "kmz/PUMONES_FAST_RACING_DH_CONSTITUCION_PUMONES_NEGRO.kmz",
    gpx: "gpx/pumones-fast-racing-negro.gpx",
    startCoords: [-72.3209, -35.3773]
  },
  {
    id: "ruta-014",
    name: "PUTÚ PEDALEA",
    type: "XC",
    club: "PUTU BIKE",
    difficulty: "azul",
    distanceKm: 73.91,
    uniqueKm: 73.89,
    ascent: 2091,
    descent: 2460,
    location: "CONSTITUCIÓN",
    region: "Maule",
    kmz: "kmz/PUTU_BIKE_XC_Constitucion_XCM_PUTU_PEDALES_AZUL.kmz",
    gpx: "gpx/putu-u-bike-xc-constitucio-un-pedals-azul.gpx",
    startCoords: [-72.235950, -35.176138],
    description: "Red de senderos del evento Putú Pedalea, Constitución. KMZ depurado jul 2026: track único sin tramos repetidos ni zona urbana — 66.22 km de sendero real."
  },
  // RUTA 015 - REEMPLAZADA POR RUKA RACE (ver abajo)


  // ========================================================================
  // NUEVAS PISTAS DH - V8.0
  // ========================================================================

  {
    id: "ruta-017",
    name: "Araucanía DH",
    type: "DH",
    club: "CLUB ARAUCANÍA DH",
    difficulty: "negro",
    distanceKm: 2.29,
    uniqueKm: 2.29,
    ascent: 5,
    descent: 366,
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
    distanceKm: 1.79,
    uniqueKm: 1.79,
    ascent: 0,
    descent: 304,
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
    distanceKm: 0.98,
    uniqueKm: 0.98,
    ascent: 53,
    descent: 174,
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
    name: "Montaña Bustamante",
    type: "PARQUE",
    club: "Mountain BUSTA",
    difficulty: "",
    distanceKm: 11.92,
    uniqueKm: 11.85,
    ascent: 380,
    descent: 505,
    location: "COIHUECO",
    region: "Ñuble",
    kmz: "kmz/MONTANA_BUSTAMANTE.kmz",
    gpx: "gpx/montana-bustamante.gpx",
    startCoords: [-71.737568, -36.597268],
    trails: [
      { name: "Pista Pato Line",           startCoords: [-71.737568, -36.597268], distanceKm: 1.38, ascent: 0, descent: 167, disciplines: ["DH"], difficulty: "dificil",  direction: "unidireccional ↓" },
      { name: "Pista Boldo",               startCoords: [-71.737654, -36.597188], distanceKm: 1.53, ascent: 0, descent: 137, disciplines: ["DH"], difficulty: "facil",    direction: "unidireccional ↓" },
      { name: "Pista Hacha",               startCoords: [-71.724415, -36.607977], distanceKm: 1.48, ascent: 0, descent: 102, disciplines: ["DH"], difficulty: "facil",    direction: "unidireccional ↓" },
      { name: "Pista Calabozo",            startCoords: [-71.738244, -36.603789], distanceKm: 1.29, ascent: 0, descent: 99,  disciplines: ["DH"], difficulty: "moderado", direction: "unidireccional ↓" },
      { name: "Conexión a Boldo",          startCoords: [-71.731362, -36.604275], distanceKm: 1.17, ascent: 22, descent: 0,  disciplines: ["RP"], direction: "subida" },
      { name: "Camino de subida 1 a Boldo", startCoords: [-71.748780, -36.596623], distanceKm: 1.78, ascent: 141, descent: 0, disciplines: ["RP"], direction: "subida" },
      { name: "Camino de subida 2 a Hacha", startCoords: [-71.724404, -36.608096], distanceKm: 3.33, ascent: 217, descent: 0, disciplines: ["RP"], direction: "subida" }
    ],
    description: "KMZ depurado y clasificado por rider local (jul 2026). 4 pistas DH (IMBA: Pato Line negro, Boldo y Hacha verde, Calabozo azul) + 3 senderos/caminos de subida en ripio."
  },
  {
    id: "ruta-102",
    name: "Colorado Bike Park",
    type: "PARQUE",
    club: "",
    difficulty: "",
    distanceKm: 44.29,
    uniqueKm: 43.54,
    ascent: 1548,
    descent: 2937,
    location: "CURANILAHUE",
    region: "Biobío",
    kmz: "kmz/COLORADO_BIKE_PARK.kmz",
    gpx: "gpx/colorado-bike-park.gpx",
    startCoords: [-73.294687, -37.528682],
    trails: [
      { name: "Colorado XC 1", distanceKm: 12.76, ascent: 727, descent: 737, disciplines: ["XC"], difficulty: "moderado" },
      { name: "Colorado XC 2", distanceKm: 6.52, ascent: 133, descent: 319, disciplines: ["XC"], difficulty: "moderado" },
      { name: "Colorado XC 3", distanceKm: 4.35, ascent: 203, descent: 159, disciplines: ["XC"], difficulty: "moderado" },
      { name: "Colorado XC 4", distanceKm: 1.54, ascent: 21, descent: 136, disciplines: ["XC"], difficulty: "moderado" },
      { name: "Colorado XC 5", distanceKm: 0.72, ascent: 39, descent: 21, disciplines: ["XC"], difficulty: "moderado" },
      { name: "Colorado XC 6", distanceKm: 0.72, ascent: 0, descent: 51, disciplines: ["XC"], difficulty: "moderado" },
      { name: "Colorado XC 7", distanceKm: 0.35, ascent: 16, descent: 45, disciplines: ["XC"], difficulty: "moderado" },
      { name: "Colorado XC 8", distanceKm: 0.26, ascent: 20, descent: 20, disciplines: ["XC"], difficulty: "moderado" },
      { name: "BAJADA PRONUNCIADA !", distanceKm: 0.14, ascent: 0, descent: 0, disciplines: ["XC"], difficulty: "moderado" },
      { name: "Nueva_Ruta Plegarias", distanceKm: 2.51, ascent: 49, descent: 166, disciplines: ["XC"], difficulty: "moderado" },
      { name: "Familiar 1", distanceKm: 1.72, ascent: 34, descent: 34, disciplines: ["XC"], difficulty: "facil" },
      { name: "Familiar 2", distanceKm: 0.44, ascent: 0, descent: 2, disciplines: ["XC"], difficulty: "facil" },
      { name: "Familiar 3", distanceKm: 3.96, ascent: 164, descent: 192, disciplines: ["XC"], difficulty: "facil" },
      { name: "Familiar 4", distanceKm: 0.39, ascent: 7, descent: 10, disciplines: ["XC"], difficulty: "facil" },
      { name: "Negro 1", distanceKm: 0.44, ascent: 18, descent: 63, disciplines: ["DH"], difficulty: "dificil" },
      { name: "Negro 2", distanceKm: 0.85, ascent: 40, descent: 143, disciplines: ["DH"], difficulty: "dificil" },
      { name: "LOS VIEJOS", distanceKm: 1.01, ascent: 44, descent: 175, disciplines: ["DH"], difficulty: "dificil" },
      { name: "TOBOGAN DH", distanceKm: 0.52, ascent: 2, descent: 110, disciplines: ["DH"], difficulty: "dificil" },
      { name: "NUEVA DH", distanceKm: 0.81, ascent: 13, descent: 105, disciplines: ["DH"], difficulty: "muy-dificil" },
      { name: "LAGUNAZO DH", distanceKm: 2.01, ascent: 13, descent: 213, disciplines: ["DH"], difficulty: "muy-dificil" },
      { name: "CUNETA SHORT", distanceKm: 0.4, ascent: 0, descent: 62, disciplines: ["DH"], difficulty: "muy-dificil" },
      { name: "SALTOS", distanceKm: 0.32, ascent: 0, descent: 9, disciplines: ["DH"], difficulty: "muy-dificil" },
      { name: "SPEEDLINE", distanceKm: 0.68, ascent: 5, descent: 75, disciplines: ["DH"], difficulty: "muy-dificil" },
      { name: "MOAI", distanceKm: 0.75, ascent: 0, descent: 90, disciplines: ["DH"], difficulty: "muy-dificil" }
    ],
    description: "KMZ depurado y validado con el jefe de patrimonio (ago 2026). 24 senderos organizados en XC, Familiar y DH (Negro / Doble negro, criterio IMBA)."
  },
  {
    id: "ruta-103",
    name: "La Misión Bike Park",
    type: "PARQUE",
    club: "",
    difficulty: "",
    distanceKm: 3.16,
    uniqueKm: 3.11,
    ascent: 58,
    descent: 190,
    location: "OSORNO",
    region: "Los Lagos",
    kmz: "kmz/LA_MISION_BIKE_PARK.kmz",
    gpx: "gpx/la-mision-bike-park.gpx",
    startCoords: [-73.296863, -40.531019],
    trails: [
      { name: "Directizima",         distanceKm: 0.29, ascent: 0,  descent: 38, disciplines: ["DH"], difficulty: "dificil",  direction: "unidireccional ↓" },
      { name: "Mirador",             distanceKm: 0.50, ascent: 0,  descent: 55, disciplines: ["DH"], difficulty: "moderado", direction: "unidireccional ↓" },
      { name: "Las Teles",           distanceKm: 0.61, ascent: 1,  descent: 43, disciplines: ["DH"], difficulty: "moderado", direction: "unidireccional ↓" },
      { name: "Subida Pedaleable",   distanceKm: 0.95, ascent: 7,  descent: 49, disciplines: ["RP"], direction: "subida" },
      { name: "Subida Pedaleable 2", distanceKm: 0.81, ascent: 50, descent: 5,  disciplines: ["RP"], direction: "subida" }
    ],
    description: "KMZ depurado y clasificado por el club local (ago 2026). 3 pistas de descenso (Directizima negra, Mirador y Las Teles azules) + 2 subidas pedaleables en ripio."
  },
  {
    id: "ruta-104",
    name: "Parque Collico",
    type: "PARQUE",
    sports: ["MTB", "TRAIL"],
    club: "",
    difficulty: "",
    distanceKm: 30.86,
    uniqueKm: 30.47,
    ascent: 2228,
    descent: 1946,
    location: "VALDIVIA",
    region: "Los Ríos",
    kmz: "kmz/PARQUE_COLLICO_VALDIVIA.kmz",
    gpx: "gpx/parque-collico-valdivia.gpx",
    startCoords: [-73.2026, -39.8189],
    trails: [
      { name: "Budicali",               distanceKm: 1.35, disciplines: ["TR","XC"],        difficulty: "facil",        direction: "bidireccional" },
      { name: "Mirador Kunstmann",       distanceKm: 1.04, disciplines: ["RP","TR"],        difficulty: "facil",        direction: "bidireccional" },
      { name: "Conejo",                  distanceKm: 0.63, disciplines: ["TR","XC","DH"],   difficulty: "moderado",     direction: "bidireccional" },
      { name: "Androides",               distanceKm: 1.79, disciplines: ["DH","XC"],        difficulty: "moderado",     direction: "bidireccional" },
      { name: "Mirador del Puma",        distanceKm: 5.07, disciplines: ["RP","TR"],        difficulty: "moderado",     direction: "bidireccional" },
      { name: "Suaveton",                distanceKm: 0.66, disciplines: ["TR","XC"],        difficulty: "moderado",     direction: "bidireccional" },
      { name: "Camino Principal (Ripio)",distanceKm: 7.72, disciplines: ["RP","TR","XC"],   difficulty: "moderado",     direction: "bidireccional" },
      { name: "Collico 1",               distanceKm: 4.91, disciplines: ["TR","XC","DH"],   difficulty: "moderado",     direction: "bidireccional" },
      { name: "Los Helechos",            distanceKm: 0.68, disciplines: ["TR","XC"],        difficulty: "moderado",     direction: "bidireccional" },
      { name: "Spot 23",                 distanceKm: 1.89, disciplines: ["DH","XC"],        difficulty: "dificil",      direction: "unidireccional ↓" },
      { name: "Suavetona Lex One",       distanceKm: 0.75, disciplines: ["TR"],             difficulty: "dificil",      direction: "bidireccional" },
      { name: "El Muro",                 distanceKm: 1.59, disciplines: ["TR","XC"],        difficulty: "dificil",      direction: "bidireccional" },
      { name: "Lalo Cura",               distanceKm: 1.12, disciplines: ["DH"],             difficulty: "muy-dificil",  direction: "unidireccional ↓" },
      { name: "Vietnam",                 distanceKm: 0.66, disciplines: ["TR"],             difficulty: "muy-dificil",  direction: "bidireccional" },
      { name: "La Cascada",              distanceKm: 0.55, disciplines: ["TR"],             difficulty: "muy-dificil",  direction: "bidireccional" }
    ]
  },

  // ========================================================================
  // NUEVOS BIKE PARKS - ENERO 20, 2026
  // ========================================================================

  {
    id: "ruta-105",
    name: "BikePark Lota",
    type: "PARQUE",
    club: "Bike Park Lota",
    difficulty: "",
    distanceKm: 12.68,
    uniqueKm: 10.92,
    ascent: 965,
    descent: 1048,
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
    type: "PARQUE",
    club: "Mountain BUSTA",
    difficulty: "",
    distanceKm: 6.92,
    uniqueKm: 6.82,
    ascent: 680,
    descent: 862,
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
    distanceKm: 3.79,
    uniqueKm: 3.79,
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
    type: "PARQUE",
    club: "MTB Curanilahue",
    difficulty: "",
    distanceKm: 103.68,
    uniqueKm: 103.68,
    ascent: 3865,
    descent: 3308,
    location: "CURANILAHUE",
    region: "Biobío",
    kmz: "kmz/Cumbres_DE_Nahuelbuta.KMZ",
    gpx: "gpx/cumbres-de-nahuelbuta.gpx",
    startCoords: [-73.360974, -37.691117],
    description: "Red de senderos Cumbres de Nahuelbuta, Curanilahue. KMZ depurado ago 2026: track único sin tramos duplicados — 102.96 km de sendero real."
  },
  {
    id: "ruta-109",
    name: "Parque Las Melozas",
    type: "PARQUE",
    club: "Assem Maule / Arauco",
    difficulty: "",
    distanceKm: 3.76,
    uniqueKm: 3.69,
    ascent: 128,
    descent: 355,
    location: "Colbún",
    region: "Maule",
    kmz: "kmz/PARQUE_LAS_MELOZAS.kmz",
    gpx: null,
    startCoords: [-71.28973, -35.71533],
    trails: [
      { name: "Fernandua",           difficulty: "Azul",  distanceKm: 0.45, ascent: 7,  descent: 51 },
      { name: "Meloza Alta",         difficulty: "Azul",  distanceKm: 0.31, ascent: 4,  descent: 38 },
      { name: "Meloza Media",        difficulty: "Azul",  distanceKm: 0.66, ascent: 2,  descent: 93 },
      { name: "Meloza Baja",         difficulty: "Azul",  distanceKm: 0.27, ascent: 1,  descent: 33 },
      { name: "Wolfies",             difficulty: "Azul",  distanceKm: 0.52, ascent: 6,  descent: 36 },
      { name: "Pro Line Coguile",    difficulty: "Negra", distanceKm: 0.34, ascent: 2,  descent: 58 },
      { name: "Lobitas",             difficulty: "Verde", distanceKm: 0.51, ascent: 20, descent: 15 },
      { name: "Madre de la Culebra", difficulty: "Mixto", distanceKm: 0.78, ascent: 86, descent: 31 }
    ],
    description: "Bike Park en Colbún, Maule, gestionado por Assem Maule y Arauco. Cuenta con trails para todos los niveles: senderos azules encadenados de Las Melozas, la línea negra Pro Line Coguile y trails mixtos en bosque nativo."
  },

  // ========================================================================
  // NUEVAS UBICACIONES - JUNIO 2026
  // ========================================================================

  {
    id: "ruta-110",
    name: "Lanco Bike Park",
    type: "PARQUE",
    club: "Econauta Expediciones",
    difficulty: "negro",
    distanceKm: 3.66,
    uniqueKm: 3.6,
    ascent: 122,
    descent: 636,
    location: "LANCO",
    region: "Los Ríos",
    kmz: "kmz/LANCO_BIKE_PARK.kmz",
    gpx: "gpx/LANCO_BIKE_PARK.gpx",
    startCoords: [-72.80451603, -39.43420297],
    trails: [
      { name: "Clásica", difficulty: "negro", startCoords: [-72.80451603, -39.43420297], distanceKm: 1.32, ascent: 18, descent: 213 },
      { name: "20 Mil",  difficulty: "negro", startCoords: [-72.80462030, -39.43420412], distanceKm: 1.06, ascent: 25, descent: 213 },
      { name: "420",     difficulty: "negro", startCoords: [-72.80489587, -39.43407612], distanceKm: 1.30, ascent: 79, descent: 210 }
    ],
    description: "3 pistas DH. Incluye: Clásica, 20 Mil, 420."
  },
  {
    id: "ruta-111",
    name: "Cifon Rock",
    type: "DH",
    club: "ITATA RACING CLUB",
    difficulty: "negro",
    distanceKm: 1.41,
    uniqueKm: 1.41,
    ascent: 25,
    descent: 180,
    location: "COELEMU",
    region: "Ñuble",
    kmz: "kmz/ITATA_RACING_DH_COELEMU_CIFON_ROCK_NEGRO.kmz",
    gpx: "gpx/ITATA_RACING_DH_COELEMU_CIFON_ROCK_NEGRO.gpx",
    startCoords: [-72.731205, -36.449111]
  },
  {
    id: "ruta-112",
    name: "Montaña Cañete XCM",
    type: "XC",
    club: "CLUB MONTAÑA CAÑETE",
    difficulty: "azul",
    distanceKm: 44.19,
    uniqueKm: 43.89,
    ascent: 1935,
    descent: 1935,
    location: "CAÑETE",
    region: "Biobío",
    kmz: "kmz/MONTANA_CANETE_XCM.kmz",
    gpx: "gpx/montana-canete-xcm.gpx",
    startCoords: [-73.3589, -37.7925]
  },
  {
    id: "ruta-113",
    name: "MTB Constitución XC",
    type: "XC",
    club: "CLUB MTB CONSTITUCIÓN",
    difficulty: "azul",
    distanceKm: 112.32,
    uniqueKm: 107.83,
    ascent: 2736,
    descent: 2384,
    location: "CONSTITUCIÓN",
    region: "Maule",
    kmz: "kmz/MTB_CONSTITUCION_XC.kmz",
    gpx: "gpx/mtb-constitucion-xc.gpx",
    startCoords: [-72.36803, -35.294224],
    trails: [
      { name: "Puente Gemelos XCM", startCoords: [-72.36803, -35.294224], distanceKm: 45.35, ascent: 1045, descent: 1040, disciplines: ["XC"] },
      { name: "Cuevas de Quivolgo XCM", startCoords: [-72.394012, -35.314449], distanceKm: 30.14, ascent: 676, descent: 643, disciplines: ["XC"] },
      { name: "Copa de Agua XCM", startCoords: [-72.384937, -35.318261], distanceKm: 36.83, ascent: 1015, descent: 701, disciplines: ["XC"] }
    ],
    description: "3 rutas XCM del Club MTB Constitución. KMZ depurado ago 2026: se eliminaron 28.5 km de recorrido duplicado en Cuevas de Quivolgo."
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
