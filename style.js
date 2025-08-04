// Custom Alert Modal
function showCustomAlert(message) {
  const customAlert = document.getElementById("customAlert");
  const alertMessage = document.getElementById("alertMessage");
  alertMessage.textContent = message;
  customAlert.style.display = "flex"; // Show the modal
  // Close on "OK" button click
  document.getElementById("alertCloseBtn").onclick = () => {
    customAlert.style.display = "none";
  };
  // Close on outside click
  customAlert.onclick = (event) => {
    if (event.target === customAlert) {
      customAlert.style.display = "none";
    }
  };
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px", // Adjust margin to fine-tune when animation triggers
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // Stop observing once visible if you want the animation to happen only once
      // observer.unobserve(entry.target);
    } else {
      // Optional: remove 'visible' class if element scrolls out of view
      // entry.target.classList.remove("visible");
    }
  });
}, observerOptions);

// Observe all elements with the 'fade-in' class
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Theme toggle function
function toggleTheme() {
  const isDarkMode = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  updateThemeButtonText(isDarkMode);
  // Update particle colors when theme changes
  particles.forEach((p) => {
    p.color = isDarkMode ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)";
  });
}

// Function to update the theme toggle button text
function updateThemeButtonText(isDarkMode) {
  const themeToggleBtn = document.querySelector(".theme-toggle");
  if (themeToggleBtn) {
    themeToggleBtn.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
  }
}

// Initialize theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  const isDarkMode = savedTheme === "dark";
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  }
  updateThemeButtonText(isDarkMode);

  // Handle contact form submission
  document
    .querySelector(".contact-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      // Add actual form submission logic here (e.g., fetch API)
      showCustomAlert("Message sent! I'll get back to you soon.");
      this.reset(); // Clear form fields after submission
    });

  // Active navigation link highlighting on scroll
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;
    const sections = document.querySelectorAll("section[id]");

    sections.forEach((section) => {
      // Adjust offset for fixed header height
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        // Remove 'active' class from all nav links
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.classList.remove("active");
        });
        // Add 'active' class to the current section's nav link
        document
          .querySelector(`.nav-links a[href="#${sectionId}"]`)
          ?.classList.add("active");
      }
    });
  });

  // --- Particle Effect Implementation ---
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");
  let particles = []; // Array to hold all active particles
  const maxParticles = 150; // Maximum number of particles to draw at once
  const particleCountOnMove = 3; // Number of new particles to create on each mouse movement

  // Function to resize canvas to fill the entire window
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Add event listener for window resize to adjust canvas size
  window.addEventListener("resize", resizeCanvas);
  // Initial call to set canvas size
  resizeCanvas();

  // Particle class definition
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = Math.random() * 2 + 0.5; // Random size for particle
      // Set particle color based on current theme
      this.color = document.body.classList.contains("dark-mode")
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(0, 0, 0, 0.8)";
      this.alpha = 1; // Initial opacity
      this.speed = Math.random() * 2 + 0.5; // Random movement speed
      this.angle = Math.random() * Math.PI * 2; // Random direction (0 to 2*PI radians)
      this.vx = Math.cos(this.angle) * this.speed; // Velocity in x direction
      this.vy = Math.sin(this.angle) * this.speed; // Velocity in y direction
      this.friction = 0.95; // Factor to slow down particles over time
      this.lifeSpan = Math.random() * 60 + 30; // How many frames the particle lives
      this.currentLife = 0; // Current life count
    }

    // Update particle's position, velocity, and alpha
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.currentLife++;
      // Calculate alpha to fade out particle over its lifespan
      this.alpha = 1 - this.currentLife / this.lifeSpan;
      if (this.alpha < 0) this.alpha = 0; // Prevent negative alpha
    }

    // Draw the particle on the canvas
    draw() {
      ctx.save(); // Save current canvas state
      ctx.globalAlpha = this.alpha; // Apply current particle opacity
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // Draw a circle
      ctx.fillStyle = this.color; // Set fill color
      ctx.fill(); // Fill the circle
      ctx.restore(); // Restore canvas state
    }
  }

  // Event listener to create particles on mouse movement
  document.addEventListener("mousemove", (e) => {
    for (let i = 0; i < particleCountOnMove; i++) {
      // Only add new particles if below the max limit
      if (particles.length < maxParticles) {
        particles.push(new Particle(e.clientX, e.clientY));
      }
    }
  });

  // Animation loop for particles
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas

    // Iterate through particles from end to beginning to safely remove them
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update(); // Update particle state
      particles[i].draw(); // Draw particle on canvas

      // Remove particle if it has faded out or reached end of its life
      if (
        particles[i].alpha <= 0.05 ||
        particles[i].currentLife >= particles[i].lifeSpan
      ) {
        particles.splice(i, 1); // Remove particle from array
      }
    }
    requestAnimationFrame(animateParticles); // Request next animation frame
  }

  // Start the particle animation loop
  animateParticles();

  // Back to Top Button Functionality
  const backToTopButton = document.getElementById("backToTop");

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  // Smooth scroll to top when button is clicked
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// Function to update file name display for custom file upload
function updateFileName(input) {
  const fileNameDisplay = document.getElementById("file-name");
  if (input.files && input.files.length > 0) {
    fileNameDisplay.textContent = input.files[0].name;
  } else {
    fileNameDisplay.textContent = "No file chosen";
  }
}
