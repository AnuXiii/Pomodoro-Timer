function showWithAnimation(element, showClass = "fade-in", hideClass = "fade-out") {
	element.classList.remove(hideClass);
	element.classList.add(showClass);
	element.hidden = false;

	element.addEventListener(
		"animationend",
		() => {
			element.hidden = false;
		},
		{ once: true }
	);
}

function hideWithAnimation(element, showClass = "fade-in", hideClass = "fade-out") {
	element.classList.remove(showClass);
	element.classList.add(hideClass);

	element.addEventListener(
		"animationend",
		() => {
			element.hidden = true;
		},
		{ once: true }
	);
}

export { showWithAnimation, hideWithAnimation };
