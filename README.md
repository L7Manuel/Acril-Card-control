# ACRILCARD

## Sistema de Fidelización Digital

## Descripción

Sistema de gestión de tarjetas de fidelización digital que permite a los clientes acumular sellos y canjear recompensas. La aplicación está desarrollada con React y utiliza el almacenamiento local del navegador para persistir los datos.

## Características Principales

- **Gestión de Clientes**: Añadir, buscar y gestionar clientes en el sistema.
- **Tarjetas de Fidelización Digital**: Cada cliente recibe una tarjeta digital única.
- **Sistema de Sellos**: Los clientes pueden acumular sellos en su tarjeta.
- **Recompensas**: Configuración personalizable de sellos necesarios para canjear recompensas.
- **Vista de Cliente**: Los clientes pueden ver su tarjeta y estado de recompensas.
- **Responsive**: Diseño adaptativo que funciona en dispositivos móviles y de escritorio.

## Tecnologías Utilizadas

- **Frontend**:
  - React 18
  - Tailwind CSS (según se desprende de las clases utilizadas)
  - Lucide React (para iconos)
  - Vite (según la estructura del proyecto)

## Estructura del Proyecto

```
Acril-Card-control/
├── public/           # Archivos estáticos
├── src/
│   ├── App.js        # Componente principal de la aplicación
│   ├── CustomerLoyaltyCard.jsx  # Componente de tarjeta de fidelización
│   ├── index.js      # Punto de entrada de la aplicación
│   └── index.css     # Estilos globales
├── package.json      # Dependencias y scripts
└── README.md         # Documentación del proyecto
```

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
   - Completa el formulario con los datos del cliente
   - Haz clic en "Guardar Cliente"

2. **Buscar Cliente**:
   - Utiliza la barra de búsqueda para encontrar clientes por nombre o cédula

3. **Gestionar Sellos**:
   - Selecciona un cliente
   - Haz clic en el botón "+" para agregar un sello
   - Los sellos se guardan automáticamente

### Vista de Cliente
- Los clientes pueden acceder a su tarjeta a través de un enlace único
- La tarjeta muestra:
  - Nombre del cliente
  - Cédula
  - Teléfono
  - Código único
  - Sellos acumulados
  - Progreso hacia la próxima recompensa

## Personalización

### Configurar Sellos por Recompensa
Por defecto, se requieren 10 sellos para canjear una recompensa. Puedes modificar este valor en el código fuente.

### Estilos
Los estilos están definidos con Tailwind CSS. Puedes personalizar los colores y el diseño modificando las clases en los componentes.

## Almacenamiento
Los datos de los clientes se guardan en el `localStorage` del navegador. Esto significa que:
- Los datos persisten al actualizar la página
- Los datos son específicos del navegador y dispositivo
- Se pueden perder si el usuario borra los datos del navegador

## Limitaciones
- Los datos solo se almacenan localmente en el navegador
- No hay autenticación de usuarios
- No hay copia de seguridad automática de los datos

## Mejoras Futuras
- Implementar autenticación de usuarios
- Añadir sincronización con una base de datos en la nube
- Generar códigos QR para las tarjetas de fidelización
- Añadir informes y estadísticas
- Implementar sistema de notificaciones

## Contribución

1. Haz un fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Haz commit de tus cambios (`git commit -am 'Añadir nueva característica'`)
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más información.

---

Desarrollado por [Tu Nombre] - [Año Actual]
