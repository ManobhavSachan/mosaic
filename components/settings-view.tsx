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
  const [autoplay, setAutoplay] = useState(true)
  const [equalizerPreset, setEqualizerPreset] = useState("custom")
  const [bassLevel, setBassLevel] = useState(70)
  const [trebleLevel, setTrebleLevel] = useState(60)

  return (
    <div className="p-4 w-full">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Appearance Section */}
          <section className="bg-white p-5 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <span className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center mr-2 text-sm">1</span>
              Appearance
            </h3>
            <div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                <div>
                  <Label htmlFor="dark-mode" className="text-base font-medium">Dark Mode</Label>
                  <p className="text-sm text-gray-500">Use dark theme for the application</p>
                </div>
                <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="bg-white p-5 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <span className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center mr-2 text-sm">4</span>
              Notifications
            </h3>
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
              <div>
                <Label htmlFor="notifications" className="text-base font-medium">Enable Notifications</Label>
                <p className="text-sm text-gray-500">Receive alerts about new releases and updates</p>
              </div>
              <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </section>
        </div>

        {/* Playback Section */}
        <section className="bg-white p-5 rounded-lg border">
          <h3 className="text-xl font-semibold mb-3 flex items-center">
            <span className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center mr-2 text-sm">2</span>
            Playback
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-2">
              <div>
                <Label htmlFor="volume" className="text-base font-medium">Volume</Label>
                <p className="text-sm text-gray-500">Control the default playback volume</p>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <Slider
                  id="volume"
                  min={0}
                  max={100}
                  step={1}
                  value={[volume]}
                  onValueChange={(value) => setVolume(value[0])}
                  className="flex-1"
                />
                <span className="text-base font-medium bg-gray-100 px-2 py-1 rounded-md min-w-[40px] text-center">{volume}%</span>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div>
                <Label className="text-base font-medium">Audio Quality</Label>
                <p className="text-sm text-gray-500 mb-2">Select your preferred streaming quality</p>
              </div>
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

            <div className="lg:col-span-1">
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                <div>
                  <Label htmlFor="autoplay" className="text-base font-medium">Autoplay</Label>
                  <p className="text-sm text-gray-500">Automatically play songs when selected</p>
                </div>
                <Switch id="autoplay" checked={autoplay} onCheckedChange={setAutoplay} />
              </div>
            </div>
          </div>
        </section>

        {/* Equalizer Section */}
        <section className="bg-white p-5 rounded-lg border">
          <h3 className="text-xl font-semibold mb-3 flex items-center">
            <span className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center mr-2 text-sm">3</span>
            Equalizer
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Label className="text-base font-medium">Equalizer Preset</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {["flat", "rock", "pop", "jazz", "classical", "custom"].map((preset) => (
                  <Button
                    key={preset}
                    variant={equalizerPreset === preset ? "default" : "outline"}
                    className={equalizerPreset === preset ? "bg-black text-white" : ""}
                    onClick={() => setEqualizerPreset(preset)}
                    size="sm"
                  >
                    {preset.charAt(0).toUpperCase() + preset.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <Label htmlFor="bass" className="text-base font-medium">Bass</Label>
                  <span className="text-sm font-medium bg-gray-100 px-2 py-0.5 rounded-md">{bassLevel}%</span>
                </div>
                <Slider
                  id="bass"
                  min={0}
                  max={100}
                  step={1}
                  value={[bassLevel]}
                  onValueChange={(value) => setBassLevel(value[0])}
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <Label htmlFor="treble" className="text-base font-medium">Treble</Label>
                  <span className="text-sm font-medium bg-gray-100 px-2 py-0.5 rounded-md">{trebleLevel}%</span>
                </div>
                <Slider
                  id="treble"
                  min={0}
                  max={100}
                  step={1}
                  value={[trebleLevel]}
                  onValueChange={(value) => setTrebleLevel(value[0])}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="py-4 flex gap-4 max-w-4xl mx-auto">
          <Button className="flex-1 bg-black text-white hover:bg-gray-800 py-4">Save Settings</Button>
          <Button className="flex-1 bg-gray-200 text-black hover:bg-gray-300 py-4" variant="outline">Reset to Default</Button>
        </div>
      </div>
    </div>
  )
}

