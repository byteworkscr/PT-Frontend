"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    const stars = {
      small: Array.from({ length: 700 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 1,
        speed: 0.3,
        color: "#FFFFFF",
      })),
      medium: Array.from({ length: 200 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 2,
        speed: 0.2,
        color: Math.random() > 0.8 ? "#0291fc" : "#FFFFFF",
      })),
      large: Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 3,
        speed: 0.15,
        color: Math.random() > 0.7 ? "#c46be3" : "#FFFFFF",
      })),
    };

    const specialStars = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 4 + Math.random() * 2,
      speed: 0.1 + Math.random() * 0.15,
      color: Math.random() > 0.5 ? "#0291fc" : "#c46be3",
      pulse: 0,
      pulseSpeed: 0.03 + Math.random() * 0.04,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#1B2735");
      gradient.addColorStop(1, "#090A0F");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      Object.values(stars)
        .flat()
        .forEach((star) => {
          ctx.fillStyle = star.color;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
          ctx.fill();

          star.y += star.speed;

          if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
          }
        });

      specialStars.forEach((star) => {
        star.pulse += star.pulseSpeed;
        if (star.pulse > Math.PI * 2) star.pulse = 0;

        const pulseSize = star.size + Math.sin(star.pulse) * 1;

        const gradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          pulseSize * 2,
        );
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, pulseSize * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, pulseSize / 2, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;

        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
    };

    const loop = () => {
      draw();
      animationId = requestAnimationFrame(loop);
    };

    let animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
};

export default BackgroundAnimation;
