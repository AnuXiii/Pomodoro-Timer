# Pomodoro Timer

A modern, customizable Pomodoro Timer web application built with Vite, vanilla JavaScript, and Tailwind CSS. This app helps users manage their time using the Pomodoro Technique, featuring customizable session durations, notification and alarm options, and a responsive, themeable UI.

> **Note:**  
> This project is created for training and learning purposes. The task idea is inspired by the [roadmap.sh](https://roadmap.sh/projects/pomodoro-timer) website.

## Features

- **Pomodoro, Short Break, Long Break Modes**: Easily switch between focus and break sessions.
- **Customizable Durations**: Set your own durations for each mode.
- **Notifications & Alarms**: Get notified when a session ends, with a choice of alarm sounds or upload custom sounds
- **Theme Support**: Switch between light, dark, and system themes.
- **Responsive Design**: Works well on desktop and mobile devices.
- **Picture-in-Picture & Fullscreen**: Minimize or maximize the timer for distraction-free focus.
- **Persistent Settings**: All preferences are saved in local storage and indexedDB

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/pomodoro-timer.git
   cd pomodoro-timer
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```sh
npm run build
```

## Development Roadmap

### v1.0 (Current)

- [x] Basic Pomodoro timer with three modes
- [x] Customizable session durations
- [x] Notification and alarm support
- [x] Theme switching (light/dark/system)
- [x] Responsive UI
- [x] Picture-in-picture and fullscreen support
- [x] Persistent settings

### v1.1

- [ ] Add statistics and session history tracking
- [ ] Add pause/resume sound for alarms
- [ ] Improve accessibility (ARIA roles, keyboard navigation)
- [ ] Add more alarm sounds and allow custom uploads

### v1.2

- [ ] Add multi-language support (i18n)
- [ ] Add user accounts and cloud sync (optional)
- [ ] Add task management integration

### v2.0

- [ ] Mobile app (PWA or native)
- [ ] Advanced analytics and productivity insights
- [ ] Integration with calendar and productivity tools

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

MIT License

---

**Project Description:**  
Pomodoro Timer is a productivity tool that helps users manage their work and break intervals using the Pomodoro Technique. With a clean, modern interface and customizable features, it aims to make time management simple and effective for everyone.

This project is intended for training purposes, and the task idea is based on a suggestion
