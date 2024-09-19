const elements = {
    box: document.querySelector(".box"),
    color: document.querySelector("#color"),
    radius: document.querySelector("#radius"),
    size: document.querySelector("#size"),
    rotation: document.querySelector("#rotation"),
    customText: document.querySelector("#customText"),
    animation: document.querySelector("#animation"),
};

const valueDisplays = {
    radius: document.querySelector("#radiusValue"),
    size: document.querySelector("#sizeValue"),
    rotation: document.querySelector("#rotationValue"),
};

function updateBox() {
    if (!elements.box) return;

    const styles = {
        backgroundColor: elements.color.value,
        borderRadius: `${elements.radius.value}px`,
        width: `${elements.size.value}px`,
        height: `${elements.size.value}px`,
        transform: `rotate(${elements.rotation.value}deg)`,
    };

    Object.assign(elements.box.style, styles);

    elements.box.textContent = elements.customText.value;
    elements.box.className = `box ${elements.animation.value}`;

    // Update value displays
    for (const [key, display] of Object.entries(valueDisplays)) {
        if (display && elements[key]) {
            display.textContent = key === 'rotation' ? `${elements[key].value}°` : `${elements[key].value}px`;
        }
    }
}

// Add event listeners
for (const [key, element] of Object.entries(elements)) {
    if (element && key !== 'box') {
        element.addEventListener("input", updateBox);
    }
}

// Initialize
updateBox();

// Add some interactivity to the box
elements.box.addEventListener("mouseover", () => {
    elements.box.style.boxShadow = "0 0 20px rgba(52, 152, 219, 0.7)";
});

elements.box.addEventListener("mouseout", () => {
    elements.box.style.boxShadow = "none";
});

elements.box.addEventListener("click", () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    elements.color.value = "#" + randomColor;
    updateBox();
});