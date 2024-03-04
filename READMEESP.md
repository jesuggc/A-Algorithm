# Algoritmo A Estrella
Un proyecto de simulación para el algoritmo A*. Usando solo JS Vanilla

*añadir demo gif*

El objetivo principal de este proyecto es aprender como funciona el algoritmo A*, a un nivel básico, en menos de un mes. Por tanto, el algoritmo puede no elegir siempre el mejor camino desde el punto A al B, pues no realizamos reorganización de enlaces.

# Índice

1. [Cómo funciona el algortimo A*](#como-funciona-el-algortimo-a*)
2. [Guía de usuario](#guia-de-usuario)
3. [Características](#caracteristicas)
4. [Roadmap](#roadmap)
5. [Optimizaciones](#optimizaciones)
6. [Licencia](#licencia)
7. [Decisiones de diseño](#decisiones-de-diseño)
8. [Lecciones aprendidas](#lecciones-aprendidas)

    
## Cómo funciona el algortimo A*
El algortimo A* es un algoritmo de búsqueda de caminos, o pathfinding, comunmente usado en varios campos, incluyendo robótica, videojuegos, y planficación de rutas. Encuentra el camino más corto de forma eficiente entre dos puntos de un grafo, considerando tanto el coste de alcanzar cada nodo como el coste estimado para alcanzar la meta.

Esta es una breve descripción de como funciona el algoritmo:
- Inicialización: Comienza con un nodo inicial, o punto de partida, y un nodo meta. Se asignan valores iniciales como coste y heurística estimados para cada nodo.
- Exploración: El algoritmo guarda dos listas de nodos: abierta y cerrada. Comienza añadiendo el nodo inicial a abierta. Mientras haya nodos en abierta, el algoritmo sigue iterando, seleccionando el nodo con el coste combinado más pequeño (el coste actual del nodo de inicio más el coste estimado de llegar al nodo meta) y explora a sus nodos vecinos.
- Evaluación de vecinos: Para cada vecino del nodo actual, se calcula el coste desde el nodo inicial y el coste estimado para llegar al nodo meta (función heurística). Se actualiza el coste de los vecinos si se encuentra un camino más corto, y se añade a la lista abierta si no está en ella aún.
- Finalización: Si se alcanza el nodo meta, se ha encontrado el camino más corto. Si la lista abierta está vacía antes de encontrar la meta, no hay camino.
- Reconstrucción del camino: Una vez se encuentra la meta, recorremos el camino desde este hasta el nodo inicial usando punteros o referencias guardadas en cada nodo.
The A* Algorithm is a popular pathfinding algorithm commonly used in various applications, including robotics, video games, and route planning. It efficiently finds the shortest path between two points on a graph, considering both the cost of reaching each node and the estimated cost to reach the goal.

En el algoritmo A* sin reorganización de enlaces, el algoritmo sigue un enfoque directo sin ajustar los enlaces entre nodos dinámicamente durante la exploración. Esto significa que una vez que se agrega un nodo a la lista cerrada, sus conexiones con otros nodos no cambian, independientemente de si se descubre un camino más corto hacia él más tarde

## Guía de usuario

La primera vista pedirá al usuario que determine el tamaño de la matriz, usando un input de tipo range para elegir los valores del alto y ancho.
 
Después de hacer click en el botón de "Enviar", se redirige al simulador. Allí, el usuario podrá diseñar el laberinto como desee. Hay distintos tipos de celda entre los que elegir:


| Color             | Celda                                                                |
| ----------------- | ------------------------------------------------------------------ |
| ![#008000](https://via.placeholder.com/10/008000?text=+)  | Punto inicial |
| ![#ff0000](https://via.placeholder.com/10/ff0000?text=+)  | Punto final |
| ![#000000](https://via.placeholder.com/10/000000?text=+)  | Obstáculos |

Una vez el diseño este completo, el usuario tendrá dos opciones para observar la exploración, si hace click en:
- Siguiente: Se mostrará la simulación paso a paso
- Omitir: Se mostrará la simulación de principio a fin automáticamente.

Durante la exploración, se representarán las dos listas, si se mantiene el checkbox activado, pintando las celdas de la siguiente forma:

| Color             | Celda                                                                |
| ----------------- | ------------------------------------------------------------------ |
| ![#ffa500](https://via.placeholder.com/10/ffa500?text=+)  | Lista Abierta |
| ![#add8e6](https://via.placeholder.com/10/add8e6?text=+)  | Lista Cerrada |

Una vez se encuentre el camino, las celdas cambiarán de color para mostrar el resultado final:
| Color             | Celda                                                                |
| ----------------- | ------------------------------------------------------------------ |
| ![#800080](https://via.placeholder.com/10/800080?text=+)  | Camino final |




## Características

- Elegir las dimensiones de la cuadrícula.
- Crear el laberinto: determinar el punto inicial y final, o los obstáculos a evitar.
- Calcular el coste de viajar desde el punto inicial hasta el final.


## Roadmap

- Hacer una cuadricula simple, con un diseño claro que se entienda a simple vista.
  ![image](https://github.com/jesuggc/A-Algorithm/assets/73794079/6c008f30-7f0b-4469-af86-79d1b7cbdfef)

- Aprender a usar las propiedades de drag and drop, para poder usarlas en el diseño del laberinto
  ![image](https://github.com/jesuggc/A-Algorithm/assets/73794079/0ef0ff97-11a2-4842-9776-94826290e669)

- Entender completamente como funciona el algortimo A* con casos específicos.
  [foto de tablet]

  


## Optimizaciones
*añadir*



## Licencia

[MIT](https://github.com/jesuggc/A-Algorithm/blob/main/license.txt)

## Decisiones de diseño
La característica de drag and drop no fue suficiente, por ello se añadió la opción de "seleccionar", pues añadir las celdas de obstáculos  se hacia muy tedioso al tener que volver a por ella para arrastrarlo de nuevo a la matriz. De esta forma, si el obstáculo se selecciona, el usuario solo tiene que hacer click en las celdas de la cuadrícula, sin necesidad de volver para arrastrarlo.

Mostrar la simulación paso a paso, pues nos pareció interesnte ver que nodos se iban añadiendo a las listas abierta y cerrada.

## Lecciones aprendidas


