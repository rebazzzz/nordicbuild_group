// Mobile Navigation Toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Tab Navigation with Loading States
document.querySelectorAll(".tab-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    // Get the tab to activate
    const tabId = this.getAttribute("data-tab");

    // Show loading state
    const tabContent = document.getElementById(tabId);
    let originalContent = "";
    if (tabContent) {
      originalContent = tabContent.innerHTML;
      tabContent.innerHTML =
        '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Laddar...</div>';
    }

    // Simulate loading delay for better UX
    setTimeout(() => {
      // Restore original content
      if (tabContent) {
        tabContent.innerHTML = originalContent;
      }

      // Remove active class from all tabs
      document.querySelectorAll(".tab-link").forEach((tab) => {
        tab.classList.remove("active");
      });

      // Add active class to clicked tab
      this.classList.add("active");

      // Hide all tab contents
      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active");
      });

      // Show selected tab content
      document.getElementById(tabId).classList.add("active");

      // Initialize interactive elements for the new tab
      initializeTabInteractivity(tabId);
    }, 300);
  });
});

// Initialize interactive elements when tab becomes active
function initializeTabInteractivity(tabId) {
  // Initialize accordions
  initializeAccordions(tabId);

  // Initialize search and filters
  initializeSearchAndFilters(tabId);

  // Initialize expandable sections
  initializeExpandableSections(tabId);

  // Initialize back to top button
  initializeBackToTop();

  // Initialize company portal buttons
  initializeCompanyButtons();

  // Initialize reports tab buttons
  initializeReportsButtons();

  // Initialize risk analysis for AI Risk tab
  if (tabId === "ai-risk") {
    initializeRiskAnalysis();
  }
}

// Accordion functionality
function initializeAccordions(tabId) {
  const tabElement = document.getElementById(tabId);
  if (!tabElement) return;

  const accordionHeaders = tabElement.querySelectorAll(".accordion-header");
  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const isExpanded = this.classList.contains("active");

      // Close all accordions in the same group
      const group = this.closest(".accordion-group");
      if (group) {
        group
          .querySelectorAll(".accordion-header")
          .forEach((h) => h.classList.remove("active"));
        group
          .querySelectorAll(".accordion-content")
          .forEach((c) => c.classList.remove("active"));
      }

      // Toggle current accordion
      if (!isExpanded) {
        this.classList.add("active");
        content.classList.add("active");
      }
    });
  });
}

// Search and Filter functionality
function initializeSearchAndFilters(tabId) {
  const tabElement = document.getElementById(tabId);
  if (!tabElement) return;

  // Search functionality for tables
  const searchInputs = tabElement.querySelectorAll(".search-input");
  searchInputs.forEach((input) => {
    input.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const table = this.closest(".searchable-table");
      const rows = table.querySelectorAll("tbody tr");

      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? "" : "none";
      });
    });
  });

  // Filter functionality
  const filterSelects = tabElement.querySelectorAll(".filter-select");
  filterSelects.forEach((select) => {
    select.addEventListener("change", function () {
      const filterValue = this.value;
      const table = this.closest(".filterable-table");
      const rows = table.querySelectorAll("tbody tr");

      rows.forEach((row) => {
        if (filterValue === "all") {
          row.style.display = "";
        } else {
          const statusCell = row.querySelector(".status-indicator");
          const status = statusCell ? statusCell.textContent.toLowerCase() : "";
          row.style.display = status.includes(filterValue.toLowerCase())
            ? ""
            : "none";
        }
      });
    });
  });
}

// Expandable sections functionality
function initializeExpandableSections(tabId) {
  const tabElement = document.getElementById(tabId);
  if (!tabElement) return;

  const expandableHeaders = tabElement.querySelectorAll(".expandable-header");
  expandableHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const isExpanded = content.classList.contains("expanded");

      if (isExpanded) {
        content.classList.remove("expanded");
        this.querySelector(".expand-icon").classList.remove("fa-chevron-up");
        this.querySelector(".expand-icon").classList.add("fa-chevron-down");
      } else {
        content.classList.add("expanded");
        this.querySelector(".expand-icon").classList.remove("fa-chevron-down");
        this.querySelector(".expand-icon").classList.add("fa-chevron-up");
      }
    });
  });
}

// Back to Top functionality
function initializeBackToTop() {
  // Remove existing back to top button if present
  const existingBtn = document.querySelector(".back-to-top");
  if (existingBtn) {
    existingBtn.remove();
  }

  // Create back to top button
  const backToTopBtn = document.createElement("button");
  backToTopBtn.className = "back-to-top";
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.setAttribute("aria-label", "Tillbaka till toppen");
  document.body.appendChild(backToTopBtn);

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  // Scroll to top when clicked
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Enhanced progress bars with tooltips
function initializeProgressTooltips() {
  const progressBars = document.querySelectorAll(".progress-container");
  progressBars.forEach((container) => {
    const progressBar = container.querySelector(".progress-bar");
    const progress = container.querySelector(".progress");

    if (progressBar && progress) {
      progressBar.addEventListener("mouseenter", function (e) {
        const percentage = progress.style.width;
        showTooltip(e, `Framsteg: ${percentage}`);
      });

      progressBar.addEventListener("mouseleave", hideTooltip);
    }
  });
}

// Tooltip functionality
function showTooltip(e, text) {
  let tooltip = document.querySelector(".custom-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.className = "custom-tooltip";
    document.body.appendChild(tooltip);
  }

  tooltip.textContent = text;
  tooltip.style.left = e.pageX + 10 + "px";
  tooltip.style.top = e.pageY - 30 + "px";
  tooltip.classList.add("visible");
}

function hideTooltip() {
  const tooltip = document.querySelector(".custom-tooltip");
  if (tooltip) {
    tooltip.classList.remove("visible");
  }
}

// Swipe gesture support for mobile tabs
function initializeSwipeGestures() {
  let startX = 0;
  let startY = 0;
  const minSwipeDistance = 50;

  document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  document.addEventListener("touchend", (e) => {
    if (!startX || !startY) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = startX - endX;
    const diffY = startY - endY;

    // Check if it's a horizontal swipe (more significant than vertical)
    if (
      Math.abs(diffX) > Math.abs(diffY) &&
      Math.abs(diffX) > minSwipeDistance
    ) {
      const activeTab = document.querySelector(".tab-link.active");
      if (activeTab) {
        const tabs = Array.from(document.querySelectorAll(".tab-link"));
        const currentIndex = tabs.indexOf(activeTab);

        if (diffX > 0 && currentIndex < tabs.length - 1) {
          // Swipe left - next tab
          tabs[currentIndex + 1].click();
        } else if (diffX < 0 && currentIndex > 0) {
          // Swipe right - previous tab
          tabs[currentIndex - 1].click();
        }
      }
    }

    startX = 0;
    startY = 0;
  });
}

// AI Risk Analysis Demo with enhanced interactivity
// Note: Event listener is now attached in initializeRiskAnalysis() when tab becomes active

function runRiskAnalysis() {
  // Mock AI risk analysis results
  const mockRisks = [
    {
      factor: "Väderberoende",
      risk: "Hög",
      impact: "Potentiella förseningar på 2-4 veckor",
      mitigation: "AI-justerade tidplaner och väderskydd",
    },
    {
      factor: "Materialleveranser",
      risk: "Medel",
      impact: "Möjliga förseningar på 1-2 veckor",
      mitigation: "Automatisk lageroptimering och alternativa leverantörer",
    },
    {
      factor: "Arbetskraftstillgång",
      risk: "Låg",
      impact: "Minimal påverkan",
      mitigation: "Prediktiv personalplanering",
    },
    {
      factor: "Regulatoriska ändringar",
      risk: "Medel",
      impact: "Möjliga kostnadsökningar",
      mitigation: "Kontinuerlig compliance-övervakning",
    },
    {
      factor: "Ekonomiska fluktuationer",
      risk: "Låg",
      impact: "Stabila kostnader",
      mitigation: "AI-driven kostnadsoptimering",
    },
  ];

  // Calculate overall risk score (0-100)
  const riskScoreValue = Math.floor(Math.random() * 40) + 20; // 20-60 range for demo
  riskScore.textContent = riskScoreValue;

  // Determine risk level
  let riskLevelText, riskColor;
  if (riskScoreValue < 30) {
    riskLevelText = "Låg risk";
    riskColor = "#28a745";
  } else if (riskScoreValue < 50) {
    riskLevelText = "Medelhög risk";
    riskColor = "#ffc107";
  } else {
    riskLevelText = "Hög risk";
    riskColor = "#dc3545";
  }

  riskLevel.textContent = riskLevelText;
  riskLevel.style.color = riskColor;

  // Display risk factors with expandable details
  const factorsHTML = mockRisks
    .map(
      (risk) => `
                <div class="risk-factor expandable-header" style="border-left: 4px solid ${getRiskColor(
                  risk.risk
                )}; padding: 1rem; margin-bottom: 1rem; background-color: #f8f9fa; border-radius: 4px; cursor: pointer;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <h4 style="margin: 0; color: var(--primary);">${
                          risk.factor
                        }</h4>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span class="status-indicator ${
                              risk.risk === "Hög"
                                ? "status-delayed"
                                : risk.risk === "Medel"
                                ? "status-on-track"
                                : ""
                            }" style="font-size: 0.8rem;">
                                ${risk.risk} risk
                            </span>
                            <i class="fas fa-chevron-down expand-icon"></i>
                        </div>
                    </div>
                    <div class="expandable-content" style="display: none;">
                        <p style="margin: 0.5rem 0; color: #666;"><strong>Påverkan:</strong> ${
                          risk.impact
                        }</p>
                        <p style="margin: 0.5rem 0; color: var(--accent);"><strong>AI-mitigering:</strong> ${
                          risk.mitigation
                        }</p>
                    </div>
                </div>
            `
    )
    .join("");

  riskFactors.innerHTML = factorsHTML;

  // Show results
  riskResults.style.display = "block";
  riskResults.scrollIntoView({ behavior: "smooth" });
}

function getRiskColor(risk) {
  switch (risk) {
    case "Hög":
      return "#dc3545";
    case "Medel":
      return "#ffc107";
    case "Låg":
      return "#28a745";
    default:
      return "#6c757d";
  }
}

// Initialize risk analysis functionality for AI Risk tab
function initializeRiskAnalysis() {
  // Ensure risk analysis elements are properly initialized
  const riskAnalysisBtn = document.getElementById("runRiskAnalysis");
  const riskResults = document.getElementById("riskResults");

  if (riskAnalysisBtn && riskResults) {
    // Reset any previous results
    riskResults.style.display = "none";
    riskAnalysisBtn.textContent = "Kör riskanalys";
    riskAnalysisBtn.disabled = false;

    // Attach event listener if not already attached
    if (!riskAnalysisBtn.hasAttribute('data-listener-attached')) {
      riskAnalysisBtn.addEventListener("click", runRiskAnalysis);
      riskAnalysisBtn.setAttribute('data-listener-attached', 'true');
    }
  }
}

// Project Status Updates with enhanced interactivity
const statusUpdates = [
  {
    project: "Kontorsbyggnad Stockholm",
    status: "Pågår",
    progress: 75,
    aiSavings: "12%",
    timeSaved: "3 veckor",
  },
  {
    project: "Villaområde Göteborg",
    status: "Planering",
    progress: 30,
    aiSavings: "18%",
    timeSaved: "2 veckor",
  },
  {
    project: "Industribyggnad Malmö",
    status: "Slutfört",
    progress: 100,
    aiSavings: "15%",
    timeSaved: "4 veckor",
  },
];

// Update project cards with AI insights and expandable details
function updateProjectCards() {
  statusUpdates.forEach((update, index) => {
    const card = document.querySelectorAll(".portal-card-dark")[index];
    if (card) {
      const progressBar = card.querySelector(".progress");
      const progressInfo = card.querySelector(".progress-info");

      if (progressBar) {
        progressBar.style.width = `${update.progress}%`;
      }

      if (progressInfo) {
        progressInfo.innerHTML = `
                            <span>${update.progress}% klart</span>
                            <span>AI-besparing: ${update.aiSavings}</span>
                        `;
      }

      // Add expandable AI insights
      const aiInsight = document.createElement("div");
      aiInsight.className = "ai-insight expandable-header";
      aiInsight.innerHTML = `
                        <div style="margin-top: 1rem; padding: 0.75rem; background-color: rgba(42, 157, 143, 0.1); border-radius: 4px; border-left: 3px solid var(--accent); cursor: pointer;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <small style="color: var(--accent); font-weight: 600;">AI-insikt</small>
                                <i class="fas fa-chevron-down expand-icon"></i>
                            </div>
                            <div class="expandable-content" style="display: none; margin-top: 0.5rem;">
                                <p style="margin: 0; font-size: 0.9rem; color: #666;">${update.timeSaved} tidigare slutförande tack vare prediktiv analys</p>
                            </div>
                        </div>
                    `;

      // Remove existing AI insight if present
      const existingInsight = card.querySelector(".ai-insight");
      if (existingInsight) {
        existingInsight.remove();
      }

      card.appendChild(aiInsight);
    }
  });
}

// Initialize project updates on page load
updateProjectCards();

// Dynamic breadcrumb functionality
function updateBreadcrumb(activeTabId) {
  const breadcrumb = document.querySelector(".breadcrumb");
  if (!breadcrumb) return;

  const tabNames = {
    "company-overview": "Översikt",
    finance: "Ekonomi",
    team: "Personal",
    projects: "Projekt",
    crm: "Kunder",
    reports: "Rapporter",
  };

  const currentTabName = tabNames[activeTabId] || "Översikt";
  breadcrumb.innerHTML = `Hem > Företagsportal > ${currentTabName}`;
}

// Modal functionality
function showModal(title, content) {
  // Remove existing modal
  const existingModal = document.querySelector(".custom-modal");
  if (existingModal) {
    existingModal.remove();
  }

  // Create modal
  const modal = document.createElement("div");
  modal.className = "custom-modal";
  modal.innerHTML = `
    <div class="modal-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 1000; display: flex; align-items: center; justify-content: center;">
      <div class="modal-content" style="background: white; border-radius: 8px; padding: 2rem; max-width: 90%; max-height: 90%; overflow-y: auto; position: relative; width: 600px;">
        <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 1rem;">
          <h3 style="margin: 0; color: var(--primary);">${title}</h3>
          <button class="modal-close" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #666;">&times;</button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Close modal functionality
  const closeBtn = modal.querySelector(".modal-close");
  const overlay = modal.querySelector(".modal-overlay");

  closeBtn.addEventListener("click", () => modal.remove());
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) modal.remove();
  });
}

// Initialize button functionality for company portal
function initializeCompanyButtons() {
  // Visa alla projekt button
  const showAllProjectsBtn = document.querySelector("#company-overview button");
  if (
    showAllProjectsBtn &&
    showAllProjectsBtn.textContent.includes("Visa alla projekt")
  ) {
    showAllProjectsBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const content = `
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Projektnamn</th>
                <th>Kund</th>
                <th>Startdatum</th>
                <th>Slutdatum</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Framsteg</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Villa Stocksund</td>
                <td>Anna & Mikael</td>
                <td>15 aug 2023</td>
                <td>15 feb 2024</td>
                <td>1 250 000 kr</td>
                <td><span class="status-indicator status-on-track">På plan</span></td>
                <td><div class="progress-bar"><div class="progress" style="width: 65%"></div></div></td>
              </tr>
              <tr>
                <td>Tillbyggnad Lidingö</td>
                <td>Familjen Pettersson</td>
                <td>1 sep 2023</td>
                <td>15 jan 2024</td>
                <td>850 000 kr</td>
                <td><span class="status-indicator status-delayed">Försenad</span></td>
                <td><div class="progress-bar"><div class="progress" style="width: 45%"></div></div></td>
              </tr>
              <tr>
                <td>Kontorsrenovering Stockholm</td>
                <td>TechSolutions AB</td>
                <td>1 okt 2023</td>
                <td>15 mar 2024</td>
                <td>2 100 000 kr</td>
                <td><span class="status-indicator status-on-track">På plan</span></td>
                <td><div class="progress-bar"><div class="progress" style="width: 30%"></div></div></td>
              </tr>
              <tr>
                <td>Radhusområde Göteborg</td>
                <td>ByggPartner HB</td>
                <td>15 okt 2023</td>
                <td>30 apr 2024</td>
                <td>3 500 000 kr</td>
                <td><span class="status-indicator status-on-track">På plan</span></td>
                <td><div class="progress-bar"><div class="progress" style="width: 20%"></div></div></td>
              </tr>
              <tr>
                <td>Industribyggnad Malmö</td>
                <td>IndustriCorp AB</td>
                <td>1 nov 2023</td>
                <td>15 jun 2024</td>
                <td>4 200 000 kr</td>
                <td><span class="status-indicator">Planering</span></td>
                <td><div class="progress-bar"><div class="progress" style="width: 5%"></div></div></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="margin-top: 1rem; text-align: center;">
          <strong>Totalt: 12 000 000 kr</strong> | <strong>Aktiva: 8 projekt</strong> | <strong>Genomsnittlig marginal: 28%</strong>
        </div>
      `;
      showModal("Alla Aktiva Projekt", content);
    });
  }

  // Visa fullständig analys button
  const showFullAnalysisBtn = document.querySelector(
    "#company-overview .portal-card-dark:nth-child(2) button"
  );
  if (
    showFullAnalysisBtn &&
    showFullAnalysisBtn.textContent.includes("Visa fullständig analys")
  ) {
    showFullAnalysisBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const content = `
        <div style="text-align: center; margin-bottom: 2rem;">
          <i class="fas fa-robot" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;"></i>
          <h4>AI Riskanalys - Fullständig Rapport</h4>
          <p>Detaljerad analys av alla pågående projekt med AI-genererade insikter.</p>
        </div>

        <div class="portal-grid" style="margin-bottom: 2rem;">
          <div class="portal-card-dark">
            <h4><i class="fas fa-chart-line"></i> Risköversikt</h4>
            <div class="metric-card">
              <div class="metric-value">32</div>
              <div class="metric-label">Genomsnittlig riskpoäng</div>
            </div>
            <p><strong>Hög risk:</strong> 2 projekt</p>
            <p><strong>Medel risk:</strong> 4 projekt</p>
            <p><strong>Låg risk:</strong> 2 projekt</p>
          </div>

          <div class="portal-card-dark">
            <h4><i class="fas fa-clock"></i> Tidsbesparingar</h4>
            <div class="metric-card">
              <div class="metric-value">18 veckor</div>
              <div class="metric-label">Total tidsbesparing</div>
            </div>
            <p>Genom AI-driven optimering</p>
          </div>
        </div>

        <h4>AI-Rekommendationer</h4>
        <div class="activity-list">
          <div class="activity-info">
            <i class="fas fa-lightbulb"></i>
            <div>
              <strong>Resursoptimering</strong>
              <p>Omfördela 3 snickare från projekt X till Lidingö för att minska förseningar.</p>
            </div>
          </div>
          <div class="activity-info">
            <i class="fas fa-lightbulb"></i>
            <div>
              <strong>Lagerhantering</strong>
              <p>Öka lagerhållning av takmaterial med 20% baserat på väderprognoser.</p>
            </div>
          </div>
          <div class="activity-info">
            <i class="fas fa-lightbulb"></i>
            <div>
              <strong>Kontraktsoptimering</strong>
              <p>Förnya avtal med leverantör A för att få 15% rabatt på bulkinköp.</p>
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; text-align: center;">
          <button class="btn btn-primary" onclick="alert('Laddar ner fullständig rapport...')">Ladda ner komplett rapport (PDF)</button>
        </div>
      `;
      showModal("AI Riskanalys - Fullständig Rapport", content);
    });
  }

  // Hantera förfrågningar button
  const manageRequestsBtn = document.querySelector(
    "#company-overview .portal-card-dark:nth-child(3) button"
  );
  if (
    manageRequestsBtn &&
    manageRequestsBtn.textContent.includes("Hantera förfrågningar")
  ) {
    manageRequestsBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const content = `
        <div style="margin-bottom: 2rem;">
          <h4>Nya förfrågningar (3)</h4>
          <div class="activity-list">
            <div class="activity-warning">
              <i class="fas fa-envelope"></i>
              <div>
                <strong>Villa i Saltsjöbaden</strong>
                <p>Budget: 2 100 000 kr | Omfattning: Nybyggnad 180kvm</p>
                <p style="font-size: 0.9rem; color: #666;">Inkom: 22 okt 2023</p>
                <div style="margin-top: 0.5rem;">
                  <button class="btn" onclick="alert('Öppnar offertgenerator...')">Skapa offert</button>
                  <button class="btn" style="margin-left: 0.5rem;" onclick="alert('Kontaktar kund...')">Kontakta kund</button>
                </div>
              </div>
            </div>
            <div class="activity-warning">
              <i class="fas fa-envelope"></i>
              <div>
                <strong>Kontorsrenovering Södermalm</strong>
                <p>Budget: 950 000 kr | Omfattning: 450kvm kontor</p>
                <p style="font-size: 0.9rem; color: #666;">Inkom: 20 okt 2023</p>
                <div style="margin-top: 0.5rem;">
                  <button class="btn" onclick="alert('Öppnar offertgenerator...')">Skapa offert</button>
                  <button class="btn" style="margin-left: 0.5rem;" onclick="alert('Kontaktar kund...')">Kontakta kund</button>
                </div>
              </div>
            </div>
            <div class="activity-warning">
              <i class="fas fa-envelope"></i>
              <div>
                <strong>Takrenovering Bromma</strong>
                <p>Budget: 180 000 kr | Omfattning: 120kvm tak</p>
                <p style="font-size: 0.9rem; color: #666;">Inkom: 18 okt 2023</p>
                <div style="margin-top: 0.5rem;">
                  <button class="btn" onclick="alert('Öppnar offertgenerator...')">Skapa offert</button>
                  <button class="btn" style="margin-left: 0.5rem;" onclick="alert('Kontaktar kund...')">Kontakta kund</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4>AI-genererade offerter denna månad</h4>
          <div class="activity-list">
            <div class="activity-success">
              <i class="fas fa-file-invoice-dollar"></i>
              <div>
                <strong>Offert skickad: Villa Djursholm</strong>
                <p>1 850 000 kr | Status: Väntar på svar</p>
                <p style="font-size: 0.9rem; color: #666;">Skickad: 15 okt 2023</p>
              </div>
            </div>
            <div class="activity-success">
              <i class="fas fa-file-invoice-dollar"></i>
              <div>
                <strong>Offert accepterad: Lägenhetsrenovering</strong>
                <p>420 000 kr | Status: Kontrakt på väg</p>
                <p style="font-size: 0.9rem; color: #666;">Accepterad: 12 okt 2023</p>
              </div>
            </div>
          </div>
        </div>
      `;
      showModal("Hantera Förfrågningar & Offerter", content);
    });
  }

  // Hantera fakturor button
  const manageInvoicesBtn = document.querySelector("#finance button");
  if (
    manageInvoicesBtn &&
    manageInvoicesBtn.textContent.includes("Hantera fakturor")
  ) {
    manageInvoicesBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const content = `
        <div class="table-responsive" style="margin-bottom: 2rem;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Fakturanr</th>
                <th>Kund</th>
                <th>Belopp</th>
                <th>Förfallodatum</th>
                <th>Status</th>
                <th>Åtgärd</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>NBG-23045</td>
                <td>Anna & Mikael</td>
                <td>175 000 kr</td>
                <td>15 nov 2023</td>
                <td><span class="status-indicator">Väntar</span></td>
                <td><button class="btn" onclick="alert('Påminnelse skickad...')">Skicka påminnelse</button></td>
              </tr>
              <tr>
                <td>NBG-23046</td>
                <td>Familjen Pettersson</td>
                <td>125 000 kr</td>
                <td>30 nov 2023</td>
                <td><span class="status-indicator">Väntar</span></td>
                <td><button class="btn" onclick="alert('Påminnelse skickad...')">Skicka påminnelse</button></td>
              </tr>
              <tr>
                <td>NBG-23047</td>
                <td>TechSolutions AB</td>
                <td>350 000 kr</td>
                <td>10 nov 2023</td>
                <td><span class="status-indicator status-delayed">Försenad</span></td>
                <td><button class="btn" onclick="alert('Inkasso kontaktad...')">Starta inkasso</button></td>
              </tr>
              <tr>
                <td>NBG-23048</td>
                <td>ByggPartner HB</td>
                <td>280 000 kr</td>
                <td>25 nov 2023</td>
                <td><span class="status-indicator">Väntar</span></td>
                <td><button class="btn" onclick="alert('Påminnelse skickad...')">Skicka påminnelse</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="portal-grid">
          <div class="portal-card-dark">
            <h4><i class="fas fa-chart-line"></i> Betalningsstatistik</h4>
            <div class="metric-card">
              <div class="metric-value">94%</div>
              <div class="metric-label">Betalningsgrad</div>
            </div>
            <p><strong>Genomsnittlig betalningstid:</strong> 28 dagar</p>
            <p><strong>Totalt utestående:</strong> 930 000 kr</p>
          </div>

          <div class="portal-card-dark">
            <h4><i class="fas fa-bell"></i> Automatiska påminnelser</h4>
            <p>Systemet skickar automatiskt:</p>
            <ul>
              <li>Första påminnelse: 7 dagar efter förfall</li>
              <li>Andra påminnelse: 14 dagar efter förfall</li>
              <li>Inkasso: 30 dagar efter förfall</li>
            </ul>
            <button class="btn" onclick="alert('Påminnelseinställningar öppnas...')">Ändra inställningar</button>
          </div>
        </div>
      `;
      showModal("Fakturahantering", content);
    });
  }

  // Hantera team button
  const manageTeamBtn = document.querySelector("#team button");
  if (manageTeamBtn && manageTeamBtn.textContent.includes("Hantera personal")) {
    manageTeamBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const content = `
        <div class="portal-grid" style="margin-bottom: 2rem;">
          <div class="portal-card-dark">
            <h4><i class="fas fa-users"></i> Personalöversikt</h4>
            <div class="metric-card">
              <div class="metric-value">24</div>
              <div class="metric-label">Aktiva medarbetare</div>
            </div>
            <p><strong>Tillgängliga idag:</strong> 22</p>
            <p><strong>Semester/frånvaro:</strong> 2</p>
          </div>

          <div class="portal-card-dark">
            <h4><i class="fas fa-calendar-alt"></i> Schemaläggning</h4>
            <p><strong>Kommande vecka:</strong></p>
            <ul>
              <li>4 medarbetare på semester</li>
              <li>2 sjukskrivna</li>
              <li>1 utbildning</li>
            </ul>
          </div>
        </div>

        <h4>Projektilldelning</h4>
        <div class="activity-list">
          <div class="activity-info">
            <i class="fas fa-hard-hat"></i>
            <div>
              <strong>Villa Stocksund</strong>
              <p>8 medarbetare tilldelade | Projektledare: David Eriksson</p>
              <div style="margin-top: 0.5rem;">
                <button class="btn" onclick="alert('Lägger till personal...')">Lägg till personal</button>
                <button class="btn" style="margin-left: 0.5rem;" onclick="alert('Ändrar schema...')">Ändra schema</button>
              </div>
            </div>
          </div>
          <div class="activity-info">
            <i class="fas fa-hard-hat"></i>
            <div>
              <strong>Tillbyggnad Lidingö</strong>
              <p>6 medarbetare tilldelade | Projektledare: Anders Pettersson</p>
              <div style="margin-top: 0.5rem;">
                <button class="btn" onclick="alert('Lägger till personal...')">Lägg till personal</button>
                <button class="btn" style="margin-left: 0.5rem;" onclick="alert('Ändrar schema...')">Ändra schema</button>
              </div>
            </div>
          </div>
          <div class="activity-info">
            <i class="fas fa-hard-hat"></i>
            <div>
              <strong>Kontorsrenovering Stockholm</strong>
              <p>10 medarbetare tilldelade | Projektledare: Emma Lundgren</p>
              <div style="margin-top: 0.5rem;">
                <button class="btn" onclick="alert('Lägger till personal...')">Lägg till personal</button>
                <button class="btn" style="margin-left: 0.5rem;" onclick="alert('Ändrar schema...')">Ändra schema</button>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <button class="btn btn-primary" onclick="alert('Rekryteringsportal öppnas...')">Rekrytera ny personal</button>
        </div>
      `;
      showModal("Personalhantering", content);
    });
  }

  // Skapa nytt projekt button
  const createProjectBtn = document.querySelector("#projects button");
  if (
    createProjectBtn &&
    createProjectBtn.textContent.includes("Skapa nytt projekt")
  ) {
    createProjectBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const content = `
        <div style="max-width: 500px; margin: 0 auto;">
          <h4>Skapa nytt projekt</h4>
          <form style="display: flex; flex-direction: column; gap: 1rem;">
            <div>
              <label for="projectName" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Projektnamn</label>
              <input type="text" id="projectName" class="form-control" placeholder="t.ex. Villa Bromma" required>
            </div>

            <div>
              <label for="customerName" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Kundnamn</label>
              <input type="text" id="customerName" class="form-control" placeholder="t.ex. Familjen Andersson" required>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div>
                <label for="startDate" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Startdatum</label>
                <input type="date" id="startDate" class="form-control" required>
              </div>
              <div>
                <label for="endDate" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Slutdatum</label>
                <input type="date" id="endDate" class="form-control" required>
              </div>
            </div>

            <div>
              <label for="budget" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Budget (kr)</label>
              <input type="number" id="budget" class="form-control" placeholder="t.ex. 1250000" required>
            </div>

            <div>
              <label for="projectType" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Projekttyp</label>
              <select id="projectType" class="form-control" required>
                <option value="">Välj typ</option>
                <option value="villa">Villa</option>
                <option value="radhus">Radhus</option>
                <option value="kontor">Kontor</option>
                <option value="industri">Industri</option>
                <option value="renovering">Renovering</option>
                <option value="tillbyggnad">Tillbyggnad</option>
              </select>
            </div>

            <div>
              <label for="description" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Beskrivning</label>
              <textarea id="description" class="form-control" rows="3" placeholder="Kort beskrivning av projektet..."></textarea>
            </div>

            <div style="display: flex; gap: 1rem; margin-top: 1rem;">
              <button type="submit" class="btn btn-primary" style="flex: 1;" onclick="alert('Projekt skapat! Öppnar projektöversikt...')">Skapa projekt</button>
              <button type="button" class="btn" onclick="this.closest('.custom-modal').remove()">Avbryt</button>
            </div>
          </form>
        </div>
      `;
      showModal("Skapa nytt projekt", content);
    });
  }

  // Visa hela kundregistret button
  const showCustomerRegistryBtn = document.querySelector("#crm button");
  if (
    showCustomerRegistryBtn &&
    showCustomerRegistryBtn.textContent.includes("Visa hela kundregistret")
  ) {
    showCustomerRegistryBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const content = `
        <div class="table-responsive" style="margin-bottom: 2rem;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Kundnamn</th>
                <th>Kontaktperson</th>
                <th>Telefon</th>
                <th>E-post</th>
                <th>Senaste projekt</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Anna & Mikael</td>
                <td>Anna Svensson</td>
                <td>070-123 45 67</td>
                <td>anna@email.se</td>
                <td>Villa Stocksund</td>
                <td><span class="status-indicator status-on-track">Aktiv</span></td>
              </tr>
              <tr>
                <td>Familjen Pettersson</td>
                <td>Erik Pettersson</td>
                <td>070-234 56 78</td>
                <td>erik.pettersson@email.se</td>
                <td>Tillbyggnad Lidingö</td>
                <td><span class="status-indicator status-on-track">Aktiv</span></td>
              </tr>
              <tr>
                <td>TechSolutions AB</td>
                <td>Maria Johansson</td>
                <td>08-123 45 67</td>
                <td>maria@techsolutions.se</td>
                <td>Kontorsrenovering</td>
                <td><span class="status-indicator status-on-track">Aktiv</span></td>
              </tr>
              <tr>
                <td>ByggPartner HB</td>
                <td>Anders Nilsson</td>
                <td>070-345 67 89</td>
                <td>anders@byggpartner.se</td>
                <td>Radhusområde Göteborg</td>
                <td><span class="status-indicator status-on-track">Aktiv</span></td>
              </tr>
              <tr>
                <td>IndustriCorp AB</td>
                <td>Lars Karlsson</td>
                <td>08-234 56 78</td>
                <td>lars@industricorp.se</td>
                <td>Industribyggnad Malmö</td>
                <td><span class="status-indicator">Planering</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="portal-grid">
          <div class="portal-card-dark">
            <h4><i class="fas fa-chart-line"></i> Kundstatistik</h4>
            <div class="metric-card">
              <div class="metric-value">42</div>
              <div class="metric-label">Totalt kunder</div>
            </div>
            <p><strong>Återkommande kunder:</strong> 68%</p>
            <p><strong>Genomsnittligt värde:</strong> 1.2 Mkr</p>
          </div>

          <div class="portal-card-dark">
            <h4><i class="fas fa-plus"></i> Lägg till kund</h4>
            <p>Lägg till ny kund i registret</p>
            <button class="btn btn-primary" onclick="alert('Kundformulär öppnas...')">Lägg till kund</button>
          </div>
        </div>
      `;
      showModal("Kundregister", content);
    });
  }
}

// Initialize reports tab buttons
function initializeReportsButtons() {
  // Hantera team button in overview tab
  const manageTeamOverviewBtn = document.querySelector("#company-overview .portal-card-dark:nth-child(5) button");
  if (manageTeamOverviewBtn && manageTeamOverviewBtn.textContent.includes("Hantera team")) {
    manageTeamOverviewBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const content = `
        <div class="portal-grid" style="margin-bottom: 2rem;">
          <div class="portal-card-dark">
            <h4><i class="fas fa-users"></i> Personalöversikt</h4>
            <div class="metric-card">
              <div class="metric-value">24</div>
              <div class="metric-label">Aktiva medarbetare</div>
            </div>
            <p><strong>Tillgängliga idag:</strong> 22</p>
            <p><strong>Semester/frånvaro:</strong> 2</p>
          </div>

          <div class="portal-card-dark">
            <h4><i class="fas fa-calendar-alt"></i> Schemaläggning</h4>
            <p><strong>Kommande vecka:</strong></p>
            <ul>
              <li>4 medarbetare på semester</li>
              <li>2 sjukskrivna</li>
              <li>1 utbildning</li>
            </ul>
          </div>
        </div>

        <h4>Projektilldelning</h4>
        <div class="activity-list">
          <div class="activity-info">
            <i class="fas fa-hard-hat"></i>
            <div>
              <strong>Villa Stocksund</strong>
              <p>8 medarbetare tilldelade | Projektledare: David Eriksson</p>
              <div style="margin-top: 0.5rem;">
                <button class="btn" onclick="alert('Lägger till personal...')">Lägg till personal</button>
                <button class="btn" style="margin-left: 0.5rem;" onclick="alert('Ändrar schema...')">Ändra schema</button>
              </div>
            </div>
          </div>
          <div class="activity-info">
            <i class="fas fa-hard-hat"></i>
            <div>
              <strong>Tillbyggnad Lidingö</strong>
              <p>6 medarbetare tilldelade | Projektledare: Anders Pettersson</p>
              <div style="margin-top: 0.5rem;">
                <button class="btn" onclick="alert('Lägger till personal...')">Lägg till personal</button>
                <button class="btn" style="margin-left: 0.5rem;" onclick="alert('Ändrar schema...')">Ändra schema</button>
              </div>
            </div>
          </div>
          <div class="activity-info">
            <i class="fas fa-hard-hat"></i>
            <div>
              <strong>Kontorsrenovering Stockholm</strong>
              <p>10 medarbetare tilldelade | Projektledare: Emma Lundgren</p>
              <div style="margin-top: 0.5rem;">
                <button class="btn" onclick="alert('Lägger till personal...')">Lägg till personal</button>
                <button class="btn" style="margin-left: 0.5rem;" onclick="alert('Ändrar schema...')">Ändra schema</button>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <button class="btn btn-primary" onclick="alert('Rekryteringsportal öppnas...')">Rekrytera ny personal</button>
        </div>
      `;
      showModal("Personalhantering", content);
    });
  }

  // Visa analys button in reports tab
  const showRiskAnalysisBtn = document.querySelector("#reports .portal-card-dark:nth-child(2) button");
  if (showRiskAnalysisBtn && showRiskAnalysisBtn.textContent.includes("Visa analys")) {
    showRiskAnalysisBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const content = `
        <div style="text-align: center; margin-bottom: 2rem;">
          <i class="fas fa-robot" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;"></i>
          <h4>AI Riskanalys - Detaljerad Rapport</h4>
          <p>Komplett riskanalys för alla pågående projekt med AI-genererade insikter och rekommendationer.</p>
        </div>

        <div class="portal-grid" style="margin-bottom: 2rem;">
          <div class="portal-card-dark">
            <h4><i class="fas fa-chart-line"></i> Risköversikt Q4 2023</h4>
            <div class="metric-card">
              <div class="metric-value">28</div>
              <div class="metric-label">Genomsnittlig riskpoäng</div>
            </div>
            <p><strong>Hög risk:</strong> 1 projekt (4%)</p>
            <p><strong>Medel risk:</strong> 6 projekt (25%)</p>
            <p><strong>Låg risk:</strong> 18 projekt (71%)</p>
          </div>

          <div class="portal-card-dark">
            <h4><i class="fas fa-clock"></i> Risktrend</h4>
            <div class="metric-card">
              <div class="metric-value">-12%</div>
              <div class="metric-label">Riskminskning sedan förra månaden</div>
            </div>
            <p>Genom förbättrade processer</p>
            <p><strong>Förbättringspotential:</strong> 15%</p>
          </div>
        </div>

        <h4>Topp 5 Riskfaktorer</h4>
        <div class="activity-list">
          <div class="activity-danger">
            <i class="fas fa-exclamation-circle"></i>
            <div>
              <strong>Väderberoende</strong>
              <p>Potentiella förseningar på 2-4 veckor under vintermånaderna. Risknivå: Hög</p>
              <p style="font-size: 0.9rem; color: #666;">Påverkar: 3 projekt | Sannolikhet: 65%</p>
            </div>
          </div>
          <div class="activity-warning">
            <i class="fas fa-exclamation-triangle"></i>
            <div>
              <strong>Materialleveranser</strong>
              <p>Möjliga förseningar på 1-2 veckor från internationella leverantörer. Risknivå: Medel</p>
              <p style="font-size: 0.9rem; color: #666;">Påverkar: 5 projekt | Sannolikhet: 40%</p>
            </div>
          </div>
          <div class="activity-warning">
            <i class="fas fa-exclamation-triangle"></i>
            <div>
              <strong>Arbetskraftstillgång</strong>
              <p>Begränsad tillgång till specialiserad arbetskraft under högsäsong. Risknivå: Medel</p>
              <p style="font-size: 0.9rem; color: #666;">Påverkar: 4 projekt | Sannolikhet: 35%</p>
            </div>
          </div>
          <div class="activity-info">
            <i class="fas fa-info-circle"></i>
            <div>
              <strong>Regulatoriska ändringar</strong>
              <p>Möjliga kostnadsökningar genom nya byggnormer. Risknivå: Låg</p>
              <p style="font-size: 0.9rem; color: #666;">Påverkar: 8 projekt | Sannolikhet: 20%</p>
            </div>
          </div>
          <div class="activity-info">
            <i class="fas fa-info-circle"></i>
            <div>
              <strong>Ekonomiska fluktuationer</strong>
              <p>Prisökningar på byggmaterial kan påverka marginaler. Risknivå: Låg</p>
              <p style="font-size: 0.9rem; color: #666;">Påverkar: Alla projekt | Sannolikhet: 25%</p>
            </div>
          </div>
        </div>

        <h4 style="margin-top: 2rem;">AI-Rekommendationer</h4>
        <div class="activity-list">
          <div class="activity-info">
            <i class="fas fa-lightbulb"></i>
            <div>
              <strong>Buffertlager för kritiska material</strong>
              <p>Öka lagerhållning av väderkänsliga material med 25% inför vinterperioden.</p>
            </div>
          </div>
          <div class="activity-info">
            <i class="fas fa-lightbulb"></i>
            <div>
              <strong>Diversifiera leverantörer</strong>
              <p>Etablera relationer med minst 3 alternativa leverantörer per materialgrupp.</p>
            </div>
          </div>
          <div class="activity-info">
            <i class="fas fa-lightbulb"></i>
            <div>
              <strong>Personalplanering</strong>
              <p>Planera rekrytering av 5 ytterligare specialister inför nästa byggsäsong.</p>
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; text-align: center;">
          <button class="btn btn-primary" onclick="alert('Laddar ner detaljerad riskrapport...')">Ladda ner komplett rapport (PDF)</button>
          <button class="btn" style="margin-left: 1rem;" onclick="alert('Öppnar riskhanteringssystem...')">Öppna riskhantering</button>
        </div>
      `;
      showModal("AI Riskanalys - Detaljerad Rapport", content);
    });
  }

  // Prestandarapport button in reports tab
  const performanceReportBtn = document.querySelector("#reports .portal-card-dark:nth-child(1) button");
  if (performanceReportBtn && performanceReportBtn.textContent.includes("Visa rapport")) {
    performanceReportBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const content = `
        <div style="text-align: center; margin-bottom: 2rem;">
          <i class="fas fa-chart-line" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
          <h4>Prestandarapport Q4 2023</h4>
          <p>Kvartalsvis översikt över företagets ekonomiska och operativa prestanda.</p>
        </div>

        <div class="portal-grid" style="margin-bottom: 2rem;">
          <div class="portal-card-dark">
            <h4><i class="fas fa-euro-sign"></i> Ekonomisk Prestanda</h4>
            <div class="metric-card">
              <div class="metric-value">12.5 Mkr</div>
              <div class="metric-label">Omsättning Q4</div>
            </div>
            <p><strong>Vinstmarginal:</strong> 28%</p>
            <p><strong>Tillväxt vs Q3:</strong> +15%</p>
            <p><strong>Prognos Q1 2024:</strong> +12%</p>
          </div>

          <div class="portal-card-dark">
            <h4><i class="fas fa-project-diagram"></i> Projektprestanda</h4>
            <div class="metric-card">
              <div class="metric-value">87%</div>
              <div class="metric-label">Projekt levererade i tid</div>
            </div>
            <p><strong>Genomsnittlig försening:</strong> 3.2 dagar</p>
            <p><strong>Kundnöjdhet:</strong> 94%</p>
            <p><strong>Återkommande kunder:</strong> 68%</p>
          </div>
        </div>

        <h4>Ekonomisk Utveckling</h4>
        <div class="portal-grid" style="margin-bottom: 2rem;">
          <div class="portal-card-dark">
            <h4>Månadsvis Omsättning</h4>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span>Oktober:</span>
              <span>3.8 Mkr</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span>November:</span>
              <span>4.2 Mkr</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span>December:</span>
              <span>4.5 Mkr</span>
            </div>
            <div style="border-top: 1px solid #eee; padding-top: 0.5rem; font-weight: bold;">
              <div style="display: flex; justify-content: space-between;">
                <span>Kvartal totalt:</span>
                <span>12.5 Mkr</span>
              </div>
            </div>
          </div>

          <div class="portal-card-dark">
            <h4>Kostnadsfördelning</h4>
            <div style="margin-bottom: 1rem;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                <span>Materialkostnader:</span>
                <span>42% (5.25 Mkr)</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                <span>Personalkostnader:</span>
                <span>38% (4.75 Mkr)</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                <span>Övriga kostnader:</span>
                <span>20% (2.5 Mkr)</span>
              </div>
            </div>
            <div class="chart-placeholder" style="height: 100px;">
              <i class="fas fa-chart-pie"></i> Kostnadsdiagram
            </div>
          </div>
        </div>

        <h4>Projektleveranser</h4>
        <div class="activity-list">
          <div class="activity-success">
            <i class="fas fa-check-circle"></i>
            <div>
              <strong>Villa Stocksund - Slutfört</strong>
              <p>Budget: 1.25 Mkr | Faktisk kostnad: 1.18 Mkr | Marginal: 32%</p>
              <p style="font-size: 0.9rem; color: #666;">Levererad 2 dagar före tid | Kundnöjdhet: 98%</p>
            </div>
          </div>
          <div class="activity-success">
            <i class="fas fa-check-circle"></i>
            <div>
              <strong>Tillbyggnad Lidingö - Slutfört</strong>
              <p>Budget: 850 Kkr | Faktisk kostnad: 875 Kkr | Marginal: 25%</p>
              <p style="font-size: 0.9rem; color: #666;">Levererad enligt plan | Kundnöjdhet: 95%</p>
            </div>
          </div>
          <div class="activity-warning">
            <i class="fas fa-clock"></i>
            <div>
              <strong>Kontorsrenovering Stockholm - Pågående</strong>
              <p>Budget: 2.1 Mkr | Prognostiserad kostnad: 2.05 Mkr | Marginal: 28%</p>
              <p style="font-size: 0.9rem; color: #666;">Förväntad leverans: 15 mar 2024 | Framsteg: 75%</p>
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; text-align: center;">
          <button class="btn btn-primary" onclick="alert('Laddar ner prestandarapport...')">Ladda ner komplett rapport (PDF)</button>
          <button class="btn" style="margin-left: 1rem;" onclick="alert('Exporterar till Excel...')">Exportera data (Excel)</button>
        </div>
      `;
      showModal("Prestandarapport Q4 2023", content);
    });
  }

  // Hållbarhetsrapport button in reports tab
  const sustainabilityReportBtn = document.querySelector("#reports .portal-card-dark:nth-child(3) button");
  if (sustainabilityReportBtn && sustainabilityReportBtn.textContent.includes("Visa rapport")) {
    sustainabilityReportBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const content = `
        <div style="text-align: center; margin-bottom: 2rem;">
          <i class="fas fa-leaf" style="font-size: 3rem; color: #28a745; margin-bottom: 1rem;"></i>
          <h4>Hållbarhetsrapport Q4 2023</h4>
          <p>Miljöpåverkan, hållbarhetsåtgärder och framtida mål för NordicBuild Group.</p>
        </div>

        <div class="portal-grid" style="margin-bottom: 2rem;">
          <div class="portal-card-dark">
            <h4><i class="fas fa-seedling"></i> Miljöpåverkan</h4>
            <div class="metric-card">
              <div class="metric-value">23%</div>
              <div class="metric-label">CO2-reduktion vs förra året</div>
            </div>
            <p><strong>Total CO2-utsläpp:</strong> 145 ton</p>
            <p><strong>Energiåtgång:</strong> 2.3 MWh</p>
            <p><strong>Avfall till deponi:</strong> 12%</p>
          </div>

          <div class="portal-card-dark">
            <h4><i class="fas fa-recycle"></i> Cirkulär Ekonomi</h4>
            <div class="metric-card">
              <div class="metric-value">68%</div>
              <div class="metric-label">Materialåtervinning</div>
            </div>
            <p><strong>Återanvänt material:</strong> 45%</p>
            <p><strong>Modulbyggnation:</strong> 78%</p>
            <p><strong>Långsiktig garanti:</strong> 15 år</p>
          </div>
        </div>

        <h4>Hållbarhetsinitiativ</h4>
        <div class="activity-list">
          <div class="activity-success">
            <i class="fas fa-check-circle"></i>
            <div>
              <strong>Gröna Material</strong>
              <p>80% av alla träprodukter kommer från hållbart certifierade skogar (FSC/PEFC).</p>
              <p style="font-size: 0.9rem; color: #666;">Påbörjad: Q2 2023 | Status: Implementerad</p>
            </div>
          </div>
          <div class="activity-success">
            <i class="fas fa-check-circle"></i>
            <div>
              <strong>Energioptimering</strong>
              <p>Installation av solpaneler på alla nya byggnader och energieffektiva lösningar.</p>
              <p style="font-size: 0.9rem; color: #666;">Påbörjad: Q3 2023 | Status: 65% genomfört</p>
            </div>
          </div>
          <div class="activity-info">
            <i class="fas fa-info-circle"></i>
            <div>
              <strong>Elfordonsflotta</strong>
              <p>Övergår till elektriska arbetsfordon för att minska CO2-utsläpp från transport.</p>
              <p style="font-size: 0.9rem; color: #666;">Planerad: Q1 2024 | Mål: 50% av flotta</p>
            </div>
          </div>
          <div class="activity-info">
            <i class="fas fa-info-circle"></i>
            <div>
              <strong>Avfallshantering</strong>
              <p>Implementering av Zero Waste-certifiering för alla byggprojekt.</p>
              <p style="font-size: 0.9rem; color: #666;">Planerad: Q2 2024 | Mål: 95% återvinning</p>
            </div>
          </div>
        </div>

        <h4 style="margin-top: 2rem;">Miljömål 2024</h4>
        <div class="portal-grid">
          <div class="portal-card-dark">
            <h4>Kortsiktiga Mål (2024)</h4>
            <ul style="padding-left: 1rem;">
              <li>CO2-reduktion: 30%</li>
              <li>Materialåtervinning: 75%</li>
              <li>Energi från förnybara källor: 40%</li>
              <li>Zero Waste-certifiering: 10 projekt</li>
            </ul>
          </div>

          <div class="portal-card-dark">
            <h4>Långsiktiga Mål (2025-2030)</h4>
            <ul style="padding-left: 1rem;">
              <li>Klimatneutral verksamhet: 2027</li>
              <li>100% förnybar energi: 2025</li>
              <li>Cirkulär ekonomi: 80% av projekt</li>
              <li>Biodiversitet: Positiv påverkan</li>
            </ul>
          </div>
        </div>

        <div style="margin-top: 2rem; text-align: center;">
          <button class="btn btn-primary" onclick="alert('Laddar ner hållbarhetsrapport...')">Ladda ner komplett rapport (PDF)</button>
          <button class="btn" style="margin-left: 1rem;" onclick="alert('Öppnar hållbarhetsportal...')">Hållbarhetsportal</button>
        </div>
      `;
      showModal("Hållbarhetsrapport Q4 2023", content);
    });
  }
}

// Initialize additional modal buttons for company portal
function initializeCompanyModalButtons() {
  // Replace "Skapa offert" and "Kontakta kund" buttons in request management modal
  const requestModalOfferButtons = document.querySelectorAll('.activity-warning button');
  requestModalOfferButtons.forEach(button => {
    if (button.textContent.includes('Skapa offert')) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const content = `
          <div style="text-align: center; padding: 2rem;">
            <i class="fas fa-file-invoice-dollar" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
            <h4>Skapa Offert</h4>
            <p>Generera en professionell offert baserat på kundens förfrågan.</p>
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin: 1rem 0; text-align: left;">
              <strong>Offertinnehåll:</strong>
              <ul style="margin-top: 0.5rem;">
                <li>Detaljerad kostnadsberäkning</li>
                <li>Tidsplan och milstolpar</li>
                <li>Materialspecifikationer</li>
                <li>Garantivillkor</li>
                <li>Betalningsplan</li>
              </ul>
            </div>
            <button class="btn btn-primary" onclick="alert('Offertgenerator öppnas...')">Öppna Offertgenerator</button>
          </div>
        `;
        showModal("Skapa Offert", content);
      });
    } else if (button.textContent.includes('Kontakta kund')) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const content = `
          <div style="text-align: center; padding: 2rem;">
            <i class="fas fa-envelope" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;"></i>
            <h4>Kontakta Kund</h4>
            <p>Skicka ett professionellt svar på kundens förfrågan.</p>
            <div style="display: flex; flex-direction: column; gap: 1rem; margin: 2rem 0;">
              <button class="btn btn-primary" onclick="alert('E-post öppnas...')">
                <i class="fas fa-envelope"></i> Skicka e-post
              </button>
              <button class="btn btn-primary" onclick="alert('Telefon öppnas...')">
                <i class="fas fa-phone"></i> Ring kund
              </button>
              <button class="btn btn-primary" onclick="alert('Möte bokas...')">
                <i class="fas fa-calendar-plus"></i> Boka möte
              </button>
            </div>
          </div>
        `;
        showModal("Kontakta Kund", content);
      });
    }
  });

  // Replace "Lägg till personal" and "Ändra schema" buttons in team management
  const teamModalButtons = document.querySelectorAll('.activity-info button');
  teamModalButtons.forEach(button => {
    if (button.textContent.includes('Lägg till personal')) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const content = `
          <div style="max-width: 500px; margin: 0 auto;">
            <h4>Lägg till Personal till Projekt</h4>
            <form style="display: flex; flex-direction: column; gap: 1rem;">
              <div>
                <label for="employeeSelect" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Välj Medarbetare</label>
                <select id="employeeSelect" class="form-control" required>
                  <option value="">Välj medarbetare...</option>
                  <option value="david">David Eriksson - Projektledare</option>
                  <option value="anders">Anders Pettersson - Snickare</option>
                  <option value="emma">Emma Lundgren - Elektriker</option>
                  <option value="lisa">Lisa Andersson - VVS-tekniker</option>
                  <option value="mikael">Mikael Karlsson - Målare</option>
                </select>
              </div>

              <div>
                <label for="roleSelect" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Roll i Projektet</label>
                <select id="roleSelect" class="form-control" required>
                  <option value="">Välj roll...</option>
                  <option value="projektledare">Projektledare</option>
                  <option value="snickare">Snickare</option>
                  <option value="elektriker">Elektriker</option>
                  <option value="vvs">VVS-tekniker</option>
                  <option value="malare">Målare</option>
                  <option value="grundare">Grundläggare</option>
                </select>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div>
                  <label for="startDate" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Tilldelningsdatum</label>
                  <input type="date" id="startDate" class="form-control" required>
                </div>
                <div>
                  <label for="allocation" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Allokering (%)</label>
                  <input type="number" id="allocation" class="form-control" min="1" max="100" value="100" required>
                </div>
              </div>

              <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                <button type="submit" class="btn btn-primary" style="flex: 1;" onclick="alert('Personal tillagd till projekt!')">Lägg till Personal</button>
                <button type="button" class="btn" onclick="this.closest('.custom-modal').remove()">Avbryt</button>
              </div>
            </form>
          </div>
        `;
        showModal("Lägg till Personal", content);
      });
    } else if (button.textContent.includes('Ändra schema')) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const content = `
          <div style="text-align: center; padding: 2rem;">
            <i class="fas fa-calendar-alt" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
            <h4>Ändra Projektsschema</h4>
            <p>Justera schemaläggning och resurstilldelning för projektet.</p>
            <div style="display: flex; flex-direction: column; gap: 1rem; margin: 2rem 0;">
              <button class="btn btn-primary" onclick="alert('Schemaläggare öppnas...')">
                <i class="fas fa-calendar-week"></i> Öppna Schemaläggare
              </button>
              <button class="btn btn-primary" onclick="alert('Resursplanering öppnas...')">
                <i class="fas fa-users-cog"></i> Resursplanering
              </button>
              <button class="btn btn-primary" onclick="alert('Tidsplan öppnas...')">
                <i class="fas fa-clock"></i> Justera Tidsplan
              </button>
            </div>
          </div>
        `;
        showModal("Ändra Schema", content);
      });
    }
  });

  // Replace "Lägg till kund" button in customer registry modal
  const addCustomerBtn = document.querySelector('#crm .portal-card-dark button');
  if (addCustomerBtn && addCustomerBtn.textContent.includes('Lägg till kund')) {
    addCustomerBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const content = `
        <div style="max-width: 500px; margin: 0 auto;">
          <h4>Lägg till Ny Kund</h4>
          <form style="display: flex; flex-direction: column; gap: 1rem;">
            <div>
              <label for="customerType" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Kundtyp</label>
              <select id="customerType" class="form-control" required>
                <option value="">Välj typ...</option>
                <option value="privat">Privatperson</option>
                <option value="foretag">Företag</option>
                <option value="offentlig">Offentlig sektor</option>
              </select>
            </div>

            <div>
              <label for="customerName" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Kundnamn/Företagsnamn</label>
              <input type="text" id="customerName" class="form-control" placeholder="t.ex. Familjen Andersson" required>
            </div>

            <div>
              <label for="contactPerson" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Kontaktperson</label>
              <input type="text" id="contactPerson" class="form-control" placeholder="t.ex. Anna Andersson" required>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div>
                <label for="phone" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Telefon</label>
                <input type="tel" id="phone" class="form-control" placeholder="070-123 45 67" required>
              </div>
              <div>
                <label for="email" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">E-post</label>
                <input type="email" id="email" class="form-control" placeholder="anna@email.se" required>
              </div>
            </div>

            <div>
              <label for="address" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Adress</label>
              <input type="text" id="address" class="form-control" placeholder="Storgatan 12, 123 45 Stockholm" required>
            </div>

            <div>
              <label for="notes" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Anteckningar</label>
              <textarea id="notes" class="form-control" rows="3" placeholder="Valfri information om kunden..."></textarea>
            </div>

            <div style="display: flex; gap: 1rem; margin-top: 1rem;">
              <button type="submit" class="btn btn-primary" style="flex: 1;" onclick="alert('Kund tillagd i registret!')">Lägg till Kund</button>
              <button type="button" class="btn" onclick="this.closest('.custom-modal').remove()">Avbryt</button>
            </div>
          </form>
        </div>
      `;
      showModal("Lägg till Ny Kund", content);
    });
  }



  // Replace "Ladda ner komplett rapport (PDF)" buttons in report modals
  const downloadReportButtons = document.querySelectorAll('button');
  downloadReportButtons.forEach(button => {
    if (button.textContent.includes('Ladda ner komplett rapport (PDF)')) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const content = `
          <div style="text-align: center; padding: 2rem;">
            <i class="fas fa-download" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
            <h4>Ladda ner Rapport</h4>
            <p>Rapporten innehåller detaljerad analys och kommer att laddas ner som PDF.</p>
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
              <strong>Rapportinnehåll:</strong>
              <ul style="text-align: left; margin-top: 0.5rem;">
                <li>Sammanfattning och nyckeltal</li>
                <li>Detaljerad analys</li>
                <li>Diagram och visualiseringar</li>
                <li>Rekommendationer</li>
                <li>Tekniska specifikationer</li>
              </ul>
            </div>
            <button class="btn btn-primary" onclick="alert('Rapporten laddas ner...')">Starta nedladdning</button>
          </div>
        `;
        showModal("Ladda ner Rapport", content);
      });
    }
  });

  // Replace "Exportera data (Excel)" buttons in report modals
  const exportDataButtons = document.querySelectorAll('button');
  exportDataButtons.forEach(button => {
    if (button.textContent.includes('Exportera data (Excel)')) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const content = `
          <div style="text-align: center; padding: 2rem;">
            <i class="fas fa-file-excel" style="font-size: 3rem; color: #28a745; margin-bottom: 1rem;"></i>
            <h4>Exportera Data till Excel</h4>
            <p>Välj vilka data du vill exportera och i vilket format.</p>
            <div style="display: flex; flex-direction: column; gap: 1rem; margin: 2rem 0;">
              <button class="btn btn-primary" onclick="alert('Exporterar till Excel...')">
                <i class="fas fa-file-excel"></i> Exportera komplett dataset (.xlsx)
              </button>
              <button class="btn btn-primary" onclick="alert('Exporterar till CSV...')">
                <i class="fas fa-file-csv"></i> Exportera som CSV (.csv)
              </button>
              <button class="btn" onclick="alert('Anpassade alternativ öppnas...')">
                <i class="fas fa-cogs"></i> Anpassade exportalternativ
              </button>
            </div>
            <p style="font-size: 0.9rem; color: #666;">Alla data exporteras enligt GDPR och dataskyddsregler.</p>
          </div>
        `;
        showModal("Exportera Data", content);
      });
    }
  });

  // Replace "Öppna riskhantering" button in risk analysis modal
  const riskManagementBtn = document.querySelector('button');
  if (riskManagementBtn && riskManagementBtn.textContent.includes('Öppna riskhantering')) {
    riskManagementBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const content = `
        <div style="text-align: center; padding: 2rem;">
          <i class="fas fa-shield-alt" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
          <h4>Riskhanteringssystem</h4>
          <p>Öppna det avancerade riskhanteringssystemet för detaljerad analys och åtgärdsplanering.</p>
          <div style="display: flex; flex-direction: column; gap: 1rem; margin: 2rem 0;">
            <button class="btn btn-primary" onclick="alert('Riskhanteringssystem öppnas...')">
              <i class="fas fa-external-link-alt"></i> Öppna Riskhantering
            </button>
            <button class="btn" onclick="alert('Riskrapport öppnas...')">
              <i class="fas fa-file-alt"></i> Visa Riskrapport
            </button>
          </div>
          <p style="font-size: 0.9rem; color: #666;">Systemet innehåller realtidsuppdateringar och AI-driven riskanalys.</p>
        </div>
      `;
      showModal("Riskhantering", content);
    });
  }

  // Replace "Hållbarhetsportal" button in sustainability report modal
  const sustainabilityPortalBtn = document.querySelector('button');
  if (sustainabilityPortalBtn && sustainabilityPortalBtn.textContent.includes('Hållbarhetsportal')) {
    sustainabilityPortalBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const content = `
        <div style="text-align: center; padding: 2rem;">
          <i class="fas fa-leaf" style="font-size: 3rem; color: #28a745; margin-bottom: 1rem;"></i>
          <h4>Hållbarhetsportal</h4>
          <p>Utforska NordicBuilds hållbarhetsinitiativ och miljöarbete.</p>
          <div style="display: flex; flex-direction: column; gap: 1rem; margin: 2rem 0;">
            <button class="btn btn-primary" onclick="alert('Hållbarhetsportal öppnas...')">
              <i class="fas fa-external-link-alt"></i> Öppna Hållbarhetsportal
            </button>
            <button class="btn" onclick="alert('Miljöpolicy öppnas...')">
              <i class="fas fa-file-contract"></i> Miljöpolicy & Certifieringar
            </button>
            <button class="btn" onclick="alert('Hållbarhetsmål öppnas...')">
              <i class="fas fa-target"></i> Hållbarhetsmål 2030
            </button>
          </div>
          <p style="font-size: 0.9rem; color: #666;">Portalen innehåller interaktiva verktyg för hållbarhetsuppföljning.</p>
        </div>
      `;
      showModal("Hållbarhetsportal", content);
    });
  }

  // Replace "Rekrytera ny personal" button in team modal
  const recruitBtn = document.querySelector('.activity-list button');
  if (recruitBtn && recruitBtn.textContent.includes('Rekrytera ny personal')) {
    recruitBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const content = `
        <div style="text-align: center; padding: 2rem;">
          <i class="fas fa-user-plus" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;"></i>
          <h4>Rekrytera Ny Personal</h4>
          <p>Starta rekryteringsprocessen för nya medarbetare.</p>
          <div style="display: flex; flex-direction: column; gap: 1rem; margin: 2rem 0;">
            <button class="btn btn-primary" onclick="alert('Rekryteringsportal öppnas...')">
              <i class="fas fa-external-link-alt"></i> Öppna Rekryteringsportal
            </button>
            <button class="btn" onclick="alert('Lediga tjänster visas...')">
              <i class="fas fa-list"></i> Visa Lediga Tjänster
            </button>
            <button class="btn" onclick="alert('Rekryteringsstatistik öppnas...')">
              <i class="fas fa-chart-bar"></i> Rekryteringsstatistik
            </button>
          </div>
          <p style="font-size: 0.9rem; color: #666;">Vi använder ett modernt rekryteringssystem med AI-driven kandidatmatchning.</p>
        </div>
      `;
      showModal("Rekrytera Personal", content);
    });
  }
}

// Initialize all interactive elements on page load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize accordions for active tab
  const activeTab = document.querySelector(".tab-content.active");
  if (activeTab) {
    initializeTabInteractivity(activeTab.id);
  }

  // Initialize progress tooltips
  initializeProgressTooltips();

  // Initialize swipe gestures for mobile
  initializeSwipeGestures();

  // Initialize back to top button
  initializeBackToTop();

  // Initialize company portal button functionality
  initializeCompanyButtons();

  // Initialize additional modal buttons for company portal
  initializeCompanyModalButtons();
});
