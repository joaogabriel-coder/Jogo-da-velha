const botaoell = document.querySelectorAll("[data-cell]")
const board = document.querySelector("[data-board]")
const msgvit = document.querySelector("[data-texto-vit]")
const divvitr = document.querySelector("[data-msg-vit]")
const rein = document.querySelector("[data-botao-reset]")
let vezO;

const combvit = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const comecarjogo = () =>{
    for(const botao of botaoell){
        botao.classList.remove("o")
        botao.classList.remove("x")
        botao.classList.remove("click")
        botao.addEventListener('click', clicar, {once: true});
    }
    vezO = false;

    board.classList.add('x')
    divvitr.classList.remove("mostrar-msgvit")
}

const fim = (empate) =>{
    if(empate){
        msgvit.innerText = 'Empate!'
    }else{
        msgvit.innerText = vezO ? "O venceu!" : "X venceu!"
    }

    divvitr.classList.add("mostrar-msgvit")
}



const chacarvit = (vezjoga) => {
    return combvit.some((comb) => {
        return comb.every((index) => {
            return botaoell[index].classList.contains(vezjoga)
        })
    })
}

const checarimp = () =>{
    return [...botaoell].every(botao =>
        botao.classList.contains("x") || botao.classList.contains("o")
    )
}

const marca = (botao, classToAdd) =>{
    botao.classList.add(classToAdd);
}

const mudarTurno = () =>{
    vezO = !vezO;

    board.classList.remove('o')
    board.classList.remove('x')

    if(vezO){
        board.classList.add('o')
    }else{
        board.classList.add('x')
    }
}

const clicar = (e) => {
    //colocar a marca
    const botao = e.target;
    const classToAdd = vezO ? "o" : "x";

    marca(botao, classToAdd);

    //verificar por vitoria
    const évit = chacarvit(classToAdd) 
    
    //verificar por empate
    const empate = checarimp()
    if(évit){
        fim(false)
    }else if(empate){
        fim(true)
    }else{
        mudarTurno();
    } 
}

comecarjogo();

rein.addEventListener("click", comecarjogo);

