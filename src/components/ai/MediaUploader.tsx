import { useRef, useState } from "react";
import { Loader2, Paperclip, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getSessionToken } from "@/hooks/useAIConsultation";

interface UploadedMedia {
  url: string;
  name: string;
  isVideo: boolean;
}

interface Props {
  onChange: (urls: string[]) => void;
  disabled?: boolean;
}

const MAX_SIZE = 20 * 1024 * 1024;

export function MediaUploader({ onChange, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [items, setItems] = useState<UploadedMedia[]>([]);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (file.size > MAX_SIZE) {
      toast.error("File troppo grande. Max 20 MB.");
      return;
    }
    setUploading(true);
    try {
      const token = getSessionToken();
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/upload-consultation-media`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            "x-session-token": token,
          },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type,
            size: file.size,
          }),
        },
      );
      const data = await resp.json();
      if (!resp.ok || !data.uploadUrl) {
        toast.error(data.error === "unsupported_type" ? "Formato non supportato" : "Upload fallito");
        return;
      }
      const putResp = await fetch(data.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!putResp.ok) {
        toast.error("Upload fallito");
        return;
      }
      const isVideo = file.type.startsWith("video/");
      const next = [...items, { url: data.publicUrl, name: file.name, isVideo }];
      setItems(next);
      onChange(next.map((i) => i.url));
    } catch (e) {
      console.error(e);
      toast.error("Errore durante l'upload");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function remove(idx: number) {
    const next = items.filter((_, i) => i !== idx);
    setItems(next);
    onChange(next.map((i) => i.url));
  }

  return (
    <div className="flex flex-col gap-2">
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {items.map((m, idx) => (
            <div key={idx} className="relative group">
              {m.isVideo ? (
                <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-xs">
                  🎥
                </div>
              ) : (
                <img src={m.url} alt={m.name} className="w-16 h-16 rounded-lg object-cover" />
              )}
              <button
                type="button"
                onClick={() => remove(idx)}
                className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/mp4,video/quicktime,video/webm"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          disabled={disabled || uploading}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={disabled || uploading}
          className="gap-2"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Paperclip className="w-4 h-4" />}
          {uploading ? "Carico..." : "Foto o video"}
        </Button>
      </div>
    </div>
  );
}
