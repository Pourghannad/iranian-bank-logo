document.addEventListener("DOMContentLoaded", () => {
  const animateElement = document.querySelectorAll(".animate");
  const refreshElement = document.querySelectorAll("main section .refresh");
  const sectionsElement = document.querySelectorAll("main section");
  for (let i = 0; i < sectionsElement.length; i++) {
    const animateTypeElement = sectionsElement[i].querySelectorAll(
      ".animation-type-container span"
    );
    const lightDarkElement = sectionsElement[i].querySelector(".light-dark");
    const codeElement = sectionsElement[i].querySelector(".code");
    lightDarkElement.addEventListener("click", (event) => {
      if (event.target.textContent.indexOf("Light") !== -1) {
        event.target.parentNode.classList.add("dark");
        event.target.textContent = "Dark";
      } else {
        event.target.parentNode.classList.remove("dark");
        event.target.textContent = "Light";
      }
    });
    for (let k = 0; k < animateTypeElement.length; k++) {
      animateTypeElement[k].addEventListener("click", (event) => {
        for (let j = 0; j < animateTypeElement.length; j++) {
          animateTypeElement[j].classList.remove("active");
          animateTypeElement[j].parentNode.parentElement.removeAttribute(
            "class"
          );
        }
        event.target.classList.add("active");
        event.target.parentNode.parentElement.classList.add(
          `animate-${event.target.textContent}-${
            event.target.parentNode.parentElement.querySelector("svg")
              .classList[0]
          }`
        );
      });
    }
    codeElement.addEventListener("click", (event) => {
      const itemTypeNumber =
        event.target.parentNode.getAttribute("class") === null
          ? 0
          : event.target.parentNode.getAttribute("class").split("-")[1] * 1 - 1;
      const itemName = event.target.parentNode
        .querySelector("svg")
        .getAttribute("class")
        .split(" ")[0];
      event.target.parentNode
        .querySelector(".code-container")
        .classList.add("active");
      document.getElementById("modal-cover").classList.add("active");
      event.target.parentNode.querySelector(".code-container code").innerHTML =
        ElementCode[itemName][itemTypeNumber][
          `code_${
            event.target.parentNode
              .querySelector(".light-dark")
              .textContent.indexOf("Light") === -1
              ? "dark"
              : "light"
          }`
        ];
    });
  }
  for (let i = 0; i < animateElement.length; i++) {
    animateElement[i].addEventListener("animationend", (event) => {
      setTimeout(() => {
        event.target.closest("svg").classList.remove("animate");
      }, 150);
    });
  }
  for (let i = 0; i < refreshElement.length; i++) {
    refreshElement[i].addEventListener("click", (event) => {
      event.target.parentNode.querySelector("svg").classList.add("animate");
    });
  }
  document.querySelector("#modal-cover").addEventListener("click", (event) => {
    event.target.classList.remove("active");
    document.querySelector(".code-container.active").classList.remove("active");
  });
});
