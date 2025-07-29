import toast from "../components/Toast";

const fullscreenBtn = document.getElementById("toggle-fullscreen");
const minimizeBtn = document.getElementById("minimize");
const header = document.querySelector(".header");
const headerHeight = window.getComputedStyle(header).height;
let isFullscreen = false;

fullscreenBtn.addEventListener("click", SetfullScreen);

function SetfullScreen() {
	if (!isFullscreen) {
		header.style.height = 0;
		header.classList.add("overflow-hidden");
		toast("Press ESC for back to default", "bg-gray", "no-play", "top", "center");
		isFullscreen = true;
	}
}

document.addEventListener("keydown", exitFullScreen);

function exitFullScreen(e) {
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

	const app = document.getElementById("app");
	const appClone = app.cloneNode(true);

	// Create style
	const styleLink = document.createElement("link");
	styleLink.rel = "stylesheet";
	styleLink.href = document.querySelector('link[rel="stylesheet"]').href;

	// Create script
	const originalScript = document.querySelector("#test");
	const newScript = document.createElement("script");
	newScript.type = "module";
	newScript.src = originalScript.src;

	// Add custom container for your mini-app
	const miniAppContainer = document.createElement("div");
	miniAppContainer.innerHTML = `<c-header></c-header>`;
	miniAppContainer.append(appClone);
	// OR build your real UI here

	appClone.querySelector(".main").style.padding = "0";
	appClone.querySelector(".main .pomodoro").style.borderRadius = "0";

	// Append to pipWindow
	pipWindow.document.head.appendChild(styleLink);
	pipWindow.document.body.appendChild(miniAppContainer);
	pipWindow.document.body.appendChild(newScript);
}
