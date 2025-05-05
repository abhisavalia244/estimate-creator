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

// Close all dropdowns if click outside
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
  form.reset();
});

// Create a row for each item
function addRowToTable(item) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><img src="${item.image}" alt="${item.name}" /></td>
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

// Print preview
generateBtn.addEventListener("click", () => window.print());

// Clear all selections
clearBtn.addEventListener("click", () => {
  if (confirm("Clear all selections?")) {
    items = [];
    tableBody.innerHTML = "";
    localStorage.removeItem("estimateItems");
  }
});

// DOWNLOAD MULTI-PAGE PDF
downloadBtn.addEventListener("click", async () => {
  // Hide delete buttons & action column
  const deleteBtns = document.querySelectorAll(".delete-btn");
  const actionThs  = document.querySelectorAll('#estimate-table th:nth-child(3)');
  const actionTds  = document.querySelectorAll('#estimate-table td:nth-child(3)');

  deleteBtns.forEach(b => b.style.display = 'none');
  actionThs.forEach(el => el.style.display = 'none');
  actionTds.forEach(el => el.style.display = 'none');

  // Capture the estimate-content as a canvas
  const element = document.getElementById("estimate-content");
  const canvas  = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  // Setup PDF
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth  = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgProps  = pdf.getImageProperties(imgData);
  const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

  let heightLeft = imgHeight;
  let position = 0;

  // Add first page
  pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
  heightLeft -= pdfHeight;

  // Add remaining pages
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;
  }

  pdf.save("estimate.pdf");

  // Restore buttons & column
  deleteBtns.forEach(b => b.style.display = '');
  actionThs.forEach(el => el.style.display = '');
  actionTds.forEach(el => el.style.display = '');
});
