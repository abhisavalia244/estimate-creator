// In-memory catalog
const catalog = {
  doorStyles: {
    alki:            { name: 'Alki Door Style',           image: 'images/alki.jpg' },
    berkely:         { name: 'Berkely Door Style',        image: 'images/berkely.jpg' },
    whitmen:         { name: 'Whitmen Door Style',        image: 'images/whitmen.jpg' },
    mercer:          { name: 'Mercer Door Style',         image: 'images/mercer.jpg' },
    kingston:        { name: 'Kingston Door Style',       image: 'images/kingston.jpg' },
  },
  baseboard: {
    mdf423:          { name: 'MDF423 Baseboard',          image: 'images/mdf423.jpg' },
    mdf1024:         { name: 'MDF1024 Baseboard',         image: 'images/mdf1024.jpg' },
  },
  doorHardware: {
    satinHinge:      { name: 'Satin Hinge',               image: 'images/satin_hinge.jpg' },
    blackHinge:      { name: 'Black Hinge',               image: 'images/black_hinge.jpg' },
    crossflowLeverBlack: { name: 'Cross-Flow Lever Black', image: 'images/crossflow_lever_black.jpg' },
  },
  entryHandle: {
    londonEntrySet:  { name: 'London Entry Set',          image: 'images/london_entryset.jpg' },
    montereyEntrySet:{ name: 'Monterey Entry Set',        image: 'images/monterey_entryset.jpg' },
  }
};

const form            = document.getElementById("product-form");
const tableBody       = document.querySelector("#estimate-table tbody");
const generateBtn     = document.getElementById("generate-estimate");
const downloadBtn     = document.getElementById("download-pdf");
const clearBtn        = document.getElementById("clear-estimate");
const doorBtn         = document.getElementById("doorDropdownBtn");
const doorContent     = document.getElementById("doorDropdownContent");

let items = [];

// Toggle dropdown
doorBtn.addEventListener("click", () =>
  doorContent.classList.toggle("show")
);
// Close if clicked outside
window.addEventListener("click", e => {
  if (!doorBtn.contains(e.target) && !doorContent.contains(e.target)) {
    doorContent.classList.remove("show");
  }
});

// Load saved
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("estimateItems");
  if (saved) {
    items = JSON.parse(saved);
    items.forEach(addRowToTable);
  }
});

form.addEventListener("submit", e => {
  e.preventDefault();

  // Gather checked door styles
  const selectedDoors = Array.from(
    doorContent.querySelectorAll("input[type=checkbox]:checked")
  ).map(cb => cb.value);

  // Gather single-selects
  const bb = document.getElementById("baseboard").value;
  const dh = document.getElementById("doorHardware").value;
  const eh = document.getElementById("entryHandle").value;

  // Build pick list
  let picks = [];
  selectedDoors.forEach(d => picks.push(catalog.doorStyles[d]));
  if (bb) picks.push(catalog.baseboard[bb]);
  if (dh) picks.push(catalog.doorHardware[dh]);
  if (eh) picks.push(catalog.entryHandle[eh]);

  if (picks.length === 0) {
    return alert("Please select at least one item.");
  }

  // Add each
  picks.forEach(item => {
    items.push(item);
    addRowToTable(item);
  });

  localStorage.setItem("estimateItems", JSON.stringify(items));
  form.reset();
  // clear checkboxes
  doorContent.querySelectorAll("input[type=checkbox]").forEach(cb => cb.checked = false);
});

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

// Print, Clear, Download
generateBtn.addEventListener("click", () => window.print());
clearBtn.addEventListener("click", () => {
  if (confirm("Clear all selections?")) {
    items = [];
    tableBody.innerHTML = "";
    localStorage.removeItem("estimateItems");
  }
});
downloadBtn.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.html(document.getElementById("estimate-content"), {
    x: 10, y: 10, html2canvas: { scale: 0.5 },
    callback: pdf => pdf.save("estimate.pdf")
  });
});