import songs from "../data";
import { settings } from "./settings";
import toast from "../components/Toast";
import { hideWithAnimation, showWithAnimation } from "./animationUtils";
import { getSong } from "./customAlarm";

let alarmAudio;

const alarmCheckBox = document.getElementById("active-alarm");
const alarmModal = document.getElementById("alarm-modal");
const alarmModalDismissBtn = document.getElementById("dismiss-alarm");
const alarmModalStopBtn = document.getElementById("stop-alarm");

//
alarmCheckBox.addEventListener("change", alarmChecker);

function alarmChecker() {
	if (alarmCheckBox.checked) {
		settings.notifications.alarmEnabled = true;
		toast("Alarms activated", "bg-blue-500", "play");
	} else {
		settings.notifications.alarmEnabled = false;
	}
}

customElements.whenDefined("c-select").then(() => {
	const alarmSelectInput = document.getElementById("alarm-select");
	alarmSelectInput.addEventListener("change", getAlarmSong);
});

async function getAlarmSong() {
	const blob = await getSong();

	if (blob) {
		return { url: URL.createObjectURL(blob) };
	}

	const selectedIndex = Number(document.getElementById("alarm-select").value);
	settings.notifications.alarmSelected = selectedIndex;
	return selectedIndex ? songs[selectedIndex - 1] : {};
}

async function alarm() {
	if (!settings.notifications.alarmEnabled) return;

	showWithAnimation(alarmModal, "move-right", "move-left");

	const song = await getAlarmSong();

	if (!song.url) {
		toast("No alarm sound selected!", "bg-rose-500", "play");
		hideWithAnimation(alarmModal, "move-right", "move-left");
		return;
	}

	resetAlarm();

	alarmAudio = new Audio(song.url);
	alarmAudio.play();

	if ("vibrate" in navigator) navigator.vibrate([500, 300, 500]);

	document.title = `Time is up! ⏳`;
}

alarmModalStopBtn.addEventListener("click", stopAlarm);

function stopAlarm() {
	resetAlarm();

	hideWithAnimation(alarmModal, "move-right", "move-left");
	document.title = "Pomodoro Timer";
}

alarmModalDismissBtn.addEventListener("click", () => {
	hideWithAnimation(alarmModal, "move-right", "move-left");
	document.title = "Pomodoro Timer";
});

function resetAlarm() {
	if (alarmAudio) {
		alarmAudio.pause();
		alarmAudio.currentTime = 0;
		alarmAudio.src = "";
		alarmAudio.load();
	}
}

export { alarm };
