(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  var icon = function (name, cls) {
    return '<svg class="icon ' + (cls || "") + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  };

  /* --------------------------------------------------------------------- */
  /* Theme                                                                  */
  /* --------------------------------------------------------------------- */

  var themeToggle = document.getElementById("theme-toggle");
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme, persist) {
    root.dataset.theme = theme;
    if (themeMeta) {
      themeMeta.setAttribute("content", theme === "dark" ? "#06080f" : "#f5f7fc");
    }
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
      themeToggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    }
    if (persist) {
      try {
        localStorage.setItem("pp-theme", theme);
      } catch (e) {}
    }
  }

  applyTheme(root.dataset.theme === "light" ? "light" : "dark", false);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      applyTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
    });
  }

  /* --------------------------------------------------------------------- */
  /* Mobile navigation                                                      */
  /* --------------------------------------------------------------------- */

  var menuToggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("primary-nav");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));

  function closeMenu() {
    document.body.classList.remove("nav-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    }
  }

  function openMenu() {
    document.body.classList.add("nav-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close menu");
    }
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      if (document.body.classList.contains("nav-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (event) {
      if (!document.body.classList.contains("nav-open")) return;
      if (event.target.closest(".site-header")) return;
      closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 960) closeMenu();
    });
  }

  /* --------------------------------------------------------------------- */
  /* Projects                                                               */
  /* --------------------------------------------------------------------- */

  var projects = [
    {
      id: "emirates-nbd",
      title: "Emirates NBD Mobile Banking",
      category: "fintech",
      categoryLabel: "FinTech",
      role: "Senior Software Engineer · Sep 2025 — Present",
      year: "2025 — Now",
      icon: null,
      monogram: "NBD",
      link: "https://www.emiratesnbd.com/en/",
      store: "Website",
      summary: "Leading end-to-end development of Emirates NBD's flagship iOS banking app — secure features, modular architecture and a SwiftUI-first roadmap.",
      description: "As the iOS lead on Emirates NBD's consumer banking app, I own delivery of secure, customer-facing features for a high-traffic FinTech platform. The work spans modular SwiftUI architecture, async/await data flows, encryption, secure session management and modernization of legacy Objective-C modules.",
      highlights: [
        "Design modular, testable architecture with Swift, SwiftUI and Combine.",
        "Implement async/await across networking and data flows to improve responsiveness and readability.",
        "Strengthen data security and compliance with advanced encryption and secure session management.",
        "Lead migration of legacy Objective-C modules to Swift and SwiftUI.",
        "Optimize memory, battery and launch performance for a seamless banking experience."
      ],
      tags: ["Swift", "SwiftUI", "Combine", "Objective-C", "Security", "Async/await"],
      metrics: ["High-traffic FinTech", "Modular architecture", "SwiftUI-first", "99% stability"]
    },
    {
      id: "enbd-business",
      title: "ENBD Business",
      category: "fintech",
      categoryLabel: "FinTech",
      role: "iOS Engineer · Emirates NBD",
      year: "2025",
      icon: "assets/icons/enbd-business.jpg",
      monogram: null,
      link: "https://apps.apple.com/in/app/enbd-business/id6762097902",
      store: "App Store",
      summary: "Emirates NBD's business banking app with biometric login, account dashboards, quick payments and multiple payment approvals.",
      description: "Built and enhanced ENBD Business, Emirates NBD's mobile banking app for business and corporate clients. The app delivers biometric login, account dashboards, quick payments and multiple approval flows for secure banking on the go.",
      highlights: [
        "Delivered biometric authentication for fast, secure sign-in.",
        "Built account dashboards and quick payment journeys for business clients.",
        "Implemented multiple payment approvals for corporate banking workflows.",
        "Shipped secure, customer-facing features for a high-traffic FinTech platform."
      ],
      tags: ["Swift", "SwiftUI", "Biometrics", "Payments", "Security"],
      metrics: ["Business banking", "Biometric login", "Multi-approval"]
    },
    {
      id: "ei-business",
      title: "EI Business",
      category: "fintech",
      categoryLabel: "FinTech",
      role: "iOS Engineer · Emirates Islamic",
      year: "2025",
      icon: "assets/icons/ei-business.jpg",
      monogram: null,
      link: "https://apps.apple.com/in/app/ei-business/id6762098534",
      store: "App Store",
      summary: "Emirates Islamic's business banking app — biometric access, simplified payment approvals and an intuitive corporate experience.",
      description: "Delivered EI Business for Emirates Islamic, giving business and corporate clients an intuitive banking experience with biometric access and simplified payment approvals.",
      highlights: [
        "Built an intuitive mobile banking experience for business and corporate clients.",
        "Implemented biometric access for secure, frictionless entry.",
        "Simplified multi-step payment approvals for corporate users.",
        "Maintained a consistent, secure architecture across the Emirates NBD family of apps."
      ],
      tags: ["Swift", "SwiftUI", "Islamic banking", "Biometrics", "Payments"],
      metrics: ["Corporate banking", "Biometric access", "Payment approvals"]
    },
    {
      id: "biomedix",
      title: "Biomedix Xchange",
      category: "healthcare",
      categoryLabel: "Healthcare",
      role: "Project Leader · R Systems",
      year: "R Systems",
      icon: "assets/icons/biomedix.jpg",
      monogram: null,
      link: "https://apps.apple.com/gb/app/biomedix-xchange/id1636691707",
      store: "App Store",
      summary: "A connected-health app for rapid Peripheral Artery Disease diagnosis, helping clinicians test faster and catch PAD earlier.",
      description: "Authored and enhanced Biomedix Xchange, a clinical solution for rapid diagnosis of Peripheral Artery Disease. The iOS app connects with diagnostic hardware, guides testing and surfaces results quickly — improving early detection and patient outcomes.",
      highlights: [
        "Improved rapid PAD diagnosis for 10,000+ patients.",
        "Increased early detection rates by 20% and patient outcomes by 15%.",
        "Integrated connected diagnostic hardware and device data flows.",
        "Designed clear clinical workflows for faster, accurate testing."
      ],
      tags: ["Swift", "Core Bluetooth", "BLE", "Healthcare", "Offline sync"],
      metrics: ["10K+ patients", "+20% early detection", "+15% outcomes"]
    },
    {
      id: "verimatrix",
      title: "Verimatrix DRM",
      category: "ott",
      categoryLabel: "OTT & DRM",
      role: "Project Leader · R Systems",
      year: "R Systems",
      icon: "assets/icons/verimatrix.jpg",
      monogram: null,
      link: "https://apps.apple.com/us/app/playvcastv/id1224878381",
      store: "App Store",
      summary: "Secure OTT streaming powered by Verimatrix DRM — FairPlay, HLS, fragmented MP4 and offline key retrieval.",
      description: "Built and integrated advanced content-security solutions for streaming media. The Verimatrix library and PlayVCASTV showcase app protect encrypted VOD and live content using FairPlay DRM, HLS with fragmented MP4, AirPlay and secure offline key retrieval.",
      highlights: [
        "Protected streaming content for 1M+ users, cutting unauthorized access incidents by 40%.",
        "Integrated FairPlay DRM, HLS and fragmented MP4 playback on iOS and tvOS.",
        "Implemented AirPlay streaming and offline key retrieval for low-connectivity playback.",
        "Built reusable DRM libraries adopted across multiple OTT providers."
      ],
      tags: ["FairPlay", "HLS", "fMP4", "AirPlay", "tvOS", "DRM"],
      metrics: ["1M+ users", "−40% unauthorized access", "FairPlay DRM"]
    },
    {
      id: "verizon-cloud",
      title: "Verizon Cloud",
      category: "consumer",
      categoryLabel: "Consumer",
      role: "Software Engineer · Intelegencia",
      year: "Intelegencia",
      icon: "assets/icons/verizon-cloud.jpg",
      monogram: null,
      link: "https://apps.apple.com/us/app/verizon-cloud/id645682444",
      store: "App Store",
      summary: "Secure cloud backup for photos, videos, contacts and documents — built for millions of users across iPhone and iPad.",
      description: "Built and enhanced Verizon Cloud, a secure backup and storage app supporting unlimited storage across devices, PIN-protected private folders, tags and search, locations and original-quality backups.",
      highlights: [
        "Served 5M+ users with secure cloud backup and cross-device access.",
        "Improved data accessibility by 35% and reduced backup time by 20%.",
        "Delivered PIN-protected private folders, tags, search and location features.",
        "Maintained original-quality photo and video backups at scale."
      ],
      tags: ["Swift", "Objective-C", "Cloud", "Security", "Scale"],
      metrics: ["5M+ users", "+35% accessibility", "−20% backup time"]
    },
    {
      id: "talentrack",
      title: "Talentrack",
      category: "consumer",
      categoryLabel: "Consumer",
      role: "Senior Associate · Magnon Group",
      year: "Magnon Group",
      icon: "assets/icons/talentrack.jpg",
      monogram: null,
      link: "https://apps.apple.com/in/app/talentrack/id1021596860",
      store: "App Store",
      summary: "A talent-hiring platform for media and entertainment where artists showcase portfolios and connect with recruiters.",
      description: "Architected a talent-hiring app for the media, entertainment and creative industries from scratch. Artists build portfolios and apply to jobs posted by production houses, agencies and casting teams; recruiters search and engage talent.",
      highlights: [
        "Enabled 8,000+ artists to showcase portfolios.",
        "Connected talent with 500+ recruiters.",
        "Reduced time-to-hire by 30%.",
        "Designed job search, applications and portfolio management flows."
      ],
      tags: ["Swift", "Objective-C", "Search", "Media", "Recruitment"],
      metrics: ["8K+ artists", "500+ recruiters", "−30% time-to-hire"]
    }
  ];

  var projectGrid = document.getElementById("project-grid");
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll(".filter-btn"));
  var filterCount = document.getElementById("filter-count");

  var storeIcons = {
    "App Store": "apple",
    GitHub: "github",
    Website: "external"
  };

  function projectCard(project, index) {
    var iconMarkup = project.icon
      ? '<img class="project-icon" src="' + project.icon + '" alt="" width="68" height="68" loading="lazy">'
      : '<span class="project-mono">' + project.monogram + "</span>";

    return (
      '<article class="project-card" data-category="' + project.category + '" data-project="' + project.id + '" data-reveal style="--reveal-delay:' + ((index % 3) * 70) + 'ms">' +
        '<div class="project-cover cover-' + project.category + '">' +
          '<span class="project-badge">' + project.categoryLabel + "</span>" +
          '<a class="project-store" href="' + project.link + '" target="_blank" rel="noopener noreferrer" aria-label="Open ' + project.title + " on " + project.store + '">' +
            icon(storeIcons[project.store] || "external") +
            "<span>" + project.store + "</span>" +
          "</a>" +
          iconMarkup +
        "</div>" +
        '<div class="project-body">' +
          '<p class="project-role">' + project.role + "</p>" +
          '<h3 class="project-title">' + project.title + "</h3>" +
          '<p class="project-copy">' + project.summary + "</p>" +
          '<div class="project-metrics">' +
            project.metrics.map(function (metric) { return "<span>" + metric + "</span>"; }).join("") +
          "</div>" +
          '<ul class="tag-list project-tags" aria-label="Technologies used">' +
            project.tags.map(function (tag) { return "<li>" + tag + "</li>"; }).join("") +
          "</ul>" +
          '<div class="project-footer">' +
            '<button class="project-open" type="button" data-project="' + project.id + '">View case study ' + icon("arrow") + "</button>" +
            '<span class="project-year">' + project.year + "</span>" +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  if (projectGrid) {
    projectGrid.innerHTML = projects.map(projectCard).join("");

    projectGrid.addEventListener("click", function (event) {
      var storeLink = event.target.closest("a");
      if (storeLink) return;
      var trigger = event.target.closest("[data-project]");
      if (trigger) {
        openProject(trigger.getAttribute("data-project"));
      }
    });
  }

  function updateFilter(category) {
    if (!projectGrid) return;
    var cards = Array.prototype.slice.call(projectGrid.querySelectorAll(".project-card"));
    var visible = 0;

    cards.forEach(function (card) {
      var show = category === "all" || card.getAttribute("data-category") === category;
      card.hidden = !show;
      if (show) {
        visible += 1;
        card.classList.remove("is-filtered-in");
        void card.offsetWidth;
        card.classList.add("is-filtered-in");
      }
    });

    if (filterCount) {
      filterCount.textContent = visible + (visible === 1 ? " project" : " projects");
    }

    filterButtons.forEach(function (button) {
      var active = button.getAttribute("data-filter") === category;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      updateFilter(button.getAttribute("data-filter"));
    });
  });

  /* --------------------------------------------------------------------- */
  /* Project dialog                                                         */
  /* --------------------------------------------------------------------- */

  var dialog = document.getElementById("project-dialog");
  var dialogClose = document.getElementById("dialog-close");
  var dialogCover = document.getElementById("dialog-cover");
  var dialogCategory = document.getElementById("dialog-category");
  var dialogTitle = document.getElementById("dialog-title");
  var dialogDescription = document.getElementById("dialog-description");
  var dialogHighlights = document.getElementById("dialog-highlights");
  var dialogTags = document.getElementById("dialog-tags");
  var dialogMetrics = document.getElementById("dialog-metrics");
  var dialogLinks = document.getElementById("dialog-links");
  var lastFocused = null;

  function openProject(id) {
    var project = projects.filter(function (item) { return item.id === id; })[0];
    if (!project || !dialog) return;

    lastFocused = document.activeElement;
    dialogCover.className = "dialog-cover cover-" + project.category;
    dialogCover.innerHTML = project.icon
      ? '<img src="' + project.icon + '" alt="" width="92" height="92">'
      : '<span class="project-mono">' + project.monogram + "</span>";

    dialogCategory.textContent = project.categoryLabel + " · " + project.year;
    dialogTitle.textContent = project.title;
    dialogDescription.textContent = project.description;

    dialogHighlights.innerHTML = project.highlights.map(function (item) {
      return "<li>" + item + "</li>";
    }).join("");

    dialogTags.innerHTML = project.tags.map(function (tag) {
      return "<li>" + tag + "</li>";
    }).join("");

    dialogMetrics.innerHTML = project.metrics.map(function (metric) {
      return "<span>" + metric + "</span>";
    }).join("");

    dialogLinks.innerHTML =
      '<a class="btn btn-primary btn-sm" href="' + project.link + '" target="_blank" rel="noopener noreferrer">' +
        "Open " + project.store + " " + icon("external") +
      "</a>" +
      '<button class="btn btn-ghost btn-sm" type="button" data-close-dialog>Close ' + icon("close") + "</button>";

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }

    document.body.classList.add("dialog-open");
  }

  function closeProject() {
    if (!dialog) return;
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
      document.body.classList.remove("dialog-open");
    }
  }

  if (dialog) {
    if (dialogClose) dialogClose.addEventListener("click", closeProject);

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog || event.target.closest("[data-close-dialog]")) {
        closeProject();
      }
    });

    dialog.addEventListener("close", function () {
      document.body.classList.remove("dialog-open");
      if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus();
      }
    });
  }

  /* --------------------------------------------------------------------- */
  /* Reveal on scroll                                                       */
  /* --------------------------------------------------------------------- */

  document.querySelectorAll(".hero-copy, .value-grid, .repo-grid, .skill-cards, .credential-grid, .timeline").forEach(function (group) {
    Array.prototype.slice.call(group.children).forEach(function (child, index) {
      if (child.hasAttribute("data-reveal") && !child.style.getPropertyValue("--reveal-delay")) {
        child.style.setProperty("--reveal-delay", Math.min(index * 65, 390) + "ms");
      }
    });
  });

  var revealItems = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var item = entry.target;
          var delay = parseFloat(window.getComputedStyle(item).transitionDelay) || 0;
          item.classList.add("is-visible");
          revealObserver.unobserve(item);
          window.setTimeout(function () {
            item.removeAttribute("data-reveal");
            item.style.removeProperty("--reveal-delay");
          }, 900 + delay * 1000);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
      item.removeAttribute("data-reveal");
    });
  }

  /* --------------------------------------------------------------------- */
  /* Skill bars                                                             */
  /* --------------------------------------------------------------------- */

  var bars = Array.prototype.slice.call(document.querySelectorAll(".bar-fill"));
  var coreSkills = document.querySelector(".core-skills");

  function fillBars() {
    bars.forEach(function (bar) {
      bar.style.width = (bar.getAttribute("data-level") || 0) + "%";
    });
  }

  if (bars.length) {
    if (coreSkills && "IntersectionObserver" in window && !reduceMotion) {
      var barObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            fillBars();
            barObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });
      barObserver.observe(coreSkills);
    } else {
      fillBars();
    }
  }

  /* --------------------------------------------------------------------- */
  /* Counters                                                               */
  /* --------------------------------------------------------------------- */

  var counters = Array.prototype.slice.call(document.querySelectorAll(".counter"));

  function animateCounter(element) {
    var target = parseInt(element.getAttribute("data-target"), 10) || 0;
    if (reduceMotion) {
      element.textContent = String(target);
      return;
    }
    var start = null;
    var duration = 1400;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = String(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  if (counters.length) {
    if ("IntersectionObserver" in window && !reduceMotion) {
      var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (counter) { counterObserver.observe(counter); });
    } else {
      counters.forEach(function (counter) {
        counter.textContent = counter.getAttribute("data-target");
      });
    }
  }

  /* --------------------------------------------------------------------- */
  /* Typing effect                                                          */
  /* --------------------------------------------------------------------- */

  var typedRole = document.getElementById("typed-role");
  var roles = ["Senior iOS Engineer", "SwiftUI Architect", "FinTech Specialist", "Team Leader", "DRM & Streaming Expert"];

  if (typedRole) {
    if (reduceMotion) {
      typedRole.textContent = roles[0];
    } else {
      var roleIndex = 0;
      var charIndex = 0;
      var deleting = false;

      var tick = function () {
        var word = roles[roleIndex];
        charIndex += deleting ? -1 : 1;
        typedRole.textContent = word.slice(0, charIndex);

        var delay = deleting ? 38 : 72;

        if (!deleting && charIndex === word.length) {
          delay = 1900;
          deleting = true;
        } else if (deleting && charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          delay = 380;
        }

        window.setTimeout(tick, delay);
      };

      window.setTimeout(tick, 700);
    }
  }

  /* --------------------------------------------------------------------- */
  /* Portrait tilt                                                          */
  /* --------------------------------------------------------------------- */

  var scene = document.getElementById("portrait-scene");

  if (scene && finePointer && !reduceMotion) {
    var portrait = scene.querySelector(".portrait-card");
    var glow = scene.querySelector(".portrait-glow");

    scene.addEventListener("pointermove", function (event) {
      var rect = scene.getBoundingClientRect();
      var x = (event.clientX - rect.left) / rect.width;
      var y = (event.clientY - rect.top) / rect.height;
      var rotateY = (x - 0.5) * 9;
      var rotateX = (0.5 - y) * 7;

      if (portrait) {
        portrait.style.transform = "perspective(1000px) rotateX(" + rotateX.toFixed(2) + "deg) rotateY(" + rotateY.toFixed(2) + "deg) translateY(-2px)";
      }
      if (glow) {
        glow.style.transform = "translate(" + ((x - 0.5) * 18).toFixed(1) + "px, " + ((y - 0.5) * 18).toFixed(1) + "px)";
      }
    });

    scene.addEventListener("pointerleave", function () {
      if (portrait) portrait.style.transform = "";
      if (glow) glow.style.transform = "";
    });
  }

  /* --------------------------------------------------------------------- */
  /* Copy email                                                             */
  /* --------------------------------------------------------------------- */

  var copyButton = document.getElementById("copy-email");
  var toast = document.getElementById("toast");
  var toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2600);
  }

  if (copyButton) {
    copyButton.addEventListener("click", function () {
      var email = copyButton.getAttribute("data-email");
      var use = copyButton.querySelector(".copy-icon use");
      var done = function () {
        showToast("Email copied — " + email);
        if (use) {
          use.setAttribute("href", "#i-check");
          window.setTimeout(function () {
            use.setAttribute("href", "#i-copy");
          }, 2200);
        }
      };
      var failed = function () {
        showToast(email);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(done).catch(failed);
      } else {
        var field = document.createElement("textarea");
        field.value = email;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        try {
          document.execCommand("copy");
          done();
        } catch (error) {
          failed();
        }
        document.body.removeChild(field);
      }
    });
  }

  /* --------------------------------------------------------------------- */
  /* Scroll UI                                                              */
  /* --------------------------------------------------------------------- */

  var progressBar = document.getElementById("scroll-progress");
  var header = document.querySelector(".site-header");
  var backToTop = document.getElementById("back-to-top");
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var percent = max > 0 ? (y / max) * 100 : 0;

    if (progressBar) progressBar.style.width = percent + "%";
    if (header) header.classList.toggle("is-scrolled", y > 8);
    if (backToTop) backToTop.classList.toggle("is-visible", y > 720);

    var activeId = "";
    sections.forEach(function (section) {
      if (section.offsetTop - 140 <= y) {
        activeId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + activeId;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  var ticking = false;

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* --------------------------------------------------------------------- */
  /* Misc                                                                   */
  /* --------------------------------------------------------------------- */

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Keep the project count accurate on first paint.
  if (filterCount) filterCount.textContent = projects.length + " projects";
})();
