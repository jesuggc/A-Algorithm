
let drageado = null 
let inicio = {x:0, y:0} 
let final = {x:0, y:0}  

$("#inicio").on("dragstart", function(event) {
  drageado = "inicio"
});
$("#prohibido").on("dragstart", function(event) {
  drageado = "prohibido"
});
$("#fin").on("dragstart", function(event) {
  drageado = "fin"
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
  } else if (drageado === "prohibido") {
    $(this).addClass("prohibido")
  } else if(drageado === "fin") {
    $(this).addClass("fin")
    final.x= parseInt($(this).attr('id').split(',')[0])
    final.y= parseInt($(this).attr('id').split(',')[1])
  }
  drageado = null
})


let abierta = []
let cerrada = []
let actual = null
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
        if(!$("#"+ele.x+"\\,"+ele.y).hasClass("prohibido")) {
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

function core() {
    actual = inicio
    while((actual.x !== final.x || actual.y !== final.y)) {
        let cercanos = encontrarCercanos(alto,ancho,actual.x,actual.y)
        // console.log(cercanos)
        let validos = encontrarValidos(cercanos)
        // console.log(validos)
        validos.forEach(ele => {
            ele.total = calcularTotal(ele.x,ele.y)
            abierta.push(ele)
        })
        let posMinimo = posicionDelMinimo(abierta)
        cerrada.push(abierta[posMinimo])
        actual = abierta[posMinimo]
        abierta.splice(posMinimo,1)
    }

    cerrada.forEach(elem => {
      $("#"+elem.x+"\\,"+elem.y).addClass("recorrido")
    })
    
}
  
$("#empezar").on("click", function(){
    core()
})