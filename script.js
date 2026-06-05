// =============================================
// LESSONFORGE - script.js
// Powered by OpenRouter (Free AI API)
// Get your free key at: https://openrouter.ai
// =============================================

const API_KEY = "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"; // Replace with your sk-or-... key

const API_URL = "https://openrouter.ai/api/v1/chat/completions";

const SECTIONS = ["LESSON PLAN", "STORY EXPLANATION", "QUIZ QUESTIONS", "CLASS ACTIVITY"];

const SECTION_IDS = {
  "LESSON PLAN": "lesson-plan",
  "STORY EXPLANATION": "story-explanation",
  "QUIZ QUESTIONS": "quiz-questions",
  "CLASS ACTIVITY": "class-activity",
};

// =============================================
// Show loading state in all cards
// =============================================
function showLoading() {
  SECTIONS.forEach((section) => {
    const card = document.getElementById(SECTION_IDS[section]);
    if (card) {
      card.innerHTML = `
        <h3>${section}</h3>
        <p style="color: #888; font-style: italic;">⏳ Generating your lesson pack...</p>
      `;
    }
  });
  const btns = document.getElementById("action-buttons");
  if (btns) btns.remove();
}

// =============================================
// Show error in all cards
// =============================================
function showError(message) {
  SECTIONS.forEach((section) => {
    const card = document.getElementById(SECTION_IDS[section]);
    if (card) {
      card.innerHTML = `
        <h3>${section}</h3>
        <p style="color: #dc3545;">❌ ${message}</p>
      `;
    }
  });
}

// =============================================
// Call OpenRouter API (Free)
// =============================================
async function callOpenRouterAPI(topic, gradeLevel) {
  const prompt = `Create a complete lesson pack for teaching "${topic}" to ${gradeLevel} students in Nigeria.

Format your response using EXACTLY these four headings in this order:

LESSON PLAN
(Write the lesson plan here with learning objectives, duration, and materials needed)

STORY EXPLANATION
(Write a simple, fun, relatable story that explains the topic to students)

QUIZ QUESTIONS
(Write 5 multiple choice questions with answers)

CLASS ACTIVITY
(Describe one hands-on classroom activity)`;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
      "HTTP-Referer": "https://lessonforge.app",
      "X-Title": "LessonForge"
    },
    body: JSON.stringify({
      model: "openrouter/auto",
      messages: [
        {
          role: "system",
          content: "You are an expert teacher and curriculum designer who creates engaging, accurate lesson packs for Nigerian schools."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error?.message || `Request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// =============================================
// Parse response into sections
// =============================================
function parseResponse(text) {
  const result = {};

  SECTIONS.forEach((section, index) => {
    const nextSection = SECTIONS[index + 1];
    let pattern;

    if (nextSection) {
      pattern = new RegExp(`${section}\\s*([\\s\\S]*?)(?=${nextSection})`, "i");
    } else {
      pattern = new RegExp(`${section}\\s*([\\s\\S]*)$`, "i");
    }

    const match = text.match(pattern);
    result[section] = match ? match[1].trim() : "Content not available.";
  });

  return result;
}

// =============================================
// Display results in cards
// =============================================
function displayResults(text) {
  const parsed = parseResponse(text);
  let fullText = "";

  SECTIONS.forEach((section) => {
    const card = document.getElementById(SECTION_IDS[section]);
    const content = parsed[section];

    if (card) {
      card.innerHTML = `
        <h3>${section}</h3>
        <div style="line-height: 1.8; white-space: pre-wrap;">${content}</div>
      `;
    }

    fullText += `${section}\n${"=".repeat(40)}\n${content}\n\n`;
  });

  showActionButtons(fullText);
}

// =============================================
// Add Copy + Download buttons
// =============================================
function showActionButtons(fullText) {
  const existing = document.getElementById("action-buttons");
  if (existing) existing.remove();

  const outputSection = document.querySelector(".output-section");
  if (!outputSection) return;

  const container = document.createElement("div");
  container.id = "action-buttons";
  container.style.cssText = `
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 24px;
    padding-bottom: 16px;
  `;

  container.innerHTML = `
    <button id="copy-btn" style="
      background: linear-gradient(135deg, #4a7c59, #2d5a3d);
      color: white;
      border: none;
      padding: 12px 28px;
      border-radius: 25px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    ">📋 Copy All</button>

    <button id="download-btn" style="
      background: linear-gradient(135deg, #5a7a9f, #3f5670);
      color: white;
      border: none;
      padding: 12px 28px;
      border-radius: 25px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    ">⬇️ Download .txt</button>
  `;

  outputSection.appendChild(container);

  document.getElementById("copy-btn").addEventListener("click", () => {
    navigator.clipboard.writeText(fullText).then(() => {
      const btn = document.getElementById("copy-btn");
      btn.textContent = "✅ Copied!";
      setTimeout(() => { btn.textContent = "📋 Copy All"; }, 2000);
    }).catch(() => alert("Could not copy. Please try manually."));
  });

  document.getElementById("download-btn").addEventListener("click", () => {
    const a = document.createElement("a");
    a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(fullText);
    a.download = "lessonforge-pack.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}

// =============================================
// Handle Generate button click
// =============================================
async function handleGenerate(event) {
  event.preventDefault();

  const topic = document.getElementById("topic-input")?.value.trim();
  const gradeLevel = document.getElementById("grade-select")?.value;

  if (!topic) {
    alert("Please enter a topic.");
    return;
  }
  if (!gradeLevel) {
    alert("Please select a grade level.");
    return;
  }

  showLoading();

  try {
    const responseText = await callOpenRouterAPI(topic, gradeLevel);
    displayResults(responseText);
  } catch (error) {
    console.error("LessonForge Error:", error);
    showError(error.message || "Something went wrong. Please try again.");
  }
}

// =============================================
// Initialize on page load
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("lesson-form");
  if (form) {
    form.addEventListener("submit", handleGenerate);
  }
});
