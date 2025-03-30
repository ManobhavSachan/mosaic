"use client"

import { useState, createContext, useContext, useEffect } from "react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import MainContent from "@/components/main-content"
import QueueView from "@/components/queue-view"
import FavoritesView from "@/components/favorites-view"
import SettingsView from "@/components/settings-view"
import PlayerControls from "@/components/player-controls"
import { type Song, mockSongs, type Album, mockAlbums } from "@/lib/mock-data"

export type View = "home" | "favorites" | "queue" | "settings"

// Create context for music player state
export type MusicPlayerContextType = {
  currentSong: Song | null
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
  setCurrentSong: (song: Song | null) => void
  togglePlayback: () => void
  currentTime: number
  setCurrentTime: (time: number) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  filteredSongs: Song[]
  showSearchModal: boolean
  setShowSearchModal: (show: boolean) => void
  showProfileModal: boolean
  setShowProfileModal: (show: boolean) => void
  showAlertsModal: boolean
  setShowAlertsModal: (show: boolean) => void
  currentView: View
  setCurrentView: (view: View) => void
  favoriteIds: Set<string>
  toggleFavorite: (songId: string) => void
  isFavorite: (songId: string) => boolean
  favoriteSongs: Song[]
  queue: Song[]
  addToQueue: (song: Song) => void
  removeFromQueue: (songId: string) => void
  skipToNext: () => void
  skipToPrevious: () => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  filteredAlbums: Album[]
}

export const MusicPlayerContext = createContext<MusicPlayerContextType | null>(null)

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext)
  if (!context) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider")
  }
  return context
}

export default function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState<Song | null>(mockSongs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showAlertsModal, setShowAlertsModal] = useState(false)
  const [currentView, setCurrentView] = useState<View>("home")
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())
  const [queue, setQueue] = useState<Song[]>([])
  const [selectedCategory, setSelectedCategory] = useState("Classic")

  // Initialize queue with current song
  useEffect(() => {
    if (currentSong && queue.length === 0) {
      setQueue([currentSong])
    }
  }, [currentSong, queue.length])

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleFavorite = (songId: string) => {
    setFavoriteIds((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(songId)) {
        newFavorites.delete(songId)
      } else {
        newFavorites.add(songId)
      }
      return newFavorites
    })
  }

  const isFavorite = (songId: string) => {
    return favoriteIds.has(songId)
  }

  const favoriteSongs = mockSongs.filter((song) => favoriteIds.has(song.id))

  const addToQueue = (song: Song) => {
    setQueue((prev) => [...prev, song])
  }

  const removeFromQueue = (songId: string) => {
    setQueue((prev) => prev.filter((song) => song.id !== songId))
  }

  const skipToNext = () => {
    if (queue.length <= 1) return

    const currentIndex = queue.findIndex((song) => song.id === currentSong?.id)
    if (currentIndex === -1 || currentIndex === queue.length - 1) return

    setCurrentSong(queue[currentIndex + 1])
    setCurrentTime(0)
  }

  const skipToPrevious = () => {
    if (queue.length <= 1) return

    const currentIndex = queue.findIndex((song) => song.id === currentSong?.id)
    if (currentIndex <= 0) return

    setCurrentSong(queue[currentIndex - 1])
    setCurrentTime(0)
  }

  const filteredSongs = searchQuery
    ? mockSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : []

  const filteredAlbums =
    selectedCategory === "All"
      ? mockAlbums
      : mockAlbums.filter((album) => album.songs.some((song) => song.category === selectedCategory))

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        setIsPlaying,
        setCurrentSong,
        togglePlayback,
        currentTime,
        setCurrentTime,
        searchQuery,
        setSearchQuery,
        filteredSongs,
        showSearchModal,
        setShowSearchModal,
        showProfileModal,
        setShowProfileModal,
        showAlertsModal,
        setShowAlertsModal,
        currentView,
        setCurrentView,
        favoriteIds,
        toggleFavorite,
        isFavorite,
        favoriteSongs,
        queue,
        addToQueue,
        removeFromQueue,
        skipToNext,
        skipToPrevious,
        selectedCategory,
        setSelectedCategory,
        filteredAlbums,
      }}
    >
      <div className="flex flex-col h-screen bg-gray-100 text-black overflow-hidden">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <div className="flex-1 overflow-auto">
              {currentView === "home" && <MainContent />}
              {currentView === "favorites" && <FavoritesView />}
              {currentView === "queue" && <QueueView />}
              {currentView === "settings" && <SettingsView />}
            </div>
            <PlayerControls />
          </div>
        </div>
      </div>
    </MusicPlayerContext.Provider>
  )
}

