# ACRILCARD

## Sistema de Fidelización Digital

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-06B6D4.svg)](https://tailwindcss.com/)

## Descripción

Sistema de gestión de tarjetas de fidelización digital que permite a los clientes acumular sellos y canjear recompensas. La aplicación está desarrollada con React y utiliza el almacenamiento local del navegador para persistir los datos.

## Características Principales

- **Gestión de Clientes**: Añadir, buscar y gestionar clientes en el sistema.
- **Identificación Flexible**: Soporte para diferentes tipos de identificación (V- Venezolano, E- Extranjero, J- Jurídico).
- **Tarjetas de Fidelización Digital**: Cada cliente recibe una tarjeta digital única con código personalizado.
- **Sistema de Sellos**: Los clientes pueden acumular sellos en su tarjeta.
- **Recompensas**: Configuración personalizable de sellos necesarios para canjear recompensas.
- **Vista de Cliente**: Los clientes pueden ver su tarjeta y estado de recompensas.
- **Manejo de Errores**: Sistema robusto para capturar y manejar errores de manera elegante.
- **Notificaciones**: Retroalimentación al usuario mediante notificaciones contextuales.
- **Diseño Responsive**: Interfaz adaptativa que funciona en dispositivos móviles y de escritorio.

## Tecnologías Utilizadas

- **Frontend**:
  - React 18
  - React Router (para navegación)
  - Tailwind CSS (para estilos)
  - Lucide React (para iconos)
  - Vite (entorno de desarrollo)
  - Context API (para gestión de estado global)

## Estructura del Proyecto

```
Acril-Card-control/
├── public/                 # Archivos estáticos
├── src/
│   ├── components/         # Componentes de la aplicación
│   │   ├── common/         # Componentes reutilizables
│   │   │   ├── Button.jsx  # Componente de botón personalizado
│   │   │   ├── InputField.jsx # Componente de entrada personalizado
│   │   │   └── ...
│   │   └── test/           # Componentes para pruebas
│   ├── contexts/           # Contextos de React
│   │   └── NotificationContext.jsx  # Manejo global de notificaciones
│   ├── pages/              # Páginas de la aplicación
│   │   └── TestErrorHandling.jsx    # Página de pruebas de errores
│   ├── App.js              # Componente principal de la aplicación
│   ├── CustomerLoyaltyCard.jsx      # Componente de tarjeta de fidelización
│   ├── index.js            # Punto de entrada de la aplicación
│   └── index.css           # Estilos globales
├── package.json            # Dependencias y scripts
└── README.md               # Documentación del proyecto
```

### Componentes Clave

1. **InputField**
   - Componente reutilizable para campos de formulario
   - Estilos predefinidos para consistencia visual
   - Soporte para validación y mensajes de error
   - Uso recomendado para la mayoría de los campos de formulario

2. **CustomerLoyaltyCard**
   - Muestra la información del cliente y su progreso
   - Diseño responsivo para móviles y escritorio
   - Muestra sellos acumulados y recompensas disponibles

## Instalación

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd Acril-Card-control
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```

4. Abre tu navegador y ve a `http://localhost:3000`

## Uso

### Panel de Administración
1. **Añadir Cliente**:
   - Haz clic en "Añadir Cliente"
   - Completa el formulario con los datos del cliente:
     - Nombre completo
     - Teléfono
     - Tipo de identificación (V/E/J)
     - Número de identificación (6-12 dígitos)
   - Haz clic en "Guardar Cliente"

2. **Buscar Cliente**:
   - Utiliza la barra de búsqueda para encontrar clientes por nombre o número de identificación
   - Los resultados se filtran en tiempo real

3. **Gestionar Sellos**:
   - Selecciona un cliente de la lista
   - Haz clic en el botón "+" para agregar un sello
   - Los sellos se guardan automáticamente
   - Se muestra una notificación de confirmación

### Vista de Cliente
- Los clientes pueden acceder a su tarjeta a través de un enlace único
- La tarjeta muestra:
  - Nombre del cliente
  - Identificación (con formato V/E/J + número)
  - Teléfono
  - Código único generado automáticamente
  - Sellos acumulados
  - Progreso hacia la próxima recompensa
  - Indicador visual del estado de la tarjeta

### Tipos de Identificación
- **V**: Venezolano (cédula de identidad)
- **E**: Extranjero (cédula de extranjería)
- **J**: Jurídico (RIF de empresa)

## Personalización

### Configuración
1. **Sellos por Recompensa**:
   - Por defecto se requieren 10 sellos para canjear una recompensa
   - Puedes modificar este valor en el código fuente

2. **Tipos de Identificación**:
   - El sistema soporta tres tipos de identificación: V, E, J
   - La validación del número de identificación es configurable

### Estilos
- **Tailwind CSS**:
  - Todos los estilos están definidos con clases de Tailwind
  - Paleta de colores personalizable a través de `tailwind.config.js`
  - Diseño responsivo con breakpoints predefinidos

### Componentes Personalizados
- **InputField**:
  - Componente reutilizable para formularios
  - Estilos consistentes en toda la aplicación
  - Soporte para validación y mensajes de error
  - Uso recomendado para mantener la consistencia visual

- **Button**:
  - Estilos predefinidos para acciones primarias y secundarias
  - Estados de hover, focus y disabled
  - Iconos opcionales

## Almacenamiento
Los datos de los clientes se guardan en el `localStorage` del navegador. Esto significa que:
- Los datos persisten al actualizar la página
- Los datos son específicos del navegador y dispositivo
- Se pueden perder si el usuario borra los datos del navegador

## Sistema de Manejo de Errores

La aplicación incluye un sistema robusto de manejo de errores que incluye:

- **Error Boundary**: Captura errores en los componentes y muestra una interfaz de error amigable.
- **Notificaciones Contextuales**: Muestra mensajes de éxito, error, advertencia e información.
- **Manejo de Errores Asíncronos**: Captura y maneja errores en operaciones asíncronas.

### Características:

- Interfaz de error amigable con opción de reintentar.
- Notificaciones no intrusivas que desaparecen automáticamente.
- Registro de errores en la consola para depuración.
- Diseño responsivo en todos los dispositivos.

### Acceso a Herramientas de Desarrollo

Las herramientas de desarrollo están disponibles en:
- `/test-errors` - Página de pruebas de errores

> **Nota**: Estas herramientas están ocultas en la interfaz de usuario principal y solo son accesibles a través de la URL directa.

## Limitaciones
- Los datos solo se almacenan localmente en el navegador
- No hay autenticación de usuarios
- No hay copia de seguridad automática de los datos

## Mejoras Futuras

### Próximas Características
- [ ] Autenticación de usuarios con roles
- [ ] Sincronización con base de datos en la nube
- [ ] Generación de códigos QR para tarjetas
- [ ] Módulo de informes y estadísticas
- [ ] Sistema de notificaciones push
- [ ] Exportación de datos a Excel/PDF
- [ ] Múltiples programas de fidelización

### Mejoras Técnicas
- [ ] Mejorar la accesibilidad (a11y)
- [ ] Añadir más pruebas unitarias
- [ ] Optimizar el rendimiento para grandes volúmenes de datos
- [ ] Implementar carga perezosa (lazy loading) para componentes pesados

## Contribución

¡Las contribuciones son bienvenidas! Sigue estos pasos para contribuir:

1. Haz un fork del repositorio
2. Crea una rama para tu característica:
   ```bash
   git checkout -b feature/nueva-caracteristica
   ```
3. Haz commit de tus cambios:
   ```bash
   git commit -m 'feat: Añadir nueva característica'
   ```
4. Haz push a la rama:
   ```bash
   git push origin feature/nueva-caracteristica
   ```
5. Abre un Pull Request

### Convenciones de Código
- Usa componentes funcionales con hooks de React
- Sigue las convenciones de nomenclatura de React
- Mantén los componentes pequeños y enfocados en una sola responsabilidad
- Documenta los props de los componentes con PropTypes

### Estándares de Commit
Usamos [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` Nueva característica
- `fix:` Corrección de errores
- `docs:` Cambios en la documentación
- `style:` Cambios de formato (puntos, comas, etc.)
- `refactor:` Cambios que no corrigen errores ni agregan funcionalidades
- `perf:` Cambios que mejoran el rendimiento
- `test:` Añadir o modificar pruebas
- `chore:` Cambios en el proceso de construcción o en herramientas auxiliares

## Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE).

La Licencia MIT es una licencia de software libre permisiva que permite el uso, copia, modificación, fusión, publicación, distribución, sublicencia y/o venta de copias del software, siempre que se incluya el aviso de copyright y el aviso de permiso en todas las copias o partes sustanciales del software.

### Resumen de la Licencia

- **Permitido**: Uso comercial, modificación, distribución, uso privado.
- **Requerido**: Incluir aviso de copyright y licencia en todas las copias.
- **Prohibido**: Responsabilidad por daños y garantías.

Para más detalles, consulta el archivo [LICENSE](LICENSE) en la raíz del proyecto.

---

## Soporte

Si necesitas ayuda o tienes preguntas:
- Abre un [issue](https://github.com/tu-usuario/Acril-Card-control/issues) en GitHub
- Envía un correo a soporte@ejemplo.com

## Registro de Cambios (CHANGELOG)

### [1.0.1] - 2025-08-11
#### Corregido
- **Error de inicialización**: Se solucionó el error "Cannot access 'generateCustomerCode' before initialization" que ocurría al cargar la aplicación.
  - Se movió la función `generateCustomerCode` dentro del componente principal.
  - Se implementó `useCallback` para optimizar el rendimiento.
  - Se mejoró el manejo de casos límite en la generación de códigos de cliente.
  - Se actualizaron las dependencias de los hooks para evitar referencias circulares.

#### Mejorado
- **Robustez**: Se agregó manejo de errores para valores nulos o indefinidos en la generación de códigos.
- **Documentación**: Se actualizó el registro de cambios para mantener un mejor seguimiento de las modificaciones.

### [1.0.0] - 2025-08-10
#### Lanzamiento Inicial
- Versión inicial del sistema de fidelización digital.

## Reconocimientos

- [React](https://reactjs.org/) - Biblioteca de JavaScript para interfaces de usuario
- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS utilitario
- [Lucide Icons](https://lucide.dev/) - Biblioteca de iconos

---

Desarrollado con ❤️ por [Tu Nombre] - © 2023
