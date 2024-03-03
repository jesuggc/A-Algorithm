$("#inicio").on("dragstart", () => drageado = "inicio")
$("#divinicio").on("click", () => gestionarClick("inicio"));
$("#prohibido").on("dragstart", () => drageado = "prohibido")
$("#divprohibido").on("click", () => gestionarClick("prohibido"));
$("#fin").on("dragstart", () => drageado = "fin")
$("#divfin").on("click", () => gestionarClick("fin"));
$("#borrar").on("dragstart", () => drageado = "borrar")
$("#divborrar").on("click", () => gestionarClick("borrar"));

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
  else if (seleccionado === "borrar") borrarLogico($(this));
});

function borrarLogico(casilla){
  casilla.removeClass("inicio prohibido fin")
  let pos = abierta.findIndex(elemento => elemento.x ===  parseInt(casilla.attr('id').split(',')[0]) && elemento.y ===  parseInt(casilla.attr('id').split(',')[1]))
  if(pos !== -1) abierta.splice(pos,1);
}
function gestionarClick(tipo) {
  if (seleccionado === tipo) {
    seleccionado = null;
    $("#div"+`${tipo}`).removeClass("seleccionado").css("transition","transform 0.5s ease-in-out");
  } else {
    seleccionado = tipo;
    $("#div"+`${tipo}`).addClass("seleccionado");
    $("#divinicio, #divprohibido, #divfin, #divborrar").not("#div"+`${tipo}`).removeClass("seleccionado").css("transition","transform 0.5s ease-in-out");
  }
}

function agregarInicioOFin(casilla, posicion) {
  casilla.removeClass("inicio fin prohibido").addClass(posicion);
  // if (posicion === "inicio") {
  //   inicio = { x: parseInt(casilla.attr('id').split(',')[0]), y: parseInt(casilla.attr('id').split(',')[1]) };
  //   actual = inicio;
  //   abierta.push(inicio);
  // } else if (posicion === "fin") {
  //   final = { x: parseInt(casilla.attr('id').split(',')[0]), y: parseInt(casilla.attr('id').split(',')[1]) };
  // }
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
const toastLiveExample = $("#liveToast")
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

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

function createToast(mensaje) {
  $("#toastMessage").empty().append(mensaje)
  toastBootstrap.show()
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
  if($("#checkCerrada").prop('checked'))pintarCerrada(actual)
  
  if((actual.x === final.x && actual.y === final.y)) return {fallo: false, lista: generarRecorrido()} // Si el nodo actual es meta, devolver el camino solucion
 
  let sucesores = expandirSucesores(actual)  // Sino, expandir sus sucesores
  
  sucesores.forEach(ele => { // Por cada sucesor: crear un puntero a su padre
    let existe = abierta.findIndex(elemento => elemento.x === ele.x && elemento.y === ele.y)
    ele.total = calcularTotal(ele.x,ele.y) // Calcular f

    if(existe === -1) abierta.push(ele)
    else if (ele.total < abierta[existe].total) actualizarNodo(abierta[existe], ele) // Comprobar si estaba en abierta y actualizar nodo si g es menor  
    
    if($("#checkAbierta").prop('checked')) pintarAbierta(ele)
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

function ejecutar() {
  if(fallo === true) gestionarError()
  else if (actual.x !== final.x || actual.y !== final.y) gestionarPaso()
  else if(pasoFinal < paso) pintarFinal(sol[pasoFinal++])
  else $("#empezar").prop("disabled", true); 
}
function ejecutarPaso(porPasos) {
  let ini = $($(".inicio")[1])
  let fin = $($(".fin")[1])

  inicio = { x: parseInt(ini.attr('id').split(',')[0]), y: parseInt(ini.attr('id').split(',')[1]) };
  final = { x: parseInt(fin.attr('id').split(',')[0]), y: parseInt(fin.attr('id').split(',')[1]) };
  if(paso === 0) {
    actual = inicio
    abierta.push(inicio);
  } 

  if(porPasos === true) ejecutar() 
  else if(pasoFinal <= paso) {
    ejecutar()
    setTimeout(() => ejecutarPaso(false), $("#tiempo").val());
  }
}

function comprobarErrores(paso) {
  if(!$(".cuadrado").hasClass("inicio")) createToast("No has creado el inicio")
  else if ($('.inicio').length > 2) createToast("Solo debe haber una casilla de inicio")
  else if(!$(".cuadrado").hasClass("fin")) createToast("No has creado el final")
  else if ($('.fin').length > 2) createToast("Solo debe haber una casilla de fin")
  else ejecutarPaso(paso)
}

$("#empezar").on("click", function() {
  comprobarErrores(true)
})
$("#omitir").on("click", function() {
  comprobarErrores(false)
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
  $("#divinicio, #divfin, #divprohibido, #divborrar").removeClass("seleccionado").css("transition","transform 0.5s ease-in-out")
  $("#empezar").prop("disabled", false);
})

