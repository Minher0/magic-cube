const elements = {
    box: document.querySelector(".box"),
    color: document.querySelector("#color"),
    gradientColor: document.querySelector("#gradientColor"),
    gradientType: document.querySelector("#gradientType"),
    radius: document.querySelector("#radius"),
    size: document.querySelector("#size"),
    rotation: document.querySelector("#rotation"),
    customText: document.querySelector("#customText"),
    fontSize: document.querySelector("#fontSize"),
    textColor: document.querySelector("#textColor"),
    animation: document.querySelector("#animation"),
    borderStyle: document.querySelector("#borderStyle"),
    borderColor: document.querySelector("#borderColor"),
    borderWidth: document.querySelector("#borderWidth"),
    saveButton: document.querySelector("#saveButton"),
};

const valueDisplays = {
    radius: document.querySelector("#radiusValue"),
    size: document.querySelector("#sizeValue"),
    rotation: document.querySelector("#rotationValue"),
    fontSize: document.querySelector("#fontSizeValue"),
    borderWidth: document.querySelector("#borderWidthValue"),
};

function updateBox() {
    if (!elements.box) return;

    const styles = {
        width: `${elements.size.value}px`,
        height: `${elements.size.value}px`,
        borderRadius: `${elements.radius.value}px`,
        transform: `rotate(${elements.rotation.value}deg)`,
        fontSize: `${elements.fontSize.value}px`,
        color: elements.textColor.value,
        borderStyle: elements.borderStyle.value,
        borderColor: elements.borderColor.value,
        borderWidth: `${elements.borderWidth.value}px`,
    };

    if (elements.gradientType.value === "none") {
        styles.background = elements.color.value;
    } else if (elements.gradientType.value === "linear") {
        styles.background = `linear-gradient(to right, ${elements.color.value}, ${elements.gradientColor.value})`;
    } else if (elements.gradientType.value === "radial") {
        styles.background = `radial-gradient(circle, ${elements.color.value}, ${elements.gradientColor.value})`;
    }

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
    if (element && key !== 'box' && key !== 'saveButton') {
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

// Save functionality
elements.saveButton.addEventListener("click", () => {
    html2canvas(elements.box).then(canvas => {
        const link = document.createElement('a');
        link.download = 'ma_creation.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});