import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Créer la réponse
    const response = NextResponse.json(
      { success: true, message: "Déconnecté avec succès" },
      { status: 200 }
    )

    // Supprimer les cookies d'authentification
    response.cookies.delete("token") // ou le nom de votre cookie
    response.cookies.delete("refreshToken") // si vous en avez un
    response.cookies.delete("session") // si vous utilisez des sessions

    // Optionnel : Invalider la session côté serveur (si vous utilisez une DB)
    // await invalidateUserSession(userId)

    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la déconnexion" },
      { status: 500 }
    )
  }
}