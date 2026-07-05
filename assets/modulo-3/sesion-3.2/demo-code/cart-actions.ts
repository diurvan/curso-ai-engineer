'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { trackAnthropic } from '@curso-ai/metrics'

export async function addToCart(productId: string) {
  const supabase = createClient()

  const { data: existing } = await supabase
    .from('cart_items')
    .select('id, quantity')
    .eq('product_id', productId)
    .single()

  if (existing) {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + 1 })
      .eq('id', existing.id)

    if (error) {
      console.error('Error updating cart:', error)
      throw new Error('No se pudo actualizar el carrito')
    }
  } else {
    const { error } = await supabase
      .from('cart_items')
      .insert({ product_id: productId, quantity: 1 })

    if (error) {
      console.error('Error inserting to cart:', error)
      throw new Error('No se pudo agregar al carrito')
    }
  }

  trackAnthropic({
    type: 'server_action',
    action: 'add_to_cart',
    product_id: productId,
  })

  revalidatePath('/productos')
}
