import "./components/Header";
import "./components/dropdown";
import "./utils/pomodoroDisplay";
import "./utils/timer";
import "./utils/settingsControl";
import "./components/Select";
import "./utils/notification";
import "./utils/alarm";
import "./utils/settingsLoader";

import { loadTheme } from "./theme/theme";

window.addEventListener("load", () => {
	loadTheme();
});
