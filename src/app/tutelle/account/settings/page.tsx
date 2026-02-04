import { SettingsLayout } from "@/components/layouts/settings-layout"

export default function SettingsPage() {
  const sections = [
    {
      id: "banking",
      title: "Fonctionnalité solde bancaire",
      questions: [
        {
          id: "banking-1",
          question: "Comment faire une demande d'utilisation d'argent ?",
          answer: "Pour faire une demande d'utilisation d'argent, allez dans la section Budget, puis cliquez sur 'Nouvelle demande'. Remplissez le montant souhaité et la raison de la demande. Votre tuteur recevra une notification et pourra approuver ou refuser la demande."
        },
        {
          id: "banking-2",
          question: "Comment consulter mon solde ?",
          answer: "Votre solde est visible en permanence sur la page Budget. Vous pouvez également consulter l'historique de vos transactions en faisant défiler vers le bas."
        }
      ]
    },
    {
      id: "documents",
      title: "Fonctionnalité documents",
      questions: [
        {
          id: "docs-1",
          question: "Comment trouver facilement mes documents ?",
          answer: "Vos documents sont organisés par catégories dans la section Documents. Utilisez la barre de recherche en haut pour trouver rapidement un document spécifique par son nom."
        },
        {
          id: "docs-2",
          question: "Comment envoyer mes documents ?",
          answer: "Pour envoyer un document, ouvrez-le puis cliquez sur le bouton 'Partager'. Vous pouvez l'envoyer par email, message ou le partager avec votre tuteur directement dans l'application."
        }
      ]
    },
    {
      id: "messaging",
      title: "Fonctionnalité messagerie",
      questions: [
        {
          id: "msg-1",
          question: "Comment envoyer un message ?",
          answer: "Allez dans la section Messagerie, sélectionnez votre tuteur dans la liste des contacts, tapez votre message dans le champ en bas et appuyez sur Envoyer."
        }
      ]
    }
  ]

  return <SettingsLayout title="Aide" sections={sections} />
}