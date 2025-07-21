import toast from "../components/Toast";

const fullscreenBtn = document.getElementById("toggle-fullscreen");
const minimizeBtn = document.getElementById("minimize");
const header = document.querySelector(".header");
const headerHeight = window.getComputedStyle(header).height;
let isFullscreen = false;

fullscreenBtn.addEventListener("click", fullScreenHandler);

function fullScreenHandler() {
	if (!isFullscreen) {
		header.style.height = 0;
		header.classList.add("overflow-hidden");
		toast("Press ESC for back to default", "bg-gray", "no-play", "top", "center");
		isFullscreen = true;
	}
}

document.addEventListener("keydown", exitFullScreenHandler);

function exitFullScreenHandler(e) {
	if (e.key.toLowerCase() === "escape") {
		header.classList.remove("overflow-hidden");
		header.style.height = headerHeight;
		isFullscreen = false;
	}
}

minimizeBtn.addEventListener("click", pictureInPictureHandler);

async function pictureInPictureHandler() {
	if (!("documentPictureInPicture" in window)) return;

	const pipWindow = await window.documentPictureInPicture.requestWindow({ width: 300, height: 415 });

	// copy root
	const app = document.documentElement;
	const appClone = app.cloneNode(true);

	// add styles
	const styles = document.createElement("link");
	styles.rel = "stylesheet";
	styles.href = app.querySelector('[rel="stylesheet"]').href;

	// add to body
	appClone.querySelector("c-header").hidden = true;
	appClone.querySelector(".main").style.padding = "0";
	pipWindow.document.head.append(styles);
	pipWindow.document.body.append(appClone);

	// add script
	const script = document.createElement("script");
	script.type = "module";
	script.src = app.querySelector('[type="module"]').href;

	// append to pipWindow body
	pipWindow.document.body.append(script);
}
