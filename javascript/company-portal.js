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
    if (tabContent) {
      tabContent.innerHTML =
        '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Laddar...</div>';
    }

    // Simulate loading delay for better UX
    setTimeout(() => {
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
const riskAnalysisBtn = document.getElementById("runRiskAnalysis");
const riskResults = document.getElementById("riskResults");
const riskScore = document.getElementById("riskScore");
const riskLevel = document.getElementById("riskLevel");
const riskFactors = document.getElementById("riskFactors");

if (riskAnalysisBtn) {
  riskAnalysisBtn.addEventListener("click", () => {
    // Show loading state
    riskAnalysisBtn.textContent = "Analyserar risker...";
    riskAnalysisBtn.disabled = true;

    // Simulate AI analysis delay
    setTimeout(() => {
      runRiskAnalysis();
      riskAnalysisBtn.textContent = "Kör riskanalys";
      riskAnalysisBtn.disabled = false;
    }, 2000);
  });
}

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
});
