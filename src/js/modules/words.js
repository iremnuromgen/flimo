import { createSvgIcon } from "./components/svg.js";

export function initAddWords() {
    const wordFromInput = document.getElementById("word-from-input");
    const wordToInput = document.getElementById("word-to-input");
    const wordAddBtn = document.getElementById("word-add-btn");
    const wordsArea = document.getElementById("words-area-id");

    if(!wordFromInput || !wordToInput || !wordAddBtn || !wordsArea) return;

    //Temporary List
    const tempWords = [];

    const empty = wordsArea.querySelector(".words-empty");

    const logTempWords = (label) => {
        console.clear();
        console.log(label);
        console.table(tempWords);
    };

    const addWord = () => {
        const from = wordFromInput.value.trim();
        const to = wordToInput.value.trim();

        if(!from || !to) return;

        const word = {
            id: Date.now() + Math.random(),
            from,
            to
        };

        tempWords.push(word);

        wordsArea.classList.remove("is-empty");

        logTempWords("after add");

        if (empty) {
            empty.style.display = "none";
        }

        const row = createWordRow(word);
        wordsArea.appendChild(row);

        wordFromInput.value = "";
        wordToInput.value = "";
        wordFromInput.focus();
    };

    wordAddBtn.addEventListener("click", addWord);

    function createPencilIcon() {
        return createSvgIcon([
            "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
            "m15 5 4 4",
        ]);
    }

    function createDeleteIcon() {
        return createSvgIcon([
            "M10 11v6",
            "M14 11v6",
            "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
            "M3 6h18",
            "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
        ]);
    }

    function createWordRow(word) {
        const row = document.createElement("div");
        row.classList.add("word-item");

        let fromEl = document.createElement("div");
        fromEl.classList.add("word-item__from");
        fromEl.textContent = word.from;

        const divider = document.createElement("div");
        divider.classList.add("word-item__divider");

        let toEl = document.createElement("div");
        toEl.classList.add("word-item__to");
        toEl.textContent = word.to;

        const iconsWrapper = document.createElement("div");
        iconsWrapper.classList.add("word-item__icons");

        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.classList.add("icon-btn");
        editBtn.setAttribute("aria-label", "Edit");
        editBtn.appendChild(createPencilIcon());

        editBtn.addEventListener("click", () => {
            if (row.classList.contains("is-editing")) return;

            row.classList.add("is-editing");

            const currentFrom = fromEl.textContent;
            const currentTo = toEl.textContent;

            const fromInput = document.createElement("input");
            fromInput.classList.add("word-item__input");
            fromInput.type = "text";
            fromInput.value = currentFrom;

            const toInput = document.createElement("input");
            toInput.classList.add("word-item__input");
            toInput.type = "text";
            toInput.value = currentTo;

            const actions = document.createElement("div");
            actions.classList.add("word-item__actions");

            const cancelBtn = document.createElement("button");
            cancelBtn.type = "button";
            cancelBtn.classList.add("word-action-btn");
            cancelBtn.textContent = "Cancel";

            const saveBtn = document.createElement("button");
            saveBtn.type = "button";
            saveBtn.classList.add("word-action-btn", "word-action-btn--save");
            saveBtn.textContent = "Save";

            saveBtn.addEventListener("click", () => {
                const nextFrom = fromInput.value.trim();
                const nextTo = toInput.value.trim();

                if (!nextFrom || !nextTo) return;

                const index = tempWords.findIndex((w) => w.id === word.id);

                if (index !== -1) {
                    tempWords[index].from = nextFrom;
                    tempWords[index].to = nextTo;
                }

                logTempWords("after edit save");

                const newFromEl = document.createElement("div");
                newFromEl.classList.add("word-item__from");
                newFromEl.textContent = nextFrom;

                const newToEl = document.createElement("div");
                newToEl.classList.add("word-item__to");
                newToEl.textContent = nextTo;

                row.replaceChild(newFromEl, fromInput);
                row.replaceChild(newToEl, toInput);

                fromEl = newFromEl;
                toEl = newToEl;

                row.classList.remove("is-editing");
                iconsWrapper.style.display = "";
                actions.remove();
            });

            actions.appendChild(cancelBtn);
            actions.appendChild(saveBtn);

            row.replaceChild(fromInput, fromEl);
            row.replaceChild(toInput, toEl);

            iconsWrapper.style.display = "none";
            row.appendChild(actions);

            fromInput.focus();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.classList.add("icon-btn");
        deleteBtn.setAttribute("aria-label", "Delete");
        deleteBtn.appendChild(createDeleteIcon());

        deleteBtn.addEventListener("click", () => {
            const index = tempWords.findIndex((w) => w.id === word.id);

            if (index !== -1) {
                tempWords.splice(index, 1);
            }

            logTempWords("after delete");

            row.remove();

            if (tempWords.length === 0) {
                wordsArea.classList.add("is-empty");

                if (empty) {
                    empty.style.display = "";
                }
            }
        });

        iconsWrapper.appendChild(editBtn);
        iconsWrapper.appendChild(deleteBtn);

        row.appendChild(fromEl);
        row.appendChild(divider);
        row.appendChild(toEl);
        row.appendChild(iconsWrapper);

        return row;
    }
}