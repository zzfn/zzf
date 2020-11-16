import React, { useEffect, useRef, useState } from "react";
import styles from "./canvas.module.scss";
function twoPointDistance(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}
export function Canvas(): JSX.Element {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const ins = useRef();
  useEffect(() => {
    if (ins) {
      const ele = (ins as any).current.getBoundingClientRect();
      setHeight(ele.height * window.devicePixelRatio);
      setWidth(ele.width * window.devicePixelRatio);
    }
  }, []);
  useEffect(() => {
    if (ins) {
      const colors = [
        "#66cccc",
        "#ccff66",
        "#ff99cc",
        "#ff9999",
        "#666699",
        "#ff0033",
        "#FFF2B0",
      ];
      const ctx = (ins as any).current.getContext("2d");
      let balls: any[] = [];
      let mouseBall;
      for (let i = 0; i < 120; i++) {
        balls.push(
          new Ball({
            ctx,
            // 随机出现在画布中任何一处
            x: Math.floor(Math.random() * ctx.canvas.width),
            y: Math.floor(Math.random() * ctx.canvas.height),
            radius: 5,
            color: colors[Math.floor(Math.random() * 7)],
          })
        );
      }
      let delayTime = 0;
      // 上一帧的时间
      let lastTime = +new Date();
      const loopDraw = () => {
        requestAnimationFrame(loopDraw);
        const now = +new Date();
        delayTime = now - lastTime;
        lastTime = now;
        if (delayTime > 50) delayTime = 50;
        // ctx.fillStyle = "rgba(255,255,255,0.3)";
        // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        balls.forEach((ball, index) => {
          ball.render();
          ball.update(delayTime && delayTime);
          if (mouseBall) {
            const lineMouse = twoPointDistance(ball, mouseBall);
            if (lineMouse && lineMouse < 200) {
              ball.renderLine(mouseBall);
            }
          }
          balls.forEach((ball2) => {
            const distance = twoPointDistance(ball, ball2);
            if (distance && distance < 100) {
              ball.renderLine(ball2);
            }
          });
        });
      };
      loopDraw();
      window.addEventListener("mousemove", (e) => {
        console.log(e);
        mouseBall = new Ball({
          ctx,
          x: e.pageX,
          y: e.pageY,
          radius: 5,
          color: "#000",
        });
      });
    }
  });
  return (
    <canvas width={width} height={height} className={styles.canvas} ref={ins} />
  );
}
class Ball {
  // 初始化的特征
  private x: number;
  private y: number;
  private ctx: any;
  private radius: number;
  private color: string;
  private vy: number;
  private vx: number;
  constructor(options: any = {}) {
    const {
      x = 0, // x坐标
      y = 0, // y坐标
      ctx = null, // 神奇的画笔🖌️
      radius = 1, // 球的半径
      color = "#000", // 颜色
    } = options;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.radius = radius;
    this.color = color;
    // 速度
    this.vy = (Math.random() - 0.5) * 10; // 刚开始是静止的
    this.vx = (Math.random() - 0.5) * 10; // 刚开始是静止的
  }
  update(delayTime) {
    this.y += this.vy;
    this.x += this.vx;
    if (this.y >= this.ctx.canvas.height - this.radius) {
      this.y = this.ctx.canvas.height - this.radius;
      this.vy = -this.vy;
    }
    if (this.y <= this.radius) {
      this.y = this.radius;
      this.vy = -this.vy;
    }
    if (this.x >= this.ctx.canvas.width - this.radius) {
      this.x = this.ctx.canvas.width - this.radius;
      this.vx = -this.vx;
    }
    if (this.x <= this.radius) {
      this.x = this.radius;
      this.vx = -this.vx;
    }
  }

  // 渲染
  render() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  renderLine(target) {
    const lingrad = this.ctx.createLinearGradient(
      this.x,
      this.y,
      target.x,
      target.y
    );
    lingrad.addColorStop(0, this.color);
    lingrad.addColorStop(1, target.color);
    this.ctx.beginPath();
    this.ctx.strokeStyle = "ccc";
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(target.x, target.y);
    this.ctx.stroke();
    this.ctx.strokeStyle = lingrad;
  }
}
