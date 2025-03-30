"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMusicPlayer } from "@/components/music-player"
import { cn } from "@/lib/utils"

export default function PlayerControls() {
  const {
    currentSong,
    isPlaying,
    togglePlayback,
    currentTime,
    setCurrentTime,
    skipToNext,
    skipToPrevious,
    isFavorite,
    toggleFavorite,
  } = useMusicPlayer()

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const duration = currentSong?.duration || 215 // 3:35 in seconds
  const progressPercentage = (currentTime / duration) * 100

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentSong])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && currentTime < duration) {
        setCurrentTime((prev) => {
          const newTime = prev + 1
          return newTime > duration ? duration : newTime
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, currentTime, duration, setCurrentTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !currentSong) return

    const rect = progressRef.current.getBoundingClientRect()
    const clickPosition = e.clientX - rect.left
    const percentage = clickPosition / rect.width
    const newTime = percentage * duration

    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  if (!currentSong) {
    return (
      <div className="h-32 border-t border-gray-200 bg-gray-100 p-4 flex items-center justify-center">
        <p className="text-gray-500">No song selected</p>
      </div>
    )
  }

  return (
    <div className="border-t border-gray-200 bg-gray-100 p-4 w-full">
      {/* Now Playing */}
      <div className="mb-4">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="text-4xl font-bold">{currentSong.title}</h2>
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-black text-white rounded-full hover:bg-gray-800">
              {currentSong.category}
            </Button>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => toggleFavorite(currentSong.id)}>
              <Heart className={cn("h-5 w-5", isFavorite(currentSong.id) ? "fill-red-500 text-red-500" : "")} />
            </Button>
            <span className="text-xl">{currentSong.likes}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-4">
          <span className="text-lg">{formatTime(currentTime)}</span>
          <div
            className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
            onClick={handleProgressClick}
            ref={progressRef}
          >
            <div className="relative w-full h-full">
              {/* Static progress bar lines */}
              <div className="absolute inset-0 flex items-center">
                {Array.from({ length: 60 }).map((_, i) => {
                  const height = 4 + Math.floor(Math.sin(i * 0.2) * 6 + 6)
                  return (
                    <div
                      key={i}
                      className="mx-0.5 bg-gray-300"
                      style={{
                        height: `${height}px`,
                        width: "1.5px",
                      }}
                    ></div>
                  )
                })}
              </div>

              {/* Progress overlay */}
              <div
                className="absolute inset-0 flex items-center bg-gray-200"
                style={{ width: `${progressPercentage}%` }}
              >
                {Array.from({ length: 60 }).map((_, i) => {
                  const height = 4 + Math.floor(Math.sin(i * 0.2) * 6 + 6)
                  return (
                    <div
                      key={i}
                      className="mx-0.5 bg-black"
                      style={{
                        height: `${height}px`,
                        width: "1.5px",
                      }}
                    ></div>
                  )
                })}
              </div>
            </div>
          </div>
          <span className="text-lg">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-12">
        <Button variant="ghost" size="icon" className="h-12 w-12">
          <Shuffle className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="h-12 w-12" onClick={skipToPrevious}>
          <SkipBack className="h-6 w-6" />
        </Button>
        <Button onClick={togglePlayback} className="h-16 w-16 rounded-full bg-black text-white hover:bg-gray-800">
          {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
        </Button>
        <Button variant="ghost" size="icon" className="h-12 w-12" onClick={skipToNext}>
          <SkipForward className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="h-12 w-12">
          <Repeat className="h-6 w-6" />
        </Button>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong.audioUrl || "https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3"}
        loop
        onEnded={() => togglePlayback()}
        onTimeUpdate={(e) => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime)
          }
        }}
      />
    </div>
  )
}

