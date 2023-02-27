const ghSlug = "ghostautonomy";
var positions = [];
var resumeReq = true;

function handleScrolling() {
  var html = document.documentElement;
  var aboutSect = $(".positions-about").offset().top;
  var applySect = $("#position-form").offset().top - 32;
  var headers = $(".positions-about .w-richtext").children("h3");
  positions = [aboutSect];

  headers.each(function (i, el) {
    positions.push($(el).offset().top);
    $(".platform-tabs-tab")
      .eq(0 + i)
      .after(
        `<a href="#" class="platform-tabs-tab w-inline-block"><div>${$(
          el
        ).text()}</div></a>`
      );
  });
  positions.push(applySect);

  $(".platform-tabs-tab").eq(0).addClass("w--current");

  window.addEventListener("scroll", (e) => {
    const scrollTop = html.scrollTop;
    $(".platform-tabs-tab").removeClass("w--current");

    if (scrollTop < positions[1]) {
      $(".platform-tabs-tab").eq(0).addClass("w--current");
    } else if (scrollTop < positions[2]) {
      $(".platform-tabs-tab").eq(1).addClass("w--current");
    } else if (scrollTop < positions[3]) {
      $(".platform-tabs-tab").eq(2).addClass("w--current");
    } else if (scrollTop < positions[4]) {
      $(document).find(".platform-tabs-tab").eq(3).addClass("w--current");
    } else if (positions[5] && scrollTop < positions[5]) {
      $(".platform-tabs-tab").last().addClass("w--current");
    }

    if (scrollTop > applySect) {
      $(".platform-tabs-tab").last().addClass("w--current");
    }
  });

  $(".platform-tabs-tab").on("click", function () {
    $("html").animate({ scrollTop: positions[$(this).index()] + 1 },
      500,
      "linear"
    );
  });
}

$(".positions-col---cta-right a").on("click", function () {
  $("html").animate({ scrollTop: $("#position-form").offset().top - 30 },
    1000,
    "linear"
  );
});

$(document).on("change", ".btn-check", function () {

  $(this).parent().next(".error").remove()
  $(".btn-group-yes-no .btn").css({ color: "#707070" })
  handleErrorUpdate();
})

var jobId =
  window.location.href.split("?").length > 1 ?
  window.location.href.split("?").pop() :
  "4011469005";
var requestOptions = {
  method: "GET",
  redirect: "follow"
};

fetch(
    `https://boards-api.greenhouse.io/v1/boards/ghostautonomy/jobs/${jobId}?questions=true`,
    requestOptions
  )
  .then((response) => response.text())
  .then((result) => {
    var job = JSON.parse(result);

    $("title").text(job.title)

    switch (jobId) {
    case "4011685005":
      $(".position-text > div").text(
        "We are looking for an engineer to build and test the models that literally drive our vehicles."
      )
      break;
    case "4014854005":
      $(".position-text > div").text(
        "We are looking for a hands-on leader to direct our systems software engineering team in Sydney."
      )
      break;
    case "4011470005":
      $(".position-text > div").text(
        "We are looking for an engineer to spearhead our efforts at the intersection of software and hardware."
      )
      break;
    case "4149686005":
      $(".position-text > div").text(
        "We are looking for a Kubernetes expert to develop and support our private cloud infrastructure.  "
      )
      break;
    case "4017781005":
      $(".position-text > div").text(
        "We are looking for software talent across the board, from developing compilers to optimizing performance to building reliable systems. "
      )
      break;
    case "4011469005":
      $(".position-text > div").text(
        "We are looking for software talent across the board, from building low-level platforms to developing data and machine learning systems."
      )
      break;
    case "4028262005":
      $(".position-text > div").text(
        "We are looking for a product designer to create experiences that are not only beautiful, but also useful and intuitive."
      )
      break;
    case "4085984005":
      $(".position-text > div").text(
        "We are looking for an engineer to develop and evaluate calibration algorithms for the cameras used in cars."
      )
      break;
    case "4119693005":
      $(".position-text > div").text(
        "We are looking for an engineer to design, build, and test radar hardware from concept to production."
      )
      break;
    case "4147856005":
      $(".position-text > div").text(
        "We are looking for an expert in testing and compliance to lead qualification for our radar products."
      )
      break;
    case "4119670005":
      $(".position-text > div").text(
        "We are looking for a leader to scale and manage our fleet safely and efficiently in Detroit."
      )
    case "4202435005":
      $(".position-text > div").text(
        "We are looking for a part-time Safety Driver to be the first hire at our new Metro Detroit garage."
      )
      break;
    default:
      break;
    }

    $(".positions .gc-heading-l").text(job.title);

    $(".position-location").text(job.location.name);

    switch (job.departments[0].name) {
    case "Design":
      $(".design").show();
      $(".positions-tag.design").css("display", "inline-block");
      break;
    case "Engineering":
    case "Model Engineering":
    case "Software Engineering":
      $(".engineering").show();
      $(".positions-tag.engineering").css("display", "inline-block");
      break;
    case "Hardware":
      $(".hardware").show();
      $(".positions-tag.hardware").css("display", "inline-block");
      break;
    case "Radar":
      $(".radar").show();
      $(".positions-tag.radar").css("display", "inline-block");
      break;
    case "Ops":
      $(".ops").show();
      $(".positions-tag.ops").css("display", "inline-block");
      break;
    default:
      $(".general").show();
      $(".positions-tag.general").css("display", "inline-block");
      break;
    }

    let jobContent = decodeHtml(job.content);
    jobContent = jobContent.replace(
      "<p>Learn more at&nbsp;https://ghostautonomy.com.</p>",
      "<p><a href='/' class='link-w-arrow'>Learn more about us</a></p>"
    );
    $(".positions-about .w-richtext").html(jobContent);
    // remove Learn more at https://ghostautonomy.com.

    // build form
    let jobQuestions = job.questions.reverse();
    jobQuestions.forEach(function (item, i) {
      if (item.label === "Resume/CV" && !item.required) {
        resumeReq = false;
      }
      if (
        item.label !== "First Name" &&
        item.label !== "Last Name" &&
        item.label !== "Email" &&
        item.label !== "Phone" &&
        item.label !== "Resume/CV" &&
        item.label !== "Cover Letter"
      ) {
        let itemFields = item.fields;

        itemFields.forEach(function (field, j) {
          var fieldEl = null;
          if (field.type == "textarea") {
            fieldEl = `<div id="w-node-b3bc81ef-cf84-ff7f-ec37-b1650d111e78-0d111e70" class="careers-form---wrapper">
            <div class="gc-text-l padding-x---0 gc-text-color-neutral-3 margin-bottom---24">${item.label} ${ item.required ? "*" : "" }</div>
              <textarea class="careers---text-field w-node-b3bc81ef-cf84-ff7f-ec37-b1650d111e79-0d111e70 w-input" style="min-height: 180px;" name="${
                field.name
              }" data-name="${field.name}" placeholder="Your response" id="${field.name}" ${ item.required ? "required" : "" }></textarea>
            </div>`;
          } else if (field.type == "multi_value_single_select") {
            fieldEl = `<div id="w-node-b3bc81ef-cf84-ff7f-ec37-b1650d111e78-0d111e70" class="careers-form---wrapper">
              <div class="gc-text-l padding-x---0 gc-text-color-neutral-3 margin-bottom---24">${item.label} ${ item.required ? "*" : "" }</div>
              <div class="btn-group-yes-no btn-group" role="group">
                  <input type="radio" class="btn-check" name="${field.name}" id="btnradio-yes-${field.name}" autocomplete="off" value="yes" ${ item.required ? "required" : "" }>
                  <label class="btn btn-outline-primary" for="btnradio-yes-${field.name}">Yes</label>
                  <input type="radio" class="btn-check" name="${field.name}" id="btnradio-no-${field.name}" autocomplete="off" value="no">
                  <label class="btn btn-outline-primary" for="btnradio-no-${field.name}">No<span class="small-border"></span></label>
              </div>
            </div>`;
          } else if (item.label == "LinkedIn Profile" || item.label == "Website") {
            fieldEl = `<div id="w-node-b3bc81ef-cf84-ff7f-ec37-b1650d111e78-0d111e70" class="careers-form---wrapper">
              <input type="${
                field.type
              }" class="careers---text-field w-node-b3bc81ef-cf84-ff7f-ec37-b1650d111e79-0d111e70 w-input" name="${
                field.name
              }" data-name="${field.name}" placeholder="${item.label} ${ item.required ? "*" : "" }" id="${field.name}" ${ item.required ? "required" : "" }>
            </div>`;
          } else {
            fieldEl = `<div id="w-node-b3bc81ef-cf84-ff7f-ec37-b1650d111e78-0d111e70" class="careers-form---wrapper">
            <div class="gc-text-l padding-x---0 gc-text-color-neutral-3 margin-bottom---24">${item.label} ${ item.required ? "*" : "" }</div>
              <input type="${
                field.type
              }" class="careers---text-field w-node-b3bc81ef-cf84-ff7f-ec37-b1650d111e79-0d111e70 w-input" name="${
                field.name
              }" data-name="${field.name}" placeholder="Your response" id="${field.name}" ${ item.required ? "required" : "" }>
            </div>`;
          }

          $("#wf-form-position .careers---file-upload").last().after(fieldEl);
        });
      }
    });

    handleScrolling();
    $(".position-loader").css({
      opacity: 1
    });
  })
  .catch((error) => console.log("error", error));

function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Post application
let resume = null;
let coverLetter = null;

$("#wf-form-position input[name=resume]").on("change", async function (e) {
  resume = e.target.files[0];
});
$("#wf-form-position input[name=cover_letter]").on("change", async function (
  e
) {
  coverLetter = e.target.files[0];
});

$("#resume").change(function () {
  if (this.files.length) {
    filename = this.files[0].name;
    $(".careers-filename").text(filename);
    $("label[for=resume]").css("opacity", "0");
  } else {
    $(".careers-filename").text("Attach");
  }
});

$("#cover_letter").change(function () {
  if (this.files.length) {
    filenameCover = this.files[0].name;
    $(".careers-filename-cover").text(filenameCover);
    $("label[for=cover_letter]").css("opacity", "0");
  } else {
    $(".careers-filename-cover").text("Attach");
  }
});

$("#wf-form-position input[type=submit]").on("click", function (e) {
  e.preventDefault();

  $(this).val("Submitting...")
  var first_name = $("#first_name").val();
  var last_name = $("#last_name").val();
  var email = $("#email-2").val();
  var valid = validateForm() //(first_name, last_name, email, resume);

  if (!valid) {
    $(this).val("Submit application")
    return false;
  }

  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Basic ZDlmOWJiNmM1MzU0ZTQ1NGU4YmRlZDNiNWVjODdlNDAtNQ=="
  );
  var formdata = new FormData();

  $("#wf-form-position input[type=text], #wf-form-position input[type=email], #wf-form-position input[type=tel], #wf-form-position input[type=file], #wf-form-position input[type=input_text], #wf-form-position textarea, #wf-form-position select")
    .each(function (
      i,
      el
    ) {
      let field = $(el);
      if (
        field.attr("name") !== "resume" ||
        field.attr("name") !== "cover_letter"
      ) {
        formdata.append(field.attr("name"), field.val());
      }
    });

  $("#wf-form-position input[type=radio]").each(function (
    i,
    el
  ) {
    let field = $(el);
    if (field.is(":checked")) {
      formdata.append(field.attr("name"), field.val());
    }
  });

  if (resume) formdata.append("resume", resume);
  if (coverLetter) formdata.append("cover_letter", coverLetter);
  // formdata.append("mapped_url_token", "Website");
  formdata.append(
    "destination",
    `https://boards-api.greenhouse.io/v1/boards/ghostautonomy/jobs/${jobId}`
  );

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow"
  };

  fetch("https://proxy.letter.run/api/request", requestOptions)
    .then((response) => response.text())
    .then((result) => {

      let resultObj = JSON.parse(result);

      $(".careers---form-block").html(`
        <div class="careers---rich-text" style="height: 400px;display: flex;flex-direction: column;justify-content: center;">
          <h4 style="margin-bottom: 12px">${
            resultObj.error
              ? "Sorry, your application was not submitted"
              : "Thank you for applying"
          }.</h4>
          <p>${
            resultObj.error
              ? resultObj.error
              : "Your application has been received and will be reviewed by our hiring team."
          }</p>
        </div>
      `);

      $("html").animate({
          scrollTop: $("#position-form").offset().top
        },
        500,
        "linear"
      );
    })
    .catch((error) => {
      $(".careers---form-block").html(`
        <div class="careers---rich-text" style="height: 400px;display: flex;flex-direction: column;justify-content: center;">
          <h4 style="margin-bottom: 12px">Sorry, your application was not submitted.</h4>
          <p>${error}</p>
        </div>
      `);
    });
});

function validateForm() { // (first_name, last_name, email, resume) {
  var valid = true;

  $(".error").remove();

  // if (!first_name) {
  //   $("#first_name").after(
  //     `<label id="first_name-error" class="error" for="Name">Please add your first name</label>`
  //   );
  //   valid = false;
  // }
  // if (!last_name) {
  //   $("#last_name").after(
  //     `<label id="last_name-error" class="error" for="Name">Please add your last name</label>`
  //   );
  //   valid = false;
  // }
  // if (!email) {
  //   $("#email-2").after(
  //     `<label id="email-error" class="error" for="Name">Please add a valid email</label>`
  //   );
  //   valid = false;
  // }
  // if (!checkValidEmail(email)) {
  //   valid = false;
  // }
  // if (resumeReq) {
  //   if (!resume) {
  //     $("#resume")
  //       .closest(".careers---file-upload-button")
  //       .after(
  //         `<label id="resume-error" class="error" for="Name">Please add a resume</label>`
  //       );
  //     valid = false;
  //   }
  //   if (!checkValidFile(resume)) {
  //     valid = false;
  //   }
  // }

  var requireds = $("#position-form input[required], #position-form textarea[required]")

  for (var i = 0; i < requireds.length; i++) {
    var $field = $(requireds[i])

    if ($field.attr("type") == "radio") {

      if (!$(`input[name=${$field[0].name}]:checked`).length) {
        $field.parent().after(
          `<label id="radio-error" class="error" for="Name">Please select an answer</label>`
        );
        valid = false;
      }
    } else if ($field.attr("type") == "file" && !$field.val()) {

      $("#resume")
        .closest(".careers---file-upload-button")
        .after(
          `<label id="resume-error" class="error" for="Name">Please add your resume</label>`
        );
      valid = false;

      if (!checkValidFile(resume)) {
        valid = false;
      }

    } else if (!$field.val()) {
      $field.after(
        `<label id="last_name-error" class="error" for="Name">Please add ${ !$field.attr("name").includes("question") ? "your " + $field.attr("name").replace(/_/g, ' ') : "an answer" }</label>`
      );
      valid = false;
    }
  }

  if (!valid) {
    return false;
  } else {
    return true;
  }
}

function handleErrorUpdate() {

  var requireds = $("#position-form input[required], #position-form textarea[required]")
  var validEmail = false;
  var valid = true
  var email = $("#email-2").val();
  if (email) {
    validEmail = checkValidEmail(email);
  }
  if (resume && resumeReq) {
    validResume = checkValidFile(resume);
  }

  for (var i = 0; i < requireds.length; i++) {
    var $field = $(requireds[i])

    if ($field.attr("type") == "radio" && !$(`input[name=${$field[0].name}]:checked`).length) {

      valid = false;

    } else if ($field.attr("type") == "file" && !$field.val()) {

      valid = false;

    } else if (!$field.val()) {

      valid = false;
    }
  }

  if (valid && validEmail && resume && validResume) {
    $("#wf-form-position input[type=submit]").addClass("active");
  }
}

$(document).on("blur", "#position-form input[required], #position-form textarea[required]",
  function () {
    $(this).next(".error").remove();
    handleErrorUpdate();
  });

$("#resume").on("change", async function () {
  $(this).closest(".careers---file-upload-button").next(".error").remove();
  handleErrorUpdate();
});

function checkValidFile(file) {
  if (file?.name && !validateFile(file)) {
    $("#resume")
      .closest(".careers---file-upload-button")
      .next(".error")
      .remove();
    $("#resume")
      .closest(".careers---file-upload-button")
      .after(
        `<label id="resume-error" class="error" for="Name">Please add your resume in a valid format (pdf, doc, docx, txt, rtf)</label>`
      );
    return false;
  } else {
    return true;
  }
}

function validateFile(file) {
  const re = /^.*\.(pdf|PDF|doc|DOC|docx|DOCX|txt|TXT|rft|RFT)$/;
  return re.test(file.name);
}

function checkValidEmail(email) {
  if (!validateEmail(email)) {
    $("#email-2").parent().find(".error").remove();
    $("#email-2").after(
      `<label id="email-error" class="error" for="Name">Please add a valid email</label>`
    );
    return false;
  } else {
    return true;
  }
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
}
