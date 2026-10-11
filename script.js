// Role content taken from Glenn's four tailored résumés
const ROLES = {
  collections: {
    title: "Collections Specialist",
    summary: "Nearly 2 years of remote experience recovering delinquent balances on Canadian and U.S.-regulated accounts through outbound and inbound calls. Skilled in negotiating payment plans and settlements, with Fair Debt Collection Practices Act (FDCPA) compliant documentation. Consistently met daily and monthly recovery targets.",
    skills: ["Collections", "Payment plans and settlements", "FDCPA compliance", "Skip tracing", "Accounts receivable", "De-escalation", "FACS", "SedonaOffice", "CRM"],
    file: "resumes/Naelgas_Glenn_Mark_Collections_Specialist.pdf",
    label: "Download Collections résumé (PDF)"
  },
  ar: {
    title: "Accounts Receivable Specialist",
    summary: "Accounts receivable and collections professional with nearly 2 years of remote experience managing delinquent balances and payment follow-up for Canadian and U.S.-regulated accounts. Experienced in AR inbox management, payment plans, and keeping accurate CRM and billing records in SedonaOffice and FACS.",
    skills: ["AR management", "Collections", "Payment plans and settlements", "Skip tracing", "FDCPA compliance", "Billing inquiry resolution", "Shared inbox management", "SedonaOffice", "FACS"],
    file: "resumes/Naelgas_Glenn_Mark_Accounts_Receivable_Specialist.pdf",
    label: "Download AR résumé (PDF)"
  },
  billing: {
    title: "Billing Support Specialist",
    summary: "Nearly 2 years of remote experience resolving billing inquiries, keeping accurate account records, and supporting accounts receivable for Canadian and U.S.-regulated accounts. Hands-on with SedonaOffice and FACS, and detail-oriented in documentation and customer communication.",
    skills: ["Billing support", "Billing inquiry resolution", "Accounts receivable", "SedonaOffice", "FACS", "CRM", "Shared inbox management", "Payment plans", "Excel and Outlook"],
    file: "resumes/Naelgas_Glenn_Mark_Billing_Support.pdf",
    label: "Download Billing Support résumé (PDF)"
  },
  cs: {
    title: "Customer Service & Email Support",
    summary: "Customer service professional with nearly 2 years of remote experience in high-volume customer communication, including 80+ billing emails a day. Skilled in de-escalation, clear written English, and shared inbox management, with the empathy and composure under pressure that come from a nursing background.",
    skills: ["Email support", "Customer service", "Written and verbal English", "Shared inbox management", "De-escalation", "Conflict resolution", "Escalating complex cases", "Inbound and outbound calls", "CRM"],
    file: "resumes/Naelgas_Glenn_Mark_Customer_Service_Email_Support.pdf",
    label: "Download Customer Service résumé (PDF)"
  }
};

const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panel = document.getElementById("role-panel");
const titleEl = document.getElementById("role-title");
const summaryEl = document.getElementById("role-summary");
const skillsEl = document.getElementById("role-skills");
const downloadEl = document.getElementById("role-download");

function render(key, animate) {
  const r = ROLES[key];
  titleEl.textContent = r.title;
  summaryEl.textContent = r.summary;
  downloadEl.href = r.file;
  downloadEl.textContent = r.label;
  skillsEl.innerHTML = "";
  r.skills.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    skillsEl.appendChild(li);
  });
  if (animate) {
    panel.classList.remove("swap");
    void panel.offsetWidth;
    panel.classList.add("swap");
  }
}

function select(tab, focus) {
  tabs.forEach(t => {
    const on = t === tab;
    t.setAttribute("aria-selected", on);
    t.tabIndex = on ? 0 : -1;
  });
  panel.setAttribute("aria-labelledby", tab.id);
  render(tab.dataset.role, true);
  if (focus) tab.focus();
  try { history.replaceState(null, "", "#" + tab.dataset.role); } catch (e) {}
}

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => select(tab, false));
  tab.addEventListener("keydown", e => {
    let next = null;
    if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
    if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
    if (e.key === "Home") next = tabs[0];
    if (e.key === "End") next = tabs[tabs.length - 1];
    if (next) { e.preventDefault(); select(next, true); }
  });
});

// Allow direct links like .../#ar to open a specific role
const fromHash = tabs.find(t => "#" + t.dataset.role === location.hash);
if (fromHash) {
  select(fromHash, false);
  document.getElementById("roles").scrollIntoView();
} else {
  render("collections", false);
}

document.getElementById("year").textContent = new Date().getFullYear();
