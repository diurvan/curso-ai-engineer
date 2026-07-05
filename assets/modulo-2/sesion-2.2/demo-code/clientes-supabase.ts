// ============================================
// CLIENTES DE SUPABASE PARA NEXT.JS 15
// ============================================
//
// Server Component  → usa lib/supabase/server.ts
// Client Component  → usa lib/supabase/client.ts
// Server Action     → usa lib/supabase/server.ts
//
// Referencia: https://supabase.com/docs/guides/auth/quickstarts/nextjs

// ============================================
// lib/supabase/server.ts
// ============================================
// Se usa en Server Components y Server Actions
// Las cookies se leen/escriben del lado del servidor

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}

// ============================================
// lib/supabase/client.ts
// ============================================
// Se usa en Client Components (con 'use client')
// Las cookies se manejan automáticamente en el navegador

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
