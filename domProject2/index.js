document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
    var colorBox = document.getElementById("color-box");
    var changeColorButton = document.getElementById("change-color-btn");
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    changeColorButton.addEventListener("click", () => {
        colorBox.style.backgroundColor = getRandomColor();
    });
});
