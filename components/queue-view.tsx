"use client"

import { useMusicPlayer } from "@/components/music-player"
import Image from "next/image"
import { Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function QueueView() {
  const { queue, currentSong, setCurrentSong, togglePlayback, removeFromQueue } = useMusicPlayer()

  const handleSongPlay = (songId: string) => {
    const song = queue.find((s) => s.id === songId)
    if (song) {
      setCurrentSong(song)
      togglePlayback()
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Queue</h2>

      {queue.length > 0 ? (
        <div className="space-y-4">
          {queue.map((song, index) => (
            <div
              key={`${song.id}-${index}`}
              className={`flex items-center gap-4 p-3 rounded-lg ${
                currentSong?.id === song.id ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              <div className="w-12 h-12 relative">
                <Image
                  src={song.coverUrl || "/placeholder.svg"}
                  alt={song.title}
                  width={48}
                  height={48}
                  className="rounded-md object-cover"
                />
                {currentSong?.id === song.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-md">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{song.title}</h3>
                <p className="text-sm text-gray-500">{song.artist}</p>
              </div>
              <div className="flex items-center gap-2">
                {currentSong?.id !== song.id && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFromQueue(song.id)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full"
                      onClick={() => handleSongPlay(song.id)}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </>
                )}
                {currentSong?.id === song.id && (
                  <span className="text-xs font-medium bg-black text-white px-2 py-1 rounded-full">Now Playing</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Play className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-medium mb-2">Queue is empty</h3>
          <p className="text-gray-500">Add songs to your queue to listen to them in sequence</p>
        </div>
      )}
    </div>
  )
}

