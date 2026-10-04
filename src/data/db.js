import booksData from './books.json';
import sectionsData from './sections.json';
import hikmatData from './hikmat.json';
import teamData from './team.json';
import quizzesData from './quizzes.json';
import questionsData from './questions.json';

export const books = booksData;
export const sections = sectionsData;
export const hikmatlar = hikmatData;
export const team = teamData;
export const quizzes = quizzesData;
export const questions = questionsData;

// Helper to find book by ID
export const getBookById = (id) => books.find(b => b.id === id);

// Helper to find section by ID
export const getSectionById = (id) => sections.find(s => s.id === id);

// Sample chapters for interactive reader
export const getBookContent = (bookId) => {
  return [
    {
      id: 1,
      title: "Muqaddima",
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      content: `Barcha maqtovlar olamlarning Parvardigori bo'lmish Alloh taologa xosdir. U Zot insoniyatni aql ne'mati bilan sharafladi, haqiqat yo'lini ochib beruvchi payg'ambarlarni yubordi.

Imom Abu Mansur al-Moturidiy (870–944) Samarqandning Moturid qishlog'ida tavallud topib, butun umrini islom e'tiqodi sofligini saqlash, Qur'on va sunnat asoslarini sog'lom aqliy dalillar bilan himoya qilishga bag'ishladi.

Movarounnahr zaminida shakllangan Moturidiylik ta'limoti aql va naql (vahiy) uyg'unligini oliy darajaga ko'tardi. Mazkur risolada allomaning ilmiy faoliyati, tafakkur uslubi va uning jahon sivilizatsiyasiga qo'shgan hissasi tadqiq etiladi.`
    },
    {
      id: 2,
      title: "1-Bob: Samarqand ilmiy muhiti va Allomaning hayot yo'li",
      arabic: "فَصْلٌ فِي بَيَانِ نَشْأَةِ الإِمَامِ وَبِيئَتِهِ العِلْمِيَّةِ",
      content: `IX-X asrlarda Samarqand shahri islom olamining eng yirik ilmiy va madaniy markazlaridan biriga aylangan edi. Dor al-Juzjoniya kabi nufuzli ilmiy maskanlarda yuzlab allomalar, faqihlar va muhaddislar dars bergan.

Abu Mansur al-Moturidiy Imom Abu Hanifa rahimahullohning bevosita shogirdlari orqali yetib kelgan fiqh va kalom an'analarini o'zlashtirdi. Uning ustozlari orasida Abu Bakr Ahmad al-Juzjoniy, Abu Nasr Ahmad al-Iyodiy kabi yetuk ulamolar bo'lgan.

Alloma faqatgina ilmiy nazariyalar bilan cheklanib qolmay, turli adashgan firqalar va botil qarashlarga qarshi aqliy va naqliy raddiyalar yozdi.`
    },
    {
      id: 3,
      title: "2-Bob: Ta'vilot al-Qur'on — Tafsirda yangi bosqich",
      arabic: "فَصْلٌ فِي تَأْوِيلَاتِ القُرْآنِ وَمَنْهَجِهِ فِي التَّفْسِيرِ",
      content: `Imom Moturidiyning shoh asari bo'lmish "Ta'vilot al-Qur'on" (yoki "Ta'vilot ahli sunna") tafsir ilmi tarixida alohida burilish yasadi.

Alloma tafsir bilan ta'vil o'rtasidagi farqni aniq belgilab berdi:
- Tafsir: sahobalar tomonidan yetkazilgan qat'iy ma'lumotlar va oyatning zohiriy ma'nosi;
- Ta'vil: oyatning bir necha ehtimoliy ma'nolari ichidan islom e'tiqodi va sog'lom mantiqqa eng muvofiqini tanlash.

Ushbu asar bugungi kunda ham butun dunyo sharqshunoslari va islomshunos olimlari tomonidan chuqur o'rganilmoqda.`
    },
    {
      id: 4,
      title: "3-Bob: Kitob at-Tavhid va Moturidiylik e'tiqodiy tamoyillari",
      arabic: "فَصْلٌ فِي كِتَابِ التَّوْحِيدِ وَأُصُولِ العَقِيدَةِ",
      content: `“Kitob at-Tavhid” — allomaning kalom ilmiga bag'ishlangan eng yirik asaridir. Unda bilish nazariyasi (epistemologiya) asoslab berilgan.

Alloma inson bilim olishining uchta asosiy manbasini ko'rsatadi:
1. Sog'lom his-tuyg'ular (al-havos as-salima);
2. To'g'ri xabar (al-xabar as-sodiq) — Payg'ambar alayhissalom xabarlari;
3. Sog'lom aql va tafakkur (an-nazar va-l-istidlol).

Moturidiylik maktabi dunyoni bilish mumkinligini, inson ixtiyor va iroda erkinligiga ega ekanini, yaxshilik va yomonlikni aql vositasida idrok etish imkoniyatini ta'kidlaydi.`
    }
  ];
};
