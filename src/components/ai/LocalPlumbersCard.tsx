import { useState } from "react";
import { Phone, Star, MapPin, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Plumber {
  name: string;
  address: string;
  rating: number | null;
  reviews: number;
  phone: string | null;
  mapsUri: string | null;
  openNow: boolean | null;
}

interface Props {
  defaultCity?: string;
}

export function LocalPlumbersCard({ defaultCity }: Props) {
  const [city, setCity] = useState(defaultCity ?? "");
  const [plumbers, setPlumbers] = useState<Plumber[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function search(customLat?: number, customLng?: number) {
    if (!customLat && !city.trim()) {
      toast.error("Inserisci la tua città");
      return;
    }
    setLoading(true);
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/find-local-plumbers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            city: customLat ? null : city.trim(),
            lat: customLat,
            lng: customLng,
          }),
        },
      );
      const data = await resp.json();
      if (data.error === "google_places_not_configured") {
        toast.error("Ricerca idraulici non disponibile al momento");
        return;
      }
      setPlumbers(data.plumbers ?? []);
    } catch (e) {
      toast.error("Errore ricerca idraulici");
    } finally {
      setLoading(false);
    }
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      toast.error("Geolocalizzazione non disponibile");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => search(pos.coords.latitude, pos.coords.longitude),
      () => toast.error("Non riesco ad accedere alla tua posizione"),
    );
  }

  return (
    <div className="rounded-2xl border bg-card p-5 my-4">
      <h3 className="font-bold text-lg mb-2">Trova un idraulico vicino a te</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Cerchiamo idraulici reali su Google, con recensioni e telefono per chiamarli subito.
      </p>

      {!plumbers && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="La tua città (es. Milano)"
              className="flex-1 px-3 py-2 rounded-lg border bg-background text-sm"
            />
            <Button onClick={() => search()} disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Cerca"}
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={useMyLocation} disabled={loading} className="w-full gap-2">
            <MapPin className="w-4 h-4" />
            Usa la mia posizione
          </Button>
        </div>
      )}

      {plumbers && plumbers.length === 0 && (
        <p className="text-sm text-muted-foreground">Nessun idraulico trovato per questa zona.</p>
      )}

      {plumbers && plumbers.length > 0 && (
        <div className="space-y-3">
          {plumbers.map((p, idx) => (
            <div key={idx} className="rounded-xl border bg-background p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold leading-tight">{p.name}</h4>
                {p.openNow != null && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.openNow ? "bg-primary/10 text-primary" : "bg-muted"}`}>
                    {p.openNow ? "Aperto ora" : "Chiuso"}
                  </span>
                )}
              </div>
              {p.rating != null && (
                <div className="flex items-center gap-1 text-sm mb-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{p.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({p.reviews} recensioni)</span>
                </div>
              )}
              <p className="text-xs text-muted-foreground mb-3 flex items-start gap-1">
                <MapPin className="w-3 h-3 shrink-0 mt-0.5" />
                {p.address}
              </p>
              <div className="flex flex-wrap gap-2">
                {p.phone && (
                  <a href={`tel:${p.phone}`} className="flex-1">
                    <Button className="w-full gap-2" size="sm">
                      <Phone className="w-4 h-4" />
                      {p.phone}
                    </Button>
                  </a>
                )}
                {p.mapsUri && (
                  <a href={p.mapsUri} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Maps
                    </Button>
                  </a>
                )}
              </div>
            </div>
          ))}
          <Button variant="ghost" size="sm" onClick={() => setPlumbers(null)} className="w-full">
            Nuova ricerca
          </Button>
        </div>
      )}
    </div>
  );
}
