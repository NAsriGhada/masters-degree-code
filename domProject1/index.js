var total = 0; // Initialize total price

// ! Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // todo Select all plus buttons
    var plusButtons = document.querySelectorAll(".fa-plus-circle");
    // todo Select all minus buttons
    var minusButtons = document.querySelectorAll(".fa-minus-circle");
    // todo Select all heart buttons
    var heart = document.querySelectorAll(".fa-heart");
    // todo Select all trash buttons
    var trash = document.querySelectorAll(".fa-trash-alt");

    // Loop through each plus button and add event listener
    plusButtons.forEach((plusButton) => {
        plusButton.addEventListener("click", function (event) {
            // Find the closest `.card-body` and select the quantity element inside it
            var element = event.target; // The clicked button
            console.log(element);
            // Find the closest `.card-body`
            var cardBody = element.closest(".card-body");
            var quantityElement = cardBody.querySelector(".quantity");
            // Get the current quantity and increase it
            var currentQuantity = parseInt(quantityElement.textContent);
            quantityElement.textContent = currentQuantity + 1;
            // Update total price
            // Get the price of the item
            var price = Number(
                cardBody.querySelector(".unit-price").innerText.replace(" $", "")
            );
            total += price;
            document.querySelector(".total").innerText = total + " $";
        });
    });

    // Loop through each minus button and add event listener
    minusButtons.forEach((minusButtons) => {
        minusButtons.addEventListener("click", function (event) {
            // Find the closest `.card-body` and select the quantity element inside it
            var element = event.target; // The clicked button
            console.log(element);
            // Find the closest `.card-body`
            var cardBody = element.closest(".card-body");
            var quantityElement = cardBody.querySelector(".quantity");
            // Get the current quantity and increase it
            var currentQuantity = parseInt(quantityElement.textContent);
            quantityElement.textContent = currentQuantity - 1;
            // Update total price
            // Get the price of the item
            var price = Number(
                cardBody.querySelector(".unit-price").innerText.replace(" $", "")
            );
            total -= price;
            document.querySelector(".total").innerText = total + " $";
        });
    });

    // Loop through each heart button and add event listener
    heart.forEach((heart) => {
        heart.addEventListener("click", function () {
            console.log(heart);
            heart.classList.toggle("text-danger");
        });
    });

    // Loop through each trash button to delete
    trash.forEach((trash) => {
        trash.addEventListener("click", function (event) {
            var element = event.target;
            console.log(element);
            var card = element.closest(".card");
            if (card) {
              card.remove(); // Remove the entire product card
            }
        })
    })
});
