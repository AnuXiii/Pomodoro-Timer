import { settings, state } from "./settings";
import { hideWithAnimation, showWithAnimation } from "./animationUtils";
import { timeConvertor } from "./ui";

window.addEventListener("load", () => {
	const mobileDevices = ["iPhone", "Android", "iPad"];
	const isMobile = mobileDevices.some((mobile) => navigator.userAgent.includes(mobile));
	if (isMobile) tracker.hidden = true;
});

// Maximum Time
const MAX_MINUTE = 99;

const openSettingsBtn = document.getElementById("open-settings");

// select pomodoro mdoal and buttons
const pomodoro = document.querySelector(".pomodoro");
const pomodoroModal = document.querySelector(".pomodoro-modal");
const clsoeModalBtn = document.getElementById("close-modal");
const backPrevBtn = document.getElementById("back-previeus");
const pomodoroModalTitle = document.getElementById("pomodoro-modal-title");

// pomodoro intro
const modalIntro = pomodoroModal.querySelector(".modal-intro");

// select pomodoro modal navigation elements
const modalNav = document.querySelector(".pomodoro-modal--nav");
const modalNavBtn = modalNav.querySelector("[data-nav]");
const tracker = modalNav.querySelector(".tracker");

// pomodoro modes times
const pomodoroModesTimeContainer = document.querySelector(".pomodoro-modal--modes");

openSettingsBtn.addEventListener("click", () => {
	showWithAnimation(pomodoroModal, "fade-in", "fade-out");
});

clsoeModalBtn.addEventListener("click", () => {
	hideWithAnimation(pomodoroModal, "fade-in", "fade-out");
});

// control mouse hover on nav buttons
modalNav.addEventListener("mousemove", (e) => modalNavTracker(e));

function modalNavTracker(e) {
	const rect = modalNavBtn.getBoundingClientRect();
	const mouseX = e.clientX;
	const offect = mouseX - rect.x - 80;
	tracker.style.width = rect.width + "px";
	tracker.style.left = offect + "px";
	tracker.classList.add("on");
}

modalNav.onmouseleave = () => {
	tracker.classList.remove("on");
};

// handle switch between tabs on nav
modalNav.addEventListener("click", switchTab);

function switchTab(e) {
	const target = e.target.closest("button");

	if (!target) return;

	pomodoro.classList.remove("overflow-hidden");

	document.querySelectorAll("[data-nav]").forEach((nav) => nav.classList.remove("active"));
	document.querySelector(`[data-nav="${target.dataset.nav}"]`).classList.add("active");

	document.querySelectorAll("[data-tab]").forEach((tab) => (tab.hidden = true));
	document.querySelector(`[data-tab="${target.dataset.nav}"]`).hidden = false;
}

// handle show pomodoro mode timer set
pomodoroModesTimeContainer.addEventListener("click", showSetTimeModal);

function showSetTimeModal(e) {
	const target = e.target.closest("li");
	if (!target) return;

	const targetPage = document.querySelector(`[data-mode-time="${target.dataset.mode}"]`);

	switchHandler(modalIntro, targetPage, false, true, true);
	customizeTimeHandler(targetPage);
}

// handle when click to back previous page
backPrevBtn.addEventListener("click", backToPrev);

function backToPrev() {
	const targetPage = document.querySelector(`.move-right`);
	switchHandler(targetPage, modalIntro, true, false, false);
}

function switchHandler(targetToHide, targetToDelay, backState, closeState, titleState) {
	hideWithAnimation(targetToHide, "move-right", "move-left");
	setTimeout(() => showWithAnimation(targetToDelay, "move-right", "move-left"), 200);
	backPrevBtn.parentElement.hidden = backState;
	clsoeModalBtn.parentElement.hidden = closeState;
	pomodoroModalTitle.hidden = titleState;
	pomodoro.classList.add("overflow-hidden");
}

// attach event to set mode timer increase and reduce buttons
function syncDuration(modeName, value) {
	settings.modeTimes[modeName] = value;

	document.querySelector(`[data-mode-value="${modeName}"]`).textContent = value;

	if (document.querySelector(`[current-mode="${modeName}"]`)) {
		state.timeLeft = value * 60;
		document.querySelector(`[current-mode="${modeName}"]`).textContent = timeConvertor(value * 60);
	}
}

function customizeTimeHandler(page) {
	if (page.dataset.attached === "true") return;

	const modeName = page.dataset.modeTime;
	const numberInput = page.querySelector(`[name="num-input"]`);

	page.addEventListener("click", (e) => {
		const target = e.target;

		if (target.closest(".incrase")) {
			increase(numberInput, modeName);
		} else if (target.closest(".reduce")) {
			reduce(numberInput, modeName);
		}
	});

	numberInput.addEventListener("input", () => numberInputController(numberInput, modeName));

	page.dataset.attached = "true";
}

function numberInputController(input, modeName) {
	let value = Number(input.value);

	if (value > MAX_MINUTE) value = MAX_MINUTE;
	if (!value) value = 1;

	input.value = value;
	syncDuration(modeName, value);
}

function increase(input, modeName) {
	let value = Math.min(99, Number(input.value) + 1);
	input.value = value;
	syncDuration(modeName, value);
}

function reduce(input, modeName) {
	let value = Math.max(1, Number(input.value) - 1);
	input.value = value;
	syncDuration(modeName, value);
}

export default MAX_MINUTE;
