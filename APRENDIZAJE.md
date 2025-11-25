

# APRENDIZAJE.md

## ¿Qué es useState y cuándo usarlo?

`useState` es un hook de React que permite crear **estado interno** dentro de un componente.
Sirve para almacenar valores que cambian con la interacción del usuario o durante la ejecución del programa.
Cada vez que el estado cambia, React vuelve a renderizar el componente con los nuevos datos.

### ¿Cuándo usarlo?

* Cuando necesitas guardar datos que cambian (inputs, favoritos, búsqueda).
* Cuando quieres actualizar la interfaz según acciones del usuario.
* Cuando necesitas valores que cambian con el tiempo (paginación, modo oscuro, filtros).

### Ejemplos reales del proyecto:

#### 1. Estado del campo de búsqueda

```jsx
const [searchTerm, setSearchTerm] = useState("");
```

#### 2. Estado del historial de búsqueda (con localStorage)

```jsx
const [searchHistory, setSearchHistory] = useState(() => {
  const saved = localStorage.getItem("searchHistory");
  return saved ? JSON.parse(saved) : [];
});
```

#### 3. Estado de la paginación

```jsx
const [currentPage, setCurrentPage] = useState(1);
```

---

## ¿Qué es useEffect y sus casos de uso?

`useEffect` es un hook que permite ejecutar **efectos secundarios**: acciones que ocurren fuera del ciclo normal de render de React, como:

* Guardar en localStorage
* Escuchar eventos
* Llamar APIs
* Manejar timers
* Ejecutar lógica cuando una variable cambia

React ejecuta el efecto **después** del render.

### Diferencias entre los tipos de dependencias

| Sintaxis                 | Cuándo se ejecuta                    |
| ------------------------ | -------------------------------------------------------           |
| `useEffect(fn)`          | En **cada render** del componente                 |
| `useEffect(fn, [])`      | Solo **una vez** al montar (similar a componentDidMount)         |

| `useEffect(fn, [valor])` | Solo cuando **valor cambie**                   |

### Ejemplo de cleanup function (usado en tu debounce)

```jsx
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchTerm);
  }, 300);

  return () => clearTimeout(timer); // Cleanup
}, [searchTerm]);
```

**¿Qué hace el cleanup?**
Limpia el timeout anterior cuando el usuario sigue escribiendo.
Esto evita búsquedas innecesarias y mejora el rendimiento.

---

##  ¿Qué es useMemo y cuándo usarlo?

`useMemo` memoriza (cachea) un **valor calculado**, evitando que React lo vuelva a recalcular en todos los renders.

Sirve para:

* Cálculos pesados
* Filtros
* Ordenamientos
* Procesamiento de datos

### Diferencia con useCallback

| Hook          | Memoriza                             |
| ------------- | ------------------------------------ |
| `useMemo`     | un **valor** (array, número, objeto) |
| `useCallback` | una **función**                      |

El proyecto no requiere `useCallback`, pero sí `useMemo` para optimizar cálculos.

### Ejemplo real del proyecto – Cálculo de estadísticas

```jsx
const stats = useMemo(() => {
  const total = filteredPlayers.length;
  const avgAge =
    total > 0
      ? filteredPlayers.reduce((acc, p) => acc + p.age, 0) / total
      : 0;

  const topScorer = filteredPlayers.reduce(
    (max, p) => (p.goals > max.goals ? p : max),
    filteredPlayers[0] || { name: "N/A", goals: 0 }
  );

  return { total, avgAge, topScorer };
}, [filteredPlayers]);
```

---

## ¿Cómo funciona el cleanup en useEffect?

El **cleanup** es una función que React ejecuta automáticamente cuando:

* El componente va a desmontarse
* La dependencia del useEffect va a cambiar

Su función es limpiar procesos que queden activos:

* timeouts
* intervals
* listeners
* websockets

### Ejemplo real del proyecto — Debounce

```jsx
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchTerm);
  }, 300);

  return () => clearTimeout(timer);
}, [searchTerm]);
```

Cuando el usuario escribe rápido:

* Se cancela el timeout anterior
* Se crea uno nuevo
* React evita búsquedas innecesarias

Esto es exactamente lo que se espera de un “debounce”.

---

## ¿Cómo funciona localStorage con React?

`localStorage` permite guardar datos directamente en el navegador.
La información NO se borra al recargar, cerrar pestaña o reiniciar el PC.

### Pasos para usarlo en React:

1. Leer datos iniciales con `useState(() => … )`
2. Guardar cambios dentro de un `useEffect`

### Ejemplo real del proyecto — modo oscuro

```jsx
const [darkMode, setDarkMode] = useState(() => {
  const saved = localStorage.getItem("darkMode");
  return saved ? JSON.parse(saved) : false;
});

useEffect(() => {
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
}, [darkMode]);
```

### Ejemplo real del proyecto — favoritos

```jsx
const [favorites, setFavorites] = useState(() => {
  const saved = localStorage.getItem("favorites");
  return saved ? JSON.parse(saved) : [];
});
```

---

## Declaración (IA utilizada)

Este archivo fue redactado con apoyo de **ChatGPT (OpenAI)** como asistente para estructuración, redacción y ejemplos.

