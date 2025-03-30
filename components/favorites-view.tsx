"use client"

import { useMusicPlayer } from "@/components/music-player"
import Image from "next/image"
import { Play, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function FavoritesView() {
  const { favoriteSongs, setCurrentSong, togglePlayback, toggleFavorite, isFavorite } = useMusicPlayer()

  const handleSongPlay = (songId: string) => {
    const song = favoriteSongs.find((s) => s.id === songId)
    if (song) {
      setCurrentSong(song)
      togglePlayback()
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Your Favorites</h2>

      {favoriteSongs.length > 0 ? (
        <div className="space-y-4">
          {favoriteSongs.map((song) => (
            <div key={song.id} className="flex items-center gap-4 p-3 hover:bg-gray-200 rounded-lg">
              <div className="w-12 h-12 relative">
                <Image
                  src="/cover.png"
                  alt={song.title}
                  width={48}
                  height={48}
                  className="rounded-md object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{song.title}</h3>
                <p className="text-sm text-gray-500">{song.artist}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(song.id)
                  }}
                >
                  <Heart className={cn("h-5 w-5", isFavorite(song.id) ? "fill-red-500 text-red-500" : "")} />
                </Button>
                <Button size="icon" variant="outline" className="rounded-full" onClick={() => handleSongPlay(song.id)}>
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-medium mb-2">No favorites yet</h3>
          <p className="text-gray-500">Click the heart icon on any song to add it to your favorites</p>
        </div>
      )}
    </div>
  )
}

