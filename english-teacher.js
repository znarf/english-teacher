const SpeechToText = require('google-speech-from-buffer');
const MicToSpeech = require('mic-to-speech');
const say = require('say');

const LANGUAGE = 'en-US';

// On Mac OS, use `say -v '?'` in the terminal and pick a voice matching the language
const VOICE_ENGLISH = 'Kate';
const VOICE_FRENCH = 'Audrey';

const WORDS = {
  "cochon d'inde": 'guinea pig',
  'chanteur ou chanteuse': 'singer',
  'salle de bain': 'bathroom',
  // boutique: 'shop',
  // boutique: 'store',
  // caillou: 'stone',
  // est: 'east', //
  // fille: 'daugther' // duplicate with girl
  // rocher: 'rock',
  abeille: 'bee',
  amour: 'love',
  anniversaire: 'birthday',
  arbre: 'tree',
  automne: 'autumn',
  aveugle: 'blind',
  aéroport: 'airport',
  bain: 'bath',
  ballon: 'ball',
  banque: 'bank',
  bateau: 'boat',
  bibliothèque: 'library',
  bière: 'beer',
  blague: 'joke',
  blanc: 'white',
  bleu: 'blue',
  bois: 'wood',
  boisson: 'drink',
  bouclier: 'shield',
  boîte: 'box',
  bras: 'arm',
  brun: 'brown',
  brûlant: 'hot',
  bureau: 'office',
  // bus: 'bus', //
  bébé: 'baby',
  cadeau: 'gift',
  carré: 'square',
  cercle: 'circle',
  cerveau: 'brain',
  chaise: 'chair',
  chambre: 'bedroom',
  chanson: 'song',
  chapeau: 'hat',
  chat: 'cat',
  chateau: 'castle',
  chaud: 'warm',
  chaussure: 'shoe',
  chemise: 'shirt',
  chevalier: 'knight',
  cheveu: 'hair',
  chien: 'dog',
  chocolat: 'chocolate',
  ciel: 'sky',
  coeur: 'heart',
  couteau: 'knife',
  cuillère: 'spoon',
  cuir: 'leather',
  cuisine: 'kitchen',
  dessin: 'drawing',
  diable: 'devil',
  dieu: 'god',
  doigt: 'finger',
  douche: 'shower',
  douleur: 'pain',
  désastre: 'disaster',
  eau: 'water',
  enfant: 'child', // or kid?
  femme: 'woman',
  fenêtre: 'window',
  fille: 'girl',
  fils: 'son',
  force: 'force',
  fourchette: 'fork',
  froid: 'cold',
  fruit: 'fruit',
  frère: 'brother',
  fumée: 'smoke',
  garçon: 'boy',
  gateau: 'cake',
  genou: 'knee',
  histoire: 'story',
  hiver: 'winter',
  hopital: 'hospital',
  idée: 'idea',
  image: 'picture',
  invité: 'guest',
  jardin: 'garden',
  jaune: 'yellow',
  jeu: 'game',
  jouet: 'toy',
  joueur: 'player',
  journal: 'newspaper',
  jupe: 'skirt',
  lait: 'milk',
  langue: 'tongue',
  lapin: 'rabbit', // or bunny?
  liberté: 'freedom',
  ligne: 'line',
  lit: 'bed',
  livre: 'book',
  lumière: 'light',
  lune: 'moon',
  légume: 'vegetable',
  main: 'hand',
  maison: 'house',
  mariage: 'wedding',
  mensonge: 'lie',
  message: 'message',
  miel: 'honey',
  montagne: 'mountain',
  muscle: 'muscle',
  neige: 'snow',
  nez: 'nose',
  noir: 'black',
  nord: 'north',
  nourriture: 'food',
  nuage: 'cloud',
  nuit: 'night',
  oeuf: 'egg',
  oiseau: 'bird',
  orange: 'orange',
  ordinateur: 'computer',
  ouest: 'west',
  ours: 'bear',
  outil: 'tool',
  pain: 'bread',
  pays: 'country',
  peinture: 'paint',
  peur: 'fear',
  pied: 'foot',
  plage: 'beach',
  pluie: 'rain',
  poisson: 'fish',
  poivre: 'pepper',
  pomme: 'apple',
  porte: 'door',
  poussière: 'dust',
  printemps: 'spring',
  professeur: 'teacher',
  recette: 'recipe',
  reine: 'queen',
  rivière: 'river',
  riz: 'rice',
  robe: 'dress',
  roi: 'king',
  rouge: 'red',
  sable: 'sand',
  sabre: 'saber',
  salade: 'salad',
  sang: 'blood',
  savon: 'soap',
  sel: 'salt',
  semaine: 'week',
  siège: 'seat',
  soeur: 'sister',
  soleil: 'sun',
  sombre: 'dark',
  sortie: 'exit',
  sourd: 'deaf',
  souris: 'mouse',
  sucre: 'sugar',
  sud: 'south',
  supermarché: 'supermarket',
  surprise: 'surprise',
  table: 'table',
  tempète: 'storm',
  température: 'temperature',
  tigre: 'tiger',
  tomate: 'tomato',
  trou: 'hole',
  tête: 'head',
  vacances: 'holiday',
  vert: 'green',
  veste: 'jacket',
  vie: 'life',
  ville: 'city',
  vin: 'wine',
  violet: 'purple', // or violet ?
  voiture: 'car',
  vélo: 'bike', // or bicycle?
  école: 'school',
  église: 'church',
  élève: 'student',
  équipe: 'team',
  étoile: 'star',
  été: 'summer',
};

const PLAYERS = ['Julie', 'Léonie', 'François', 'Chloé'];

const CORRECT = ['Super!', 'Bien!', 'Parfait!', 'Génial!', 'Excellent!'];

const ANSWER_WAS = [
  'La bonne réponse était ...',
  'Il fallait dire ...',
  'Je voulais entendre ...',
];

const HEARD = [`J'ai compris ...`, 'Tu as dit ...', `J'ai entendu  ...`];

const speechToTextConfig = { languageCode: LANGUAGE };

async function saySomething(something, voice = VOICE_ENGLISH) {
  console.log(something);
  return new Promise((resolve) => {
    say.speak(something, voice, 1.0, (err) => {
      if (err) {
        console.log(err);
      }
      resolve();
    });
  });
}

async function listen(speechContext = {}) {
  const micToSpeech = new MicToSpeech();

  const speechToText = new SpeechToText({
    ...speechToTextConfig,
    speechContexts: [speechContext],
  });

  return new Promise((resolve) => {
    micToSpeech.on('speech', async (buffer) => {
      console.log('Heard something. Analyzing ...');
      micToSpeech.pause();
      let statement = await speechToText.recognize(buffer);
      statement = statement || '';
      statement = statement.toLowerCase().trim();
      if (!statement) {
        await saySomething(`Répète?`, VOICE_FRENCH);
        micToSpeech.resume();
      } else {
        micToSpeech.stop();
        resolve(statement);
      }
    });

    micToSpeech.start();
  });
}

function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomWord() {
  const list = Object.entries(WORDS);

  return randomFromArray(list);
}

async function question(wordInFrench, wordInEnglish) {
  const player = randomFromArray(PLAYERS);

  await saySomething(
    `${player}? Comment dit-on ... ${wordInFrench}?`,
    VOICE_FRENCH
  );

  const answer = await listen({ phrases: [wordInEnglish] });
  if (answer === wordInEnglish || answer === `${wordInEnglish}s`) {
    await saySomething(randomFromArray(CORRECT), VOICE_FRENCH);
  } else {
    await saySomething(randomFromArray(HEARD), VOICE_FRENCH);
    await saySomething(answer, VOICE_ENGLISH);

    await saySomething(randomFromArray(ANSWER_WAS), VOICE_FRENCH);
    await saySomething(wordInEnglish, VOICE_ENGLISH);
  }

  play();
}

async function play() {
  const [wordInFrench, wordInEnglish] = randomWord();

  question(wordInFrench, wordInEnglish);
}

async function start() {
  await saySomething(
    `Bonjour! Bienvenue dans le cour d'Anglais. Je vais vous poser des questions à tour de rôle.`,
    VOICE_FRENCH
  );

  play();
}

start();
