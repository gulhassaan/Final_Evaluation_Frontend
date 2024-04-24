
function showmodal(){
    modalBox = document.getElementById("logout-card");
    let transf = modalBox.style.transform;
    console.log(transf)

    if(transf === "translateX(0%)"){
        modalBox.style.transform = "translateX(150%)";
    }
    else{
        modalBox.style.transform = "translateX(0%)";
    }
}
