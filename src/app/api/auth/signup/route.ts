import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { generateTuteurCode } from "@/lib/utils"
import { logger } from "@/lib/logger"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, email, firstName, lastName, role, tuteurCode } = body

    logger.info({ email, role }, 'Signup attempt')

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      logger.error({ email }, 'Signup failed - email already exists')  // ← AJOUT
      return NextResponse.json(
        { error: "Un compte avec cet email existe déjà" },
        { status: 409 }
      )
    }

    // Si c'est un tutellé, vérifier le code tuteur
    if (role === "TUTELLE") {
      if (!tuteurCode) {
        logger.error({ email }, 'Signup failed - missing tuteur code')  // ← AJOUT
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
        logger.error({ email, tuteurCode }, 'Signup failed - invalid tuteur code')  // ← AJOUT
        return NextResponse.json(
          { error: "Code tuteur invalide" },
          { status: 404 }
        )
      }

      if (tuteur.role !== "TUTEUR") {
        logger.error({ email, tuteurCode }, 'Signup failed - code does not belong to tuteur')  // ← AJOUT
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

      logger.info({ email, userId: user.id }, 'Tutellé created successfully')

      // Créer la relation tuteur-tutellé
        await prisma.relation.create({
          data: {
            tuteurId: tuteur.id,
            tutelleId: user.id,
            status: "ACTIVE",
          },
        })

      logger.info({ tuteurId: tuteur.id, tutelleId: user.id }, 'Tuteur-Tutellé relation created')

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

      logger.info({ email, userId: user.id, tuteurCode: newTuteurCode }, 'Tuteur created successfully')

      return NextResponse.json({ user }, { status: 201 })
    }

    logger.error({ email, role }, 'Signup failed - invalid role') 
    return NextResponse.json(
      { error: "Rôle invalide" },
      { status: 400 }
    )

  } catch (error: any) {
    logger.error({ error: error.message }, 'Signup error - unexpected exception')
    return NextResponse.json(
      { error: error.message || "Erreur lors de la création du profil" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}