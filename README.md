# A Star Algorithm
A web project simulator for A* algorithm. Using just Vanilla JS 

![GIF Demo](https://github.com/jesuggc/A-Algorithm/blob/conPenalizacion/public/images/demo.gif)



The main goal of this project was to learn how the A* Algorithm works on a basic level in under a month. Therefore the algorithm may not always choose the best path from point A to B since we will not be link reorganizing

# Table of Contents

1. [How the A* algorithm works](#how-the-a*-algorithm-works)
2. [User Guide](#user-guide)
3. [Features](#features)
4. [Optimizations](#optimizations)
5. [License](#license)
6. [Design decissions](#design-decissions)
7. [Lessons Learned](#lessons-learned)

    
## How the A* Algorithm  works
The A* Algorithm is a popular pathfinding algorithm commonly used in various applications, including robotics, video games, and route planning. It efficiently finds the shortest path between two points on a graph, considering both the cost of reaching each node and the estimated cost to reach the goal.

Here's a brief description of how the A* Algorithm works:

Initialization: Start with an initial node (often called the start node) and a goal node. Assign initial values such as cost and heuristic estimates to each node.

Exploration: The algorithm maintains two lists of nodes: open and closed. It starts by adding the initial node to the open list. While there are nodes in the open list, the algorithm iteratively selects the node with the lowest combined cost (actual cost from start node plus estimated cost to goal node) and explores its neighbors.

Evaluation of neighbours: For each neighbour of the current node, calculate its cost from the start node and estimate its cost to the goal node (heuristic function). Update the neighbor's cost if a shorter path is found, and add it to the open list if it's not already there.

Termination: If the goal node is reached, the shortest path is found. If the open list becomes empty before reaching the goal, there is no path.

Path reconstruction: Once the goal node is reached, trace back the path from the goal node to the start node using pointers or references stored in each node.

In A* without link reorganization, the algorithm follows a straightforward approach without adjusting the links between nodes dynamically during exploration. This means that once a node is added to the closed list, its connections to other nodes remain unchanged, regardless of whether a shorter path to it is discovered later.


## User guide

The first view will prompt the user to determine the grid's size, using a range input to choose the width and height values.

After clicking on the submit button "Enviar," it will redirect to the actual simulator. There, the user will be able to design their desired maze. There are different types of cells to choose from:

| Color             | Box                                                                |
| ----------------- | ------------------------------------------------------------------ |
| ![#008000](https://via.placeholder.com/10/008000?text=+)  | Starting Point |
| ![#ff0000](https://via.placeholder.com/10/ff0000?text=+)  | Finishing Point |
| ![#000000](https://via.placeholder.com/10/000000?text=+)  | Obstacles |
| ![#6b676b](https://via.placeholder.com/10/6b676b?text=+)  | Penalties |

Once the design is complete, users have two options for traversing the route:
By clicking on:
 - Siguiente: Displays the simulation step by step.
 - Omitir: Shows the simulation all at once, the user will be able to slow it down by changing the input 

During the exploration, the two list will be represented by colouring the selected cells:
| Color             | Box                                                                |
| ----------------- | ------------------------------------------------------------------ |
| ![#ffa500](https://via.placeholder.com/10/ffa500?text=+)  | Open List |
| ![#add8e6](https://via.placeholder.com/10/add8e6?text=+)  | Closed List |

Once the path is found, the cells will change colours to show the result:
| Color             | Box                                                                |
| ----------------- | ------------------------------------------------------------------ |
| ![#800080](https://via.placeholder.com/10/800080?text=+)  | Final Path |

There will also be a Help button for more information

## Features

- Choose the grid's dimensions
- Create the labyrinth: determine starting and finishing point, or obstacles that must be avoided
- Calculate the cost of traveling from starting point to finishing point
- Possibility to add penalty cells to the maze


## License

[MIT](https://github.com/jesuggc/A-Algorithm/blob/main/license.txt)

## Design decissions
Drag and drop wasnt enough, had to add the "select cell" option, since adding the obstacle cells would've been to slow and tedious if the user had to go back to click on the cell and drag it back to the matrix. This way once the obstacle is selected, the user only has to click on the matrix's cells to "drop" the obstacle, no need to back to drag it.
Show the simulation step by step, we found it interesting to see how the nodes were added to the open and closed list
Decided to keep the penalty cells gray even when added to the open list to visually remind that is a more "expensive path"

---

# Algoritmo A Estrella
Un proyecto de simulación para el algoritmo A*. Usando solo JS Vanilla

![GIF Demo](https://github.com/jesuggc/A-Algorithm/blob/conPenalizacion/public/images/demo.gif)


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
| ![#6b676b](https://via.placeholder.com/10/6b676b?text=+)  | Penalización |

Una vez el diseño este completo, el usuario tendrá dos opciones para observar la exploración, si hace click en:
- Siguiente: Se mostrará la simulación paso a paso
- Omitir: Se mostrará la simulación de principio a fin automáticamente, podrá modificar el tiempo entre paso a paso cambiando los milisegundos en el input

Durante la exploración, se representarán las dos listas, si se mantiene el checkbox activado, pintando las celdas de la siguiente forma:

| Color             | Celda                                                                |
| ----------------- | ------------------------------------------------------------------ |
| ![#ffa500](https://via.placeholder.com/10/ffa500?text=+)  | Lista Abierta |
| ![#add8e6](https://via.placeholder.com/10/add8e6?text=+)  | Lista Cerrada |

Una vez se encuentre el camino, las celdas cambiarán de color para mostrar el resultado final:
| Color             | Celda                                                                |
| ----------------- | ------------------------------------------------------------------ |
| ![#800080](https://via.placeholder.com/10/800080?text=+)  | Camino final |

Además podrá encontrar más información en el botón de ayuda


## Características

- Elegir las dimensiones de la cuadrícula.
- Crear el laberinto: determinar el punto inicial y final, o los obstáculos a evitar.
- Calcular el coste de viajar desde el punto inicial hasta el final.


## Licencia

[MIT](https://github.com/jesuggc/A-Algorithm/blob/main/license.txt)

## Decisiones de diseño
La característica de drag and drop no fue suficiente, por ello se añadió la opción de "seleccionar", pues añadir las celdas de obstáculos  se hacia muy tedioso al tener que volver a por ella para arrastrarlo de nuevo a la matriz. De esta forma, si el obstáculo se selecciona, el usuario solo tiene que hacer click en las celdas de la cuadrícula, sin necesidad de volver para arrastrarlo.

Mostrar la simulación paso a paso, pues nos pareció interesnte ver que nodos se iban añadiendo a las listas abierta y cerrada.

Se decidió mantener el color de las casillas de penalización en gris, incluso al ser añadidas a la lista abierta para recordar visualmente al usuario de que se trata de un recorrido más costoso



