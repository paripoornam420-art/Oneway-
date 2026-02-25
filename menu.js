function openMenu(){
document.getElementById("sideMenu").style.right="0";
document.getElementById("overlay").style.display="block";
}

function closeMenu(){
document.getElementById("sideMenu").style.right="-100%";
document.getElementById("overlay").style.display="none";
}

/* AUTO ACTIVE MENU */
document.addEventListener("DOMContentLoaded", function(){
const links=document.querySelectorAll("#sideMenu a");
const current=window.location.pathname.split("/").pop();

links.forEach(link=>{
if(link.getAttribute("href")===current){
link.classList.add("active");
}
});
});