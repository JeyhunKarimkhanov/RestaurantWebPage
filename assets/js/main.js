(function () {
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
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    //  Mobile nav toggle

    on('click', '.mobile-nav-toggle', function (e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    });


    // Animate Preloader

    let preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.remove();
            }, 500);
        });
    }

    // Back to Top

    let backtotop = select(".back-to-top")
    if (backtotop) {
        const toggleBackToTop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add("active")
            } else {
                backtotop.classList.remove("active")
            }
        }
        window.addEventListener("load", toggleBackToTop)
        onscroll(document, toggleBackToTop)
    }

    /**
     * Initiate glightbox 
     */
    const glightbox = GLightbox({
        selector: '.glightbox'
    });


    /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
    let header = select("#header")
    let topbar = select("topbar")

    if (header) {
        const scrolledHeader = () => {
            if (window.scrollY > 100) {
                header.classList.add("header-scrolled")
                if (topbar) {
                    topbar.classList.add("topbar-scrolled")
                }
            } else {
                header.classList.remove("header-scrolled")
                if (topbar) {
                    topbar.classList.remove("topbar-scrolled")
                }
            }
        }
        window.addEventListener("load", scrolledHeader)
        onscroll(document, scrolledHeader)
    }

    /**
 * Menu isotope and filter
 */
    window.addEventListener('load', () => {
        let menuContainer = select('.menu-container');
        if (menuContainer) {
            let menuIsotope = new Isotope(menuContainer, {
                itemSelector: '.menu-item',
                layoutMode: 'fitRows'
            });

            let menuFilters = select('#menu-filters li', true);

            on('click', '#menu-filters li', function (e) {
                e.preventDefault();
                menuFilters.forEach(function (el) {
                    el.classList.remove('filter-active');
                });
                this.classList.add('filter-active');

                menuIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
                menuIsotope.on('arrangeComplete', function () {
                    AOS.refresh()
                });
            }, true);
        }

    });

    /**
 * Events slider
 */
    new Swiper(".events-slider", {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerWiew: "auto",
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true
        }
    })

    const galleryLightbox = GLightbox({
        selector: '.gallery-lightbox'
    });

})()