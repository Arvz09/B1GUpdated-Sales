let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
let homeSection = document.querySelector(".home-section"); // Select home section

// Toggle Sidebar and Adjust Home Section
closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  adjustHomeSection();
  menuBtnChange();
});

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    adjustHomeSection();
    menuBtnChange();
  });
}

function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
  }
}

// Adjust Home Section Based on Sidebar State
function adjustHomeSection() {
  if (homeSection) {
    if (sidebar.classList.contains("open")) {
      homeSection.style.left = "250px";
      homeSection.style.width = "calc(100% - 250px)";
    } else {
      homeSection.style.left = "78px";
      homeSection.style.width = "calc(100% - 78px)";
    }
  }
}

// Ensure Home Section Matches Sidebar State on Load
if (homeSection) {
  adjustHomeSection();
}

// Get the current page URL
const currentPage = window.location.pathname;

// Mapping of page URLs to link IDs
const pages = {
  "/Pages/Dashboard/AdminDashboard.html": "dashboard-link",
  "/Pages/Agents/AdminAgent.html": "agents-link",
  "/Pages/Order/AdminOrder.html": "order-link",
  "/Pages/Client/AdminClient.html": "clients-link",
  "/Pages/Settings/AdminSettings.html": "settings-link",
};

// Set active state
if (pages[currentPage]) {
  let activeLink = document.getElementById(pages[currentPage]);
  if (activeLink) {
    activeLink.classList.add("active");
    activeLink.style.pointerEvents = "none"; // Disable clicking
  }
}

// Handle logout with custom popup
function setupLogout() {
  const logoutBtn = document.querySelector("#log_out");
  const logoutPopup = document.querySelector("#logoutPopup");
  const closePopupBtn = document.querySelector("#closePopup");
  const cancelLogoutBtn = document.querySelector("#cancelLogout");
  const confirmLogoutBtn = document.querySelector("#confirmLogout");

  if (logoutBtn && logoutPopup) {
    // Show popup when logout button is clicked
    logoutBtn.addEventListener("click", function (event) {
      event.preventDefault();
      logoutPopup.style.display = "flex";
    });

    // Close popup functions
    function closePopup() {
      logoutPopup.style.display = "none";
    }

    // Close popup when close button is clicked
    if (closePopupBtn) {
      closePopupBtn.addEventListener("click", closePopup);
    }

    // Close popup when cancel button is clicked
    if (cancelLogoutBtn) {
      cancelLogoutBtn.addEventListener("click", closePopup);
    }

    // Perform logout when confirm button is clicked
    if (confirmLogoutBtn) {
      confirmLogoutBtn.addEventListener("click", function () {
        window.location.href = "/Pages/Login/Login.html";
      });
    }

    // Close popup when clicking outside
    logoutPopup.addEventListener("click", function (event) {
      if (event.target === logoutPopup) {
        closePopup();
      }
    });

    // Close popup when Escape key is pressed
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && logoutPopup.style.display === "flex") {
        closePopup();
      }
    });

    console.log("Logout popup initialized successfully");
  } else {
    console.error("Logout button or popup not found");
  }
}

// If DOM is already loaded, setup logout immediately
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupLogout);
} else {
  // DOM is already loaded
  setupLogout();
}
