import { createSvgIcon } from "./svg.js";

function createChevronIcon() {
  return createSvgIcon(["m9 18 6-6-6-6"], "collection-item__chevron");
}

export function createCollectionItem(collection) {
  const item = document.createElement("button");
  item.type = "button";
  item.classList.add("collection-item");
  item.dataset.collectionId = collection.id;

  const text = document.createElement("div");
  text.classList.add("collection-item__text");

  const title = document.createElement("div");
  title.classList.add("collection-item__title");
  title.textContent = collection.name;

  const meta = document.createElement("div");
  meta.classList.add("collection-item__meta");
  meta.textContent = `${collection.words.length} words`;

  text.appendChild(title);
  text.appendChild(meta);

  const chevron = createChevronIcon();

  item.appendChild(text);
  item.appendChild(chevron);

  return item;
}