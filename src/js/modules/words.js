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

        const row = createWordRow(from, to);
        wordsArea.appendChild(row);

        wordFromInput.value = "";
        wordToInput.value = "";
        wordFromInput.focus();
    };

    wordAddBtn.addEventListener("click", addWord);

    function createPencilIcon() {
        const ns = "http://www.w3.org/2000/svg";

        const svg = document.createElementNS(ns, "svg");
        svg.setAttribute("width", "20");
        svg.setAttribute("height", "20");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");

        const path1 = document.createElementNS(ns, "path");
        path1.setAttribute("d", "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z");

        const path2 = document.createElementNS(ns, "path");
        path2.setAttribute("d", "m15 5 4 4");

        svg.appendChild(path1);
        svg.appendChild(path2);

        return svg;
    }

    function createDeleteIcon() {
        const ns = "http://www.w3.org/2000/svg";

        const svg = document.createElementNS(ns, "svg");
        svg.setAttribute("width", "20");
        svg.setAttribute("height", "20");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");

        const paths = [
            "M10 11v6",
            "M14 11v6",
            "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
            "M3 6h18",
            "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        ];

        paths.forEach(d => {
            const path = document.createElementNS(ns, "path");
            path.setAttribute("d", d);
            svg.appendChild(path);
        });

        return svg;
        }

    function createWordRow(from, to) {
        const row = document.createElement("div");
        row.classList.add("word-item");

        const fromEl = document.createElement("div");
        fromEl.classList.add("word-item__from");
        fromEl.textContent = from;

        const divider = document.createElement("div");
        divider.classList.add("word-item__divider");

        const toEl = document.createElement("div");
        toEl.classList.add("word-item__to");
        toEl.textContent = to;

        const iconsWrapper = document.createElement("div");
        iconsWrapper.classList.add("word-item__icons");

        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.classList.add("icon-btn");
        editBtn.setAttribute("aria-label", "Edit");
        editBtn.appendChild(createPencilIcon());

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.classList.add("icon-btn");
        deleteBtn.setAttribute("aria-label", "Delete");
        deleteBtn.appendChild(createDeleteIcon());

        iconsWrapper.appendChild(editBtn);
        iconsWrapper.appendChild(deleteBtn);

        row.appendChild(fromEl);
        row.appendChild(divider);
        row.appendChild(toEl);
        row.appendChild(iconsWrapper);

        return row;
    }
}