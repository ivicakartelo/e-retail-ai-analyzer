import React, { useEffect, useRef } from "react";

const FireworksCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Firework {
      constructor(x, y, color, size) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.speedX = (Math.random() - 0.5) * 6;
        this.speedY = (Math.random() - 0.5) * 6;
        this.alpha = 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.02;
      }

      draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let fireworks = [];

    const createFirework = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      for (let i = 0; i < 30; i++) {
        fireworks.push(new Firework(x, y, color, Math.random() * 3));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.alpha <= 0) {
          fireworks.splice(index, 1);
        }
      });
      requestAnimationFrame(animate);
    };

    setInterval(createFirework, 500);
    animate();

    return () => {
      clearInterval(createFirework);
    };
  }, []);

  return <canvas ref={canvasRef} className="fireworks-canvas"></canvas>;
};

export default FireworksCanvas;