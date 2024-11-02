let listUL = document.getElementById("list");

async function getData() {
  try {
    const response = await fetch("https://stock-exchange-data.vercel.app/api/v1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Check if the URL is correct");
    }

    const data = await response.json();

    // Get some stocks

    const stocks = [];

    for (let i = 0; i < 51; i++) {
      stocks.push(data.stocks[i]);
    }

    stocks.forEach((item) => {
      const listItem = document.createElement("li");

      const logo = document.createElement("img");
      logo.src = item.logo;
      logo.alt = `${item.name} logo`;
      logo.style.width = "50px";
      logo.style.height = "50px";
      logo.style.borderRadius = "10px";
      listItem.appendChild(logo);

      const name = document.createElement("span");
      name.textContent = item.name;
      listItem.appendChild(name);

      const stock = document.createElement("span");
      stock.textContent = `Stock Code: ${item.stock}`;
      listItem.appendChild(stock);

      const close = document.createElement("span");
      close.textContent = `Closing: R$${item.close.toFixed(2)}`;
      listItem.appendChild(close);

      const change = document.createElement("span");
      const percent = document.createElement("span");
      percent.textContent = `${item.change.toFixed(2)}%`;

      if (item.change > 0) {
        percent.style.color = "#4bb94b"; // Green color for positive change
      } else {
        percent.style.color = "#d64545"; // Red color for negative change
      }

      change.textContent = "Variation: ";
      change.appendChild(percent);
      listItem.appendChild(change);

      const volume = document.createElement("span");
      volume.textContent = `Volume: ${item.volume}`;

      listItem.appendChild(volume);
      listUL.appendChild(listItem);
    });
  } catch (e) {
    console.log(e.message);
  }
}

await getData();
