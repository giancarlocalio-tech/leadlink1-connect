import { useRef, useState } from 'react';
import { Camera, X, Loader2, ImagePlus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PhotoUploaderProps {
  photos: string[];
  onChange: (urls: string[]) => void;
  maxPhotos?: number;
}

const MAX_DIM = 1280;
const JPEG_QUALITY = 0.82;

async function compressImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = (e) => {
      img.onload = () => {
        let { width, height } = img;
        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height / width) * MAX_DIM);
            width = MAX_DIM;
          } else {
            width = Math.round((width / height) * MAX_DIM);
            height = MAX_DIM;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas non disponibile'));
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error('Compressione fallita'))),
          'image/jpeg',
          JPEG_QUALITY,
        );
      };
      img.onerror = () => reject(new Error('Immagine non valida'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Lettura file fallita'));
    reader.readAsDataURL(file);
  });
}

export function PhotoUploader({ photos, onChange, maxPhotos = 3 }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const remaining = maxPhotos - photos.length;
    if (remaining <= 0) {
      toast.error(`Massimo ${maxPhotos} foto.`);
      return;
    }
    const list = Array.from(files).slice(0, remaining);
    setUploading(true);

    try {
      const { data: userData } = await supabase.auth.getUser();
      const folder = userData?.user?.id ?? 'anonymous';
      const newUrls: string[] = [];

      for (const file of list) {
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name}: non è un'immagine.`);
          continue;
        }
        const compressed = await compressImage(file);
        const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
        const { error: upErr } = await supabase.storage
          .from('request-photos')
          .upload(path, compressed, { contentType: 'image/jpeg', upsert: false });
        if (upErr) {
          console.error(upErr);
          toast.error(`Upload fallito: ${upErr.message}`);
          continue;
        }
        const { data: signed } = await supabase.storage
          .from('request-photos')
          .createSignedUrl(path, 60 * 60 * 24 * 7); // 7 giorni
        if (signed?.signedUrl) newUrls.push(signed.signedUrl);
      }

      if (newUrls.length > 0) {
        onChange([...photos, ...newUrls]);
      }
    } catch (e: any) {
      toast.error(e?.message || 'Errore upload');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const removePhoto = (idx: number) => {
    const next = photos.filter((_, i) => i !== idx);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        capture="environment"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {photos.map((url, idx) => (
            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-border bg-muted">
              <img src={url} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(idx)}
                className="absolute top-1 right-1 bg-background/90 rounded-full p-1 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                aria-label="Rimuovi foto"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {photos.length < maxPhotos && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full p-4 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-accent/30 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Caricamento…
            </>
          ) : photos.length === 0 ? (
            <>
              <Camera className="h-4 w-4" />
              Aggiungi foto del problema (opzionale)
            </>
          ) : (
            <>
              <ImagePlus className="h-4 w-4" />
              Aggiungi un'altra foto ({photos.length}/{maxPhotos})
            </>
          )}
        </button>
      )}

      <p className="text-xs text-muted-foreground">
        📸 Le foto aiutano l'AI a darti una stima più precisa e l'idraulico arriverà preparato.
      </p>
    </div>
  );
}
