"use client"

import { useMusicPlayer } from "@/components/music-player"
import { CSSProperties } from "react"

// Define a type for the CSS variables
interface CSSPropertiesWithVars extends CSSProperties {
  '--base-height': string;
}

export default function Waveform() {
  const { isPlaying } = useMusicPlayer()

  // Generate random bar heights that look natural for a waveform
  const generateWaveformHeights = (count: number): number[] => {
    // Create a pattern that resembles an audio waveform with higher amplitude in the middle
    return Array.from({ length: count }).map((_, i) => {
      const position = i / count
      // Create a bell curve-like shape - higher in the middle, lower at the edges
      const baseHeight = Math.sin(position * Math.PI) * 0.9 + 0.3
      // Add some randomness
      return baseHeight * (0.7 + Math.random() * 0.3)
    })
  }

  const leftBarsHeights = generateWaveformHeights(20)
  const rightBarsHeights = generateWaveformHeights(20)

  return (
    <div className="w-80 h-20 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
      <div className="w-full h-full flex items-center justify-center px-5">
        {/* Waveform bars - first half (darker) */}
        <div className="flex h-full items-center gap-[3px] w-1/2">
          {leftBarsHeights.map((height, i) => (
            <div
              key={`left-${i}`}
              className={`w-1 bg-black ${isPlaying ? "animate-waveform" : ""}`}
              style={{
                height: `${height * 50}%`,
                animationDelay: `${i * 30}ms`,
                opacity: 0.8,
                ...(isPlaying && {'--base-height': `${height * 30}%`} as CSSPropertiesWithVars),
              }}
            ></div>
          ))}
        </div>
        
        {/* Waveform bars - second half (lighter) */}
        <div className="flex h-full items-center gap-[3px] w-1/2">
          {rightBarsHeights.map((height, i) => (
            <div
              key={`right-${i}`}
              className={`w-1 bg-black ${isPlaying ? "animate-waveform" : ""}`}
              style={{
                height: `${height * 50}%`,
                animationDelay: `${i * 30}ms`,
                opacity: 0.8,
                ...(isPlaying && {'--base-height': `${height * 30}%`} as CSSPropertiesWithVars),
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
} 