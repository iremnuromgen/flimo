import { initCreateCollectionModal } from "./modules/modal.js";
import { initAddWords } from "./modules/words.js";
import { addCollection } from "./modules/storage.js";

document.addEventListener("DOMContentLoaded", () => {
    initCreateCollectionModal();
    const wordsDraft = initAddWords();

    const modal = document.getElementById("create-collection-modal");
    const nameInput = document.getElementById("collection-name-input");
    const saveBtn = document.getElementById("save-collection-btn");

    if (!modal || !nameInput || !saveBtn) return;

    saveBtn.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const words = wordsDraft.getDraftWords();

        if (!name) return;
        if (words.length === 0) return;

        addCollection({ name, words });

        modal.classList.add("is-hidden");
        nameInput.value = "";
        wordsDraft.resetDraft();
    });
});