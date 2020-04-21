/*
camel case listaFotos
snake case lista_fotos
Camel cas is the most use
------
/*
 * paso 1: Crear arreglo dinamico de Pictures
 * paso 2: Insertar en el DOM images div->img https://www.w3schools.com/jsref/met_document_createelement.asp
 * paso 3: Caputar el evento y hacer q las fotos esten visibles o no utilizando css(propiedad visibility: hidden)
 */

//*************************************Principal
let score = false;
let listPictures = [];
let isSecondCard = false;
let timerEventCardHolder = null;
let timerPoints = null;
let timerEndGame = null;
const timerElement = document.querySelector("#timer");
let timerCount = 0;
let scoreElement = document.querySelector("#score");
let scoreCount = 0;
let hidedCards = 0;
crearListaFotos();
const tablero = document.querySelector(`.table`);
document.querySelector("#btn").addEventListener("click", newGameHandler);
setTable();

function resetGame() {
  clearInterval(timerEventCardHolder);
  clearInterval(timerPoints);
  clearInterval(timerEndGame);
  score = false;
  isSecondCard = false;
  timerEventCardHolder = null;
  timerCount = 0;
  scoreCount = 0;
  hidedCards = 0;
}
//*************************************Auxiliar
function crearListaFotos(totalFotos = 6) {
  listPictures = [];
  let cont = 0;
  for (let index = 0; index < totalFotos; index++) {
    const name = `pic${cont}`;
    const foto = {
      id: `id${index}`,
      name: name,
      flipped: false,
      hidden: false,
      locationFront: `https://i.picsum.photos/id/${cont}/100/100.jpg`,
      locationBack: `/javi/img/back.jpg`,
    };
    index % 2 ? cont++ : cont;
    listPictures.push(foto);
  }
  listPictures = shuffle(listPictures);
}
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
/*
coloca las fotos random en la mesa.
*/
function setTable() {
  tablero.innerHTML = "";
  listPictures.forEach(function (pic) {
    let img = document.createElement("img");
    img.id = pic.id;
    img.className = pic.name;
    if (pic.hidden) {
      img.style.visibility = "hidden";
    }
    img.src = pic.flipped ? pic.locationFront : pic.locationBack;
    let divFlexBox = document.createElement("div");
    divFlexBox.className = "container-foto";
    divFlexBox.appendChild(img);
    tablero.appendChild(divFlexBox);
  });
}
/*
EndGame
*/
function endGame() {
  resetGame();
  tablero.classList.add("end-game");
  timerEndGame = setInterval(function () {
    tablero.innerHTML = tablero.innerHTML ? "" : "CONGRATULATIONS!!";
  }, 1000);
}
/*
timer
*/
function showTime() {
  timerElement.innerHTML = ++timerCount;
}
/*
score is this ok to 
*/
function scorePoint() {
  scoreElement.innerHTML = ++scoreCount;
}
/**
 * Buscar Pareja
 */
function searchPartner(pic1) {
  for (let i = 0; i < listPictures.length; i++) {
    let pic2 = listPictures[i];
    if (pic2.flipped) {
      if (pic1.id != pic2.id) {
        if (pic1.name == pic2.name) {
          pic1.hidden = true;
          pic2.hidden = true;
          if (++hidedCards == listPictures.length / 2) {
            endGame();
          }
        }
        pic1.flipped = false;
        pic2.flipped = false;
        break;
      }
    }
  }
}
/**
 * Evento click
 */
function flipCard(id) {
  let pic = null;
  for (let i = 0; i < listPictures.length; i++) {
    pic = listPictures[i];
    if (pic.id == id && !pic.flipped) {
      pic.flipped = true;
      scorePoint();
      break;
    }
  }
  return pic;
}

let click = tablero.addEventListener("click", (evento) => {
  let target = evento.target;
  if (target.tagName == `IMG`) {
    if (timerCount == 0) {
      timerCount++;
      timerEventCardHolder = setInterval(showTime, 1000);
    }
    let pic = flipCard(target.id);
    setTable();
    if (isSecondCard) {
      isSecondCard = false;
      tablero.style.pointerEvents = "none";
      timerPoints = setTimeout(() => {
        searchPartner(pic);
        setTable();
        tablero.style.pointerEvents = "auto";
      }, 2000);
    } else {
      isSecondCard = true;
    }
  }
});
function newGameHandler() {
  let cantFotos = document.querySelector("#cantFotos").value;
  crearListaFotos(cantFotos);
  tablero.classList.remove("end-game");
  setTable();
  resetGame();
  timerElement.innerHTML = 0;
  scoreElement.innerHTML = 0;
}
