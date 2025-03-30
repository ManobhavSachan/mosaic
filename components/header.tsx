"use client"

import type React from "react"

import { Search, Bell, User, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useMusicPlayer } from "@/components/music-player"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockSongs } from "@/lib/mock-data"

export default function Header() {
  const {
    searchQuery,
    setSearchQuery,
    filteredSongs,
    setCurrentSong,
    showSearchModal,
    setShowSearchModal,
    showProfileModal,
    setShowProfileModal,
    showAlertsModal,
    setShowAlertsModal,
    addToQueue,
  } = useMusicPlayer()

  const handleSearchFocus = () => {
    setShowSearchModal(true)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSongSelect = (songId: string) => {
    const song = mockSongs.find((s) => s.id === songId)
    if (song) {
      setCurrentSong(song)
      setShowSearchModal(false)
      setSearchQuery("")
    }
  }

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <h1 className="text-2xl font-bold tracking-wider">MUSIC2D</h1>
      <div className="relative flex-1 mx-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          className="pl-10 bg-gray-200 border-gray-300 rounded-full"
          placeholder="Search for songs, artists"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
        />
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowAlertsModal(true)}>
          <Bell className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 bg-gray-300 rounded-md flex items-center justify-center"
          onClick={() => setShowProfileModal(true)}
        >
          <User className="h-5 w-5" />
        </Button>
      </div>

      {/* Search Modal */}
      <Dialog open={showSearchModal} onOpenChange={setShowSearchModal}>
        <DialogContent className="sm:max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Search Results</h2>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              className="pl-10 bg-gray-200 border-gray-300 rounded-full"
              placeholder="Search for songs, artists"
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
            />
          </div>
          {searchQuery ? (
            <div className="max-h-[60vh] overflow-auto">
              {filteredSongs.length > 0 ? (
                <ul className="space-y-2">
                  {filteredSongs.map((song) => (
                    <li
                      key={song.id}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer flex items-center gap-3"
                      onClick={() => handleSongSelect(song.id)}
                    >
                      <div className="w-10 h-10 bg-gray-300 rounded flex-shrink-0">
                        <img
                          src={song.coverUrl || "/placeholder.svg"}
                          alt={song.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{song.title}</p>
                        <p className="text-sm text-gray-500">{song.artist}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center py-4 text-gray-500">No results found</p>
              )}
            </div>
          ) : (
            <p className="text-center py-4 text-gray-500">Type to search</p>
          )}
        </DialogContent>
      </Dialog>

      {/* Profile Modal */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="sm:max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Profile</h2>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          <div className="flex flex-col items-center gap-4 py-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sXyGVjxcFfHzfj9NTVCwHzk6Xk5MiW.png" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-xl font-bold">User Name</h2>
              <p className="text-gray-500">user@example.com</p>
            </div>
            <div className="w-full space-y-2 mt-4">
              <Button className="w-full" variant="outline">
                Edit Profile
              </Button>
              <Button className="w-full" variant="outline">
                Settings
              </Button>
              <Button className="w-full" variant="outline">
                Sign Out
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Alerts Modal */}
      <Dialog open={showAlertsModal} onOpenChange={setShowAlertsModal}>
        <DialogContent className="sm:max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Notifications</h2>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          <div className="max-h-[60vh] overflow-auto">
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <p className="font-medium">New album released</p>
                <p className="text-sm text-gray-500">Check out the latest album from your favorite artist</p>
                <p className="text-xs text-gray-400 mt-2">2 hours ago</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Playlist updated</p>
                <p className="text-sm text-gray-500">Your weekly playlist has been updated with new tracks</p>
                <p className="text-xs text-gray-400 mt-2">Yesterday</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Friend activity</p>
                <p className="text-sm text-gray-500">Ryan is now following your playlist</p>
                <p className="text-xs text-gray-400 mt-2">3 days ago</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

