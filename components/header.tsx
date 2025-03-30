"use client"

import type React from "react"

import { Search, Bell, User, X, LogOut } from "lucide-react"
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
      <h1 className="text-2xl font-bold tracking-wider">MOSAIC</h1>
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
          className="p-0 rounded-full"
          onClick={() => setShowProfileModal(true)}
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sXyGVjxcFfHzfj9NTVCwHzk6Xk5MiW.png" className="object-cover" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
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
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Your Profile</h2>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Left Column - Avatar and Basic Info */}
            <div className="col-span-1 flex flex-col items-center justify-center">
              <div className="relative group">
                <Avatar className="h-28 w-28 border-2 border-black shadow-md">
                  <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sXyGVjxcFfHzfj9NTVCwHzk6Xk5MiW.png" className="object-cover" />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                  <Button variant="ghost" size="sm" className="text-white text-xs">
                    Change
                  </Button>
                </div>
              </div>
              
              <div className="text-center mt-4">
                <h2 className="text-xl font-bold">Alex Morgan</h2>
                <p className="text-gray-500">alex@example.com</p>
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-black rounded-full mt-2">
                  <span className="text-xs font-semibold text-white">FREE TIER</span>
                </div>
              </div>
              
              {/* <div className="mt-12 w-full">
                <Button className="w-full bg-black text-white hover:bg-gray-800">
                  Upgrade to Premium
                </Button>
              </div> */}
            </div>
            
            {/* Middle Column - Stats and Account */}
            <div className="col-span-2">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">LISTENING STATS</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded border flex flex-col items-center">
                    <p className="text-xs text-gray-500">Top Genre</p>
                    <p className="font-semibold text-lg">Classic</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border flex flex-col items-center">
                    <p className="text-xs text-gray-500">Total Hours</p>
                    <p className="font-semibold text-lg">17.5</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border flex flex-col items-center">
                    <p className="text-xs text-gray-500">Top Artist</p>
                    <p className="font-semibold text-lg truncate">Beethoven</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4 border-t border-b py-4">
                <div className="text-center flex-1">
                  <p className="font-bold text-xl">128</p>
                  <p className="text-xs text-gray-500">Following</p>
                </div>
                <div className="h-12 w-px bg-gray-200"></div>
                <div className="text-center flex-1">
                  <p className="font-bold text-xl">1.5K</p>
                  <p className="text-xs text-gray-500">Followers</p>
                </div>
                <div className="h-12 w-px bg-gray-200"></div>
                <div className="text-center flex-1">
                  <p className="font-bold text-xl">42</p>
                  <p className="text-xs text-gray-500">Playlists</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">ACCOUNT SETTINGS</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button className="justify-start" variant="outline">
                    <User className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button className="justify-start" variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </Button>
                  <Button className="justify-start" variant="outline">
                    <Search className="h-4 w-4 mr-2" />
                    Privacy
                  </Button>
                  <Button className="justify-start" variant="outline">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Alerts Modal */}
      <Dialog open={showAlertsModal} onOpenChange={setShowAlertsModal}>
        <DialogContent className="sm:max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </h2>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          
          <div className="flex gap-2 mb-4">
            <Button variant="ghost" className="flex-1 bg-gray-100 hover:bg-gray-200">All</Button>
            <Button variant="ghost" className="flex-1">Unread</Button>
            <Button variant="ghost" className="flex-1">Mentions</Button>
          </div>
          
          <div className="max-h-[60vh] overflow-auto">
            <div className="space-y-4">
              <div className="p-3 border rounded-lg bg-gray-50 relative hover:bg-gray-100 transition-colors">
                <div className="absolute top-3 right-3 h-2 w-2 bg-blue-500 rounded-full"></div>
                <p className="font-medium">New album released</p>
                <p className="text-sm text-gray-500">Check out the latest album from your favorite artist</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-400">2 hours ago</p>
                  <Button variant="ghost" size="sm" className="h-6 text-xs hover:bg-gray-200">
                    Mark as read
                  </Button>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg relative hover:bg-gray-100 transition-colors">
                <p className="font-medium">Playlist updated</p>
                <p className="text-sm text-gray-500">Your weekly playlist has been updated with new tracks</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-400">Yesterday</p>
                  <Button variant="ghost" size="sm" className="h-6 text-xs hover:bg-gray-200">
                    Mark as read
                  </Button>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg relative hover:bg-gray-100 transition-colors">
                <p className="font-medium">Friend activity</p>
                <p className="text-sm text-gray-500">Ryan is now following your playlist</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-400">3 days ago</p>
                  <Button variant="ghost" size="sm" className="h-6 text-xs hover:bg-gray-200">
                    Mark as read
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <Button variant="outline" size="sm" className="w-full">
              View all notifications
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

