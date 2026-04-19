export default {
  name: 'curso',
  title: 'Cursos',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Título del curso',
      type: 'string'
    },
    {
      name: 'descripcion',
      title: 'Descripción',
      type: 'text'
    },
    {
      name: 'nivel',
      title: 'Nivel',
      type: 'string',
      options: {
        list: [
          { title: 'Básico', value: 'basico' },
          { title: 'Intermedio', value: 'intermedio' },
          { title: 'Avanzado', value: 'avanzado' }
        ],
        layout: 'radio'
      }
    },
    {
      name: 'imagen',
      title: 'Imagen del curso',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'videoUrl',
      title: 'URL del video',
      type: 'url'
    },
    {
      name: 'duracion',
      title: 'Duración',
      type: 'string'
    },
    {
      name: 'precio',
      title: 'Precio',
      type: 'number'
    }
  ]
}