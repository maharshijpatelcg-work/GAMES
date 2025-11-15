const boxes = document.querySelectorAll(".btn");
const resetBtn = document.querySelector("#reset"); // Reset button
var player = true; // Player O starts first

const winner = [  
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]; // winning possibilities

// Function to reset all buttons
function resetGame(){
    for(let b of boxes){
        b.innerHTML = "";
        b.disabled = false;
    }
    player = true; // Reset turn to Player O
}

// Function to check winner
function displayWinner(){
    for(let a of winner){
        var btn1=boxes[a[0]].innerHTML;
        var btn2=boxes[a[1]].innerHTML;
        var btn3=boxes[a[2]].innerHTML;
        if(btn1!="" && btn2!="" && btn3!=""){
            if(btn1 === btn2 && btn2 === btn3){
                if(btn1 === "O"){
                    alert("🎉 The winner is Player O");
                }
                else{
                    alert("🎉 The winner is Player X");
                }
                for(let b of boxes){
                    b.disabled = true; // Stop game after win
                }
            }
        }
    }
};

// Box click event
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(player){
            box.innerHTML = "O";
            player = false;
        }
        else{
            box.innerHTML = "X";
            player = true;
        }
        box.disabled = true;
        displayWinner();
    })
})

// Reset button click event
resetBtn.addEventListener("click", resetGame);
