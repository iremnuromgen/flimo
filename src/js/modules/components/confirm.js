let overlay, titleEl, msgEl, cancelBtn, continueBtn;

function build() {
  overlay = document.createElement("div");
  overlay.className = "confirm-overlay is-hidden";

  const modal = document.createElement("div");
  modal.className = "confirm-modal";

  const header = document.createElement("div");
  header.className = "confirm-header";

  titleEl = document.createElement("h3");
  titleEl.className = "confirm-title";

  header.appendChild(titleEl);

  const body = document.createElement("div");
  body.className = "confirm-body";

  msgEl = document.createElement("p");
  msgEl.className = "confirm-text";

  body.appendChild(msgEl);

  const footer = document.createElement("div");
  footer.className = "confirm-footer";

  continueBtn = document.createElement("button");
  continueBtn.type = "button";
  continueBtn.className = "confirm-btn confirm-btn--cancel";

  cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.className = "confirm-btn confirm-btn--ok";

  footer.appendChild(continueBtn);
  footer.appendChild(cancelBtn);

  modal.appendChild(header);
  modal.appendChild(body);
  modal.appendChild(footer);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

export function openConfirm({
  title = "Are you sure?",
  message = "Your changes will be lost.",
  cancelText = "Cancel",
  continueText = "Continue",
} = {}) {
  if (!overlay) build();

  titleEl.textContent = title;
  msgEl.textContent = message;
  cancelBtn.textContent = cancelText;
  continueBtn.textContent = continueText;

  overlay.classList.remove("is-hidden");

  return new Promise((resolve) => {
    const close = (val) => {
      overlay.classList.add("is-hidden");
      cancelBtn.removeEventListener("click", onCancel);
      continueBtn.removeEventListener("click", onContinue);
      overlay.removeEventListener("click", onOverlay);
      resolve(val);
    };

    const onCancel = () => close(true);
    const onContinue = () => close(false);
    const onOverlay = (e) => {
      if (e.target === overlay) close(false);
    };

    cancelBtn.addEventListener("click", onCancel);
    continueBtn.addEventListener("click", onContinue);
    overlay.addEventListener("click", onOverlay);
  });
}