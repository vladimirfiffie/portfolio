import React from "react";
import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion"; // Unified import
import Button from "../components/ui/Button";
import WaveButton from "@/components/ui/WaveButton";

/**
 * 1. HeroHighlight Component
 */
export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const dotPatterns = {
    light: {
      default: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23d4d4d4' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
      hover: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%236366f1' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
    },
    dark: {
      default: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23404040' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
      hover: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%238183f4' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
    },
  };

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative flex min-h-[40rem] w-full items-center justify-center bg-white dark:bg-black overflow-hidden",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 dark:hidden" style={{ backgroundImage: dotPatterns.light.default }} />
        <div className="absolute inset-0 hidden dark:block" style={{ backgroundImage: dotPatterns.dark.default }} />
        
        <motion.div
          className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 dark:hidden"
          style={{
            backgroundImage: dotPatterns.light.hover,
            WebkitMaskImage: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
            maskImage: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
          }}
        />
        <motion.div
          className="absolute inset-0 hidden opacity-0 transition duration-300 group-hover:opacity-100 dark:block"
          style={{
            backgroundImage: dotPatterns.dark.hover,
            WebkitMaskImage: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
            maskImage: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
          }}
        />
      </div>

      <div className={cn("relative z-20", className)}>{children}</div>
    </div>
  );
};

/**
 * 2. Highlight Component
 */
export const Highlight = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      animate={{ backgroundSize: "100% 100%" }}
      transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 px-1 pb-1 dark:from-indigo-500 dark:to-purple-500`,
        className
      )}
    >
      {children}
    </motion.span>
  );
};

/**
 * 3. Final Hero Component
 */
const Hero = () => {
  const words = "Hi, I'm Vladimir — a Creative IT Graduate".split(" ");
  const highlightWords = ["Creative", "IT", "Graduate"];

  return (
    <HeroHighlight containerClassName="mx-auto w-full">
      <div className="max-w-5xl mx-auto py-10 md:py-20 flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 mx-auto max-w-4xl text-center text-3xl font-bold text-slate-700 md:text-5xl lg:text-7xl dark:text-slate-100 leading-tight"
        >
          {words.map((word, index) => {
            const cleanWord = word.replace(/[—,.]/g, "");
            const isHighlight = highlightWords.includes(cleanWord);

            return isHighlight ? (
              <Highlight key={index} className="mx-1 inline-block text-white">
                {word}
              </Highlight>
            ) : (
              <span key={index} className="mx-1 inline-block">
                {word}
              </span>
            );
          })}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative z-20 mt-6 max-w-2xl text-center text-lg md:text-xl font-normal text-neutral-600 dark:text-neutral-400"
        >
          I create engaging digital experiences, combining coding and thoughtful
          design to build applications that are both functional and beautiful.
        </motion.p>

       <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.8 }}
  className="relative z-20 mt-10 flex flex-col sm:flex-row items-center justify-center gap-6"
>
<WaveButton onClick={() => window.location.href = "#contact"}>
  Contact Me
</WaveButton>
  <Button>
    <span className="px-4">View My Resume</span>
  </Button>
</motion.div>

      </div>
    </HeroHighlight>
  );
};

export default Hero;