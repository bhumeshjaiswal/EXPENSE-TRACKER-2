const API = "http://localhost:5000";

async function addExpense() {
  const expense = {
    title: title.value,
    amount: amount.value,
    category: category.value,
    date: date.value
  };

  await fetch(API + "/add-expense", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense)
  });

  loadExpenses();
}

async function loadExpenses() {
  const res = await fetch(API + "/expenses");
  const data = await res.json();

  let rows = "";
  let total = 0;

  data.forEach(e => {
    rows += `
      <tr>
        <td>${e.title}</td>
        <td>${e.amount}</td>
        <td>${e.category}</td>
        <td>${e.date}</td>
        <td>
          <button onclick="deleteExpense('${e._id}')" 
            style="background:red;color:white;border:none;padding:5px;border-radius:4px;cursor:pointer;">
            Delete
          </button>
        </td>
      </tr>
    `;
    total += Number(e.amount);
  });

  list.innerHTML = rows;
  document.getElementById("total").innerText = total;
}

async function deleteExpense(id) {
  await fetch(API + "/delete-expense/" + id, {
    method: "DELETE"
  });
  loadExpenses();
}

const title = document.getElementById("title");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const date = document.getElementById("date");
const list = document.getElementById("list");

loadExpenses();
