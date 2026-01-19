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
      assignment_config: {
        Row: {
          created_at: string
          id: string
          max_attempts: number | null
          plan_type: string
          timer_minutes: number
          updated_at: string
          urgency: string
        }
        Insert: {
          created_at?: string
          id?: string
          max_attempts?: number | null
          plan_type: string
          timer_minutes: number
          updated_at?: string
          urgency: string
        }
        Update: {
          created_at?: string
          id?: string
          max_attempts?: number | null
          plan_type?: string
          timer_minutes?: number
          updated_at?: string
          urgency?: string
        }
        Relationships: []
      }
      assignment_logs: {
        Row: {
          assigned_at: string
          created_at: string
          expires_at: string
          id: string
          plumber_id: string
          plumber_plan: string
          request_id: string
          responded: boolean | null
          response_at: string | null
          response_type: string | null
        }
        Insert: {
          assigned_at?: string
          created_at?: string
          expires_at: string
          id?: string
          plumber_id: string
          plumber_plan: string
          request_id: string
          responded?: boolean | null
          response_at?: string | null
          response_type?: string | null
        }
        Update: {
          assigned_at?: string
          created_at?: string
          expires_at?: string
          id?: string
          plumber_id?: string
          plumber_plan?: string
          request_id?: string
          responded?: boolean | null
          response_at?: string | null
          response_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignment_logs_plumber_id_fkey"
            columns: ["plumber_id"]
            isOneToOne: false
            referencedRelation: "plumber_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_logs_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_logs_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "service_requests_plumber_view"
            referencedColumns: ["id"]
          },
        ]
      }
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
          {
            foreignKeyName: "contact_logs_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "service_requests_plumber_view"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_unlocks: {
        Row: {
          id: string
          is_exclusive: boolean
          plumber_id: string
          request_id: string
          unlocked_at: string
        }
        Insert: {
          id?: string
          is_exclusive?: boolean
          plumber_id: string
          request_id: string
          unlocked_at?: string
        }
        Update: {
          id?: string
          is_exclusive?: boolean
          plumber_id?: string
          request_id?: string
          unlocked_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_unlocks_plumber_id_fkey"
            columns: ["plumber_id"]
            isOneToOne: false
            referencedRelation: "plumber_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_unlocks_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_unlocks_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "service_requests_plumber_view"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "email_logs_plumber_id_fkey"
            columns: ["plumber_id"]
            isOneToOne: false
            referencedRelation: "plumber_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_logs_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_logs_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "service_requests_plumber_view"
            referencedColumns: ["id"]
          },
        ]
      }
      italian_cities: {
        Row: {
          cap: string[]
          created_at: string
          id: string
          name: string
          province_code: string
          province_name: string
          region: string
        }
        Insert: {
          cap?: string[]
          created_at?: string
          id?: string
          name: string
          province_code: string
          province_name: string
          region: string
        }
        Update: {
          cap?: string[]
          created_at?: string
          id?: string
          name?: string
          province_code?: string
          province_name?: string
          region?: string
        }
        Relationships: []
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
          photo_url: string | null
          rating: number | null
          review_count: number | null
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
          photo_url?: string | null
          rating?: number | null
          review_count?: number | null
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
          photo_url?: string | null
          rating?: number | null
          review_count?: number | null
          service_areas?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      plumber_subscriptions: {
        Row: {
          contacts_reset_at: string | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          exclusive_contacts_used: number
          free_requests_remaining: number | null
          id: string
          is_available: boolean | null
          is_trial: boolean | null
          last_assigned_at: string | null
          monthly_contact_limit: number | null
          monthly_contacts_used: number | null
          plan_type: Database["public"]["Enums"]["subscription_plan"]
          plumber_id: string
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_ends_at: string | null
          updated_at: string
        }
        Insert: {
          contacts_reset_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          exclusive_contacts_used?: number
          free_requests_remaining?: number | null
          id?: string
          is_available?: boolean | null
          is_trial?: boolean | null
          last_assigned_at?: string | null
          monthly_contact_limit?: number | null
          monthly_contacts_used?: number | null
          plan_type: Database["public"]["Enums"]["subscription_plan"]
          plumber_id: string
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          updated_at?: string
        }
        Update: {
          contacts_reset_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          exclusive_contacts_used?: number
          free_requests_remaining?: number | null
          id?: string
          is_available?: boolean | null
          is_trial?: boolean | null
          last_assigned_at?: string | null
          monthly_contact_limit?: number | null
          monthly_contacts_used?: number | null
          plan_type?: Database["public"]["Enums"]["subscription_plan"]
          plumber_id?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "plumber_subscriptions_plumber_id_fkey"
            columns: ["plumber_id"]
            isOneToOne: true
            referencedRelation: "plumber_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      service_requests: {
        Row: {
          accepted_at: string | null
          accepted_by_id: string | null
          accessibility: Database["public"]["Enums"]["accessibility_type"]
          assigned_at: string | null
          assigned_plumber_id: string | null
          assignment_expires_at: string | null
          assignment_round: number | null
          assignment_started_at: string | null
          city: string
          client_email: string | null
          client_name: string
          client_phone: string
          created_at: string | null
          current_assignee_plan: string | null
          description: string
          id: string
          intervention_type: Database["public"]["Enums"]["intervention_type"]
          is_exclusive: boolean
          privacy_accepted: boolean
          property_type: Database["public"]["Enums"]["property_type"]
          status: string | null
          updated_at: string | null
          urgency: Database["public"]["Enums"]["urgency_type"]
          wizard_answers: Json | null
        }
        Insert: {
          accepted_at?: string | null
          accepted_by_id?: string | null
          accessibility: Database["public"]["Enums"]["accessibility_type"]
          assigned_at?: string | null
          assigned_plumber_id?: string | null
          assignment_expires_at?: string | null
          assignment_round?: number | null
          assignment_started_at?: string | null
          city: string
          client_email?: string | null
          client_name: string
          client_phone: string
          created_at?: string | null
          current_assignee_plan?: string | null
          description: string
          id?: string
          intervention_type: Database["public"]["Enums"]["intervention_type"]
          is_exclusive?: boolean
          privacy_accepted?: boolean
          property_type: Database["public"]["Enums"]["property_type"]
          status?: string | null
          updated_at?: string | null
          urgency: Database["public"]["Enums"]["urgency_type"]
          wizard_answers?: Json | null
        }
        Update: {
          accepted_at?: string | null
          accepted_by_id?: string | null
          accessibility?: Database["public"]["Enums"]["accessibility_type"]
          assigned_at?: string | null
          assigned_plumber_id?: string | null
          assignment_expires_at?: string | null
          assignment_round?: number | null
          assignment_started_at?: string | null
          city?: string
          client_email?: string | null
          client_name?: string
          client_phone?: string
          created_at?: string | null
          current_assignee_plan?: string | null
          description?: string
          id?: string
          intervention_type?: Database["public"]["Enums"]["intervention_type"]
          is_exclusive?: boolean
          privacy_accepted?: boolean
          property_type?: Database["public"]["Enums"]["property_type"]
          status?: string | null
          updated_at?: string | null
          urgency?: Database["public"]["Enums"]["urgency_type"]
          wizard_answers?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_accepted_by_id_fkey"
            columns: ["accepted_by_id"]
            isOneToOne: false
            referencedRelation: "plumber_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_assigned_plumber_id_fkey"
            columns: ["assigned_plumber_id"]
            isOneToOne: false
            referencedRelation: "plumber_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      service_requests_public_meta: {
        Row: {
          accessibility: Database["public"]["Enums"]["accessibility_type"]
          city: string
          created_at: string
          intervention_type: Database["public"]["Enums"]["intervention_type"]
          is_exclusive: boolean
          property_type: Database["public"]["Enums"]["property_type"]
          request_id: string
          status: string
          updated_at: string
          urgency: Database["public"]["Enums"]["urgency_type"]
        }
        Insert: {
          accessibility: Database["public"]["Enums"]["accessibility_type"]
          city: string
          created_at?: string
          intervention_type: Database["public"]["Enums"]["intervention_type"]
          is_exclusive?: boolean
          property_type: Database["public"]["Enums"]["property_type"]
          request_id: string
          status?: string
          updated_at?: string
          urgency: Database["public"]["Enums"]["urgency_type"]
        }
        Update: {
          accessibility?: Database["public"]["Enums"]["accessibility_type"]
          city?: string
          created_at?: string
          intervention_type?: Database["public"]["Enums"]["intervention_type"]
          is_exclusive?: boolean
          property_type?: Database["public"]["Enums"]["property_type"]
          request_id?: string
          status?: string
          updated_at?: string
          urgency?: Database["public"]["Enums"]["urgency_type"]
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_public_meta_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: true
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_public_meta_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: true
            referencedRelation: "service_requests_plumber_view"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          contacts_are_exclusive: boolean
          created_at: string
          description: string | null
          id: string
          max_exclusive_contacts: number | null
          name: string
          plan_type: Database["public"]["Enums"]["subscription_plan"]
          price_monthly: number
          updated_at: string
        }
        Insert: {
          contacts_are_exclusive?: boolean
          created_at?: string
          description?: string | null
          id?: string
          max_exclusive_contacts?: number | null
          name: string
          plan_type: Database["public"]["Enums"]["subscription_plan"]
          price_monthly: number
          updated_at?: string
        }
        Update: {
          contacts_are_exclusive?: boolean
          created_at?: string
          description?: string | null
          id?: string
          max_exclusive_contacts?: number | null
          name?: string
          plan_type?: Database["public"]["Enums"]["subscription_plan"]
          price_monthly?: number
          updated_at?: string
        }
        Relationships: []
      }
      unregistered_plumbers: {
        Row: {
          city: string
          created_at: string
          full_name: string
          id: string
          is_active: boolean
          notes: string | null
          phone: string
          updated_at: string
        }
        Insert: {
          city?: string
          created_at?: string
          full_name: string
          id?: string
          is_active?: boolean
          notes?: string | null
          phone: string
          updated_at?: string
        }
        Update: {
          city?: string
          created_at?: string
          full_name?: string
          id?: string
          is_active?: boolean
          notes?: string | null
          phone?: string
          updated_at?: string
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
      whatsapp_logs: {
        Row: {
          created_at: string
          delivered_at: string | null
          error_message: string | null
          id: string
          message_type: string
          plumber_id: string | null
          read_at: string | null
          recipient_name: string | null
          recipient_phone: string
          request_id: string | null
          respond_io_message_id: string | null
          status: string
        }
        Insert: {
          created_at?: string
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          message_type?: string
          plumber_id?: string | null
          read_at?: string | null
          recipient_name?: string | null
          recipient_phone: string
          request_id?: string | null
          respond_io_message_id?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          message_type?: string
          plumber_id?: string | null
          read_at?: string | null
          recipient_name?: string | null
          recipient_phone?: string
          request_id?: string | null
          respond_io_message_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_logs_plumber_id_fkey"
            columns: ["plumber_id"]
            isOneToOne: false
            referencedRelation: "plumber_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_logs_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_logs_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "service_requests_plumber_view"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      service_requests_plumber_view: {
        Row: {
          accessibility:
            | Database["public"]["Enums"]["accessibility_type"]
            | null
          assigned_at: string | null
          assigned_plumber_id: string | null
          city: string | null
          client_email: string | null
          client_name: string | null
          client_phone: string | null
          created_at: string | null
          description: string | null
          id: string | null
          intervention_type:
            | Database["public"]["Enums"]["intervention_type"]
            | null
          is_contact_unlocked: boolean | null
          is_exclusive: boolean | null
          privacy_accepted: boolean | null
          property_type: Database["public"]["Enums"]["property_type"] | null
          status: string | null
          updated_at: string | null
          urgency: Database["public"]["Enums"]["urgency_type"] | null
        }
        Insert: {
          accessibility?:
            | Database["public"]["Enums"]["accessibility_type"]
            | null
          assigned_at?: string | null
          assigned_plumber_id?: string | null
          city?: string | null
          client_email?: never
          client_name?: never
          client_phone?: never
          created_at?: string | null
          description?: string | null
          id?: string | null
          intervention_type?:
            | Database["public"]["Enums"]["intervention_type"]
            | null
          is_contact_unlocked?: never
          is_exclusive?: boolean | null
          privacy_accepted?: boolean | null
          property_type?: Database["public"]["Enums"]["property_type"] | null
          status?: string | null
          updated_at?: string | null
          urgency?: Database["public"]["Enums"]["urgency_type"] | null
        }
        Update: {
          accessibility?:
            | Database["public"]["Enums"]["accessibility_type"]
            | null
          assigned_at?: string | null
          assigned_plumber_id?: string | null
          city?: string | null
          client_email?: never
          client_name?: never
          client_phone?: never
          created_at?: string | null
          description?: string | null
          id?: string | null
          intervention_type?:
            | Database["public"]["Enums"]["intervention_type"]
            | null
          is_contact_unlocked?: never
          is_exclusive?: boolean | null
          privacy_accepted?: boolean | null
          property_type?: Database["public"]["Enums"]["property_type"] | null
          status?: string | null
          updated_at?: string | null
          urgency?: Database["public"]["Enums"]["urgency_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_assigned_plumber_id_fkey"
            columns: ["assigned_plumber_id"]
            isOneToOne: false
            referencedRelation: "plumber_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      accept_request: {
        Args: { p_plumber_id: string; p_request_id: string }
        Returns: boolean
      }
      assign_request_to_plumber: {
        Args: { p_plumber_id: string; p_request_id: string }
        Returns: boolean
      }
      get_current_plumber_plan: {
        Args: never
        Returns: Database["public"]["Enums"]["subscription_plan"]
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
