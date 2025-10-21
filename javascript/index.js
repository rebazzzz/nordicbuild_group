// Mobile Navigation Toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Enhanced Quote Form with Real Construction Pricing
const quoteForm = document.getElementById("quoteForm");
const quoteResult = document.getElementById("quoteResult");
const contactForm = document.getElementById("contactForm");
const estimatedCost = document.getElementById("estimatedCost");
const estimatedTimeline = document.getElementById("estimatedTimeline");
const downloadPdfBtn = document.getElementById("downloadPdfBtn");
const bookMeetingBtn = document.getElementById("bookMeetingBtn");
const meetingForm = document.getElementById("meetingForm");
const meetingConfirmation = document.getElementById("meetingConfirmation");

// Construction pricing data (realistic Swedish market rates)
const pricingData = {
  materials: {
    standard: { base: 8500, markup: 1.0 },
    medium: { base: 12000, markup: 1.0 },
    premium: { base: 18000, markup: 1.0 },
  },
  labor: {
    nybyggnation: 3500, // per sqm
    renovering: 2800,
    tillbyggnad: 3200,
    projektledning: 800,
  },
  overhead: 0.25, // 25% overhead
  profit: 0.15, // 15% profit margin
  contingencies: 0.08, // 8% contingencies
  permits: {
    nybyggnation: 150000,
    renovering: 75000,
    tillbyggnad: 100000,
    projektledning: 25000,
  },
};

quoteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Show loading state
  const submitBtn = quoteForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Beräknar offert...";
  submitBtn.disabled = true;

  setTimeout(() => {
    calculateQuote();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);
});

function calculateQuote() {
  const area = parseFloat(document.getElementById("areaSize").value) || 100;
  const materials = document.getElementById("materials").value;
  const projectType = document.getElementById("projectType").value;
  const timeline = document.getElementById("timeline").value;

  // Material costs
  const materialCost = area * pricingData.materials[materials].base;

  // Labor costs
  const laborCost = area * pricingData.labor[projectType];

  // Permits and fees
  const permitCost = pricingData.permits[projectType];

  // Subtotal
  const subtotal = materialCost + laborCost + permitCost;

  // Add overhead, profit, and contingencies
  const overhead = subtotal * pricingData.overhead;
  const profit = subtotal * pricingData.profit;
  const contingencies = subtotal * pricingData.contingencies;

  const totalCost = subtotal + overhead + profit + contingencies;

  // Format as currency
  const formatter = new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    minimumFractionDigits: 0,
  });

  estimatedCost.textContent = formatter.format(totalCost);

  // Set timeline with more detail
  let timelineText;
  let timelineWeeks;

  switch (timeline) {
    case "3-6":
      timelineText = "3-6 månader (12-24 veckor)";
      timelineWeeks = 18; // average
      break;
    case "6-12":
      timelineText = "6-12 månader (24-48 veckor)";
      timelineWeeks = 36;
      break;
    case "12+":
      timelineText = "Över 12 månader (48+ veckor)";
      timelineWeeks = 60;
      break;
    default:
      timelineText = "6-12 månader (24-48 veckor)";
      timelineWeeks = 36;
  }

  estimatedTimeline.textContent = timelineText;

  // Add detailed breakdown (new feature)
  updateQuoteBreakdown(
    materialCost,
    laborCost,
    permitCost,
    overhead,
    profit,
    contingencies,
    area
  );

  // Show result
  quoteResult.style.display = "block";

  // Scroll to result
  quoteResult.scrollIntoView({ behavior: "smooth" });
}

function updateQuoteBreakdown(
  materialCost,
  laborCost,
  permitCost,
  overhead,
  profit,
  contingencies,
  area
) {
  const breakdownHTML = `
                <div style="margin-top: 1.5rem; padding: 1rem; background-color: #f8f9fa; border-radius: 8px;">
                    <h4 style="margin-bottom: 1rem; color: var(--primary);">Kostnadsfördelning</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.9rem;">
                        <div>Materialkostnader (${area} m²):</div>
                        <div style="text-align: right;">${new Intl.NumberFormat(
                          "sv-SE",
                          {
                            style: "currency",
                            currency: "SEK",
                            minimumFractionDigits: 0,
                          }
                        ).format(materialCost)}</div>

                        <div>Arbetkostnader:</div>
                        <div style="text-align: right;">${new Intl.NumberFormat(
                          "sv-SE",
                          {
                            style: "currency",
                            currency: "SEK",
                            minimumFractionDigits: 0,
                          }
                        ).format(laborCost)}</div>

                        <div>Tillstånd & avgifter:</div>
                        <div style="text-align: right;">${new Intl.NumberFormat(
                          "sv-SE",
                          {
                            style: "currency",
                            currency: "SEK",
                            minimumFractionDigits: 0,
                          }
                        ).format(permitCost)}</div>

                        <div>Omkostnader (25%):</div>
                        <div style="text-align: right;">${new Intl.NumberFormat(
                          "sv-SE",
                          {
                            style: "currency",
                            currency: "SEK",
                            minimumFractionDigits: 0,
                          }
                        ).format(overhead)}</div>

                        <div>Vinstmarginal (15%):</div>
                        <div style="text-align: right;">${new Intl.NumberFormat(
                          "sv-SE",
                          {
                            style: "currency",
                            currency: "SEK",
                            minimumFractionDigits: 0,
                          }
                        ).format(profit)}</div>

                        <div>Riskbuffert (8%):</div>
                        <div style="text-align: right;">${new Intl.NumberFormat(
                          "sv-SE",
                          {
                            style: "currency",
                            currency: "SEK",
                            minimumFractionDigits: 0,
                          }
                        ).format(contingencies)}</div>
                    </div>
                    <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #dee2e6; font-weight: bold;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                            <div>Total kostnad:</div>
                            <div style="text-align: right;">${
                              estimatedCost.textContent
                            }</div>
                        </div>
                    </div>
                </div>
            `;

  // Insert breakdown after the main cost display
  const costDisplay = document.querySelector("#quoteResult h3").parentNode;
  const existingBreakdown = costDisplay.querySelector(".breakdown");
  if (existingBreakdown) {
    existingBreakdown.remove();
  }

  const breakdownDiv = document.createElement("div");
  breakdownDiv.className = "breakdown";
  breakdownDiv.innerHTML = breakdownHTML;
  costDisplay.appendChild(breakdownDiv);
}

// PDF Download Button
downloadPdfBtn.addEventListener("click", () => {
  // Simulate PDF download - in a real application, this would generate and download a PDF
  alert("PDF-offert laddas ner... (Demo - ingen riktig PDF genereras)");
});

// Book Meeting Button
bookMeetingBtn.addEventListener("click", () => {
  quoteResult.style.display = "none";
  contactForm.style.display = "block";
  contactForm.scrollIntoView({ behavior: "smooth" });
});

// Direct Book Meeting Button
const directBookMeetingBtn = document.getElementById("directBookMeetingBtn");

directBookMeetingBtn.addEventListener("click", () => {
  quoteResult.style.display = "none";
  contactForm.style.display = "block";
  contactForm.scrollIntoView({ behavior: "smooth" });
});

// Function to show contact form (used by package buttons)
function showContactForm() {
  quoteResult.style.display = "none";
  contactForm.style.display = "block";
  contactForm.scrollIntoView({ behavior: "smooth" });
  return false;
}

// Meeting Form Submission
meetingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Hide form and show confirmation
  meetingForm.style.display = "none";
  meetingConfirmation.style.display = "block";

  // Reset form after 3 seconds
  setTimeout(() => {
    contactForm.style.display = "none";
    meetingForm.style.display = "block";
    meetingConfirmation.style.display = "none";
    meetingForm.reset();
  }, 3000);
});

// Chatbot
const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotWindow = document.getElementById("chatbotWindow");
const chatbotClose = document.getElementById("chatbotClose");
const chatbotBody = document.getElementById("chatbotBody");
const chatbotInput = document.getElementById("chatbotInput");
const chatbotSend = document.getElementById("chatbotSend");

chatbotToggle.addEventListener("click", () => {
  chatbotWindow.style.display = "flex";
});

chatbotClose.addEventListener("click", () => {
  chatbotWindow.style.display = "none";
});

chatbotSend.addEventListener("click", sendMessage);
chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const message = chatbotInput.value.trim();
  if (message === "") return;

  // Add user message
  const userMessage = document.createElement("div");
  userMessage.classList.add("chatbot-message", "user");
  userMessage.textContent = message;
  chatbotBody.appendChild(userMessage);

  // Clear input
  chatbotInput.value = "";

  // Scroll to bottom
  chatbotBody.scrollTop = chatbotBody.scrollHeight;

  // Simulate bot response after delay
  setTimeout(() => {
    const botResponse = getBotResponse(message);
    const botMessage = document.createElement("div");
    botMessage.classList.add("chatbot-message", "bot");
    botMessage.textContent = botResponse;
    chatbotBody.appendChild(botMessage);

    // Scroll to bottom
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }, 1000);
}

function getBotResponse(message) {
  const lowerMessage = message.toLowerCase();

  // Enhanced construction-specific responses
  if (
    lowerMessage.includes("hej") ||
    lowerMessage.includes("hallå") ||
    lowerMessage.includes("god dag")
  ) {
    return "Hej! Jag är NordicBuilds AI-assistent. Hur kan jag hjälpa dig med ditt byggprojekt idag? Vi har expertis inom nybyggnation, renovering och tillbyggnad.";
  } else if (
    lowerMessage.includes("offert") ||
    lowerMessage.includes("pris") ||
    lowerMessage.includes("kostnad")
  ) {
    return "Vårt AI-drivna offertverktyg ger dig en detaljerad kostnadsberäkning inom sekunder. Det inkluderar material, arbetskraft, tillstånd och alla övriga kostnader. Vill du prova det?";
  } else if (
    lowerMessage.includes("projekt") ||
    lowerMessage.includes("bygga") ||
    lowerMessage.includes("hus")
  ) {
    return "Vi hjälper dig med alla typer av byggprojekt: villas, lägenheter, kommersiella byggnader, renoveringar och tillbyggnader. Vårt AI-system optimerar hela processen från planering till färdigställande.";
  } else if (
    lowerMessage.includes("garanti") ||
    lowerMessage.includes("garanter") ||
    lowerMessage.includes("försäkring")
  ) {
    return "NordicBuild Group erbjuder branschens längsta garanti - hela 20 år på alla våra byggprojekt. Dessutom ingår 5 års garanti på VVS/El-installationer och 7 år på värmepumpar.";
  } else if (
    lowerMessage.includes("tid") ||
    lowerMessage.includes("tidplan") ||
    lowerMessage.includes("lång tid")
  ) {
    return "Med vår AI-drivna projektledning kan vi ofta halvera byggtiden jämfört med traditionella metoder. Vi använder prediktiv analys för att undvika förseningar.";
  } else if (
    lowerMessage.includes("miljö") ||
    lowerMessage.includes("hållbar") ||
    lowerMessage.includes("grön")
  ) {
    return "Hållbarhet är kärnan i vår verksamhet. Våra projekt uppnår ofta energiklass A med 35-50% lägre energiförbrukning. Vi använder återvunna material och optimerar resursanvändning med AI.";
  } else if (
    lowerMessage.includes("ai") ||
    lowerMessage.includes("artificial intelligence") ||
    lowerMessage.includes("maskininlärning")
  ) {
    return "Vår AI-plattform Waz Go analyserar ditt projekt i realtid, förutsäger risker, optimerar kostnader och säkerställer att allt blir klart i tid och inom budget. Vill du veta mer om specifika AI-funktioner?";
  } else if (
    lowerMessage.includes("kontakt") ||
    lowerMessage.includes("telefon") ||
    lowerMessage.includes("möte")
  ) {
    return "Du når oss på 08-123 45 67 eller info@nordicbuild.se. Vårt kontor ligger på Byggvägen 15 i Stockholm. Vi erbjuder även digitala möten via Teams eller Zoom för att komma igång snabbt.";
  } else if (
    lowerMessage.includes("kund") ||
    lowerMessage.includes("referens") ||
    lowerMessage.includes("tidigare projekt")
  ) {
    return "Vi har framgångsrikt slutfört över 500 projekt de senaste 5 åren med 98% kundnöjdhet. Vill du se några case studies eller referenser från liknande projekt?";
  } else if (
    lowerMessage.includes("certifierad") ||
    lowerMessage.includes("certifiering") ||
    lowerMessage.includes("kvalitet")
  ) {
    return "Vi är certifierade enligt ISO 9001, ISO 14001 och har Byggkeramikrådets guldcertifiering. Alla våra projekt genomgår rigorös kvalitetskontroll.";
  } else if (
    lowerMessage.includes("tack") ||
    lowerMessage.includes("hjälp") ||
    lowerMessage.includes("bra")
  ) {
    return "Det var så lite! Jag finns här för att hjälpa dig med alla frågor om ditt byggprojekt. Behöver du hjälp med offert, tidsplanering eller något annat?";
  } else if (
    lowerMessage.includes("väder") ||
    lowerMessage.includes("regn") ||
    lowerMessage.includes("vinter")
  ) {
    return "Vår AI övervakar väderprognoser och justerar tidplaner automatiskt. Vi har byggt i alla väderförhållanden och har lösningar för att minimera väderrelaterade förseningar.";
  } else if (
    lowerMessage.includes("material") ||
    lowerMessage.includes("leverans") ||
    lowerMessage.includes("tillgång")
  ) {
    return "Vi har ett intelligent lagerhanteringssystem som säkerställer materialtillgång. Vårt AI-system förutsäger behov och beställer automatiskt för att undvika förseningar.";
  } else {
    return "Jag förstod inte riktigt din fråga. Jag kan hjälpa dig med information om våra tjänster, AI-funktioner, offerter, garantier, hållbarhet, tidsplanering eller kontaktuppgifter. Kan du specificera vad du undrar över?";
  }
}
