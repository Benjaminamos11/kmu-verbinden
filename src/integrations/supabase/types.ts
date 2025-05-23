export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      expert_reviews: {
        Row: {
          comment: string | null
          created_at: string
          expert_id: string | null
          id: string
          is_anonymous: boolean | null
          is_public: boolean | null
          rating: number
          reviewer_profile_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          expert_id?: string | null
          id?: string
          is_anonymous?: boolean | null
          is_public?: boolean | null
          rating: number
          reviewer_profile_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          expert_id?: string | null
          id?: string
          is_anonymous?: boolean | null
          is_public?: boolean | null
          rating?: number
          reviewer_profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expert_reviews_expert_id_fkey"
            columns: ["expert_id"]
            isOneToOne: false
            referencedRelation: "experts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expert_reviews_reviewer_profile_id_fkey"
            columns: ["reviewer_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      experts: {
        Row: {
          address: string | null
          city: string | null
          company_name: string
          contact_person: string
          created_at: string
          description: string
          email: string
          expertise_area: string
          id: string
          image_url: string | null
          linkedin: string | null
          logo_url: string | null
          phone: string | null
          postal_code: string | null
          profile_id: string | null
          services: string[] | null
          status: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company_name: string
          contact_person: string
          created_at?: string
          description: string
          email: string
          expertise_area: string
          id?: string
          image_url?: string | null
          linkedin?: string | null
          logo_url?: string | null
          phone?: string | null
          postal_code?: string | null
          profile_id?: string | null
          services?: string[] | null
          status?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company_name?: string
          contact_person?: string
          created_at?: string
          description?: string
          email?: string
          expertise_area?: string
          id?: string
          image_url?: string | null
          linkedin?: string | null
          logo_url?: string | null
          phone?: string | null
          postal_code?: string | null
          profile_id?: string | null
          services?: string[] | null
          status?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      industries: {
        Row: {
          active: boolean | null
          category: string
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          active?: boolean | null
          category: string
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          active?: boolean | null
          category?: string
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      industry_content: {
        Row: {
          benefits: Json
          case_studies: Json
          created_at: string
          features: Json
          hero_headline: string
          hero_subheadline: string
          id: string
          industry_id: string
          keywords: string[] | null
          meta_description: string
          meta_title: string
          pain_points: Json
          pricing_deals: string | null
        }
        Insert: {
          benefits?: Json
          case_studies?: Json
          created_at?: string
          features?: Json
          hero_headline: string
          hero_subheadline: string
          id?: string
          industry_id: string
          keywords?: string[] | null
          meta_description: string
          meta_title: string
          pain_points?: Json
          pricing_deals?: string | null
        }
        Update: {
          benefits?: Json
          case_studies?: Json
          created_at?: string
          features?: Json
          hero_headline?: string
          hero_subheadline?: string
          id?: string
          industry_id?: string
          keywords?: string[] | null
          meta_description?: string
          meta_title?: string
          pain_points?: Json
          pricing_deals?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "industry_content_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
        ]
      }
      industry_inquiries: {
        Row: {
          company_name: string
          contact_person: string
          created_at: string
          email: string
          id: string
          industry: string
          message: string | null
          phone: string | null
          website: string | null
        }
        Insert: {
          company_name: string
          contact_person: string
          created_at?: string
          email: string
          id?: string
          industry: string
          message?: string | null
          phone?: string | null
          website?: string | null
        }
        Update: {
          company_name?: string
          contact_person?: string
          created_at?: string
          email?: string
          id?: string
          industry?: string
          message?: string | null
          phone?: string | null
          website?: string | null
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount: number
          created_at: string
          due_date: string
          id: string
          paid_at: string | null
          profile_id: string | null
          status: string | null
          year: number
        }
        Insert: {
          amount: number
          created_at?: string
          due_date: string
          id?: string
          paid_at?: string | null
          profile_id?: string | null
          status?: string | null
          year: number
        }
        Update: {
          amount?: number
          created_at?: string
          due_date?: string
          id?: string
          paid_at?: string | null
          profile_id?: string | null
          status?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoices_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string
          id: string
          member_id: string | null
          partner_id: string | null
          service_name: string
          status: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          member_id?: string | null
          partner_id?: string | null
          service_name: string
          status?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          member_id?: string | null
          partner_id?: string | null
          service_name?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      news_posts: {
        Row: {
          author_id: string | null
          content: string
          created_at: string
          id: string
          image_url: string | null
          logo_url: string | null
          meta_description: string | null
          meta_keywords: string | null
          published_at: string | null
          slug: string
          title: string
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          logo_url?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          published_at?: string | null
          slug: string
          title: string
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          logo_url?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          published_at?: string | null
          slug?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          created_at: string
          description: string | null
          id: string
          logo: string | null
          name: string
          profile_id: string | null
          website: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          logo?: string | null
          name: string
          profile_id?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          logo?: string | null
          name?: string
          profile_id?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partners_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_services: {
        Row: {
          claimed_at: string
          profile_id: string
          service_id: string
        }
        Insert: {
          claimed_at?: string
          profile_id: string
          service_id: string
        }
        Update: {
          claimed_at?: string
          profile_id?: string
          service_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_services_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          city: string | null
          company_name: string | null
          contact_person: string | null
          created_at: string
          id: string
          is_admin: boolean | null
          member_number: string | null
          member_type: string | null
          membership_status: string | null
          partner_type: string | null
          phone: string | null
          postal_code: string | null
          terms_accepted: boolean | null
          website: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company_name?: string | null
          contact_person?: string | null
          created_at?: string
          id: string
          is_admin?: boolean | null
          member_number?: string | null
          member_type?: string | null
          membership_status?: string | null
          partner_type?: string | null
          phone?: string | null
          postal_code?: string | null
          terms_accepted?: boolean | null
          website?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company_name?: string | null
          contact_person?: string | null
          created_at?: string
          id?: string
          is_admin?: boolean | null
          member_number?: string | null
          member_type?: string | null
          membership_status?: string | null
          partner_type?: string | null
          phone?: string | null
          postal_code?: string | null
          terms_accepted?: boolean | null
          website?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
