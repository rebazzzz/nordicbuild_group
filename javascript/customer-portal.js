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
