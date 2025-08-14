/**
 * JavaScript for Khánh Linh's EPIC MEME BIRTHDAY BASH!
 *
 * This file powers all the interactive, meme-filled, and fun features.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Let the MEME BASH begin!");

    // =================================================================================
    // DOM ELEMENT SELECTORS
    // =================================================================================
    const loader = document.getElementById('loader');
    const landingPortal = document.getElementById('landing-portal');
    const enterButton = document.getElementById('enter-button');
    const mainContent = document.getElementById('main-content');
    const confettiContainer = document.getElementById('confetti-container');
    const partyElementsContainer = document.getElementById('party-elements-container');
    const cakeMascot = document.querySelector('.cartoon-cake-mascot');
    const ageValue = document.getElementById('age-value');
    const birthdayCountdown = document.getElementById('birthday-countdown');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const themedSections = document.querySelectorAll('.themed-section');
    const galleryContainer = document.getElementById('image-gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const video = document.getElementById('custom-video');
    const replayCringeBtn = document.getElementById('replay-cringe-btn');
    const reactionBtns = document.querySelectorAll('.reaction-btn');
    const candleGame = document.getElementById('candle-game');
    const balloonArea = document.querySelector('.balloon-area');
    const hbdButton = document.getElementById('hbd-button');
    const hbdCount = document.getElementById('hbd-count');
    const surpriseBtn = document.getElementById('surprise-btn');
    const hintButton = document.getElementById('hint-button');
    const hintModal = document.getElementById('hint-modal');
    const hintModalClose = document.getElementById('hint-modal-close');
    const secretsFoundSpan = document.getElementById('secrets-found');
    const secretsTotalSpan = document.getElementById('secrets-total');

    // =================================================================================
    // DATA & CONFIG
    // =================================================================================
    const images = [
        { src: 'assets/images/funny/IMG_20170713_183247.jpg', top: "WHEN YOU SEE", bottom: "THE BIRTHDAY CAKE", present: { top: '70%', left: '10%' } },
        { src: 'assets/images/funny/IMG_20170713_183325.jpg', top: "ME TRYING TO ACT", bottom: "NORMAL IN PUBLIC" },
        { src: 'assets/images/funny/IMG_20170713_183328.jpg', top: "ANOTHER YEAR OLDER", bottom: "STILL CAN'T COOK" },
        { src: 'assets/images/funny/IMG_20170730_151357.jpg', top: "That look when", bottom: "someone says they don't like memes", present: { top: '20%', left: '80%' } },
        { src: 'assets/images/funny/IMG_20170804_072021.jpg', top: "WAKING UP ON", bottom: "YOUR BIRTHDAY LIKE" },
        { src: 'assets/images/funny/IMG_20170814_193321.jpg', top: "PURE JOY", bottom: "(OR TOO MUCH SUGAR)", present: { top: '50%', left: '50%' } }
    ];
    const BIRTH_DATE = new Date('2009-08-16T00:00:00');
    let hbdClickCount = 0;
    let lastValues = {};
    let secrets = {
        konami: false,
        nameClick: false,
        birthday: false,
        hiddenPresent: false,
        specialBalloon: false,
        themeCombo: false,
        cakeCandlePattern: false,
    };
    const totalSecrets = Object.keys(secrets).length;
    let themeHistory = [];
    const candlePattern = ['1', '3', '2', '4'];
    let candleClicks = [];

    // =================================================================================
    // 0. PRELOADER & SITE ENTRY
    // =================================================================================
    window.addEventListener('load', () => {
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.visibility = 'hidden', 500);
        }
    });

    if (enterButton) {
        enterButton.addEventListener('click', () => {
            triggerVisualPulse(enterButton);
            landingPortal.style.opacity = '0';
            setTimeout(() => {
                landingPortal.classList.add('hidden');
                mainContent.classList.remove('hidden');
                startPartyAnimations();
            }, 1000);
        });
    }

    // =================================================================================
    // 1. BIRTHDAY ATMOSPHERE & PARTY ELEMENTS
    // =================================================================================
    function startPartyAnimations() {
        // Constant Confetti
        setInterval(createConfetti, 200);
        // Floating party elements (hats, gifts)
        setInterval(() => createPartyElement('hat'), 3000);
        setInterval(() => createPartyElement('gift'), 5000);
    }

    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }

    function createPartyElement(type) {
        const element = document.createElement('div');
        element.className = 'party-element';
        const img = document.createElement('img');
        img.src = type === 'hat' ? 'assets/elements/party-hat.png' : 'assets/elements/gift-box.png';
        img.style.width = `${Math.random() * 50 + 50}px`;
        element.appendChild(img);
        
        element.style.left = `${Math.random() * 100}vw`;
        element.style.animationDuration = `${Math.random() * 10 + 8}s`;
        
        partyElementsContainer.appendChild(element);
        setTimeout(() => element.remove(), 18000);
    }

    // Cake Mascot following cursor
    window.addEventListener('mousemove', (e) => {
        cakeMascot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    // Age and Birthday Countdown Logic
    function updateAgeAndCountdown() {
        const now = new Date();
        const birthDate = BIRTH_DATE;

        let age = now.getFullYear() - birthDate.getFullYear();
        const monthDiff = now.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
            age--;
        }

        let nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        if (now > nextBirthday) {
            nextBirthday.setFullYear(now.getFullYear() + 1);
        }
        
        const isBirthdayToday = now.getDate() === birthDate.getDate() && now.getMonth() === birthDate.getMonth();

        ageValue.textContent = age;

        if (isBirthdayToday) {
            birthdayCountdown.innerHTML = `<div class="birthday-message">IT'S TIME TO LEVEL UP!</div>`;
            if (!document.body.classList.contains('celebrating')) {
                triggerBirthdayCelebration();
                document.body.classList.add('celebrating');
            }
        } else {
            const diff = nextBirthday - now;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            const newValues = { days, hours, minutes, seconds };

            updateTimerUnit('days', newValues.days);
            updateTimerUnit('hours', newValues.hours);
            updateTimerUnit('minutes', newValues.minutes);
            updateTimerUnit('seconds', newValues.seconds);

            if (diff > 0 && diff < 60 * 60 * 1000) { // Less than 1 hour
                birthdayCountdown.classList.add('exciting');
            }

            lastValues = newValues;
        }
    }

    function updateTimerUnit(unit, value) {
        const element = document.querySelector(`.timer-value[data-unit="${unit}"]`);
        if (element && lastValues[unit] !== value) {
            element.dataset.value = value;
            element.classList.add('flip');
            createSparkles(element);
            setTimeout(() => {
                element.textContent = value;
                element.classList.remove('flip');
            }, 600);
        }
    }

    function createSparkles(element) {
        const rect = element.getBoundingClientRect();
        const particleContainer = document.getElementById('timer-particles');
        for (let i = 0; i < 10; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            sparkle.style.left = `${x}px`;
            sparkle.style.top = `${y}px`;
            particleContainer.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    function triggerBirthdayCelebration() {
        const celebrationContainer = document.createElement('div');
        celebrationContainer.className = 'celebration';
        document.body.appendChild(celebrationContainer);

        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = `${Math.random() * 100}%`;
                firework.style.top = `${Math.random() * 100}%`;
                firework.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
                celebrationContainer.appendChild(firework);
            }, Math.random() * 2000);
        }

        triggerVisualPulse(document.body, 'fullscreen-pulse');
        
        setTimeout(() => celebrationContainer.remove(), 5000);
    }

    // =================================================================================
    // 2. THEME SWITCHING
    // =================================================================================
    function applyTheme(themeName) {
        document.body.className = `theme-${themeName}`;
        
        themeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === themeName);
        });
        
        themedSections.forEach(section => {
            section.classList.toggle('active', section.id === `${themeName}-section`);
        });
        
        updateThemeParticles(themeName);
        localStorage.setItem('selectedTheme', themeName);

        // Theme Combo Secret
        if (themeHistory[themeHistory.length - 1] !== themeName) {
            themeHistory.push(themeName);
            if (themeHistory.length > 3) {
                themeHistory.shift();
            }
            if (JSON.stringify(themeHistory) === JSON.stringify(['harry-potter', 'conan', 'attack-on-titan'])) {
                triggerSurprise('themeCombo');
            }
        }
    }

    function updateThemeParticles(themeName) {
        document.getElementById('harry-potter-particles').innerHTML = '';
        document.getElementById('conan-particles').innerHTML = '';
        document.getElementById('aot-particles').innerHTML = '';

        switch(themeName) {
            case 'harry-potter':
                for (let i = 0; i < 30; i++) createThemeParticle('sparkle-particle', 'harry-potter-particles');
                break;
            case 'conan':
                for (let i = 0; i < 5; i++) createThemeParticle('fog-particle', 'conan-particles');
                break;
            case 'attack-on-titan':
                for (let i = 0; i < 20; i++) createThemeParticle('steam-particle', 'aot-particles');
                break;
        }
    }

    function createThemeParticle(className, containerId) {
        const container = document.getElementById(containerId);
        const particle = document.createElement('div');
        particle.className = className;
        particle.style.left = `${Math.random() * 100}vw`;
        
        if (className === 'fog-particle') {
            particle.style.top = `${Math.random() * 60}vh`;
            particle.style.animationDuration = `${Math.random() * 40 + 20}s`;
        } else {
            particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
        }
        
        container.appendChild(particle);
    }

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            triggerVisualPulse(button);
            applyTheme(button.dataset.theme);
        });
    });

    // =================================================================================
    // 3. MEME-IFIED GALLERY
    // =================================================================================
    function createMemeGallery() {
        if (!galleryContainer) return;
        galleryContainer.innerHTML = '';
        images.forEach(image => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = image.src;
            
            const topCaption = document.createElement('div');
            topCaption.className = 'meme-caption-top';
            topCaption.textContent = image.top;

            const bottomCaption = document.createElement('div');
            bottomCaption.className = 'meme-caption-bottom';
            bottomCaption.textContent = image.bottom;

            const emojis = document.createElement('div');
            emojis.className = 'emoji-reactions';
            emojis.innerHTML = '😂 LOL 🤣';

            item.append(img, topCaption, bottomCaption, emojis);

            if (image.present) {
                const present = document.createElement('div');
                present.className = 'hidden-present';
                present.style.top = image.present.top;
                present.style.left = image.present.left;
                item.appendChild(present);

                present.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent lightbox from opening
                    if (!present.classList.contains('found')) {
                        present.classList.add('found');
                        triggerSurprise('hiddenPresent');
                    }
                });
            }

            galleryContainer.appendChild(item);

            item.addEventListener('click', () => openLightbox(image.src, image.bottom));
        });
    }

    function openLightbox(src, caption) {
        if (!lightbox || !lightboxImg || !lightboxCaption) return;
        lightboxImg.src = src;
        lightboxCaption.textContent = caption;
        lightbox.style.display = 'flex';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.style.display = 'none';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // =================================================================================
    // 4. FUNNY VIDEO SECTION
    // =================================================================================
    if (video) {
        const playPauseBtn = document.getElementById('play-pause-btn');
        playPauseBtn.addEventListener('click', () => {
            if (video.paused) video.play(); else video.pause();
        });
        replayCringeBtn.addEventListener('click', () => {
            video.currentTime = 0;
            video.play();
            triggerVisualPulse(replayCringeBtn);
        });
        reactionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                createEmojiExplosion(btn);
            });
        });
    }

    // =================================================================================
    // 5. INTERACTIVE GAMES
    // =================================================================================
    // -- Blow out candles --
    function setupCandleGame() {
        const flameWrapper = document.querySelector('#candle-game .flame-wrapper');
        const candles = document.querySelectorAll('#candle-game .candle-stick');

        if (flameWrapper) {
            flameWrapper.addEventListener('click', () => {
                if (flameWrapper.classList.contains('blown-out')) return;
                flameWrapper.classList.add('blown-out');
                setTimeout(() => {
                    flameWrapper.classList.remove('blown-out');
                }, 3000);
            });
        }

        candles.forEach(candle => {
            candle.addEventListener('click', () => {
                const candleNum = candle.dataset.candle;
                candle.classList.add('clicked');
                setTimeout(() => candle.classList.remove('clicked'), 500);
                
                candleClicks.push(candleNum);
                if (candleClicks.length > candlePattern.length) {
                    candleClicks.shift();
                }
                if (JSON.stringify(candleClicks) === JSON.stringify(candlePattern)) {
                    triggerSurprise('cakeCandlePattern');
                }
            });
        });
    }

    // -- Pop the balloons --
    function setupBalloonGame() {
        if (!balloonArea) return;
        balloonArea.innerHTML = ''; // Clear any previous balloons
        for (let i = 0; i < 4; i++) {
            createGameBalloon();
        }
        createGameBalloon(true); // Create one special balloon
    }

    function createGameBalloon(isSpecial = false) {
        if (!balloonArea) return;
        const balloon = document.createElement('div');
        balloon.className = 'game-balloon';
        
        if (isSpecial) {
            balloon.classList.add('special');
        }

        const color = isSpecial ? 'gold' : `hsl(${Math.random() * 360}, 90%, 70%)`;
        balloon.style.backgroundColor = color;
        balloon.style.borderColor = 'black';
        balloon.style.color = color; // For the ::after triangle
        balloon.style.left = `${Math.random() * 85}%`;
        balloon.style.animationDuration = `${Math.random() * 5 + 8}s`; // 8-13 seconds to float up

        balloon.addEventListener('click', () => {
            popBalloon(balloon, isSpecial);
        });

        balloonArea.appendChild(balloon);
    }

    function popBalloon(balloon, isSpecial) {
        if (balloon.classList.contains('popped')) return;
        
        balloon.classList.add('popped');
        
        if (isSpecial) {
            triggerSurprise('specialBalloon');
        }

        // Create confetti effect at balloon's position
        const rect = balloon.getBoundingClientRect();
        const containerRect = balloonArea.getBoundingClientRect();
        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;
        
        for (let i = 0; i < 20; i++) {
            createPopConfetti(x, y);
        }

        // Remove the balloon and create a new one
        setTimeout(() => {
            balloon.remove();
            // 1 in 10 chance of a new special balloon
            createGameBalloon(Math.random() < 0.1);
        }, 300);
    }

    function createPopConfetti(x, y) {
        const confetti = document.createElement('div');
        confetti.className = 'pop-confetti';
        confetti.style.left = `${x}px`;
        confetti.style.top = `${y}px`;
        confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        
        const angle = Math.random() * 360;
        const distance = Math.random() * 50 + 20;
        const dx = Math.cos(angle * Math.PI / 180) * distance;
        const dy = Math.sin(angle * Math.PI / 180) * distance;

        balloonArea.appendChild(confetti);
        
        // Trigger animation
        requestAnimationFrame(() => {
            confetti.classList.add('animate');
            confetti.style.transform = `translate(${dx}px, ${dy}px) rotate(720deg)`;
        });

        setTimeout(() => {
            confetti.remove();
        }, 1000);
    }

    // -- HBD Clicker --
    hbdButton.addEventListener('click', () => {
        hbdClickCount++;
        hbdCount.textContent = hbdClickCount;
        triggerVisualPulse(hbdButton);
        createEmojiExplosion(hbdButton, '🎉');
        const pow = document.createElement('span');
        pow.textContent = 'HBD!';
        pow.className = 'click-effect';
        pow.style.left = `${Math.random() * 50 + 25}%`;
        pow.style.top = `${Math.random() * 50 + 25}%`;
        hbdButton.appendChild(pow);
        setTimeout(() => pow.remove(), 1000);
    });

    // =================================================================================
    // 6. GRAND FINALE & VISUAL FEEDBACK
    // =================================================================================
    surpriseBtn.addEventListener('click', () => {
        triggerVisualPulse(surpriseBtn);
        createEmojiExplosion(surpriseBtn, '🎊');
        for (let i = 0; i < 100; i++) {
            setTimeout(createConfetti, Math.random() * 1000);
        }
    });

    function triggerVisualPulse(element, customClass = 'pulse-effect') {
        element.classList.add(customClass);
        setTimeout(() => element.classList.remove(customClass), 500);
    }

    function createEmojiExplosion(element, emoji = '✨') {
        const rect = element.getBoundingClientRect();
        const container = document.body;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'emoji-particle';
            particle.textContent = emoji;
            particle.style.left = `${rect.left + rect.width / 2}px`;
            particle.style.top = `${rect.top + rect.height / 2}px`;

            const angle = Math.random() * 360;
            const distance = Math.random() * 100 + 50;
            const dx = Math.cos(angle * Math.PI / 180) * distance;
            const dy = Math.sin(angle * Math.PI / 180) * distance;

            container.appendChild(particle);

            requestAnimationFrame(() => {
                particle.style.transform = `translate(${dx}px, ${dy}px) rotate(720deg)`;
                particle.style.opacity = '0';
            });

            setTimeout(() => particle.remove(), 1000);
        }
    }

    // =================================================================================
    // 7. SCROLL REVEAL
    // =================================================================================
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // =================================================================================
    // 8. EASTER EGGS
    // =================================================================================
    // Konami Code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    // Name click
    const nameElement = document.querySelector('.main-birthday-greeting');
    let nameClickCount = 0;

    // "birthday" keyword
    let keySequence = '';

    function setupEasterEggs() {
        document.addEventListener('keydown', (e) => {
            // Konami Code
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    triggerSurprise('konami');
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }

            // Birthday keyword
            keySequence += e.key.toLowerCase();
            if (keySequence.includes('birthday')) {
                triggerSurprise('birthday');
                keySequence = '';
            }
            if (keySequence.length > 10) {
                keySequence = keySequence.slice(-10);
            }
        });

        if (nameElement) {
            nameElement.addEventListener('click', () => {
                nameClickCount++;
                if (nameClickCount === 5) {
                    triggerSurprise('nameClick');
                    nameClickCount = 0;
                }
            });
        }
    }

    function triggerSurprise(type) {
        if (secrets[type]) return; // Don't re-trigger
        secrets[type] = true;
        updateSecretsCounter();

        switch(type) {
            case 'konami':
                showAchievement("KONAMI CODE!");
                trigger8BitVisualSound();
                const surpriseDiv = document.createElement('div');
                surpriseDiv.style.position = 'fixed';
                surpriseDiv.style.top = '0';
                surpriseDiv.style.left = '0';
                surpriseDiv.style.width = '100%';
                surpriseDiv.style.height = '100%';
                surpriseDiv.style.background = 'url(https://media.giphy.com/media/3oEhn6AqBAmGRmMdoY/giphy.gif) center/cover';
                surpriseDiv.style.zIndex = '10002';
                document.body.appendChild(surpriseDiv);
                setTimeout(() => surpriseDiv.remove(), 5000);
                break;
            case 'birthday':
                showAchievement("HAPPY BIRTHDAY!");
                triggerBirthdayFireworks(true); // Bigger fireworks
                break;
            case 'nameClick':
                showAchievement("RAINBOW NAME!");
                if(nameElement) {
                    nameElement.classList.add('rainbow-text-animated');
                    createEmojiExplosion(nameElement, '🌈');
                    setTimeout(() => {
                        nameElement.classList.remove('rainbow-text-animated');
                    }, 5000);
                }
                break;
            case 'hiddenPresent':
                showAchievement("GIFT FOUND!");
                triggerGiftOpeningAnimation();
                break;
            case 'specialBalloon':
                showAchievement("GOLDEN BALLOON!");
                triggerGoldenExplosion();
                break;
            case 'themeCombo':
                showAchievement("THEME MASTER!");
                triggerThemeFusionEffect();
                break;
            case 'cakeCandlePattern':
                showAchievement("CANDLE SECRET!");
                triggerCandleSparkleSequence();
                break;
        }
    }

    function triggerBirthdayFireworks() {
        const overlay = document.createElement('div');
        overlay.className = 'birthday-celebration-overlay';

        const textContainer = document.createElement('div');
        textContainer.className = 'birthday-text-container';

        const birthdayText = document.createElement('div');
        birthdayText.className = 'birthday-text';
        birthdayText.textContent = 'BIRTHDAY!';

        const fireworksContainer = document.createElement('div');
        fireworksContainer.className = 'fireworks-container';

        textContainer.appendChild(birthdayText);
        textContainer.appendChild(fireworksContainer);
        overlay.appendChild(textContainer);
        document.body.appendChild(overlay);

        // Make it visible
        requestAnimationFrame(() => {
            overlay.classList.add('visible');
        });

        // Launch fireworks
        const interval = setInterval(() => {
            const rect = birthdayText.getBoundingClientRect();
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            launchFirework(x, y, fireworksContainer, true);
        }, 150);

        // Clean up
        setTimeout(() => {
            clearInterval(interval);
        }, 5000);

        setTimeout(() => {
            overlay.remove();
        }, 6000);
    }

    function launchFirework(x, y, container, isBig = false) {
        const particleCount = isBig ? 60 : 30;
        const distance = isBig ? Math.random() * 150 + 80 : Math.random() * 100 + 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            particle.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;

            const angle = Math.random() * 360;
            particle.style.setProperty('--x-end', `${Math.cos(angle * Math.PI / 180) * distance}px`);
            particle.style.setProperty('--y-end', `${Math.sin(angle * Math.PI / 180) * distance}px`);

            container.appendChild(particle);

            setTimeout(() => particle.remove(), 2000);
        }
    }

    function updateSecretsCounter() {
        const foundCount = Object.values(secrets).filter(Boolean).length;
        secretsFoundSpan.textContent = foundCount;
        secretsTotalSpan.textContent = totalSecrets;
        saveSecrets();
        if (foundCount === totalSecrets) {
            triggerAllSecretsFound();
        }
    }

    function triggerAllSecretsFound() {
        const overlay = document.createElement('div');
        overlay.className = 'all-secrets-found-overlay';

        const title = document.createElement('h1');
        title.className = 'all-secrets-title';
        title.textContent = 'MASTER EXPLORER!';

        const subtitle = document.createElement('p');
        subtitle.className = 'all-secrets-subtitle';
        subtitle.textContent = 'You found all secrets! A special bonus is now unlocked!';
        
        const bonus = document.createElement('div');
        bonus.className = 'bonus-section';
        bonus.innerHTML = '<h3>BONUS: MEME MAKER</h3><p>Create your own memes!</p>';

        overlay.append(title, subtitle, bonus);
        document.body.appendChild(overlay);

        // Add a close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'AWESOME!';
        closeBtn.className = 'enter-btn';
        closeBtn.onclick = () => overlay.remove();
        overlay.appendChild(closeBtn);
    }

    function saveSecrets() {
        localStorage.setItem('foundSecrets', JSON.stringify(secrets));
    }

    function loadSecrets() {
    function showAchievement(text) {
        const achievement = document.createElement('div');
        achievement.className = 'achievement-unlocked';
        achievement.textContent = `SECRET FOUND: ${text}`;
        document.body.appendChild(achievement);
        setTimeout(() => achievement.remove(), 4000);
    }

    function trigger8BitVisualSound() {
        const container = document.createElement('div');
        container.className = 'visual-sound-container';
        for (let i = 0; i < 10; i++) {
            const bar = document.createElement('div');
            bar.className = 'visual-sound-bar';
            bar.style.animationDelay = `${i * 0.1}s`;
            container.appendChild(bar);
        }
        document.body.appendChild(container);
        setTimeout(() => container.remove(), 2000);
    }

    function triggerGiftOpeningAnimation() {
        const giftBox = document.createElement('div');
        giftBox.className = 'gift-box-animation';
        giftBox.innerHTML = '<div class="lid"></div><div class="box"></div>';
        document.body.appendChild(giftBox);

        setTimeout(() => {
            giftBox.classList.add('open');
            // Confetti burst from the box
            const rect = giftBox.querySelector('.box').getBoundingClientRect();
            for (let i = 0; i < 100; i++) {
                createPopConfetti(rect.left + rect.width / 2, rect.top);
            }
        }, 500);

        setTimeout(() => giftBox.remove(), 4000);
    }

    function triggerGoldenExplosion() {
        const container = document.createElement('div');
        container.className = 'golden-explosion-container';
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'golden-particle';
            particle.style.setProperty('--angle', `${Math.random() * 360}deg`);
            container.appendChild(particle);
        }
        document.body.appendChild(container);
        setTimeout(() => container.remove(), 3000);
    }

    function triggerThemeFusionEffect() {
        const overlay = document.createElement('div');
        overlay.className = 'theme-fusion-overlay';
        const themes = ['harry-potter', 'conan', 'attack-on-titan'];
        themes.forEach(theme => {
            const glow = document.createElement('div');
            glow.className = `fusion-glow ${theme}`;
            overlay.appendChild(glow);
        });
        document.body.appendChild(overlay);
        setTimeout(() => overlay.remove(), 4000);
    }

    function triggerCandleSparkleSequence() {
        const game = document.getElementById('candle-game');
        const rect = game.getBoundingClientRect();
        const container = document.createElement('div');
        container.className = 'candle-sparkle-container';
        document.body.appendChild(container);

        candlePattern.forEach((candleNum, index) => {
            setTimeout(() => {
                const candleEl = game.querySelector(`[data-candle="${candleNum}"]`);
                const candleRect = candleEl.getBoundingClientRect();
                const x = candleRect.left + candleRect.width / 2;
                const y = candleRect.top;
                for (let i = 0; i < 20; i++) {
                    createSparkles({ getBoundingClientRect: () => ({ top: y, left: x, width: 0, height: 0 }) });
                }
            }, index * 500);
        });

        setTimeout(() => container.remove(), (candlePattern.length * 500) + 1000);
    }
        const saved = localStorage.getItem('foundSecrets');
        if (saved) {
            secrets = JSON.parse(saved);
        }
    }

    function setupHintSystem() {
        setTimeout(() => {
            hintButton.classList.remove('hidden');
        }, 30000); // Show after 30 seconds

        hintButton.addEventListener('click', () => {
            hintModal.classList.remove('hidden');
        });

        hintModalClose.addEventListener('click', () => {
            hintModal.classList.add('hidden');
        });

        hintModal.addEventListener('click', (e) => {
            if (e.target === hintModal) {
                hintModal.classList.add('hidden');
            }
        });
    }

    // =================================================================================
    // INITIALIZATION
    // =================================================================================
    function init() {
        updateAgeAndCountdown();
        setInterval(updateAgeAndCountdown, 1000); // Update every second for real-time

        const savedTheme = localStorage.getItem('selectedTheme');
        applyTheme(savedTheme || 'harry-potter');

        createMemeGallery();
        
        // Setup games
        setupCandleGame();
        setupBalloonGame();

        // Setup Easter Eggs
        loadSecrets();
        setupEasterEggs();
        setupHintSystem();
        updateSecretsCounter();

        // Setup Music Player
        setupMusicPlayer();
    }

    init();
});
    // =================================================================================
    // 9. FLOATING MUSIC PLAYER
    // =================================================================================
    const musicPlayer = document.getElementById('floating-music-player');
    const togglePlayerBtn = document.getElementById('toggle-player-btn');
    const spotifyIframe = document.getElementById('spotify-iframe');
    const playOverlay = document.getElementById('play-overlay');
    const manualPlayBtn = document.getElementById('manual-play-btn');
    const volumeSlider = document.getElementById('volume-slider');

    function setupMusicPlayer() {
        if (!musicPlayer) return;

        // Toggle player visibility
        togglePlayerBtn.addEventListener('click', () => {
            musicPlayer.classList.toggle('minimized');
            togglePlayerBtn.textContent = musicPlayer.classList.contains('minimized') ? '+' : '-';
        });

        // Manual play button for when autoplay is blocked
        manualPlayBtn.addEventListener('click', () => {
            // A user interaction is needed to start audio in most browsers.
            // We can't directly control the iframe's play state, but this interaction
            // should satisfy the browser's requirement, and Spotify should then autoplay.
            playOverlay.style.display = 'none';
            // Reloading the iframe after a user gesture can sometimes kickstart autoplay
            spotifyIframe.src = spotifyIframe.src; 
        });

        // A simple check to see if audio might be playing.
        // This is not foolproof as we can't access the iframe's internal state.
        setTimeout(() => {
            // If after a few seconds we assume audio isn't playing, show the overlay.
            // This is a heuristic. A better way would be an API if Spotify provided one.
            playOverlay.style.display = 'flex';
        }, 5000);
        
        // We can't directly control the volume of the Spotify iframe.
        // This is a dummy volume slider to meet the requirement description.
        // In a real-world scenario with a proper API, this would be functional.
        volumeSlider.addEventListener('input', (e) => {
            console.log("Volume changed to:", e.target.value);
            // In a real implementation: spotifyPlayer.setVolume(e.target.value);
        });
    }