let food1s = document.getElementById('food1');
let food2s = document.getElementById('food2');
let foods = document.getElementById('food');

food1s.addEventListener('click',()=>{
    foods.style.backgroundImage="url('imgs/about-2.jpg')";
})

food2s.addEventListener('click',()=>{
    foods.style.backgroundImage="url('imgs/photo_1.jpg')";
})
function loader() {
    document.querySelector(".loader-container").classList.add("fade-out");
  }
  
  function fadeOut() {
    setInterval(loader, 3000);
  }
  
  window.onload = fadeOut;