var player1 = prompt("enter your name");
console.log(player1);

var player2 = prompt("enter your name");
console.log(player2);
const boxes = document.querySelectorAll(".btn");
var player = true;
const winner = [  
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function disablebtn(){
    for(var b of boxes){
        b.innerHTML = "";
        b.disabled = false;
        
    }
};

function displayWinner(){
    for(let a of winner){
        var btn1=boxes[a[0]].innerHTML;
        var btn2=boxes[a[1]].innerHTML;
        var btn3=boxes[a[2]].innerHTML;
        if(btn1!=""&& btn2!="" && btn3!=""){
            if(btn1 === btn2 && btn2 === btn3){
                if(btn1 === "O"){
                    alert("🎉 The winner is " + player1);
                }
                else{
                    alert("🎉 The winner is " + player2);
                    
                }
                disablebtn();
            }
        }
    }
};

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