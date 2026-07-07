import { useState, useEffect, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";

const STORAGE_KEY = "ai_consultation_session_token";
const CHAT_ENDPOINT = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-consultation-chat`;

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getOrCreateToken(): string {
  if (typeof window === "undefined") return "";
  let token = localStorage.getItem(STORAGE_KEY);
  if (!token || token.length < 32) {
    token = generateToken();
    localStorage.setItem(STORAGE_KEY, token);
  }
  return token;
}

export interface ConsultationState {
  unlocked: boolean;
  messagesUsed: number;
  paywallShown: boolean;
}

export function useAIConsultation(initialProblem?: string) {
  const [token, setToken] = useState<string>("");
  const [paywallVisible, setPaywallVisible] = useState(false);
  const [paywallError, setPaywallError] = useState<string | null>(null);

  useEffect(() => {
    setToken(getOrCreateToken());
  }, []);

  const transport = token
    ? new DefaultChatTransport({
        api: CHAT_ENDPOINT,
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          "x-session-token": token,
        },
      })
    : undefined;

  const chat = useChat({
    id: token || "pending",
    transport,
    onError: (err) => {
      // The AI SDK stringifies HTTP errors; try to detect paywall
      const msg = err?.message ?? "";
      if (msg.includes("paywall_required") || msg.includes("402")) {
        setPaywallVisible(true);
        setPaywallError(null);
      } else {
        setPaywallError("Errore di connessione. Riprova tra un momento.");
      }
    },
  });

  const send = useCallback(
    async (text: string, mediaUrls: string[] = []) => {
      if (!text.trim() && mediaUrls.length === 0) return;
      const parts: any[] = [];
      if (text.trim()) parts.push({ type: "text", text: text.trim() });
      for (const url of mediaUrls) {
        parts.push({
          type: "file",
          url,
          mediaType: url.match(/\.(mp4|mov|webm)/i) ? "video/mp4" : "image/jpeg",
        });
      }
      await chat.sendMessage({ parts } as any);
    },
    [chat],
  );

  const resetPaywall = () => {
    setPaywallVisible(false);
    setPaywallError(null);
  };

  const userMessageCount = (chat.messages as UIMessage[]).filter((m) => m.role === "user").length;

  return {
    token,
    messages: chat.messages as UIMessage[],
    status: chat.status,
    send,
    userMessageCount,
    paywallVisible,
    paywallError,
    resetPaywall,
    setPaywallVisible,
  };
}

export function getSessionToken(): string {
  return getOrCreateToken();
}
