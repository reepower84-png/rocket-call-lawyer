import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Inquiry {
  id?: number;
  name: string;
  phone: string;
  message: string;
  status?: string;
  created_at?: string;
}

export type InquiryStatus = '대기중' | '연락완료' | '상담완료';
