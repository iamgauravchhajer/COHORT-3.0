# 🚀 Interactive Task Manager & JavaScript Deep Dive

A fully interactive Task Manager application built entirely from scratch using **HTML, CSS, and Vanilla JavaScript**—with zero frameworks or libraries. This project was designed not only as a functional utility tool but as an intensive exploration into core JavaScript mechanisms, DOM APIs, and the Browser Rendering Pipeline.

## ✨ Features
- **Dynamic Task Management**: Create, edit, complete, and delete tasks instantly without page reloads.
- **Unified Filtering**: Search by task name or filter by category instantly.
- **Task Analytics**: Live UI counters for total, pending, and completed tasks.
- **Robust Theming**: Seamless dark and light mode toggle.
- **Persistent Storage**: All tasks and theme preferences are saved to Local Storage.

---

## 🛠 Technical Implementation Highlights
This project serves as a comprehensive demonstration of advanced Vanilla JavaScript concepts:

### 1. Advanced DOM Manipulation
All tasks are rendered dynamically utilizing fundamental DOM APIs (`createElement()`, `createTextNode()`, `appendChild()`). Furthermore, the task completion sequence explicitly demonstrates dynamic DOM insertion and removal methods in real-time using: `prepend()`, `before()`, `after()`, `replaceWith()`, and `remove()`.

### 2. Attributes vs. Properties
The application makes strict use of custom HTML data attributes (`data-id`, `data-theme`) and manipulates them using both `setAttribute()` and the `.dataset` property.
A dedicated demonstration page illustrates the live behavioral difference between a dynamic DOM property (`input.value`) and a static HTML attribute (`input.getAttribute('value')`).

### 3. Event Handling & Delegation
Rather than attaching individual event listeners to hundreds of dynamically generated task buttons, this application utilizes **Event Delegation**. A single, centralized event listener is attached to the parent `.task-list` container, which efficiently intercepts and processes clicks for editing, deleting, and completing tasks using `e.target.closest()`.

---

## 🧠 Core Web Concepts Explained

As part of the technical requirements for this project, here is an overview of how the browser engine processes this application and how JavaScript events propagate within it.

### The Browser Rendering Pipeline
When you open this application, the browser goes through a strict sequential pipeline to turn code into pixels on the screen:

1. **Parsing**: The browser receives raw bytes of data from the network and converts them into human-readable HTML characters.
2. **Tokenization**: The parser breaks the HTML down into specific "tokens" (like `<StartTag>`, `Text`, `<EndTag>`) according to the W3C standard.
3. **DOM Tree**: The tokens are processed and linked together into a tree data structure called the Document Object Model (DOM). This represents the hierarchical relationships of the HTML elements.
4. **CSSOM Tree**: Concurrently, the browser parses the `style.css` file and builds the CSS Object Model (CSSOM), mapping out how each node in the DOM should be styled.
5. **Render Tree**: The DOM and CSSOM are combined into the Render Tree. This tree contains *only* the nodes required to render the page (excluding visually hidden elements like `<head>` or `display: none;`). The browser then uses the Render Tree to calculate the layout (geometry) and finally paint the pixels to the screen.

### Event Propagation
When a user clicks an element (like the "Delete" button on a task), the click event doesn't just trigger once; it travels through the DOM in two distinct phases:

1. **Event Capturing (Trickling Down)**: The event starts at the very top of the DOM tree (`Window` → `Document` → `<html>` → `<body>`) and trickles *down* through the ancestor elements until it reaches the exact target element that was clicked.
2. **Event Bubbling (Bubbling Up)**: After reaching the target, the event triggers its listener, and then "bubbles" back *up* the DOM tree from the target element all the way back to the root, triggering any matching listeners on the ancestor elements along the way.

**Event Delegation** (used heavily in this project) relies entirely on Event Bubbling. By placing one listener on a parent container, we catch the "bubbles" of events triggered by its child elements, allowing us to manage dynamic content highly efficiently without binding new listeners to every new element.

---

## 💻 Running the Project Locally
1. Clone the repository to your local machine.
2. Open the `index.html` file in your modern web browser of choice.
3. No build tools or `npm install` required!

## 🔗 Live Demo
https://cohort-3-js-task-17.vercel.app/