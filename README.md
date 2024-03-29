# A Star Algorithm
A web project simulator for A* algorithm. Using just Vanilla JS 

*añadir demo gif*

The main goal of this project was to learn how the A* Algorithm works on a basic level in under a month. Therefore the algorithm may not always choose the best path from point A to B since we will not be link reorganizing

# Table of Contents

1. [How the A* algorithm works](#how-the-a*-algorithm-works)
2. [User Guide](#user-guide)
3. [Features](#features)
4. [Roadmap](#roadmap)
5. [Optimizations](#optimizations)
6. [License](#license)
7. [Design decissions](#design-decissions)
8. [Lessons Learned](#lessons-learned)

    
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

Once the design is complete, users have two options for traversing the route:
By clicking on:
 - Siguiente: Displays the simulation step by step.
 - Omitir: Shows the simulation all at once.

During the exploration, the two list will be represented by colouring the selected cells:
| Color             | Box                                                                |
| ----------------- | ------------------------------------------------------------------ |
| ![#ffa500](https://via.placeholder.com/10/ffa500?text=+)  | Open List |
| ![#add8e6](https://via.placeholder.com/10/add8e6?text=+)  | Closed List |

Once the path is found, the cells will change colours to show the result:
| Color             | Box                                                                |
| ----------------- | ------------------------------------------------------------------ |
| ![#80080](https://via.placeholder.com/10/80080?text=+)  | Final Path |




## Features

- Choose the grid's dimensions
- Create the labyrinth: determine starting and finishing point, or obstacles that must be avoided
- Calculate the cost of traveling from starting point to finishing point


## Roadmap

- Make a simple grid, with a clear design easy to understand at first sight
  ![image](https://github.com/jesuggc/A-Algorithm/assets/73794079/6c008f30-7f0b-4469-af86-79d1b7cbdfef)

- Learn how to use the drag and drop properties
  ![image](https://github.com/jesuggc/A-Algorithm/assets/73794079/0ef0ff97-11a2-4842-9776-94826290e669)

- Fully understand how the A* algorithm worked
  [foto de tablet]

  


## Optimizations
*añadir*
What optimizations did you make in your code? E.g. refactors, performance improvements, accessibility


## License

[MIT](https://github.com/jesuggc/A-Algorithm/blob/main/license.txt)

## Design decissions

Drag and drop wasnt enough, had to add the "select cell" option, since adding the obstacle cells would've been to slow and tedious if the user had to go back to click on the cell and drag it back to the matrix. This way once the obstacle is selected, the user only has to click on the matrix's cells to "drop" the obstacle, no need to back to drag it.
Show the simulation step by step, we found it interesting to see how the nodes were added to the open and closed list

## Lessons Learned

What did you learn while building this project? What challenges did you face and how did you overcome them?
