const buttons = document.querySelectorAll("#image-picker li");
const image = document.querySelector("#product-image");

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        buttons.forEach((btn) => {
            btn.querySelector(".color").classList.remove("selected");
        });

        const button = e.currentTarget;
        const id = button.getAttribute("id");

        button.querySelector(".color").classList.add("selected");

        image.setAttribute("src", `../Images/iphone_${id}.jpg`);

        image.classList.add("changing");
        setTimeout(() => {
            image.classList.remove("changing");
        }, 500); 
    });
});
