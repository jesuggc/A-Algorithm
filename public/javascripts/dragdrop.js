
$("#inicio").on("dragstart", function(event) {
  drageado = "inicio"
});
$("#prohibido").on("dragstart", function(event) {
  drageado = "prohibido"
});
$("#fin").on("dragstart", function(event) {
  drageado = "fin"
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

$("#inicio").on("click", function(event) {
  gestionarClick("inicio");
});

$("#prohibido").on("click", function(event) {
  gestionarClick("prohibido");
});

$("#fin").on("click", function(event) {
  gestionarClick("fin");
});


$(".cuadrado").on("dragover", function() {
  event.preventDefault();
})

function agregarInicioOFin(casilla, posicion) {
  casilla.addClass(posicion).removeClass("prohibido");
  if (posicion === "inicio") {
    inicio = { x: parseInt(casilla.attr('id').split(',')[0]), y: parseInt(casilla.attr('id').split(',')[1]) };
    actual = inicio;
    abierta.push(inicio);
  } else if (posicion === "fin") {
    final = { x: parseInt(casilla.attr('id').split(',')[0]), y: parseInt(casilla.attr('id').split(',')[1]) };
  }
}

$(".cuadrado").on("drop", function(event) {
  event.preventDefault();
  if (drageado === "inicio" || drageado === "fin") agregarInicioOFin($(this), drageado);
  else if (drageado === "prohibido") $(this).addClass("prohibido");
  drageado = null;
});

$(".cuadrado").on("click", function() {
  if (seleccionado === "inicio" || seleccionado === "fin") agregarInicioOFin($(this), seleccionado);
  else if (seleccionado === "prohibido") $(this).addClass("prohibido");
});

let drageado = null 
let seleccionado = null 
let inicio = {x:0, y:0} 
let final = {x:0, y:0}  
let actual = null
let fallo = false
let abierta = []
let cerrada = []
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

function encontrarValidos(actual, lista) {
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


function imprimeLista(lista){
  let finalString = ""
  lista.forEach(ele => {
    finalString += "(" + ele.x + "," + ele.y + ")"
  })
  return finalString
}

function generarRecorrido() {
  // Generar recorrido
}

function core() {
  if(abierta.length === 0) fallo = true
  else {
    let posMin = posMinimo(abierta)
    let minimo = abierta[posMin]
    cerrada.push(minimo)
    let casilla = $("#"+minimo.x+"\\,"+minimo.y)
    if(!casilla.hasClass("fin")) casilla.addClass("recorrido").removeClass("abierta")
    actual = minimo
    abierta.splice(posMin,1)
    $("#devAbierta").empty().append("Lista abierta: "+ imprimeLista(abierta))
    $("#devCerrada").empty().append("Lista cerrada: "+ imprimeLista(cerrada))

    if((actual.x === final.x && actual.y === final.y)) generarRecorrido()
    else {
      let cercanos = encontrarCercanos(actual.x,actual.y)
      let validos = encontrarValidos(actual,cercanos)
      validos.forEach(ele => {
        let existe = abierta.findIndex(elemento => elemento.x === ele.x && elemento.y === ele.y)
        ele.total = calcularTotal(ele.x,ele.y)
        if(existe === -1) {
          abierta.push(ele)
          let casilla = $("#"+ele.x+"\\,"+ele.y)
          if( !casilla.hasClass("prohibido") && !casilla.hasClass("inicio") && !casilla.hasClass("fin") && !casilla.hasClass("recorrido")) casilla.addClass("abierta")
        } else if (ele.total < abierta[existe].total) {
          abierta[existe].total = ele.total
          abierta[existe].padre = {x:actual.x,y:actual.y}
        }
      })
    }
  }
}
let paso = 1
$("#empezar").on("click", function(){
  if(fallo === true) {
    console.log("fallo")
  } else if (actual.x !== final.x || actual.y !== final.y) {
    $("#devPaso").empty().append("Paso: ", paso++)
    core()
  } else {
    //bloquear boton
    //dar feedback
  }
})

$("#limpiar").on("click", function(){
  $(".cuadrado").removeClass(["prohibido","inicio","fin","recorrido","abierta"])
  abierta = []
  cerrada = []
  inicio = null
  final = null
  actual = null
  drageado= null
  seleccionado = null
  paso = 1
  fallo = false
})
