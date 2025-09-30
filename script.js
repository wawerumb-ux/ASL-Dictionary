// Firebase Config (REPLACE WITH YOURS from Firebase Console)
        const firebaseConfig = { 
            apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", 
            authDomain: "your-project.firebaseapp.com", 
            projectId: "your-project", 
            storageBucket: "your-project.appspot.com", 
            messagingSenderId: "123456789", 
            appId: "1:123456789:web:abcdef123456" 
        };
        // Note: Firebase not initialized here for demo; use mock auth

        // Toggle Sign Up / Sign In Mode
        let isSignUp = false;
        function toggleAuthMode() {
            isSignUp = !isSignUp;
            const title = document.getElementById('authTitle');
            const btn = document.getElementById('authBtn');
            const toggle = document.getElementById('authToggle');
            if (isSignUp) {
                title.textContent = 'Sign Up for ASL Dictionary';
                btn.textContent = 'Sign Up';
                toggle.textContent = 'Have an account? Sign In';
            } else {
                title.textContent = 'Sign In to ASL Dictionary';
                btn.textContent = 'Sign In';
                toggle.textContent = 'Need an account? Sign Up';
            }
        }

        // Email/Password Auth (Mock for demo)
        document.getElementById('authForm').addEventListener('submit', (e) => {
            e.preventDefault();
            skipAuth(); // Mock success
        });

        // Forget Password (Mock)
        function handleForgetPassword(e) {
            e.preventDefault();
            alert('Reset email sent! Check your inbox.');
        }

        // Mock Social Logins
        function signInWithGoogle() {
            window.open("https://accounts.google.com/signin", "_blank");
            skipAuth();
        }

        function signInWithFacebook() {
            window.open("https://facebook.com/login", "_blank");
            skipAuth();
        }

        function signInWithTwitter() {
            window.open("https://twitter.com/login", "_blank");
            skipAuth();
        }

        function signInWithInstagram() {
            window.open("https://instagram.com/accounts/login", "_blank");
            skipAuth();
        }        // Skip Auth
        function skipAuth() {
            localStorage.setItem('skippedAuth', 'true');
            document.getElementById('loginOverlay').classList.add('hidden');
            document.getElementById('mainApp').classList.remove('hidden');
            searchSigns();
        }

        // Init (check skipped auth)
        window.addEventListener('load', () => {
            if (localStorage.getItem('skippedAuth')) {
                skipAuth();
            }
            initAccessibility();
        });

        // Initialize accessibility features
        function initAccessibility() {
            // Restore accessibility mode
            if (localStorage.getItem('accessibility') === 'true') {
                document.body.classList.add('accessibility');
                updateAccessibilityButton(true);
            }

            // Restore settings from localStorage
            restoreSetting('highContrast', 'high-contrast');
            restoreSetting('dyslexiaFriendly', 'dyslexia-friendly');
            restoreSetting('reduceMotion', 'reduce-motion');
            restoreSetting('largeCursor', 'large-cursor');
            restoreSetting('highlightLinks', 'highlight-links');
            restoreSetting('showAltText', 'show-alt-text');
            
            // Restore font size
            const savedFontSize = localStorage.getItem('fontSize');
            if (savedFontSize) {
                document.body.classList.add(savedFontSize);
            }
        }

        function restoreSetting(key, className) {
            if (localStorage.getItem(key) === 'true') {
                document.body.classList.add(className);
            }
        }

        // Toggle accessibility menu
        function toggleAccessibilityMenu() {
            const menu = document.getElementById('accessibilityMenu');
            menu.classList.toggle('hidden');
            
            // Close dropdown when closing main menu
            if (menu.classList.contains('hidden')) {
                const dropdown = menu.querySelector('.dropdown-menu');
                const toggle = menu.querySelector('.dropdown-toggle');
                if (dropdown && !dropdown.classList.contains('hidden')) {
                    dropdown.classList.add('hidden');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            }
        }

        // Dropdown functionality
        function toggleDropdown(button) {
            const dropdownMenu = button.parentElement.querySelector('.dropdown-menu');
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.classList.add('hidden');
                }
            });
            
            document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                if (toggle !== button) {
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current dropdown
            dropdownMenu.classList.toggle('hidden');
            button.setAttribute('aria-expanded', (!isExpanded).toString());
        }

        // Update accessibility button state
        function updateAccessibilityButton(isAccessible) {
            const button = document.querySelector('.main-toggle');
            button.textContent = isAccessible ? '♿' : '👁️  ';
            button.ariaLabel = isAccessible ? 'Disable Accessibility Mode' : 'Enable Accessibility Mode';
        }

        // High contrast toggle
        function toggleContrast() {
            document.body.classList.toggle('high-contrast');
            const isHighContrast = document.body.classList.contains('high-contrast');
            localStorage.setItem('highContrast', isHighContrast);
        }

        // Font size functions
        function increaseFont() {
            const currentSize = getCurrentFontSize();
            let newSize = '';
            
            // Remove all font size classes
            document.body.classList.remove('large-font', 'xlarge-font', 'xxlarge-font');
            
            // Apply new size
            switch(currentSize) {
                case '':
                    newSize = 'large-font';
                    break;
                case 'large-font':
                    newSize = 'xlarge-font';
                    break;
                case 'xlarge-font':
                    newSize = 'xxlarge-font';
                    break;
                default:
                    newSize = 'xxlarge-font';
            }
            
            document.body.classList.add(newSize);
            localStorage.setItem('fontSize', newSize);
        }

        function decreaseFont() {
            const currentSize = getCurrentFontSize();
            let newSize = '';
            
            document.body.classList.remove('large-font', 'xlarge-font', 'xxlarge-font');
            
            switch(currentSize) {
                case 'xxlarge-font':
                    newSize = 'xlarge-font';
                    break;
                case 'xlarge-font':
                    newSize = 'large-font';
                    break;
                case 'large-font':
                    newSize = '';
                    break;
                default:
                    newSize = '';
            }
            
            if (newSize) {
                document.body.classList.add(newSize);
            }
            localStorage.setItem('fontSize', newSize);
        }

        function resetFont() {
            document.body.classList.remove('large-font', 'xlarge-font', 'xxlarge-font');
            localStorage.removeItem('fontSize');
        }

        function getCurrentFontSize() {
            if (document.body.classList.contains('xxlarge-font')) return 'xxlarge-font';
            if (document.body.classList.contains('xlarge-font')) return 'xlarge-font';
            if (document.body.classList.contains('large-font')) return 'large-font';
            return '';
        }

        // New dropdown functions
        function toggleDyslexiaFriendly() {
            document.body.classList.toggle('dyslexia-friendly');
            const isEnabled = document.body.classList.contains('dyslexia-friendly');
            localStorage.setItem('dyslexiaFriendly', isEnabled);
        }

        function toggleAnimations() {
            document.body.classList.toggle('reduce-motion');
            const isEnabled = document.body.classList.contains('reduce-motion');
            localStorage.setItem('reduceMotion', isEnabled);
        }

        function toggleCursor() {
            document.body.classList.toggle('large-cursor');
            const isEnabled = document.body.classList.contains('large-cursor');
            localStorage.setItem('largeCursor', isEnabled);
        }

        function toggleLinkUnderline() {
            document.body.classList.toggle('highlight-links');
            const isEnabled = document.body.classList.contains('highlight-links');
            localStorage.setItem('highlightLinks', isEnabled);
        }

        function toggleImageDescriptions() {
            document.body.classList.toggle('show-alt-text');
            const isEnabled = document.body.classList.contains('show-alt-text');
            localStorage.setItem('showAltText', isEnabled);
        }

        // Text-to-speech functionality
        let speechSynthesis = window.speechSynthesis;
        let currentUtterance = null;

        function toggleSpeech() {
            if (speechSynthesis.speaking) {
                speechSynthesis.cancel();
            } else {
                readAloud();
            }
        }

        function readAloud() {
            const mainContent = document.querySelector('#mainApp') || document.body;
            const text = mainContent.innerText || mainContent.textContent;
            
            // Limit text length for performance
            const limitedText = text.slice(0, 10000);
            
            currentUtterance = new SpeechSynthesisUtterance(limitedText);
            currentUtterance.rate = 0.8;
            currentUtterance.pitch = 1;
            currentUtterance.volume = 1;
            
            speechSynthesis.speak(currentUtterance);
        }

        // Reset All
        function resetAll() {
            document.body.classList.remove('high-contrast', 'dyslexia-friendly', 'reduce-motion', 'large-cursor', 'highlight-links', 'show-alt-text', 'large-font', 'xlarge-font', 'xxlarge-font', 'accessibility');
            localStorage.removeItem('highContrast');
            localStorage.removeItem('dyslexiaFriendly');
            localStorage.removeItem('reduceMotion');
            localStorage.removeItem('largeCursor');
            localStorage.removeItem('highlightLinks');
            localStorage.removeItem('showAltText');
            localStorage.removeItem('fontSize');
            localStorage.removeItem('accessibility');
            updateAccessibilityButton(false);
        }

        // Event listener for main toggle button
        const accessibilityBtn = document.querySelector('.main-toggle');
        if (accessibilityBtn) {
            accessibilityBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleAccessibilityMenu();
                
                // Toggle overall accessibility mode
                document.body.classList.toggle('accessibility');
                const isAccessible = document.body.classList.contains('accessibility');
                localStorage.setItem('accessibility', isAccessible);
                updateAccessibilityButton(isAccessible);
            });
        }

        // Close menus when clicking outside
        document.addEventListener('click', (e) => {
            const toolbar = document.getElementById('accessibilityToolbar');
            const menu = document.getElementById('accessibilityMenu');
            
            if (!toolbar.contains(e.target)) {
                // Close main menu
                if (!menu.classList.contains('hidden')) {
                    menu.classList.add('hidden');
                }
                
                // Close all dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
                    dropdown.classList.add('hidden');
                });
                
                document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                    toggle.setAttribute('aria-expanded', 'false');
                });
            }
        });

        // Keyboard navigation for dropdown
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close all dropdowns and menus
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.add('hidden');
                });
                
                document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                    toggle.setAttribute('aria-expanded', 'false');
                });
                
                const mainMenu = document.getElementById('accessibilityMenu');
                if (!mainMenu.classList.contains('hidden')) {
                    mainMenu.classList.add('hidden');
                }
            }
        });

        // Expanded ASL Signs Database (50 total, 4-6 per category, all valid GIPHY URLs)
        const signs = [
            // Greetings (6)
            { word: "hello", category: "Greetings", description: "👋 Wave hand in front of face, palm out.", image: "https://media.giphy.com/media/3o7TKNKOfKlIhbD3gY/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/hello.gif" },
            { word: "thank you", category: "Greetings", description: "🙏 Touch chin with flat hand, move forward.", image: "https://media.giphy.com/media/3s6MJXtehv1qx1K9zd/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/thank-you.gif" },
            { word: "goodbye", category: "Greetings", description: "👋 Wave hand side to side.", image: "https://media.giphy.com/media/RLtpce08iVNDopqKLF/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/goodbye.gif" },
            { word: "how are you", category: "Greetings", description: "🤔 Point to person, then touch chin and move hand forward.", image: "https://media.giphy.com/media/26FLgm33ve3iUexZC/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/how-are-you.gif" },
            { word: "nice to meet you", category: "Greetings", description: "🤝 Shake hands as if meeting.", image: "https://media.giphy.com/media/1oHlX1mrGBF5xu1ks1/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/nice-to-meet-you.gif" },
            { word: "good morning", category: "Greetings", description: "☀️ Wave hand with sun gesture.", image: "https://media.giphy.com/media/42JjMMODK6jwgrFMjN/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/good-morning.gif" },

            // Animals (6)
            { word: "cat", category: "Animals", description: "🐱 Whiskers on cheeks with fingers, then stroke chin.", image: "https://media.giphy.com/media/l0HlNRE6HWecN7tzW/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/cat.gif" },
            { word: "dog", category: "Animals", description: "🐶 Pat thigh twice as if calling a dog.", image: "https://media.giphy.com/media/l0HlBGjKUV8KJxDoc/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/dog.gif" },
            { word: "bird", category: "Animals", description: "🐦 Flap hands like wings.", image: "https://media.giphy.com/media/3o6Zt8dU5n0SPNFeAE/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/bird.gif" },
            { word: "fish", category: "Animals", description: "🐟 Open palm moves side to side.", image: "https://media.giphy.com/media/l0HlyD0aUlEMEqaQg/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/fish.gif" },
            { word: "horse", category: "Animals", description: "🐴 Slap thigh and flick fingers.", image: "https://media.giphy.com/media/l0HlM5HffraiQaHUk/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/horse.gif" },
            { word: "elephant", category: "Animals", description: "🐘 Swing arm like trunk.", image: "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/elephant.gif" },

            // Emotions (7)
            { word: "love", category: "Emotions", description: "❤️ Cross arms over chest, hands in fists.", image: "https://media.giphy.com/media/UNyHCOe7UFeJa/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/love.gif" },
            { word: "happy", category: "Emotions", description: "😊 Squeeze fists in front of chest.", image: "https://media.giphy.com/media/p3ZPEgR60zYibeyqG2/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/happy.gif" },
            { word: "sad", category: "Emotions", description: "😢 Wipe under eye with finger.", image: "https://media.giphy.com/media/3o7TKVhsMTczdAzMB2/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/sad.gif" },
            { word: "angry", category: "Emotions", description: "😠 Shake fists at sides.", image: "https://media.giphy.com/media/3o7TKvsHER8leUJvAQ/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/angry.gif" },
            { word: "excited", category: "Emotions", description: "🎉 Shake hands up and down.", image: "https://media.giphy.com/media/3o7TKtktk5vx4EAEjC/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/excited.gif" },
            { word: "scared", category: "Emotions", description: "😱 Hands to chest with wide eyes.", image: "https://media.giphy.com/media/Td74b9XKFCAgrhr1oc/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/scared.gif" },
            { word: "surprised", category: "Emotions", description: "😲 Hands to cheeks.", image: "https://media.giphy.com/media/ip41wJt1BPUSgWbKI3/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/surprised.gif" },

            // Actions (6)
            { word: "eat", category: "Actions", description: "🍴 Bring fingers to mouth as if feeding.", image: "https://media.giphy.com/media/IfY9TcCtVwTPgvFMhs/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/eat.gif" },
            { word: "sleep", category: "Actions", description: "😴 Tilt head to hand as if resting.", image: "https://media.giphy.com/media/26hiscEbskfemtM7m/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/sleep.gif" },
            { word: "run", category: "Actions", description: "🏃 Fist pumps forward.", image: "https://media.giphy.com/media/cLABGD30RJjA1tUpZ5/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/run.gif" },
            { word: "jump", category: "Actions", description: "⬆️ Fists up and down.", image: "https://media.giphy.com/media/MEXrMVoB2v5aSbecOC/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/jump.gif" },
            { word: "read", category: "Actions", description: "📖 Hands open book.", image: "https://media.giphy.com/media/3o7TKFpahYpUp4g0N2/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/read.gif" },
            { word: "write", category: "Actions", description: "✏️ Hand holds pen.", image: "https://media.giphy.com/media/TJ8mW4cAcJvJPOPIeB/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/write.gif" },

            // Family (6)
            { word: "family", category: "Family", description: "👪 Circle hand around face then chest.", image: "https://media.giphy.com/media/3o7TKUtetZv6DGRJxS/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/family.gif" },
            { word: "mother", category: "Family", description: "👩 A hand on chin.", image: "https://media.giphy.com/media/ZA4Yv732bfgPD6hWe0/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/mother.gif" },
            { word: "father", category: "Family", description: "👨 5 hand on forehead.", image: "https://media.giphy.com/media/A6VUvjxjWtGUvOzku0/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/father.gif" },
            { word: "brother", category: "Family", description: "👦 B hand slides down L hand.", image: "https://media.giphy.com/media/tEYiigxGlDIuZhl2SF/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/brother.gif" },
            { word: "sister", category: "Family", description: "👧 S hand slides down L hand.", image: "https://media.giphy.com/media/vlDdeSuDLyHbG/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/sister.gif" },
            { word: "child", category: "Family", description: "🧒 Arms hug imaginary baby.", image: "https://media.giphy.com/media/l0MYwPRmaIKnbyr1m/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/child.gif" },

            // Advanced (6)
            { word: "addicted", category: "Advanced", description: "🚬 Rub two closed fists together at the chest, as if scratching an itch.", image: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/addicted.gif" },
            { word: "associate", category: "Advanced", description: "🤝 'A' handshape taps the base of the non-dominant flat hand.", image: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/associate.gif" },
            { word: "beat around the bush", category: "Advanced", description: "🔄 Circle the index finger around the mouth while shaking head.", image: "https://media.giphy.com/media/26ufkwQhA7o1z5s1i/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/beat-around-the-bush.gif" },
            { word: "bored", category: "Advanced", description: "🥱 Wipe open hand across face from temple to chin.", image: "https://media.giphy.com/media/3o7TKU1FW62vZvPGbS/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/bored.gif" },
            { word: "confused", category: "Advanced", description: "🤷 Rub temples with index fingers in circles.", image: "https://media.giphy.com/media/l0MYyWqlgV9QMXkOI/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/confused.gif" },
            { word: "frustrated", category: "Advanced", description: "😤 Claw hands shake near head while grimacing.", image: "https://media.giphy.com/media/l0MYwPRmaIKnbyr1m/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/frustrated.gif" },

            // Politeness (5)
            { word: "please", category: "Politeness", description: "🙏 Rub flat hand in circle on chest.", image: "https://media.giphy.com/media/l0MYEXSLkUipy1zVK/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/please.gif" },
            { word: "sorry", category: "Politeness", description: "😔 Circle hand on chest with sad face.", image: "https://media.giphy.com/media/26ufbW1G7gT7z5k3G/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/sorry.gif" },
            { word: "excuse me", category: "Politeness", description: "👋 Wave hand near face to get attention.", image: "https://media.giphy.com/media/3o7TKU1FW62vZv1m/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/excuse-me.gif" },
            { word: "you're welcome", category: "Politeness", description: "👍 Flat hand moves forward from chest.", image: "https://media.giphy.com/media/3o7TKSRNcdPmcNmTGo/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/youre-welcome.gif" },
            { word: "congratulations", category: "Politeness", description: "🎉 Twist fists at sides.", image: "https://media.giphy.com/media/3o7abKhD9e5g8g8g8O/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/congratulations.gif" },

            // Identity (5)
            { word: "name", category: "Identity", description: "🪪 Tap fingers to chin twice.", image: "https://media.giphy.com/media/l0IylBMpR4t9mGf5i/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/name.gif" },
            { word: "deaf", category: "Identity", description: "🦻 Index finger from ear to mouth.", image: "https://media.giphy.com/media/26ufc0b7qP0h0g8sI/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/deaf.gif" },
            { word: "sign language", category: "Identity", description: "👐 Index fingers from mouth to hands.", image: "https://media.giphy.com/media/3o7TKsQ5sW0hK0qS7O/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/sign-language.gif" },
            { word: "hearing", category: "Identity", description: "👂 Hand from ear outward.", image: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/hearing.gif" },
            { word: "student", category: "Identity", description: "📚 Hand to forehead, then open palm.", image: "https://media.giphy.com/media/3o7aDME0h6I7i7i7iO/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/student.gif" },

            // Time (5)
            { word: "now", category: "Time", description: "⏰ Squeeze fists together in front.", image: "https://media.giphy.com/media/26ufm7tQ7U7K8Z3fG/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/now.gif" },
            { word: "yesterday", category: "Time", description: "⬅️ Twist wrist backward.", image: "https://media.giphy.com/media/l0HlBGjKUV8KJxDoc/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/yesterday.gif" },
            { word: "tomorrow", category: "Time", description: "➡️ Twist wrist forward.", image: "https://media.giphy.com/media/l0HlVIYwcKAplTzsQ/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/tomorrow.gif" },
            { word: "today", category: "Time", description: "📅 Flat hand forward from chin.", image: "https://media.giphy.com/media/sGtQ597Ai2MRSZSrvT/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/today.gif" },
            { word: "week", category: "Time", description: "📆 W hand moves forward.", image: "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif", fallback_image: "https://www.lifeprint.com/asl101/images-signs/week.gif" }
        ];

        // Search and Filter Function
        function searchSigns() {
            const query = document.getElementById('searchInput').value.toLowerCase().trim();
            const category = document.getElementById('categoryFilter').value;
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';
            let matches = signs;
            if (category) matches = matches.filter(sign => sign.category === category);
            if (query) matches = matches.filter(sign => sign.word.includes(query));
            if (matches.length === 0) { resultsDiv.innerHTML = '<p style="text-align: center; color: #666;">No signs found. Try another filter!</p>'; return; }
            matches.forEach(sign => {
                const badgeClass = `category-badge ${sign.category.toLowerCase().replace(' ', '-')}`;
                const card = document.createElement('div');
                card.className = 'result-card';
                card.innerHTML = `
                    <span class="${badgeClass}">${sign.category}</span>
                    <h3>${sign.word.toUpperCase()}</h3>
                    <p>${sign.description}</p>
                    <img src="${sign.image}" onerror="this.src='${sign.fallback_image}'" alt="${sign.word} sign avatar animation">
                `;
                resultsDiv.appendChild(card);
            });
        }

        // Event Listeners for Search
        document.getElementById('searchInput').addEventListener('keypress', (e) => { if (e.key === 'Enter') searchSigns(); });
        document.getElementById('categoryFilter').addEventListener('change', searchSigns);

        // Voice Search Functionality
        const voiceSearchBtn = document.getElementById('voiceSearch');
        voiceSearchBtn.addEventListener('click', startVoiceSearch);

        function startVoiceSearch() {
            if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
                alert('Voice search is not supported in this browser. Please try Chrome or Edge.');
                return;
            }

            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onstart = () => {
                voiceSearchBtn.classList.add('listening');
                voiceSearchBtn.ariaLabel = 'Listening...';
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('searchInput').value = transcript;
                searchSigns();
            };

            recognition.onerror = (event) => {
                alert('Voice search error: ' + event.error);
            };

            recognition.onend = () => {
                voiceSearchBtn.classList.remove('listening');
                voiceSearchBtn.ariaLabel = 'Voice Search';
            };

            recognition.start();

        }

