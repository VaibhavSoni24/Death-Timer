# ⏱️ Death Timer – Futuristic Timer App

A sleek, futuristic web-based timer application with three distinct countdown modes, animated UI effects, and dark/light theme support.

## 🚀 Features

- **Three Timer Modes**
  - 🕐 **Normal Timer** – A classic countdown timer (hours, minutes, seconds) with start/pause/reset controls and a +1 minute shortcut.
  - 📅 **Long Timer** – Count down to a specific future date and time, displayed in years, months, days, hours, minutes, and seconds with a visual progress bar.
  - 💀 **Death Timer** – Enter your date of birth to see an estimated life countdown based on a randomly generated lifespan between 65–85 years.

- **Dark / Light Theme** – Toggle between a dark neon-cyan aesthetic and a clean light mode.
- **Audio Notifications** – Plays a notification sound via the Web Audio API when any timer finishes.
- **Browser Notifications** – Requests permission to send system notifications when a countdown ends.
- **Keyboard Shortcuts** (Normal Timer)
  - `Space` – Start / Pause
  - `R` – Reset
  - `A` – Add 1 minute
- **Animated Background** – Moving grid overlay and floating particle effects.
- **Fully Responsive** – Optimised for desktop, tablet, and mobile screens.

## 📁 Project Structure

```
Death-Timer/
├── index.html      # Main page – timer type selection & configuration
├── normal.html     # Normal countdown timer
├── long.html       # Long-range countdown to a future date
├── death.html      # Life countdown (Death Timer)
├── script.js       # Main app logic (timer selection, validation, navigation)
└── style.css       # Shared styles and theme variables
```

## 🛠️ Getting Started

No build step or dependencies are required – this is a pure HTML/CSS/JavaScript application.

1. **Clone the repository**
   ```bash
   git clone https://github.com/VaibhavSoni24/Death-Timer.git
   cd Death-Timer
   ```

2. **Open in a browser**
   Simply open `index.html` in any modern web browser:
   ```bash
   open index.html        # macOS
   xdg-open index.html    # Linux
   start index.html       # Windows
   ```
   Or serve it locally with any static file server:
   ```bash
   npx serve .
   ```

## 🎮 Usage

1. Open `index.html`.
2. Choose a timer mode by clicking one of the three buttons:
   - **Normal Timer** – Enter hours, minutes, and seconds, then click **INITIATE TIMER**.
   - **Long Timer** – Enter a target year, month, date, hour, minute, and second, then click **INITIATE TIMER**.
   - **Death Timer** – Enter your birth year, month, and day, then click **INITIATE TIMER**. An estimated lifespan (65–85 years) is randomly generated.
3. Use the controls on the timer page to start, pause, or reset (Normal Timer), or simply watch the countdown (Long / Death Timer).
4. Navigate back to the main page at any time using the **← Back** button.

## 🖥️ Browser Compatibility

The app uses standard modern web APIs:

| Feature | API Used |
|---|---|
| Timer countdown | `setInterval` |
| Data persistence | `localStorage` |
| Audio alerts | Web Audio API |
| System notifications | Notifications API |
| Styling | CSS Custom Properties |

Works best in the latest versions of Chrome, Firefox, Edge, and Safari.

## 📄 License

This project is open source. See the repository for details.
