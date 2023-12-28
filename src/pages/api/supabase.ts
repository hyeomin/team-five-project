import { createClient } from "@supabase/supabase-js";

export interface Database {
    public: {
        Tables: {
            resolution: {
                Row: {
                    // the data expected from .select()
                    created_at: Date;
                    title: string;
                    content: string;
                    dueDate: string;
                    progress: string;
                    user: string;
                };
                Insert: {
                    // the data to be passed to .insert()
                };
                Update: {
                    // the data to be passed to .update()
                };
            };
        };
    };
}

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const NEXT_PUBLIC_SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY as string

export const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_KEY);


