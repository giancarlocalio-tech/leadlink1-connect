import { useEffect, useState } from "react";
import { Loader2, ImageIcon } from "lucide-react";

const CACHE = new Map<string, string>();
const ENDPOINT = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-consultation-image`;

interface Props {
  prompt: string;
}

export function AIGeneratedImage({ prompt }: Props) {
  const [url, setUrl] = useState<string | null>(CACHE.get(prompt) ?? null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(!CACHE.has(prompt));

  useEffect(() => {
    if (CACHE.has(prompt)) return;
    let alive = true;
    setLoading(true);
    (async () => {
      try {
        const resp = await fetch(ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ prompt }),
        });
        const data = await resp.json();
        if (!alive) return;
        if (!resp.ok || !data.imageUrl) {
          setError(true);
        } else {
          CACHE.set(prompt, data.imageUrl);
          setUrl(data.imageUrl);
        }
      } catch {
        if (alive) setError(true);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [prompt]);

  if (error) return null;

  return (
    <figure className="my-3 rounded-xl overflow-hidden border bg-muted/40">
      {loading || !url ? (
        <div className="aspect-[4/3] flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-xs">Sto disegnando uno schema…</span>
        </div>
      ) : (
        <img src={url} alt={prompt} loading="lazy" className="w-full h-auto block" />
      )}
      <figcaption className="text-[11px] text-muted-foreground px-3 py-1.5 flex items-center gap-1.5 border-t bg-background">
        <ImageIcon className="w-3 h-3" />
        Schema generato dall'AI · {prompt}
      </figcaption>
    </figure>
  );
}
