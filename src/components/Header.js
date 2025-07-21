class Header extends HTMLElement {
	connectedCallback() {
		this.innerHTML = /*html*/ `
			<header
				class="header z-20 bg-neutral-200 border-b border-solid border-black/10 dark:bg-neutral-800 dark:border-white/10 duration-200 ease-custom h-max md:h-22">
				<div class="container py-4">
					<div class="flex justify-between items-center gap-4">
						<div class="brand">
							<h1 class="text-2xl font-bold md:text-3xl">Pomodoro <span class="text-accent">Timer</span></h1>
						</div>
						<nav
							role="navigation"
							class="flex justify-between items-center gap-4">
							<li
								role="listbox"
								class="dropdown-holder">
								<button
									role="button"
									aria-label="change theme"
									title="change theme"
									class="text-xl rounded-lg p-3 border border-solid border-black/10 dark:border-white/10 hover:bg-primary hover:text-white duration-200 ease-custom w-12 h-12 text-center flex justify-center"
									id="toggle-dropdown"
									data-toggler>
                                    <svg data-theme="light" class="icon-svg active" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
									<svg data-theme="dark" class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
									<svg data-theme="system" class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-monitor-icon lucide-monitor"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
								</button>
								<ul
									role="list"
									class="dropdown"
									hidden>
									<li
										role="listitem"
										class="dropdown-item">
										<button
											role="button"
											aria-label="dark theme"
											title="dark theme"
											class="dropdown-btn"
											data-value="dark">
                                            <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                                            </button>
                                            </li>
                                            <li
                                            role="listitem"
                                            class="dropdown-item">
                                            <button
											role="button"
											aria-label="light theme"
											title="light theme"
											class="dropdown-btn"
											data-value="light">
										    <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
										</button>
									</li>
									<li
										role="listitem"
										class="dropdown-item">
										<button
											role="button"
											aria-label="system theme"
											title="system theme"
											class="dropdown-btn"
											data-value="system">
											<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-monitor-icon lucide-monitor"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
										</button>
									</li>
								</ul>
							</li>
							<li role="listbox">
								<button
									role="button"
									aria-label="minimize"
									title="minimize"
									class="text-xl rounded-lg p-3 border border-solid border-black/10 dark:border-white/10 hover:bg-primary hover:text-white duration-200 ease-custom w-12 h-12 text-center flex justify-center"
									id="minimize">
                                    <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-picture-in-picture2-icon lucide-picture-in-picture-2"><path d="M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4"/><rect width="10" height="7" x="12" y="13" rx="2"/></svg>
								</button>
							</li>
							<li role="listbox" class="hidden md:block">
								<button
									role="button"
									aria-label="fullscreen"
									title="fullscreen"
									class="text-xl rounded-lg p-3 border border-solid border-black/10 dark:border-white/10 hover:bg-primary hover:text-white duration-200 ease-custom w-12 h-12 text-center flex justify-center"
									id="toggle-fullscreen">
									<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-expand-icon lucide-expand"><path d="m15 15 6 6"/><path d="m15 9 6-6"/><path d="M21 16v5h-5"/><path d="M21 8V3h-5"/><path d="M3 16v5h5"/><path d="m3 21 6-6"/><path d="M3 8V3h5"/><path d="M9 9 3 3"/></svg>
								</button>
							</li>
						</nav>
					</div>
				</div>
			</header>
        `;
	}
}

customElements.define("c-header", Header);
