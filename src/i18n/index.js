import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const resources = {
  uz: {
    translation: {
      brand: {
        name: "Moturidiy markazi",
        sub: "Raqamli kutubxona",
        full: "Imom Moturidiy xalqaro ilmiy-tadqiqot markazi"
      },
      nav: {
        home: "Bosh sahifa",
        sections: "Bo‘limlar",
        catalog: "Katalog",
        audiobooks: "Audiokitoblar",
        hikmat: "Hikmatlar",
        quiz: "Test sinovi",
        about: "Markaz haqida",
        consult: "Mutaxassisga murojaat",
        saved: "Saqlanganlar",
        search: "Qidirish"
      },
      common: {
        search_ph: "Kitob nomi, muallif yoki kalit so‘z...",
        read: "O‘qish",
        listen: "Tinglash",
        download: "Yuklab olish",
        save: "Saqlash",
        saved: "Saqlandi",
        all: "Barchasi",
        free: "Bepul",
        audio: "Audio",
        pages: "bet",
        year: "yil",
        author: "Muallif",
        category: "Kategoriya",
        popularity: "Ommaboplik",
        details: "Batafsil",
        back: "Orqaga",
        close: "Yopish",
        share: "Ulashish",
        copied: "Havola nusxalandi!",
        explore: "Katalogga o‘tish"
      },
      home: {
        eyebrow: "Movarounnahr ilmiy merosi",
        title: "Imom Moturidiy Raqamli Kutubxonasi",
        desc: "Alloma Abu Mansur al-Moturidiy va moturidiylik maktabi bo‘yicha fundamental asarlar, qo‘lyozmalar, zamonaviy tadqiqotlar va audiokitoblar portali.",
        hikmat_title: "Kun hikmati",
        next_hikmat: "Boshqa hikmat",
        sections_title: "Asosiy ilmiy bo‘limlar",
        sections_desc: "Tafsir, kalom, qo‘lyozma va zamonaviy nashrlar jamg‘armasi",
        featured_title: "Tavsiya etilgan durdona asarlar",
        featured_desc: "Markaz fondidagi eng ommabop va qimmatli nashrlar",
        audio_title: "Tinglash uchun audiokitoblar",
        audio_desc: "Asarlarni professional suxandonlar ijrosida tinglang",
        quiz_banner_title: "O‘z ilmingizni sinab ko‘ring",
        quiz_banner_desc: "Imom Moturidiy hayoti va ta’limoti bo‘yicha interaktiv test topshirib, maxsus sertifikatga ega bo‘ling.",
        quiz_btn: "Testni boshlash",
        stats_books: "Noyob kitoblar",
        stats_manuscripts: "Qo‘lyozmalar",
        stats_audio: "Audiokitoblar",
        stats_readers: "Kitobxonlar"
      },
      catalog: {
        title: "Elektron kutubxona katalogi",
        subtitle: "Barcha kitoblar, tarjimalar va ilmiy maqolalar",
        filter_category: "Toifalar",
        filter_section: "Bo‘limlar",
        sort_by: "Saralash",
        sort_pop: "Ommabopligi bo‘yicha",
        sort_year: "Nashr yili",
        sort_title: "Nomi (A-Z)",
        only_audio: "Faqat audioli kitoblar",
        found: "ta manba topildi",
        not_found: "Hech qanday asar topilmadi. Qidiruv so‘zini o‘zgartirib ko‘ring."
      },
      reader: {
        settings: "Chitalka sozlamalari",
        font_size: "Shrift o‘lchami",
        font_type: "Shrift turi",
        theme: "Mavzu",
        light: "Yorug‘",
        sepia: "Sepia (Qulay)",
        dark: "Tungi rejim",
        chapters: "Boblar",
        next_chapter: "Keyingi bob",
        prev_chapter: "Oldingi bob",
        chapter_of: "bob",
        progress: "O‘qish jarayoni",
        back_to_book: "Kitobga qaytish"
      },
      quiz: {
        title: "Moturidiyshunoslik bo‘yicha test sinovi",
        desc: "Bilimingizni sinab ko‘ring. Savollarga to‘g‘ri javob berib, natijangizni bilib oling!",
        question: "Savol",
        of: "dan",
        score: "To‘plangan ball",
        finish: "Test yakunlandi!",
        congrats: "Tabriklaymiz!",
        result_msg: "Siz barcha savollarga muvaffaqiyatli javob berdingiz.",
        restart: "Qayta topshirish",
        correct: "To‘g‘ri javob!",
        incorrect: "Noto‘g‘ri javob"
      },
      consult: {
        title: "Mutaxassisga savol yo‘llang",
        desc: "Imom Moturidiy merosi, kalom va aqida masalalarida markazimiz ilmiy xodimlaridan asosli javob oling.",
        name: "Ism va familiyangiz",
        email: "Elektron pochta manzilingiz",
        topic: "Savol mavzusi",
        message: "Savolingiz matni",
        submit: "Savolni yuborish",
        success: "Savolingiz muvaffaqiyatli qabul qilindi. Tez orada elektron pochtangizga javob yuboriladi.",
        faq: "Ko‘p beriladigan savollar"
      },
      about: {
        title: "Markaz haqida",
        lead: "Imom Moturidiy xalqaro ilmiy-tadqiqot markazi O‘zbekiston Respublikasi Prezidentining qaroriga asosan tashkil etilgan bo‘lib, buyuk allomaning boy ilmiy-ma’naviy merosini chuqur o‘rganish va keng targ‘ib qilishni maqsad qilgan.",
        mission: "Bizning missiyamiz",
        mission_text: "Moturidiylik ta’limotining bag‘rikenglik, mo‘’tadillik va aql-idrokka tayangan tamoyillarini xalqaro miqyosda o‘rganish, qadimiy qo‘lyozmalarni tadqiq etish hamda yosh avlodni milliy va umuminsoniy qadriyatlar ruhida tarbiyalash.",
        team_title: "Ilmiy jamoa va rahbarlar",
        contact_info: "Aloqa ma’lumotlari"
      }
    }
  },
  ru: {
    translation: {
      brand: {
        name: "Центр Матуриди",
        sub: "Цифровая библиотека",
        full: "Международный научно-исследовательский центр Имама Матуриди"
      },
      nav: {
        home: "Главная",
        sections: "Разделы",
        catalog: "Каталог",
        audiobooks: "Аудиокниги",
        hikmat: "Мудрость",
        quiz: "Тестирование",
        about: "О центре",
        consult: "Вопрос специалисту",
        saved: "Сохранённые",
        search: "Поиск"
      },
      common: {
        search_ph: "Название книги, автор или ключевое слово...",
        read: "Читать",
        listen: "Слушать",
        download: "Скачать",
        save: "Сохранить",
        saved: "Сохранено",
        all: "Все",
        free: "Бесплатно",
        audio: "Аудио",
        pages: "стр.",
        year: "год",
        author: "Автор",
        category: "Категория",
        popularity: "Популярность",
        details: "Подробнее",
        back: "Назад",
        close: "Закрыть",
        share: "Поделиться",
        copied: "Ссылка скопирована!",
        explore: "Перейти в каталог"
      },
      home: {
        eyebrow: "Научное наследие Мавераннахра",
        title: "Электронная библиотека Имама Матуриди",
        desc: "Портал фундаментальных трудов, редких рукописей, современных академических исследований и аудиокниг по наследию Имама Абу Мансура аль-Матуриди.",
        hikmat_title: "Мудрость дня",
        next_hikmat: "Следующая мудрость",
        sections_title: "Основные научные разделы",
        sections_desc: "Фонд тафсира, калама, рукописей и современных изданий",
        featured_title: "Рекомендуемые шедевры",
        featured_desc: "Наиболее ценные и читаемые издания из фонда центра",
        audio_title: "Аудиокниги для прослушивания",
        audio_desc: "Слушайте труды в профессиональном дикторском исполнении",
        quiz_banner_title: "Проверьте свои знания",
        quiz_banner_desc: "Пройдите интерактивный тест по биографии и учению имама Матуриди и получите сертификат.",
        quiz_btn: "Начать тест",
        stats_books: "Редких книг",
        stats_manuscripts: "Рукописей",
        stats_audio: "Аудиокниг",
        stats_readers: "Читателей"
      },
      catalog: {
        title: "Каталог цифровой библиотеки",
        subtitle: "Все книги, переводы и научные статьи",
        filter_category: "Категории",
        filter_section: "Разделы",
        sort_by: "Сортировка",
        sort_pop: "По популярности",
        sort_year: "По году",
        sort_title: "По названию (А-Я)",
        only_audio: "Только с аудио",
        found: "материалов найдено",
        not_found: "Материалы не найдены. Попробуйте изменить поисковый запрос."
      },
      reader: {
        settings: "Настройки читалки",
        font_size: "Размер шрифта",
        font_type: "Тип шрифта",
        theme: "Тема",
        light: "Светлая",
        sepia: "Сепия",
        dark: "Тёмная",
        chapters: "Главы",
        next_chapter: "Следующая глава",
        prev_chapter: "Предыдущая глава",
        chapter_of: "глава",
        progress: "Прогресс чтения",
        back_to_book: "К описанию книги"
      },
      quiz: {
        title: "Тестирование по матуридиведению",
        desc: "Проверьте свои знания. Ответьте на вопросы и узнайте свой результат!",
        question: "Вопрос",
        of: "из",
        score: "Набранные баллы",
        finish: "Тест завершён!",
        congrats: "Поздравляем!",
        result_msg: "Вы успешно ответили на вопросы викторины.",
        restart: "Пройти снова",
        correct: "Верный ответ!",
        incorrect: "Неверный ответ"
      },
      consult: {
        title: "Задайте вопрос специалисту",
        desc: "Получите квалифицированный ответ от ученых центра по вопросам наследия имама Матуриди и богословия.",
        name: "Ваше имя",
        email: "Электронная почта",
        topic: "Тема вопроса",
        message: "Текст вопроса",
        submit: "Отправить вопрос",
        success: "Ваш вопрос успешно отправлен. Ответ будет направлен на вашу почту.",
        faq: "Часто задаваемые вопросы"
      },
      about: {
        title: "О центре",
        lead: "Международный научно-исследовательский центр Имама Матуриди создан для всестороннего исследования и широкой популяризации богатого научно-духовного наследия великого мыслителя.",
        mission: "Наша миссия",
        mission_text: "Изучение принципов толерантности, умеренности и рациональности школы Матуриди на международном уровне, исследование рукописей и воспитание молодежи в духе высоких ценностей.",
        team_title: "Научный коллектив и руководство",
        contact_info: "Контактная информация"
      }
    }
  },
  en: {
    translation: {
      brand: {
        name: "Maturidi Centre",
        sub: "Digital Library",
        full: "Imam Maturidi International Scientific Research Centre"
      },
      nav: {
        home: "Home",
        sections: "Sections",
        catalog: "Catalogue",
        audiobooks: "Audiobooks",
        hikmat: "Wisdom",
        quiz: "Quiz",
        about: "About Us",
        consult: "Ask a Specialist",
        saved: "Saved",
        search: "Search"
      },
      common: {
        search_ph: "Book title, author or keyword...",
        read: "Read",
        listen: "Listen",
        download: "Download",
        save: "Save",
        saved: "Saved",
        all: "All",
        free: "Free",
        audio: "Audio",
        pages: "pages",
        year: "year",
        author: "Author",
        category: "Category",
        popularity: "Popularity",
        details: "Details",
        back: "Back",
        close: "Close",
        share: "Share",
        copied: "Link copied to clipboard!",
        explore: "Browse Catalogue"
      },
      home: {
        eyebrow: "The scholarly heritage of Transoxiana",
        title: "Imam al-Maturidi Digital Library",
        desc: "A comprehensive repository of foundational works, rare manuscripts, modern scholarly publications, and audiobooks on the legacy of Imam Abu Mansur al-Maturidi.",
        hikmat_title: "Wisdom of the day",
        next_hikmat: "Next quote",
        sections_title: "Primary Scholarly Sections",
        sections_desc: "Holdings in Qur'anic exegesis, speculative theology (kalam), and classical manuscripts",
        featured_title: "Featured Masterpieces",
        featured_desc: "The most esteemed and widely read editions in our repository",
        audio_title: "Listen to Audiobooks",
        audio_desc: "Listen to classical treatises narrated by professional scholars",
        quiz_banner_title: "Test Your Scholarly Knowledge",
        quiz_banner_desc: "Take our interactive assessment on the biography and theology of Imam al-Maturidi and earn a personalized certificate.",
        quiz_btn: "Start Assessment",
        stats_books: "Rare Treatises",
        stats_manuscripts: "Manuscripts",
        stats_audio: "Audiobooks",
        stats_readers: "Active Readers"
      },
      catalog: {
        title: "Digital Library Catalogue",
        subtitle: "Explore all classical treatises, critical editions, and papers",
        filter_category: "Categories",
        filter_section: "Sections",
        sort_by: "Sort by",
        sort_pop: "Most Popular",
        sort_year: "Publication Year",
        sort_title: "Title (A-Z)",
        only_audio: "Audio Available",
        found: "items found",
        not_found: "No works found matching your criteria. Try adjusting your query."
      },
      reader: {
        settings: "Reader Settings",
        font_size: "Font Size",
        font_type: "Typeface",
        theme: "Theme",
        light: "Light",
        sepia: "Sepia",
        dark: "Night Mode",
        chapters: "Chapters",
        next_chapter: "Next chapter",
        prev_chapter: "Previous chapter",
        chapter_of: "chapter",
        progress: "Reading Progress",
        back_to_book: "Back to Treatise"
      },
      quiz: {
        title: "Maturidi Studies Academic Quiz",
        desc: "Assess your knowledge of early Islamic intellectual history and Maturidite theology!",
        question: "Question",
        of: "of",
        score: "Score",
        finish: "Assessment Completed!",
        congrats: "Congratulations!",
        result_msg: "You have successfully completed the assessment.",
        restart: "Retake Quiz",
        correct: "Correct Answer!",
        incorrect: "Incorrect Answer"
      },
      consult: {
        title: "Inquire with a Research Specialist",
        desc: "Submit your scholarly inquiries on Maturidi theology, manuscripts, and hermeneutics to our research fellows.",
        name: "Your Full Name",
        email: "Email Address",
        topic: "Subject / Topic",
        message: "Your Question",
        submit: "Submit Inquiry",
        success: "Your inquiry has been received. Our research scholars will respond via email shortly.",
        faq: "Frequently Asked Questions"
      },
      about: {
        title: "About the Centre",
        lead: "The Imam Maturidi International Scientific Research Centre was established to systematically investigate, preserve, and illuminate the vast intellectual legacy of Imam Abu Mansur al-Maturidi and the Transoxianian school of Islamic thought.",
        mission: "Our Scholarly Mission",
        mission_text: "To advance international research into the principles of reason, moderation, and theological hermeneutics, catalog rare historical codices, and nurture intellectual inquiry.",
        team_title: "Research Fellows & Administration",
        contact_info: "Official Inquiries"
      }
    }
  }
};

const savedLang = localStorage.getItem('moturidiy_lang') || 'uz';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;
