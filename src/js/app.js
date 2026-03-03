import { initCreateCollectionModal } from "./modules/modal.js";
import { initAddWords } from "./modules/words.js";

document.addEventListener("DOMContentLoaded", () => {
    initCreateCollectionModal();
    const wordsDraft = initAddWords();
});