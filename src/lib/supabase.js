import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

/**
 * Inserts a new lead into the Supabase 'leads' or 'contacts' table if configured.
 * Safely falls back if Supabase credentials are not set.
 */
export async function insertLeadToSupabase(leadRecord) {
  if (!supabase) {
    return {
      connected: false,
      skipped: true,
      message: 'Supabase credentials not configured in environment variables.',
    };
  }

  const payload = {
    name: leadRecord.name,
    email: leadRecord.email,
    company: leadRecord.company || null,
    service: leadRecord.service || null,
    budget: leadRecord.budget || null,
    message: leadRecord.message || null,
    created_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([payload])
      .select();

    if (error) {
      console.warn('[SUPABASE] Lead insert error:', error.message);
      return { connected: true, success: false, error: error.message };
    }

    console.log('[SUPABASE] Lead successfully saved to Supabase:', data);
    return { connected: true, success: true, data };
  } catch (err) {
    console.error('[SUPABASE] Unexpected insert error:', err.message);
    return { connected: true, success: false, error: err.message };
  }
}
