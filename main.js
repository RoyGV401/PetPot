let radios = document.querySelectorAll("[type='radio']");
radios.forEach((x) => {
  x.dataset.val = x.checked; // guardamos el estado del radio button dentro del elemento
  x.addEventListener(
    "click",
    (e) => {
      alert();
      let element = e.target;
      if (element.dataset.val == "false") {
        element.dataset.val = "true";
        element.checked = true;
      } else {
        element.dataset.val = "false";
        element.checked = false;
      }
    },
    true
  );
});

function changeTo(path)
{
  location.href = `${path}.html`;
}

window.onload = function() {

  //Logo returns to landing page
  document.getElementById('main_logo').onclick = function(){
    location.href = `index.html`;
  };
}
