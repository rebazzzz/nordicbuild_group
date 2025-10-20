// Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const navMenu = document.getElementById('nav-menu');
        
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Navigation between sections
        const publicLinks = document.querySelectorAll('.public-link');
        const portalLinks = document.querySelectorAll('.portal-link');
        const publicSections = document.querySelectorAll('section:not(.portal-section)');
        const portalSections = document.querySelectorAll('.portal-section');
        
        publicLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                
                // Hide all portal sections
                portalSections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Show public sections and scroll to target
                publicSections.forEach(section => {
                    if (section.id === targetId) {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                });
                
                // Update active nav link
                publicLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        portalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const portalType = link.getAttribute('data-portal');
                
                // Hide all public sections
                publicSections.forEach(section => {
                    section.style.display = 'none';
                });
                
                // Show the selected portal
                portalSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === `${portalType}-portal`) {
                        section.classList.add('active');
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                });
                
                // Update active nav link
                publicLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Quote Form Steps
        const steps = document.querySelectorAll('.step');
        const formSteps = document.querySelectorAll('.form-step');
        const nextButtons = document.querySelectorAll('.next-step');
        const prevButtons = document.querySelectorAll('.prev-step');
        const quoteResult = document.querySelector('.quote-result');
        
        nextButtons.forEach(button => {
            button.addEventListener('click', () => {
                const currentStep = document.querySelector('.form-step.active');
                const currentStepNum = parseInt(currentStep.getAttribute('data-step'));
                
                if (currentStepNum === 2) {
                    // Show quote result
                    currentStep.classList.remove('active');
                    quoteResult.classList.add('active');
                    
                    // Update steps
                    steps.forEach(step => {
                        const stepNum = parseInt(step.getAttribute('data-step'));
                        if (stepNum === 3) {
                            step.classList.add('active');
                        } else {
                            step.classList.remove('active');
                        }
                    });
                } else {
                    // Move to next form step
                    currentStep.classList.remove('active');
                    document.querySelector(`.form-step[data-step="${currentStepNum + 1}"]`).classList.add('active');
                    
                    // Update steps
                    steps.forEach(step => {
                        const stepNum = parseInt(step.getAttribute('data-step'));
                        if (stepNum <= currentStepNum + 1) {
                            step.classList.add('active');
                        } else {
                            step.classList.remove('active');
                        }
                    });
                }
            });
        });
        
        prevButtons.forEach(button => {
            button.addEventListener('click', () => {
                const currentStep = document.querySelector('.form-step.active, .quote-result.active');
                let currentStepNum;
                
                if (currentStep.classList.contains('quote-result')) {
                    currentStepNum = 3;
                } else {
                    currentStepNum = parseInt(currentStep.getAttribute('data-step'));
                }
                
                if (currentStepNum === 3) {
                    // Go back to form step 2 from result
                    currentStep.classList.remove('active');
                    document.querySelector('.form-step[data-step="2"]').classList.add('active');
                    
                    // Update steps
                    steps.forEach(step => {
                        const stepNum = parseInt(step.getAttribute('data-step'));
                        if (stepNum <= 2) {
                            step.classList.add('active');
                        } else {
                            step.classList.remove('active');
                        }
                    });
                } else {
                    // Move to previous form step
                    currentStep.classList.remove('active');
                    document.querySelector(`.form-step[data-step="${currentStepNum - 1}"]`).classList.add('active');
                    
                    // Update steps
                    steps.forEach(step => {
                        const stepNum = parseInt(step.getAttribute('data-step'));
                        if (stepNum <= currentStepNum - 1) {
                            step.classList.add('active');
                        } else {
                            step.classList.remove('active');
                        }
                    });
                }
            });
        });

        // Portal Tabs
        const portalNavItems = document.querySelectorAll('.portal-nav-item');
        
        portalNavItems.forEach(item => {
            item.addEventListener('click', () => {
                const tabId = item.getAttribute('data-tab');
                
                // Update active nav item
                portalNavItems.forEach(navItem => {
                    navItem.classList.remove('active');
                });
                item.classList.add('active');
                
                // Show corresponding tab content
                const portalTabs = document.querySelectorAll('.portal-tab');
                portalTabs.forEach(tab => {
                    tab.classList.remove('active');
                });
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });

        // Chatbot
        const chatbotBtn = document.getElementById('chatbot-btn');
        const chatbotWindow = document.getElementById('chatbot-window');
        const chatbotClose = document.getElementById('chatbot-close');
        const chatbotSend = document.getElementById('chatbot-send');
        const chatbotInput = document.getElementById('chatbot-input');
        const chatbotMessages = document.getElementById('chatbot-messages');
        
        chatbotBtn.addEventListener('click', () => {
            chatbotWindow.classList.toggle('active');
        });
        
        chatbotClose.addEventListener('click', () => {
            chatbotWindow.classList.remove('active');
        });
        
        chatbotSend.addEventListener('click', sendMessage);
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        function sendMessage() {
            const message = chatbotInput.value.trim();
            if (message === '') return;
            
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.className = 'message user';
            userMessage.innerHTML = `<div class="message-content">${message}</div>`;
            chatbotMessages.appendChild(userMessage);
            
            // Clear input
            chatbotInput.value = '';
            
            // Scroll to bottom
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            
            // Simulate bot response
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                const botMessage = document.createElement('div');
                botMessage.className = 'message bot';
                botMessage.innerHTML = `<div class="message-content">${botResponse}</div>`;
                chatbotMessages.appendChild(botMessage);
                
                // Scroll to bottom
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }, 1000);
        }
        
        function getBotResponse(message) {
            const lowerMessage = message.toLowerCase();
            
            if (lowerMessage.includes('offert') || lowerMessage.includes('pris')) {
                return "Du kan få en direktoffert med vår online-kalkylator. Gå bara till 'Få en Offer'-avsnittet och fyll i det enkla formuläret!";
            } else if (lowerMessage.includes('tjänst') || lowerMessage.includes('bygg')) {
                return "Vi erbjuder ett brett utbud av byggtjänster inklusive renoveringar, nybyggnation och kommersiella projekt. Kolla vårt Tjänster-avsnitt för detaljer.";
            } else if (lowerMessage.includes('kontakt') || lowerMessage.includes('telefon')) {
                return "Du kan nå oss på +46 8 123 4567 eller e-post info@nordicbuild.com. Vårt kontor ligger på Byggvägen 42, Stockholm.";
            } else if (lowerMessage.includes('tid') || lowerMessage.includes('schema')) {
                return "Projekttider varierar beroende på omfattning och komplexitet. Våra standardprojekt tar 3-6 månader, men vi erbjuder också snabbare alternativ.";
            } else if (lowerMessage.includes('portal') || lowerMessage.includes('spåra')) {
                return "Befintliga kunder kan komma åt sina projektuppgifter genom vår Kundportal. Klicka bara på 'Kundportal' i navigeringen.";
            } else {
                return "Jag är här för att hjälpa till med frågor om våra tjänster, att få en offert eller ditt pågående projekt. Vad vill du veta?";
            }
        }

        // Project Tabs
        const tabBtns = document.querySelectorAll('.tab-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                
                // Update active tab
                tabBtns.forEach(tab => tab.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // AR Preview
        const arPreviewBtns = document.querySelectorAll('.ar-preview-btn');
        const arPreviewModal = document.getElementById('ar-preview-modal');
        const closeArBtn = document.getElementById('close-ar');
        
        arPreviewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                arPreviewModal.classList.add('active');
            });
        });
        
        closeArBtn.addEventListener('click', () => {
            arPreviewModal.classList.remove('active');
        });

        // Sustainability Calculator
        const calculateSustainabilityBtn = document.getElementById('calculate-sustainability');
        const sustainabilityResults = document.getElementById('sustainability-results');
        
        calculateSustainabilityBtn.addEventListener('click', () => {
            const projectSize = document.getElementById('project-size').value;
            const materialType = document.getElementById('material-type').value;
            
            if (!projectSize || !materialType) {
                alert('Vänligen fyll i både projektstorlek och materialtyp.');
                return;
            }
            
            // Calculate sustainability metrics
            let co2Saving, energySaving, recyclingRate;
            
            switch(materialType) {
                case 'standard':
                    co2Saving = projectSize * 15;
                    energySaving = 10;
                    recyclingRate = 40;
                    break;
                case 'sustainable':
                    co2Saving = projectSize * 35;
                    energySaving = 25;
                    recyclingRate = 70;
                    break;
                case 'premium':
                    co2Saving = projectSize * 50;
                    energySaving = 40;
                    recyclingRate = 90;
                    break;
                default:
                    co2Saving = 0;
                    energySaving = 0;
                    recyclingRate = 0;
            }
            
            // Update results
            document.getElementById('co2-saving').textContent = co2Saving + ' kg';
            document.getElementById('energy-saving').textContent = energySaving + '%';
            document.getElementById('recycling-rate').textContent = recyclingRate + '%';
            
            // Show results
            sustainabilityResults.classList.add('active');
        });