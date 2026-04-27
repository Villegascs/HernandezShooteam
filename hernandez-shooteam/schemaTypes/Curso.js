export default {
  name: 'curso',
  title: 'Cursos',
  type: 'document',
  fields: [
    { name: 'titulo', title: 'Título del curso', type: 'string' },
    { name: 'descripcion', title: 'Descripción', type: 'text' },
    { name: 'nivel', title: 'Nivel', type: 'string',
      options: { list: [
        { title: 'Básico', value: 'basic' },
        { title: 'Intermedio', value: 'inter' },
        { title: 'Avanzado', value: 'advanced' }
      ], layout: 'radio' }
    },
    { name: 'imagen', title: 'Imagen del curso', type: 'image', options: { hotspot: true } },
    { name: 'videoUrl', title: 'URL del video', type: 'url' },
    { name: 'horas', title: 'Horas de duración', type: 'string' },
    { name: 'lecciones', title: 'Número de lecciones', type: 'string' },
    { name: 'alumnos', title: 'Número de alumnos', type: 'string' },
    { name: 'precio', title: 'Precio actual ($)', type: 'number' },
    { name: 'precioAnterior', title: 'Precio anterior ($)', type: 'number' },
    { name: 'courseId', title: 'ID del curso (ej: c1, b2)', type: 'string' },
    { name: 'premium', title: 'Es curso Premium', type: 'boolean' },
    { name: 'orden', title: 'Orden de aparición', type: 'number' },
    {
      name: 'beneficios',
      title: 'Este curso incluye (Beneficios)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ej: "12 horas de vídeo bajo demanda", "Acceso de por vida"'
    },
    {
      name: 'modulos',
      title: 'Módulos del Curso',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'titulo', title: 'Título del Módulo', type: 'string' },
            {
              name: 'clases',
              title: 'Clases',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'titulo', title: 'Título de la clase', type: 'string' },
                    { name: 'duracion', title: 'Duración (ej. 15:00)', type: 'string' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}