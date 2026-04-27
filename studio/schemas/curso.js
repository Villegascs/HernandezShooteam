export default {
  name: 'curso',
  title: 'Curso',
  type: 'document',
  fields: [
    {
      name: 'courseId',
      title: 'ID del Curso (único)',
      type: 'string',
      description: 'Identificador único. Ej: c1, b4, a5. No cambiar una vez creado.',
      validation: Rule => Rule.required(),
    },
    {
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required().min(5).max(120),
    },
    {
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
    },
    {
      name: 'nivel',
      title: 'Nivel',
      type: 'string',
      options: {
        list: [
          { title: '🟢 Básico',     value: 'basic'    },
          { title: '🟡 Intermedio', value: 'inter'    },
          { title: '🔴 Avanzado',   value: 'advanced' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'imagen',
      title: 'Imagen del Curso',
      type: 'image',
      options: { hotspot: true },
      description: 'Sube la imagen de portada del curso',
    },
    {
      name: 'horas',
      title: 'Duración (horas)',
      type: 'string',
    },
    {
      name: 'lecciones',
      title: 'Número de Lecciones',
      type: 'string',
    },
    {
      name: 'alumnos',
      title: 'Alumnos Inscritos',
      type: 'string',
    },
    {
      name: 'precio',
      title: 'Precio (USD $)',
      type: 'number',
      validation: Rule => Rule.required().positive(),
    },
    {
      name: 'precioAnterior',
      title: 'Precio Anterior / Tachado (USD $)',
      type: 'number',
    },
    {
      name: 'premium',
      title: '⭐ Curso Premium',
      type: 'boolean',
      description: 'Activa para mostrar la etiqueta dorada Premium',
      initialValue: false,
    },
    {
      name: 'destacado',
      title: '🏠 Destacado en Portada',
      type: 'boolean',
      description: 'Activa para que aparezca entre los cursos destacados del inicio',
      initialValue: false,
    },
    {
      name: 'orden',
      title: 'Orden de aparición',
      type: 'number',
      description: 'Número para ordenar los cursos dentro del catálogo (1 = primero)',
    },
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
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'nivel',
      destacado: 'destacado',
      premium: 'premium',
    },
    prepare({ title, subtitle, destacado, premium }) {
      const nivelMap = { basic: '🟢 Básico', inter: '🟡 Intermedio', advanced: '🔴 Avanzado' }
      const badges = [nivelMap[subtitle] || subtitle, destacado ? '🏠' : '', premium ? '⭐' : ''].filter(Boolean).join(' ')
      return { title, subtitle: badges }
    },
  },
  orderings: [
    { title: 'Orden de aparición', name: 'ordenAsc', by: [{ field: 'orden', direction: 'asc' }] },
    { title: 'Nivel', name: 'nivelAsc', by: [{ field: 'nivel', direction: 'asc' }] },
    { title: 'Precio (menor)', name: 'precioAsc', by: [{ field: 'precio', direction: 'asc' }] },
  ],
}
