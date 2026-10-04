const px = (id: number, w = 1400) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const IMG = {
  hero: px(30505108, 1920),
  about: px(33578169),
  aboutB: px(11678439, 900),
};

export type Servicio = { id: string; titulo: string; corto: string; largo: string; items: string[]; img: string; icon: string };

export const servicios: Servicio[] = [
  {
    id: "urbanizacion",
    titulo: "Urbanización integral",
    corto: "Transformamos tierra en barrios listos para habitar: calles, veredas, desagües y espacios verdes.",
    largo: "Diseñamos y ejecutamos loteos completos, desde el movimiento de suelos hasta la entrega final con infraestructura aprobada. Coordinamos con municipios y organismos para que cada lote salga a la venta en tiempo y forma.",
    items: ["Movimiento de suelos y nivelación", "Pavimento, cordón cuneta y veredas", "Desagües pluviales", "Espacios verdes y arbolado"],
    img: px(33563535),
    icon: "M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6",
  },
  {
    id: "redes",
    titulo: "Redes de servicios",
    corto: "Agua potable, cloacas, energía eléctrica y gas natural, con proyecto ejecutivo y aprobación.",
    largo: "Proyectamos y construimos redes de infraestructura bajo las normas de cada prestataria. Nos encargamos de la documentación técnica, la ejecución y las pruebas hasta la habilitación definitiva.",
    items: ["Agua potable y cloacas", "Tendido eléctrico y alumbrado público", "Redes de gas natural", "Fibra y canalizaciones"],
    img: px(33311862),
    icon: "M4 12h4l2-5 4 10 2-5h4",
  },
  {
    id: "riego",
    titulo: "Infraestructura de riego",
    corto: "Canales, acueductos y sistemas presurizados que llevan el agua donde se necesita.",
    largo: "Desarrollamos obras hídricas para productores, consorcios y organismos públicos: revestimiento de canales, obras de toma, reservorios y sistemas de riego por goteo y aspersión con criterios de eficiencia.",
    items: ["Revestimiento de canales", "Reservorios y obras de toma", "Riego presurizado", "Drenaje y defensa hídrica"],
    img: px(11678428),
    icon: "M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11z",
  },
  {
    id: "gestion",
    titulo: "Gestión integral de proyectos",
    corto: "Un único interlocutor desde la idea hasta la entrega: factibilidad, permisos, obra y cierre.",
    largo: "Acompañamos a desarrolladores e instituciones en todo el ciclo del proyecto. Evaluamos factibilidad, gestionamos aprobaciones, planificamos costos y plazos, y dirigimos la obra con reportes claros y transparentes.",
    items: ["Estudios de factibilidad", "Gestión de permisos y aprobaciones", "Planificación de costos y plazos", "Dirección e inspección de obra"],
    img: px(32598872),
    icon: "M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9",
  },
];

export type Obra = { id: number; nombre: string; lugar: string; anio: number; cat: string; cliente: string; superficie: string; img: string; desc: string; datos: string[] };

export const obras: Obra[] = [
  { id: 1, nombre: "Barrio Los Aromos", lugar: "Luján de Cuyo, Mendoza", anio: 2024, cat: "Urbanización", cliente: "Desarrolladora privada", superficie: "38 ha · 420 lotes", img: px(30505108), desc: "Urbanización completa de un barrio abierto con calles pavimentadas, plaza central y red pluvial a cielo abierto integrada al paisaje.", datos: ["12 km de calles", "420 lotes", "Entrega en 14 meses"] },
  { id: 2, nombre: "Red cloacal Villa Nueva", lugar: "Guaymallén, Mendoza", anio: 2023, cat: "Redes", cliente: "Municipalidad", superficie: "1.800 conexiones", img: px(33311862), desc: "Ejecución de colectoras cloacales y conexiones domiciliarias para un sector de alta densidad, con mínima interrupción del tránsito.", datos: ["22 km de cañería", "1.800 conexiones", "0 accidentes"] },
  { id: 3, nombre: "Canal Matriz Sur", lugar: "San Martín, Mendoza", anio: 2024, cat: "Riego", cliente: "Consorcio de regantes", superficie: "9 km revestidos", img: px(11678439), desc: "Revestimiento de canal matriz con hormigón y nuevas compuertas, reduciendo pérdidas por infiltración en más de un 30%.", datos: ["9 km de canal", "-32% pérdidas", "2.400 ha beneficiadas"] },
  { id: 4, nombre: "Parque Industrial Este", lugar: "Rivadavia, Mendoza", anio: 2022, cat: "Gestión", cliente: "Gobierno provincial", superficie: "65 ha", img: px(33578169), desc: "Gestión integral del proyecto: factibilidad, licitaciones, dirección de obra y coordinación de cinco contratistas.", datos: ["65 ha", "5 contratistas", "En presupuesto"] },
  { id: 5, nombre: "Riego presurizado Finca El Alto", lugar: "Tupungato, Mendoza", anio: 2023, cat: "Riego", cliente: "Productor agrícola", superficie: "320 ha", img: px(11678428), desc: "Sistema de riego por goteo con reservorio de 40.000 m³ y estación de bombeo automatizada.", datos: ["320 ha", "Reservorio 40.000 m³", "Ahorro hídrico 45%"] },
  { id: 6, nombre: "Tendido eléctrico Costa Verde", lugar: "Maipú, Mendoza", anio: 2025, cat: "Redes", cliente: "Desarrolladora privada", superficie: "6 km de red", img: px(33563535), desc: "Red de media y baja tensión subterránea con alumbrado LED para un nuevo complejo residencial.", datos: ["6 km de red", "280 luminarias LED", "Red subterránea"] },
  { id: 7, nombre: "Loteo Altos del Río", lugar: "Potrerillos, Mendoza", anio: 2025, cat: "Urbanización", cliente: "Fideicomiso inmobiliario", superficie: "22 ha · 180 lotes", img: px(38063368), desc: "Urbanización en terreno de pendiente con calles adaptadas a la topografía y defensa aluvional.", datos: ["180 lotes", "Defensa aluvional", "Calles a nivel"] },
];

export const cats = ["Todas", "Urbanización", "Redes", "Riego", "Gestión"];
