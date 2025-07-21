import Toastify from "toastify-js";

function toast(msg, type, canPlay, yPos = "top", xPos = "left") {
	if (canPlay === "play") {
		new Audio("/songs/1.mp3").play();
	}

	Toastify({
		text: msg,
		duration: 3000,
		gravity: yPos,
		position: xPos,
		className: type,
		//   onClick: function(){} // Callback after click
	}).showToast();
}

export default toast;
