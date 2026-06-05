# 📚 LessonForge
### AI-Powered Lesson Pack Generator for Teachers

> Built for the **Microsoft Agents League Hackathon 2026** — Creative Apps Track  
> Powered by **GitHub Copilot** + **Microsoft Foundry IQ**

---

## 🎯 The Problem

Teachers spend 2–5 hours every week creating lesson plans, explanations, quizzes, and activities — time that could be spent actually teaching. In under-resourced schools across Africa and beyond, this burden is even heavier, with teachers often lacking ready-made materials for local curricula.

**LessonForge fixes this in under 60 seconds.**

---

## ✨ What It Does

A teacher types in:
- A **topic** (e.g. "Photosynthesis")
- A **grade level** (e.g. "JSS2 / Grade 8")

LessonForge instantly generates a complete, ready-to-teach **lesson pack** containing:

| Output | Description |
|---|---|
| 📋 Lesson Plan | Objectives, duration, materials needed |
| 📖 Story Explanation | A relatable narrative that teaches the concept |
| ❓ Quiz (5 Questions) | Multiple choice with answers |
| 🎮 Class Activity | A hands-on activity idea |

Teachers can copy or download the full pack instantly.

---

## 🛠️ Tech Stack

| Tool | Role |
|---|---|
| **GitHub Copilot** | AI-assisted development (VS Code) |
| **Microsoft Foundry IQ** | Knowledge retrieval & grounded lesson generation |
| **HTML / CSS / JavaScript** | Frontend interface |
| **GitHub Pages** | Hosting |

---

## 🏗️ Architecture

```
[Teacher Input: Topic + Grade Level]
        ↓
[LessonForge Web App - HTML/CSS/JS]
        ↓
[Microsoft Foundry IQ]
  - Retrieves curriculum-relevant knowledge
  - Grounds output to reduce hallucination
  - Returns structured lesson data
        ↓
[Lesson Pack Output]
  - Lesson Plan
  - Story Explanation
  - Quiz Questions
  - Class Activity
        ↓
[Copy / Download]
```

> 📐 See `architecture-diagram.png` for full visual diagram

---

## 🚀 How to Run Locally

### Prerequisites
- A modern web browser
- A Microsoft Foundry IQ API key (free tier available)

### Steps

```bash
# 1. Clone this repository
git clone https://github.com/YOUR-USERNAME/lessonforge.git

# 2. Navigate into the project folder
cd lessonforge

# 3. Open in VS Code
code .

# 4. Add your Foundry IQ API key
# Create a file called config.js and add:
# const FOUNDRY_API_KEY = "your-key-here";

# 5. Open index.html in your browser
# Or use VS Code Live Server extension
```

---

## 🎥 Demo Video

👉 [Watch the Demo on YouTube](#) *(link to be added)*

---

## 🌍 Impact

LessonForge targets the **Hack for Good** and **Accessibility** categories because:

- 🏫 It directly helps **under-resourced teachers** who lack lesson planning tools
- 🌐 It works in the browser — **no installation required**
- 📱 Mobile-friendly for teachers without laptops
- 🇳🇬 Designed with **Nigerian and African curricula** in mind (JSS, SSS grade levels)
- ♿ Built with **accessibility-first** design (high contrast, screen reader friendly)

---

## 🏆 Hackathon Track

- **Competition**: Microsoft Agents League Hackathon @ AI Skills Fest 2026
- **Track**: 🎨 Creative Apps
- **Microsoft IQ Layer**: Foundry IQ
- **Tool**: GitHub Copilot (VS Code)

---

## 👤 About the Developer

Built with 💙 by [Your Name] — Lagos, Nigeria  
*First-time hackathon participant. Passionate about education technology.*

---

## 📄 License

MIT License — free to use, adapt, and share.
