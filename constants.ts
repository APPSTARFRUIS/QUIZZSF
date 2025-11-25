
import { QuestionConfig, Translations, SupportedLocale } from './types';

export const ADMIN_PASSWORD = "ssl-starfruits-2025";
export const STORAGE_KEY = "sf_quiz_results";
export const SURVEY_STORAGE_KEY = "sf_survey_results";

// Utilisation du fichier local situé dans le dossier /public/
// Assurez-vous que le fichier "star-fruits-logo.png" existe dans le dossier public à la racine du projet.
export const LOGO_URL = "/star-fruits-logo.png";

export const QUESTION_LOGIC: QuestionConfig[] = [
  { id: 'q1', type: 'single', correctIndexes: [1] },
  { id: 'q2', type: 'multiple', correctIndexes: [2, 3, 4, 5] },
  { id: 'q3', type: 'single', correctIndexes: [1] },
  { id: 'q4', type: 'multiple', correctIndexes: [2, 3] },
  { id: 'q5', type: 'single', correctIndexes: [2] },
  { id: 'q6', type: 'multiple', correctIndexes: [2, 5] },
  { id: 'q7', type: 'multiple', correctIndexes: [0, 4] },
  { id: 'q8', type: 'multiple', correctIndexes: [0, 1, 2] },
];

export const TRANSLATIONS: Record<SupportedLocale, Translations> = {
  fr: {
    appTitle: "Quizz SSL Star Fruits",
    appSubtitle: "Testez vos connaissances sur l'entreprise et ses variétés",
    introText: "On commence par se chauffer un peu… 8 questions, pas de pression, pas de notes à rendre, juste le plaisir de tester votre culture Star Fruits. Le gagnant repartira avec toute notre admiration… et peut-être une surprise.",
    nameLabel: "Votre nom",
    namePlaceholder: "Entrez votre nom ou pseudo",
    startButton: "Commencer le Quiz",
    validateButton: "Valider",
    nextButton: "Suivant",
    finishButton: "Voir les résultats",
    retryButton: "Recommencer",
    questionsTitle: "Question",
    resultTitle: "Résultats",
    multipleChoiceNotice: "(Plusieurs choix possibles)",
    resultLow: "Merci de votre participation ! Vous découvrez l'univers Star Fruits.",
    resultMedium: "Pas mal ! Vous avez de bonnes connaissances sur Star Fruits.",
    resultHigh: "Excellent ! Vous êtes un véritable expert Star Fruits !",
    scoreLabel: "Votre score :",
    adminTitle: "Administration",
    adminPasswordPlaceholder: "Mot de passe",
    adminLoginButton: "Connexion",
    adminTableName: "Nom",
    adminTableScore: "Score",
    adminTableLanguage: "Langue",
    adminTableDate: "Date",
    adminClearButton: "Effacer tout",
    adminExportButton: "Exporter CSV",
    adminStatsTitle: "Statistiques",
    adminTotalPart: "Participants",
    adminAvgScore: "Moyenne",
    adminBestScore: "Meilleur score",
    adminLoginError: "Mot de passe incorrect",
    adminNoData: "Aucun résultat enregistré.",
    adminTabQuiz: "Résultats Quiz",
    adminTabSurvey: "Sondages",

    surveyTitle: "Mini-sondage (Bonus)",
    surveyIntro: "Notez Star Fruits (1 à 5) et donnez votre avis pour nous aider à nous améliorer.",
    surveySectionPortfolio: "Diversité & qualité du portefeuille variétal",
    surveySectionTech: "Réactivité technique",
    surveySectionComm: "Réactivité commerciale",
    surveyLabelWhy: "Pourquoi ?",
    surveyLabelTechInfo: "Qualité de l’information technique ?",
    surveyLabelStrengths: "En 1 phrase : Qualités et défauts majeurs ?",
    surveyLabelSynergy: "Vos conseils pour améliorer la synergie (Vous / Star Fruits / Star Export) ?",
    surveySubmit: "Envoyer le sondage",
    surveySubmitted: "Merci pour votre retour précieux !",
    surveyItemApple: "Pomme",
    surveyItemPear: "Poire",
    surveyItemPeach: "Pêche/Nectarine",
    surveyItemApricot: "Abricot",
    surveyItemCherry: "Cerise",

    questions: {
      q1: {
        text: "Quelle est la première variété introduite chez Star Fruits ?",
        options: ["SUPERMELRED® Marstar", "Laycot", "REDWINTER® Redaphough", "MAYCREST® Minastar", "Cripps Pink", "Orangered® Bhart"]
      },
      q2: {
        text: "Qui sont les membres historiques de Star Fruits ?",
        options: ["Millet", "Grard", "Veauvy", "Toulemonde", "Robin", "Viguier", "Vendries", "Demols"]
      },
      q3: {
        text: "En quelle année Star Fruits a-t-elle été créée ?",
        options: ["1959", "1968", "1973", "1982"]
      },
      q4: {
        text: "La/lesquelles de ces espèces n’ont jamais été travaillées par Star Fruits ?",
        options: ["Kiwi", "Raisin", "Amande", "Myrtille", "Prune européenne"]
      },
      q5: {
        text: "Sur quelle espèce avons-nous aujourd’hui le plus de variétés en test ?",
        options: ["Pêche (tous types)", "Nectarine (tous types)", "Poire", "Pomme", "Abricot"]
      },
      q6: {
        text: "Quels sont les défauts fréquemment observés sur les poires rouges ?",
        options: ["L’astringence", "La vigueur excessive", "Le manque de ramification", "La forte présence de cellules pierreuses", "Le faible potentiel de conservation", "Le manque d’arômes"]
      },
      q7: {
        text: "La / lesquelles de ces variétés de pêches/nectarines existe/ent réellement ?",
        options: ["Najory", "Nabeon", "Nabim", "Early Queen", "Monnoir"]
      },
      q8: {
        text: "Qui N’EST PAS pollinisateur d’Henriette ?",
        options: ["Glenoia", "Louis", "Black Star", "Areko"]
      }
    }
  },
  en: {
    appTitle: "SSL Star Fruits Quiz",
    appSubtitle: "Test your knowledge about the company and its varieties",
    introText: "Let's warm up a bit... 8 questions, no pressure, no grades, just the pleasure of testing your Star Fruits knowledge. The winner will leave with all our admiration... and maybe a surprise.",
    nameLabel: "Your Name",
    namePlaceholder: "Enter your name or nickname",
    startButton: "Start Quiz",
    validateButton: "Submit",
    nextButton: "Next",
    finishButton: "See Results",
    retryButton: "Try Again",
    questionsTitle: "Question",
    resultTitle: "Results",
    multipleChoiceNotice: "(Multiple choices possible)",
    resultLow: "Thanks for participating! You are discovering the Star Fruits universe.",
    resultMedium: "Not bad! You have good knowledge of Star Fruits.",
    resultHigh: "Excellent! You are a true Star Fruits expert!",
    scoreLabel: "Your score:",
    adminTitle: "Administration",
    adminPasswordPlaceholder: "Password",
    adminLoginButton: "Login",
    adminTableName: "Name",
    adminTableScore: "Score",
    adminTableLanguage: "Language",
    adminTableDate: "Date",
    adminClearButton: "Clear All",
    adminExportButton: "Export CSV",
    adminStatsTitle: "Statistics",
    adminTotalPart: "Participants",
    adminAvgScore: "Average",
    adminBestScore: "Best Score",
    adminLoginError: "Incorrect password",
    adminNoData: "No results saved.",
    adminTabQuiz: "Quiz Results",
    adminTabSurvey: "Surveys",

    surveyTitle: "Mini-Survey (Bonus)",
    surveyIntro: "Rate Star Fruits (1 to 5) and give your feedback to help us improve.",
    surveySectionPortfolio: "Diversity & Quality of Varietal Portfolio",
    surveySectionTech: "Technical Reactivity",
    surveySectionComm: "Commercial Reactivity",
    surveyLabelWhy: "Why?",
    surveyLabelTechInfo: "Quality of technical info?",
    surveyLabelStrengths: "In 1 sentence: Greatest strengths and weaknesses?",
    surveyLabelSynergy: "Your advice to improve synergy (You / Star Fruits / Star Export)?",
    surveySubmit: "Submit Survey",
    surveySubmitted: "Thanks for your valuable feedback!",
    surveyItemApple: "Apple",
    surveyItemPear: "Pear",
    surveyItemPeach: "Peach/Nectarine",
    surveyItemApricot: "Apricot",
    surveyItemCherry: "Cherry",

    questions: {
      q1: {
        text: "What was the first variety introduced at Star Fruits?",
        options: ["SUPERMELRED® Marstar", "Laycot", "REDWINTER® Redaphough", "MAYCREST® Minastar", "Cripps Pink", "Orangered® Bhart"]
      },
      q2: {
        text: "Who are the historical members of Star Fruits?",
        options: ["Millet", "Grard", "Veauvy", "Toulemonde", "Robin", "Viguier", "Vendries", "Demols"]
      },
      q3: {
        text: "In which year was Star Fruits created?",
        options: ["1959", "1968", "1973", "1982"]
      },
      q4: {
        text: "Which of these species have never been worked on by Star Fruits?",
        options: ["Kiwi", "Grape", "Almond", "Blueberry", "European Plum"]
      },
      q5: {
        text: "On which species do we currently have the most varieties under test?",
        options: ["Peach (all types)", "Nectarine (all types)", "Pear", "Apple", "Apricot"]
      },
      q6: {
        text: "What defects are frequently observed in red pears?",
        options: ["Astringency", "Excessive vigor", "Lack of branching", "High presence of stone cells", "Low storage potential", "Lack of aroma"]
      },
      q7: {
        text: "Which of these peach/nectarine varieties actually exist?",
        options: ["Najory", "Nabeon", "Nabim", "Early Queen", "Monnoir"]
      },
      q8: {
        text: "Which is NOT a pollinator for Henriette?",
        options: ["Glenoia", "Louis", "Black Star", "Areko"]
      }
    }
  },
  es: {
    appTitle: "Cuestionario SSL Star Fruits",
    appSubtitle: "Pon a prueba tus conocimientos sobre la empresa y sus variedades",
    introText: "Empezamos calentando un poco... 8 preguntas, sin presión, sin notas, solo el placer de poner a prueba tu cultura Star Fruits. El ganador se llevará toda nuestra admiración... y quizás una sorpresa.",
    nameLabel: "Tu nombre",
    namePlaceholder: "Introduce tu nombre o apodo",
    startButton: "Comenzar Cuestionario",
    validateButton: "Validar",
    nextButton: "Siguiente",
    finishButton: "Ver Resultados",
    retryButton: "Intentar de nuevo",
    questionsTitle: "Pregunta",
    resultTitle: "Resultados",
    multipleChoiceNotice: "(Varias opciones posibles)",
    resultLow: "¡Gracias por participar! Estás descubriendo el universo Star Fruits.",
    resultMedium: "¡Nada mal! Tienes buenos conocimientos sobre Star Fruits.",
    resultHigh: "¡Excelente! ¡Eres un verdadero experto en Star Fruits!",
    scoreLabel: "Tu puntuación:",
    adminTitle: "Administración",
    adminPasswordPlaceholder: "Contraseña",
    adminLoginButton: "Conexión",
    adminTableName: "Nombre",
    adminTableScore: "Puntuación",
    adminTableLanguage: "Idioma",
    adminTableDate: "Fecha",
    adminClearButton: "Borrar todo",
    adminExportButton: "Exportar CSV",
    adminStatsTitle: "Estadísticas",
    adminTotalPart: "Participantes",
    adminAvgScore: "Promedio",
    adminBestScore: "Mejor puntuación",
    adminLoginError: "Contraseña incorrecta",
    adminNoData: "No hay resultados guardados.",
    adminTabQuiz: "Resultados Quiz",
    adminTabSurvey: "Encuestas",

    surveyTitle: "Mini-encuesta (Bonus)",
    surveyIntro: "Califícate a Star Fruits (1 a 5) y danos tu opinión para ayudarnos a mejorar.",
    surveySectionPortfolio: "Diversidad y calidad del portafolio varietal",
    surveySectionTech: "Reactividad técnica",
    surveySectionComm: "Reactividad comercial",
    surveyLabelWhy: "¿Por qué?",
    surveyLabelTechInfo: "¿Calidad de la información técnica?",
    surveyLabelStrengths: "En 1 frase: ¿Mayores cualidades y defectos?",
    surveyLabelSynergy: "¿Tus consejos para mejorar la sinergia (Tú / Star Fruits / Star Export)?",
    surveySubmit: "Enviar encuesta",
    surveySubmitted: "¡Gracias por tus valiosos comentarios!",
    surveyItemApple: "Manzana",
    surveyItemPear: "Pera",
    surveyItemPeach: "Melocotón/Nectarina",
    surveyItemApricot: "Albaricoque",
    surveyItemCherry: "Cereza",

    questions: {
      q1: {
        text: "¿Cuál es la primera variedad introducida en Star Fruits?",
        options: ["SUPERMELRED® Marstar", "Laycot", "REDWINTER® Redaphough", "MAYCREST® Minastar", "Cripps Pink", "Orangered® Bhart"]
      },
      q2: {
        text: "¿Quiénes son los miembros históricos de Star Fruits?",
        options: ["Millet", "Grard", "Veauvy", "Toulemonde", "Robin", "Viguier", "Vendries", "Demols"]
      },
      q3: {
        text: "¿En qué año se creó Star Fruits?",
        options: ["1959", "1968", "1973", "1982"]
      },
      q4: {
        text: "¿Cuál(es) de estas especies nunca ha sido trabajada por Star Fruits?",
        options: ["Kiwi", "Uva", "Almendra", "Arándano", "Ciruela europea"]
      },
      q5: {
        text: "¿En qué especie tenemos hoy más variedades en prueba?",
        options: ["Melocotón (todos)", "Nectarina (todas)", "Pera", "Manzana", "Albaricoque"]
      },
      q6: {
        text: "¿Qué defectos se observan frecuentemente en las peras rojas?",
        options: ["Astringencia", "Vigor excesivo", "Falta de ramificación", "Fuerte presencia de células pétreas", "Bajo potencial de conservación", "Falta de aromas"]
      },
      q7: {
        text: "¿Cuál(es) de estas variedades de melocotones/nectarinas existe(n) realmente?",
        options: ["Najory", "Nabeon", "Nabim", "Early Queen", "Monnoir"]
      },
      q8: {
        text: "¿Quién NO es polinizador de Henriette?",
        options: ["Glenoia", "Louis", "Black Star", "Areko"]
      }
    }
  },
  it: {
    appTitle: "Quiz SSL Star Fruits",
    appSubtitle: "Metti alla prova le tue conoscenze sull'azienda e le sue varietà",
    introText: "Iniziamo riscaldandoci un po'... 8 domande, nessuna pressione, nessun voto, solo il piacere di testare la tua cultura Star Fruits. Il vincitore se ne andrà con tutta la nostra ammirazione... e forse una sorpresa.",
    nameLabel: "Il tuo nome",
    namePlaceholder: "Inserisci il tuo nome o soprannome",
    startButton: "Inizia Quiz",
    validateButton: "Conferma",
    nextButton: "Avanti",
    finishButton: "Vedi Risultati",
    retryButton: "Riprova",
    questionsTitle: "Domanda",
    resultTitle: "Risultati",
    multipleChoiceNotice: "(Scelte multiple possibili)",
    resultLow: "Grazie per aver partecipato! Stai scoprendo l'universo Star Fruits.",
    resultMedium: "Non male! Hai una buona conoscenza di Star Fruits.",
    resultHigh: "Eccellente! Sei un vero esperto Star Fruits!",
    scoreLabel: "Il tuo punteggio:",
    adminTitle: "Amministrazione",
    adminPasswordPlaceholder: "Password",
    adminLoginButton: "Accesso",
    adminTableName: "Nome",
    adminTableScore: "Punteggio",
    adminTableLanguage: "Lingua",
    adminTableDate: "Data",
    adminClearButton: "Cancella tutto",
    adminExportButton: "Esporta CSV",
    adminStatsTitle: "Statistiche",
    adminTotalPart: "Partecipanti",
    adminAvgScore: "Media",
    adminBestScore: "Miglior punteggio",
    adminLoginError: "Password errata",
    adminNoData: "Nessun risultato salvato.",
    adminTabQuiz: "Risultati Quiz",
    adminTabSurvey: "Sondaggi",

    surveyTitle: "Mini-sondaggio (Bonus)",
    surveyIntro: "Valuta Star Fruits (1-5) e dacci il tuo feedback per aiutarci a migliorare.",
    surveySectionPortfolio: "Diversità e qualità del portafoglio varietale",
    surveySectionTech: "Reattività tecnica",
    surveySectionComm: "Reattività commerciale",
    surveyLabelWhy: "Perché?",
    surveyLabelTechInfo: "Qualità delle informazioni tecniche?",
    surveyLabelStrengths: "In 1 frase: Qualità e difetti maggiori?",
    surveyLabelSynergy: "I tuoi consigli per migliorare la sinergia (Tu / Star Fruits / Star Export)?",
    surveySubmit: "Invia sondaggio",
    surveySubmitted: "Grazie per il tuo prezioso feedback!",
    surveyItemApple: "Mela",
    surveyItemPear: "Pera",
    surveyItemPeach: "Pesca/Nettarina",
    surveyItemApricot: "Albicocca",
    surveyItemCherry: "Ciliegia",

    questions: {
      q1: {
        text: "Qual è la prima varietà introdotta in Star Fruits?",
        options: ["SUPERMELRED® Marstar", "Laycot", "REDWINTER® Redaphough", "MAYCREST® Minastar", "Cripps Pink", "Orangered® Bhart"]
      },
      q2: {
        text: "Chi sono i membri storici di Star Fruits?",
        options: ["Millet", "Grard", "Veauvy", "Toulemonde", "Robin", "Viguier", "Vendries", "Demols"]
      },
      q3: {
        text: "In quale anno è stata creata Star Fruits?",
        options: ["1959", "1968", "1973", "1982"]
      },
      q4: {
        text: "Quale/i di queste specie non è mai stata lavorata da Star Fruits?",
        options: ["Kiwi", "Uva", "Mandorla", "Mirtillo", "Susina europea"]
      },
      q5: {
        text: "Su quale specie abbiamo oggi il maggior numero di varietà in prova?",
        options: ["Pesca (tutte)", "Nettarina (tutte)", "Pera", "Mela", "Albicocca"]
      },
      q6: {
        text: "Quali difetti si osservano frequentemente nelle pere rosse?",
        options: ["Astringencia", "Vigore eccessivo", "Mancanza di ramificazione", "Forte presenza de cellule pietrose", "Basso potenziale di conservazione", "Mancanza di aromi"]
      },
      q7: {
        text: "Quale/i di queste varietà di pesche/nettarine esiste/ono realmente?",
        options: ["Najory", "Nabeon", "Nabim", "Early Queen", "Monnoir"]
      },
      q8: {
        text: "Chi NON è impollinatore di Henriette?",
        options: ["Glenoia", "Louis", "Black Star", "Areko"]
      }
    }
  }
};
