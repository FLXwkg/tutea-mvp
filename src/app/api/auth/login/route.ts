import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { logger } from "@/lib/logger"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    logger.info({ email }, 'Login attempt')

    const supabase = await createClient()

    // Authentification avec Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      logger.error({ email, error: authError.message }, 'Login failed - auth error')
      return NextResponse.json(
        { error: authError.message || "Email ou mot de passe incorrect" },
        { status: 401 }
      )
    }

    // Récupérer le rôle de l'utilisateur
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", authData.user.id)
      .single()

    if (userError) {
      logger.error({ userId: authData.user.id, error: userError.message }, 'Failed to fetch user role')
      return NextResponse.json(
        { error: "Erreur lors de la récupération du profil" },
        { status: 500 }
      )
    }

    logger.info({ userId: authData.user.id, email, role: userData.role }, 'Login successful')

    return NextResponse.json({ 
      user: authData.user,
      role: userData.role 
    }, { status: 200 })

  } catch (error: any) {
    logger.error({ error: error.message }, 'Login error')
    return NextResponse.json(
      { error: error.message || "Une erreur est survenue" },
      { status: 500 }
    )
  }
}