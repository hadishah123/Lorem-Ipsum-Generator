const tagOptions = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "span"];

const optionsContainer = document.querySelector(".options");
const outputContainer = document.querySelector(".output");
const tagsSelect = document.getElementById("tags");
const paragraphsSlider = document.getElementById("paragraphs");
const wordsSlider = document.getElementById("words");
const paragraphsValue = document.getElementById("paragraphsValue");
const wordsValue = document.getElementById("wordsValue");
const fontFamilySelect = document.getElementById('fontFamily');
const fontSizeSlider = document.getElementById('fontSize');
const fontSizeValue = document.getElementById('fontSizeValue');
const separatorInput = document.getElementById('separator');
const copyButton = document.getElementById('copy');
const saveButton = document.getElementById('saveFile');

// Create options UI for the tag selector
function createOptionsUI() {
    tagOptions.forEach((tag) => {
        const option = document.createElement("option");
        option.value = tag;
        option.textContent = `<${tag}>`;
        tagsSelect.appendChild(option);
    });

    // Event listeners for sliders and buttons
    paragraphsSlider.addEventListener("input", updateParagraphsValue);
    wordsSlider.addEventListener("input", updateWordsValue);
    fontSizeSlider.addEventListener('input', () => {
        fontSizeValue.textContent = `${fontSizeSlider.value}px`;
    });

    const generateButton = document.getElementById("generate");
    generateButton.addEventListener("click", generateLoremIpsum);

    // Copy to clipboard button
    copyButton.addEventListener('click', () => {
        const text = outputContainer.innerText;
        navigator.clipboard.writeText(text).then(() => {
            alert('Text copied to clipboard!');
        });
    });

    // Save as file button
    saveButton.addEventListener('click', () => {
        const text = outputContainer.innerText;
        const blob = new Blob([text], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'lorem-ipsum.txt';
        link.click();
    });
}

// Update paragraph and words value displays
function updateParagraphsValue() {
    paragraphsValue.textContent = paragraphsSlider.value;
}

function updateWordsValue() {
    wordsValue.textContent = wordsSlider.value;
}

// Function to generate Lorem Ipsum text
function generateLoremIpsum() {
    const paragraphs = parseInt(paragraphsSlider.value);
    const tag = tagsSelect.value;
    const includeHtml = document.getElementById("include").value;
    const wordsPerParagraph = parseInt(wordsSlider.value);
    const fontFamily = fontFamilySelect.value;
    const fontSize = fontSizeSlider.value;
    const separator = separatorInput.value;

    const loremIpsumText = generateText(paragraphs, tag, includeHtml, wordsPerParagraph, separator);
    displayLoremIpsum(loremIpsumText, fontFamily, fontSize);
}

// Generate the Lorem Ipsum text with the given parameters
function generateText(paragraphs, tag, includeHtml, wordsPerParagraph, separator) {
    const placeholderText = `Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
    const loremIpsumArray = new Array(paragraphs).fill("");

    for (let i = 0; i < paragraphs; i++) {
        const words = generateWords(wordsPerParagraph);
        loremIpsumArray[i] = includeHtml === "Yes" ? `<${tag}>${words}</${tag}>` : words;
    }

    return loremIpsumArray.join(separator || "\n");
}

// Function to generate random words for Lorem Ipsum text
function generateWords(numWords) {
    const loremIpsumText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
    const words = loremIpsumText.split(" ");

    if (numWords <= words.length) {
        return words.slice(0, numWords).join(" ");
    } else {
        return words.join(" ");
    }
}

// Display the generated text with the selected font style and size
function displayLoremIpsum(text, fontFamily, fontSize) {
    outputContainer.innerHTML = text;
    outputContainer.style.fontFamily = fontFamily;
    outputContainer.style.fontSize = `${fontSize}px`;
}

// Initialize the app
createOptionsUI();
