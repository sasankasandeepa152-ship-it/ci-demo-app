function changeText() {
    document.getElementById("title").innerText = "Button Clicked!";
}

// Make the function available to the Jest test.
if (typeof module !== "undefined") {
    module.exports = { changeText };
}