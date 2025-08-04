export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          color: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          color: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          color?: string;
          user_id?: string;
          created_at?: string;
        };
      };
      tasks: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          completed: boolean;
          category_id: string | null;
          user_id: string;
          due_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          completed?: boolean;
          category_id?: string | null;
          user_id: string;
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          completed?: boolean;
          category_id?: string | null;
          user_id?: string;
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export type Task = Database['public']['Tables']['tasks']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];