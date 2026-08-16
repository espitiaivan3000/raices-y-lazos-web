# Panel de administración

Este sitio incluye un panel privado en `https://raicesylazos.org/admin/`.

## Antes de usarlo

Los siguientes archivos deben estar en la raíz del repositorio de GitHub conectado a Netlify:

- `admin/index.html`
- `admin/config.yml`
- `content/site.json`
- `index.html`
- `script.js`

También deben conservarse `styles.css` y la carpeta `assets/`.

## Activar el acceso en Netlify

1. En el proyecto `raicesylazos.org`, abre **Project configuration**.
2. Busca **Identity** y habilita **Netlify Identity**.
3. En **Registration preferences**, selecciona **Invite only**.
4. En **Services**, habilita **Git Gateway**.
5. En **Identity**, usa **Invite users** e invita el correo personal de cada persona que podrá administrar la web.
6. Abre `https://raicesylazos.org/admin/`, crea la contraseña desde la invitación e inicia sesión.

## Qué se puede cambiar

En **Contenido del sitio → Página de inicio** se editan:

- Portada y manifiesto.
- Textos de “Nosotros” y “Cómo trabajamos”.
- Líneas de acción y sus colores.
- Principios.
- Invitación a participar.
- Correo, teléfono, ciudad, país y dominio.

Al pulsar **Publish**, el panel crea un cambio en GitHub y Netlify publica automáticamente la actualización. No es necesario editar código.

## Importante

- Mantén el acceso en **Invite only**: así nadie ajeno puede administrar el sitio.
- No borres el archivo `content/site.json`; es donde el panel guarda el contenido.
- Cuando agreguen noticias, proyectos o una galería, se pueden añadir como nuevas secciones editables al mismo panel.
