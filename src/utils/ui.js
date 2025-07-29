import { state, settings } from "./settings";
import { updateCircle } from "./timer";

const timerBox = document.querySelector(".timer");
const timerModesIcon = document.querySelector(".timer-mode--icon");
const timerModeText = document.querySelector(".timer-mode--text");
const timerNumberText = document.getElementById("time");

const modes = ["focus", "short", "long"];
let currentModeIndex = 0;

timerBox.addEventListener("click", switchMode);
timerBox.addEventListener("keyup", (e) => (e.key === "Enter" || " " ? switchMode() : ""));

// Initialize time left in first load
state.timeLeft = settings.modeTimes[state.mode] * 60;

function switchMode() {
	if (state.isRunning) return;

	currentModeIndex = (currentModeIndex + 1) % modes.length;
	state.mode = modes[currentModeIndex];

	state.timeLeft = settings.modeTimes[state.mode] * 60;

	updateUi(currentModeIndex, state.mode);
	updateCircle();
}

function padding(num) {
	return num.toString().padStart(2, "0");
}

function timeConvertor(num) {
	const minutes = Math.floor(num / 60);
	const seconds = num % 60;

	return `${padding(minutes)}:${padding(seconds)}`;
}

function updateUi(index, mode) {
	const catchedResult = timeConvertor(state.timeLeft);

	timerModesIcon.querySelector(".active").classList.remove("active");
	timerModesIcon.querySelector(`svg:nth-child(${index + 1})`).classList.add("active");

	timerModeText.querySelector(`:not([hidden])`).hidden = true;
	timerModeText.querySelector(`[data-mode="${mode}"]`).hidden = false;

	timerNumberText.setAttribute("current-mode", mode);
	timerNumberText.textContent = catchedResult;
}

export { currentModeIndex, updateUi, timeConvertor };
