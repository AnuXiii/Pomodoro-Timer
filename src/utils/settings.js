import toast from "../components/Toast";

const state = {
	mode: "focus",
	timeLeft: 0,
	timer: null,
	isRunning: false,
};

const defaultSettings = {
	modeTimes: {
		focus: 25,
		short: 5,
		long: 15,
	},
	notifications: {
		enabled: false,
		alarmEnabled: false,
		alarmSelected: 1,
		repeat: 1,
	},
};

function loadSettings() {
	try {
		const saved = localStorage.getItem("settings");
		return saved ? JSON.parse(saved) : structuredClone(defaultSettings);
	} catch {
		toast("default settings loaded", "bg-blue-500", "play");
		return structuredClone(defaultSettings);
	}
}

function saveSettings(settings) {
	localStorage.setItem("settings", JSON.stringify(settings));
}

function reactiveSettings(obj, onChange) {
	const handler = {
		get(target, prop) {
			const value = target[prop];
			if (typeof value === "object" && value !== null) {
				return new Proxy(value, handler);
			}
			return value;
		},
		set(target, prop, value) {
			target[prop] = value;
			onChange();
			return true;
		},
	};
	return new Proxy(obj, handler);
}

let settings = reactiveSettings(loadSettings(), () => {
	saveSettings(settings);
});

export { state, settings, defaultSettings };
