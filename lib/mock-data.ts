export type Song = {
  id: string
  title: string
  artist: string
  album: string
  duration: number
  category: string
  likes: number
  audioUrl: string
  coverUrl: string
}

export type Album = {
  id: string
  title: string
  artist: string
  coverUrl: string
  songs: Song[]
}

export type Playlist = {
  id: string
  title: string
  coverUrl: string
  songs: Song[]
}

// Mock songs data
export const mockSongs: Song[] = [
  {
    id: "song1",
    title: "The Suffering",
    artist: "Emily Bryan",
    album: "Daily Chaos",
    duration: 15, // 3:35
    category: "Classic",
    likes: 392,
    audioUrl: "https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3",
    coverUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sXyGVjxcFfHzfj9NTVCwHzk6Xk5MiW.png",
  },
  {
    id: "song2",
    title: "Midnight Dreams",
    artist: "Ryan Poppin",
    album: "Simple Things",
    duration: 15, // 3:03
    category: "90s",
    likes: 245,
    audioUrl: "https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3",
    coverUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sXyGVjxcFfHzfj9NTVCwHzk6Xk5MiW.png",
  },
  {
    id: "song3",
    title: "Lost in Time",
    artist: "Bryan Thomas",
    album: "Not so good",
    duration: 15, // 3:17
    category: "New",
    likes: 178,
    audioUrl: "https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3",
    coverUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sXyGVjxcFfHzfj9NTVCwHzk6Xk5MiW.png",
  },
  {
    id: "song4",
    title: "Echoes of Yesterday",
    artist: "Emily Bryan",
    album: "Daily Chaos",
    duration: 15, // 3:44
    category: "Classic",
    likes: 312,
    audioUrl: "https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3",
    coverUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sXyGVjxcFfHzfj9NTVCwHzk6Xk5MiW.png",
  },
  {
    id: "song5",
    title: "Neon Lights",
    artist: "Ryan Poppin",
    album: "Simple Things",
    duration: 15, // 3:21
    category: "90s",
    likes: 267,
    audioUrl: "https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3",
    coverUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sXyGVjxcFfHzfj9NTVCwHzk6Xk5MiW.png",
  },
  {
    id: "song6",
    title: "Whispers in the Dark",
    artist: "Bryan Thomas",
    album: "Not so good",
    duration: 15, // 3:09
    category: "Instrumental",
    likes: 156,
    audioUrl: "https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3",
    coverUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sXyGVjxcFfHzfj9NTVCwHzk6Xk5MiW.png",
  },
]

// Mock albums data
export const mockAlbums: Album[] = [
  {
    id: "album1",
    title: "Daily Chaos",
    artist: "Emily Bryan",
    coverUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sXyGVjxcFfHzfj9NTVCwHzk6Xk5MiW.png",
    songs: mockSongs.filter((song) => song.album === "Daily Chaos"),
  },
  {
    id: "album2",
    title: "Simple Things",
    artist: "Ryan Poppin",
    coverUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sXyGVjxcFfHzfj9NTVCwHzk6Xk5MiW.png",
    songs: mockSongs.filter((song) => song.album === "Simple Things"),
  },
  {
    id: "album3",
    title: "Not so good",
    artist: "Bryan Thomas",
    coverUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sXyGVjxcFfHzfj9NTVCwHzk6Xk5MiW.png",
    songs: mockSongs.filter((song) => song.album === "Not so good"),
  },
]

// Mock playlists data
export const mockPlaylists: Playlist[] = [
  {
    id: "playlist1",
    title: "Best of Eren",
    coverUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sXyGVjxcFfHzfj9NTVCwHzk6Xk5MiW.png",
    songs: mockSongs.slice(0, 3),
  },
  {
    id: "playlist2",
    title: "Chill Vibes",
    coverUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sXyGVjxcFfHzfj9NTVCwHzk6Xk5MiW.png",
    songs: mockSongs.slice(2, 5),
  },
]

// Mock categories
export const mockCategories = ["Classic", "90s", "New", "Instrumental", "Modern", "Pop", "Rock", "Jazz"]

