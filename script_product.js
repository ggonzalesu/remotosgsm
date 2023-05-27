const shareBtn = document.getElementById("shareBtn");

shareBtn.addEventListener("click", (event) => {
  if (navigator.share) {
    navigator
      .share({
        title: "",
        url: "https://www.remotosgsm.net/",
      })
      .then(() => {
        console.log("Thanks for sharing");
      })
      .catch(console.error);
  } else {
    alert("El navegador no soporta esta función, hacerlo manualmente");
  }
});

const tabs = document.querySelectorAll(".tab_btn");
const all_content = document.querySelectorAll(".content");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", (e) => {
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");

    var line = document.querySelector(".line");
    line.style.width = e.target.offsetWidth + "px";
    line.style.left = e.target.offsetLeft + "px";

    all_content.forEach((tab) => {
        tab.classList.remove("active");
      });
    all_content[index].classList.add('active');
  });
});
