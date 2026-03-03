const STORAGE_KEY = "flimo.collections";

export function getCollections() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function saveCollections(collections) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
}

export function addCollection({ name, words }) {
  const collections = getCollections();

  const collection = {
    id: crypto.randomUUID(),
    name,
    words,
    createdAt: new Date().toISOString(),
  };

  collections.unshift(collection);
  saveCollections(collections);

  return collection;
}