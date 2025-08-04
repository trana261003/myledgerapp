let entries = [];

function addEntry() {
  const entriesDiv = document.getElementById("entries");

  const row = document.createElement("div");
  row.className = "entry-row";

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.required = true;

  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.step = '0.01';
  amountInput.placeholder = "Amount";
  amountInput.required = true;

  amountInput.addEventListener("input", updateTotal);

  row.appendChild(dateInput);
  row.appendChild(amountInput);
  entriesDiv.appendChild(row);
}

function updateTotal() {
  const amountInputs = document.querySelectorAll("#entries input[type='number']");
  let total = 0;
  amountInputs.forEach(input => {
    const val = parseFloat(input.value);
    if (!isNaN(val)) total += val;
  });
  document.getElementById("totalAmount").textContent = total.toFixed(2);
}

document.getElementById("ledgerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const personName = document.getElementById("personName").value;
  const bankName = document.getElementById("bankName").value;
  const ledgerName = document.getElementById("ledgerName").value;
  const type = document.getElementById("type").value;
  const year = document.getElementById("year").value;

  const entryRows = document.querySelectorAll(".entry-row");
  const entryData = [];

  entryRows.forEach(row => {
    const [dateInput, amountInput] = row.querySelectorAll("input");
    entryData.push({
      date: dateInput.value,
      amount: parseFloat(amountInput.value)
    });
  });

  const total = entryData.reduce((sum, entry) => sum + entry.amount, 0);

  const data = {
    personName,
    bankName,
    ledgerName,
    type,
    year,
    entries: entryData,
    total
  };

  try {
    console.log("Data being sent:", data);
    const res = await fetch("https://myledgerappbackend.onrender.com/api/ledger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert("Ledger saved successfully!");
    window.location.reload();
  } catch (err) {
    alert("Error saving ledger");
    console.error(err);
  }
});
