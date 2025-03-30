"use client"

import VinylPlayer from "@/components/vinyl-player"
import MusicCategories from "@/components/music-categories"
import AlbumGrid from "@/components/album-grid"
import PlaylistSection from "@/components/playlist-section"
import { useMusicPlayer } from "@/components/music-player"

export default function MainContent() {
  const { currentSong } = useMusicPlayer()

  return (
    <div className="flex p-6 gap-8">
      <VinylPlayer />
      <div className="flex-1">
        <MusicCategories />
        <AlbumGrid />
        <PlaylistSection />
      </div>
    </div>
  )
}

