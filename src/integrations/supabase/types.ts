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
      contact_logs: {
        Row: {
          contacted_at: string | null
          id: string
          plumber_id: string
          request_id: string
        }
        Insert: {
          contacted_at?: string | null
          id?: string
          plumber_id: string
          request_id: string
        }
        Update: {
          contacted_at?: string | null
          id?: string
          plumber_id?: string
          request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_logs_plumber_id_fkey"
            columns: ["plumber_id"]
            isOneToOne: false
            referencedRelation: "plumber_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_logs_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      plumber_profiles: {
        Row: {
          availability:
            | Database["public"]["Enums"]["availability_type"][]
            | null
          business_name: string
          created_at: string | null
          description: string | null
          email: string
          email_verified: boolean | null
          full_name: string
          id: string
          intervention_types:
            | Database["public"]["Enums"]["intervention_type"][]
            | null
          main_city: string
          phone: string
          service_areas: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          availability?:
            | Database["public"]["Enums"]["availability_type"][]
            | null
          business_name: string
          created_at?: string | null
          description?: string | null
          email: string
          email_verified?: boolean | null
          full_name: string
          id?: string
          intervention_types?:
            | Database["public"]["Enums"]["intervention_type"][]
            | null
          main_city: string
          phone: string
          service_areas?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          availability?:
            | Database["public"]["Enums"]["availability_type"][]
            | null
          business_name?: string
          created_at?: string | null
          description?: string | null
          email?: string
          email_verified?: boolean | null
          full_name?: string
          id?: string
          intervention_types?:
            | Database["public"]["Enums"]["intervention_type"][]
            | null
          main_city?: string
          phone?: string
          service_areas?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          accessibility: Database["public"]["Enums"]["accessibility_type"]
          city: string
          client_email: string | null
          client_name: string
          client_phone: string
          created_at: string | null
          description: string
          id: string
          intervention_type: Database["public"]["Enums"]["intervention_type"]
          privacy_accepted: boolean
          property_type: Database["public"]["Enums"]["property_type"]
          status: string | null
          updated_at: string | null
          urgency: Database["public"]["Enums"]["urgency_type"]
        }
        Insert: {
          accessibility: Database["public"]["Enums"]["accessibility_type"]
          city: string
          client_email?: string | null
          client_name: string
          client_phone: string
          created_at?: string | null
          description: string
          id?: string
          intervention_type: Database["public"]["Enums"]["intervention_type"]
          privacy_accepted?: boolean
          property_type: Database["public"]["Enums"]["property_type"]
          status?: string | null
          updated_at?: string | null
          urgency: Database["public"]["Enums"]["urgency_type"]
        }
        Update: {
          accessibility?: Database["public"]["Enums"]["accessibility_type"]
          city?: string
          client_email?: string | null
          client_name?: string
          client_phone?: string
          created_at?: string | null
          description?: string
          id?: string
          intervention_type?: Database["public"]["Enums"]["intervention_type"]
          privacy_accepted?: boolean
          property_type?: Database["public"]["Enums"]["property_type"]
          status?: string | null
          updated_at?: string | null
          urgency?: Database["public"]["Enums"]["urgency_type"]
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_plumber: { Args: { _user_id: string }; Returns: boolean }
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
      property_type: "casa" | "appartamento" | "negozio"
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
      ],
      property_type: ["casa", "appartamento", "negozio"],
      urgency_type: ["subito", "entro_24_ore", "prossimi_giorni"],
    },
  },
} as const
