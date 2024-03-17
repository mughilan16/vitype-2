class App {
  textContainer: HTMLElement | null = null;
  elements: Array<{
    letter: string;
    state: "idle" | "correct" | "wrong" | "current";
  }> = [];
  currentKey = 0;
  constructor() {
    this.textContainer = document.getElementById("text-container");
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
}

const app = new App();
app.start();
