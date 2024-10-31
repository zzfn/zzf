'use client';

import { useEffect, useRef } from 'react';

const TechBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 处理高分辨率显示
    const dpr = window.devicePixelRatio || 1;

    // 设置 canvas 尺寸
    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // 设置显示尺寸
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // 设置实际尺寸，考虑设备像素比
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      // 缩放上下文以匹配设备像素比
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      pulseSize: number;
      pulseSpeed: number;
      hue: number;
      hueSpeed: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.pulseSize = 0;
        this.pulseSpeed = 0.05 + Math.random() * 0.05;
        this.hue = Math.random() * 60 - 30;
        this.hueSpeed = (Math.random() - 0.5) * 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        const canvasWidth = canvas?.width ?? 0;
        const canvasHeight = canvas?.height ?? 0;

        if (this.x > canvasWidth) this.x = 0;
        if (this.x < 0) this.x = canvasWidth;
        if (this.y > canvasHeight) this.y = 0;
        if (this.y < 0) this.y = canvasHeight;

        this.pulseSize += this.pulseSpeed;
        this.hue += this.hueSpeed;

        if (this.pulseSize > 1 || this.pulseSize < 0) {
          this.pulseSpeed *= -1;
        }
      }

      draw() {
        if (!ctx) return;
        const currentSize = this.size * (1 + Math.sin(this.pulseSize) * 0.3);

        // 主粒子
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, 0.8)`;
        ctx.fill();

        // 光晕效果
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize * 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, 0.1)`;
        ctx.fill();
      }
    }

    const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / (20000 * dpr)), 80);
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width / dpr, canvas.height / dpr));
    }

    const animate = () => {
      if (!ctx) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        for (let j = index + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const alpha = (1 - distance / 200) * 0.15;
            const gradient = ctx.createLinearGradient(
              particle.x,
              particle.y,
              particles[j].x,
              particles[j].y,
            );

            gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, ${alpha})`);
            gradient.addColorStop(1, `hsla(${particles[j].hue}, 100%, 70%, ${alpha})`);

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className='fixed inset-0 -z-10 h-full w-full bg-default'
      style={{
        filter: 'blur(0.5px)',
        imageRendering: 'pixelated',
      }}
    />
  );
};

export default TechBackground;
