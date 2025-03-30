"use client"

import { Button } from "@/components/ui/button"
import { useMusicPlayer } from "@/components/music-player"
import { mockCategories } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function MusicCategories() {
  const { selectedCategory, setSelectedCategory } = useMusicPlayer()

  return (
    <div className="mb-8">
      <h2 className="text-4xl font-bold tracking-wider mb-2 font-['VT323', 'monospace']">Music</h2>
      <h2 className="text-4xl font-bold tracking-wider mb-4 font-['VT323', 'monospace']">Categories</h2>

      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {mockCategories.map((category) => (
            <Button
              key={category}
              className={cn(
                "rounded-full whitespace-nowrap",
                selectedCategory === category ? "bg-black text-white hover:bg-gray-800" : "",
              )}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        <a href="#" className="text-sm underline whitespace-nowrap ml-2">
          View all
        </a>
      </div>
    </div>
  )
}

