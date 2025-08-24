// 植物成長階段圖片
const plantImages = [
    "plant_stage_1.png",
    "plant_stage_2.png",
    "plant_stage_3.png",
    "plant_stage_4.png",
    "plant_stage_5.png"
];

let currentStage = parseInt(localStorage.getItem("plantStage")) || 0;
let diaries = JSON.parse(localStorage.getItem("gratitudeDiaries")) || [];

// DOM 元素
const plantImage = document.getElementById("plant-image");
const diaryBtn = document.getElementById("diary-btn");
const diarySection = document.getElementById("diary-section");
const saveDiaryBtn = document.getElementById("save-diary");
const gratitudeText = document.getElementById("gratitude-text");
const status = document.getElementById("status");

// 初始化植物
function updatePlant() {
    plantImage.src = plantImages[currentStage];
    status.textContent = `你已經澆水 ${diaries.length} 次 🌿`;
}
updatePlant();

// 顯示寫日記區塊
diaryBtn.addEventListener("click", () => {
    diarySection.classList.toggle("hidden");
});

// 儲存日記並成長
saveDiaryBtn.addEventListener("click", () => {
    const text = gratitudeText.value.trim();
    if (!text) {
        alert("請先寫下今天的感恩日記 🌸");
        return;
    }

    // 儲存日記
    diaries.push({ text, date: new Date().toLocaleDateString() });
    localStorage.setItem("gratitudeDiaries", JSON.stringify(diaries));

    // 植物成長（最多 5 階段）
    if (currentStage < plantImages.length - 1) {
        currentStage++;
        localStorage.setItem("plantStage", currentStage);
    }

    gratitudeText.value = "";
    diarySection.classList.add("hidden");
    updatePlant();
});
