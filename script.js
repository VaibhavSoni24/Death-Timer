// Main application controller
class FuturisticTimer {
    constructor() {
        this.currentTimer = 'normal';
        this.estimatedLifespan = 75;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.generateRandomLifespan();
        this.createParticleEffects();
    }

    setupEventListeners() {
        // Timer selection buttons
        const timerBtns = document.querySelectorAll('.timer-btn');
        timerBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.selectTimer(e));
        });

        // Theme toggle
        const themeSwitch = document.getElementById('theme-switch');
        themeSwitch.addEventListener('change', () => this.toggleTheme());

        // Start button
        const startBtn = document.getElementById('start-timer');
        startBtn.addEventListener('click', () => this.startTimer());

        // Input validation
        this.setupInputValidation();

        // Birth date changes for death timer
        const birthInputs = ['birth-year', 'birth-month', 'birth-date'];
        birthInputs.forEach(id => {
            document.getElementById(id).addEventListener('change', () => {
                this.generateRandomLifespan();
            });
        });
    }

    selectTimer(e) {
        const clickedBtn = e.currentTarget;
        const timerType = clickedBtn.dataset.timer;
        
        // Remove active class from all buttons
        document.querySelectorAll('.timer-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        clickedBtn.classList.add('active');
        
        // Hide all input sections
        document.querySelectorAll('.input-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected input section
        document.querySelector(`.${timerType}-inputs`).classList.add('active');
        
        this.currentTimer = timerType;

        // Add click animation
        this.addClickAnimation(clickedBtn);
    }

    addClickAnimation(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    }

    toggleTheme() {
        const body = document.body;
        const themeText = document.querySelector('.theme-text');
        
        if (body.hasAttribute('data-theme')) {
            body.removeAttribute('data-theme');
            themeText.textContent = 'Dark Mode';
        } else {
            body.setAttribute('data-theme', 'light');
            themeText.textContent = 'Light Mode';
        }
    }

    generateRandomLifespan() {
        // Generate random lifespan between 65-85 years
        this.estimatedLifespan = Math.floor(Math.random() * 21) + 65;
        document.getElementById('estimated-lifespan').textContent = this.estimatedLifespan;
    }

    setupInputValidation() {
        // Add real-time validation for all inputs
        const inputs = document.querySelectorAll('.futuristic-input');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => this.validateInput(e));
            input.addEventListener('focus', (e) => this.addInputFocus(e));
            input.addEventListener('blur', (e) => this.removeInputFocus(e));
        });
    }

    validateInput(e) {
        const input = e.target;
        const value = parseInt(input.value);
        const min = parseInt(input.min);
        const max = parseInt(input.max);

        if (value < min) {
            input.value = min;
        } else if (value > max) {
            input.value = max;
        }
    }

    addInputFocus(e) {
        const input = e.target;
        input.style.transform = 'scale(1.02)';
    }

    removeInputFocus(e) {
        const input = e.target;
        input.style.transform = '';
    }

    startTimer() {
        const startBtn = document.getElementById('start-timer');
        
        // Add start animation
        startBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            startBtn.style.transform = '';
        }, 150);

        // Validate inputs based on current timer
        if (!this.validateCurrentInputs()) {
            this.showError('Please fill in all required fields with valid values.');
            return;
        }

        // Store timer data and navigate to appropriate page
        const timerData = this.getTimerData();
        localStorage.setItem('timerData', JSON.stringify(timerData));
        
        // Navigate to appropriate timer page
        switch (this.currentTimer) {
            case 'normal':
                window.location.href = 'normal.html';
                break;
            case 'long':
                window.location.href = 'long.html';
                break;
            case 'death':
                window.location.href = 'death.html';
                break;
        }
    }

    validateCurrentInputs() {
        switch (this.currentTimer) {
            case 'normal':
                return this.validateNormalInputs();
            case 'long':
                return this.validateLongInputs();
            case 'death':
                return this.validateDeathInputs();
            default:
                return false;
        }
    }

    validateNormalInputs() {
        const hours = parseInt(document.getElementById('normal-hours').value) || 0;
        const minutes = parseInt(document.getElementById('normal-minutes').value) || 0;
        const seconds = parseInt(document.getElementById('normal-seconds').value) || 0;
        
        return hours >= 0 && minutes >= 0 && seconds >= 0 && (hours + minutes + seconds) > 0;
    }

    validateLongInputs() {
        const year = parseInt(document.getElementById('long-year').value);
        const month = parseInt(document.getElementById('long-month').value);
        const date = parseInt(document.getElementById('long-date').value);
        const hour = parseInt(document.getElementById('long-hour').value);
        const minute = parseInt(document.getElementById('long-minute').value);
        const second = parseInt(document.getElementById('long-second').value);
        
        const targetDate = new Date(year, month - 1, date, hour, minute, second);
        const now = new Date();
        
        return targetDate > now;
    }

    validateDeathInputs() {
        const year = parseInt(document.getElementById('birth-year').value);
        const month = parseInt(document.getElementById('birth-month').value);
        const date = parseInt(document.getElementById('birth-date').value);
        
        const birthDate = new Date(year, month - 1, date);
        const now = new Date();
        
        return birthDate < now && year >= 1920 && year <= 2025;
    }

    getTimerData() {
        const data = {
            type: this.currentTimer,
            estimatedLifespan: this.estimatedLifespan
        };

        switch (this.currentTimer) {
            case 'normal':
                data.hours = parseInt(document.getElementById('normal-hours').value) || 0;
                data.minutes = parseInt(document.getElementById('normal-minutes').value) || 0;
                data.seconds = parseInt(document.getElementById('normal-seconds').value) || 0;
                break;
            
            case 'long':
                data.year = parseInt(document.getElementById('long-year').value);
                data.month = parseInt(document.getElementById('long-month').value);
                data.date = parseInt(document.getElementById('long-date').value);
                data.hour = parseInt(document.getElementById('long-hour').value);
                data.minute = parseInt(document.getElementById('long-minute').value);
                data.second = parseInt(document.getElementById('long-second').value);
                break;
            
            case 'death':
                data.birthYear = parseInt(document.getElementById('birth-year').value);
                data.birthMonth = parseInt(document.getElementById('birth-month').value);
                data.birthDate = parseInt(document.getElementById('birth-date').value);
                break;
        }

        return data;
    }

    showError(message) {
        // Create error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(45deg, #ff0040, #ff4080);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-family: 'Orbitron', monospace;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 0 30px rgba(255, 0, 64, 0.5);
            animation: errorSlideIn 0.3s ease;
        `;

        document.body.appendChild(errorDiv);

        // Remove after 3 seconds
        setTimeout(() => {
            errorDiv.style.animation = 'errorSlideOut 0.3s ease forwards';
            setTimeout(() => {
                document.body.removeChild(errorDiv);
            }, 300);
        }, 3000);
    }

    createParticleEffects() {
        // Create dynamic particle effects for the start button
        const startBtn = document.getElementById('start-timer');
        const particlesContainer = startBtn.querySelector('.start-particles');

        setInterval(() => {
            if (Math.random() > 0.7) {
                this.createParticle(particlesContainer);
            }
        }, 100);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFade 1s ease-out forwards;
            pointer-events: none;
        `;

        container.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (container.contains(particle)) {
                container.removeChild(particle);
            }
        }, 1000);
    }
}

// CSS animations for error notifications and particles
const style = document.createElement('style');
style.textContent = `
    @keyframes errorSlideIn {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }

    @keyframes errorSlideOut {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }

    @keyframes particleFade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FuturisticTimer();
});
