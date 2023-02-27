//
let tabLinks = $(".careers-tabs---menu");
let tabDropdown = $(".careers-tabs---scroll");
let tabTop = $(".careers-tabs---menu-top");

tabLinks.append(tabDropdown);
tabLinks.prepend(tabTop);

// https://nnc34v.csb.app/script.js

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
  markers: false
});

ScrollTrigger.matchMedia({
  /* Only Desktop */
  "(min-width: 1200px)": function () {
    // Career Tabs - Remove Pointer Events so I can click on the dropdown
    $(".careers-tabs").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".careers-tabs---link");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "500",
          end: "bottom bottom",
          scrub: 1
        }
      });
      tl.fromTo(
        targetElement,
        {
          pointerEvents: "auto"
        },
        {
          pointerEvents: "none"
        }
      );
    });
  }
});

// Join Us Filter Menu - Set Fixed position
ScrollTrigger.matchMedia({
  /* Tablet */
  "(max-width: 991px) and (min-width: 768px)": function () {
    $(".careers-join").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".careers-join---top");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "336px",
          end: "336px",
          scrub: true
        }
      });
      tl.fromTo(
        targetElement,
        {
          position: "relative"
        },
        {
          position: "fixed",
          top: "44px",
          minWidth: "inherit",
          width: "calc(100% - 88px)",
          zIndex: "1"
        }
      );
    });
  },

  /* Mobile */
  "(max-width: 767px)": function () {
    $(".careers-join").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".careers-join---top");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "228px",
          end: "228px",
          scrub: true
        }
      });
      tl.fromTo(
        targetElement,
        {
          position: "relative"
        },
        {
          position: "fixed",
          top: "29px",
          minWidth: "inherit",
          width: "calc(100% - 58px)",
          zIndex: "1"
        }
      );
    });
  }
});

// Join Us Filter Menu - Set Padding top when fixed
ScrollTrigger.matchMedia({
  /* Tablet */
  "(max-width: 991px) and (min-width: 768px)": function () {
    $(".careers-join").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".careers-join---list-wrapper");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "336px",
          end: "336px",
          scrub: true
        }
      });
      tl.fromTo(
        targetElement,
        {
          paddingTop: "0"
        },
        {
          paddingTop: "94px"
        }
      );
    });
  },

  /* Mobile */
  "(max-width: 767px)": function () {
    $(".careers-join").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".careers-join---list-wrapper");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "228px",
          end: "228px",
          scrub: true
        }
      });
      tl.fromTo(
        targetElement,
        {
          paddingTop: "0"
        },
        {
          paddingTop: "78.59px"
        }
      );
    });
  }
});

/* ---- */
$(".careers-tabs---link").on("click", function () {
  $(".careers-tabs---dropdown-toggle-text .gc-text-m").text(
    $(this).children().first().text()
  );
});

$(".careers-tabs---scroll").on("click", function () {
  $(".careers-tabs---link").css({
    "pointer-events": "none"
  });
});

$(".careers-tabs---dropdown-links").on("click", function (e) {
  $(".careers-tabs---dropdown-toggle-text .gc-text-m").text($(this).text());
  $("html, body").animate(
    { scrollTop: $(".gc-background-dark").last().offset().top },
    "slow"
  );
  $(".careers-tabs---link").css({
    "pointer-events": "none"
  });
});

// End script.js

// https://nnc34v.csb.app/greenhouse.js

const ghSlug = "ghostautonomy";
var departmentIds = [];
var childDepts = [];
const root = document.getElementById("root");
const jobListing = document.getElementById("job-listing");
const loading = document.getElementById("loading");
const errorWrapper = document.getElementById("errwrapper");
const errorText = document.getElementById("errtext");
var filtered = [];
var filteredNav = [];

$(".careers-join---radio-button").click(function (e) {
  $(".careers-join---radio-button").parent().removeClass("active");
  $(this).parent().toggleClass("active");
});

$(document).on("mouseenter", ".job-link", function () {
  $(this).parent().css("background-color", "#ebebef");
  $(this).siblings(".careers-join---job-arrow").css("color", "#3B4DC0");
  $(this)
    .siblings(".careers-join---job-arrow")
    .css("transform", "translate(6px, -50%)");
});

$(document).on("mouseleave", ".job-link", function () {
  $(this).parent().css("background-color", "#F2F2F5");
  $(this)
    .siblings(".careers-join---job-arrow")
    .css("color", "rgba(12, 11, 16, 0.3)");
  $(this)
    .siblings(".careers-join---job-arrow")
    .css("transform", "translate(0px, -50%)");
});

$(document).on("click", ".careers-join---dropdown-list a", function (e) {
  e.preventDefault();
  $(".careers-join---dropdown").trigger("w-close");

  if ($(`#${e.currentTarget.dataset.id}`).length) {
    var scrollPos = $(`#${e.currentTarget.dataset.id}`).offset().top;
  } else {
    var scrollPos = $(`.department-section`).first().offset().top;
  }

  var posOffset =
    $(".careers-join---top").css("position") == "relative"
      ? $(".careers-join---dropdown-list").height() + 44
      : 0;

  $("html").animate(
    {
      scrollTop: scrollPos - 99 - posOffset
    },
    200,
    "linear"
  );
});

var html = document.documentElement;

function handleScrolling(engineeringDepts) {
  var screenOffset = 0;
  if ($(window).width() < 991) {
    screenOffset = 142;
  }
  window.addEventListener("scroll", (e) => {
    const scrollTop = html.scrollTop + 100;

    if ($filtered.length) {
      if (scrollTop < $($filtered[2]).offset().top - screenOffset) {
        $($filteredNav).removeClass("active");
        $($filteredNav[0]).addClass("active");

        $(".careers-join---dropdown-text").text($(`.dept-0`).text());
      } else {
        $($filteredNav[0]).removeClass("active");

        $filtered.each(function (i, el) {
          if (!engineeringDepts.includes(parseInt(el.id))) {
            let elTop = $(el).offset().top;
            let nextElTop = $filtered[i + 1]
              ? $($filtered[i + 1]).offset().top
              : $("#job-listing").offset().top + $("#job-listing").height();

            if (
              elTop - screenOffset < scrollTop &&
              nextElTop - screenOffset > scrollTop
            ) {
              $(`.careers-join---radio-button-field`).eq(i-1).addClass("active");

              $(".careers-join---dropdown-text").text(
                $(`.careers-join---radio-button-field`).eq(i-1).text()
              );
            } else {
              $(`.careers-join---radio-button-field`).eq(i-1).removeClass("active");
            }
          }
        });
      }
    }
  });
}

// Triggers when the DOM is ready
window.addEventListener("DOMContentLoaded", (event) => {
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  };
  fetch(
    "https://boards-api.greenhouse.io/v1/boards/" + ghSlug + "/departments/"
  )
    .then(handleError)
    .then((data) => {
      $(".careers-join---form").html("");
      let jobNum = 0;
      let jobLocations = [];
      let departments = data.departments;

      var reorderedDepts = [
        departments[1], // engineering
        departments[0], // Design
        departments[2], // Hardware
        departments[7], // Radar
        departments[5], // Operations
        departments[3] // Legal
        // departments[4], // Model Eng
        // departments[8] // Soft Eng
        // departments[6], // Other
        // departments[9] // No dept
      ];
      var engineeringDepts = [departments[4], departments[8]];

      engineeringDepts.forEach((child) => {
        departments[1].jobs.push(child.jobs);
      });
      departments[1].jobs = departments[1].jobs.flat();

      reorderedDepts.forEach((department, i) => {
        if (department.jobs.length !== 0) {
          department.jobs.forEach((job) => {
            if (!jobLocations.includes(job.location.name)) {
              jobLocations.push(job.location.name);
            }
          });

          if (department.name === "Engineering") {
            childDepts = department.child_ids;
            engineeringDepts.forEach((child) => {
              departmentIds.push(child.id);
              let sectionWrapper = document.getElementById("section");
              let sectionClone = sectionWrapper.cloneNode(true);
              sectionClone.id = child.id;
              jobListing.appendChild(sectionClone);
            });
          } else {
            let sectionWrapper = document.getElementById("section");
            let sectionClone = sectionWrapper.cloneNode(true);
            departmentIds.push(department.id);
            sectionClone.id = department.id;
            /*root.appendChild(sectionClone);*/
            jobListing.appendChild(sectionClone);
          }

          $(".careers-join---form").append(
            `<label class="careers-join---radio-button-field ${
              jobNum === 0 ? "active" : ""
            } w-radio dept-${i}">
                <span class="careers-join---radio-button-label gc-heading-m w-form-label" for="radio">${
                  department.name
                }</span>
                <div class="careers-join---radio-button-number">(${
                  department.jobs.length
                })</div>
              </label>`
          );
          $(document).on(
            "click",
            ".careers-join---radio-button-field",
            function (e) {
              let elIndex = $(this).index() === 0 ? 0 : $(this).index() + 1;
              $("html").animate(
                {
                  scrollTop:
                    $($(".department-section")[elIndex]).offset().top - 96
                },
                200,
                "linear"
              );
            }
          );
          jobNum++;
        } else {
          null;
        }
      });

      reorderedDepts.forEach((dept) => {
        if (dept.jobs.length) {
          let option = `<a href="" class="careers-join---dropdown-link w-dropdown-link" tabindex="0" data-id="${dept.id}" >${dept.name} (${dept.jobs.length})</a>`;
          $(".careers-join---dropdown-list").append(option);
        }
      });

      $filtered = $(".careers-join---list-right .department-section");
      $filteredNav = $(".careers-join---radio-button-field");

      filtered = document.querySelectorAll(
        ".careers-join---list-right .department-section"
      );
      filteredNav = document.querySelectorAll(
        ".careers-join---radio-button-field"
      );
    })
    .catch(function writeError(err) {
      console.error(err);
    })
    .finally(() => {
      writeJobs();
    });
});
// Triggered in finally above
function writeJobs() {
  departmentIds.forEach((departmentId) => {
    const handleError = (response) => {
      if (!response.ok) {
        throw Error(` ${response.status} ${response.statusText}`);
      } else {
        return response.json();
      }
    };
    fetch(
      "https://boards-api.greenhouse.io/v1/boards/" +
        ghSlug +
        "/departments/" +
        departmentId
    )
      .then(handleError)
      .then((data) => {
        let parent = document.getElementById(data.id);
        let parentContainer = parent.getElementsByClassName("container")[0];
        let sectionHeading = document.getElementById("dname");
        let sectionTitle = sectionHeading.cloneNode(true);
        sectionTitle.innerText = data.name;
        parentContainer.appendChild(sectionTitle);
        data.jobs.forEach((job) => {
          let listing = document.getElementById("listing");
          let ghListing = listing.cloneNode(true);

          ghListing.id = "job-" + job.id;
          ghListing.classList.add(job.location.name.split(" ")[0]);

          let jobLink = ghListing.getElementsByClassName("job-link")[0];
          jobLink.setAttribute("href", `position?${job.id}`);
          let jobTitle = ghListing.getElementsByClassName("job-title")[0];
          jobTitle.innerText = job.title;
          let jobLocation = ghListing.getElementsByClassName("job-location")[0];
          jobLocation.innerText = job.location.name;
          parentContainer.appendChild(ghListing);
        });
      })
      .catch(function writeError(err) {
        console.error(err);
      })
      .finally(() => {
        handleScrolling(childDepts);
      });
  });
}

// Add bottom boarder to blue dept nav
var stickyElm = document.querySelector(".careers-tabs---link.w--current");

const navObserver = new IntersectionObserver(
  ([e]) => e.target.classList.toggle("stickyyy", e.intersectionRatio < 1),
  { threshold: [1], rootMargin: "-41px 0px 0px 0px" }
);

navObserver.observe(stickyElm);

$(".careers-tabs---link").click(function (e) {
  $(".stickyyy").removeClass("stickyyy");
  navObserver.unobserve(stickyElm);

  stickyElm = e.currentTarget;
  navObserver.observe(stickyElm);
});

// End greenhouse.js

// https://nnc34v.csb.app/subnav.js

// Close Subnav when scroll up
const dropdownToggle = document.querySelector(
  ".careers-tabs---dropdown-toggle"
);
const dropdown = document.querySelector(".careers-tabs---dropdown");
const scrollBg = document.querySelector(".careers-tabs---scroll-bg");
const dropdownArrow = document.querySelector(".careers-tabs---dropdown-arrow");

let dropdownOpen = false;

dropdownToggle.addEventListener("click", function () {
  if (!dropdownOpen) {
    dropdown.style.setProperty("transition", "max-height 0.4s ease");
    scrollBg.style.setProperty("transition", "transform 0.4s ease");
    dropdownArrow.style.setProperty("transition", "transform 0.2s ease");
    dropdown.style.maxHeight = "800px";
    scrollBg.style.transform = "scale3d(1.1, 1.08, 1)";
    dropdownArrow.style.transform = "rotateZ(-180deg)";
    dropdownOpen = true;
  } else {
    clickFunction();
    dropdownOpen = false;
  }
});

function clickFunction() {
  dropdown.style.setProperty(
    "transition",
    "max-height 0.8s cubic-bezier(.77, 0, .175, 1)"
  );
  scrollBg.style.setProperty(
    "transition",
    "transform 0.8s cubic-bezier(.77, 0, .175, 1)"
  );
  dropdownArrow.style.setProperty("transition", "transform 0.4s ease");
  dropdown.style.maxHeight = "53px";
  scrollBg.style.transform = "scale3d(1, 1, 1)";
  dropdownArrow.style.transform = "rotateZ(0)";
  dropdownOpen = false;
}

ScrollTrigger.create({
  trigger: ".careers-scroll-trigger",
  start: "20% top",
  end: "20% top",
  toggleActions: "play none none reverse",
  onEnterBack: clickFunction
});

// Careers horizontal tabs
var Webflow = Webflow || [];
Webflow.push(function () {
  if (window.innerWidth < 1200) {
    if ($("#tabs-careers").length) {
      // Nav slide exp
      var tabMenuWidth = 0;
      var tabPositions = [];
      $("#tabs-careers > .careers-tabs---link").each(function (i, tab) {
        tabMenuWidth = $(tab).width() + 32 + tabMenuWidth;
        tabPositions.push(tabMenuWidth);
      });

      var tabMenuPosition = 0;
      var tabViewPort = $(".careers-tabs").width();
      var tabMenuOffset = tabMenuWidth - tabViewPort;

      $("#tabs-careers").on("scroll", function (e) {
        let leftPos = $(this).children().first().offset().left;
        if (leftPos > 0) {
          $(".careers-tabs---arrow-left, .tab-software---gradient-left").css({
            opacity: 0,
            cursor: "auto",
            pointerEvents: "none"
          });
        } else {
          $(".careers-tabs---arrow-left, .tab-software---gradient-left").css({
            opacity: 1,
            cursor: "pointer",
            pointerEvents: "auto"
          });
        }

        if (
          $(this).children().first().offset().left +
            tabMenuWidth -
            tabViewPort <
          0
        ) {
          $(".careers-tabs---arrow-right, .tab-software---gradient-right").css({
            opacity: 0,
            cursor: "auto",
            pointerEvents: "none"
          });
        } else {
          $(".careers-tabs---arrow-right, .tab-software---gradient-right").css({
            opacity: 1,
            cursor: "pointer",
            pointerEvents: "auto"
          });
        }
      });

      $(".careers-tabs---link").on("click", function () {
        let tabIndex = $(this).index();
        let tabOffset = window.innerWidth < 767 ? 4 : 20;
        tabMenuPosition = tabPositions[tabIndex - 1];

        $("#tabs-careers").animate(
          { scrollLeft: tabMenuPosition - tabOffset },
          100,
          "linear"
        );
      });

      if (window.innerWidth > 767) {
        $(".careers-tabs---arrow-right").on("click", function () {
          let currentPos = Math.abs(
            $(".careers-tabs---link").first().offset().left
          );
          let jumpSpace = tabMenuWidth / 8;
          $("#tabs-careers").animate(
            { scrollLeft: currentPos + jumpSpace },
            100,
            "linear"
          );
        });

        $(".careers-tabs---arrow-left").on("click", function () {
          let currentPos = Math.abs(
            $(".careers-tabs---link").first().offset().left
          );
          let jumpSpace = tabMenuWidth / 8;
          $("#tabs-careers").animate(
            { scrollLeft: currentPos - jumpSpace },
            100,
            "linear"
          );
        });
      }
    }
  }
});

// Set Fixed position to Arrows when scroll
ScrollTrigger.matchMedia({
  "(max-width: 1200px) and (min-width: 992px)": function () {
    $(".careers-tabs-section").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".careers-tabs---arrow-right");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "330px",
          end: "330px",
          scrub: true
        }
      });
      tl.fromTo(
        targetElement,
        {
          position: "absolute"
        },
        {
          position: "fixed",
          top: "24px",
          right: "0"
        }
      );

      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "bottom top+=210px",
          end: "bottom top+=195px",
          scrub: true
        }
      });
      tl2.fromTo(
        targetElement,
        {
          visibility: "visible"
        },
        {
          visibility: "hidden"
        }
      );
    });
  },
  "(max-width: 991px) and (min-width: 768px)": function () {
    $(".careers-tabs-section").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".careers-tabs---arrow-right");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "195px",
          end: "195px",
          scrub: true
        }
      });
      tl.fromTo(
        targetElement,
        {
          position: "absolute"
        },
        {
          position: "fixed",
          top: "24px",
          right: "0px"
        }
      );

      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "bottom top+=210px",
          end: "bottom top+=195px",
          scrub: true
        }
      });
      tl2.fromTo(
        targetElement,
        {
          visibility: "visible"
        },
        {
          visibility: "hidden"
        }
      );
    });
  },
  "(max-width: 767px)": function () {
    $(".careers-tabs-section").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".careers-tabs---arrow-right");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "221px",
          end: "221px",
          scrub: true
        }
      });
      tl.fromTo(
        targetElement,
        {
          position: "absolute"
        },
        {
          position: "fixed",
          top: "24px",
          right: "0px"
        }
      );

      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "bottom top+=234px",
          end: "bottom top+=219px",
          scrub: true
        }
      });
      tl2.fromTo(
        targetElement,
        {
          visibility: "visible"
        },
        {
          visibility: "hidden"
        }
      );
    });
  }
});

ScrollTrigger.matchMedia({
  "(max-width: 1200px) and (min-width: 992px)": function () {
    $(".careers-tabs-section").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".careers-tabs---arrow-left");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "330px",
          end: "330px",
          scrub: true
        }
      });
      tl.fromTo(
        targetElement,
        {
          position: "absolute"
        },
        {
          position: "fixed",
          top: "24px",
          left: "0px"
        }
      );

      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "bottom top+=210px",
          end: "bottom top+=195px",
          scrub: true
        }
      });
      tl2.fromTo(
        targetElement,
        {
          visibility: "visible"
        },
        {
          visibility: "hidden"
        }
      );
    });
  },
  "(max-width: 991px) and (min-width: 768px)": function () {
    $(".careers-tabs-section").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".careers-tabs---arrow-left");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "195px",
          end: "195px",
          scrub: true
        }
      });
      tl.fromTo(
        targetElement,
        {
          position: "absolute"
        },
        {
          position: "fixed",
          top: "24px",
          left: "0px"
        }
      );

      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "bottom top+=210px",
          end: "bottom top+=195px",
          scrub: true
        }
      });
      tl2.fromTo(
        targetElement,
        {
          visibility: "visible"
        },
        {
          visibility: "hidden"
        }
      );
    });
  },
  "(max-width: 767px)": function () {
    $(".careers-tabs-section").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".careers-tabs---arrow-left");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "221px",
          end: "221px",
          scrub: true
        }
      });
      tl.fromTo(
        targetElement,
        {
          position: "absolute"
        },
        {
          position: "fixed",
          top: "24px",
          right: "0px"
        }
      );

      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "bottom top+=210px",
          end: "bottom top+=195px",
          scrub: true
        }
      });
      tl2.fromTo(
        targetElement,
        {
          visibility: "visible"
        },
        {
          visibility: "hidden"
        }
      );
    });
  }
});

$("#perception-btn").on("click", function (evt) {
  $("#perception-tab").triggerHandler("click");
  evt.preventDefault();
});

$("#artificial-btn").on("click", function (evt) {
  $("#artificial-tab").triggerHandler("click");
  evt.preventDefault();
});

$("#real-btn").on("click", function (evt) {
  $("#real-tab").triggerHandler("click");
  evt.preventDefault();
});

$("#hardware-btn").on("click", function (evt) {
  $("#hardware-tab").triggerHandler("click");
  evt.preventDefault();
});

$("#design-btn").on("click", function (evt) {
  $("#design-tab").triggerHandler("click");
  evt.preventDefault();
});

$("#regulatory-btn").on("click", function (evt) {
  $("#regulatory-tab").triggerHandler("click");
  evt.preventDefault();
});

$("#oem-btn").on("click", function (evt) {
  $("#oem-tab").triggerHandler("click");
  evt.preventDefault();
});

$("#operations-btn").on("click", function (evt) {
  $("#operations-tab").triggerHandler("click");
  evt.preventDefault();
});

// End subnav.js

// Other code

// Split the text up
let typeSplit;

function runSplit() {
  typeSplit = new SplitType(".split-text", {
    types: "lines"
  });
  $(".line").prepend("<div class='line-mask'></div>");

  createAnimation();
}

if (window.innerWidth > 767) {
  runSplit();
}

// Update on window resize
let windowWidth = $(window).innerWidth();
window.addEventListener("resize", function () {
  if (windowWidth !== $(window).innerWidth()) {
    windowWidth = $(window).innerWidth();
    typeSplit.revert();
    runSplit();
  }
});

/* Show the animation once you scroll and not repeat */
function createAnimation() {
  $(".line").each(function (index) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(".gc-wrapper"),
        // trigger element - viewport
        start: "top bottom",
        end: "bottom center",
        toggleActions: "play none none none"
      }
    });

    tl.set($(this), { transformOrigin: "center center" }).fromTo(
      $(this),
      { opacity: "0", translateY: "100%" },
      { opacity: "1", translateY: "0%", duration: 1 }
    );
  });
}

// Hold Scroll when open modal

$(".button-contact").click(function () {
  $("body").css({ overflow: "hidden" });
});

$("contact-modal---close-wrapper").click(function () {
  $("body").css({ overflow: "visible" });
});

$("platform-modal---close").click(function () {
  $("body").css({ overflow: "visible" });
});

// Add hover and select element from the list when is clicked

const dropdownLinks = document.querySelectorAll(
  ".careers-tabs---dropdown-links"
);

// Add the hover-link class when hovering over a dropdown link
dropdownLinks.forEach((link) => {
  let clicked = false;

  link.addEventListener("mouseenter", () => {
    if (!clicked) link.classList.add("hover-link");
  });

  link.addEventListener("mouseleave", () => {
    if (!clicked) link.classList.remove("hover-link");
  });

  link.addEventListener("click", () => {
    clicked = true;
    dropdownLinks.forEach((otherLink) => {
      otherLink.classList.remove("hover-link");
    });
    link.classList.add("hover-link");
  });
});

document.querySelectorAll(".careers-tabs---link-text").forEach((link) => {
  link.addEventListener("click", function () {
    document
      .querySelectorAll(".careers-tabs---dropdown-links")
      .forEach((dropdownLink) => {
        if (dropdownLink.textContent === link.textContent) {
          dropdownLink.classList.add("hover-link");
        } else {
          dropdownLink.classList.remove("hover-link");
        }
      });
  });
});
