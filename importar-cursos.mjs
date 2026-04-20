import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'wnfb3rqp',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skRLtxfC2pL5WPLkDnaxCcgG0Bq9PGeEvSK3uQUVvBqiqCq8QgrT9GKcePPzOgnfElqY9IfExxF9H2OnPx7aVdFXrFUJs2CWsHCfna5ML6A0Be60kBY2YqSBWxnVcdwm10tNi0Al3NG2mCu7Hehxq4A0T7fSglfaRHOL3aZB2jIzK5u3soLX'
})

// destacado: true = aparece en la portada del sitio
const cursos = [
  { courseId:'c1', titulo:'Manejo de Armas de Aire', descripcion:'Medidas de seguridad, reglamento ISSF, posturas correctas y primeros pasos en el tiro deportivo.', nivel:'basic', imagen:'https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?auto=format&fit=crop&q=80&w=600', horas:'8', lecciones:'24', alumnos:'342', precio:49.99, precioAnterior:65.00, premium:false, destacado:true, orden:1 },
  { courseId:'c4', titulo:'Postura y Respiración', descripcion:'Domina la posición de tiro, control de respiración y estabilidad física para mejorar tu precisión desde el primer disparo.', nivel:'basic', imagen:'https://images.unsplash.com/photo-1599566219227-2efe0c9b7f5f?auto=format&fit=crop&q=80&w=600', horas:'6', lecciones:'18', alumnos:'215', precio:39.99, precioAnterior:50.00, premium:false, destacado:false, orden:2 },
  { courseId:'c5', titulo:'Reglamento ISSF Completo', descripcion:'Conoce todas las normas del tiro deportivo internacional: categorías, equipamiento permitido, faltas y sanciones.', nivel:'basic', imagen:'https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?auto=format&fit=crop&q=80&w=600', horas:'4', lecciones:'12', alumnos:'189', precio:24.99, precioAnterior:35.00, premium:false, destacado:false, orden:3 },
  { courseId:'b4', titulo:'Introducción al Tiro con Pistola', descripcion:'Fundamentos del tiro con pistola de calibre 22: agarre, puntería, gatillo y primeros ejercicios de precisión.', nivel:'basic', imagen:'https://images.unsplash.com/photo-1547721064-da6cfb341d50?auto=format&fit=crop&q=80&w=600', horas:'5', lecciones:'15', alumnos:'278', precio:34.99, precioAnterior:45.00, premium:false, destacado:false, orden:4 },
  { courseId:'b5', titulo:'Seguridad en el Campo de Tiro', descripcion:'Protocolos de seguridad obligatorios, manejo de armamento en un campo de tiro real y comunicación con otros deportistas.', nivel:'basic', imagen:'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600', horas:'3', lecciones:'9', alumnos:'412', precio:19.99, precioAnterior:30.00, premium:false, destacado:false, orden:5 },
  { courseId:'b6', titulo:'Equipamiento para Principiantes', descripcion:'Guía completa de equipamiento: qué comprar, qué evitar, cómo mantener tu arma y accesorios recomendados según tu disciplina.', nivel:'basic', imagen:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600', horas:'4', lecciones:'11', alumnos:'253', precio:29.99, precioAnterior:40.00, premium:false, destacado:false, orden:6 },
  { courseId:'b7', titulo:'Nutrición del Deportista de Tiro', descripcion:'Cómo la alimentación afecta tu concentración, pulso y rendimiento. Planes nutricionales para sesiones de entrenamiento y competición.', nivel:'basic', imagen:'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600', horas:'4', lecciones:'10', alumnos:'198', precio:27.99, precioAnterior:35.00, premium:false, destacado:false, orden:7 },
  { courseId:'c2', titulo:'Tiro Dinámico', descripcion:'Aprende a disparar en movimiento, transiciones rápidas y resolución de interrupciones bajo presión de tiempo.', nivel:'inter', imagen:'https://images.unsplash.com/photo-1611004875323-28c9b36ca6d5?auto=format&fit=crop&q=80&w=600', horas:'12', lecciones:'32', alumnos:'278', precio:75.00, precioAnterior:95.00, premium:false, destacado:true, orden:8 },
  { courseId:'c6', titulo:'Análisis de Blancos', descripcion:'Técnicas de lectura e interpretación de blancos, ajuste de mira y corrección de errores sistemáticos en el patrón de impactos.', nivel:'inter', imagen:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600', horas:'10', lecciones:'28', alumnos:'193', precio:65.00, precioAnterior:85.00, premium:false, destacado:false, orden:9 },
  { courseId:'c7', titulo:'Condición Física para Tiradores', descripcion:'Entrenamiento físico especializado: fuerza de antebrazos, estabilidad de core y resistencia mental para sesiones largas de tiro.', nivel:'inter', imagen:'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=600', horas:'8', lecciones:'22', alumnos:'145', precio:55.00, precioAnterior:70.00, premium:false, destacado:false, orden:10 },
  { courseId:'i4', titulo:'Tiro de Precisión a 25 metros', descripcion:'Técnica de tiro a distancia media: control del gatillo, mira posterior, ritmo de disparo y reducción del MOA en blancos pequeños.', nivel:'inter', imagen:'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=600', horas:'9', lecciones:'26', alumnos:'167', precio:62.99, precioAnterior:80.00, premium:false, destacado:false, orden:11 },
  { courseId:'i5', titulo:'Tiro Nocturno y con Poca Luz', descripcion:'Adaptación visual, uso de linternas tácticas, puntería con visores nocturnos y protocolos de seguridad en entornos de baja visibilidad.', nivel:'inter', imagen:'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&q=80&w=600', horas:'7', lecciones:'20', alumnos:'134', precio:59.99, precioAnterior:75.00, premium:false, destacado:false, orden:12 },
  { courseId:'i6', titulo:'Estrategia en Competición IPSC', descripcion:'Lectura de stages, planificación de recorridos, orden de blanco y gestión del tiempo en competiciones de tiro práctico IPSC.', nivel:'inter', imagen:'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=600', horas:'11', lecciones:'30', alumnos:'211', precio:72.99, precioAnterior:90.00, premium:false, destacado:false, orden:13 },
  { courseId:'i7', titulo:'Mantenimiento Avanzado de Armas', descripcion:'Limpieza profunda, desmontaje completo, reemplazo de piezas y ajuste de gatillo para optimizar el rendimiento de tu arma.', nivel:'inter', imagen:'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=600', horas:'6', lecciones:'16', alumnos:'309', precio:47.99, precioAnterior:60.00, premium:false, destacado:false, orden:14 },
  { courseId:'c3', titulo:'Entrenamiento Competitivo', descripcion:'Preparación específica para campeonatos: psicología del tiro, análisis táctico y optimización de resultados en competición.', nivel:'advanced', imagen:'https://images.unsplash.com/photo-1594186591030-f38b02131977?auto=format&fit=crop&q=80&w=600', horas:'20', lecciones:'48', alumnos:'124', precio:120.00, precioAnterior:150.00, premium:false, destacado:true, orden:15 },
  { courseId:'c8', titulo:'Psicología y Mental Coaching', descripcion:'Control mental bajo presión, rutinas pre-competición, manejo del estrés y técnicas de visualización usadas por campeones mundiales.', nivel:'advanced', imagen:'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=600', horas:'14', lecciones:'36', alumnos:'98', precio:99.99, precioAnterior:130.00, premium:false, destacado:false, orden:16 },
  { courseId:'c9', titulo:'Masterclass: Ruta al Podio Internacional', descripcion:'El programa más completo de Shoteam. Desde análisis biomecánico hasta participación en simulacros de competición internacionales.', nivel:'advanced', imagen:'https://images.unsplash.com/photo-1613769049987-b31b641f25b1?auto=format&fit=crop&q=80&w=600', horas:'30', lecciones:'72', alumnos:'56', precio:189.99, precioAnterior:250.00, premium:true, destacado:false, orden:17 },
  { courseId:'a4', titulo:'Biomecánica del Disparo Perfecto', descripcion:'Análisis científico de cada fase del disparo: pre-tensión, presión de gatillo, seguimiento y recuperación. Con análisis de video frame a frame.', nivel:'advanced', imagen:'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?auto=format&fit=crop&q=80&w=600', horas:'16', lecciones:'40', alumnos:'87', precio:129.99, precioAnterior:160.00, premium:false, destacado:false, orden:18 },
  { courseId:'a5', titulo:'Preparación para Mundiales ISSF', descripcion:'Todo lo que necesitas saber para competir a nivel mundial: acreditación, protocolos, clasificaciones y entrenamiento periódico de alta intensidad.', nivel:'advanced', imagen:'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=600', horas:'22', lecciones:'55', alumnos:'43', precio:159.99, precioAnterior:200.00, premium:false, destacado:false, orden:19 },
  { courseId:'a6', titulo:'Análisis de Video y Auto-Coaching', descripcion:'Aprende a filmarte, analizar tus errores técnicos y crear un plan de mejora personal. Herramientas y software utilizados por coaches de élite.', nivel:'advanced', imagen:'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&q=80&w=600', horas:'12', lecciones:'32', alumnos:'76', precio:109.99, precioAnterior:140.00, premium:false, destacado:false, orden:20 },
  { courseId:'a7', titulo:'Coaching y Dirección de Equipos', descripcion:'Para tiradores que quieren convertirse en entrenadores: metodología, planificación de temporadas, motivación y liderazgo de equipo.', nivel:'advanced', imagen:'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=600', horas:'18', lecciones:'44', alumnos:'62', precio:139.99, precioAnterior:175.00, premium:false, destacado:false, orden:21 },
]

async function importar() {
  console.log(`Importando ${cursos.length} cursos a Sanity...`)
  for (const curso of cursos) {
    const doc = {
      _type: 'curso',
      _id: `curso-${curso.courseId}`,  // ID predecible para evitar duplicados
      ...curso,
    }
    await client.createOrReplace(doc)
    console.log(`✓ [${curso.nivel.toUpperCase()}] ${curso.titulo}`)
  }
  console.log('\n✅ ¡Listo! Todos los cursos fueron importados correctamente.')
}

importar().catch(err => {
  console.error('❌ Error al importar:', err.message)
  process.exit(1)
})