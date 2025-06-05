// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize language
  const LanguageContext = {
    init: () => {
      const lang = localStorage.getItem("language") || "en"
      return lang
    },
    toggleLanguage: (currentLang) => {
      const newLang = currentLang === "en" ? "fa" : "en"
      localStorage.setItem("language", newLang)
      return newLang
    },
  }
  let currentLanguage = LanguageContext.init()

  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear()

  // Preloader
  const preloader = document.getElementById("preloader")
  const loadingProgress = document.querySelector(".loading-progress")
  const loadingPercentage = document.querySelector(".loading-percentage")
  const loadingStatus = document.querySelector(".loading-status")

  const loadingTexts = [
    "SCANNING ENVIRONMENT",
    "INITIALIZING SYSTEMS",
    "LOADING ASSETS",
    "CALIBRATING INTERFACE",
    "ESTABLISHING CONNECTION",
    "RENDERING VISUALS",
    "SYSTEM READY",
  ]

  let progress = 0
  let textIndex = 0

  const progressInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 5) + 1
    if (progress > 100) progress = 100

    loadingProgress.style.width = `${progress}%`
    loadingPercentage.textContent = `${progress}%`

    if (progress > textIndex * 15 && textIndex < loadingTexts.length) {
      loadingStatus.textContent = loadingTexts[textIndex]
      loadingStatus.classList.remove("glitch")
      void loadingStatus.offsetWidth // Trigger reflow
      loadingStatus.classList.add("glitch")
      textIndex++
    }

    if (progress === 100) {
      clearInterval(progressInterval)
      setTimeout(() => {
        preloader.classList.add("hidden")
        document.body.style.overflow = "auto"
        initDynamicBackground()
        animateSkills()
        animateStats()
        revealSections()
        updateLanguage(currentLanguage) // Apply initial language
      }, 1000)
    }
  }, 100)

  // Language toggle
  const languageToggle = document.getElementById("language-toggle")
  const mobileLanguageToggle = document.getElementById("mobile-language-toggle")
  const htmlElement = document.documentElement

  // Function to switch language
  function switchLanguage() {
    // Toggle language
    currentLanguage = currentLanguage === "en" ? "fa" : "en"
    localStorage.setItem("language", currentLanguage)

    // Add animation class
    document.body.classList.add("language-switch-animation")

    // Set direction attribute based on language
    htmlElement.setAttribute("dir", currentLanguage === "fa" ? "rtl" : "ltr")

    // Update all elements with data-en and data-fa attributes
    const elementsWithLang = document.querySelectorAll("[data-en][data-fa]")
    elementsWithLang.forEach((el) => {
      el.textContent = el.getAttribute(`data-${currentLanguage}`)
    })

    // Update the glitch text data-text attribute for proper glitch effect
    const glitchText = document.querySelector(".glitch-text")
    if (glitchText) {
      const nameText = glitchText.querySelector(".name-text").getAttribute(`data-${currentLanguage}`)
      glitchText.setAttribute("data-text", nameText)
    }

    // Update welcome text before/after content
    const welcomeText = document.querySelector(".welcome-text")
    if (welcomeText) {
      welcomeText.setAttribute("data-text", welcomeText.getAttribute(`data-${currentLanguage}`))
    }

    // Update language toggle button text
    const langFrom = document.querySelectorAll(".lang-from")
    const langTo = document.querySelectorAll(".lang-to")

    langFrom.forEach((el) => {
      el.textContent = currentLanguage === "fa" ? "EN" : "FA"
    })

    langTo.forEach((el) => {
      el.textContent = currentLanguage === "fa" ? "FA" : "EN"
    })

    // Remove animation class after animation completes
    setTimeout(() => {
      document.body.classList.remove("language-switch-animation")
    }, 500)
  }

  // Add event listener to language toggle buttons
  if (languageToggle) {
    languageToggle.addEventListener("click", switchLanguage)
  }

  if (mobileLanguageToggle) {
    mobileLanguageToggle.addEventListener("click", switchLanguage)
  }

  // Custom cursor
  const cursor = document.querySelector(".cursor")
  const cursorDot = document.querySelector(".cursor-dot")
  const cursorOutline = document.querySelector(".cursor-outline")

  document.addEventListener("mousemove", (e) => {
    cursor.style.display = "block"
    const posX = e.clientX
    const posY = e.clientY

    cursorDot.style.transform = `translate(${posX}px, ${posY}px)`
    cursorOutline.style.transform = `translate(${posX}px, ${posY}px)`
  })

  document.addEventListener("mouseout", () => {
    cursor.style.display = "none"
  })

  // Cursor hover effects
  const hoverElements = document.querySelectorAll("a, button, .btn, input, textarea")

  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursorOutline.style.width = "60px"
      cursorOutline.style.height = "60px"
      cursorOutline.style.borderColor = "var(--primary)"
    })

    element.addEventListener("mouseleave", () => {
      cursorOutline.style.width = "40px"
      cursorOutline.style.height = "40px"
      cursorOutline.style.borderColor = "var(--primary)"
    })
  })

  // Header scroll effect
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active")
    mobileMenu.classList.toggle("active")
    document.body.classList.toggle("no-scroll")
  })

  // Mobile menu links
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active")
      mobileMenu.classList.remove("active")
      document.body.classList.remove("no-scroll")
    })
  })

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        })
      }
    })
  })

  // Active navigation based on scroll position
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  function highlightNavigation() {
    const scrollPosition = window.scrollY

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", highlightNavigation)

  // Eye follow cursor
  const eyes = document.querySelectorAll(".iris")
  const pupils = document.querySelectorAll(".pupil")

  document.addEventListener("mousemove", (e) => {
    eyes.forEach((eye) => {
      const eyeRect = eye.getBoundingClientRect()
      const eyeCenterX = eyeRect.left + eyeRect.width / 2
      const eyeCenterY = eyeRect.top + eyeRect.height / 2

      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX)
      const distance = Math.min(eyeRect.width / 4, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 10)

      const moveX = Math.cos(angle) * distance
      const moveY = Math.sin(angle) * distance

      eye.style.transform = `translate(${moveX}px, ${moveY}px)`
    })
  })

  // Pupil dilation based on light
  function dilateOnScroll() {
    const scrollPosition = window.scrollY
    const maxScroll = document.body.scrollHeight - window.innerHeight
    const scrollPercentage = scrollPosition / maxScroll

    pupils.forEach((pupil) => {
      const parentWidth = pupil.parentElement.offsetWidth
      const minSize = parentWidth * 0.3
      const maxSize = parentWidth * 0.5
      const size = maxSize - scrollPercentage * (maxSize - minSize)

      pupil.style.width = `${size}px`
      pupil.style.height = `${size}px`
    })
  }

  window.addEventListener("scroll", dilateOnScroll)

  // Random eye blinking
  function randomBlink() {
    const eyeLids = document.querySelectorAll(".eye-lid")
    const randomTime = Math.random() * 5000 + 3000 // Random time between 3-8 seconds

    setTimeout(() => {
      eyeLids.forEach((lid) => {
        lid.style.animation = "none"
        void lid.offsetWidth // Trigger reflow
        lid.style.animation = lid.classList.contains("top-lid") ? "blinkTop 0.2s" : "blinkBottom 0.2s"
      })

      setTimeout(() => {
        eyeLids.forEach((lid) => {
          lid.style.animation = lid.classList.contains("top-lid") ? "blinkTop 6s infinite" : "blinkBottom 6s infinite"
        })
      }, 200)

      randomBlink()
    }, randomTime)
  }

  randomBlink()

  // Animate skills on scroll
  function animateSkills() {
    const skillBars = document.querySelectorAll(".skill-progress")

    skillBars.forEach((bar) => {
      const progress = bar.getAttribute("data-progress")
      setTimeout(() => {
        bar.style.width = `${progress}%`
      }, 300)
    })
  }

  // Animate stats
  function animateStats() {
    const stats = document.querySelectorAll(".stat-value")

    stats.forEach((stat) => {
      const targetValue = Number.parseInt(stat.parentElement.getAttribute("data-count"))
      let currentValue = 0
      const duration = 2000 // 2 seconds
      const increment = targetValue / (duration / 16) // 60fps

      const updateStat = () => {
        currentValue += increment
        if (currentValue >= targetValue) {
          currentValue = targetValue
          stat.textContent = targetValue + "+"
          return
        }

        stat.textContent = Math.floor(currentValue) + "+"
        requestAnimationFrame(updateStat)
      }

      requestAnimationFrame(updateStat)
    })
  }

  // Reveal sections on scroll
  function revealSections() {
    const revealElements = document.querySelectorAll(".reveal-text")

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    revealElements.forEach((element) => {
      revealObserver.observe(element)
    })
  }

  // Skill tabs
  const skillTabs = document.querySelectorAll(".skill-tab")
  const skillContents = document.querySelectorAll(".skills-tab-content")

  skillTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-tab")

      // Update active tab
      skillTabs.forEach((t) => t.classList.remove("active"))
      tab.classList.add("active")

      // Show corresponding content
      skillContents.forEach((content) => {
        content.classList.remove("active")
        if (content.id === `${target}-skills`) {
          content.classList.add("active")
        }
      })
    })
  })

  // Project filtering
  const projectFilters = document.querySelectorAll(".project-filter")
  const projectCards = document.querySelectorAll(".project-card")

  projectFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const filterValue = filter.getAttribute("data-filter")

      // Update active filter
      projectFilters.forEach((f) => f.classList.remove("active"))
      filter.classList.add("active")

      // Filter projects
      projectCards.forEach((card) => {
        if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  })

  // Contact form submission with EmailJS
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    const ntactForm = contactForm
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]')
      const originalButtonText = submitButton.innerHTML
      submitButton.innerHTML = "<span>Sending...</span>"
      submitButton.disabled = true

      // Prepare template parameters
      const templateParams = {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        message: document.getElementById("message").value,
        to_email: "ka3r0a@gmail.com",
      }

      // Send email using EmailJS
      emailjs.send("service_bmt8ovc", "template_oj8vge3", templateParams).then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text)
          alert("Message sent successfully!")
          contactForm.reset()
          submitButton.innerHTML = originalButtonText
          submitButton.disabled = false
        },
        (error) => {
          console.log("FAILED...", error)
          alert("Failed to send message. Please try again later.")
          submitButton.innerHTML = originalButtonText
          submitButton.disabled = false
        },
      )
    })
  }

  // Dynamic Background
  function initDynamicBackground() {
    const canvas = document.getElementById("dynamic-background")
    const ctx = canvas.getContext("2d")

    // Set canvas size
    function setCanvasSize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // Create circuit nodes
    const nodes = []
    const nodeCount = 50

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        connections: [],
        pulses: [],
        nextPulseTime: Math.random() * 5000,
      })
    }

    // Create connections between nodes
    nodes.forEach((node, i) => {
      const connections = []
      for (let j = 0; j < nodes.length; j++) {
        if (i !== j) {
          const otherNode = nodes[j]
          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 200) {
            connections.push(j)
          }
        }
      }
      node.connections = connections.slice(0, 3) // Limit to 3 connections per node
    })

    // Mouse position for interactive effect
    let mouseX = 0
    let mouseY = 0

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    })

    // Animation loop
    function animate(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      nodes.forEach((node, i) => {
        node.connections.forEach((connectionIndex) => {
          const otherNode = nodes[connectionIndex]
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(otherNode.x, otherNode.y)
          ctx.strokeStyle = "rgba(220, 38, 38, 0.2)"
          ctx.lineWidth = 0.5
          ctx.stroke()
        })
      })

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(220, 38, 38, 0.5)"
        ctx.fill()

        // Process pulses
        if (time > node.nextPulseTime) {
          const randomConnection = node.connections[Math.floor(Math.random() * node.connections.length)]
          if (randomConnection !== undefined) {
            node.pulses.push({
              targetIndex: randomConnection,
              progress: 0,
              speed: 0.005,
            })
          }
          node.nextPulseTime = time + Math.random() * 5000 + 2000
        }

        // Update and draw pulses
        for (let i = node.pulses.length - 1; i >= 0; i--) {
          const pulse = node.pulses[i]
          pulse.progress += pulse.speed

          if (pulse.progress >= 1) {
            node.pulses.splice(i, 1)
            continue
          }

          const targetNode = nodes[pulse.targetIndex]
          const x = node.x + (targetNode.x - node.x) * pulse.progress
          const y = node.y + (targetNode.y - node.y) * pulse.progress

          ctx.beginPath()
          ctx.arc(x, y, 2, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(220, 38, 38, 0.8)"
          ctx.fill()
        }
      })

      // Interactive effect
      ctx.beginPath()
      ctx.arc(mouseX, mouseY, 100, 0, Math.PI * 2)
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 100)
      gradient.addColorStop(0, "rgba(220, 38, 38, 0.2)")
      gradient.addColorStop(1, "rgba(220, 38, 38, 0)")
      ctx.fillStyle = gradient
      ctx.fill()

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }

  // Create hexagons for background
  function createHexagons() {
    const container = document.querySelector(".hexagon-container")
    const count = 10

    for (let i = 0; i < count; i++) {
      const hexagon = document.createElement("div")
      hexagon.classList.add("hexagon")

      const size = Math.random() * 100 + 50
      hexagon.style.width = `${size}px`
      hexagon.style.height = `${size}px`
      hexagon.style.left = `${Math.random() * 100}%`
      hexagon.style.top = `${Math.random() * 100}%`
      hexagon.style.opacity = Math.random() * 0.5 + 0.1

      // Apply hexagon clip path
      hexagon.style.clipPath = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
      hexagon.style.border = "1px solid rgba(220, 38, 38, 0.3)"

      container.appendChild(hexagon)
    }
  }

  createHexagons()

  // Set social links
  const socialLinks = {
    linkedin: "https://linkedin.com/in/kasrababazadeh",
    github: "https://github.com/ka3r0a",
    telegram: "https://t.me/ka3rair",
    instagram: "https://instagram.com/ka3r0",
  }

  // Apply links to icons
  const linkedinLink = document.getElementById("linkedin-link")
  const githubLink = document.getElementById("github-link")
  const telegramLink = document.getElementById("telegram-link")
  const instagramLink = document.getElementById("instagram-link")

  if (linkedinLink) linkedinLink.href = socialLinks.linkedin
  if (githubLink) githubLink.href = socialLinks.github
  if (telegramLink) telegramLink.href = socialLinks.telegram
  if (instagramLink) instagramLink.href = socialLinks.instagram

  // Function to update language
  function switchLanguage() {
    currentLanguage = currentLanguage === "en" ? "fa" : "en";
    localStorage.setItem("language", currentLanguage);
    htmlElement.setAttribute("dir", currentLanguage === "fa" ? "rtl" : "ltr");

    function updateLanguage(lang) {
      const firstName = document.querySelector('.first-name');
      const lastName = document.querySelector('.last-name');
      
      if (firstName && lastName) {
        firstName.textContent = firstName.getAttribute(`data-${lang}`);
        lastName.textContent = lastName.getAttribute(`data-${lang}`);
      }
      // بقیه کدها...
    }
    // بقیه کدها...

    // Update all elements with data-en and data-fa attributes
    const elementsWithLang = document.querySelectorAll("[data-en][data-fa]")
    elementsWithLang.forEach((el) => {
      el.textContent = el.getAttribute(`data-${currentLanguage}`)
    })

    // Update the glitch text data-text attribute for proper glitch effect
    const glitchText = document.querySelector(".glitch-text")
    if (glitchText) {
      const nameText = glitchText.querySelector(".name-text").getAttribute(`data-${currentLanguage}`)
      glitchText.setAttribute("data-text", nameText)
    }

    // Update welcome text before/after content
    const welcomeText = document.querySelector(".welcome-text")
    if (welcomeText) {
      welcomeText.setAttribute("data-text", welcomeText.getAttribute(`data-${currentLanguage}`))
    }

    // Update language toggle button text
    const langFrom = document.querySelectorAll(".lang-from")
    const langTo = document.querySelectorAll(".lang-to")

    langFrom.forEach((el) => {
      el.textContent = currentLanguage === "fa" ? "EN" : "FA"
    })

    langTo.forEach((el) => {
      el.textContent = currentLanguage === "fa" ? "FA" : "EN"
    })
  }
  emailjs.init("YOUR_PUBLIC_KEY")
})
