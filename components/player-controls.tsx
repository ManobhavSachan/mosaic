"use client"

import type React from "react"
import { useState } from "react"

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
  const [isShuffleActive, setIsShuffleActive] = useState(false);
  const [isRepeatActive, setIsRepeatActive] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Audio playback failed:", error);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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
              <Heart className={cn("h-5 w-5", isFavorite(currentSong.id) ? "fill-black text-black" : "")} />
            </Button>
            {/* <span className="text-xl">{currentSong.likes}</span> */}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-4">
          <span className="text-lg w-[50px] text-left">{formatTime(currentTime)}</span>
          <div
            className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden cursor-pointer relative"
            onClick={handleProgressClick}
            ref={progressRef}
          >
            <div 
              className="h-full bg-black rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-lg w-[50px] text-right">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-12">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-12 w-12 relative"
          onClick={() => setIsShuffleActive(!isShuffleActive)}
        >
          <Shuffle className={cn("h-6 w-6", isShuffleActive ? "text-black" : "text-gray-500")} />
          {isShuffleActive && <span className="absolute bottom-0 w-1.5 h-1.5 bg-black rounded-full" />}
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
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-12 w-12 relative"
          onClick={() => setIsRepeatActive(!isRepeatActive)}
        >
          <Repeat className={cn("h-6 w-6", isRepeatActive ? "text-black" : "text-gray-500")} />
          {isRepeatActive && <span className="absolute bottom-0 w-1.5 h-1.5 bg-black rounded-full" />}
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
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        preload="metadata"
      />
    </div>
  )
}

