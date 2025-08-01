document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("ledgerContainer");

  try {
    const res = await fetch("http://localhost:5000/api/ledgers");
    const ledgers = await res.json();

    if (ledgers.length === 0) {
      container.innerHTML = "<p>No ledgers found.</p>";
      return;
    }

    ledgers.forEach((ledger) => {
      const card = document.createElement("div");
      card.className = "ledger-card";

      card.innerHTML = `
        <h2>${ledger.bankName} - ${ledger.ledgerName}</h2>
        <p><strong>Type:</strong> ${ledger.type}</p>
        <p><strong>Year:</strong> ${ledger.year}</p>
        <table class="entries-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${ledger.entries.map(entry => `
              <tr>
                <td>${entry.date}</td>
                <td>${entry.description}</td>
                <td>${entry.amount}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = "<p>Error loading data.</p>";
    console.error("Error:", err);
  }
});
