import musicData from "../data/music.json";
import type { CoverflowSlide } from "@/components/ui/CoverflowCarousel";

export const PLAYLIST_TITLE = musicData.playlistTitle;
export const PLAYLIST_EMBED_URL = (musicData as any).playlistEmbedUrl || musicData.playlistUrl;

const rawSlides = (musicData as any).slides || (musicData as any).tracks || [];

export const APPLE_MUSIC_JUKEBOX_SLIDES: CoverflowSlide[] = rawSlides.map((s: any) => ({
  src: s.coverUrl || s.artworkUrl || "",
  alt: `${s.title} by ${s.artist}`,
  title: s.title,
  subtitle: s.artist,
  appleMusicUrl: s.appleMusicUrl || s.url || "",
  meta: [
    ...(s.year ? [{ label: "YEAR", value: s.year }] : []),
    ...(s.genre ? [{ label: "GENRE", value: s.genre }] : [])
  ]
}));
