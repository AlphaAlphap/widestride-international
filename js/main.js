(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav-links");

  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });
  }

  document.querySelectorAll(".panel-tabs button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".panel-tabs button").forEach(function (other) {
        other.classList.remove("is-on");
      });
      btn.classList.add("is-on");
    });
  });

  var form = document.getElementById("enquiry-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = (form.name.value || "").trim();
      var email = (form.email.value || "").trim();
      var phone = (form.phone.value || "").trim();
      var amount = (form.amount.value || "").trim();
      var message = (form.message.value || "").trim();
      if (!name || !email) {
        setFormStatus("Please share your name and email so we can reply.", true);
        return;
      }
      var lines = [
        "Name: " + name,
        "Email: " + email,
        "Phone: " + (phone || "—"),
        "Indicative amount (NGN): " + (amount || "—"),
        "",
        message || "I would like to learn more about WIL Balanced Asset.",
      ];
      var mailto =
        "mailto:hello@widestrideco.com" +
        "?subject=" +
        encodeURIComponent("WIL Balanced Asset enquiry — " + name) +
        "&body=" +
        encodeURIComponent(lines.join("\n"));
      setFormStatus("Opening your email client to send the enquiry…", false);
      window.location.href = mailto;
    });
  }

  var amountInput = document.getElementById("illustrator-amount");
  var yearsInput = document.getElementById("illustrator-years");
  var amountOut = document.getElementById("illustrator-amount-out");
  var yearsOut = document.getElementById("illustrator-years-out");
  var resultOut = document.getElementById("illustrator-result");
  if (amountInput && yearsInput && resultOut) {
    var formatNaira = function (value) {
      return "₦" + Math.round(value).toLocaleString("en-NG");
    };
    var update = function () {
      var amount = Number(amountInput.value) || 200000;
      var years = Number(yearsInput.value) || 1;
      if (amountOut) amountOut.textContent = formatNaira(amount);
      if (yearsOut) yearsOut.textContent = years === 1 ? "1 year" : years + " years";
      var projected = amount * Math.pow(1.25, years);
      resultOut.textContent = formatNaira(projected);
    };
    amountInput.addEventListener("input", update);
    yearsInput.addEventListener("input", update);
    update();
  }

  function setFormStatus(text, isError) {
    var status = document.getElementById("form-status");
    if (!status) return;
    status.hidden = false;
    status.textContent = text;
    status.classList.toggle("is-error", !!isError);
  }
})();
