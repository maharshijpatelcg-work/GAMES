const heading=document.getElementById("Heading");

const heading3=document.getElementsByClassName("smallHeading");

for(let i=0;i<heading3.length;i++){
    if(heading3[i].innerTEXT=="this is the h3 heading"){
        console,log(heading3[i])
    }
}

heading.style.backgroundColor="cyan";

const h1=document.getElementsByTagName("h1");

let heading=document.querySelectorAll("h1");
console.log(heading)