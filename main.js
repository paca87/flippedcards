/*
camel case listaFotos
snake case lista_fotos
Camel cas is the most use
*/
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
/**
 * paso 1: Crear arreglo dinamico de Pictures
 * paso 2: Insertar en el DOM images div->img https://www.w3schools.com/jsref/met_document_createelement.asp
 * paso 3: Caputar el evento
 */
const listPictures = [
    {
        name: 'pic1',
        flipped: false,
        hidden: false,
    },
    {
        name: 'pic2',
        flipped: false,
    },
    {
        name: 'pic3',
        flipped: false,
    },
    {
        name: 'pic1',
        flipped: false,
    },
    {
        name: 'pic2',
        flipped: false,
    },
    {
        name: 'pic3',
        flipped: false,
    },

]
const dirF1 = '/javi/img/pic1.jpg';
const dirF2 = '/javi/img/pic2.jpg';
const dirF3 = '/javi/img/pic3.jpg';
const dirBack = '/javi/img/back.jpg';
let fronts = [1, 2, 3, 4, 5, 6];
const tablero = document.querySelector(`.tablero`);
const listaFotos = document.querySelectorAll(`.foto`);
colocarFotos();
//pongo las cartas boca abajo
listaFotos.forEach(function (foto) {
    foto.innerHTML = `<img src="${dirBack}"alt="">`;
});
let javier = 5;
/*
coloca las fotos random en la mesa.
*/
function colocarFotos() {
    let javier = 6;
    let veces_pic1 = 0;
    let veces_pic2 = 0;
    let veces_pic3 = 0;
    let cual_li = 0;
    console.log(javier);
    while (cual_li < 6) {
        //console.log(veces_pic1+' '+veces_pic2+' '+veces_pic3+'aaaa');        
        let ranPoss = fotoValida(veces_pic1, veces_pic2, veces_pic3);
        //let ranFoto= Math.floor(Math.random() * 3)+1;
        if (ranPoss == 1 && veces_pic1 < 2) {
            veces_pic1++;
            fronts[cual_li] = (`<img src="${dirF1}" id="${cual_li}">`);
        }
        else if (ranPoss == 2 && veces_pic2 < 2) {
            veces_pic2++;
            fronts[cual_li] = (`<img src="${dirF2}"id="${cual_li}">`);
        }
        else if (ranPoss == 3 && veces_pic3 < 2) {
            veces_pic3++;
            fronts[cual_li] = (`<img src="${dirF3}"id="${cual_li}">`);
        }
        cual_li++;
    }
    console.log(fronts);
}
/*Le paso la cantidad de fotos 1, 2 y3 tengo para 
q me genere un numero random q me sirva para completar
*/
function fotoValida(pic1, pic2, pic3) {
    let ranfoto = Math.floor(Math.random() * 3) + 1;
    //console.log(pic1+' '+pic2+' '+pic3+' foto'+ranfoto);
    if (ranfoto == 1 && pic1 < 2)
        return ranfoto;
    else if (ranfoto == 2 && pic2 < 2)
        return ranfoto;
    else if (ranfoto == 3 && pic3 < 2)
        return ranfoto;
    else
        return fotoValida(pic1, pic2, pic3);
}
//const front1=;

let click = tablero.addEventListener('click', (evento) => {
    
    let que_id = evento.target;

    console.log(que_id);
    /*console.log(fronts); 
    if (que_id == 'foto1')
        que_id = 0
    else if (que_id == 'foto2')
        que_id = 1
    else if (que_id == 'foto3')
        que_id = 2
    else if (que_id == 'foto4')
        que_id = 3
    else if (que_id == 'foto5')
        que_id = 4
    else if (que_id == 'foto6')
        que_id = 5
    evento.path[1].innerHTML = fronts[que_id];*/

})
//console.log(Math.floor(Math.random() * 11); );
/*foto1[0].innerHTML=`<img src="${dirBack}" alt="">`;
foto4.innerHTML='<img src="/javi/img/pic3.jpg" alt="">';
foto6.innerHTML=`<img src="${dirBack}" alt="">`;*/



//console.log(tablero.firstElementChild)