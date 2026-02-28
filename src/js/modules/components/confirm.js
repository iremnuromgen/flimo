import { createSvgIcon } from "./svg.js";

let overlay, titleEl, msgEl, okBtn, cancelBtn;

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

  cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.className = "confirm-btn confirm-btn--cancel";

  okBtn = document.createElement("button");
  okBtn.type = "button";
  okBtn.className = "confirm-btn confirm-btn--ok";

  footer.appendChild(cancelBtn);
  footer.appendChild(okBtn);

  modal.appendChild(header);
  modal.appendChild(body);
  modal.appendChild(footer);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

export function openConfirm({
  title = "Are you sure?",
  message = "Your changes will be lost.",
  okText = "Cancel",
  cancelText = "Continue",
} = {}) {
  if (!overlay) build();

  titleEl.textContent = title;
  msgEl.textContent = message;
  okBtn.textContent = okText;
  cancelBtn.textContent = cancelText;

  overlay.classList.remove("is-hidden");

  return new Promise((resolve) => {
    const close = (val) => {
      overlay.classList.add("is-hidden");
      okBtn.removeEventListener("click", onOk);
      cancelBtn.removeEventListener("click", onCancel);
      overlay.removeEventListener("click", onOverlay);
      resolve(val);
    };

    const onOk = () => close(true);
    const onCancel = () => close(false);
    const onOverlay = (e) => {
      if (e.target === overlay) close(false);
    };

    okBtn.addEventListener("click", onOk);
    cancelBtn.addEventListener("click", onCancel);
    overlay.addEventListener("click", onOverlay);
  });
}