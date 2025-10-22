// Mobile Navigation Toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Tab Navigation
document.querySelectorAll(".tab-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    // Get the tab to activate
    const tabId = this.getAttribute("data-tab");

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

// Initialize button functionality
function initializeButtons() {
  // Visa alla uppdateringar button
  const showAllUpdatesBtn = document.querySelector(
    "#overview .expandable-header strong"
  );
  if (
    showAllUpdatesBtn &&
    showAllUpdatesBtn.textContent.includes("Visa alla uppdateringar")
  ) {
    showAllUpdatesBtn.parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      const content = `
        <div class="activity-list">
          <div class="activity-success">
            <i class="fas fa-check-circle"></i>
            <div>
              <strong>Projektstart</strong>
              <p>15 augusti 2023 - Alla förberedelser slutförda och byggnation påbörjad.</p>
            </div>
          </div>
          <div class="activity-success">
            <i class="fas fa-check-circle"></i>
            <div>
              <strong>Markberedelse</strong>
              <p>5 september 2023 - Tomten är nu klar för byggnation.</p>
            </div>
          </div>
          <div class="activity-success">
            <i class="fas fa-check-circle"></i>
            <div>
              <strong>Grundläggning</strong>
              <p>15 oktober 2023 - Grundarbetet är nu helt färdigt.</p>
            </div>
          </div>
          <div class="activity-success">
            <i class="fas fa-check-circle"></i>
            <div>
              <strong>Stomme uppförd</strong>
              <p>22 oktober 2023 - All stomme är nu uppförd och godkänd.</p>
            </div>
          </div>
          <div class="activity-warning">
            <i class="fas fa-clock"></i>
            <div>
              <strong>Takläggning pågår</strong>
              <p>Pågår - Förväntad slutföring 20 november 2023.</p>
            </div>
          </div>
          <div class="activity-success">
            <i class="fas fa-check-circle"></i>
            <div>
              <strong>Planering & Tillstånd</strong>
              <p>30 augusti 2023 - Alla tillstånd godkända.</p>
            </div>
          </div>
        </div>
      `;
      showModal("Alla Projektuppdateringar", content);
    });
  }

  // Visa alla bilder button
  const showAllImagesBtn = document.querySelector("#overview button");
  if (
    showAllImagesBtn &&
    showAllImagesBtn.textContent.includes("Visa alla bilder")
  ) {
    showAllImagesBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const content = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
          <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Byggprojekt bild 1" style="border-radius: 8px; width: 100%;"/>
          <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Byggprojekt bild 2" style="border-radius: 8px; width: 100%;"/>
          <img src="https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Byggprojekt bild 3" style="border-radius: 8px; width: 100%;"/>
          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Byggprojekt bild 4" style="border-radius: 8px; width: 100%;"/>
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Byggprojekt bild 5" style="border-radius: 8px; width: 100%;"/>
          <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Byggprojekt bild 6" style="border-radius: 8px; width: 100%;"/>
        </div>
        <div style="margin-top: 1rem;">
          <h4>Veckouppdateringar</h4>
          <div class="activity-list">
            <div><strong>Veckouppdatering 25/10:</strong> Takarbetet har påbörjats och stommen är nu helt färdig.</div>
            <div><strong>Veckouppdatering 18/10:</strong> Grundarbetet är slutfört och vi har påbörjat stomresningen.</div>
            <div><strong>Veckouppdatering 11/10:</strong> Markberedelse och grundläggning pågår enligt plan.</div>
            <div><strong>Veckouppdatering 4/10:</strong> Alla materialleveranser har kommit i tid.</div>
          </div>
        </div>
      `;
      showModal("Alla Projektbilder och Uppdateringar", content);
    });
  }

  // Ladda ner rapport button
  const downloadReportBtn = document.querySelector("#energy button");
  if (
    downloadReportBtn &&
    downloadReportBtn.textContent.includes("Ladda ner fullständig rapport")
  ) {
    downloadReportBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const content = `
        <div style="text-align: center; padding: 2rem;">
          <i class="fas fa-download" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;"></i>
          <h4>Energirapport för Villa Stocksund</h4>
          <p>Rapporten innehåller detaljerad analys av energiförbrukning, besparingar och rekommendationer.</p>
          <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
            <strong>Rapportinnehåll:</strong>
            <ul style="text-align: left; margin-top: 0.5rem;">
              <li>Energianalys baserat på design</li>
              <li>Kostnadsbesparingar (8 500 kr/år)</li>
              <li>Effektivitetsrekommendationer</li>
              <li>Miljöpåverkan</li>
              <li>Tekniska specifikationer</li>
            </ul>
          </div>
          <button class="btn btn-primary" onclick="alert('Rapporten laddas ner...')">Starta nedladdning</button>
        </div>
      `;
      showModal("Ladda ner Energirapport", content);
    });
  }

  // Visa alla fakturor button
  const showAllInvoicesBtn = document.querySelector("#invoices button");
  if (
    showAllInvoicesBtn &&
    showAllInvoicesBtn.textContent.includes("Visa alla fakturor")
  ) {
    showAllInvoicesBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const content = `
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Fakturanr</th>
                <th>Belopp</th>
                <th>Förfallodatum</th>
                <th>Status</th>
                <th>Åtgärd</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>NBG-23001</td>
                <td>125 000 kr</td>
                <td>20 okt 2023</td>
                <td><span class="status-indicator status-on-track">Betald</span></td>
                <td><button class="btn" onclick="alert('Öppnar faktura...')">Visa</button></td>
              </tr>
              <tr>
                <td>NBG-23002</td>
                <td>175 000 kr</td>
                <td>15 nov 2023</td>
                <td><span class="status-indicator">Väntar</span></td>
                <td><button class="btn" onclick="alert('Öppnar faktura...')">Visa</button></td>
              </tr>
              <tr>
                <td>NBG-23003</td>
                <td>200 000 kr</td>
                <td>15 dec 2023</td>
                <td><span class="status-indicator">Väntar</span></td>
                <td><button class="btn" onclick="alert('Öppnar faktura...')">Visa</button></td>
              </tr>
              <tr>
                <td>NBG-23004</td>
                <td>125 000 kr</td>
                <td>15 jan 2024</td>
                <td><span class="status-indicator">Väntar</span></td>
                <td><button class="btn" onclick="alert('Öppnar faktura...')">Visa</button></td>
              </tr>
              <tr>
                <td>NBG-23005</td>
                <td>150 000 kr</td>
                <td>15 feb 2024</td>
                <td><span class="status-indicator">Väntar</span></td>
                <td><button class="btn" onclick="alert('Öppnar faktura...')">Visa</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="margin-top: 1rem; text-align: center;">
          <strong>Totalt: 775 000 kr</strong> | <strong>Betalt: 125 000 kr</strong> | <strong>Återstår: 650 000 kr</strong>
        </div>
      `;
      showModal("Alla Fakturor", content);
    });
  }

  // Visa alla fakturor button in overview
  const invoiceCard = Array.from(document.querySelectorAll("#overview .portal-card-dark")).find(card => card.querySelector("h3 i.fa-file-invoice"));
  const showAllInvoicesOverviewBtn = invoiceCard ? invoiceCard.querySelector("button") : null;
  if (showAllInvoicesOverviewBtn && showAllInvoicesOverviewBtn.textContent.includes("Visa alla fakturor")) {
    showAllInvoicesOverviewBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const content = `
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Fakturanr</th>
                <th>Belopp</th>
                <th>Förfallodatum</th>
                <th>Status</th>
                <th>Åtgärd</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>NBG-23001</td>
                <td>125 000 kr</td>
                <td>20 okt 2023</td>
                <td><span class="status-indicator status-on-track">Betald</span></td>
                <td><button class="btn" onclick="alert('Öppnar faktura...')">Visa</button></td>
              </tr>
              <tr>
                <td>NBG-23002</td>
                <td>175 000 kr</td>
                <td>15 nov 2023</td>
                <td><span class="status-indicator">Väntar</span></td>
                <td><button class="btn" onclick="alert('Öppnar faktura...')">Visa</button></td>
              </tr>
              <tr>
                <td>NBG-23003</td>
                <td>200 000 kr</td>
                <td>15 dec 2023</td>
                <td><span class="status-indicator">Väntar</span></td>
                <td><button class="btn" onclick="alert('Öppnar faktura...')">Visa</button></td>
              </tr>
              <tr>
                <td>NBG-23004</td>
                <td>125 000 kr</td>
                <td>15 jan 2024</td>
                <td><span class="status-indicator">Väntar</span></td>
                <td><button class="btn" onclick="alert('Öppnar faktura...')">Visa</button></td>
              </tr>
              <tr>
                <td>NBG-23005</td>
                <td>150 000 kr</td>
                <td>15 feb 2024</td>
                <td><span class="status-indicator">Väntar</span></td>
                <td><button class="btn" onclick="alert('Öppnar faktura...')">Visa</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="margin-top: 1rem; text-align: center;">
          <strong>Totalt: 775 000 kr</strong> | <strong>Betalt: 125 000 kr</strong> | <strong>Återstår: 650 000 kr</strong>
        </div>
      `;
      showModal("Alla Fakturor", content);
    });
  }

  // Hantera fakturor button in overview
  const manageInvoicesBtn = document.querySelector("#overview .portal-card-dark:nth-child(4) button");
  if (manageInvoicesBtn && manageInvoicesBtn.textContent.includes("Hantera fakturor")) {
    manageInvoicesBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const content = `
        <div class="table-responsive" style="margin-bottom: 2rem;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Fakturanr</th>
                <th>Belopp</th>
                <th>Förfallodatum</th>
                <th>Status</th>
                <th>Åtgärd</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>NBG-23001</td>
                <td>125 000 kr</td>
                <td>20 okt 2023</td>
                <td><span class="status-indicator status-on-track">Betald</span></td>
                <td><button class="btn" onclick="alert('Öppnar faktura...')">Visa</button></td>
              </tr>
              <tr>
                <td>NBG-23002</td>
                <td>175 000 kr</td>
                <td>15 nov 2023</td>
                <td><span class="status-indicator">Väntar</span></td>
                <td><button class="btn" onclick="alert('Öppnar faktura...')">Visa</button></td>
              </tr>
              <tr>
                <td>NBG-23003</td>
                <td>200 000 kr</td>
                <td>15 dec 2023</td>
                <td><span class="status-indicator">Väntar</span></td>
                <td><button class="btn" onclick="alert('Öppnar faktura...')">Visa</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="margin-top: 1rem; text-align: center;">
          <strong>Totalt: 500 000 kr</strong> | <strong>Betalt: 125 000 kr</strong> | <strong>Återstår: 375 000 kr</strong>
        </div>
      `;
      showModal("Fakturor", content);
    });
  }

  // Visa alla dokument button
  const showAllDocumentsBtn = document.querySelector("#documents button");
  if (
    showAllDocumentsBtn &&
    showAllDocumentsBtn.textContent.includes("Visa alla dokument")
  ) {
    showAllDocumentsBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const content = `
        <div class="file-list" style="max-height: 400px; overflow-y: auto;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; border-bottom: 1px solid #eee;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <i class="fas fa-file-pdf" style="color: #dc3545;"></i>
              <div>
                <a href="#" onclick="alert('Öppnar dokument...')">Slutlig byggritning.pdf</a>
                <div style="font-size: 0.8rem; color: #666;">2.4 MB - 25 okt 2023</div>
              </div>
            </div>
            <button class="btn" onclick="alert('Laddar ner...')">Ladda ner</button>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; border-bottom: 1px solid #eee;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <i class="fas fa-file-pdf" style="color: #dc3545;"></i>
              <div>
                <a href="#" onclick="alert('Öppnar dokument...')">Materiallista.pdf</a>
                <div style="font-size: 0.8rem; color: #666;">1.1 MB - 20 okt 2023</div>
              </div>
            </div>
            <button class="btn" onclick="alert('Laddar ner...')">Ladda ner</button>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; border-bottom: 1px solid #eee;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <i class="fas fa-file-image" style="color: #28a745;"></i>
              <div>
                <a href="#" onclick="alert('Öppnar dokument...')">Färgval exteriör.jpg</a>
                <div style="font-size: 0.8rem; color: #666;">3.2 MB - 18 okt 2023</div>
              </div>
            </div>
            <button class="btn" onclick="alert('Laddar ner...')">Ladda ner</button>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; border-bottom: 1px solid #eee;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <i class="fas fa-file-contract" style="color: #007bff;"></i>
              <div>
                <a href="#" onclick="alert('Öppnar dokument...')">Avtal reviderad.docx</a>
                <div style="font-size: 0.8rem; color: #666;">0.8 MB - 15 okt 2023</div>
              </div>
            </div>
            <button class="btn" onclick="alert('Laddar ner...')">Ladda ner</button>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; border-bottom: 1px solid #eee;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <i class="fas fa-file-pdf" style="color: #dc3545;"></i>
              <div>
                <a href="#" onclick="alert('Öppnar dokument...')">El-ritningar.pdf</a>
                <div style="font-size: 0.8rem; color: #666;">1.5 MB - 12 okt 2023</div>
              </div>
            </div>
            <button class="btn" onclick="alert('Laddar ner...')">Ladda ner</button>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; border-bottom: 1px solid #eee;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <i class="fas fa-file-pdf" style="color: #dc3545;"></i>
              <div>
                <a href="#" onclick="alert('Öppnar dokument...')">VVS-ritningar.pdf</a>
                <div style="font-size: 0.8rem; color: #666;">1.3 MB - 10 okt 2023</div>
              </div>
            </div>
            <button class="btn" onclick="alert('Laddar ner...')">Ladda ner</button>
          </div>
        </div>
      `;
      showModal("Alla Dokument", content);
    });
  }
}

// Initialize additional modal buttons
function initializeModalButtons() {
  // Ladda ner fullständig rapport button in overview
  const downloadEnergyReportBtn = document.querySelector("#overview .portal-card-dark:nth-child(3) button");
  if (downloadEnergyReportBtn && downloadEnergyReportBtn.textContent.includes("Ladda ner fullständig rapport")) {
    downloadEnergyReportBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const content = `
        <div style="text-align: center; padding: 2rem;">
          <i class="fas fa-download" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;"></i>
          <h4>Energirapport för Villa Stocksund</h4>
          <p>Rapporten innehåller detaljerad analys av energiförbrukning, besparingar och rekommendationer.</p>
          <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
            <strong>Rapportinnehåll:</strong>
            <ul style="text-align: left; margin-top: 0.5rem;">
              <li>Energianalys baserat på design</li>
              <li>Kostnadsbesparingar (8 500 kr/år)</li>
              <li>Effektivitetsrekommendationer</li>
              <li>Miljöpåverkan</li>
              <li>Tekniska specifikationer</li>
            </ul>
          </div>
          <button class="btn btn-primary" onclick="alert('Rapporten laddas ner...')">Starta nedladdning</button>
        </div>
      `;
      showModal("Ladda ner Energirapport", content);
    });
  }

  // Exportera till kalender button in calendar tab
  const exportCalendarBtn = document.querySelector("#calendar button");
  if (exportCalendarBtn && exportCalendarBtn.textContent.includes("Exportera till kalender")) {
    exportCalendarBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const content = `
        <div style="text-align: center; padding: 2rem;">
          <i class="fas fa-calendar-plus" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
          <h4>Exportera Projektkalender</h4>
          <p>Välj vilket kalenderformat du vill exportera till:</p>
          <div style="display: flex; flex-direction: column; gap: 1rem; margin: 2rem 0;">
            <button class="btn btn-primary" onclick="alert('Exporterar till Google Calendar...')">
              <i class="fab fa-google"></i> Google Calendar
            </button>
            <button class="btn btn-primary" onclick="alert('Exporterar till Outlook...')">
              <i class="fab fa-microsoft"></i> Outlook Calendar
            </button>
            <button class="btn btn-primary" onclick="alert('Exporterar till Apple Calendar...')">
              <i class="fab fa-apple"></i> Apple Calendar
            </button>
            <button class="btn" onclick="alert('Laddar ner .ics-fil...')">
              <i class="fas fa-download"></i> Ladda ner .ics-fil
            </button>
          </div>
          <p style="font-size: 0.9rem; color: #666;">Alla viktiga datum från ditt projekt kommer att läggas till i din kalender.</p>
        </div>
      `;
      showModal("Exportera till Kalender", content);
    });
  }

  // Ladda ner garantidokument button in warranties tab
  const downloadWarrantyBtn = document.querySelector("#warranties button");
  if (downloadWarrantyBtn && downloadWarrantyBtn.textContent.includes("Ladda ner garantidokument")) {
    downloadWarrantyBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const content = `
        <div style="text-align: center; padding: 2rem;">
          <i class="fas fa-shield-alt" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
          <h4>Garantidokument för Villa Stocksund</h4>
          <p>Ladda ner dina garantidokument och information om garantiperioder.</p>
          <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
            <strong>Tillgängliga dokument:</strong>
            <ul style="text-align: left; margin-top: 0.5rem;">
              <li>Huvudgaranti - Bygggaranti (20 år)</li>
              <li>Elinstallationer - 5 års garanti</li>
              <li>VVS-installationer - 5 års garanti</li>
              <li>Värmepump - 7 års garanti</li>
              <li>Ventilation - 3 års garanti</li>
            </ul>
          </div>
          <div style="display: flex; gap: 1rem; justify-content: center;">
            <button class="btn btn-primary" onclick="alert('Laddar ner alla garantidokument...')">Ladda ner alla</button>
            <button class="btn" onclick="alert('Öppnar garantidokument online...')">Visa online</button>
          </div>
        </div>
      `;
      showModal("Garantidokument", content);
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

  // Initialize button functionality
  initializeButtons();

  // Initialize additional modal buttons
  initializeModalButtons();
});
