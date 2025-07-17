# Oukitel Survey Application

Aplicación de encuestas para productos Oukitel, permitiendo a los usuarios evaluar diferentes aspectos de los productos y recopilar feedback valioso.

## Características

- Interfaz responsive (versiones móvil y desktop)
- Registro de usuarios
- Evaluación de múltiples productos
- Integración con Instagram
- Sistema de votación intuitivo
- Almacenamiento de datos en MongoDB

## Tecnologías Utilizadas

- React.js
- Tailwind CSS
- Express.js (Backend)
- MongoDB
- Vercel (Deployment)

## Configuración del Proyecto

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/oukitel-survey.git
cd oukitel-survey
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm start
```

## Estructura del Proyecto

```
project/
  ├── public/          # Archivos estáticos
  ├── src/             # Código fuente
  │   ├── components/  # Componentes React
  │   ├── services/    # Servicios API
  │   ├── utils/       # Utilidades
  │   └── styles/      # Estilos CSS
  └── backend/         # Código del backend
```

## Despliegue

La aplicación está configurada para ser desplegada en Vercel:

1. Frontend: Desplegado automáticamente con cada push a la rama main
2. Backend: Alojado en Render.com

## Variables de Entorno

```env
MONGODB_URI=tu_uri_de_mongodb
NODE_ENV=production
```

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información. 