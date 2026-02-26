export function initAddWords() {
    const wordFromInput = document.getElementById("word-from-input");
    const wordToInput = document.getElementById("word-to-input");
    const wordAddBtn = document.getElementById("word-add-btn");
    const wordsArea = document.getElementById("words-area-id");

    if(!wordFromInput || !wordToInput || !wordAddBtn || !wordsArea) return;

    //Temporary List
    const tempWords = [];

    const addWord = () => {
        const from = wordFromInput.value.trim();
        const to = wordToInput.value.trim();

        if(!from || !to) return;

        tempWords.push({ from, to });

        wordsArea.classList.remove("is-empty");

        const empty = wordsArea.querySelector(".words-empty");
        if (empty) empty.remove();

        const row = document.createElement("div");
        row.className = "word-item";
        row.textContent = `${from} → ${to}`;
        wordsArea.appendChild(row);

        wordFromInput.value = "";
        wordToInput.value = "";
        wordFromInput.focus();
    };

    wordAddBtn.addEventListener("click", addWord);
}