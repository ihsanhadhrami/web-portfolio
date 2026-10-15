import type { TranslationSample } from '@/types';

/**
 * Personal translation sample. Client work is confidential, so this uses
 * a public news report as the source text. Only an excerpt is published:
 * the headline and five paragraphs, credited and linked to the original.
 *
 * The Malay and English are Ihsan's own translations, reproduced as he
 * wrote them.
 */
export const nobelChemistry2024: TranslationSample = {
  source: {
    title:
      'نوبل للكيمياء 2024.. اثنان من الفائزين يأملان أن تتيح أبحاثهما التوصل لأدوية بشكل أسرع',
    publisher: 'Al Jazeera Net (via AFP)',
    date: '2024-10-10',
    url: 'https://www.aljazeera.net/health/2024/10/10/%D9%86%D9%88%D8%A8%D9%84-%D9%84%D9%84%D9%83%D9%8A%D9%85%D9%8A%D8%A7%D8%A1-2024-%D8%A7%D8%AB%D9%86%D8%A7%D9%86-%D9%85%D9%86-%D8%A7%D9%84%D9%81%D8%A7%D8%A6%D8%B2%D9%8A%D9%86',
  },
  headline: {
    ar: 'نوبل للكيمياء 2024.. اثنان من الفائزين يأملان أن تتيح أبحاثهما التوصل لأدوية بشكل أسرع',
    ms: 'Hadiah Nobel Kimia 2024.. Dua daripada pemenang anugerah tersebut berharap agar penyelidikan mereka dapat membantu dalam penghasilan ubat dengan lebih cepat.',
    en: 'Nobel Prize in Chemistry 2024: Two winners hope their research will help develop medicines faster',
  },
  passages: [
    {
      ar: 'يأمل اثنان من الفائزين الثلاثة بجائزة نوبل في الكيمياء -الذين كوفئوا لكشفهم أسرار البروتينات بالاعتماد على الذكاء الاصطناعي- أن تتيح أبحاثهما "تقدما علميا مذهلا" وصحة جيدة للناس والتوصل إلى أدوية، لكنهما حذرا أمس الأربعاء من إساءة استخدام الذكاء الاصطناعي.',
      ms: 'Dua daripada tiga pemenang Hadiah Nobel dalam bidang Kimia – yang diberikan penghargaan atas penemuan rahsia protein menggunakan kecerdasan buatan (AI) – berharap penyelidikan mereka akan membawa kepada “kemajuan sains yang luar biasa” dan kesihatan yang lebih baik untuk manusia serta penghasilan ubat-ubatan, namun mereka juga memberi amaran akan potensi penyalahgunaan kecerdasan buatan.',
      en: 'Two of the three Nobel Prize winners in Chemistry—who were honored for uncovering the secrets of proteins using artificial intelligence—hope that their research will lead to “amazing scientific progress,” better health for people, and the development of new medicines. However, they cautioned on Wednesday about the potential misuse of artificial intelligence.',
    },
    {
      ar: 'وتمكّن الأميركيان ديفيد بيكر وجون جامبر والبريطاني ديميس هاسابيس من فك رموز هياكل البروتينات، إذ تلعب الجزيئات دورا أساسيا في كل وظائف الكائنات الحية تقريبا.',
      ms: 'David Baker dan John Jumper, kedua-dua dari Amerika, serta Demis Hassabis dari Britain, telah berjaya memecahkan kod struktur protein, di mana molekul tersebut memainkan peranan peri penting dalam hampir semua fungsi hidupan.',
      en: 'The two Americans, David Baker and John Jumper, along with British Demis Hassabis, succeeded in deciphering the structures of proteins, molecules that play a key role in nearly all biological functions.',
    },
    {
      ar: 'ويتولى هاسابيس وجامبر إدارة شركة "غوغل ديبمايند"، وقد طورا سنة 2020 نموذج ذكاء اصطناعي يسمى "ألفافولد 2" لتحديد بنية البروتينات.',
      ms: 'Hassabis dan Jumper mengendalikan syarikat “Google DeepMind” dan pada tahun 2020, mereka mengembangkan model kecerdasan buatan (AI) yang disebut sebagai “AlphaFold 2” untuk menentukan struktur protein.',
      en: 'Hassabis and Jumper manage Google DeepMind and, in 2020, they developed an artificial intelligence model called AlphaFold 2 to determine the structure of proteins.',
    },
    {
      ar: 'أما هاسابيس فأوضح أن أبحاثهما قد تساهم بقدر كبير في التوصل إلى أدوية، مما يقلل وقت العمل المطلوب "من عقد تقريبا أو أكثر إلى بضعة أشهر ربما".',
      ms: 'Sementara itu, Hassabis menjelaskan bahawa penyelidikan mereka mungkin menyumbang besar kepada penghasilan ubat-ubatan, yang akan mengurangkan masa yang diperlukan “dari hampir satu dekad atau lebih, kepada beberapa bulan sahaja mungkin.”',
      en: 'Hassabis explained that their research could greatly contribute to the development of medicines, reducing the time required “from about a decade or more to just a few months.”',
    },
    {
      ar: 'لكن هاسابيس (48 عاما) حرص على التحذير من المخاطر المرتبطة بالذكاء الاصطناعي "إحدى أكثر التقنيات التحويلية في تاريخ البشرية".',
      ms: 'Namun, Hassabis, 48, memberi amaran mengenai risiko berkaitan dengan kecerdasan buatan, yang disebutnya sebagai “salah satu teknologi yang paling ‘bertransformasi’ dalam sejarah manusia.”',
      en: 'However, Hassabis (48 years old) was careful to warn of the risks associated with artificial intelligence, calling it “one of the most transformative technologies in human history.”',
    },
  ],
};
