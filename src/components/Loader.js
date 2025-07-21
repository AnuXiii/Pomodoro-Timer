function Loader(parent, isLoading = false) {
	const existingLoader = parent.querySelector(".loader");

	if (!isLoading) {
		existingLoader ? existingLoader.remove() : "";
		parent.classList.remove("pointer-events-none");
		return;
	}

	if (existingLoader) return;

	const loader = document.createElement("div");
	loader.className = "loader absolute inset-0 bg-black/70 rounded-xl flex justify-center items-center z-101";
	loader.innerHTML = `<div class="spin animate-spin rounded-full w-6 h-6 border-2 border-solid border-l-transparent border-primary"></div>`;

	const computedStyle = window.getComputedStyle(parent).position;
	if (computedStyle !== "relative" && computedStyle !== "absolute") {
		parent.style.position = "relative";
	}

	parent.appendChild(loader);
	parent.classList.add("pointer-events-none");
}

export default Loader;
