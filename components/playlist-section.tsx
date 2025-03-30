"use client"

import Image from "next/image"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMusicPlayer } from "@/components/music-player"
import { mockPlaylists } from "@/lib/mock-data"

export default function PlaylistSection() {
  const { setCurrentSong, togglePlayback } = useMusicPlayer()

  const handlePlaylistClick = (playlistId: string) => {
    // Find the first song from this playlist and play it
    const playlist = mockPlaylists.find((p) => p.id === playlistId)
    if (playlist && playlist.songs.length > 0) {
      setCurrentSong(playlist.songs[0])
      togglePlayback()
    }
  }

  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold tracking-wider mb-4 font-['VT323', 'monospace']">
        Favorite Playlists ({mockPlaylists.length})
      </h2>

      <div className="space-y-4">
        {mockPlaylists.map((playlist) => (
          <div key={playlist.id} className="flex items-center gap-4">
            <Image
              src="/cover.png"
              alt={playlist.title}
              width={64}
              height={64}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-bold">{playlist.title}</h3>
              <p className="text-xs">{playlist.songs.length} songs in this list</p>
            </div>
            <Button
              size="icon"
              variant="outline"
              className="ml-auto rounded-full"
              onClick={() => handlePlaylistClick(playlist.id)}
            >
              <Play className="h-6 w-6" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

