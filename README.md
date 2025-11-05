# 🚀 Interactive 3D Product Card

A high-fidelity, motion-enhanced product card built with **React**. Designed to deliver a premium UX where the card tilts with cursor movement, elements float in 3D layers, and a glossy highlight follows the pointer. This creates a tactile, “real-world object” feeling inside the browser.

## ✅ Feature Overview

| Feature | Status | Tech |
|---|---|---|
3D cursor-driven tilt | ✅ | React Hooks, `requestAnimationFrame`
Hover elevation | ✅ | CSS `translateZ()`
Glossy shine reflection | ✅ | CSS radial gradient + JS tracking
Smooth magnetic reset | ✅ | `cubic-bezier` transitions
Performance optimization | ✅ | `will-change`, `rAF` loop
Accessibility fallback | ✅ | `prefers-reduced-motion`

---

## ✨ Project Overview

This component uses **CSS 3D transforms**, custom math, and event-driven motion handling to simulate depth, gloss, and responsive interaction. Great for **e-commerce**, **portfolio UI effects**, and **premium landing pages**.

---

## 🛠 Tech Stack

- **Framework:** ReactJS
- **Language:** JavaScript (ES6+)
- **Styling:** CSS Modules
- **Performance:** `requestAnimationFrame`, GPU transforms, `will-change`

---

## 💡 Core Motion Features

- Tilts up to **±12°** on both axes
- Parallax depth layers using `translateZ(40px-80px)`
- Gloss reflection spotlight that follows cursor
- Snaps back smoothly on `mouseleave` using: `cubic-bezier(0.23, 1, 0.32, 1)`
- Render-synced animation via `requestAnimationFrame`
- Respects **reduced-motion accessibility settings**

---

## 🧠 Architecture

| File | Responsibility |
|---|---|
`ProductCard.jsx` | UI markup + refs
`use3DCardEffect.js` | Pointer math, state control, rAF engine
`ProductCard.module.css` | Depth layers, perspective, transitions

### Key Technical Notes

- Mouse events bind to **wrapper**, not the moving element, preventing hover flicker
- Cursor coords normalized to **-1 → +1** range before rotation mapping
- GPU transforms prioritized over layout-changing properties

---

## 📦 Installation

### Prerequisites
- Node.js (LTS)
- npm or yarn

### Setup

```bash
git clone https://github.com/COMPILELINE/Interactive-3d-Product-Card.git
cd interactive-3d-product-card
npm install
# or
yarn install
```
### Run Dev Server
```bash
npm run dev
# or
yarn dev
```
### Launches at:
```bash
http://localhost:5173
```
