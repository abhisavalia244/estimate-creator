const form = document.getElementById("product-form");
const tableBody = document.querySelector("#estimate-table tbody");
const grandTotalEl = document.getElementById("grand-total");

let grandTotal = 0;
let items = [];

// Load saved data
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("estimateItems");
  if (saved) {
    items = JSON.parse(saved);
    items.forEach(item => addRowToTable(item, false));
    updateGrandTotal();
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const sku = document.getElementById("sku").value;
  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  const quantity = parseInt(document.getElementById("quantity").value);
  const imageFile = document.getElementById("image").files[0];

  const reader = new FileReader();
  reader.onload = function () {
    const item = {
      sku,
      name,
      price,
      quantity,
      image: reader.result
    };
    items.push(item);
    localStorage.setItem("estimateItems", JSON.stringify(items));
    addRowToTable(item, true);
    updateGrandTotal();
    form.reset();
  };

  if (imageFile) {
    reader.readAsDataURL(imageFile);
  }
});

function addRowToTable(item, shouldAddToItemsArray) {
  const total = item.price * item.quantity;
  const row = document.createElement("tr");

  row.innerHTML = `
    <td><img src="${item.image}" alt="Product Image" /></td>
    <td>${item.sku}</td>
    <td>${item.name}</td>
    <td>$${item.price.toFixed(2)}</td>
    <td>${item.quantity}</td>
    <td>$${total.toFixed(2)}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;

  tableBody.appendChild(row);

  const deleteBtn = row.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", function () {
    row.remove();
    grandTotal -= total;
    grandTotalEl.textContent = `Grand Total: $${grandTotal.toFixed(2)}`;
    // Remove from items array
    items = items.filter(i => !(i.sku === item.sku && i.name === item.name && i.image === item.image));
    localStorage.setItem("estimateItems", JSON.stringify(items));
  });

  if (shouldAddToItemsArray) grandTotal += total;
}

function updateGrandTotal() {
  grandTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  grandTotalEl.textContent = `Grand Total: $${grandTotal.toFixed(2)}`;
}

document.getElementById("generate-estimate").addEventListener("click", function () {
  window.print();
});

document.getElementById("clear-estimate").addEventListener("click", function () {
    if (confirm("Are you sure you want to clear the entire estimate?")) {
      items = [];
      grandTotal = 0;
      tableBody.innerHTML = "";
      grandTotalEl.textContent = `Grand Total: $0.00`;
      localStorage.removeItem("estimateItems");
    }
  });
  
