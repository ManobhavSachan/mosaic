"use client"

import { Home, Heart, Music, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMusicPlayer } from "@/components/music-player"
import { cn } from "@/lib/utils"

export default function Sidebar() {
  const { currentView, setCurrentView } = useMusicPlayer()

  const navItems = [
    { icon: Home, view: "home" as const, label: "Home" },
    { icon: Heart, view: "favorites" as const, label: "Favorites" },
    { icon: Music, view: "queue" as const, label: "Queue" },
    { icon: Settings, view: "settings" as const, label: "Settings" },
  ]

  return (
    <div className="w-16 flex flex-col items-center gap-8 py-8 border-r border-gray-200 bg-gray-100">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <Button
            key={item.view}
            variant="ghost"
            size="icon"
            className={cn("rounded-full relative", currentView === item.view && "bg-gray-200")}
            onClick={() => setCurrentView(item.view)}
            title={item.label}
          >
            <Icon className="h-6 w-6" />
            {currentView === item.view && <span className="absolute -right-1 -top-1 w-3 h-3 bg-black rounded-full" />}
          </Button>
        )
      })}
    </div>
  )
}

