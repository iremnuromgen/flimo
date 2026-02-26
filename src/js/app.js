document.addEventListener("DOMContentLoaded", () => {
    const openModalBtn = document.getElementById("open-modal-btn");
    const createCollectionModal = document.getElementById("create-collection-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const cancelModalBtn = document.getElementById("cancel-modal-btn");

    const openModal = () => {
        createCollectionModal.classList.remove("is-hidden");
    }

    const closeModal = () => {
        createCollectionModal.classList.add("is-hidden");
    }

    //Open Modal
    if(openModalBtn) {
        openModalBtn.addEventListener("click", openModal);
    }

    //Close Model (X Button)
    if(closeModalBtn) {
        closeModalBtn.addEventListener("click", closeModal);
    }

    //Close Modal (Cancel Button)
    if(cancelModalBtn) {
        cancelModalBtn.addEventListener("click", closeModal);
    }

    //Close when clicking outside modal
    if(createCollectionModal) {
        createCollectionModal.addEventListener("click", (e) => {
            if(e.target === createCollectionModal) {
                closeModal()
            }
        });
    }
});