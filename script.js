/*************************************************************************
 *  101 Doors & Windows – Estimate Generator (with nested dropdowns)
 *************************************************************************/

//
// ─────────────────  PRODUCT CATALOG  ─────────────────
//   Keys must match the checkbox `value` attributes.
//   Each image lives at images/<key>.jpg
//
const catalog = {
  /* ----- Door Styles ----- */
  doorStyles: {
    // Fineline
    alki:                { name: 'Alki (Fineline)',                image: 'images/alki.jpg' },
    denman:              { name: 'Denman (Fineline)',              image: 'images/denman.jpg' },
    laurelhurst:         { name: 'Laurelhurst (Fineline)',         image: 'images/laurelhurst.jpg' },
    montlake:            { name: 'Montlake (Fineline)',            image: 'images/montlake.jpg' },
    parkrose:            { name: 'Parkrose (Fineline)',            image: 'images/parkrose.jpg' },
    robson:              { name: 'Robson (Fineline)',              image: 'images/robson.jpg' },
    granville:           { name: 'Granville (Fineline)',           image: 'images/granville.jpg' },
    ravenna:             { name: 'Ravenna (Fineline)',             image: 'images/ravenna.jpg' },
    ballard:             { name: 'Ballard (Fineline)',             image: 'images/ballard.jpg' },
    fairview:            { name: 'Fairview (Fineline)',            image: 'images/fairview.jpg' },

    // Flat Panels
    mercer:              { name: 'Mercer (Flat Panel)',            image: 'images/mercer.jpg' },
    whitman:             { name: 'Whitman (Flat Panel)',           image: 'images/whitman.jpg' },
    aberdeen:            { name: 'Aberdeen (Flat Panel)',          image: 'images/aberdeen.jpg' },
    yarrow:              { name: 'Yarrow (Flat Panel)',            image: 'images/yarrow.jpg' },
    winthrop:            { name: 'Winthrop (Flat Panel)',          image: 'images/winthrop.jpg' },

    // Raised Panels
    kingston:            { name: 'Kingston (Raised Panel)',        image: 'images/kingston.jpg' },
    rosario:             { name: 'Rosario (Raised Panel)',         image: 'images/rosario.jpg' },
    lopez:               { name: 'Lopez (Raised Panel)',           image: 'images/lopez.jpg' },
    benton:              { name: 'Benton (Raised Panel)',          image: 'images/benton.jpg' },
    columbia:            { name: 'Columbia (Raised Panel)',        image: 'images/columbia.jpg' },
    bonville:            { name: 'Bonville (Raised Panel)',        image: 'images/bonville.jpg' },

    // Single extra
    flushHardboard:      { name: 'Flush Hardboard',                image: 'images/flushhardboard.jpg' }
  },

  /* ----- Baseboard and Casing ----- */
  baseboard: {
    mdf423:              { name: 'MDF423 Baseboard',               image: 'images/mdf423.jpg' },
    mdf1024:             { name: 'MDF1024 Baseboard',              image: 'images/mdf1024.jpg' },
  },

  /* ----- Door Hardware (hinges & levers colours) ----- */
  doorHardware: {
    // Hinges
    hingeBlack:          { name: 'Hinge – Black',                  image: 'images/hinge_black.jpg' },
    hingeSatinNickel:    { name: 'Hinge – Satin Nickel',           image: 'images/hinge_satinnickel.jpg' },
    hingeBrushedChrome:  { name: 'Hinge – Brushed Chrome',         image: 'images/hinge_brushedchrome.jpg' },
    hingeSatinBrass:     { name: 'Hinge – Satin Brass',            image: 'images/hinge_satinbrass.jpg' },

    // Levers
    leverBlack:          { name: 'Lever – Black',                  image: 'images/lever_black.jpg' },
    leverSatinNickel:    { name: 'Lever – Satin Nickel',           image: 'images/lever_satinnickel.jpg' },
    leverBrushedChrome:  { name: 'Lever – Brushed Chrome',         image: 'images/lever_brushedchrome.jpg' },
    leverSatinBrass:     { name: 'Lever – Satin Brass',            image: 'images/lever_satinbrass.jpg' },
  },

  /* ----- Entry Handles ----- */
  entryHandle: {
    londonEntrySet:      { name: 'London Entry Set',               image: 'images/london_entryset.jpg' },
    montereyEntrySet:    { name: 'Monterey Entry Set',             image: 'images/monterey_entryset.jpg' },
  }
};

/* ====== Grab elements ====== */
const form           = document.getElementById("product-form");
const tableBody      = document.querySelector("#estimate-table tbody");
const generateBtn    = document.getElementById("generate-estimate");
const downloadBtn    = document.getElementById("download-pdf");
const clearBtn       = document.getElementById("clear-estimate");

/* Dropdown triggers & content */
const doorBtn   = document.getElementById("doorDropdownBtn");
const doorCont  = document.getElementById("doorDropdownContent");
const baseBtn   = document.getElementById("baseboardDropdownBtn");
const baseCont  = document.getElementById("baseboardDropdownContent");
const hwBtn     = document.getElementById("hardwareDropdownBtn");
const hwCont    = document.getElementById("hardwareDropdownContent");
const entryBtn  = document.getElementById("entryDropdownBtn");
const entryCont = document.getElementById("entryDropdownContent");

/* ====== Dropdown toggles ====== */
[
  [doorBtn,  doorCont],
  [baseBtn,  baseCont],
  [hwBtn,    hwCont],
  [entryBtn, entryCont]
].forEach(([btn, cont]) => {
  btn.addEventListener("click", () => cont.classList.toggle("show"));
});
window.addEventListener("click", e => {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown-content").forEach(c => c.classList.remove("show"));
  }
});

/* ====== Storage & table ====== */
let items = [];
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("estimateItems");
  if (saved) {
    items = JSON.parse(saved);
    items.forEach(addRowToTable);
  }
});

/* ====== Handle form submit ====== */
form.addEventListener("submit", e => {
  e.preventDefault();

  const getChecked = (container) =>
    Array.from(container.querySelectorAll("input:checked")).map(cb => cb.value);

  const picks = [
    ...getChecked(doorCont).map(k => catalog.doorStyles[k]),
    ...getChecked(baseCont).map(k => catalog.baseboard[k]),
    ...getChecked(hwCont).map(k   => catalog.doorHardware[k]),
    ...getChecked(entryCont).map(k => catalog.entryHandle[k])
  ];

  if (picks.length === 0) return alert("Please select at least one item.");

  picks.forEach(item => { items.push(item); addRowToTable(item); });
  localStorage.setItem("estimateItems", JSON.stringify(items));
  form.reset();
});

/* ====== Add a row ====== */
function addRowToTable(item) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><img src="${item.image}" alt="${item.name}"></td>
    <td>${item.name}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;
  tableBody.appendChild(row);
  row.querySelector(".delete-btn").addEventListener("click", () => {
    row.remove();
    items = items.filter(i => i.name !== item.name);
    localStorage.setItem("estimateItems", JSON.stringify(items));
  });
}

/* ====== Print, Clear, Download ====== */
generateBtn.addEventListener("click", () => window.print());
clearBtn.addEventListener("click", () => {
  if (confirm("Clear all selections?")) {
    items = [];
    tableBody.innerHTML = "";
    localStorage.removeItem("estimateItems");
  }
});

downloadBtn.addEventListener("click", async () => {
  const hide = (sel) => document.querySelectorAll(sel).forEach(el => el.style.display = 'none');
  const show = (sel) => document.querySelectorAll(sel).forEach(el => el.style.display = '');

  hide(".delete-btn");
  hide("#estimate-table th:nth-child(3)");
  hide("#estimate-table td:nth-child(3)");

  const element = document.getElementById("estimate-content");
  const canvas  = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfW = pdf.internal.pageSize.getWidth();
  const pdfH = pdf.internal.pageSize.getHeight();
  const imgProps = pdf.getImageProperties(imgData);
  const imgH = (imgProps.height * pdfW) / imgProps.width;

  let hLeft = imgH, position = 0;
  pdf.addImage(imgData, "PNG", 0, position, pdfW, imgH);
  hLeft -= pdfH;
  while (hLeft > 0) {
    position = hLeft - imgH;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, pdfW, imgH);
    hLeft -= pdfH;
  }
  pdf.save("estimate.pdf");

  show(".delete-btn");
  show("#estimate-table th:nth-child(3)");
  show("#estimate-table td:nth-child(3)");
});
