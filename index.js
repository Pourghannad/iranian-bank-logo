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
      if (event.target.textContent.indexOf("Dark") !== -1) {
        event.target.parentNode
          .querySelector(".dark-overlay")
          .classList.add("dark");
        event.target.textContent = "Light";
      } else {
        event.target.parentNode
          .querySelector(".dark-overlay")
          .classList.remove("dark");
        event.target.textContent = "Dark";
      }
    });
    for (let k = 0; k < animateTypeElement.length; k++) {
      animateTypeElement[k].addEventListener("click", (event) => {
        event.target.parentElement.parentElement.querySelector("svg").classList.add("animate")
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
        event.target.parentNode.getAttribute("class") === null ||
        event.target.parentNode.getAttribute("class").split("-").length === 1
          ? 0
          : event.target.parentNode.getAttribute("class").split("-")[1] * 1 - 1;
      const itemName = event.target.parentNode
        .querySelector("svg")
        .getAttribute("class")
        .split(" ")[0];
        try {
          navigator.clipboard.writeText(ElementCode[itemName][itemTypeNumber][
            `code_${
              event.target.parentNode
                .querySelector(".light-dark")
                .textContent.indexOf("Dark") === -1
                ? "dark"
                : "light"
            }`
          ]);
          const toastEl = document.getElementById("toast");
          toastEl.classList.add("active");
          setTimeout(() => {
            toastEl.classList.remove("active");
          }, 900);
        } catch (error) {
          alert("error");
        }
        
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
});
