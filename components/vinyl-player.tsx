"use client";

import { useEffect, useState } from "react";
import { useMusicPlayer } from "@/components/music-player";

export default function VinylPlayer() {
  const { isPlaying } = useMusicPlayer();
  const [armPosition, setArmPosition] = useState("retracted"); // "retracted" | "moving" | "playing"
  const [isRotating, setIsRotating] = useState(false);

  // Handle arm position based on play state
  useEffect(() => {
    if (isPlaying && armPosition === "retracted") {
      setArmPosition("moving");
      const timer = setTimeout(() => {
        setArmPosition("playing");
      }, 1000);
      return () => clearTimeout(timer);
    } else if (!isPlaying && armPosition === "playing") {
      setArmPosition("moving");
      const timer = setTimeout(() => {
        setArmPosition("retracted");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, armPosition]);

  // Control disc rotation with a slight delay
  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (isPlaying) {
      rotationTimer = setTimeout(() => {
        setIsRotating(true);
      }, 800); // Start rotation slightly before arm reaches playing position
    } else {
      // Let the disc slow down gradually when paused
      rotationTimer = setTimeout(() => {
        setIsRotating(false);
      }, 200);
    }

    return () => clearTimeout(rotationTimer);
  }, [isPlaying]);

  return (
    <div className="relative w-80 h-80 flex-shrink-0">
      <div className="absolute inset-0 bg-gray-300 rounded-lg shadow-md"></div>
      <div
        className={`absolute inset-4 bg-gray-800 rounded-full transition-transform ${
          isRotating ? "animate-spin-slow" : ""
        }`}
        style={{ animationDuration: "3s" }}
      >
        {/* Vinyl grooves */}
        <div className="absolute inset-0 border-8 border-transparent rounded-full">
          <div className="absolute inset-0 border border-gray-700 rounded-full"></div>
          <div className="absolute inset-4 border border-gray-700 rounded-full"></div>
          <div className="absolute inset-8 border border-gray-700 rounded-full"></div>
          <div className="absolute inset-12 border border-gray-700 rounded-full"></div>
          <div className="absolute inset-16 border border-gray-700 rounded-full"></div>
        </div>

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
          </div>
        </div>

        {/* Visual indicator for rotation */}
        <div className="absolute top-1/2 left-1/2 w-full h-1 bg-gray-700 transform -translate-x-1/2 -translate-y-1/2 opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-full bg-gray-700 transform -translate-x-1/2 -translate-y-1/2 opacity-10"></div>
      </div>

      {/* Tonearm */}
      <div className="absolute top-8 right-8 w-16 h-16">
        <div
          className={`absolute w-2 h-24 translate-y-2 bg-gray-400 rounded-b-full origin-bottom transform transition-all duration-1000 ease-in-out ${
            armPosition === "retracted"
              ? "translate-x-2"
              : armPosition === "moving"
              ? "translate-x-2"
              : "translate-x-2"
          }`}
        ></div>
        <div className="absolute top-0 left-0 w-6 h-6 bg-gray-500 rounded-full"></div>
      </div>
    </div>
  );
}
