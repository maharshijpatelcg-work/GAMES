// button monitor
const boxes = document.querySelectorAll(".box");
// const win = document.querySelector(".winner");

console.log(boxes);

const winner = [
[0,1,2,3,4,5],
[6,7,8,9,10,11],
[12,13,14,15,16,17],
[18,19,20,21,22,23],
[24,25,26,27,28,29],
[30,31,32,33,34,35],
[0,6,12,18,24,30],
[1,7,13,19,25,31],
[2,8,14,20,26,32],
[3,9,15,21,27,33],
[4,10,16,22,28,34],
[5,11,17,23,29,35],
[0,7,14,21,28,35],
[5,10,15,21,25,30]
    
];



let player=true;  

function checkwinner(){
for(let data of winner){
const btn1=boxes[data[0]].innerHTML;
const btn2=boxes[data[1]].innerHTML;
const btn3=boxes[data[2]].innerHTML;
const btn4=boxes[data[3]].innerHTML;
const btn5=boxes[data[4]].innerHTML;
const btn6=boxes[data[5]].innerHTML;

        if(btn1 !="" && btn2 !="" && btn3 !="" && btn4 !="" && btn5 !="" && btn6 !=""){
          
            if(btn1 === btn2 && btn2 === btn3 && btn3 === btn4 && btn4 === btn5 && btn5 === btn6){
                alert("🎉 The Winner is "+ btn1);
                   

                      for(let box of boxes){
                           box.disabled =true;
                                          }
                    
            }
        }
} 

};
boxes.forEach((box)=>{ // foreach loop will travel to all the individual elements of an array and would get  us the information of each element
//   console.log(box.innerHTML);  // innerHTML helps to get the inner data of an individual button elements like bt0
// box.innerHTML="aq"; // here we changed the values of bt0,bt1... to aq      

box.addEventListener("click",()=>{ // click is the work that  is done by user and then the compiler will return the response through the function written after ,
// console.log(box.innerHTML)
if(player){
    box.innerHTML="O";
    box.style.backgroundColor = "blue";
    box.style.color= "white";
    box.style.fontSize="20px";
    box.style.fontweight="bold";
    player=false;
}
else{
    box.innerHTML="X";
    box.style.backgroundColor = "blue";
    box.style.color= "white";
    box.style.fontSize="20px";
    box.style.fontweight="bold";

    player=true;
}
box.disabled=true; // box.disabled means that box cant be accessed again  --> bydefault value of disabled is false  so button is multiple times clickable so we changed the value to true

checkwinner();
});
});

// winner.addEventListener("",()=>{
//  winner.innerHTML="The Winner is";

// })
// const re = document.ge(".res");

// // res.addEventListener("click",()=>{
// //     boxes.forEach((box=>{
// //   box.innerHTML=" ";
// //     }))
// // })
// boxes.forEach((box)=>{
//     res.addEventListener("click",()=>{
//   box.innerHTML=" ";

//     })
// }) 