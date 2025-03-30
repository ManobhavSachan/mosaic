"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export default function SettingsView() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [volume, setVolume] = useState(80)
  const [quality, setQuality] = useState("high")

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>

      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Appearance</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Playback</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="volume">Volume</Label>
                <span>{volume}%</span>
              </div>
              <Slider
                id="volume"
                min={0}
                max={100}
                step={1}
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
              />
            </div>

            <div className="space-y-2">
              <Label>Audio Quality</Label>
              <div className="grid grid-cols-3 gap-2">
                {["low", "medium", "high"].map((q) => (
                  <Button
                    key={q}
                    variant={quality === q ? "default" : "outline"}
                    className={quality === q ? "bg-black text-white" : ""}
                    onClick={() => setQuality(q)}
                  >
                    {q.charAt(0).toUpperCase() + q.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Notifications</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Enable Notifications</Label>
            <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
          </div>
        </div>

        <div className="pt-4">
          <Button className="w-full bg-black text-white hover:bg-gray-800">Save Settings</Button>
        </div>
      </div>
    </div>
  )
}

