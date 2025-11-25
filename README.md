# 📘 Dashboard de Jugadores de Fútbol — Examen React

## Descripción del Proyecto
Este proyecto es un Dashboard interactivo desarrollado en React como parte del examen final. Permite buscar jugadores con debounce, ordenar columnas, ver estadísticas generadas dinámicamente, paginar resultados, abrir un modal con detalles del jugador, gestionar favoritos y almacenar información en localStorage. La aplicación está construida con una arquitectura basada en componentes ubicados dentro de la carpeta src/components. La estructura del proyecto es: examen-react/, public/, src/, src/components/, src/components/SearchBar, src/components/SearchHistory, src/components/PlayerTable, src/components/Pagination, src/components/StatsPanel, src/components/Modal, src/components/ThemeToggle, src/data/players.js, App.jsx, main.jsx, package.json y vite.config.js.

## Instrucciones de Instalación
Para ejecutar este proyecto localmente se debe clonar el repositorio correspondiente y luego ejecutar el comando npm install para instalar las dependencias necesarias. Una vez instaladas, se inicia el servidor de desarrollo ejecutando npm run dev y luego se abre en el navegador la URL que entrega Vite (por lo general http://localhost:5173).

##  Lista de Hooks Utilizados y Explicación
El proyecto utiliza varios hooks principales. useState: maneja estados como búsqueda, debounce, historial, favoritos, modal, paginación y ordenamiento. useEffect: ejecuta efectos secundarios como guardar datos en localStorage, aplicar el debounce, resetear la página cuando cambian filtros y limpiar temporizadores cuando es necesario. useMemo: optimiza cálculos como el promedio de edad, el máximo goleador y el total de jugadores filtrados para evitar recomputaciones innecesarias.

##  Estructura de Carpetas y Componentes
El proyecto contiene una arquitectura organizada dentro de la carpeta src. Allí se encuentran los componentes SearchBar, SearchHistory, PlayerTable, Pagination, StatsPanel, Modal y ThemeToggle, cada uno encargado de una parte de la interfaz. La carpeta src/data contiene players.js con los datos base de los jugadores. App.jsx contiene toda la lógica global aplicada en conjunto y main.jsx monta la aplicación. Esta estructura facilita la modularidad, reutilización y mantenimiento del código.

##  Nombres de los Integrantes
Este proyecto fue realizado individualmente por la estudiante Yuliana Granada.

##  Link al Deploy de Netlify
El enlace al deploy en Netlify será agregado tras publicar la versión final.

##  IA Utilizada
Se utilizó ChatGPT de OpenAI como herramienta de apoyo en la redacción, estructura y soporte técnico general.