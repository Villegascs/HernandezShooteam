import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import cursoSchema from './schemas/curso'

export default defineConfig({
  name: 'hernandez-shooteam',
  title: 'Hernández Shoteam — CMS',

  projectId: 'wnfb3rqp',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('📚 Cursos')
              .child(
                S.documentList()
                  .title('Todos los Cursos')
                  .filter('_type == "curso"')
                  .defaultOrdering([{ field: 'orden', direction: 'asc' }])
              ),
            S.divider(),
            S.listItem()
              .title('🟢 Cursos Básicos')
              .child(
                S.documentList()
                  .title('Nivel Básico')
                  .filter('_type == "curso" && nivel == "basic"')
              ),
            S.listItem()
              .title('🟡 Cursos Intermedios')
              .child(
                S.documentList()
                  .title('Nivel Intermedio')
                  .filter('_type == "curso" && nivel == "inter"')
              ),
            S.listItem()
              .title('🔴 Cursos Avanzados')
              .child(
                S.documentList()
                  .title('Nivel Avanzado')
                  .filter('_type == "curso" && nivel == "advanced"')
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: [cursoSchema],
  },
})
