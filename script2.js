const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGame = document.querySelector(".btn");

const winningPosition =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let currentPlayer;
let gameGrid;

function initGame(){
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;
    });
    newGame.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

};
initGame(); 


let swapTurn = ()=>{
    
    if(currentPlayer == "X"){
        currentPlayer = "O";
    }else{
        currentPlayer = "X"
    }
    gameInfo.innerText = `current player - ${currentPlayer}` 
}

function checkGameOver(){

    let answer = "";

    winningPosition.forEach((position)=>{
        if( (gameGrid[position[0]]!== "" || gameGrid[position[1]]!=="" && gameGrid[position[2]] == "") 
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){

            if(gameGrid[position[0]] == "X"){
                answer = "X"
            }else{
                answer = "O"
            }


            //   disable pointer event
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // now we know winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");


           }
    });

     //it means we have a winner
     if(answer !== "" ) {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGame.classList.add("active");
        return;
    }
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !== "")
        fillCount++;
    })
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGame.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer ;
        gameGrid[index] = currentPlayer ;
        boxes[index].style.pointerEvents = "none";

        swapTurn();

       checkGameOver();
       
    }
    
}


boxes.forEach((box, index) => {
    box.addEventListener("click", ()=>{
        handleClick(index);
    })
});

newGame.addEventListener("click", initGame);