import { NextResponse } from "next/server";

const PLAYLIST_ID = "5TkC5SPo8P9UE4SbGaptgh";

type SpotifyEmbedTrack = {
  audioPreview?: { url?: string };
  subtitle?: string;
  title?: string;
  uri?: string;
};

function extractTrackList(html: string): SpotifyEmbedTrack[] {
  const marker = '"trackList":';
  const markerIndex = html.indexOf(marker);

  if (markerIndex === -1) return [];

  const arrayStart = html.indexOf("[", markerIndex + marker.length);
  if (arrayStart === -1) return [];

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = arrayStart; index < html.length; index += 1) {
    const character = html[index];

    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }

    if (character === '"') inString = true;
    else if (character === "[") depth += 1;
    else if (character === "]") {
      depth -= 1;
      if (depth === 0) {
        return JSON.parse(html.slice(arrayStart, index + 1));
      }
    }
  }

  return [];
}

export async function GET() {
  try {
    const response = await fetch(
      `https://open.spotify.com/embed/playlist/${PLAYLIST_ID}`,
      { next: { revalidate: 300 } },
    );

    if (!response.ok) throw new Error("Spotify playlist request failed");

    const tracks = extractTrackList(await response.text()).map((track) => {
      const id = track.uri?.split(":").at(-1) ?? "";

      return {
        artist: track.subtitle ?? "Spotify",
        href: `https://open.spotify.com/track/${id}`,
        previewUrl: track.audioPreview?.url ?? null,
        title: track.title ?? "Untitled track",
      };
    });

    return NextResponse.json({
      playlistHref: `https://open.spotify.com/playlist/${PLAYLIST_ID}`,
      tracks,
    });
  } catch {
    return NextResponse.json(
      {
        playlistHref: `https://open.spotify.com/playlist/${PLAYLIST_ID}`,
        tracks: [],
      },
      { status: 502 },
    );
  }
}
