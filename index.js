const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const cells = document.querySelectorAll(".data-cell");
const board = document.getElementById("board");
let circleTurn;
const winningText = document.getElementById("winningText");
const winningPage = document.querySelector(".winning-message");
const resetButton = document.querySelector("#resetButton");
const Winning_Combinations = [[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]];

startGame();
resetButton.addEventListener("click", startGame)
function startGame ()
{  
    circleTurn = false;
    cells.forEach((i)=> {
        i.classList.remove(CIRCLE_CLASS);
        i.classList.remove(X_CLASS);
        i.removeEventListener("click",handleClick , {once: true});
        i.addEventListener("click",handleClick , {once: true});
    });
    // setBoardHoverClass(); 
    winningPage.classList.remove("show");
}

function endGame(draw)
{
    if (draw === true)
    {
        winningText.innerText = "Draw!";
    }
    else
    {
        winningText.innerText = `${circleTurn ? "O Wins!" : "X Wins!"}`;
        console.log("winner");
    }
    winningPage.classList.add("show");
    
}

function checkDraw()
{
    if ([...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
      }))
      {
          return true;
      }
}

function handleClick(e)
{
    console.log("clicked");
    //Place Marker
    const cell =e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMarker(cell,currentClass);
    //Check for win
    if (checkWin(currentClass))
    {
        endGame(false);
    }
    else if (checkDraw())
    {
        endGame(true);
    }
    //Check For draw
    else
    {
        switchTurns();
        // setBoardHoverClass();
    } 
    
}


function placeMarker(cell,currentClass)
{
    cell.classList.add(currentClass);
    
}

function switchTurns()
{
    circleTurn =!circleTurn;
}

// function setBoardHoverClass() {
//     board.classList.remove(X_CLASS);
//     board.classList.remove(CIRCLE_CLASS);
//     if (circleTurn) {
//       board.classList.add(CIRCLE_CLASS);
//     } else {
//       board.classList.add(X_CLASS);
//     }
//   }

function checkWin(currentClass) 
{
    return Winning_Combinations.some(combination => {
      return combination.every(index => {
        return cells[index].classList.contains(currentClass);
      });
    });
  }

