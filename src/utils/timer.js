import { sendNotif } from "./notification";
import { state, settings } from "./settings";
import { currentModeIndex, timeConvertor, updateUi } from "./ui";
import { alarm } from "./alarm";

const startTimerBtn = document.getElementById("start-timer");
const resetTimerBtn = document.getElementById("reset");

startTimerBtn.addEventListener("click", startPomodoro);
document.addEventListener("keyup", (e) => (e.key === " " ? startPomodoro() : ""));

function startPomodoro() {
	if (!state.isRunning) {
		startTimer();
		startTimerBtn.textContent = "STOP";
	} else {
		stopTimer();
		startTimerBtn.textContent = "RESUME";
		document.title = "Resume";
	}
}

async function startTimer() {
	if (state.isRunning) return;

	state.isRunning = true;

	state.timer = setInterval(() => {
		if (state.timeLeft <= 0) {
			// show notifications if enabled in settings
			alarm();
			sendNotif();

			// reset all of progress
			endedSession();
			return;
		}

		state.timeLeft--;
		updateUi(currentModeIndex, state.mode);
		updateCircle();

		document.title = `${timeConvertor(state.timeLeft)} - ${state.mode.charAt(0).toUpperCase() + state.mode.slice(1)}`;
	}, 1000);
}

function stopTimer() {
	clearInterval(state.timer);
	state.isRunning = false;
	startTimerBtn.textContent = "RESUME";
}

function updateCircle() {
	const circle = document.getElementById("progress");
	const radius = 90;
	const circumference = 2 * Math.PI * radius;

	const percent = state.timeLeft / (settings.modeTimes[state.mode] * 60);
	const offset = circumference * (1 - percent);

	circle.style.strokeDashoffset = offset;
}

resetTimerBtn.addEventListener("click", () => {
	document.title = "Pomodoro Timer";
	state.timeLeft = settings.modeTimes[state.mode] * 60;
	endedSession();
});

function endedSession() {
	startTimerBtn.textContent = "START";
	state.isRunning = false;
	state.timeLeft = settings.modeTimes[state.mode] * 60;
	clearInterval(state.timer);
	updateUi(currentModeIndex, state.mode);
	updateCircle();
}

export { updateCircle };
