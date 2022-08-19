const $ = selector => document.querySelector(selector);
const $all = selector => document.querySelectorAll(selector);

const body = $("body");
const header = $("header");
const sec_welcome = $(".sec_welcome");
const dv_btn_menu = $(".dv_btn_menu");

// Btn ir al inicio sin que se vea el "#top" en la URL
const first = $(".first");

first.addEventListener("click", (e) => {
  e.preventDefault();
  window.scroll({
    top: 0
    //behavior: 'smooth'
  });
});

window.addEventListener("scroll", setHeaderFixed);

function setHeaderFixed() {
  let scroll = this.scrollY;
  let screenSize = body.clientWidth;
  
  //console.log("Scroll = " + scroll);

  if (scroll >= 100) {
    //console.log("-------");
  
    // Saber si no es pantalla de móvil
    if (body.clientWidth > 936) {
      header.classList.add("header_fixed");
      sec_welcome.style.paddingTop = (header.clientHeight + 150) + "px";
    }

    //console.log("Altura de header = " + header.clientHeight);
  } else {
    if (screenSize > 870) {
      header.classList.remove("header_fixed");
    }
    sec_welcome.style.paddingTop = 0;
  }
}
setHeaderFixed();

window.addEventListener("resize", knowScreenSize);

function knowScreenSize() {
  const screenSize = body.clientWidth;

  //console.log("screenSize = " + screenSize);

  if (screenSize > 936) {
    // Cerrar menú y permitir el scroll si el size de pantalla se pone más grande y deja el menú abierto
    if (dv_btn_menu.classList.contains("open_menu")) {
      dv_btn_menu.click();
    }
  }
}
knowScreenSize();

dv_btn_menu.innerHTML = `<span class="line"></span>
<span class="line"></span>
<span class="line"></span>`;

dv_btn_menu.addEventListener("click", () => {
  //console.log("Click");
  dv_btn_menu.classList.toggle("open_menu");
  header.classList.toggle("active_menu");
  body.classList.toggle("active_menu");
});

// Controlar que cuando se haga click en algun btn del menú se cierre el menú se cierre (solo funciona en pantalla movil)

const all_btns_menu = $all(".nav_link");
//alert(all_btns_menu.length)
all_btns_menu.forEach(btn => {
  const screenSize = body.clientWidth;
  if (screenSize <= 936) {
    btn.addEventListener("click", () => {
      dv_btn_menu.click();
      body.classList.remove("active_menu");
    });
  }
});

// Abrir y cerrar foto de autocollage
const sec_open_img = $(".sec_open_img");
const img_autocollage = $(".img_autocollage");

img_autocollage.addEventListener("click", () => {
  //alert("Abir imagen - Poner en grande");

  //console.log(img_autocollage);

  sec_open_img.classList.add("active");
  sec_open_img.innerHTML = `<img src="${img_autocollage.src}" />`;
});

// Cerrar foto con click en el area en negro
sec_open_img.addEventListener("click", () => {
  closeImg();
});

// Cerrar foto con la tecla "Escape"
window.addEventListener("keydown", (e) => {
  //alert(e.key);

  if (e.key == "Escape") {
    closeImg();
  }
});

function closeImg() {
  sec_open_img.classList.remove("active");
  sec_open_img.innerHTML = "";
}