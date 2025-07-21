import toast from "../components/Toast";
import { settings, state } from "./settings";

const notifCheckBox = document.getElementById("send-notification");

notifCheckBox.addEventListener("change", notificationHandler);

async function notificationHandler() {
	if (!("Notification" in window)) return;

	if (notifCheckBox.checked) {
		const permission = await Notification.requestPermission();

		if (permission === "granted") {
			toast("Notifications activated", "bg-blue-500", "play");
			settings.notifications.enabled = true;
		} else {
			toast("Notification permission denied", "bg-rose-500", "play");
			settings.notifications.enabled = true;
		}
	} else {
		settings.notifications.enabled = false;
	}
}

function sendNotif() {
	if (!settings.notifications.enabled) {
		toast("Enable notifications in settings", "bg-rose-500", "play");
		return;
	}

	new Notification(`${state.mode} session ended`, {
		body: `Go another ${state.mode} session`,
		icon: "/fav.svg",
	});
}

export { sendNotif };
