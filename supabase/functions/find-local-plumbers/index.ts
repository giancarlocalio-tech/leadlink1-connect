// Trova idraulici locali via Google Places API (v1 Places API - Text Search).
// Fallback quando l'AI non può risolvere il problema.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-session-token",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const { city, lat, lng } = await req.json();
    const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");
    if (!apiKey) {
      return json({ error: "google_places_not_configured", plumbers: [] }, 200);
    }

    const query = city ? `idraulico ${city}` : "idraulico vicino a me";
    const body: Record<string, unknown> = {
      textQuery: query,
      languageCode: "it",
      regionCode: "IT",
      maxResultCount: 5,
    };

    if (lat && lng) {
      body.locationBias = {
        circle: {
          center: { latitude: lat, longitude: lng },
          radius: 15000, // 15km
        },
      };
    }

    const resp = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.nationalPhoneNumber,places.internationalPhoneNumber,places.googleMapsUri,places.location,places.currentOpeningHours.openNow",
      },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("google_places_error", resp.status, errText);
      return json({ error: "google_places_failed", details: errText, plumbers: [] }, resp.status);
    }

    const data = await resp.json();
    const plumbers = (data.places ?? []).slice(0, 3).map((p: any) => ({
      name: p.displayName?.text ?? "Idraulico",
      address: p.formattedAddress ?? "",
      rating: p.rating ?? null,
      reviews: p.userRatingCount ?? 0,
      phone: p.nationalPhoneNumber ?? p.internationalPhoneNumber ?? null,
      mapsUri: p.googleMapsUri ?? null,
      openNow: p.currentOpeningHours?.openNow ?? null,
      location: p.location ?? null,
    }));

    return json({ plumbers });
  } catch (err) {
    console.error("find-local-plumbers error", err);
    return json({ error: "internal_error", message: (err as Error).message, plumbers: [] }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
