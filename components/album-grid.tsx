"use client"

import Image from "next/image"
import { useMusicPlayer } from "@/components/music-player"
import { mockAlbums } from "@/lib/mock-data"

export default function AlbumGrid() {
  const { setCurrentSong, togglePlayback, filteredAlbums } = useMusicPlayer()

  const handleAlbumClick = (albumId: string) => {
    // Find the first song from this album and play it
    const album = mockAlbums.find((a) => a.id === albumId)
    if (album && album.songs.length > 0) {
      setCurrentSong(album.songs[0])
      togglePlayback()
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {filteredAlbums.map((album) => (
        <div
          key={album.id}
          className="relative cursor-pointer transition-transform hover:scale-105"
          onClick={() => handleAlbumClick(album.id)}
        >
          <Image
            src="/cover.png"
            alt={album.title}
            width={200}
            height={200}
            className="w-full aspect-square object-cover rounded-lg"
          />
          <div className="mt-2">
            <h3 className="font-bold">{album.title}</h3>
            <p className="text-xs">by {album.artist}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

