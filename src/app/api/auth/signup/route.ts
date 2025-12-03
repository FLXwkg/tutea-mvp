import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, email, firstName, lastName, role } = body

    console.log("Tentative de création utilisateur:", { id, email, firstName, lastName, role })

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Un compte avec cet email existe déjà" },
        { status: 409 }
      )
    }

    // Créer l'utilisateur dans la base de données
    const user = await prisma.user.create({
      data: {
        id,
        email,
        firstName,
        lastName,
        role,
      },
    })

    console.log("Utilisateur créé avec succès:", user)

    return NextResponse.json({ user }, { status: 201 })
  } catch (error: any) {
    console.error("Erreur lors de la création:", error)
    return NextResponse.json(
      { error: error.message || "Erreur lors de la création du profil" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}