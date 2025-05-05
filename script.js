// In-memory catalog
const catalog = {
  doorStyles: {
    alki:            { name: 'Alki Door Style',        image: 'images/alki.jpg' },
    berkely:         { name: 'Berkely Door Style',     image: 'images/berkely.jpg' },
    whitmen:         { name: 'Whitmen Door Style',     image: 'images/whitmen.jpg' },
    mercer:          { name: 'Mercer Door Style',      image: 'images/mercer.jpg' },
    kingston:        { name: 'Kingston Door Style',    image: 'images/kingston.jpg' },
  },
  baseboard: {
    mdf423:          { name: 'MDF423 Baseboard',       image: 'images/mdf423.jpg' },
    mdf1024:         { name: 'MDF1024 Baseboard',      image: 'images/mdf1024.jpg' },
  },
  doorHardware: {
    satinHinge:      { name: 'Satin Hinge',            image: 'images/satin_hinge.jpg' },
    blackHinge:      { name: 'Black Hinge',            image: 'images/black_hinge.jpg' },
    crossflowLeverBlack: {
      name: 'Cross-Flow Lever Black',
      image: 'images/crossflow_lever_black.jpg'
    },
  },
  entryHandle: {
    londonEntrySet:  { name: 'London Entry Set',       image: 'images/london_entryset.jpg' },
    montereyEntrySet:{ name: 'Monterey Entry Set',     image: 'images/monterey_entryset.jpg' },
  }
};

const form         = document.getElementById("product-form");
const tableBody    = document.querySelector("#estimate-table tbody");
const generateBtn  = document.getElementById("generate-estimate");
const downloadBtn  = document.getElementById("download-pdf");
const clearBtn     = document.getElementById("clear-estimate");

// Dropdown triggers & contents
const doorBtn      = document.getElementById("doorDropdownBtn");
const doorContent  = document.getElementById("doorDropdownContent");
const baseBtn      = document.getElementById("baseboardDropdownBtn");
const baseContent  = document.getElementById("baseboardDropdownContent");
const hwBtn        = document.getElementById("hardwareDropdownBtn");
const hwContent    = document.getElementById("hardwareDropdownContent");
const entryBtn     = document.getElementById("entryDropdownBtn");
const entryContent = document.getElementById("entryDropdownContent");

let items = [];

// Toggle dropdowns
[ [doorBtn, doorContent],
  [baseBtn, baseContent],
  [hwBtn, hwContent],
  [entryBtn, entryContent]
].forEach(([btn, content]) => {
  btn.addEventListener("click", () => content.classList.toggle("show"));
});

// Close dropdowns when clicking outside
window.addEventListener("click", e => {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown-content")
      .forEach(dc => dc.classList.remove("show"));
  }
});

// Load saved items
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("estimateItems");
  if (saved) {
    items = JSON.parse(saved);
    items.forEach(addRowToTable);
  }
});

// Handle form submit
form.addEventListener("submit", e => {
  e.preventDefault();

  // Gather checked values
  const getChecked = content =>
    Array.from(content.querySelectorAll("input:checked"))
         .map(cb => cb.value);

  const doors    = getChecked(doorContent);
  const bases    = getChecked(baseContent);
  const hardware = getChecked(hwContent);
  const entries  = getChecked(entryContent);

  let picks = [];
  doors.forEach(key => picks.push(catalog.doorStyles[key]));
  bases.forEach(key => picks.push(catalog.baseboard[key]));
  hardware.forEach(key => picks.push(catalog.doorHardware[key]));
  entries.forEach(key => picks.push(catalog.entryHandle[key]));

  if (picks.length === 0) {
    return alert("Please select at least one item.");
  }

  picks.forEach(item => {
    items.push(item);
    addRowToTable(item);
  });

  localStorage.setItem("estimateItems", JSON.stringify(items));
  form.reset();  // uncheck all
});

// Add one row
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

// Print view
generateBtn.addEventListener("click", () => window.print());

// Clear all
clearBtn.addEventListener("click", () => {
  if (confirm("Clear all selections?")) {
    items = [];
    tableBody.innerHTML = "";
    localStorage.removeItem("estimateItems");
  }
});

// Download PDF (hides delete buttons during render)
downloadBtn.addEventListener("click", () => {
  const deleteBtns = document.querySelectorAll(".delete-btn");
  deleteBtns.forEach(btn => btn.style.display = "none");

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.html(document.getElementById("estimate-content"), {
    x: 10, y: 10,
    html2canvas: { scale: 0.5 },
    callback: pdf => {
      pdf.save("estimate.pdf");
      deleteBtns.forEach(btn => btn.style.display = "");
    }
  });
});
