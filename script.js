const form = document.getElementById("product-form");
const tableBody = document.querySelector("#estimate-table tbody");

let items = [];

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("estimateItems");
  if (saved) {
    items = JSON.parse(saved);
    items.forEach(item => addRowToTable(item));
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const sku = document.getElementById("sku").value;
  const name = document.getElementById("name").value;
  const imageFile = document.getElementById("image").files[0];

  const reader = new FileReader();
  reader.onload = function () {
    const item = { sku, name, image: reader.result };
    items.push(item);
    localStorage.setItem("estimateItems", JSON.stringify(items));
    addRowToTable(item);
    form.reset();
  };

  if (imageFile) {
    reader.readAsDataURL(imageFile);
  }
});

function addRowToTable(item) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td><img src="${item.image}" alt="Product Image" /></td>
    <td>${item.sku}</td>
    <td>${item.name}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;

  tableBody.appendChild(row);

  row.querySelector(".delete-btn").addEventListener("click", function () {
    row.remove();
    items = items.filter(i => !(i.sku === item.sku && i.name === item.name && i.image === item.image));
    localStorage.setItem("estimateItems", JSON.stringify(items));
  });
}

document.getElementById("generate-estimate").addEventListener("click", function () {
  window.print();
});

document.getElementById("clear-estimate").addEventListener("click", function () {
  if (confirm("Clear all items?")) {
    items = [];
    tableBody.innerHTML = "";
    localStorage.removeItem("estimateItems");
  }
});

document.getElementById("download-pdf").addEventListener("click", async function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 20;

  doc.setFontSize(18);
  doc.text("Estimate", 14, y);
  y += 10;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    doc.setFontSize(12);
    doc.text(`${i + 1}. SKU: ${item.sku}`, 14, y);
    y += 7;
    doc.text(`Description: ${item.name}`, 14, y);
    y += 10;

    if (y + 40 < 280) {
      const img = new Image();
      img.src = item.image;
      await new Promise(resolve => {
        img.onload = () => {
          doc.addImage(img, 'JPEG', 14, y, 60, 40);
          resolve();
        };
      });
      y += 50;
    } else {
      doc.addPage();
      y = 20;
    }
  }

  doc.save("estimate.pdf");
});
