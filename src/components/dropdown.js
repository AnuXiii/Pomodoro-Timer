import { setTheme } from "../theme/theme";
import { showWithAnimation, hideWithAnimation } from "../utils/animationUtils";

function dropDownHandler(toggler, dropdown, handler = {}) {
	let isOpen = false;

	const toggleBtn = document.querySelector(toggler);
	const dropDownBox = document.querySelector(dropdown);

	if (!toggleBtn || !dropDownBox) return;

	const toggleDropdown = () => {
		if (!isOpen) {
			showWithAnimation(dropDownBox, "fade-in", "fade-out");
			toggleBtn.classList.add("active");
			isOpen = true;
		} else {
			hideWithAnimation(dropDownBox, "fade-in", "fade-out");
			toggleBtn.classList.remove("active");
			isOpen = false;
		}
	};

	const handleClickOutside = (e) => {
		if (isOpen && !e.target.closest(`${toggler}`) && !e.target.closest(`${dropdown}`)) toggleDropdown();
	};

	const handleClickOption = (e) => {
		const btn = e.target.closest("button");
		if (!btn) return;

		const value = btn.dataset.value;
		if (handler.onSelect) handler.onSelect(value);

		toggleDropdown();
	};

	toggleBtn.addEventListener("click", toggleDropdown);
	dropDownBox.addEventListener("click", handleClickOption);
	document.addEventListener("click", handleClickOutside);

	return {
		close: () => isOpen && toggleDropdown(),
		open: () => !isOpen && toggleDropdown(),
		isOpen: () => isOpen,
	};
}

// usage for dropDown handler
dropDownHandler("#toggle-dropdown", ".dropdown", {
	onSelect: (value) => {
		setTheme(value);
	},
});
