export default {
  name: 'inicio',
  title: 'Página de Inicio',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Título principal',
      type: 'string'
    },
    {
      name: 'subtitulo',
      title: 'Subtítulo',
      type: 'string'
    },
    {
      name: 'descripcion',
      title: 'Descripción',
      type: 'text'
    },
    {
      name: 'imagenHero',
      title: 'Imagen principal',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'botonTexto',
      title: 'Texto del botón',
      type: 'string'
    }
  ]
}