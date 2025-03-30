"use client"

import { useState, useRef, useEffect } from "react"
import {
  Search,
  Home,
  Heart,
  Music,
  List,
  Tag,
  Mail,
  Bell,
  User,
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const duration = 215 // 3:35 in seconds
  const progressPercentage = (currentTime / duration) * 100

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error)
          setIsPlaying(false)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

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
  }, [isPlaying, currentTime, duration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 text-black">
      <div className="max-w-6xl mx-auto w-full bg-gray-100 rounded-lg shadow-lg p-6 font-mono">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold tracking-wider">MUSIC2D</h1>
          <div className="relative flex-1 mx-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input className="pl-10 bg-gray-200 border-gray-300 rounded-full" placeholder="Search for songs, artists" />
          </div>
          <div className="flex items-center gap-4">
            <Mail className="h-5 w-5" />
            <Bell className="h-5 w-5" />
            <div className="h-8 w-8 bg-gray-300 rounded-md flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-16 flex flex-col items-center gap-8">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Home className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Heart className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Music className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <List className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Tag className="h-6 w-6" />
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex gap-8">
              {/* Vinyl Player */}
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gray-300 rounded-lg shadow-md"></div>
                <div
                  className={`absolute inset-4 bg-gray-800 rounded-full ${isPlaying ? "animate-spin-slow" : ""}`}
                  style={{ animationDuration: "3s" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute inset-0 border-8 border-transparent rounded-full">
                    <div className="absolute inset-0 border border-gray-700 rounded-full"></div>
                    <div className="absolute inset-4 border border-gray-700 rounded-full"></div>
                    <div className="absolute inset-8 border border-gray-700 rounded-full"></div>
                    <div className="absolute inset-12 border border-gray-700 rounded-full"></div>
                    <div className="absolute inset-16 border border-gray-700 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute top-8 right-8 w-16 h-16">
                  <div className="absolute w-2 h-16 bg-gray-400 rounded-t-full origin-bottom -rotate-45 transform translate-x-6"></div>
                  <div className="absolute top-0 left-0 w-6 h-6 bg-gray-500 rounded-full"></div>
                </div>
              </div>

              {/* Right Content */}
              <div className="flex-1">
                <div className="mb-8">
                  <h2 className="text-4xl font-bold tracking-wider mb-2 font-['VT323', 'monospace']">Music</h2>
                  <h2 className="text-4xl font-bold tracking-wider mb-4 font-['VT323', 'monospace']">Categories</h2>

                  <div className="flex justify-between items-center mb-2">
                    <div className="flex gap-2">
                      <Button className="bg-black text-white rounded-full hover:bg-gray-800">Classic</Button>
                      <Button variant="outline" className="rounded-full">
                        90s
                      </Button>
                      <Button variant="outline" className="rounded-full">
                        New
                      </Button>
                      <Button variant="outline" className="rounded-full">
                        Instrumental
                      </Button>
                      <Button variant="outline" className="rounded-full">
                        Modern
                      </Button>
                    </div>
                    <a href="#" className="text-sm underline">
                      View all
                    </a>
                  </div>
                </div>

                {/* Album Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="relative">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="Album cover"
                      width={200}
                      height={200}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <div className="mt-2">
                      <h3 className="font-bold">Daily Chaos</h3>
                      <p className="text-xs">by Emily Bryan</p>
                    </div>
                  </div>
                  <div className="relative">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="Album cover"
                      width={200}
                      height={200}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <div className="mt-2">
                      <h3 className="font-bold">Simple Things</h3>
                      <p className="text-xs">by Ryan Poppin</p>
                    </div>
                  </div>
                  <div className="relative">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="Album cover"
                      width={200}
                      height={200}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <div className="mt-2">
                      <h3 className="font-bold">Not so good</h3>
                      <p className="text-xs">by Bryan Thomas</p>
                    </div>
                  </div>
                </div>

                {/* Favorite Playlists */}
                <div className="mb-4">
                  <h2 className="text-2xl font-bold tracking-wider mb-4 font-['VT323', 'monospace']">
                    Favorite Playlists (4)
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src="/placeholder.svg?height=64&width=64"
                        alt="Playlist cover"
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-lg"
                      />
                      <div>
                        <h3 className="font-bold">Best of Eren</h3>
                        <p className="text-xs">32 songs in this list</p>
                      </div>
                      <Button size="icon" variant="outline" className="ml-auto rounded-full">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <Image
                        src="/placeholder.svg?height=64&width=64"
                        alt="Playlist cover"
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-lg"
                      />
                      <div>
                        <h3 className="font-bold">Best of Eren</h3>
                        <p className="text-xs">32 songs in this list</p>
                      </div>
                      <Button size="icon" variant="outline" className="ml-auto rounded-full">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Now Playing */}
            <div className="mt-8">
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-4xl font-bold">The Suffering</h2>
                <div className="flex items-center gap-2">
                  <Button size="sm" className="bg-black text-white rounded-full hover:bg-gray-800">
                    Classic
                  </Button>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-xl">392</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-lg">{formatTime(currentTime)}</span>
                <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center" style={{ width: `${progressPercentage}%` }}>
                      {Array.from({ length: 40 }).map((_, i) => (
                        <div key={i} className="h-4 w-1.5 bg-black mx-0.5"></div>
                      ))}
                    </div>
                    <div className="absolute inset-0 flex items-center">
                      {Array.from({ length: 40 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-4 w-1.5 ${i < (progressPercentage / 100) * 40 ? "bg-black" : "bg-gray-300"} mx-0.5`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-lg">3:35</span>
              </div>

              {/* Controls */}
              <div className="flex justify-center items-center gap-12">
                <Button variant="ghost" size="icon" className="h-12 w-12">
                  <Shuffle className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="h-12 w-12">
                  <SkipBack className="h-6 w-6" />
                </Button>
                <Button
                  onClick={togglePlayback}
                  className="h-16 w-16 rounded-full bg-black text-white hover:bg-gray-800"
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-12 w-12">
                  <SkipForward className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="h-12 w-12">
                  <Repeat className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3"
        loop
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={(e) => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime)
          }
        }}
      />
    </div>
  )
}

