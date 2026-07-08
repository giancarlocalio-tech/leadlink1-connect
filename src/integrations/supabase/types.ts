export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_consultation_events: {
        Row: {
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          session_id: string | null
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          session_id?: string | null
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_consultation_events_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "ai_consultation_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_consultation_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          media_urls: string[] | null
          metadata: Json | null
          role: string
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          media_urls?: string[] | null
          metadata?: Json | null
          role: string
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          media_urls?: string[] | null
          metadata?: Json | null
          role?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_consultation_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "ai_consultation_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_consultation_sessions: {
        Row: {
          access_token: string
          amount_paid_cents: number | null
          created_at: string
          detected_city: string | null
          detected_problem: string | null
          id: string
          ip_hash: string | null
          last_activity_at: string
          messages_used: number
          paid_at: string | null
          referer: string | null
          stripe_session_id: string | null
          unlocked: boolean
          updated_at: string
          user_agent: string | null
          user_email: string | null
        }
        Insert: {
          access_token: string
          amount_paid_cents?: number | null
          created_at?: string
          detected_city?: string | null
          detected_problem?: string | null
          id?: string
          ip_hash?: string | null
          last_activity_at?: string
          messages_used?: number
          paid_at?: string | null
          referer?: string | null
          stripe_session_id?: string | null
          unlocked?: boolean
          updated_at?: string
          user_agent?: string | null
          user_email?: string | null
        }
        Update: {
          access_token?: string
          amount_paid_cents?: number | null
          created_at?: string
          detected_city?: string | null
          detected_problem?: string | null
          id?: string
          ip_hash?: string | null
          last_activity_at?: string
          messages_used?: number
          paid_at?: string | null
          referer?: string | null
          stripe_session_id?: string | null
          unlocked?: boolean
          updated_at?: string
          user_agent?: string | null
          user_email?: string | null
        }
        Relationships: []
      }
      email_logs: {
        Row: {
          created_at: string
          delivered_at: string | null
          email_type: string
          error_message: string | null
          id: string
          metadata: Json | null
          opened_at: string | null
          plumber_id: string | null
          recipient_email: string
          recipient_name: string | null
          request_id: string | null
          resend_email_id: string | null
          status: string
          subject: string
        }
        Insert: {
          created_at?: string
          delivered_at?: string | null
          email_type: string
          error_message?: string | null
          id?: string
          metadata?: Json | null
          opened_at?: string | null
          plumber_id?: string | null
          recipient_email: string
          recipient_name?: string | null
          request_id?: string | null
          resend_email_id?: string | null
          status?: string
          subject: string
        }
        Update: {
          created_at?: string
          delivered_at?: string | null
          email_type?: string
          error_message?: string | null
          id?: string
          metadata?: Json | null
          opened_at?: string | null
          plumber_id?: string | null
          recipient_email?: string
          recipient_name?: string | null
          request_id?: string | null
          resend_email_id?: string | null
          status?: string
          subject?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_request: {
        Args: { p_plumber_id: string; p_request_id: string }
        Returns: boolean
      }
      add_balance: {
        Args: {
          p_amount_cents: number
          p_description?: string
          p_plumber_id: string
          p_stripe_payment_id: string
        }
        Returns: {
          new_balance_cents: number
          success: boolean
        }[]
      }
      assign_request_to_plumber: {
        Args: { p_plumber_id: string; p_request_id: string }
        Returns: boolean
      }
      expire_old_requests: { Args: never; Returns: number }
      get_current_plumber_plan: {
        Args: never
        Returns: Database["public"]["Enums"]["subscription_plan"]
      }
      get_my_unlocked_requests: {
        Args: never
        Returns: {
          city: string
          client_email: string
          client_name: string
          client_phone: string
          description: string
          id: string
          intervention_type: string
          phone_contact_allowed: boolean
        }[]
      }
      get_next_eligible_plumber: {
        Args: {
          p_city: string
          p_request_id: string
          p_target_plan: string
          p_urgency: string
        }
        Returns: string
      }
      get_trial_available_requests: {
        Args: { p_plumber_id: string }
        Returns: {
          accessibility: Database["public"]["Enums"]["accessibility_type"]
          city: string
          created_at: string
          description: string
          id: string
          intervention_type: Database["public"]["Enums"]["intervention_type"]
          is_exclusive: boolean
          phone_contact_allowed: boolean
          property_type: Database["public"]["Enums"]["property_type"]
          urgency: Database["public"]["Enums"]["urgency_type"]
        }[]
      }
      handle_expired_assignment: {
        Args: { p_request_id: string }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_plumber: { Args: { _user_id: string }; Returns: boolean }
      is_request_visible_for_basic: {
        Args: { request_created_at: string; request_id: string }
        Returns: boolean
      }
      normalize_city_name: { Args: { p_city_name: string }; Returns: string }
      trial_claim_request: {
        Args: { p_plumber_id: string; p_request_id: string }
        Returns: {
          client_email: string
          client_name: string
          client_phone: string
          message: string
          success: boolean
        }[]
      }
      unlock_contact_with_balance: {
        Args: { p_plumber_id: string; p_request_id: string }
        Returns: {
          amount_spent_cents: number
          client_email: string
          client_name: string
          client_phone: string
          message: string
          new_balance_cents: number
          success: boolean
        }[]
      }
      unlock_contact_with_credits: {
        Args: { p_plumber_id: string; p_request_id: string }
        Returns: {
          client_email: string
          client_name: string
          client_phone: string
          credits_spent: number
          message: string
          new_balance: number
          success: boolean
        }[]
      }
    }
    Enums: {
      accessibility_type: "facile" | "media" | "difficile"
      app_role: "admin" | "plumber"
      availability_type: "giorni_feriali" | "weekend" | "emergenze"
      intervention_type:
        | "perdita_acqua"
        | "rubinetto_rotto"
        | "scarico_intasato"
        | "caldaia"
        | "altro"
        | "installazione_sostituzione"
        | "sturare_spurgo"
        | "riparazione"
        | "impianto_idraulico"
        | "box_doccia"
        | "impianto_riscaldamento"
        | "termoidraulico"
        | "condizionatori"
        | "ristrutturazione"
        | "certificazione"
        | "termosifone"
        | "contatore"
        | "addolcitore_acqua"
        | "depuratore_acqua"
        | "sostituzione_rubinetto"
      property_type: "casa" | "appartamento" | "negozio"
      request_status:
        | "new"
        | "assigned"
        | "accepted"
        | "expired"
        | "completed"
        | "canceled"
      subscription_plan: "basic" | "medium" | "premium"
      subscription_status: "active" | "cancelled" | "expired" | "pending"
      urgency_type: "subito" | "entro_24_ore" | "prossimi_giorni"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      accessibility_type: ["facile", "media", "difficile"],
      app_role: ["admin", "plumber"],
      availability_type: ["giorni_feriali", "weekend", "emergenze"],
      intervention_type: [
        "perdita_acqua",
        "rubinetto_rotto",
        "scarico_intasato",
        "caldaia",
        "altro",
        "installazione_sostituzione",
        "sturare_spurgo",
        "riparazione",
        "impianto_idraulico",
        "box_doccia",
        "impianto_riscaldamento",
        "termoidraulico",
        "condizionatori",
        "ristrutturazione",
        "certificazione",
        "termosifone",
        "contatore",
        "addolcitore_acqua",
        "depuratore_acqua",
        "sostituzione_rubinetto",
      ],
      property_type: ["casa", "appartamento", "negozio"],
      request_status: [
        "new",
        "assigned",
        "accepted",
        "expired",
        "completed",
        "canceled",
      ],
      subscription_plan: ["basic", "medium", "premium"],
      subscription_status: ["active", "cancelled", "expired", "pending"],
      urgency_type: ["subito", "entro_24_ore", "prossimi_giorni"],
    },
  },
} as const
