import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { generateTuteurCode } from "@/lib/utils"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, email, firstName, lastName, role, tuteurCode } = body

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

    // Si c'est un tutellé, vérifier le code tuteur
    if (role === "TUTELLE") {
      if (!tuteurCode) {
        return NextResponse.json(
          { error: "Le code tuteur est requis" },
          { status: 400 }
        )
      }

      // Trouver le tuteur avec ce code
      const tuteur = await prisma.user.findUnique({
        where: { tuteurCode: tuteurCode.toUpperCase() }
      })

      if (!tuteur) {
        return NextResponse.json(
          { error: "Code tuteur invalide" },
          { status: 404 }
        )
      }

      if (tuteur.role !== "TUTEUR") {
        return NextResponse.json(
          { error: "Ce code n'appartient pas à un tuteur" },
          { status: 400 }
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

      // Créer la relation tuteur-tutellé
        await prisma.relation.create({
          data: {
            tuteurId: tuteur.id,
            tutelleId: user.id,
            status: "ACTIVE",
          },
        })

      console.log("Tutellé créé et lié au tuteur:", tuteur)

      return NextResponse.json({ user }, { status: 201 })
    }

    // Si c'est un tuteur, générer un code tuteur unique
    if (role === "TUTEUR") {
      let newTuteurCode = generateTuteurCode()
      
      // S'assurer que le code est unique
      let codeExists = await prisma.user.findUnique({
        where: { tuteurCode: newTuteurCode }
      })

      while (codeExists) {
        newTuteurCode = generateTuteurCode()
        codeExists = await prisma.user.findUnique({
          where: { tuteurCode: newTuteurCode }
        })
      }

      // Créer l'utilisateur tuteur avec son code
      const user = await prisma.user.create({
        data: {
          id,
          email,
          firstName,
          lastName,
          role,
          tuteurCode: newTuteurCode,
        },
      })

      console.log("Tuteur créé avec le code:", newTuteurCode)

      return NextResponse.json({ user }, { status: 201 })
    }

    return NextResponse.json(
      { error: "Rôle invalide" },
      { status: 400 }
    )

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