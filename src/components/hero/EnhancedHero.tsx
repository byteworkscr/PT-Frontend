"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CosmicWalletConnectModal } from "../wallet/WalletConnectModal";

export default function EnhancedHeroWithStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(window.innerHeight, 800);
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

    const animate = () => {
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
          pulseSize * 2
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

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      <section className="relative z-10 py-20 md:py-32 text-white min-h-screen flex items-center">
        <div className="container flex flex-col items-center text-center">
          <div className="inline-block rounded-full bg-black/20 backdrop-blur-sm px-3 py-1 text-sm text-white mb-6 border border-[#0291fc]/30">
            The new era of smart investments
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl text-white drop-shadow-lg">
            Your guiding star in the universe of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0291fc] to-[#c46be3]">
              investments
            </span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-10 text-white/90 drop-shadow">
            We connect digital and physical investment ecosystems in a single
            AI-powered platform to help you make informed decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-[#0291fc] to-[#c46be3] hover:from-[#0080e6] hover:to-[#b35fd0] border-0 shadow-lg shadow-[#0291fc]/20"
              onClick={openWalletModal}
            >
              Connect Wallet
            </Button>
          </div>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            <div className="flex flex-col items-center backdrop-blur-sm bg-black/20 p-4 rounded-lg border border-white/10">
              <p className="text-3xl font-bold">+10K</p>
              <p className="text-white/80">Active users</p>
            </div>
            <div className="flex flex-col items-center backdrop-blur-sm bg-black/20 p-4 rounded-lg border border-white/10">
              <p className="text-3xl font-bold">+25M</p>
              <p className="text-white/80">Transactions</p>
            </div>
            <div className="flex flex-col items-center backdrop-blur-sm bg-black/20 p-4 rounded-lg border border-white/10">
              <p className="text-3xl font-bold">98%</p>
              <p className="text-white/80">Satisfaction</p>
            </div>
            <div className="flex flex-col items-center backdrop-blur-sm bg-black/20 p-4 rounded-lg border border-white/10">
              <p className="text-3xl font-bold">+15</p>
              <p className="text-white/80">Ecosystems</p>
            </div>
          </div>
        </div>
      </section>

      <CosmicWalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={closeWalletModal}
      />
    </div>
  );
}
