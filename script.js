/* ------------------------------------------------------------------
   EDIT THIS BLOCK ONLY.
   Google Form links and the team contact email.
------------------------------------------------------------------- */
const CONFIG = {
  contact: "kunjhthakker@gmail.com",
  forms: {
    pre: "https://docs.google.com/forms/d/e/1FAIpQLScuqORDXtzezxrBBKKmTod2Y_H5_235QkNYl205QLbexXuLwQ/viewform?embedded=true",
    post: "https://docs.google.com/forms/d/e/1FAIpQLSf1lTWBMb8NSXx8LkdMCay1-FVkiGSRK7zGdDOUPKCT8cHiXg/viewform?embedded=true",
    feedback: "https://docs.google.com/forms/d/e/1FAIpQLScITSHY5iBDN3PZUKfn9B0vB8-mVb-4g6ymAnIbNiltRLAL3A/viewform?embedded=true"
  }
};

(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const storeGet = k => { try { return sessionStorage.getItem(k); } catch (e) { return null; } };
  const storeSet = (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) {} };

  /* contact placeholder */
  if (CONFIG.contact) $$('[data-config="contact"]').forEach(el => { el.textContent = CONFIG.contact; });

  /* Google Forms: only injected AFTER consent (nothing loads from Google before then) */
  function embedForms() {
    $$("[data-form]").forEach(slot => {
      if (slot.dataset.done) return;
      const key = slot.dataset.form;
      const url = CONFIG.forms[key];
      const link = $(`[data-form-link="${key}"]`);
      if (!url) {
        slot.innerHTML = '<p class="missing">This form link has not been added yet (see README).</p>';
        if (link) link.removeAttribute("href");
        return;
      }
      const embed = url.includes("embedded=true") ? url : url + (url.includes("?") ? "&" : "?") + "embedded=true";
      const f = document.createElement("iframe");
      f.src = embed; f.loading = "lazy"; f.title = key + " quiz (Google Form)";
      f.textContent = "Loading…";
      slot.appendChild(f);
      if (link) link.href = url.replace(/[?&]embedded=true/, "");
      slot.dataset.done = "1";
    });
  }

  /* consent gate */
  const check = $("#consent-check"), btn = $("#consent-btn"), status = $("#consent-status");
  function unlock(scroll) {
    $$(".locked").forEach(s => s.classList.remove("locked"));
    embedForms();
    status.textContent = "Thank you. Steps 2, 4 and 5 are now unlocked.";
    check.checked = true; check.disabled = true; btn.disabled = true;
    if (scroll) $("#pre").scrollIntoView();
  }
  check.addEventListener("change", () => { btn.disabled = !check.checked; });
  btn.addEventListener("click", () => { storeSet("consent", "1"); unlock(true); });
  if (storeGet("consent") === "1") unlock(false);

  /* annotated email */
  const HINTS = {
    h1: "Look-alike domain. The display name says \"Uni IT Helpdesk\" but the real address is on an unrelated domain (.co, with extra words). Always check the real address.",
    h2: "Urgency and threat. \"URGENT\" and a 24-hour deadline are meant to stop you thinking.",
    h3: "Asks for your password. Genuine IT teams don't ask you to \"verify\" credentials by email.",
    h4: "Suspicious link. The domain is not your university's. Hover or long-press to see the real destination before ever clicking.",
    h5: "Unexpected ZIP attachment. \"Updates\" are never delivered this way. Archives are commonly used to hide malware."
  };
  const hint = $("#hint");
  $$(".hot").forEach(b => {
    b.setAttribute("aria-pressed", "false");
    b.addEventListener("click", () => {
      b.setAttribute("aria-pressed", "true");
      hint.textContent = HINTS[b.dataset.hint];
    });
  });

  /* mini real-or-fake (no data stored) */
  const QS = [
    { t: "From: no-reply@accounts.yourbank.example: \"A new device signed in. If this was you, no action is needed. Review activity in the official app.\"", fake: false,
      why: "Real. It asks for no action, carries no pressure, and sends you to the official app rather than a link." },
    { t: "From: payroll@c0mpany-hr.example: \"Your salary slip is attached. Open the file and sign in to view. Offer expires in 2 hours.\"", fake: true,
      why: "Fake. Look at the zero in \"c0mpany\", the unexpected attachment, a login request and the 2-hour deadline." },
    { t: "SMS: \"Your parcel is held. Pay ₹25 customs fee at http://bit.ly/xxxx to release.\"", fake: true,
      why: "Fake. Small fees, shortened links and surprise deliveries are classic smishing." }
  ];
  const mini = $("#mini");
  QS.forEach((q, i) => {
    const d = document.createElement("div");
    d.className = "q";
    d.innerHTML = `<blockquote></blockquote>
      <div class="opts" role="group" aria-label="Question ${i + 1}">
        <button type="button" data-a="real">Real</button>
        <button type="button" data-a="fake">Fake</button>
      </div><p class="res" role="status" aria-live="polite"></p>`;
    $("blockquote", d).textContent = q.t;
    $$("button", d).forEach(b => b.addEventListener("click", () => {
      const right = (b.dataset.a === "fake") === q.fake;
      const res = $(".res", d);
      res.className = "res " + (right ? "ok" : "bad");
      res.textContent = (right ? "Correct. " : "Not quite. ") + q.why;
    }));
    mini.appendChild(d);
  });
})();
