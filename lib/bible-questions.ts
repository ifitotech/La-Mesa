export type BibleQuestion = { id: string; question: string; options: string[]; answer: number };

const spanishQuestions: BibleQuestion[] = [
  { id: "b-es-1", question: "¿Quién construyó el arca antes del diluvio?", options: ["Moisés", "Noé", "Abraham", "David"], answer: 1 },
  { id: "b-es-2", question: "¿Quién recibió los Diez Mandamientos?", options: ["Josué", "Moisés", "Elías", "Pedro"], answer: 1 },
  { id: "b-es-3", question: "¿En qué ciudad nació Jesús?", options: ["Nazaret", "Jerusalén", "Belén", "Galilea"], answer: 2 },
  { id: "b-es-4", question: "¿Quién derrotó a Goliat?", options: ["Saúl", "David", "Samuel", "Salomón"], answer: 1 },
  { id: "b-es-5", question: "¿Cuántos discípulos principales tuvo Jesús?", options: ["10", "12", "20", "40"], answer: 1 },
  { id: "b-es-6", question: "¿Qué mar se abrió para que los israelitas cruzaran?", options: ["Mar de Galilea", "Mar Rojo", "Mar Muerto", "Mar Mediterráneo"], answer: 1 },
  { id: "b-es-7", question: "¿Quién fue tragado por un gran pez?", options: ["Jonás", "Job", "José", "Juan"], answer: 0 },
  { id: "b-es-8", question: "¿Qué rey pidió sabiduría a Dios?", options: ["Salomón", "Herodes", "Acab", "Ciro"], answer: 0 },
  { id: "b-es-9", question: "¿Cuál es el primer libro de la Biblia?", options: ["Éxodo", "Génesis", "Salmos", "Mateo"], answer: 1 },
  { id: "b-es-10", question: "¿Quién bautizó a Jesús?", options: ["Pedro", "Juan el Bautista", "Santiago", "Andrés"], answer: 1 },
  { id: "b-es-11", question: "¿En qué río fue bautizado Jesús?", options: ["Nilo", "Jordán", "Éufrates", "Tigris"], answer: 1 },
  { id: "b-es-12", question: "¿Quién interpretó sueños en Egipto y llegó a ser gobernante?", options: ["José", "Daniel", "Isaac", "Jacob"], answer: 0 },
  { id: "b-es-13", question: "¿Cuál fue el primer milagro de Jesús según el Evangelio de Juan?", options: ["Caminar sobre el agua", "Sanar a un ciego", "Convertir agua en vino", "Alimentar a cinco mil"], answer: 2 },
  { id: "b-es-14", question: "¿Quién negó conocer a Jesús tres veces?", options: ["Tomás", "Pedro", "Judas", "Felipe"], answer: 1 },
  { id: "b-es-15", question: "¿Qué ciudad tenía muros que cayeron después de que el pueblo marchó alrededor?", options: ["Jericó", "Babilonia", "Roma", "Damasco"], answer: 0 },
  { id: "b-es-16", question: "¿Quién escribió muchos de los Salmos?", options: ["David", "Pablo", "Moisés", "Isaías"], answer: 0 },
  { id: "b-es-17", question: "¿Cuántos días y noches llovió durante el diluvio, según Génesis?", options: ["7", "12", "30", "40"], answer: 3 },
  { id: "b-es-18", question: "¿Qué apóstol era cobrador de impuestos antes de seguir a Jesús?", options: ["Mateo", "Juan", "Bartolomé", "Judas"], answer: 0 },
];

const englishQuestions: BibleQuestion[] = [
  { id: "b-en-1", question: "Who built the ark before the flood?", options: ["Moses", "Noah", "Abraham", "David"], answer: 1 },
  { id: "b-en-2", question: "Who received the Ten Commandments?", options: ["Joshua", "Moses", "Elijah", "Peter"], answer: 1 },
  { id: "b-en-3", question: "In which city was Jesus born?", options: ["Nazareth", "Jerusalem", "Bethlehem", "Galilee"], answer: 2 },
  { id: "b-en-4", question: "Who defeated Goliath?", options: ["Saul", "David", "Samuel", "Solomon"], answer: 1 },
  { id: "b-en-5", question: "How many main disciples did Jesus have?", options: ["10", "12", "20", "40"], answer: 1 },
  { id: "b-en-6", question: "Which sea was parted for the Israelites to cross?", options: ["Sea of Galilee", "Red Sea", "Dead Sea", "Mediterranean Sea"], answer: 1 },
  { id: "b-en-7", question: "Who was swallowed by a great fish?", options: ["Jonah", "Job", "Joseph", "John"], answer: 0 },
  { id: "b-en-8", question: "Which king asked God for wisdom?", options: ["Solomon", "Herod", "Ahab", "Cyrus"], answer: 0 },
  { id: "b-en-9", question: "What is the first book of the Bible?", options: ["Exodus", "Genesis", "Psalms", "Matthew"], answer: 1 },
  { id: "b-en-10", question: "Who baptized Jesus?", options: ["Peter", "John the Baptist", "James", "Andrew"], answer: 1 },
  { id: "b-en-11", question: "In which river was Jesus baptized?", options: ["Nile", "Jordan", "Euphrates", "Tigris"], answer: 1 },
  { id: "b-en-12", question: "Who interpreted dreams in Egypt and became a ruler?", options: ["Joseph", "Daniel", "Isaac", "Jacob"], answer: 0 },
  { id: "b-en-13", question: "What was Jesus' first miracle in the Gospel of John?", options: ["Walking on water", "Healing a blind man", "Turning water into wine", "Feeding five thousand"], answer: 2 },
  { id: "b-en-14", question: "Who denied knowing Jesus three times?", options: ["Thomas", "Peter", "Judas", "Philip"], answer: 1 },
  { id: "b-en-15", question: "Which city's walls fell after the people marched around them?", options: ["Jericho", "Babylon", "Rome", "Damascus"], answer: 0 },
  { id: "b-en-16", question: "Who wrote many of the Psalms?", options: ["David", "Paul", "Moses", "Isaiah"], answer: 0 },
  { id: "b-en-17", question: "How many days and nights did it rain during the flood in Genesis?", options: ["7", "12", "30", "40"], answer: 3 },
  { id: "b-en-18", question: "Which apostle was a tax collector before following Jesus?", options: ["Matthew", "John", "Bartholomew", "Judas"], answer: 0 },
];

export function getBibleQuestions(language: "es" | "en", amount = 10) { return [...(language === "en" ? englishQuestions : spanishQuestions)].sort(() => Math.random() - 0.5).slice(0, amount); }
