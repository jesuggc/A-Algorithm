$("#inicio").on("dragstart", () => drageado = "inicio")
$("#inicio").on("click", () => gestionarClick("inicio"));
$("#prohibido").on("dragstart", () => drageado = "prohibido")
$("#prohibido").on("click", () => gestionarClick("prohibido"));
$("#fin").on("dragstart", () => drageado = "fin")
$("#fin").on("click", () => gestionarClick("fin"));
$("#borrar").on("dragstart", () => drageado = "borrar")
$("#borrar").on("click", () => gestionarClick("borrar"));

$(".cuadrado").on("dragover", (event) => event.preventDefault())

$(".cuadrado").on("drop", function() {
  if (drageado === "inicio" || drageado === "fin") agregarInicioOFin($(this), drageado);
  else if (drageado === "prohibido") $(this).addClass("prohibido").removeClass("inicio fin");
  else if (drageado === "borrar") $(this).removeClass("inicio prohibido fin")
  drageado = null;
});

$(".cuadrado").on("click", function() {
  if (seleccionado === "inicio" || seleccionado === "fin") agregarInicioOFin($(this), seleccionado);
  else if (seleccionado === "prohibido") $(this).addClass("prohibido").removeClass("inicio fin");
  else if (seleccionado === "borrar") $(this).removeClass("inicio prohibido fin")
});

function gestionarClick(tipo) {
  if (seleccionado === tipo) {
    seleccionado = null;
    $(`#${tipo}`).removeClass("cuadradoSeleccionado").addClass("cuadradoDrag");
  } else {
    seleccionado = tipo;
    $(`#${tipo}`).removeClass("cuadradoDrag").addClass("cuadradoSeleccionado");
    $("#inicio, #prohibido, #fin").not(`#${tipo}`).removeClass("cuadradoSeleccionado").addClass("cuadradoDrag");
  }
}

function agregarInicioOFin(casilla, posicion) {
  casilla.removeClass("inicio fin prohibido").addClass(posicion);
  if (posicion === "inicio") {
    inicio = { x: parseInt(casilla.attr('id').split(',')[0]), y: parseInt(casilla.attr('id').split(',')[1]) };
    actual = inicio;
    abierta.push(inicio);
  } else if (posicion === "fin") {
    final = { x: parseInt(casilla.attr('id').split(',')[0]), y: parseInt(casilla.attr('id').split(',')[1]) };
  }
}

let drageado = null 
let seleccionado = null 
let inicio = {x:0, y:0} 
let final = {x:0, y:0}  
let actual = null
let fallo = false
let paso =  0
let pasoFinal = 0
let abierta = []
let cerrada = []
let sol = []
let alto = parseInt($("#mainRow").attr("data-id").split(",")[0])
let ancho = parseInt($("#mainRow").attr("data-id").split(",")[1])

function encontrarCercanos(x,y) {
  let lista = []
  for(let i = x-1; i <= x+1; i++) {
      for(let j = y-1; j <= y+1; j++) {
          if(i >= 0 && i < alto && j >= 0 && j < ancho && ((i != x || j != y))) lista.push({x:i,y:j}) 
      }
  }
  return lista
}

function expandirSucesores(actual) {
  let lista = encontrarCercanos(actual.x, actual.y)
  let nuevaLista=[]
  lista.forEach(ele => {
    let casilla = $("#"+ele.x+"\\,"+ele.y)
    if(!casilla.hasClass("prohibido") && !casilla.hasClass("recorrido")) {
      ele.padre = {x: actual.x, y: actual.y}
      nuevaLista.push(ele)
    }
  })
  return nuevaLista;
}

function calcularReal(x,y) {
  return calcularDistancias(actual.x,actual.y,x,y)
}

function calcularImaginaria(x,y) {
  return calcularDistancias(x,y,final.x,final.y)
}

function calcularDistancias(x1,y1,x2,y2) {
  return (Math.sqrt((x2-x1)**2 + (y2-y1)**2))
}

function calcularTotal(x,y) {
  return calcularReal(x,y) + calcularImaginaria(x,y)
}

function posMinimo(lista) {
  let minimo = lista[0].total
  let pos = 0
  lista.forEach((ele,indice) => {
      if(ele.total < minimo) {
          minimo = ele.total
          pos = indice
      }
  })
  return pos
}

// function mostrarInfo(opciones,minimo) {
//   $("#informacion").empty();
//   opciones.forEach(ele => {
//     let expression = "\\sqrt{x}";
//     $("#informacion").append("<p>La raíz cuadrada de " + expression + " es: \( " + expression + " \)</p>");
//   });
//   // Renderizar expresiones LaTeX después de agregarlas al DOM
//   MathJax.typeset(["#informacion"]);
// }
// function imprimeLista(lista){
//   let finalString = ""
//   lista.forEach(ele => {
//     finalString += "(" + ele.x + "," + ele.y + ")"
//   })
//   return finalString
// }

function generarRecorrido() {
  let nodo = cerrada[cerrada.length-1]
  let resultado = [nodo]
  while(nodo.padre) {
    nodo = cerrada.find(ele => ele.x === nodo.padre.x && ele.y === nodo.padre.y)
    resultado.push(nodo)
  }
  return resultado
}

function eliminarAbierta() {
  let posMin = posMinimo(abierta)
  let minimo = abierta[posMin]
  actual = minimo
  abierta.splice(posMin,1)
}

function actualizarNodo(nodo, nuevo) {
  nodo.total = nuevo.total
  nodo.padre = {x:actual.x,y:actual.y}
}

// $("#devAbierta").empty().append("Lista abierta: "+ imprimeLista(abierta))
// $("#devCerrada").empty().append("Lista cerrada: "+ imprimeLista(cerrada))

function pintarAbierta(nodo) {
  let casilla = $("#"+nodo.x+"\\,"+nodo.y)
  if(!casilla.hasClass("prohibido") && !casilla.hasClass("inicio") && !casilla.hasClass("fin") && !casilla.hasClass("recorrido")) casilla.addClass("abierta")
}

function pintarCerrada(nodo) {
  let casilla = $("#"+nodo.x+"\\,"+nodo.y)
  if(!casilla.hasClass("fin") && !casilla.hasClass("inicio")) casilla.addClass("recorrido").removeClass("abierta")
}

function pintarFinal(nodo) {
  let casilla = $("#"+nodo.x+"\\,"+nodo.y)
  if(!casilla.hasClass("fin") && !casilla.hasClass("inicio")) casilla.addClass("final").removeClass("abierta cerrada recorrido")
}

function core() {
  if(abierta.length === 0) return {fallo:true} // Si ABIERTA esta vacía, terminar con fallo

  // Eliminar el nodo de abierta que tenga un valor mínimo de f, e introducirlo en CERRADA
  eliminarAbierta()
  cerrada.push(actual)
  pintarCerrada(actual)
  
  if((actual.x === final.x && actual.y === final.y)) return {fallo: false, lista: generarRecorrido()} // Si el nodo actual es meta, devolver el camino solucion
 
  let sucesores = expandirSucesores(actual)  // Sino, expandir sus sucesores
  
  sucesores.forEach(ele => { // Por cada sucesor: crear un puntero a su padre
    let existe = abierta.findIndex(elemento => elemento.x === ele.x && elemento.y === ele.y)
    ele.total = calcularTotal(ele.x,ele.y) // Calcular f

    if(existe === -1) abierta.push(ele)
    else if (ele.total < abierta[existe].total) actualizarNodo(abierta[existe], ele) // Comprobar si estaba en abierta y actualizar nodo si g es menor  
    
    pintarAbierta(ele)
  })

  return {fallo:null,lista:null}
}

function gestionarError() {
  $("#devPrueba").append("Camino sin salida")
  $("#empezar").prop("disabled", true);
}

function gestionarPaso() {
  $("#devPaso").empty().append("Paso: ", (paso)++)
    let feedback = core()
    fallo = feedback.fallo
    sol = feedback.lista
}


$("#empezar").on("click", function(){
  if(fallo === true) gestionarError()
  else if (actual.x !== final.x || actual.y !== final.y) gestionarPaso()
  else if(pasoFinal < paso) pintarFinal(sol[pasoFinal++])
  else $("#empezar").prop("disabled", true);
})

$("#limpiar").on("click", function(){
  $(".cuadrado").removeClass(["prohibido","inicio","fin","recorrido","abierta","final"])
  abierta = []
  cerrada = []
  sol = []
  inicio = null
  final = null
  actual = null
  drageado= null
  seleccionado = null
  paso = 0
  pasoFinal = 0
  fallo = false
  $("#empezar").prop("disabled", false);
})
