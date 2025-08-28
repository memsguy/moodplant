let stage = 1; // 植物的成長階段
let diaryEntries = JSON.parse(localStorage.getItem("diaryEntries")) || [];

function showPage(page) {
  document.getElementById("gardenPage").style.display = (page === 'garden') ? 'block' : 'none';
  document.getElementById("diaryPage").style.display = (page === 'diary') ? 'block' : 'none';
  if (page === 'diary') renderDiary();
}

function waterPlant() {
  console.log("現在的 stage:", stage);
  const input = document.getElementById("diaryInput").value.trim();
  if (!input) return alert("請先寫下感恩日記！");

  // 存日記
  const today = new Date().toISOString().split("T")[0];
  diaryEntries.push({ date: today, content: input });
  localStorage.setItem("diaryEntries", JSON.stringify(diaryEntries));
  document.getElementById("diaryInput").value = "";

  // 植物成長 (循環)
  if (stage < 5) {
    stage++;
  } else {
    stage = 1; // 重生，回到種子
  }

  document.getElementById("plantImage").src = `plant_stage_${stage}.png`;
}

function renderDiary() {
  const list = document.getElementById("diaryList");
  list.innerHTML = "";
  diaryEntries.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.date}：${entry.content}`;
    list.appendChild(li);
  });
}
