import musicConfig from "../data/music.json";
import playlistTracks from "../data/playlistTracks.json";
import type { CoverflowSlide } from "@/components/ui/CoverflowCarousel";

export async function getPlaylistSlides(): Promise<{ playlistTitle: string; slides: CoverflowSlide[] }> {
  const playlistUrl = musicConfig.playlistUrl;
  const playlistTitle = musicConfig.playlistTitle || "walk to your bike pause sigh cut to ride type shit";

  try {
    const res = await fetch(playlistUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (res.ok) {
      const html = await res.text();
      const scriptMatch = html.match(/<script id="serialized-server-data" type="application\/json">([\s\S]*?)<\/script>/i);
      
      if (scriptMatch) {
        const parsed = JSON.parse(scriptMatch[1]);
        const sections = parsed?.data?.['0']?.data?.sections || [];
        const trackSection = sections.find((s: any) => s.id && s.id.startsWith('track-list'));

        if (trackSection && trackSection.items && trackSection.items.length > 0) {
          const liveSlides: CoverflowSlide[] = trackSection.items.map((item: any) => {
            const title = item.title || "Untitled Track";
            const artist = item.artistName || "Unknown Artist";
            
            let coverUrl = "";
            if (item.artwork?.dictionary?.url) {
              coverUrl = item.artwork.dictionary.url
                .replace('{w}', '1000')
                .replace('{h}', '1000')
                .replace('{f}', 'jpg');
            }

            const songUrl = item.contentDescriptor?.url || playlistUrl;
            const songId = item.contentDescriptor?.identifiers?.storeAdamID;
            const previewUrl = songId 
              ? `https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview/v4/item/${songId}.mp4a`
              : undefined;

            return {
              src: coverUrl,
              alt: `${title} by ${artist}`,
              title: title,
              subtitle: artist,
              appleMusicUrl: songUrl,
              previewUrl: previewUrl,
              meta: [
                { label: "TRACK", value: title },
                { label: "ARTIST", value: artist }
              ]
            };
          }).filter((s: CoverflowSlide) => Boolean(s.src && s.title));

          if (liveSlides.length > 0) {
            return { playlistTitle, slides: liveSlides };
          }
        }
      }
    }
  } catch (err) {
    console.warn("[AppleMusic] Live fetch notice, defaulting to cached playlist tracks:", err);
  }

  // Pre-extracted 54 tracks from playlist: pl.u-76oNkyyFv1dGKqg
  return {
    playlistTitle,
    slides: playlistTracks as CoverflowSlide[]
  };
}
