# 📊 Reporte de Depuración KMZ - Mapa MTB Arauco
**Fecha:** Enero 2026  
**Total archivos:** 23 KMZ

---

## ✅ Resumen

| Estado | Cantidad |
|--------|----------|
| ✅ OK | 22 |
| ⚠️ Con advertencias | 0 |
| ❌ Con errores | 1 (reparado) |

---

## 📋 Detalle por Archivo

| # | Archivo | Estado | Coords | Tracks | Centro (Lat, Lon) |
|---|---------|--------|--------|--------|-------------------|
| 1 |  SKILL BIKE_DH_DICHATO _BIKE PARK _NEGRO.kmz | ✅ | 300 | 1 | -36.5532, -72.9191 |
| 2 | ADRENALINA DOWNHILL_ DH_ LOS LAGOS_ Villa Esp... | ✅ | 62 | 1 | -39.8707, -72.8204 |
| 3 | ARAUCANIA_DH_TEMUCO.kmz | ✅ | 64 | 1 | -38.5850, -72.6633 |
| 4 | ASSEM_Maule_DH_Colbun_Meloza__NEGRO.kmz | ✅ | 1064 | 5 | -35.7143, -71.2981 |
| 5 | BUSTAMANTE_BIKE_PARK.kmz | ✅ | 1069 | 5 | -36.5991, -71.7425 |
| 6 | CICLISMO ZONA 7_ XC_CAUQUENES_XCM_AZUL.kmz | ✅ | 9179 | 1 | -35.9547, -72.4296 |
| 7 | COE BIKE Racing_ DH_Coelemu_ DICHATO CLASICA_... | ✅ | 300 | 1 | -36.5532, -72.9191 |
| 8 | COLORADO_BIKE_PARK.kmz | ✅ | 2935 | 39 | -37.5113, -73.3083 |
| 9 | EL_NADI_PAILLACO_DH.kmz | ✅ | 1032 | 4 | -40.1148, -73.0039 |
| 10 | FLOW FACTORY_ DH _ OSORNO_ LA MISION BIKE PAR... | ❌ | - | - | - |
| 11 | FUNDO MANCO_DH_CORONEL_FUNDO MANCO_NEGRO .kmz | ✅ | 170 | 2 | -37.0497, -73.1308 |
| 12 | HIJOS DE PENCO_DH_PENCO_BIKE PARK _NEGRO.kmz | ✅ | 576 | 4 | -36.7502, -72.9734 |
| 13 | LANPU BIKE_XC_ ARAUCO_ LOS CASTA#U00d1OS_ AZU... | ✅ | 3647 | 2 | -37.3030, -73.2302 |
| 14 | LA_MISION_BIKE_PARK.kmz | ✅ | 488 | 2 | -40.5314, -73.2930 |
| 15 | LEFU BIKE_XC_LEBU- LEFU XC_ AZUL.kmz | ✅ | 17046 | 2 | -37.5904, -73.6083 |
| 16 | MAULEN RIDERS_XC_GORBEA_XCM GORBEA_ AZUL.kmz | ✅ | 14254 | 2 | -39.0891, -72.7145 |
| 17 | MTB 3 PEDALES_XC_MAFIL_ Ruta del Oro_AZUL.kmz | ✅ | 2013 | 1 | -39.6494, -72.8597 |
| 18 | MTB LOS ALAMOS_XC_ARAUCO_ LOS ALAMOS XC_AZUL.... | ✅ | 28356 | 3 | -37.6302, -73.4616 |
| 19 | PARQUE_COLLICO_VALDIVIA.kmz | ✅ | 5441 | 12 | -39.8244, -73.1837 |
| 20 | PRO BIKE_DH _CUREPTO_ DH Series_ NEGRO.kmz | ✅ | 1322 | 13 | -35.3772, -72.3220 |
| 21 | PUMONES FAST_RACING DH_CONSTITUCION_PUMONES_ ... | ✅ | 643 | 6 | -35.3846, -72.3306 |
| 22 | PUTU BIKE_XC_ Constituci#U00f3n_ XCM PUTU PED... | ✅ | 40279 | 6 | -35.2087, -72.2403 |
| 23 | RUKA_RACE_COELEMU_DH.kmz | ✅ | 196 | 2 | -36.4575, -72.7068 |

---

## 🔧 Archivo Reparado

### FLOW FACTORY (La Misión Bike Park - Osorno)
- **Problema:** Namespace `xsi` no declarado + tags `<n>` en vez de `<name>`
- **Solución:** Archivo reparado como `FLOW_FACTORY_FIXED.kmz`
- **Resultado:** 2 tracks, 2048 puntos de referencia

---

## 📍 Cobertura Geográfica

Los archivos cubren las siguientes regiones de Chile:

| Región | Archivos |
|--------|----------|
| Maule | ASSEM Meloza, Pumones, Pro Bike Curepto, Putu Bike, Ciclismo Zona 7 |
| Biobío | Penco, Skill Bike Dichato, Fundo Manco, Coe Bike, Ruka Race |
| Arauco | Los Álamos XC, Lanpu Bike, Colorado Bike Park, Lefu Bike |
| Araucanía | Araucanía DH Temuco, Maulen Riders Gorbea, Bustamante |
| Los Ríos | MTB 3 Pedales Mafil, Collico Valdivia, El Nadi Paillaco, Adrenalina DH |
| Los Lagos | La Misión Bike Park, Flow Factory Osorno |

---

## ✅ Próximos Pasos

1. **Reemplazar** el archivo original de Flow Factory con la versión reparada
2. **Subir nuevos KMZ** para agregar más pistas
3. **Convertir** a GPX los que falten para navegación GPS

---

*Generado automáticamente por el analizador de KMZ*
