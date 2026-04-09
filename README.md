# 📚 Vocabulary Learning App

An interactive Vocabulary Learning Web App that helps users learn English words with meanings, pronunciation, examples, and synonyms. Built using **Vanilla JavaScript**, API integration, and dynamic UI rendering.

---

## 🚀 Features

* 📡 Fetch lessons dynamically from API
* 📖 Load vocabulary based on lesson levels
* 🔍 Search words globally
* 🔊 Pronounce words using Speech API
* 🪟 Modal with detailed word information
* 📚 Synonyms display as interactive buttons
* ⏳ Loading spinner for better UX
* ❌ Empty state UI for no data

---

## 🛠️ Tech Stack

* **HTML5**
* **CSS3 (Tailwind / Utility CSS)**
* **JavaScript (ES6)**
* **Fetch API**
* **Web Speech API (SpeechSynthesisUtterance)**
* **DOM Manipulation**

---

## 📁 Project Structure

```
📦 vocabulary-app
 ┣ 📂 assets
 ┃ ┣ alert-error.png
 ┣ 📜 index.html
 ┣ 📜 script.js
 ┗ 📜 README.md
```

---

## ⚙️ Core Functionalities

### 🔹 Load Lessons

Fetch all lesson levels from API:

```js
fetch('https://openapi.programming-hero.com/api/levels/all')
```

* Dynamically creates lesson buttons
* Each button loads vocabulary for that level

---

### 🔹 Load Words by Level

```js
loadLevelWord(id);
```

* Fetches words by level
* Highlights active lesson button
* Shows spinner while loading

---

### 🔹 Display Words

```js
displayLevelWord(words);
```

* Dynamically renders word cards
* Shows:

  * Word
  * Meaning
  * Pronunciation
* Handles empty state (no words available)

---

### 🔹 Word Details Modal

```js
loadWordDetail(id);
```

* Shows:

  * Word + pronunciation
  * Meaning
  * Example sentence
  * Synonyms

---

### 🔹 Search Functionality

```js
word.word.toLowerCase().includes(searchValue)
```

* Searches across all vocabulary
* Displays matched results

---

### 🔹 Pronunciation Feature

```js
new SpeechSynthesisUtterance(word);
```

* Uses browser **Speech API**
* Speaks the selected word

---

### 🔹 Spinner Control

```js
manageSpinner(true/false);
```

* Improves UX during API loading

---

## 🎨 UI Highlights

* 🎯 Active lesson button styling
* 📦 Clean card-based layout
* 🪟 Modal popup design
* ⚡ Fast & dynamic rendering
* 🧠 Beginner-friendly interface

---

## ▶️ Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/vocabulary-app.git
```

### 2️⃣ Open Project

```bash
cd vocabulary-app
open index.html
```

---

## 🔮 Future Improvements

* 🔐 User authentication
* 📊 Progress tracking system
* ❤️ Favorite words feature
* 🌐 Multi-language support
* 📱 Fully responsive mobile UI

---

## 👨‍💻 Author

**Sabbir Hossain**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub and share it!

---
