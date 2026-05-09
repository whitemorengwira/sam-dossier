'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function approveUser(userId: string, role: string) {
  try {
    const supabase = await createClient()
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError || !session) {
      throw new Error('Unauthorized - please log in')
    }

    // Verify caller is admin
    if (session.user.user_metadata?.role !== 'admin') {
      throw new Error('Unauthorized - only admins can approve users')
    }

    const adminClient = createAdminClient()

    // Update the user's metadata to set them as approved and assign the chosen role
    const { error: updateError } = await adminClient.auth.admin.updateUserById(userId, {
      user_metadata: { role, is_approved: true }
    })

    if (updateError) {
      throw new Error(`Failed to approve user: ${updateError.message}`)
    }

    revalidatePath('/dashboard/admin')
    return { success: true }
  } catch (err: unknown) {
    console.error('Error in approveUser action:', err)
    return { success: false, error: (err instanceof Error ? err.message : String(err)) || 'Unknown error' }
  }
}

export async function deleteUser(userId: string) {
  try {
    const supabase = await createClient()
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError || !session) {
      throw new Error('Unauthorized - please log in')
    }

    // Verify caller is admin
    if (session.user.user_metadata?.role !== 'admin') {
      throw new Error('Unauthorized - only admins can delete users')
    }

    const adminClient = createAdminClient()

    // Delete the user from authentication completely
    const { error: deleteError } = await adminClient.auth.admin.deleteUser(userId)

    if (deleteError) {
      throw new Error(`Failed to delete user: ${deleteError.message}`)
    }

    revalidatePath('/dashboard/admin')
    return { success: true }
  } catch (err: unknown) {
    console.error('Error in deleteUser action:', err)
    return { success: false, error: (err instanceof Error ? err.message : String(err)) || 'Unknown error' }
  }
}

export async function createUser(email: string, password: string, role: string) {
  try {
    const supabase = await createClient()
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError || !session) {
      throw new Error('Unauthorized - please log in')
    }

    if (session.user.user_metadata?.role !== 'admin') {
      throw new Error('Unauthorized - only admins can create users')
    }

    const adminClient = createAdminClient()

    // Create user with pre-verified email, bypassing all rate limits
    const { error: createError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role,
        is_approved: true,
      },
    })

    if (createError) {
      throw new Error(`Failed to create user: ${createError.message}`)
    }

    revalidatePath('/dashboard/admin')
    return { success: true }
  } catch (err: unknown) {
    console.error('Error in createUser action:', err)
    return { success: false, error: (err instanceof Error ? err.message : String(err)) || 'Unknown error' }
  }
}
