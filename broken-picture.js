export class BrokenPicture extends HTMLElement {
  mode = 'draw';
  clickX = [];
  clickY = [];
  clickDrag = [];
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.attachListeners();
    this.clear();
  }
  clear() {
    const context = this.myContext;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    context.strokeStyle = '#df4b26';
    context.lineJoin = 'round';
    context.lineWidth = 5;
  }
  redraw(
    context = this.myContext,
    clickXToUse = this.clickX,
    clickYToUse = this.clickY,
    clickDragToUse = this.clickDrag
  ) {
    this.clear();
    requestAnimationFrame(() => {
      for (var i = 0; i < clickXToUse.length; i++) {
        context.beginPath();
        if (clickDragToUse[i] && i) {
          context.moveTo(clickXToUse[i - 1], clickYToUse[i - 1]);
        } else {
          context.moveTo(clickXToUse[i] - 1, clickYToUse[i]);
        }
        context.lineTo(clickXToUse[i], clickYToUse[i]);
        context.closePath();
        context.stroke();
      }
    });
    this.dispatchEvent(
      new CustomEvent('draw', {
        bubbles: true,
        composed: true,
        detail: {},
      })
    );
  }
  attachListeners() {
    this.myContext = this.canvas.getContext('2d');
    const myCanvas = this.canvas;
    this.canvas.width = 300;
    this.canvas.height = 300;
    let paint;
    const rect = this.canvas.getBoundingClientRect();
    let offsetLeft = rect.left;
    let offsetTop = rect.top;
    const myContext = this.myContext;
    const addClick = (x, y, dragging) => {
      this.clickX.push(x);
      this.clickY.push(y);
      this.clickDrag.push(dragging);
    };

    myCanvas.addEventListener(
      'pointerdown',
      (e) => {
        if (this.mode === 'draw') {
          const mouseX = e.pageX - offsetLeft;
          const mouseY = e.pageY - offsetTop;
          paint = true;
          addClick(mouseX, mouseY);
          this.redraw();
        }
      },
      false
    );
    myCanvas.addEventListener(
      'pointermove',
      (e) => {
        if (paint) {
          addClick(e.pageX - offsetLeft, e.pageY - offsetTop, true);
          this.redraw();
        }
      },
      false
    );
    myCanvas.addEventListener(
      'pointerup',
      () => {
        paint = false;
      },
      false
    );
    myCanvas.addEventListener(
      'pointerleave',
      () => {
        paint = false;
      },
      false
    );
  }
  get canvas() {
    return this.shadowRoot.querySelector('canvas');
  }
  display(options) {
    this.mode = 'display';
    const { x, y, drag } = options;
    this.clickX = x.split(',').map((n) => parseInt(n));
    this.clickY = y.split(',').map((n) => parseInt(n));
    this.clickDrag = drag.split(',').map((b) => b === 'true');
    this.redraw();
  }
  startDraw() {
    this.mode = 'draw';
    this.clickX = [];
    this.clickY = [];
    this.clickDrag = [];
    this.clear();
  }

  render() {
    this.shadowRoot.innerHTML = `
          <style>
          :host {
            display: inline-block;
          }
          canvas {
            border: 1px solid black;
            width: 300px;
            height: 300px;
            touch-action: none;
          }
          </style>
          <canvas></canvas>
          `;
  }
}
customElements.define('broken-picture', BrokenPicture);
