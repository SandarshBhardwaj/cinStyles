(() => {
  function initCinStyles() {
    const header = document.querySelector("header");
    const hero = document.querySelector("main section");

    if (!header || !hero) {
      console.log("CinStyles: header or hero not found");
      return;
    }

    /*
     * =========================================================
     * 1. ANIMATION FIX
     * =========================================================
     *
     * The downloaded page contains the original Motion animation
     * states, but some elements remain stuck at opacity:0 /
     * translateY(...).
     *
     * We release those elements when the local page loads.
     */

    document
      .querySelectorAll('main [style*="opacity:0"]')
      .forEach((element) => {
        element.style.opacity = "1";
        element.style.transform = "none";
      });


    /*
     * =========================================================
     * 2. HEADER SETUP
     * =========================================================
     */

    header.classList.add("cin-header-test");

    const links = [...header.querySelectorAll("a")];

    const logo = links.find(
      (a) => a.textContent.trim() === "CinStyles"
    );

    const bookLink = links.find(
      (a) =>
        a.textContent.trim().toLowerCase() === "book now"
    );

    const nav = links.filter(
      (a) => a !== logo && a !== bookLink
    );

    logo?.classList.add("cin-logo-test");
    bookLink?.classList.add("cin-book-test");

    nav.forEach((a) => {
      a.classList.add("cin-nav-test");
    });


    /*
     * =========================================================
     * 3. HEADER CSS
     * =========================================================
     */

    document.getElementById("cin-header-permanent-style")?.remove();

    const style = document.createElement("style");

    style.id = "cin-header-permanent-style";

    style.textContent = `

      /* -----------------------------------------
         HEADER TRANSITION
      ----------------------------------------- */

      header.cin-header-test {
        transition:
          background-color 300ms ease,
          backdrop-filter 300ms ease;
      }


      /* -----------------------------------------
         TRANSPARENT HERO HEADER
      ----------------------------------------- */

      header.cin-header-test.cin-transparent-test {
        background-color: transparent !important;
        backdrop-filter: none !important;
      }

      header.cin-header-test.cin-transparent-test
        .cin-logo-test {
        color: var(--color-gold) !important;
      }

      header.cin-header-test.cin-transparent-test
        .cin-nav-test {
        color: white !important;
      }


      /* -----------------------------------------
         SOLID / WHITE HEADER
      ----------------------------------------- */

      header.cin-header-test.cin-solid-test {
        background-color: rgba(247, 244, 238, 0.90) !important;
        backdrop-filter: blur(8px) !important;
      }

      header.cin-header-test.cin-solid-test
        .cin-logo-test {
        color: var(--color-ink) !important;
      }

      header.cin-header-test.cin-solid-test
        .cin-nav-test {
        color: var(--color-ink) !important;
      }


      /* -----------------------------------------
         NAV HOVER
         Works in BOTH header states
      ----------------------------------------- */

      header.cin-header-test
        .cin-nav-test:hover {
        color: var(--color-gold) !important;
      }


      /* -----------------------------------------
         ACTIVE NAV ITEM
      ----------------------------------------- */

      header.cin-header-test
        .cin-nav-test[aria-current="page"] {
        color: var(--color-gold) !important;
      }


      /* -----------------------------------------
         BOOK NOW - TRANSPARENT STATE
         
         BLACK BOX
         GOLD BORDER
         GOLD TEXT
      ----------------------------------------- */

      header.cin-header-test.cin-transparent-test
        .cin-book-test button {
        background-color: rgb(10, 10, 10) !important;
        color: rgb(201, 169, 110) !important;
        border-color: rgb(201, 169, 110) !important;
      }


      /* -----------------------------------------
         BOOK NOW - TRANSPARENT HOVER
         
         GOLD BOX
         BLACK TEXT
      ----------------------------------------- */

      header.cin-header-test.cin-transparent-test
        .cin-book-test button:hover {
        background-color: rgb(201, 169, 110) !important;
        color: rgb(10, 10, 10) !important;
        border-color: rgb(201, 169, 110) !important;
      }


      /* -----------------------------------------
         BOOK NOW - SOLID STATE
         
         TRANSPARENT
         BLACK BORDER
         BLACK TEXT
      ----------------------------------------- */

      header.cin-header-test.cin-solid-test
        .cin-book-test button {
        background-color: transparent !important;
        color: var(--color-ink) !important;
        border-color: var(--color-ink) !important;
      }


      /* -----------------------------------------
         BOOK NOW - SOLID HOVER
         
         GOLD BOX
         BLACK TEXT
      ----------------------------------------- */

      header.cin-header-test.cin-solid-test
        .cin-book-test button:hover {
        background-color: var(--color-gold) !important;
        color: var(--color-ink) !important;
        border-color: var(--color-gold) !important;
      }

    `;

    document.head.appendChild(style);


    /*
     * =========================================================
     * 4. HEADER STATE
     * =========================================================
     */

    function updateHeader() {
      const heroBottom =
        hero.getBoundingClientRect().bottom;

      // Keep header transparent while ANY part of hero
      // is still visible.
      const transparent = heroBottom > 0;

      header.classList.toggle(
        "cin-transparent-test",
        transparent
      );

      header.classList.toggle(
        "cin-solid-test",
        !transparent
      );
    }

    updateHeader();

    window.addEventListener(
      "scroll",
      updateHeader,
      { passive: true }
    );


    /*
     * =========================================================
     * 5. BOOK NOW BUTTON
     *
     * The visible element is a BUTTON inside the A.
     * This is important.
     * =========================================================
     */

    const bookButton = [...header.querySelectorAll("button")]
      .find(
        (button) =>
          button.textContent
            .trim()
            .toLowerCase() === "book now"
      );

    if (bookButton) {

      function normalBookState() {
        const transparent =
          header.classList.contains(
            "cin-transparent-test"
          );

        if (transparent) {

          bookButton.style.setProperty(
            "background-color",
            "rgb(10, 10, 10)",
            "important"
          );

          bookButton.style.setProperty(
            "color",
            "rgb(201, 169, 110)",
            "important"
          );

          bookButton.style.setProperty(
            "border-color",
            "rgb(201, 169, 110)",
            "important"
          );

        } else {

          bookButton.style.setProperty(
            "background-color",
            "transparent",
            "important"
          );

          bookButton.style.setProperty(
            "color",
            "var(--color-ink)",
            "important"
          );

          bookButton.style.setProperty(
            "border-color",
            "var(--color-ink)",
            "important"
          );
        }
      }


      function hoverBookState() {

        bookButton.style.setProperty(
          "background-color",
          "rgb(201, 169, 110)",
          "important"
        );

        bookButton.style.setProperty(
          "color",
          "rgb(10, 10, 10)",
          "important"
        );

        bookButton.style.setProperty(
          "border-color",
          "rgb(201, 169, 110)",
          "important"
        );
      }


      bookButton.addEventListener(
        "mouseenter",
        hoverBookState
      );

      bookButton.addEventListener(
        "mouseleave",
        normalBookState
      );


      window.addEventListener(
        "scroll",
        () => {
          if (!bookButton.matches(":hover")) {
            normalBookState();
          }
        },
        { passive: true }
      );

      normalBookState();
    }


    console.log(
      "✅ CinStyles custom fixes loaded"
    );
  }


  /*
   * Run after the recovered HTML is ready.
   */

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initCinStyles
    );
  } else {
    initCinStyles();
  }

})();