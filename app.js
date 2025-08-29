let stage = 1;
let diaryEntries = JSON.parse(localStorage.getItem("diaryEntries")) || [];

function showPage(page) {
  document.getElementById("gardenPage").style.display = (page === 'garden') ? 'block' : 'none';
  document.getElementById("diaryPage").style.display = (page === 'diary') ? 'block' : 'none';
  if (page === 'diary') renderDiary();
}

function waterPlant() {
  const input = document.getElementById("diaryInput").value.trim();
  if (!input) return alert("請先寫下感恩日記！");

  const today = new Date().toISOString().split("T")[0];
  diaryEntries.push({ date: today, content: input });
  localStorage.setItem("diaryEntries", JSON.stringify(diaryEntries));
  document.getElementById("diaryInput").value = "";

  // **循环逻辑 / 重生**
  if (stage < 5) {
    stage++;
  } else {
    stage = 1;
  }

  document.getElementById("plantImage").src = `plant_stage_${stage}.png`;
  console.log("現在的 stage:", stage);
}

function clearDiary() {
  if (confirm("確定要清除所有日記嗎？")) {
    diaryEntries = [];
    localStorage.removeItem("diaryEntries");
    renderDiary();
  }
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

document.addEventListener("DOMContentLoaded", () => {
  showPage('garden');  // 初始显示花園
});
