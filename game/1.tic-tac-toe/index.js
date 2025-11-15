const saveLocalButton = document.getElementById("saveLocalBtn");
const retrieveLocalButton = document.getElementById("retrieveLocalBtn");
const saveSessionButton = document.getElementById("saveSessionBtn");
const retrieveSessionButton = document.getElementById("retrieveSessionBtn");
const outputParagraph = document.getElementById("output");

console.log(outputParagraph);

saveLocalButton.addEventListener("click",function(){
    localStorage.setItem("cityLocal","Mumbai");
    outputParagraph.textContent = "City saved to local Storage : Mumbai";
});

retrieveLocalButton.addEventListener("click",function(){
    const savedCityLocal = localStorage.getItem("cityLocal");
    if(savedCityLocal){
        outputParagraph.textContent = "city retrived from Local Storage: " + savedCityLocal;
    }else{
        outputParagraph.textContent = "city not found in Local Storage";
    }
});


saveSessionButton.addEventListener("click",function(){
    sessionStorage.setItem("citySession", "Delhi");
    outputParagraph.textContent = "City saved  to Session Storage : Delhi";
});

retrieveSessionButton.addEventListener("click", function(){
    const savedCitySession = sessionStorage.getItem("citySession");
    if(savedCitySession){
        outputParagraph.textContent = "City retrieved from Session Storage: " + savedCitySession;
    }else{
        outputParagraph.textContent = "City not found in Session Storage. ";
    }
});