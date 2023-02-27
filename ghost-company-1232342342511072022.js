function setFirstImage(width) {
  if (!$(".company-leaders---sticky-image img").length) {
    var imgFirst =
      width == "100%"
        ? $(".company-leaders---profile-mobile")
        : $(".company-leaders---profile-desktop");
    imgFirst = imgFirst.first().clone();
    imgFirst = imgFirst.css({
      maxWidth: width,
      width: width,
      opacity: 1
    });
    $(".company-leaders---sticky-image").html(imgFirst);
    imgFirst.fadeIn();
    $(".company-leaders---right")
      .first()
      .addClass("active");
  }
}

Webflow.push(function () {
    const isHoverableDevice = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );
    const startHeight = $(".company-leaders-heading").first().offset().top;
    const cutoffHeight = $(".company-leaders---subheading").last().offset().top;

    var html = document.documentElement;

    // Show first images at start
    if (window.innerWidth < 992) {
      // iPhone
      setFirstImage("100%");
      // Update in webflow
      // $(".company-leaders---left").first().show();

      // Mobile scroll show
      var resetScroll = 0;

      window.addEventListener("scroll", (e) => {
        const scrollTop = html.scrollTop;
        const paddingOffset = 38;
        const headerOffset =
          $(".company-leaders---sticky-image img").first().height() +
          paddingOffset * 2;
        resetScroll++;

        if (resetScroll > 5) {
          $(".company-leaders---right").each(
            function (i, el) {
              el = $(el);
              if (
                scrollTop > el.offset().top - headerOffset &&
                scrollTop < el.offset().top + el.height() - headerOffset
              ) {
                var img = $(this)
                  .parent()
                  .find(".company-leaders---profile-mobile");
                var currentImg = $(".company-leaders---sticky-image img").attr(
                  "src"
                );

                if (currentImg !== img.attr("src")) {
                  $(
                    ".company-leaders---right"
                  ).removeClass("active");
                  $(this).addClass("active");

                  img.hide();
                  imgClone = img.clone();
                  imgClone = imgClone.css({
                    maxWidth: "100%",
                    width: "100%",
                    opacity: 1
                  });
                  $(".company-leaders---sticky-image").append(imgClone);
                  imgClone.show();
                  setTimeout(function () {
                    $(
                      ".company-leaders---sticky-image img:not(:last-child)"
                    ).remove();
                  }, 500);
                }
              }
              resetScroll = 0;
            }
          );
        }
      });
    }

    if (window.innerWidth > 992 && isHoverableDevice.matches) {
      // Desktop
      window.addEventListener("scroll", (e) => {
        const scrollTop = html.scrollTop;

        if (scrollTop > cutoffHeight) {
          $(".company-leaders---sticky-image").css("height", 392);
        } else {
          $(".company-leaders---sticky-image").css("height", 0);
        }
      });

      $(".company-leaders---right").mouseenter(
        function () {
          var img = $(this).parent().find(".company-leaders---profile-desktop");
          img.hide();
          imgClone = img.clone();
          imgClone = imgClone.css({
            maxWidth: "392px",
            opacity: 1
          });
          $(".company-leaders---sticky-image").append(imgClone);
          imgClone.show();
          setTimeout(function () {
            $(".company-leaders---sticky-image img:not(:last-child)").remove();
          }, 200);
        }
      );

      $(".company-new-way div").mouseenter(function (e) {
        if (
          !$(e.target).closest(
            ".company-leaders---right"
          ).length
        ) {
          $(".company-leaders---sticky-image").html("");
        }
      });
    }

    if (window.innerWidth > 992 && !isHoverableDevice.matches) {
      //iPad
      var resetScroll = 0;

      window.addEventListener("scroll", (e) => {
        const scrollTop = html.scrollTop;
        const headerOffset = 48;
        resetScroll++;

        if (scrollTop > cutoffHeight) {
          $(".company-leaders---sticky-image").css("height", 120);
        } else {
          $(".company-leaders---sticky-image").css("height", 0);
        }

        if (scrollTop < startHeight) {
          if ($(".company-leaders---right").hasClass("active")) {
            $(".company-leaders---right").removeClass("active");
            $(".company-leaders---sticky-image").html("");
          }
        } else {
          setFirstImage("261px");
        }

        if (resetScroll > 5) {
          $(".company-leaders---right").each(
            function (i, el) {
              el = $(el);
              if (
                scrollTop > el.offset().top - headerOffset &&
                scrollTop < el.offset().top + el.height() - headerOffset
              ) {
                var img = $(this)
                  .parent()
                  .find(".company-leaders---profile-desktop");
                var currentImg = $(".company-leaders---sticky-image img").attr(
                  "src"
                );

                if (currentImg !== img.attr("src")) {
                  $(
                    ".company-leaders---right"
                  ).removeClass("active");
                  $(this).addClass("active");

                  img.hide();
                  imgClone = img.clone();
                  imgClone = imgClone.css({
                    opacity: 1,
                    maxWidth: 261,
                    width: 261
                  });
                  $(".company-leaders---sticky-image").append(imgClone);
                  imgClone.show();
                  setTimeout(function () {
                    $(
                      ".company-leaders---sticky-image img:not(:last-child)"
                    ).remove();
                  }, 500);
                }
              }
              resetScroll = 0;
            }
          );
        }
      });
    }
  });
