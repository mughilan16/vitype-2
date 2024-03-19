const date = new Date();

class App {
  textContainer: HTMLElement | null = null;
  keyBoardContainer: Array<HTMLElement | null> | null = null;
  keyboardKeys: Array<string> = ["qwertyuiop[]", "asdfghjkl;'", "zxcvbnm,."];
  elements: Array<{
    letter: string;
    state: "idle" | "correct" | "wrong" | "current";
  }> = [];
  currentKey = 0;
  isStarted: boolean = false;
  startTime: number = 0;
  constructor() {
    this.textContainer = document.getElementById("text-container");
    this.keyBoardContainer = [
      document.getElementById("first-row"),
      document.getElementById("second-row"),
      document.getElementById("third-row"),
    ];
  }

  init() {
    const text =
      "few very around hold line stand know change the by thing lead hand hold line stand know change";
    this.elements = text
      .split("")
      .map((letter) => ({ letter: letter, state: "idle" }));
    this.currentKey = 0;
    this.elements[this.currentKey].state = "current";
    this.render();
    this.renderKeyboard();
    this.initKeyboardHandler();
    this.isStarted = false;
  }

  initKeyboardHandler() {
    document.addEventListener("keydown", (e) => {
      if ("qwertyuiopasdfghjklzxcvbnm".includes(e.key)) {
        document.getElementById(e.key)?.classList.add("key-active")
      } else if (e.key === " ") {
        document.getElementById("space-bar")?.classList.add("key-active")
      }
    })
    document.addEventListener("keyup", (e) => {
      if ("qwertyuiopasdfghjklzxcvbnm[];',.".includes(e.key)) {
        document.getElementById(e.key)?.classList.remove("key-active")
      } else if (e.key === " ") {
        document.getElementById("space-bar")?.classList.remove("key-active")
      }
    })
  }

  start() {
    this.init();
    document.addEventListener("keydown", (e) => {
      if (e.code === "Tab") {
        this.init();
        e.preventDefault();
        return;
      }
      if (e.code === "Backspace") {
        if (this.currentKey > 0) {
          this.elements[this.currentKey].state = "idle";
          this.currentKey -= 1;
          this.elements[this.currentKey].state = "current";
          this.render();
        }
        return;
      }

      if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) {
        return;
      }

      if (!this.isStarted) {
        this.startTime = Date.now()
      }

      if (e.key === this.elements[this.currentKey].letter) {
        this.elements[this.currentKey].state = "correct";
      } else {
        this.elements[this.currentKey].state = "wrong";
      }

      if (this.currentKey < this.elements.length - 1) {
        this.currentKey += 1;
        this.elements[this.currentKey].state = "current";
      }
      this.render();
    });
  }

  setupLabels() {
  }

  render() {
    if (this.textContainer === null) {
      return;
    }
    this.textContainer.innerHTML = this.elements
      .map(
        (i) =>
          `<span class="${i.state} border-l ${i.state === "current" ? "border-l-gray-200" : "border-l-transparent"}">${i.letter}</span>`,
      )
      .join("");
  }

  renderKeyboard() {
    if (this.keyBoardContainer === null) {
      return;
    }
    this.keyboardKeys.forEach((keys, i) => {
      if (this.keyBoardContainer === null) {
        return
      }
      const row = this.keyBoardContainer[i]
      if (row === null) {
        return
      }
      row.innerHTML = keys.split("")
        .map((key) => `<div id="${key}" class="p-2 w-10 h-10 text-center bg-gray-700 rounded-md opacity-20">${key}</div>`)
        .join("")
    });
  }
}

const app = new App();
app.start();
