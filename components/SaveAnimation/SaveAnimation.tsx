"use client";
import React from "react";
import { motion } from "framer-motion";

const CIRCLE_RADIUS = 30;

interface ParticleProps {
  fromColor: string;
  toColor: string;
  index: number;
  total: number;
}

export const CircleAnimation = () => (
  <svg
    className="pointer-events-none"
    style={{
      position: "absolute",
      width: CIRCLE_RADIUS * 2,
      height: CIRCLE_RADIUS * 2,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 110,
    }}
  >
    <motion.circle
      cx={CIRCLE_RADIUS}
      cy={CIRCLE_RADIUS}
      r={CIRCLE_RADIUS - 2}
      fill="none"
      initial={{ scale: 0, stroke: "#599b59", strokeWidth: CIRCLE_RADIUS * 2 }}
      animate={{ scale: 1, stroke: "#a3e0a3", strokeWidth: 0 }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
    />
  </svg>
);

const Particle = ({ fromColor, toColor, index, total }: ParticleProps) => {
  const angle = (index / total) * 360 + 45;
  const radians = (angle * Math.PI) / 180;

  const burstDistance = 80;
  const duration = 4;

  return (
    <motion.div
      className="pointer-events-none rounded-full"
      style={{
        position: "absolute",
        width: "8px",
        height: "8px",
        backgroundColor: fromColor,
        borderRadius: "50%",
        top: "calc(50% - 2.5px)",
        left: "calc(50% - 2.5px)",
        zIndex: 1111,
      }}
      initial={{ opacity: 0, scale: 1, x: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: Math.cos(radians) * burstDistance,
        y: Math.sin(radians) * burstDistance,
        scale: 0,
        backgroundColor: toColor,
      }}
      transition={{ duration, ease: [0.23, 1, 0.32, 1], delay: 0.05 }}
    />
  );
};

export const BurstAnimation = () => {
  const colorPairs = [
    { from: "#254c24", to: "#ffffff" },
    { from: "#5dbe5c", to: "#def2de" },
    { from: "#def2de", to: "#8dd18c" },
    { from: "#5dbe5c", to: "#254c24" },
    { from: "#8dd18c", to: "#4a9849" },
    { from: "#5dbe5c", to: "#254c24" },
    { from: "#254c24", to: "#ffffff" },
    { from: "#eef8ee", to: "#5dbe5c" },
    { from: "#5dbe5c", to: "#def2de" },
    { from: "#def2de", to: "#8dd18c" },
    { from: "#8dd18c", to: "#4a9849" },
    { from: "#eef8ee", to: "#5dbe5c" },
  ];

  return (
    <div
      className="pointer-events-none"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1111,
      }}
    >
      {colorPairs.map((colors, i) => (
        <Particle
          key={i}
          fromColor={colors.from}
          toColor={colors.to}
          index={i}
          total={colorPairs.length}
        />
      ))}
    </div>
  );
};
