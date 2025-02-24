/**
 * Main JavaScript file
 */
;(() => {
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener)
  }

  /**
   * Navbar links active state on scroll
   */
  const navbarlinks = select("#navbar .scrollto", true)
  const navbarlinksActive = () => {
    const position = window.scrollY + 200
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return
      const section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        navbarlink.classList.add("active")
      } else {
        navbarlink.classList.remove("active")
      }
    })
  }
  window.addEventListener("load", navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    const elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    })
  }

  /**
   * Back to top button
   */
  const backtotop = select(".back-to-top")
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active")
      } else {
        backtotop.classList.remove("active")
      }
    }
    window.addEventListener("load", toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("body").classList.toggle("mobile-nav-active")
    this.classList.toggle("bi-list")
    this.classList.toggle("bi-x")
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault()

        const body = select("body")
        if (body.classList.contains("mobile-nav-active")) {
          body.classList.remove("mobile-nav-active")
          const navbarToggle = select(".mobile-nav-toggle")
          navbarToggle.classList.toggle("bi-list")
          navbarToggle.classList.toggle("bi-x")
        }
        scrollto(this.hash)
      }
    },
    true,
  )

  /**
   * Hero type effect
   */
  window.addEventListener("load", () => {
    const typed = select(".typed")
    if (typed) {
      let typed_strings = typed.getAttribute("data-typed-items")
      typed_strings = typed_strings.split(",").map((item) => item.trim())
      const Typed = window.Typed // Assuming Typed is available globally or loaded via a script tag
      new Typed(".typed", {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        startDelay: 1000,
        cursorChar: "|",
        fadeOut: false,
        smartBackspace: true,
      })
    }
  })

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    const AOS = window.AOS // Assuming AOS is available globally or loaded via a script tag
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: false,
    })
  })

  /**
   * Skills animation
   */
  const initSkillsAnimation = () => {
    const skillsSection = select(".skills")
    if (skillsSection) {
      const progressBars = select(".progress-bar", true)
      const animateProgress = () => {
        progressBars.forEach((bar) => {
          const value = bar.getAttribute("aria-valuenow")
          bar.style.width = value + "%"
        })
      }

      // Initial animation
      animateProgress()

      // Animate on scroll
      window.addEventListener("scroll", () => {
        const sectionPos = skillsSection.getBoundingClientRect()
        if (sectionPos.top < window.innerHeight && sectionPos.bottom >= 0) {
          animateProgress()
        }
      })
    }
  }

  window.addEventListener("load", initSkillsAnimation)
})()

