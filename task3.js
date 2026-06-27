let allRows = [];
let currentTitleIndex = 3; // 前3筆是 Promotion
const pageSize = 10;

async function loadData() {
  const urlA = "https://cwpeng.github.io/test/assignment-3-1";
  const urlB = "https://cwpeng.github.io/test/assignment-3-2";

  try {
    // 同時取得兩個API
    const [responseA, responseB] = await Promise.all([
      fetch(urlA),
      fetch(urlB),
    ]);

    const dataA = await responseA.json();
    const dataB = await responseB.json();

    // 建立serial->row對照表
    const rowDict = {};

    for (const row of dataB.rows) {
      // 使用 match 找出所有符合格式的圖片，它會自動回傳一個陣列 (List)
      let pic_list = row.pics.match(/\/resources\/.*?.jpg/g);
      row.pics = pic_list ? pic_list.map((pic) => dataB.host + pic) : [];
      rowDict[row.serial] = row;
    }

    // 合併
    for (const row of dataA.rows) {
      if (row.serial in rowDict) {
        Object.assign(row, rowDict[row.serial]);
      }
    }

    render(dataA.rows);
  } catch (err) {
    console.error(err);
  }
}

function render(rows) {
  allRows = rows;
  const container = document.getElementById("content");

  // 清空舊資料
  container.innerHTML = "";

  // Promotion
  for (let i = 0; i < Math.min(3, rows.length); i++) {
    container.appendChild(createPromotion(rows[i], i));
  }

  // 第一頁 Title Card
  loadMoreTitleCards();
}

function createPromotion(data, index) {
  const col = document.createElement("div");

  if (index === 0) {
    col.className = "col-12 col-md-6 col-sm-12 promotion";
  } else if (index === 1) {
    col.className = "col-8 col-md-6 col-sm-12 promotion";
  } else {
    col.className = "col-4 col-md-12 col-sm-12 promotion";
  }

  const img = document.createElement("img");
  img.src = data.pics[0];
  img.alt = data.sname;

  const title = document.createElement("div");
  title.className = "promotion-title";
  title.textContent = data.sname;

  col.appendChild(img);
  col.appendChild(title);

  return col;
}

function createTitleCard(data, index) {
  const classList = [
    "col-4 col-md-3 col-sm-12 title-card",
    "col-2 col-md-3 col-sm-12 title-card",
    "col-2 col-md-3 col-sm-12 title-card",
    "col-2 col-md-3 col-sm-12 title-card",
    "col-2 col-md-3 col-sm-12 title-card",
    "col-4 col-md-3 col-sm-12 title-card",
    "col-2 col-md-3 col-sm-12 title-card",
    "col-2 col-md-3 col-sm-12 title-card",
    "col-2 col-md-6 col-sm-12 title-card",
    "col-2 col-md-6 col-sm-12 title-card",
  ];

  const card = document.createElement("div");
  card.className = classList[index] || classList[1];

  const img = document.createElement("img");
  img.className = "title-card-image";
  img.src = data.pics[0];
  img.alt = data.sname;

  const star = document.createElement("div");
  star.className = "icon-star";

  const title = document.createElement("div");
  title.className = "title-text";
  title.textContent = data.sname;

  card.appendChild(img);
  card.appendChild(star);
  card.appendChild(title);

  return card;
}

function loadMoreTitleCards() {
  const container = document.getElementById("content");
  const end = Math.min(currentTitleIndex + pageSize, allRows.length);

  for (let i = currentTitleIndex; i < end; i++) {
    container.appendChild(createTitleCard(allRows[i], (i - 3) % 10));
  }

  currentTitleIndex = end;
}

loadData();
