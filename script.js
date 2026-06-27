const burger = document.querySelector(".burger");
const drawer = document.querySelector(".drawer");
const close_btn = document.querySelector(".drawer .close-btn");

burger.addEventListener("click", () => {
  drawer.classList.toggle("open");
});

close_btn.addEventListener("click", () => {
  drawer.classList.toggle("open");
});
