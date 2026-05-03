class RetroGridManager {
  static instances = {};

  static register(gridId, instance) {
    if (!this.instances[gridId]) {
      this.instances[gridId] = [];
    }
    this.instances[gridId].push(instance);
  }

  static getSharedOffset(gridId) {
    const instances = this.instances[gridId];
    if (!instances || instances.length === 0) return 0;
    return instances[0].offset;
  }

  static setSharedOffset(gridId, offset) {
    const instances = this.instances[gridId];
    if (!instances) return;
    instances.forEach(inst => {
      inst.offset = offset;
    });
  }
}

// RetroGrid class - must be defined before DOMContentLoaded
class RetroGrid {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.gridColor = options.gridColor || '#ff00ff';
    this.showScanlines = options.showScanlines !== false;
    this.glowEffect = options.glowEffect !== false;
    this.position = options.position || 'top';
    this.gridId = options.gridId || 'default';

    this.cellWidth = 120;
    this.cellDepth = 80;
    this.numCellsWide = 16;
    this.numCellsDeep = 20;

    this.cameraX = 0;
    this.cameraY = 120;
    this.cameraZ = 400;
    this.focalLength = 500;

    this.offset = 0;
    this.speed = 1.5;

    this.animationId = null;

    if (this.gridId !== 'single') {
      RetroGridManager.register(this.gridId, this);
      this.offset = RetroGridManager.getSharedOffset(this.gridId);
    }

    this.init();
  }

  getOffset() {
    if (this.gridId !== 'single') {
      return RetroGridManager.getSharedOffset(this.gridId);
    }
    return this.offset;
  }

  setOffset(value) {
    if (this.gridId !== 'single') {
      RetroGridManager.setSharedOffset(this.gridId, value);
    } else {
      this.offset = value;
    }
  }

  init() {
    this.resizeCanvas();
    // Set initial opacity for fade-in
    this.canvas.style.opacity = '0';
    this.canvas.style.transition = 'opacity 0.5s ease-in';

    window.addEventListener('resize', () => this.resizeCanvas());

    // Start animation after a brief delay for smoother load
    requestAnimationFrame(() => {
      this.canvas.style.opacity = '1';
      this.animate();
    });
  }

  resizeCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width || 300;
    this.canvas.height = rect.height || 200;
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 255, g: 0, b: 255 };
  }

  project3DTo2D(x, y, z) {
    const relX = x - this.cameraX;
    let relY = y - this.cameraY;
    const relZ = z - this.cameraZ;

    if (relZ <= 10) return null;

    const scale = this.focalLength / relZ;
    const screenX = this.canvas.width / 2 + relX * scale;
    
    // Flip Y for bottom position (viewing from below)
    if (this.position === 'bottom') {
      relY = -relY;
    }
    
    const screenY = this.canvas.height * 0.5 + relY * scale;

    return { x: screenX, y: screenY, scale, z: relZ };
  }

  drawCell(x, z, zOffset) {
    const actualZ = z - zOffset;
    if (actualZ < -this.cellDepth || actualZ > this.numCellsDeep * this.cellDepth) return;

    const topLeft = this.project3DTo2D(x - this.cellWidth / 2, 0, actualZ);
    const topRight = this.project3DTo2D(x + this.cellWidth / 2, 0, actualZ);
    const bottomLeft = this.project3DTo2D(x - this.cellWidth / 2, 0, actualZ + this.cellDepth);
    const bottomRight = this.project3DTo2D(x + this.cellWidth / 2, 0, actualZ + this.cellDepth);

    if (!topLeft || !topRight || !bottomLeft || !bottomRight) return;
    if (actualZ < 0) return;

    const distanceFactor = Math.min(1, actualZ / (this.numCellsDeep * this.cellDepth));
    const alpha = Math.max(0.3, 1 - distanceFactor * 0.7);
    const lineWidth = Math.max(1, 2.5 * (1 - distanceFactor * 0.5));

    if (this.glowEffect) {
      this.ctx.shadowBlur = 10 * (1 - distanceFactor);
      this.ctx.shadowColor = this.gridColor;
    }

    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = this.gridColor;
    this.ctx.globalAlpha = alpha;

    this.ctx.beginPath();
    this.ctx.moveTo(bottomLeft.x, bottomLeft.y);
    this.ctx.lineTo(bottomRight.x, bottomRight.y);
    this.ctx.lineTo(topRight.x, topRight.y);
    this.ctx.lineTo(topLeft.x, topLeft.y);
    this.ctx.closePath();
    this.ctx.stroke();

    this.ctx.shadowBlur = 0;
    this.ctx.globalAlpha = 1;
  }

  drawScanlines() {
    if (!this.showScanlines) return;

    this.ctx.globalAlpha = 0.1;
    this.ctx.fillStyle = '#000000';
    for (let y = 0; y < this.canvas.height; y += 4) {
      this.ctx.fillRect(0, y, this.canvas.width, 2);
    }
    this.ctx.globalAlpha = 1;
  }

  animate() {
    // Skip animation if canvas is too small
    if (this.canvas.width < 10 || this.canvas.height < 10) {
      this.animationId = requestAnimationFrame(() => this.animate());
      return;
    }
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const rgb = this.hexToRgb(this.gridColor);

    // Flip sky/ground based on position
    const isBottom = this.position === 'bottom';
    const horizon = this.canvas.height * 0.55;
    const groundStart = horizon;

    // Draw sky (top portion for top position, bottom for bottom)
    const skyGradient = this.ctx.createLinearGradient(0, 0, 0, horizon);
    if (isBottom) {
      skyGradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`);
      skyGradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`);
      skyGradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`);
    } else {
      skyGradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`);
      skyGradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`);
      skyGradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`);
    }
    this.ctx.fillStyle = skyGradient;
    this.ctx.fillRect(0, 0, this.canvas.width, horizon);

    // Draw ground
    const groundGradient = this.ctx.createLinearGradient(0, groundStart, 0, this.canvas.height);
    groundGradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`);
    groundGradient.addColorStop(1, `rgba(0, 0, 0, 0.9)`);
    this.ctx.fillStyle = groundGradient;
    this.ctx.fillRect(0, groundStart, this.canvas.width, this.canvas.height - groundStart);

    this.offset += this.speed;
    if (this.offset >= this.cellDepth) this.offset = 0;
    this.setOffset(this.offset);

    for (let row = -5; row < this.numCellsDeep + 5; row++) {
      const z = row * this.cellDepth;

      for (let col = -Math.floor(this.numCellsWide / 2); col <= Math.floor(this.numCellsWide / 2); col++) {
        const x = col * this.cellWidth;
        this.drawCell(x, z, this.getOffset());
      }
    }

    this.drawScanlines();

    const vignette = this.ctx.createRadialGradient(
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.canvas.height * 0.3,
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.canvas.height * 0.8
    );
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,0,0,0.5)');
    this.ctx.fillStyle = vignette;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.resizeCanvas);
  }
}

// Expose RetroGrid and Manager globally for use in other scripts
window.RetroGrid = RetroGrid;
window.RetroGridManager = RetroGridManager;

// Initialize only visible canvases (not in hidden sections like day6)
document.addEventListener('DOMContentLoaded', () => {
  const canvases = document.querySelectorAll('.retro-grid-canvas');
  canvases.forEach(canvas => {
    // Skip canvases in hidden sections (display:none)
    const parent = canvas.closest('[style*="display:none"], [style*="display: none"]');
    if (parent) return;
    
    const gridColor = canvas.dataset.gridColor || '#ff00ff';
    const showScanlines = canvas.dataset.showScanlines !== 'false';
    const glowEffect = canvas.dataset.glowEffect !== 'false';
    const gridId = canvas.dataset.gridId || 'single';
    const position = canvas.dataset.position || 'top';

    new RetroGrid(canvas, {
      gridColor,
      showScanlines,
      glowEffect,
      gridId,
      position
    });
  });
});






