import Loader from "../components/Loader";
import toast from "../components/Toast";
import { settings } from "./settings";

let dbPrommise = null;

const DB_NAME = "songDB";
const DB_VERSION = 1;
const STORE_NAME = "songs";

const alarmSongSelectorContainer = document.querySelector('[data-id="alarm-select"]');
const customSongContainer = document.querySelector(".custom-song-wrapper");
const customSongInput = document.getElementById("custom-song");
const uploadSongText = document.getElementById("song-name");
const deleteCustomSongBtn = document.getElementById("delete-song");

function openDB() {
	if (dbPrommise) return dbPrommise;

	dbPrommise = new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onupgradeneeded = (e) => {
			const db = e.target.result;
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME);
			}
		};

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject("Failed to open db");
	});

	return dbPrommise;
}

async function getStore(action) {
	const db = await openDB();
	const tx = db.transaction(STORE_NAME, action);
	const store = tx.objectStore(STORE_NAME);

	return { store, tx };
}

async function saveSong(blob) {
	const { store, tx } = await getStore("readwrite");
	store.put(blob, "customSong");
	return tx.oncomplete;
}

async function getSong() {
	const { store } = await getStore("readonly");
	return new Promise((resolve, reject) => {
		const request = store.get("customSong");
		request.onsuccess = () => resolve(request.result || null);
		request.onerror = () => reject("Failed to get song");
	});
}

async function deleteSong() {
	const { store, tx } = await getStore("readwrite");
	store.delete("customSong");
	return tx.oncomplete;
}

/* *********************************************************** */

customSongInput.addEventListener("change", customAlarmHandler);

async function customAlarmHandler(e) {
	const file = e.target.files[0];

	if (!file) return;

	Loader(customSongContainer, true);

	try {
		await saveSong(file);
		//
		const fileName = file.name;
		uploadSongText.textContent = fileName;
		settings.notifications.customSongName = fileName;
		alarmSongSelectorContainer.classList.add("disabled");
		//
		toast("Custom alarm uploaded", "bg-blue-500", "play");
	} catch (error) {
		toast("Can't upload song", "bg-rose-500");
	} finally {
		Loader(customSongContainer, false);
	}
}

deleteCustomSongBtn.addEventListener("click", deleteSongHandler);

async function deleteSongHandler() {
	const { store } = await getStore("readonly");
	const request = store.get("customSong");

	request.onsuccess = async () => {
		if (request.result) {
			await deleteSong();
			customSongInput.value = "";
			uploadSongText.textContent = "Select";
			settings.notifications.customSongName = "";
			alarmSongSelectorContainer.classList.remove("disabled");
			toast("Song deleted", "bg-blue-500", "play");
			return;
		}

		toast("Song not found", "bg-rose-500", "play");
	};

	request.onerror = () => {
		toast("Error in deleting song");
	};
}

export { getSong };
