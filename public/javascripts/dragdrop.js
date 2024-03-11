$("#inicio").on("dragstart", () => drageado = "inicio")
$("#divinicio").on("click", () => gestionarClick("inicio"));
$("#prohibido").on("dragstart", () => drageado = "prohibido")
$("#divprohibido").on("click", () => gestionarClick("prohibido"));
$("#fin").on("dragstart", () => drageado = "fin")
$("#divfin").on("click", () => gestionarClick("fin"));
$("#borrar").on("dragstart", () => drageado = "borrar")
$("#divborrar").on("click", () => gestionarClick("borrar"));
$("#penalizar").on("dragstart", () => drageado = "penalizar")
$("#divpenalizar").on("click", () => gestionarClick("penalizar"));

$(".cuadrado").on("dragover", (event) => event.preventDefault())


$(".cuadrado").on("drop", function() {
  if (drageado === "inicio" || drageado === "fin") agregarInicioOFin($(this), drageado);
  else if (drageado === "prohibido") $(this).addClass("prohibido").removeClass("inicio penalizar fin");
  else if (drageado === "penalizar") $(this).addClass("penalizar").removeClass("inicio prohibido fin")
  else if (drageado === "borrar") $(this).removeClass("inicio prohibido fin penalizar")
  drageado = null;
});

$(".cuadrado").on("click", function() {
  if (seleccionado === "inicio" || seleccionado === "fin") agregarInicioOFin($(this), seleccionado);
  else if (seleccionado === "prohibido") $(this).addClass("prohibido").removeClass("inicio penalizar fin");
  else if (seleccionado === "penalizar") $(this).addClass("penalizar").removeClass("inicio prohibido fin");
  else if (seleccionado === "borrar") borrarLogico($(this));
});

function borrarLogico(casilla){
  casilla.removeClass("inicio prohibido fin penalizar")
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
    $("#divinicio, #divprohibido, #divfin, #divborrar, #divpenalizar").not("#div"+`${tipo}`).removeClass("seleccionado").css("transition","transform 0.5s ease-in-out");
  }
}

function agregarInicioOFin(casilla, posicion) {
  casilla.removeClass("inicio fin prohibido penalizar").addClass(posicion);
}

$(document).keydown(function(e) {
  // Verificar si la tecla presionada es la "E"
  if (e.key === '1') {
     $("#divinicio").click()
  } else if(e.key === '2') {
    $("#divprohibido").click()
  } else if(e.key === '3'){
    $("#divfin").click()
  } else if(e.key === '4'){
    $("#divpenalizar").click()
  } else if(e.key === '5'){
    $("#divborrar").click()
  } else if(e.key === ' '){
    $("#2\\,2").addClass("inicio")
    $("#7\\,8").addClass("fin")
    inicio = {x:2,y:2}
    final = {x:7,y:8}
    $("#empezar").click()
  } else if (e.key === 'r' && e.ctrlKey) {
    e.preventDefault()
    window.location.reload(true);
  } 

});
let drageado = null 
let seleccionado = null 
let inicio = {x:0, y:0} 
let final = {x:0, y:0}  
let actual = null
let fallo = false
let encontrado = false
let terminar=false
let paso =  0
let pasoFinal = 0
let abierta = []
let cerrada = []
let sol = []
let alto = parseInt($("#mainRow").attr("data-id").split(",")[0])
let ancho = parseInt($("#mainRow").attr("data-id").split(",")[1])
const toastLiveExample = $("#liveToast")
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)


// BOTONES
//boton: siguiente
$("#empezar").on("click", function() {
  comprobarErrores(true)
})
//boton: omitir
$("#divomitir #omitir").on("click", function() {
  comprobarErrores(false)
})
//boton: limpiar
$("#limpiar").on("click", function(){
  $(".cuadrado").removeClass(["prohibido","inicio","fin","recorrido","abierta","final", "penalizar", "parpadear"])
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
  encontrado=false
  terminar=false
  $("#divinicio, #divfin, #divprohibido, #divborrar, #divpenalizar").removeClass("seleccionado").css("transition","transform 0.5s ease-in-out")
  $("#empezar").prop("disabled", false);
  $("#divomitir").css("pointer-events","auto")
  $("#divomitir").css("opacity",1)
  $("#divomitir").css("cursor","pointer")
  $("#tiempo").val("200");
  $("#divInfo").empty()
  $("#divInfo").removeClass("p-2")
})
//boton: ayuda
$("#ayuda").on("click", function() {
  $(".tarjeta").toggleClass("tarjetahover")
  $(".cara-trasera").toggleClass("d-none")
  $(".cara-frontal").toggleClass("d-none")
})
$(document).ready(function() {
  var alturaCaraFrontal = $('.tarjeta').height();
  $('.cara-trasera').height(alturaCaraFrontal);
});

//FEEDBACK
function comprobarErrores(paso) {
  if(!$(".cuadrado").hasClass("inicio")) createToast("No has creado el inicio")
  else if ($('.inicio').length > 2) createToast("Solo debe haber una casilla de inicio")
  else if(!$(".cuadrado").hasClass("fin")) createToast("No has creado el final")
  else if ($('.fin').length > 2) createToast("Solo debe haber una casilla de fin")
  else ejecutarPaso(paso)
}
function createToast(mensaje) {
  $("#toastMessage").empty().append(mensaje)
  toastBootstrap.show()
}
function createModal(mensaje) {
  $('.modal-title').empty()
  $('.modal-title').append(mensaje); // Cambia el título del modal
  $('#exampleModal').modal('show'); // Muestra el modal
}
//boton de limpiar en modal
$("#reinicia").on("click", function(){
  $("#limpiar").click();
  $('#exampleModal').modal('hide');
})

//EJECUCION
//Si click en botones de ejecucion y al comprobar errores no hay ninguno, inicializa ini y fin y ejecuta segun si es por pasos o no
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
  else if(pasoFinal <= paso && !fallo &&!terminar) {
    ejecutar()
    setTimeout(() => ejecutarPaso(false), $("#tiempo").val());
  }
  else if(fallo) gestionarError()

}
//Funciona como condicion del bucle para ver si para o continua
function ejecutar() {
  
  console.log(sol.length,pasoFinal,paso,terminar)
  if(fallo === true) gestionarError()
  else if (actual.x !== final.x || actual.y !== final.y) gestionarPaso()
  else if (pasoFinal < sol.length - 1) {
    
    pintarFinal(sol[pasoFinal++]);
    if (pasoFinal === sol.length -1 ) {
      terminar = true;
      $("#empezar").prop("disabled", true); 
      $("#divomitir").css("pointer-events","none")
      $("#divomitir").css("opacity",0.5)
      $("#divomitir").css("cursor","default")
      createModal("Camino encontrado")
    }
  }
  else console.log("soy yui?")
  
}
//Si en ejecutar se encuentra algun error
function gestionarError() {
  
  createModal("Camino sin salida")
  $("#empezar").prop("disabled", true);
  $("#divomitir").css("pointer-events","none")
  $("#divomitir").css("opacity",0.5)
  $("#divomitir").css("cursor","default")
}
//Si en ejecutar puede continuar llama a core
function gestionarPaso() {
    paso++
    let feedback = core()
    fallo = feedback.fallo
    sol = feedback.lista
}
//Contiene el funcionamiento base del algoritmo
function core() {
  if(abierta.length === 0) return {fallo:true} // Si ABIERTA esta vacía, terminar con fallo

  // Eliminar el nodo de abierta que tenga un valor mínimo de f, e introducirlo en CERRADA
  eliminarAbierta()
  cerrada.push(actual)
  if($("#checkCerrada").prop('checked')) pintarCerrada(actual)
  
  if((actual.x === final.x && actual.y === final.y)) return {fallo: false, lista: generarRecorrido()} // Si el nodo actual es meta, devolver el camino solucion
 
  let sucesores = expandirSucesores(actual)  // Sino, expandir sus sucesores
  if(sucesores.length===0) return {fallo:true}
  sucesores.forEach(ele => { // Por cada sucesor: crear un puntero a su padre
    let existe = abierta.findIndex(elemento => elemento.x === ele.x && elemento.y === ele.y)
    ele.total = calcularTotal(ele.x,ele.y,actual.x,actual.y) + (penalizar(ele)? 0.1*(Math.sqrt(alto **2 + ancho **2)):0) // Calcular f
    if(existe === -1) abierta.push(ele)
    else if (ele.total < abierta[existe].total) actualizarNodo(abierta[existe], ele) // Comprobar si estaba en abierta y actualizar nodo si g es menor  
    
    if($("#checkAbierta").prop('checked')) pintarAbierta(ele)
  })
  mostrarSucesores(sucesores)
  mostrarElegido()
  return {fallo:false,lista:[]}
}
//Encuentra el minimo f de abierta, lo guarda en actual y lo saca
function eliminarAbierta() {
  let posMin = posMinimo(abierta)
  let minimo = abierta[posMin]
  actual = minimo
  abierta.splice(posMin,1)
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

//Tras meter el minimo de abierta en cerrada, representa en la cuadricula este nodo
function pintarCerrada(nodo) {
  let casilla = $("#"+nodo.x+"\\,"+nodo.y)
  if(!casilla.hasClass("fin") && !casilla.hasClass("inicio")) casilla.addClass("recorrido").removeClass("abierta penalizar")
}
//Si el ultimo nodo añadido en cerrada era el final, se recorren los nodos padres de vuelta inicio guardandolos en resultado
function generarRecorrido() {
  let nodo = cerrada[cerrada.length-1]
  let resultado = [nodo]
  while(nodo.padre) {
    nodo = cerrada.find(ele => ele.x === nodo.padre.x && ele.y === nodo.padre.y)
    resultado.push(nodo)
  }
  $("#divInfo").empty().append("<h3>El camino solución es: <h4 id='nodosRes'></h4></h3>")
  encontrado=true;
  return resultado
}
//En ejecutar, cuando ya se ha encontrado final, se representa en la cuadricula el resultado
function pintarFinal(nodo) {
  let casilla = $("#"+nodo.x+"\\,"+nodo.y)
  if(!casilla.hasClass("fin") && !casilla.hasClass("inicio")) casilla.addClass("final").removeClass("abierta cerrada recorrido penalizar")
  $("#nodosRes").prepend(`(${nodo.x}, ${nodo.y}) `)
}
//Si no es el final aun, se expanden los sucesores, guardando quien es su padre
function expandirSucesores(actual) {
  let lista = encontrarCercanos(actual.x, actual.y)
  let nuevaLista=[]
  lista.forEach(ele => {
    let casilla = $("#"+ele.x+"\\,"+ele.y)
    if(!casilla.hasClass("prohibido") && !casilla.hasClass("recorrido") &&  !casilla.hasClass("inicio")) {
      ele.padre = {x: actual.x, y: actual.y}
      nuevaLista.push(ele)
    }
  })
  return nuevaLista;
}
function encontrarCercanos(x,y) {
  let lista = []
  for(let i = x-1; i <= x+1; i++) {
      for(let j = y-1; j <= y+1; j++) {
          if(i >= 0 && i < alto && j >= 0 && j < ancho && ((i != x || j != y))) lista.push({x:i,y:j}) 
      }
  }
  return lista
}

//De cada sucesor guardamos la distancia total f
function calcularTotal(x,y,actualx,actualy) {
  return calcularReal(x,y,actualx,actualy) + calcularImaginaria(x,y)
}
function calcularReal(x,y,actualx,actualy) {
  return calcularDistancias(actualx,actualy,x,y)
}
function calcularImaginaria(x,y) {
  return calcularDistancias(x,y,final.x,final.y)
}
function calcularDistancias(x1,y1,x2,y2) {
  return (Math.sqrt((x2-x1)**2 + (y2-y1)**2))
}
function penalizar(nodo){
  let casilla = $("#"+nodo.x+"\\,"+nodo.y)
  if(casilla.hasClass("penalizar")) return true;
  return false;
}
//Si un sucesor ya estaba en abierta pero ahora la distancia para llegar a el desde un padre distinto es menor que con la que se guardo en abierta, lo actualizamos
function actualizarNodo(nodo, nuevo) {
  nodo.total = nuevo.total
  nodo.padre = {x:actual.x,y:actual.y}
}
//A medida que se itera sobre los sucesores, se añaden a abierta y se representa en la cuadricula
function pintarAbierta(nodo) {
  let casilla = $("#"+nodo.x+"\\,"+nodo.y)
  if(!casilla.hasClass("prohibido") && !casilla.hasClass("inicio") && !casilla.hasClass("fin") && !casilla.hasClass("recorrido")) casilla.addClass("abierta")
}
//Actualizamos el panel de informacion del paso actual
function mostrarSucesores(sucesores) {
  $("#divInfo").empty()
  
  $("#divInfo").append(`<p class="mb-0"><strong>Sucesores</strong></p>`)

  sucesores.forEach(ele => {
    crearParrafo(ele,actual)
  })
  
  if(sucesores.length === 0) $("#divInfo").append(`<p class="mb-0">No hay sucesores</p>`)
  
  $("#divInfo").addClass("p-2") 
}
function mostrarElegido() {

  $("#divInfo").append(`<p class="mb-0"><strong>Nodo elegido</strong></p>`)
  
  let posMin = posMinimo(abierta)
  let minimo = abierta[posMin]
  crearParrafo(minimo,minimo.padre)
}
function crearParrafo(ele, actual) {
  var nuevoParrafo 
  if(penalizar(ele)){
    var penalizacion=0.1* Math.sqrt(alto **2 + ancho **2).toFixed(3)
    nuevoParrafo = $('<p>', {
      text: `\\(      f(${ele.x},${ele.y})=g(${ele.x},${ele.y}) + h(${ele.x},${ele.y}) + p = \\sqrt{${(actual.x - ele.x)**2}+${(actual.y - ele.y)**2}} + \\sqrt{${(final.x - ele.x)**2}+${(final.y - ele.y)**2}} + 0.1 * \\sqrt{${alto**2}+${ancho**2}} = \\sqrt{${(actual.x - ele.x)**2 + (actual.y - ele.y)**2}} + \\sqrt{${(final.x - ele.x)**2 + (final.y - ele.y)**2}} + ${penalizacion}= ${(calcularTotal(ele.x,ele.y,actual.x,actual.y)+ penalizacion).toFixed(3)}  \\) `,
      style: 'font-size:0.8em',
      class: "rounded-1 ms-2"
    });
  }
  else{
    nuevoParrafo = $('<p>', {
      text: `\\(      f(${ele.x},${ele.y})=g(${ele.x},${ele.y}) + h(${ele.x},${ele.y}) = \\sqrt{${(actual.x - ele.x)**2}+${(actual.y - ele.y)**2}} + \\sqrt{${(final.x - ele.x)**2}+${(final.y - ele.y)**2}} = \\sqrt{${(actual.x - ele.x)**2 + (actual.y - ele.y)**2}} + \\sqrt{${(final.x - ele.x)**2 + (final.y - ele.y)**2}} = ${(calcularTotal(ele.x,ele.y,actual.x,actual.y)+ (penalizar(ele)? 0.1*calcularImaginaria(ele.x,ele.y):0)).toFixed(3)}  \\) `,
      style: 'font-size:0.8em',
      class: "rounded-1 ms-2"
    });
  }

  $('#divInfo').append(nuevoParrafo);

  nuevoParrafo.on("mouseenter", function() {
    var colorDeFondo = $(`#${ele.x}\\,${ele.y}`).css('background-color');
    $(':root').css('--colorEnUso', colorDeFondo);
    $(`#${ele.x}\\,${ele.y}`).addClass("parpadear")
    $(this).addClass("seasalt")
  })
  nuevoParrafo.on("mouseleave ", function() {
    $(`#${ele.x}\\,${ele.y}`).removeClass("parpadear")
    $(this).removeClass("seasalt")
  })
  
  MathJax.typeset(["#divInfo"]);
}




