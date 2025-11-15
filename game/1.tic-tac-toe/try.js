var a = [1,2,3,4,5,6,7,8,9,0,12,23,344,4565];
// array syntax

for(var i=0;i<=4;i++){
    console.log(a[i]);
}

a.forEach((i)=>{
    console.log(i);
})

for(var d of a){
    console.log(d);
}