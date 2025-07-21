const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

function loadTheme() {
	const theme = localStorage.getItem("theme") || "system";

	switch (theme) {
		case "dark":
			setTheme("dark");
			break;
		case "light":
			setTheme("light");
			break;
		case "system":
			setTheme("system");
			break;
	}
}

function setTheme(theme) {
	document.documentElement.classList.remove("dark", "light");
	document.querySelector(`#toggle-dropdown .active`).classList.remove("active");
	let icon = `[data-theme="${theme}"]`;

	switch (theme) {
		case "dark":
			setThemeMode("dark", icon);
			break;
		case "light":
			setThemeMode("light", icon);
			break;
		case "system":
			setThemeMode("system", icon);
			break;
	}
}

function setThemeMode(mode, icon) {
	document.documentElement.classList.add(mode == "system" ? isDark : mode);
	document.querySelector(icon).classList.add("active");
	localStorage.setItem("theme", mode);
}

export { setTheme, loadTheme };
