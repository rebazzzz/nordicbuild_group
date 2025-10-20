  // Mobile Navigation Toggle
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');
        
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Quote Form
        const quoteForm = document.getElementById('quoteForm');
        const quoteResult = document.getElementById('quoteResult');
        const contactForm = document.getElementById('contactForm');
        const estimatedCost = document.getElementById('estimatedCost');
        const estimatedTimeline = document.getElementById('estimatedTimeline');
        const downloadPdfBtn = document.getElementById('downloadPdfBtn');
        const bookMeetingBtn = document.getElementById('bookMeetingBtn');
        const meetingForm = document.getElementById('meetingForm');
        const meetingConfirmation = document.getElementById('meetingConfirmation');

        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple calculation for demo purposes
            const area = parseInt(document.getElementById('areaSize').value) || 100;
            const materials = document.getElementById('materials').value;
            const projectType = document.getElementById('projectType').value;

            let costPerSqm;

            switch(materials) {
                case 'standard':
                    costPerSqm = 15000;
                    break;
                case 'medium':
                    costPerSqm = 20000;
                    break;
                case 'premium':
                    costPerSqm = 25000;
                    break;
                default:
                    costPerSqm = 15000;
            }

            // Adjust for project type
            if (projectType === 'renovering') costPerSqm *= 0.8;
            if (projectType === 'tillbyggnad') costPerSqm *= 0.9;

            const totalCost = area * costPerSqm;

            // Format as currency
            const formatter = new Intl.NumberFormat('sv-SE', {
                style: 'currency',
                currency: 'SEK',
                minimumFractionDigits: 0
            });

            estimatedCost.textContent = formatter.format(totalCost);

            // Set timeline
            const timeline = document.getElementById('timeline').value;
            let timelineText;

            switch(timeline) {
                case '3-6':
                    timelineText = '3-6 månader';
                    break;
                case '6-12':
                    timelineText = '6-12 månader';
                    break;
                case '12+':
                    timelineText = 'Över 12 månader';
                    break;
                default:
                    timelineText = '6-12 månader';
            }

            estimatedTimeline.textContent = timelineText;

            // Show result
            quoteResult.style.display = 'block';

            // Scroll to result
            quoteResult.scrollIntoView({ behavior: 'smooth' });
        });

        // PDF Download Button
        downloadPdfBtn.addEventListener('click', () => {
            // Simulate PDF download - in a real application, this would generate and download a PDF
            alert('PDF-offert laddas ner... (Demo - ingen riktig PDF genereras)');
        });

        // Book Meeting Button
        bookMeetingBtn.addEventListener('click', () => {
            quoteResult.style.display = 'none';
            contactForm.style.display = 'block';
            contactForm.scrollIntoView({ behavior: 'smooth' });
        });

        // Direct Book Meeting Button
        const directBookMeetingBtn = document.getElementById('directBookMeetingBtn');

        directBookMeetingBtn.addEventListener('click', () => {
            quoteResult.style.display = 'none';
            contactForm.style.display = 'block';
            contactForm.scrollIntoView({ behavior: 'smooth' });
        });

        // Meeting Form Submission
        meetingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Hide form and show confirmation
            meetingForm.style.display = 'none';
            meetingConfirmation.style.display = 'block';

            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.style.display = 'none';
                meetingForm.style.display = 'block';
                meetingConfirmation.style.display = 'none';
                meetingForm.reset();
            }, 3000);
        });
        
        // Chatbot
        const chatbotToggle = document.getElementById('chatbotToggle');
        const chatbotWindow = document.getElementById('chatbotWindow');
        const chatbotClose = document.getElementById('chatbotClose');
        const chatbotBody = document.getElementById('chatbotBody');
        const chatbotInput = document.getElementById('chatbotInput');
        const chatbotSend = document.getElementById('chatbotSend');
        
        chatbotToggle.addEventListener('click', () => {
            chatbotWindow.style.display = 'flex';
        });
        
        chatbotClose.addEventListener('click', () => {
            chatbotWindow.style.display = 'none';
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
            userMessage.classList.add('chatbot-message', 'user');
            userMessage.textContent = message;
            chatbotBody.appendChild(userMessage);
            
            // Clear input
            chatbotInput.value = '';
            
            // Scroll to bottom
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
            
            // Simulate bot response after delay
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                const botMessage = document.createElement('div');
                botMessage.classList.add('chatbot-message', 'bot');
                botMessage.textContent = botResponse;
                chatbotBody.appendChild(botMessage);
                
                // Scroll to bottom
                chatbotBody.scrollTop = chatbotBody.scrollHeight;
            }, 1000);
        }
        
        function getBotResponse(message) {
            const lowerMessage = message.toLowerCase();
            
            if (lowerMessage.includes('hej') || lowerMessage.includes('hallå')) {
                return 'Hej! Hur kan jag hjälpa dig med ditt byggprojekt idag?';
            } else if (lowerMessage.includes('offert') || lowerMessage.includes('pris')) {
                return 'Du kan få en omedelbar preliminär offert genom att använda vårt formulär på hemsidan. Vill du att jag guidar dig till det?';
            } else if (lowerMessage.includes('projekt') || lowerMessage.includes('bygga')) {
                return 'Vi erbjuder nybyggnation, renovering, tillbyggnad och projektledning. Vilken typ av projekt funderar du på?';
            } else if (lowerMessage.includes('garanti') || lowerMessage.includes('garanter')) {
                return 'NordicBuild Group erbjuder 20 års garanti på alla våra byggprojekt. Det är en av branschens längsta garantier!';
            } else if (lowerMessage.includes('kontakt') || lowerMessage.includes('telefon')) {
                return 'Du kan nå oss på telefon 08-123 45 67 eller via e-post info@nordicbuild.se. Vårt kontor ligger på Byggvägen 15 i Stockholm.';
            } else if (lowerMessage.includes('tack') || lowerMessage.includes('hjälp')) {
                return 'Det var så lite! Är det något mer jag kan hjälpa dig med?';
            } else {
                return 'Jag förstod inte riktigt din fråga. Kan du omformulera den? Jag kan hjälpa dig med information om våra tjänster, offerter, garantier eller kontaktuppgifter.';
            }
        }