
$("#inicio").on("dragstart", function(event) {
  drageado = "inicio"
});
$("#prohibido").on("dragstart", function(event) {
  drageado = "prohibido"
});
$("#fin").on("dragstart", function(event) {
  drageado = "fin"
});


$("#inicio").on("click", function(event) {
  if(seleccionado === "inicio") {
    seleccionado = null
    $(this).removeClass("cuadradoSeleccionado").addClass("cuadradoDrag")
  } else {
    seleccionado = "inicio"
    $(this).removeClass("cuadradoDrag").addClass("cuadradoSeleccionado")
    $("#prohibido").removeClass("cuadradoSeleccionado").addClass("cuadradoDrag")
    $("#fin").removeClass("cuadradoSeleccionado").addClass("cuadradoDrag")
  }
});
$("#prohibido").on("click", function(event) {
  if(seleccionado === "prohibido") {
    seleccionado = null
    $(this).removeClass("cuadradoSeleccionado").addClass("cuadradoDrag")
  } else {
    seleccionado = "prohibido"
    $(this).removeClass("cuadradoDrag").addClass("cuadradoSeleccionado")
    $("#inicio").removeClass("cuadradoSeleccionado").addClass("cuadradoDrag")
    $("#fin").removeClass("cuadradoSeleccionado").addClass("cuadradoDrag")
  }
});
$("#fin").on("click", function(event) {
  if(seleccionado === "fin") {
    seleccionado = null
    $(this).removeClass("cuadradoSeleccionado").addClass("cuadradoDrag")
  } else {
    seleccionado = "fin"
    $(this).removeClass("cuadradoDrag").addClass("cuadradoSeleccionado")
    $("#inicio").removeClass("cuadradoSeleccionado").addClass("cuadradoDrag")
    $("#prohibido").removeClass("cuadradoSeleccionado").addClass("cuadradoDrag")
  }
});

$(".cuadrado").on("dragover", function() {
  event.preventDefault();
})
$(".cuadrado").on("drop", function() {
  event.preventDefault();
  if(drageado === "inicio") {
    $(this).addClass("inicio")
    inicio.x= parseInt($(this).attr('id').split(',')[0])
    inicio.y= parseInt($(this).attr('id').split(',')[1])
    actual = inicio
  } else if (drageado === "prohibido") {
    $(this).addClass("prohibido")
  } else if(drageado === "fin") {
    $(this).addClass("fin")
    final.x= parseInt($(this).attr('id').split(',')[0])
    final.y= parseInt($(this).attr('id').split(',')[1])
  }
  drageado = null
})

$(".cuadrado").on("click", function() {
  if(seleccionado === "inicio") {
    $(this).addClass("inicio")
    inicio.x= parseInt($(this).attr('id').split(',')[0])
    inicio.y= parseInt($(this).attr('id').split(',')[1])
    actual = inicio
  } else if (seleccionado === "prohibido") {
    $(this).addClass("prohibido")
  } else if(seleccionado === "fin") {
    $(this).addClass("fin")
    final.x= parseInt($(this).attr('id').split(',')[0])
    final.y= parseInt($(this).attr('id').split(',')[1])
  }
})

let drageado = null 
let seleccionado = null 
let inicio = {x:0, y:0} 
let final = {x:0, y:0}  
let actual = null
let abierta = []
let cerrada = []
let alto = parseInt($("#mainRow").attr("data-id").split(",")[0])
let ancho = parseInt($("#mainRow").attr("data-id").split(",")[1])

function encontrarCercanos(alto,ancho,x,y) {
  let lista = []
  for(let i = x-1; i <= x+1; i++) {
      for(let j = y-1; j <= y+1; j++) {
          if(i >= 0 && i < alto && j >= 0 && j < ancho && ((i != x || j != y))) lista.push({x:i,y:j}) 
      }
  }
  return lista
}

function encontrarValidos(lista) {
  let nuevaLista=[]
  lista.forEach(ele => {
    let casilla = $("#"+ele.x+"\\,"+ele.y)
    if(!casilla.hasClass("prohibido") && !casilla.hasClass("recorrido")) nuevaLista.push(ele)
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

function posicionDelMinimo(lista) {
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

function mostrarInfo(opciones,minimo) {
  $("#informacion").empty();
  opciones.forEach(ele => {
    let expression = "\\sqrt{x}";
    $("#informacion").append("<p>La raíz cuadrada de " + expression + " es: \( " + expression + " \)</p>");
  });
  
  // Renderizar expresiones LaTeX después de agregarlas al DOM
  MathJax.typeset(["#informacion"]);
}


function imprimeLista(lista){
  let finalString = ""
  lista.forEach(ele => {
    finalString += "(" + ele.x + "," + ele.y + ")"
  })
  return finalString
}

function elementoEnLista(elemento,lista) {
  lista.forEach(ele => {
    if(ele.x === elemento.x && ele.y === elemento.y) return true
  })
  return false
}

function core() {
  let cercanos = encontrarCercanos(alto,ancho,actual.x,actual.y)
  let validos = encontrarValidos(cercanos)
  validos.forEach(ele => {
    if(!elementoEnLista(ele,abierta) && !elementoEnLista(ele,cerrada)) {
      ele.total = calcularTotal(ele.x,ele.y)
      abierta.push(ele)
      let casilla = $("#"+ele.x+"\\,"+ele.y)
      if( !casilla.hasClass("prohibido") && !casilla.hasClass("inicio") && !casilla.hasClass("fin") && !casilla.hasClass("recorrido"))
        casilla.addClass("abierta")
    }
  })
  let posMinimo = posicionDelMinimo(abierta)
  let minimo = abierta[posMinimo]
  cerrada.push(minimo)
  let casilla = $("#"+minimo.x+"\\,"+minimo.y)
  if(!casilla.hasClass("fin")) casilla.addClass("recorrido").removeClass("abierta")
  actual = minimo
  
  $("#devAbierta").empty()
  $("#devAbierta").append("Lista abierta: "+ imprimeLista(abierta))
  $("#devCerrada").empty()
  $("#devCerrada").append("Lista cerrada: "+ imprimeLista(cerrada))

  mostrarInfo(validos,minimo)
  // console.log(validos,minimo)
  abierta.splice(posMinimo,1)


}
let paso = 1
$("#empezar").on("click", function(){
  if((actual.x !== final.x || actual.y !== final.y)) {
    $("#devPaso").empty()
    $("#devPaso").append("Paso: ", paso++)
    core()
  }
  else {
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
  
})
