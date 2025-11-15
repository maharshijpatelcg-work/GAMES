// const body = document.getElementById("body");
// console.log(body);
// body.style.backgroundColor="red";

// const h1=document.getElementById("h1");
// console.log(h1);
// console.log(h1.textContent);
// h1.textContent="Done through Javascript";

// const heading =document.getElementsByClassName("heading");
// console.log(heading);

// let heading3 = document.getElementsByClassName("heading3")
// console.log(heading3)

// for(i=0; i<heading3.length ;i++){
//     if (heading3[i].innerText == "(it's a good thing)"){
//         heading3[i].style.backgroundColor = "pink";
//         heading3[i].innerText = "like 'em cancelled"
//     }
// }

// let data =prompt()
// const button = document.getElementById("color");
// const heading = document.getElementById("heading");
// const body = document.getElementById("body");
// button.addEventListener("click",()=>{
// body.style.backgroundColor="red";
// console.log("this is done through button");
// heading.innerText=data
// })

// let data = prompt()
// const button=document.getElementById("color");
// let heading=document.getElementById("heading");
// const body=document.getElementById("body");
// button.addEventListener("click",button());

// function button(){
//     body.style.backgroundColor="red";
//     console.log("this is done by through button");
//     heading.innerText=data;
// }

// const form =document.getElementById("userform")
// const fname =document.getElementById("fname")
// const lname =document.getElementById("lname")

// let h2=document.getElementById("h2");

// function call(){
//     setTimeout(())
// }

// setTimeout(()=>{
//     console.log("hell")
// },1000)

// form.addEventListener("submit" , (e) =>{
//     e.preventDefault();
//     // h2.innerHTML=${fname.value} ${lname.value}
    
// if(fname.value==="" || lname.value===""){
//     alert("please fill in first and last name!")
// }
// else{
//     alert(you entered:\nFirst Name : ${fname.value}\nLast Name:${lname.value})
//  } 

// console.log(fname.value)
// console.log(lname.value)

// h2.innerHTML=fname.value+"" +lname.value"";


// })

let body = document.getElementsByTagName("body")
let button = document.getElementsByClassName("color")

button[0].addEventListener("click", randomcolor)
function randomcolor(){
let r = Math.random()*255 +1
console.log(r);
let g = Math.random()*255 +1
console.log(g);
let b = Math.random()*255 +1
console.log(b);
    body[0].style.backgroundColor= `rgb(${r+50},${g+50},${b+50})`;
}