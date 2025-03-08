document.addEventListener("DOMContentLoaded", () => {
  // Preloader animation
  const preloader = document.querySelector(".preloader")
  const body = document.querySelector("body")

  // Function to hide preloader and show main content
  function hidePreloader() {
    preloader.classList.add("loaded")
    body.classList.add("loaded")

    // Remove preloader from DOM after animation completes
    setTimeout(() => {
      preloader.style.display = "none"
    }, 1500)
  }

  // Hide preloader after animations complete (adjust timing as needed)
  setTimeout(hidePreloader, 4500)

  // Custom cursor
  const cursor = document.querySelector(".custom-cursor")

  if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
    })

    document.addEventListener("mousedown", () => {
      cursor.style.width = "15px"
      cursor.style.height = "15px"
      cursor.style.borderColor = "var(--color-secondary)"
    })

    document.addEventListener("mouseup", () => {
      cursor.style.width = "20px"
      cursor.style.height = "20px"
      cursor.style.borderColor = "var(--color-primary)"
    })

    // Expand cursor on hoverable elements
    const hoverables = document.querySelectorAll("a, button, .nav-toggle, .skill-category, .project-card")
    hoverables.forEach((hoverable) => {
      hoverable.addEventListener("mouseenter", () => {
        cursor.style.width = "50px"
        cursor.style.height = "50px"
        cursor.style.backgroundColor = "rgba(108, 99, 255, 0.1)"
        cursor.style.borderColor = "transparent"
      })

      hoverable.addEventListener("mouseleave", () => {
        cursor.style.width = "20px"
        cursor.style.height = "20px"
        cursor.style.backgroundColor = "transparent"
        cursor.style.borderColor = "var(--color-primary)"
      })
    })
  }

  // Navigation scroll effect
  const nav = document.querySelector(".main-nav")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      nav.classList.add("scrolled")
    } else {
      nav.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  const navToggle = document.querySelector(".nav-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active")
    mobileMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking a link
  const mobileLinks = document.querySelectorAll(".mobile-link")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active")
      mobileMenu.classList.remove("active")
    })
  })

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-link, .mobile-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)
      const navHeight = document.querySelector(".main-nav").offsetHeight

      window.scrollTo({
        top: targetElement.offsetTop - navHeight,
        behavior: "smooth",
      })
    })
  })

  // Typing effect
  const options = {
    strings: [
      "Mathematics Student",
      "Photographer",
      "Web Developer",
      "Piano Player",
      "Problem Solver",
      "Creative Thinker",
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
  }

  // Check if Typed.js is loaded
  if (typeof Typed !== "undefined") {
    new Typed(".typing-text", options)
  }

  // Skill category tabs
  const skillCategories = document.querySelectorAll(".skill-category")
  const skillGroups = document.querySelectorAll(".skills-group")

  skillCategories.forEach((category) => {
    category.addEventListener("click", function () {
      // Remove active class from all categories
      skillCategories.forEach((cat) => {
        cat.classList.remove("active")
      })

      // Add active class to clicked category
      this.classList.add("active")

      // Show corresponding skill group
      const categoryName = this.getAttribute("data-category")

      skillGroups.forEach((group) => {
        group.classList.remove("active")

        if (group.getAttribute("data-group") === categoryName) {
          group.classList.add("active")
        }
      })
    })
  })

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll(".skill-progress")

  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const barPosition = bar.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.2

      if (barPosition < screenPosition) {
        const progress = bar.getAttribute("data-progress")
        bar.style.width = progress + "%"
      }
    })
  }

  // Initial check for elements in view
  animateSkillBars()

  // Check on scroll
  window.addEventListener("scroll", animateSkillBars)

  // Form submission
  const contactForm = document.querySelector(".contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Simple validation
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields")
        return
      }

      // Here you would typically send the form data to a server
      // For demo purposes, we'll just show a success message
      alert("Message sent successfully!")
      contactForm.reset()
    })
  }
})

