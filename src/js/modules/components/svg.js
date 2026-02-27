const ns = "http://www.w3.org/2000/svg";

export function createSvgIcon(paths, className = "icon") {
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.classList.add(className);

  paths.forEach((d) => {
    const path = document.createElementNS(ns, "path");
    path.setAttribute("d", d);
    svg.appendChild(path);
  });

  return svg;
}