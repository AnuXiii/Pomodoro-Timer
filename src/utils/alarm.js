import songs from "../data";
import { settings } from "./settings";
import toast from "../components/Toast";
import MAX_MINUTE from "./settingsControl";
import { hideWithAnimation, showWithAnimation } from "./animationUtils";

let alarmRepeatCount = 0;
let alarmStopped = false;
let alarmAudio;

// Move onEnded outside so it can be referenced in both alarm() and stopAlarm()
function onEnded() {
	if (alarmStopped) return;

	alarmRepeatCount--;

	if (alarmRepeatCount > 0) {
		alarmAudio.currentTime = 0;
		alarmAudio.play();
		navigator.vibrate([500, 300, 500]);
	} else {
		alarmRepeatCount = settings.notifications.repeat;
		hideWithAnimation(alarmModal, "move-right", "move-left");
		document.title = "Pomodoro Timer";
		alarmAudio.removeEventListener("ended", onEnded);
	}
}

const alarmCheckBox = document.getElementById("active-alarm");
const alarmRepeatCountInput = document.getElementById("alarm-repeat-count");
const alarmModal = document.getElementById("alarm-modal");
const alarmModalDismissBtn = document.getElementById("dismiss-alarm");
const alarmModalStopBtn = document.getElementById("stop-alarm");

alarmCheckBox.addEventListener("change", alarmChecker);

function alarmChecker() {
	if (alarmCheckBox.checked) {
		settings.notifications.alarmEnabled = true;
		toast("Alarms activated", "bg-blue-500", "play");
	} else {
		settings.notifications.alarmEnabled = false;
	}
}

alarmRepeatCountInput.addEventListener("input", alarmRepeatInputHandler);

function alarmRepeatInputHandler(e) {
	let value = Number(e.target.value);

	if (value < 1) value = 1;
	if (value > MAX_MINUTE) value = MAX_MINUTE;

	if (alarmRepeatCountInput.value !== String(value)) {
		alarmRepeatCountInput.value = value;
	}

	settings.notifications.repeat = value;
}

customElements.whenDefined("c-select").then(() => {
	const alarmSelectInput = document.getElementById("alarm-select");
	alarmSelectInput.addEventListener("change", getAlarmSong);
});

function getAlarmSong() {
	const selectedIndex = Number(document.getElementById("alarm-select").value);
	settings.notifications.alarmSelected = selectedIndex;
	return selectedIndex ? songs[selectedIndex - 1] : {};
}

function alarm() {
	if (!settings.notifications.alarmEnabled) return;

	showWithAnimation(alarmModal, "move-right", "move-left");

	const song = getAlarmSong();
	alarmRepeatCount = settings.notifications.repeat;
	alarmStopped = false;

	if (!song.url) {
		toast("No alarm sound selected!", "bg-red-500", "play");
		hideWithAnimation(alarmModal, "move-right", "move-left");
		return;
	}

	if (alarmAudio) {
		alarmAudio.pause();
		alarmAudio.currentTime = 0;
		alarmAudio.src = "";
		alarmAudio.load(); // For mobile browsers
		alarmAudio.removeEventListener("ended", onEnded);
	}

	alarmAudio = new Audio(song.url);
	alarmAudio.addEventListener("ended", onEnded);
	alarmAudio.play();
	navigator.vibrate([500, 300, 500]);
	document.title = `Time is up! ⏳`;
}

alarmModalStopBtn.addEventListener("click", stopAlarm);

function stopAlarm() {
	alarmStopped = true;

	if (alarmAudio) {
		alarmAudio.pause();
		alarmAudio.currentTime = 0;
		alarmAudio.src = "";
		alarmAudio.load(); // For mobile browsers
		alarmAudio.removeEventListener("ended", onEnded);
	}

	hideWithAnimation(alarmModal, "move-right", "move-left");
	alarmRepeatCount = settings.notifications.repeat;
	document.title = "Pomodoro Timer";
}

alarmModalDismissBtn.addEventListener("click", () => {
	hideWithAnimation(alarmModal, "move-right", "move-left");
});

export { alarm };
