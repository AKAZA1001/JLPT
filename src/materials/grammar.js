export const grammarData = [
  // N5 Grammar
  {
    id: 1,
    pattern: '〜は〜です',
    meaning: 'X is Y (Copula)',
    level: 'N5',
    explanation: 'Used to state that X is Y. は is the topic marker, です is the copula (to be).',
    examples: [
      { japanese: 'わたしは学生です。', romaji: 'Watashi wa gakusei desu.', english: 'I am a student.' },
      { japanese: 'これは本です。', romaji: 'Kore wa hon desu.', english: 'This is a book.' },
    ],
    tip: 'は marks the TOPIC of the sentence, not always the subject.',
    category: 'Basic'
  },
  {
    id: 2,
    pattern: '〜じゃないです',
    meaning: 'X is not Y (Negative copula)',
    level: 'N5',
    explanation: 'Negative form of です. Used to deny or negate.',
    examples: [
      { japanese: 'わたしは先生じゃないです。', romaji: 'Watashi wa sensei ja nai desu.', english: 'I am not a teacher.' },
      { japanese: 'これは本じゃないです。', romaji: 'Kore wa hon ja nai desu.', english: 'This is not a book.' },
    ],
    tip: 'ではありません is the more formal version.',
    category: 'Basic'
  },
  {
    id: 3,
    pattern: 'Verb + ます',
    meaning: 'Polite present/future verb form',
    level: 'N5',
    explanation: 'The ます form is the polite, non-past form of a verb.',
    examples: [
      { japanese: '毎日学校に行きます。', romaji: 'Mainichi gakkō ni ikimasu.', english: 'I go to school every day.' },
      { japanese: '明日来ます。', romaji: 'Ashita kimasu.', english: 'I will come tomorrow.' },
    ],
    tip: 'Use ません for negative: 行きません (do not go)',
    category: 'Verbs'
  },
  {
    id: 4,
    pattern: '〜て form',
    meaning: 'Te-form - connecting actions',
    level: 'N5',
    explanation: 'The te-form connects verbs and adjectives. It is used to create many other forms.',
    examples: [
      { japanese: '食べて、飲みます。', romaji: 'Tabete, nomimasu.', english: 'I eat and then drink.' },
      { japanese: '手を洗ってください。', romaji: 'Te wo aratte kudasai.', english: 'Please wash your hands.' },
    ],
    tip: 'Te-form conjugation: u-verbs: く→いて, ぬ/ぶ/む→んで, ru-verbs: remove る, add て',
    category: 'Verbs'
  },
  {
    id: 5,
    pattern: '〜ています',
    meaning: 'Progressive / State',
    level: 'N5',
    explanation: 'Indicates an ongoing action or a state resulting from an action.',
    examples: [
      { japanese: '今、テレビを見ています。', romaji: 'Ima, terebi wo mite imasu.', english: 'I am watching TV now.' },
      { japanese: '結婚しています。', romaji: 'Kekkon shite imasu.', english: 'I am married.' },
    ],
    tip: 'Also used for habitual actions: 毎日運動しています。',
    category: 'Verbs'
  },
  // N4 Grammar
  {
    id: 6,
    pattern: '〜てしまう',
    meaning: 'Completeness / Regret',
    level: 'N4',
    explanation: 'Indicates something is done completely, often with regret or unintentionally. Casual form: 〜ちゃう',
    examples: [
      { japanese: 'お金を全部使ってしまいました。', romaji: 'Okane wo zenbu tsukatte shimaimashita.', english: 'I ended up using all the money (regrettably).' },
      { japanese: '宿題を忘れてしまった。', romaji: 'Shukudai wo wasurete shimatta.', english: 'I completely forgot my homework.' },
    ],
    tip: 'Casual: 〜ちゃった。 食べちゃった = I ended up eating it all.',
    category: 'Te-form'
  },
  {
    id: 7,
    pattern: '〜てある',
    meaning: 'Resultant state (done by someone)',
    level: 'N4',
    explanation: 'Shows that something has been done and the result remains. Implies someone did it intentionally.',
    examples: [
      { japanese: '窓が開けてあります。', romaji: 'Mado ga akete arimasu.', english: 'The window has been opened (and remains open).' },
      { japanese: '予約がしてあります。', romaji: 'Yoyaku ga shite arimasu.', english: 'A reservation has been made.' },
    ],
    tip: 'Compare with ている: 窓が開いています = The window is open (just a state).',
    category: 'Te-form'
  },
  {
    id: 8,
    pattern: '〜ておく',
    meaning: 'Do in advance / preparation',
    level: 'N4',
    explanation: 'Indicates doing something in advance or preparing for something future.',
    examples: [
      { japanese: '旅行の前にホテルを予約しておきます。', romaji: 'Ryokō no mae ni hoteru wo yoyaku shite okimasu.', english: 'I will book a hotel in advance before the trip.' },
      { japanese: '冷蔵庫に食べ物を入れておいてください。', romaji: 'Reizōko ni tabemono wo irete oite kudasai.', english: 'Please put food in the fridge (for later).' },
    ],
    tip: 'Casual form: 〜とく。 食べとく = eat it in advance.',
    category: 'Te-form'
  },
  {
    id: 9,
    pattern: 'Potential Form 〜られる/〜える',
    meaning: 'Can do / Ability',
    level: 'N4',
    explanation: 'Expresses ability or possibility. Ru-verbs: replace る with られる. U-verbs: change final u to eru.',
    examples: [
      { japanese: '日本語が話せます。', romaji: 'Nihongo ga hanasemasu.', english: 'I can speak Japanese.' },
      { japanese: '一人で行けますか？', romaji: 'Hitori de ikemasu ka?', english: 'Can you go alone?' },
    ],
    tip: 'が is often used with potential form instead of を: 日本語を話す → 日本語が話せる',
    category: 'Verb Forms'
  },
  {
    id: 10,
    pattern: '〜たら',
    meaning: 'If / When (conditional)',
    level: 'N4',
    explanation: 'Expresses a condition. When A happens, B happens. Often implies sequence.',
    examples: [
      { japanese: '雨が降ったら、家にいます。', romaji: 'Ame ga futtara, ie ni imasu.', english: 'If it rains, I will stay home.' },
      { japanese: '駅に着いたら、電話してください。', romaji: 'Eki ni tsuitara, denwa shite kudasai.', english: 'When you arrive at the station, please call me.' },
    ],
    tip: 'Different from ば: たら can be used for one-time events, ば is more general.',
    category: 'Conditionals'
  },
  {
    id: 11,
    pattern: '〜ば',
    meaning: 'If (hypothetical conditional)',
    level: 'N4',
    explanation: 'Expresses a hypothetical condition. More literary/formal than たら.',
    examples: [
      { japanese: 'お金があれば、買います。', romaji: 'Okane ga areba, kaimasu.', english: 'If I have money, I will buy it.' },
      { japanese: '急げば間に合います。', romaji: 'Isogeba ma ni aimasu.', english: 'If you hurry, you\'ll make it in time.' },
    ],
    tip: 'Verb conjugation: u-verb last vowel u→eba. いく→いけば, る-verb: replace る with れば',
    category: 'Conditionals'
  },
  {
    id: 12,
    pattern: '〜のに',
    meaning: 'Although / Despite / Even though',
    level: 'N4',
    explanation: 'Expresses contrast or disappointment. Speaker expected something different.',
    examples: [
      { japanese: 'たくさん勉強したのに、試験に落ちた。', romaji: 'Takusan benkyō shita noni, shiken ni ochita.', english: 'Even though I studied a lot, I failed the exam.' },
      { japanese: '高いのに、おいしくない。', romaji: 'Takai noni, oishikunai.', english: 'Even though it\'s expensive, it\'s not tasty.' },
    ],
    tip: 'Shows the speaker\'s surprise or dissatisfaction. Different from けど (which is neutral).',
    category: 'Conjunctions'
  },
  {
    id: 13,
    pattern: 'Passive 〜られる',
    meaning: 'Something is done to someone',
    level: 'N4',
    explanation: 'The passive form shows that the subject receives an action. Often implies inconvenience.',
    examples: [
      { japanese: '先生に褒められました。', romaji: 'Sensei ni homeraremashita.', english: 'I was praised by the teacher.' },
      { japanese: '雨に降られた。', romaji: 'Ame ni furareta.', english: 'I was rained on (inconvenienced by rain).' },
    ],
    tip: 'に marks who did the action. Ru-verbs: る→られる. U-verbs: last sound う→あ+れる',
    category: 'Verb Forms'
  },
  {
    id: 14,
    pattern: 'Causative 〜させる',
    meaning: 'Make / Let someone do something',
    level: 'N4',
    explanation: 'The causative form means you make or let someone do something.',
    examples: [
      { japanese: '子供に野菜を食べさせました。', romaji: 'Kodomo ni yasai wo tabesasemashita.', english: 'I made the child eat vegetables.' },
      { japanese: '行かせてください。', romaji: 'Ikasete kudasai.', english: 'Please let me go.' },
    ],
    tip: 'Ru-verbs: replace る with させる. U-verbs: last sound う→あ+せる',
    category: 'Verb Forms'
  },
  {
    id: 15,
    pattern: '〜そうです',
    meaning: 'Looks like / Seems (based on appearance)',
    level: 'N4',
    explanation: 'Based on direct observation, something appears to be a certain way.',
    examples: [
      { japanese: 'あの料理はおいしそうです。', romaji: 'Ano ryōri wa oishisō desu.', english: 'That dish looks delicious.' },
      { japanese: '雨が降りそうです。', romaji: 'Ame ga furisō desu.', english: 'It looks like it\'s going to rain.' },
    ],
    tip: 'い-adj: drop い add そう. な-adj/Noun: add そう. Verb: stem + そう.',
    category: 'Expressions'
  },
  {
    id: 16,
    pattern: '〜ようになる',
    meaning: 'Become able to / Come to do',
    level: 'N4',
    explanation: 'Expresses a change in ability or habit over time.',
    examples: [
      { japanese: '日本語が話せるようになりました。', romaji: 'Nihongo ga hanaseru yō ni narimashita.', english: 'I became able to speak Japanese.' },
      { japanese: '毎日運動するようになりました。', romaji: 'Mainichi undō suru yō ni narimashita.', english: 'I came to exercise every day.' },
    ],
    tip: 'Compare with 〜ようにする (make an effort to do): 早く寝るようにしています.',
    category: 'Change'
  },
  {
    id: 17,
    pattern: '〜かもしれない',
    meaning: 'Might / Maybe / Perhaps',
    level: 'N4',
    explanation: 'Expresses uncertainty or possibility. Less certain than はずだ.',
    examples: [
      { japanese: '明日は雨かもしれません。', romaji: 'Ashita wa ame kamo shiremasen.', english: 'It might rain tomorrow.' },
      { japanese: '彼は来ないかもしれない。', romaji: 'Kare wa konai kamo shirenai.', english: 'He might not come.' },
    ],
    tip: 'Casual: かもしれない → かも. とても難しいかも。',
    category: 'Expressions'
  },
  {
    id: 18,
    pattern: '〜はずです',
    meaning: 'Should be / Expected to be',
    level: 'N4',
    explanation: 'Expresses strong expectation based on knowledge or reasoning.',
    examples: [
      { japanese: '彼は来るはずです。', romaji: 'Kare wa kuru hazu desu.', english: 'He should come (I expect him to).' },
      { japanese: 'このボタンを押せばドアが開くはずです。', romaji: 'Kono botan wo oseba doa ga hiraku hazu desu.', english: 'If you press this button, the door should open.' },
    ],
    tip: 'はずがない = there is no way that... 彼が嘘をつくはずがない。',
    category: 'Expressions'
  },
  {
    id: 19,
    pattern: '〜ながら',
    meaning: 'While doing / Simultaneously',
    level: 'N4',
    explanation: 'Two actions happening at the same time by the same person.',
    examples: [
      { japanese: '音楽を聞きながら、勉強します。', romaji: 'Ongaku wo kikinagara, benkyō shimasu.', english: 'I study while listening to music.' },
      { japanese: '歩きながら食べてはいけない。', romaji: 'Arukinagara tabete wa ikenai.', english: 'You should not eat while walking.' },
    ],
    tip: 'The main action is the second verb. ながら attaches to verb stem (ます stem).',
    category: 'Conjunctions'
  },
  {
    id: 20,
    pattern: '〜ために',
    meaning: 'In order to / For the purpose of',
    level: 'N4',
    explanation: 'Expresses purpose or goal. Used when the subject does something intentionally.',
    examples: [
      { japanese: '日本語を勉強するために、毎日練習します。', romaji: 'Nihongo wo benkyō suru tame ni, mainichi renshū shimasu.', english: 'In order to study Japanese, I practice every day.' },
      { japanese: '健康のために、運動しています。', romaji: 'Kenkō no tame ni, undō shite imasu.', english: 'I exercise for my health.' },
    ],
    tip: 'Compare with 〜ように: ように is for states/natural changes, ために is for intentional goals.',
    category: 'Purpose'
  },
];