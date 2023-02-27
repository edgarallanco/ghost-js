window.onbeforeunload = function () {
  document.querySelector(".hero-video-holder video").style.display = "none";
  document.querySelector(".hero-video-holder-mob video").style.display = "none";
  document.querySelector(".hero-video-holder video").style.display = "block";
  document.querySelector(".hero-video-holder-mob video").style.display =
    "block";
};

if ($("#platform_intro").length) {
  // Add images for each animation section
  var html = document.documentElement;
  var idIndex = 0;
  var isWebP = false;
  var isMobile = window.innerWidth < 992;
  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  var tabs = false;

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.defaults({
    markers: false
  });

  // EA Tab Video Slider Code
  function isTouchDevice() {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  Webflow.push(function () {
    $(".section-home---tab-link-arrow").on("click", function () {
      var link = $(this).closest(".section-home---tab-link").data("w-tab").toLowerCase()
      window.location = `/platform#${link}`;
    });

    const heroVideo = document.querySelector(".hero-video-holder video");
    heroVideo
      .play()
      .then(() => {})
      .catch((error) => {
        var tabVideos = document.querySelectorAll(
          ".section-home---tabs-content .mobile .w-background-video"
        );

        for (let index = 0; index < tabVideos.length; index++) {
          const tabVideo = tabVideos[index];
          const imgUrl = tabVideo.dataset.posterUrl;
          tabVideo.innerHTML = `<img class="fallback-img" src="${imgUrl}"></div>`;
        }
      });

    $(".tab-copy").css("display", "block");

    if (!isTouchDevice() && !isMobile) {
      $(".section-home---tab-link")
        .mouseover(function () {
          $(".hover-bar").show();
          var $this = $(this);
          drawNavLine($this);
        })
        .click(function () {
          $(".hover-bar").hide();
        });

      $(".section-home---tabs-menu").mouseout(function () {
        $(".hover-bar").hide();
      });
    }
  });

  function drawNavLine(el) {
    if (!isTouchDevice()) {
      var elHeight = $(el).height();
      var elX = $(el).position().top;

      $(".hover-bar").css({
        top: elX + 144,
        left: 99,
        height: elHeight
      });
    }
  }

  // var videoState = "pause";
  pauseVideos();

  function automaticTabs() {
    var tabTimeout;
    var time = 6000;
    clearTimeout(tabTimeout);

    // Cycle through all tabs. Match class names
    function tabLoop($this) {
      if (!tabs) {
        clearTimeout(tabTimeout);
        return false;
      }

      tabTimeout = setTimeout(function () {
        var $next = $(".section-home---tabs-menu")
          .children(".w--current:first")
          .next();
        if ($next.length) {
          $next.click();
        } else {
          $next = $(".section-home---tab-link:first");
          $next.click();
        }
      }, time);

      let tabIndex = $this.index();
      tabVideos = $($(".section-home---tab-pane")[tabIndex]).find("video");
      // pauseVideos();
      playVideos(tabVideos);
    }
    // Reset loop if a tab is clicked
    $(".section-home---tab-link").click(function (e) {
      e.preventDefault();

      clearTimeout(tabTimeout);
      var $this = $(this);
      tabLoop($this);
    });
  }

  function pauseVideos() {
    // if (videoState === "play") {
    // console.log("pause videos");
    $(".home-hero-video").each(function (i, el) {
      el.pause();
      el.currentTime = 0;
    });
    // videoState = "pause";
    // }
  }
  function playVideos(videos) {
    //   if (videoState === "pause") {
    // console.log("play videos");
    videos.each(function (i, el) {
      el.play();
    });
    //     videoState = "play";
    //   }
  }

  // End of EA - Tab Video Slider Code

  // Header
  ScrollTrigger.matchMedia({
    /* Desktop */
    "(min-width: 992px)": function () {
      $(".header-home-wrap").each(function (index) {
        let triggerElement = $(this);
        let targetElement = $(this);

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            // trigger element - viewport
            start: "top top",
            end: "+=250",
            scrub: 1,
            onLeave: function () {
              document.querySelector(".hero-video-holder video").pause();
            },
            onEnterBack: function () {
              document.querySelector(".hero-video-holder video").play();
            }
          }
        });
        tl.fromTo(
          targetElement,
          {
            scaleX: 1,
            scaleY: 1,
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "0px",
            duration: 1
          },
          {
            scaleX: 0.9,
            scaleY: 0.9,
            borderBottomRightRadius: "48px",
            borderBottomLeftRadius: "48px",
            duration: 1
          }
        );
      });
    },

    /* Mobile */
    "(max-width: 991px)": function () {
      // console.log("Mobile");

      $(".header-home-wrap").each(function (index) {
        let triggerElement = $(this);
        let targetElement = $(this);

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            // trigger element - viewport
            start: "top top",
            end: "+=250",
            scrub: 1,
            onLeave: function () {
              document.querySelector(".hero-video-holder video").pause();
            },
            onEnterBack: function () {
              document.querySelector(".hero-video-holder video").play();
            }
          }
        });
        tl.fromTo(
          targetElement,
          {
            scaleX: 1,
            scaleY: 1,
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "0px",
            duration: 1
          },
          {
            scaleX: 0.9,
            scaleY: 0.9,
            borderBottomRightRadius: "16px",
            borderBottomLeftRadius: "16px",
            duration: 1
          }
        );
      });
    }
  });

  // Section 1

  ScrollTrigger.matchMedia({
    /* Desktop */
    "(min-width: 992px)": function () {
      $(".section-home-complete").each(function (index) {
        let triggerElement = $(this);
        let targetElement = $(".section-home---wrapper");

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            // trigger element - viewport
            start: "bottom 100%",
            end: "+=250",
            scrub: 1
          }
        });
        tl.fromTo(
          targetElement,
          {
            scaleX: 1,
            scaleY: 1,
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "0px",
            duration: 1
          },
          {
            scaleX: 0.9,
            scaleY: 0.9,
            borderBottomRightRadius: "48px",
            borderBottomLeftRadius: "48px",
            duration: 1
          }
        );
      });
    },

    /* Mobile */
    "(max-width: 991px)": function () {
      $(".section-home-complete").each(function (index) {
        let triggerElement = $(this);
        let targetElement = $(".section-home---wrapper");

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            // trigger element - viewport
            start: "bottom 100%",
            end: "+=250",
            scrub: 1
          }
        });
        tl.fromTo(
          targetElement,
          {
            scaleX: 1,
            scaleY: 1,
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "0px",
            duration: 1
          },
          {
            scaleX: 0.9,
            scaleY: 0.9,
            borderBottomRightRadius: "16px",
            borderBottomLeftRadius: "16px",
            duration: 1
          }
        );
      });
    }
  });

  // Section 1 - Object position

  ScrollTrigger.matchMedia({
    /* Desktop */
    "(min-width: 992px)": function () {
      $(".section-home-complete").each(function (index) {
        let triggerElement = $(this);
        let targetElement = $("#platform_intro");

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            // trigger element - viewport
            start: "top",
            end: "+=350",
            scrub: 1
          }
        });
      });
    }
  });

  // Section 2
  var startSettings;
  var endSettings;

  if (isSafari) {
    startSettings = {
      width: "100%",
      margin: "0%",
      borderBottomRightRadius: "0px",
      borderBottomLeftRadius: "0px",
      duration: 1
    };
    var endSettings = {
      width: "90%",
      margin: "5%",
      borderBottomRightRadius: "48px",
      borderBottomLeftRadius: "48px",
      duration: 1
    };
  } else {
    startSettings = {
      scaleX: 1,
      scaleY: 1,
      borderBottomRightRadius: "0px",
      borderBottomLeftRadius: "0px",
      duration: 1
    };
    endSettings = {
      scaleX: 0.9,
      scaleY: 0.9,
      borderBottomRightRadius: "48px",
      borderBottomLeftRadius: "48px",
      duration: 1
    };
  }
  var mobStartSettings;
  var mobEndSettings;
  if (isSafari) {
    mobStartSettings = {
      width: "100%",
      margin: "0%",
      borderBottomRightRadius: "0px",
      borderBottomLeftRadius: "0px",
      duration: 1
    };
    var mobEndSettings = {
      width: "90%",
      margin: "5%",
      borderBottomRightRadius: "16px",
      borderBottomLeftRadius: "16px",
      duration: 1
    };
  } else {
    mobStartSettings = {
      scaleX: 1,
      scaleY: 1,
      borderBottomRightRadius: "0px",
      borderBottomLeftRadius: "0px",
      duration: 1
    };
    mobEndSettings = {
      scaleX: 0.9,
      scaleY: 0.9,
      borderBottomRightRadius: "16px",
      borderBottomLeftRadius: "16px",
      duration: 1
    };
  }
  ScrollTrigger.matchMedia({
    /* Desktop */
    "(min-width: 992px)": function () {
      $(".section-home-lotties").each(function (index) {
        let triggerElement = $(this);
        let targetElement = $(".section-home---why-lottie");

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            // trigger element - viewport
            start: "bottom 100%",
            end: "bottom top",
            scrub: 1
          }
        });
        tl.fromTo(targetElement, startSettings, endSettings);
      });
    },

    /* Mobile */
    "(max-width: 991px)": function () {
      $(".section-home-lotties").each(function (index) {
        let triggerElement = $(this);
        let targetElement = $(".section-home---why-lottie");

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            // trigger element - viewport
            start: "bottom 100%",
            end: "+=250",
            scrub: 1
          }
        });
        tl.fromTo(targetElement, mobStartSettings, mobEndSettings);
      });
    }
  });

  $(".filter-dropdown-list-wrapper label").on("click", function () {
    const option = $(this).text();
    const toggle = $(this).closest(".w-dropdown-list");

    toggle.removeClass("w--open");
    toggle.click();
    toggle.prev(".w-dropdown-toggle").find(".headline").text(option);
  });

  // Refresh if page height changes
  ScrollTrigger.refresh();

  var allSourceData = [
    {
      id: 1,
      name: "platform_intro",
      count: 120,
      canvas: null,
      context: null,
      images: [],
      cachedImages: []
    },
    {
      id: 2,
      name: "whyghost_shot1",
      count: 95,
      canvas: null,
      context: null,
      images: [],
      cachedImages: []
    },
    {
      id: 3,
      name: "whyghost_shot2",
      count: 65,
      canvas: null,
      context: null,
      images: [],
      cachedImages: []
    },
    {
      id: 4,
      name: "whyghost_shot3",
      count: 129,
      canvas: null,
      context: null,
      images: [],
      cachedImages: []
    },
    {
      id: 5,
      name: "whyghost_shot4",
      count: 91,
      canvas: null,
      context: null,
      images: [],
      cachedImages: []
    }
  ];

  var runFallback = true;
  runFallbackImages();

  async function supportsWebp() {
    if (!self.createImageBitmap) return false;

    const webpData =
      "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
    const blob = await fetch(webpData).then((r) => r.blob());
    return createImageBitmap(blob).then(
      () => true,
      () => false
    );
  }

  (async () => {
    if (await supportsWebp()) {
      console.log("does support webp");
      isWebP = true;

      generateSources(allSourceData[idIndex]);
    } else {
      console.log("does not support webp");
      generateSources(allSourceData[idIndex]);
    }
  })();

  function generateSources(sourceData) {
    // isWebP = false;
    for (let index = 0; index < sourceData.count; index++) {
      if (isMobile) {
        sourceData.images[
          index
        ] = `https://resources.ghostautonomy.com/homepage/mobile${
          isWebP ? "/webp" : ""
        }/${sourceData.name}/${sourceData.name}_${index
          .toString()
          .padStart(5, "0")}.${isWebP ? "webp" : "jpg"}`;
      } else {
        sourceData.images[
          index
        ] = `https://resources.ghostautonomy.com/homepage/desktop${
          isWebP ? "/webp" : ""
        }/${
          sourceData.name
        }/${sourceData.name}_${index.toString().padStart(5, "0")}.${
          isWebP ? "webp" : "jpg"
        }`;
      }
      // if (index === 0) {
      //   console.log(
      //     `https://resources.ghostautonomy.com/homepage/desktop${
      //       isWebP ? "/webp" : ""
      //     }/${
      //       sourceData.name
      //     }/${sourceData.name}_${index.toString().padStart(5, "0")}.${
      //       isWebP ? "webp" : "jpg"
      //     }`
      //   );
      // }
    }
    const canvas = document.getElementById(sourceData.name);
    sourceData.canvas = canvas;
    const context = canvas.getContext("2d");
    sourceData.context = context;

    if (sourceData.images.length === sourceData.count) loadImages(sourceData);
  }

  function loadImages(sourceData) {
    var images = [];
    var loadedImages = 0;
    var numImages = 0;
    for (let index = 0; index < sourceData.images.length; index++) {
      numImages++;
    }
    for (let index = 0; index < sourceData.images.length; index++) {
      images[index] = new Image();
      images[index].onload = function () {
        sourceData.canvas.width = this.naturalWidth;
        sourceData.canvas.height = this.naturalHeight;
        if (++loadedImages >= numImages) {
          sourceData.cachedImages = images;
          images = [];

          runFallback = false;
          runImages(sourceData);

          idIndex++;
          if (idIndex < 5) generateSources(allSourceData[idIndex]);
        }
      };
      images[index].src = sourceData.images[index];
    }
  }

  var timer = null;
  var lastScroll = 0;

  function autoScroll(startPosition) {
    var nextSlide = 0;
    var speed = 1.25;
    var offset = isMobile ? 54 : 100;

    var slideStart = $(".section-home-complete").height();
    var slideOne = $(".section-home---why-content").offset().top;
    var slideTwo = $(".section-home---why-card.second").offset().top - offset;
    var slideThree = $(".section-home---why-card.third").offset().top - offset;
    var slideFour = $(".section-home---why-card.fourth").offset().top - offset;
    var slideFive =
      $(".section-home---why-content").height() +
      $(".section-home---why-content").offset().top -
      window.innerHeight;

    if (
      startPosition > 0.25 * window.innerHeight &&
      startPosition < 1.75 * window.innerHeight
    ) {
      $("html").animate(
        { scrollTop: slideStart },
        slideStart - startPosition,
        "linear"
      );
    }

    if (startPosition > slideOne - 400 && startPosition < slideOne) {
      $("html").animate(
        { scrollTop: slideOne },
        slideOne - startPosition,
        "linear"
      );
    } else if (startPosition > slideOne && startPosition < slideTwo) {
      $("html").animate(
        { scrollTop: slideTwo },
        (slideTwo - startPosition) * 0.5,
        "linear"
      );
    } else if (startPosition > slideTwo && startPosition < slideThree) {
      $("html").animate(
        { scrollTop: slideThree },
        slideThree - startPosition,
        "linear"
      );
    } else if (startPosition > slideThree && startPosition < slideFour) {
      $("html").animate(
        { scrollTop: slideFour },
        slideFour - startPosition,
        "linear"
      );
    } else if (startPosition > slideFour && startPosition < slideFive) {
      $("html").animate(
        { scrollTop: slideFive },
        slideFive - startPosition,
        "linear"
      );
    } else if (startPosition > slideFive) {
      return false;
    }
  }

  function runImages(sourceData) {
    console.log("success: ", sourceData.name);

    html.querySelector(".section-home---why-card.first").style.position =
      "sticky";

    const headerHome = html.querySelector(`.header-wrapper-home`);
    const platformHolder = html.querySelector(`.platform_intro-holder`);
    const shot1Holder = html.querySelector(`.whyghost_shot1-holder`);
    const shot2Holder = html.querySelector(`.whyghost_shot2-holder`);
    const shot3Holder = html.querySelector(`.whyghost_shot3-holder`);
    const shot4Holder = html.querySelector(`.whyghost_shot4-holder`);
    const homePart2 = html.querySelector(`.section-home---part-2`);
    const homeComplete = html.querySelector(`.section-home-complete`);

    window.addEventListener("scroll", (e) => {
      const scrollTop = html.scrollTop;
      var maxScrollTop = 0;
      var scrollFraction = 0;

      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(function () {
        autoScroll(scrollTop);
      }, 1000);

      if (lastScroll > scrollTop) {
        $("html, body").stop();
      }
      lastScroll = scrollTop;

      if (
        homePart2.style.opacity === "1" &&
        scrollTop < homeComplete.offsetHeight + 100
      ) {
        if (!tabs) {
          tabs = true;
          automaticTabs();
          $(".section-home---tab-link:first").click();
        }
      } else {
        tabs = false;
      }

      // $(".canvas-animation").css({ height: vh + "px !important" });

      if (sourceData.name === "platform_intro") {
        if (scrollTop > 0 && scrollTop < platformHolder.offsetHeight) {
          sourceData.canvas.style.position = "sticky";
          sourceData.canvas.style.zIndex = 10;

          maxScrollTop = platformHolder.offsetHeight;
          scrollFraction =
            (scrollTop - platformHolder.offsetTop) / maxScrollTop;
          getFrame(sourceData, scrollFraction);
        } else {
          sourceData.canvas.style.position = "relative";
          sourceData.canvas.style.zIndex = 1;
        }
      }

      if (sourceData.name === "whyghost_shot1") {
        var startPosition = isSafari
          ? shot1Holder.offsetTop
          : shot1Holder.offsetTop - window.innerHeight;

        if (
          scrollTop > startPosition &&
          scrollTop < shot1Holder.offsetTop + shot1Holder.offsetHeight
        ) {
          sourceData.canvas.style.position = "fixed";
          sourceData.canvas.style.zIndex = 10;
          maxScrollTop = isSafari
            ? shot1Holder.offsetHeight
            : shot1Holder.offsetHeight + window.innerHeight;
          scrollFraction = isSafari
            ? (scrollTop - shot1Holder.offsetTop) / maxScrollTop
            : (scrollTop - shot1Holder.offsetTop + window.innerHeight) /
              maxScrollTop;

          html.querySelector(".desktop-shot").style.opacity = 0;
          html.querySelector(".mobile-shot").style.opacity = 0;
          html.querySelector(
            ".section-home---why-card.first"
          ).style.top = isMobile ? "48px" : "100px";

          getFrame(sourceData, scrollFraction);
        } else {
          sourceData.canvas.style.position = "relative";
          sourceData.canvas.style.zIndex = -1;
          html.querySelector(".desktop-shot").style.opacity = 1;
          html.querySelector(".mobile-shot").style.opacity = 1;

          if (scrollTop > shot1Holder.offsetTop + shot1Holder.offsetHeight) {
            html.querySelector(".section-home---why-card.first").style.top =
              "-300px";
          }
        }

        document.getElementById("fallback-2").style.display = "none";
        document.getElementById("fallback-3").style.display = "none";
        document.getElementById("fallback-4").style.display = "none";
      }

      if (sourceData.name === "whyghost_shot2") {
        if (
          scrollTop < shot2Holder.offsetHeight + shot2Holder.offsetTop &&
          scrollTop > shot2Holder.offsetTop
        ) {
          sourceData.canvas.style.position = "fixed";
          sourceData.canvas.style.zIndex = 10;
          maxScrollTop = shot2Holder.offsetHeight;
          scrollFraction = (scrollTop - shot2Holder.offsetTop) / maxScrollTop;

          html.querySelector(".desktop-shot").style.opacity = 0;
          html.querySelector(".mobile-shot").style.opacity = 0;

          getFrame(sourceData, scrollFraction);
        } else {
          sourceData.canvas.style.position = "relative";
          sourceData.canvas.style.zIndex = -1;
        }
      }

      if (sourceData.name === "whyghost_shot3") {
        if (
          scrollTop < shot3Holder.offsetHeight + shot3Holder.offsetTop &&
          scrollTop > shot3Holder.offsetTop
        ) {
          sourceData.canvas.style.position = "fixed";
          sourceData.canvas.style.zIndex = 10;
          maxScrollTop = shot3Holder.offsetHeight;
          scrollFraction = (scrollTop - shot3Holder.offsetTop) / maxScrollTop;

          html.querySelector(".desktop-shot").style.opacity = 0;
          html.querySelector(".mobile-shot").style.opacity = 0;

          getFrame(sourceData, scrollFraction);
        } else {
          sourceData.canvas.style.position = "relative";
          sourceData.canvas.style.zIndex = -1;
        }
      }

      if (sourceData.name === "whyghost_shot4") {
        if (
          scrollTop < shot4Holder.offsetHeight + shot4Holder.offsetTop &&
          scrollTop > shot4Holder.offsetTop
        ) {
          sourceData.canvas.style.position = "fixed";
          sourceData.canvas.style.zIndex = 10;

          maxScrollTop = isSafari
            ? shot4Holder.offsetHeight - window.innerHeight * 0.7
            : shot4Holder.offsetHeight - window.innerHeight * 0.7;
          scrollFraction = (scrollTop - shot4Holder.offsetTop) / maxScrollTop;

          html.querySelector(".desktop-shot").style.opacity = 0;
          html.querySelector(".mobile-shot").style.opacity = 0;

          getFrame(sourceData, scrollFraction);
        } else {
          sourceData.canvas.style.position = "relative";
          sourceData.canvas.style.zIndex = -1;
        }
      }
    });
  }

  function updateImage(index, sourceData) {
    sourceData.context.drawImage(sourceData.cachedImages[index], 0, 0);
  }

  function getFrame(sourceData, scrollFraction) {
    const frameIndex = !scrollFraction
      ? sourceData.count - 1
      : Math.min(
          sourceData.count - 1,
          Math.ceil(scrollFraction * sourceData.count)
        );

    requestAnimationFrame(() => updateImage(frameIndex, sourceData));
  }

  function runFallbackImages() {
    const shot1Holder = html.querySelector(`.whyghost_shot1-holder`);
    const shot2Holder = html.querySelector(`.whyghost_shot2-holder`);
    const shot3Holder = html.querySelector(`.whyghost_shot3-holder`);
    const shot4Holder = html.querySelector(`.whyghost_shot4-holder`);

    window.addEventListener("scroll", (e) => {
      if (runFallback) {
        html.querySelector(".section-home---why-card.first").style.position =
          "absolute";
        const scrollTop = html.scrollTop;

        if (
          scrollTop < shot2Holder.offsetHeight + shot2Holder.offsetTop &&
          scrollTop > shot2Holder.offsetTop
        ) {
          document.getElementById("fallback-2").style.zIndex = 10;
        } else {
          document.getElementById("fallback-2").style.zIndex = -1;
        }
        if (
          scrollTop < shot3Holder.offsetHeight + shot3Holder.offsetTop &&
          scrollTop > shot3Holder.offsetTop
        ) {
          document.getElementById("fallback-3").style.zIndex = 10;
        } else {
          document.getElementById("fallback-3").style.zIndex = -1;
        }
        if (
          scrollTop < shot4Holder.offsetHeight + shot4Holder.offsetTop &&
          scrollTop > shot4Holder.offsetTop
        ) {
          document.getElementById("fallback-4").style.zIndex = 10;
        } else {
          document.getElementById("fallback-4").style.zIndex = -1;
        }
      }
    });
  }
}
