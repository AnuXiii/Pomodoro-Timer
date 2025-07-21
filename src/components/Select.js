import songs from "../data";
import { hideWithAnimation, showWithAnimation } from "../utils/animationUtils";
import { settings } from "../utils/settings";

class Select extends HTMLElement {
	#isOpen = false;

	connectedCallback() {
		const id = this.dataset.id || null;
		const placeholder = this.dataset.placeholder || "";

		let options = [];

		try {
			options = JSON.parse(this.dataset.options) || [...songs];
		} catch (error) {
			options = [...songs];
		}

		this.renderSelectBox(id, placeholder, options);
		this.init();
	}

	renderSelectBox(id, placeholder, options) {
		this.innerHTML = /*html*/ `
            <div data-select="${id}" class="c-select relative z-50">
                <div class="display">
                    <button class="w-[144px] px-2 py-1 flex gap-2 justify-between items-center bg-neutral-200 rounded-lg border border-solid border-black/10 dark:bg-neutral-700 dark:border-white/10 select-toggler">
                        <span class="text-nowrap text-ellipsis overflow-hidden text-lg text-black/70 dark:text-white/80 duration-200 ease-custom hover:opacity-80 placeholder">${
													songs[settings.notifications.alarmSelected - 1].name || placeholder
												}</span>
                        <svg class="icon-svg icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                </div>
                <div class="options shadow-lg overflow-y-auto max-h-36 w-36 absolute top-[110%] right-0 bg-neutral-100 rounded-lg border border-solid border-black/10 dark:bg-neutral-800 dark:border-white/10" hidden>
                    ${options
											.map(
												(opt) => `
                                                <li>
                                                    <button aria-label="select item ${opt.id}" title="select ${opt.id}" class="duration-200 ease-custom w-full text-left text-black/70 py-2 pl-3 dark:text-white/80 hover:bg-neutral-200 dark:hover:bg-neutral-700" data-value="${opt.id}" data-song="${opt.url}">
                                                        ${opt.name}
                                                    </button>
                                                </li>
                        `,
											)
											.join("")}
                </div>
                <input name="${id}" id="${id}" value="${
									settings.notifications.alarmSelected || 1
								}" class="select-input" hidden/>
            </div>
        `;
	}

	init() {
		const selectTogglerBtn = this.querySelector(".select-toggler");
		const placeholder = this.querySelector(".placeholder");
		const icon = this.querySelector(".icon");
		const options = this.querySelector(".options");
		const selectInput = this.querySelector(".select-input");

		const dropdownToggler = () => {
			if (!this.#isOpen) {
				icon.classList.add("rotate-180");
				showWithAnimation(options, "fade-in", "fade-out");
				this.#isOpen = true;
			} else {
				icon.classList.remove("rotate-180");
				hideWithAnimation(options, "fade-in", "fade-out");
				this.#isOpen = false;
			}
		};

		const optionSelector = (e) => {
			const button = e.target.closest("button");
			let newAudio = new Audio();

			if (!button) return;
			newAudio.src = button.dataset.song;
			placeholder.textContent = button.textContent;
			selectInput.value = button.dataset.value;
			selectInput.dispatchEvent(new Event("change", { bubbles: true }));

			newAudio.addEventListener("timeupdate", () => {
				if (newAudio.currentTime > 0.6) {
					newAudio.currentTime = 0;
					newAudio.pause();
				}
			});

			newAudio.play();
			dropdownToggler();
		};

		selectTogglerBtn.addEventListener("click", dropdownToggler);
		options.addEventListener("click", optionSelector);

		document.addEventListener("click", (e) => {
			if (this.#isOpen && !e.target.closest(".c-select")) {
				dropdownToggler();
			}
		});
	}
}

customElements.define("c-select", Select);

export default Select;
