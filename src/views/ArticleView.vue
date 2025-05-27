<template>
  <div class="article-view">
    <div class="article-nav">
      <router-link to="/science" class="back-link">
        <i class="fas fa-arrow-left"></i> К списку статей
      </router-link>
      <div class="article-actions">
        <button class="action-button">
          <i class="fas fa-print"></i> Печать
        </button>
        <button class="action-button">
          <i class="far fa-bookmark"></i> Сохранить
        </button>
        <button class="action-button">
          <i class="fas fa-share-alt"></i> Поделиться
        </button>
      </div>
    </div>

    <div v-if="article" class="article-content">
      <div class="article-header">
        <div class="article-category" :class="'category-' + article.category">
          {{ getCategoryName(article.category) }}
        </div>
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <p class="article-authors">{{ article.authors }}</p>
          <p class="article-date">{{ formatDate(article.date) }}</p>
        </div>
      </div>

      <div class="article-abstract">
        <h2>Аннотация</h2>
        <p>{{ article.abstract }}</p>
      </div>

      <div class="article-body">
        <component :is="getArticleContent(article.id)" />
      </div>

      <div class="article-footer">
        <div class="article-tags">
          <span class="tag" v-for="(tag, index) in articleTags" :key="index">{{
            tag
          }}</span>
        </div>
        <div class="article-stats">
          <span><i class="far fa-eye"></i> {{ article.views }} просмотров</span>
          <span
            ><i class="far fa-clock"></i> Время чтения:
            {{ readingTime }} мин</span
          >
        </div>
      </div>
    </div>

    <div v-else class="article-loading">
      <div class="loading-spinner"></div>
      <p>Загрузка статьи...</p>
    </div>

    <div class="related-articles">
      <h2>Вас также может заинтересовать</h2>
      <div class="related-grid">
        <div
          v-for="relatedArticle in relatedArticles"
          :key="relatedArticle.id"
          class="related-card"
          @click="viewArticle(relatedArticle.id)"
        >
          <h3>{{ relatedArticle.title }}</h3>
          <p>{{ relatedArticle.authors }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Article1 from "@/components/Articles/Article1.vue";
import Article2 from "@/components/Articles/Article2.vue";
import Article3 from "@/components/Articles/Article3.vue";
import Article4 from "@/components/Articles/Article4.vue";
import Article5 from "@/components/Articles/Article5.vue";
import Article6 from "@/components/Articles/Article6.vue";

export default {
  name: "ArticleView",
  components: {
    Article1,
    Article2,
    Article3,
    Article4,
    Article5,
    Article6,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const article = ref(null);
    const readingTime = ref("5-7");
    const articleTags = ref([]);

    // База данных статей
    const publications = [
      {
        id: 1,
        title:
          "Совершенствование нейросетевых архитектур для распознавания визуальных паттернов",
        authors: "Иванов И.И., Петров П.П., Сидоров С.С.",
        date: "2023-09-15",
        category: "ml",
        abstract:
          "В данной статье рассматриваются подходы к оптимизации нейросетевых архитектур для задач компьютерного зрения. Предложены модификации для уменьшения вычислительной сложности при сохранении точности распознавания.",
        views: 425,
        content: "Article1",
      },
      {
        id: 2,
        title:
          "Методы глубокого обучения для анализа временных рядов в финансовом секторе",
        authors: "Кузнецов К.К., Смирнов А.А.",
        date: "2023-05-22",
        category: "data",
        abstract:
          "Исследование посвящено применению рекуррентных нейронных сетей для прогнозирования финансовых показателей. Представлена модель, демонстрирующая превосходство над традиционными статистическими методами анализа временных рядов.",
        views: 318,
        content: "Article2",
      },
      {
        id: 3,
        title: "Оптимизация алгоритмов сегментации медицинских изображений",
        authors: "Васильев В.В., Николаев Н.Н.",
        date: "2022-11-03",
        category: "cv",
        abstract:
          "Статья представляет новый подход к сегментации медицинских изображений с использованием U-Net архитектуры и внимания. Экспериментальные результаты показывают улучшение точности на 15% по сравнению с существующими методами.",
        views: 542,
        content: "Article3",
      },
      {
        id: 4,
        title:
          "Генеративные модели для синтеза естественного языка в диалоговых системах",
        authors: "Морозова И.С., Кузнецов К.К.",
        date: "2023-07-10",
        category: "nlp",
        abstract:
          "В работе описана архитектура генеративной языковой модели для создания контекстуально-релевантных ответов в диалоговых системах. Модель учитывает предыдущие взаимодействия и способна адаптироваться к стилю речи пользователя.",
        views: 287,
        content: "Article4",
      },
      {
        id: 5,
        title:
          "Анализ производительности алгоритмов глубокого обучения в системах обработки естественного языка",
        authors: "Петров П.П., Александров А.А.",
        date: "2022-12-18",
        category: "nlp",
        abstract:
          "Исследование эффективности различных архитектур нейронных сетей для задач обработки текста. Проведено сравнение производительности моделей с разными параметрами на стандартных бенчмарках.",
        views: 195,
        content: "Article5",
      },
      {
        id: 6,
        title:
          "Методы оптимизации нейросетевых моделей для встраиваемых систем",
        authors: "Сидоров С.С., Иванов И.И.",
        date: "2023-02-07",
        category: "data",
        abstract:
          "В статье представлены методы оптимизации нейронных сетей для эффективной работы на устройствах с ограниченными вычислительными ресурсами. Предложены техники квантизации и прунинга, сохраняющие точность при значительном сокращении размера модели.",
        views: 364,
        content: "Article6",
      },
    ];

    const categories = [
      { id: "all", name: "Все публикации" },
      { id: "ml", name: "Машинное обучение" },
      { id: "data", name: "Анализ данных" },
      { id: "cv", name: "Компьютерное зрение" },
      { id: "nlp", name: "Обработка текста" },
    ];

    const tags = {
      1: [
        "нейронные сети",
        "компьютерное зрение",
        "оптимизация",
        "глубокое обучение",
      ],
      2: ["временные ряды", "финансы", "прогнозирование", "LSTM"],
      3: ["медицинские изображения", "сегментация", "U-Net", "внимание"],
      4: ["NLP", "генеративные модели", "диалоговые системы", "GPT"],
      5: [
        "NLP",
        "классификация текстов",
        "ансамблевые методы",
        "машинное обучение",
      ],
      6: [
        "обнаружение аномалий",
        "промышленные данные",
        "автоэнкодеры",
        "временные ряды",
      ],
    };

    // Получаем информацию о статье по ID
    onMounted(() => {
      const articleId = parseInt(route.params.id);
      article.value = publications.find((pub) => pub.id === articleId);

      if (article.value) {
        // Увеличиваем счетчик просмотров
        article.value.views += 1;

        // Устанавливаем заголовок страницы
        document.title = article.value.title + " - ЦНИИС";

        // Загружаем теги для статьи
        articleTags.value = tags[articleId] || [];

        // Рассчитываем примерное время чтения
        const wordCount =
          document.querySelector(".article-body")?.textContent?.split(/\s+/)
            .length || 1000;
        readingTime.value = Math.ceil(wordCount / 200); // Среднее время чтения 200 слов в минуту
      }
    });

    // Находим похожие статьи той же категории
    const relatedArticles = computed(() => {
      if (!article.value) return [];

      return publications
        .filter(
          (pub) =>
            pub.category === article.value.category &&
            pub.id !== article.value.id
        )
        .slice(0, 3);
    });

    // Получаем название категории по ID
    const getCategoryName = (id) => {
      const category = categories.find((cat) => cat.id === id);
      return category ? category.name : "Другое";
    };

    // Функция для перехода к другой статье
    const viewArticle = (id) => {
      router.push({ name: "ArticleView", params: { id } });
      // Прокручиваем страницу вверх
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Форматирование даты
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("ru-RU", options);
    };

    // Получаем компонент с содержимым статьи
    const getArticleContent = (id) => {
      const contentMap = {
        1: "Article1",
        2: "Article2",
        3: "Article3",
        4: "Article4",
        5: "Article5",
        6: "Article6",
      };
      return contentMap[id] || "Article1";
    };

    return {
      article,
      relatedArticles,
      articleTags,
      readingTime,
      getCategoryName,
      formatDate,
      viewArticle,
      getArticleContent,
    };
  },
};
</script>

<style scoped>
.article-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.article-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  font-family: "Roboto", sans-serif;
  font-size: 0.95rem;
  color: #555;
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.back-link:hover {
  background-color: #f0f0f0;
}

.back-link i {
  margin-right: 0.5rem;
}

.article-actions {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  background: none;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  color: #555;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
}

.action-button:hover {
  background-color: #f0f0f0;
}

.action-button i {
  margin-right: 0.5rem;
}

.article-content {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.article-header {
  padding: 2rem;
  border-bottom: 1px solid #f0f0f0;
}

.article-category {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  margin-bottom: 1rem;
  border-radius: 16px;
  font-family: "Roboto", sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  background-color: #f2f7ff;
  color: #5790dc;
}

.category-ml {
  background-color: #e6f7f2;
  color: #38a88e;
}
.category-data {
  background-color: #f3f0ff;
  color: #7950cd;
}
.category-cv {
  background-color: #fff2e6;
  color: #ff8c42;
}
.category-nlp {
  background-color: #e6f2ff;
  color: #4285f4;
}

.article-title {
  font-family: "Montserrat", sans-serif;
  font-size: 2.25rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.article-authors {
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  color: #555;
  font-style: italic;
  margin: 0;
}

.article-date {
  font-family: "Open Sans", sans-serif;
  font-size: 0.9rem;
  color: #888;
  margin: 0;
}

.article-abstract {
  padding: 2rem;
  background-color: #f9fbfd;
  border-bottom: 1px solid #f0f0f0;
}

.article-abstract h2 {
  font-family: "Montserrat", sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2a4d80;
  margin-top: 0;
  margin-bottom: 1rem;
}

.article-abstract p {
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
  margin: 0;
  font-style: italic;
}

.article-body {
  padding: 2rem;
  font-family: "Open Sans", sans-serif;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #333;
}

.article-body h2 {
  font-family: "Montserrat", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2a4d80;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.article-body h3 {
  font-family: "Roboto", sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.article-body p {
  margin-bottom: 1rem;
}

.article-body ul,
.article-body ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.article-body li {
  margin-bottom: 0.5rem;
}

.article-body img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin: 1.5rem 0;
}

.article-footer {
  padding: 1.5rem 2rem;
  background-color: #fafafa;
  border-top: 1px solid #f0f0f0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  display: inline-block;
  padding: 0.3rem 0.6rem;
  background-color: #f0f4f9;
  color: #555;
  font-family: "Roboto", sans-serif;
  font-size: 0.8rem;
  border-radius: 12px;
}

.article-stats {
  display: flex;
  gap: 1.5rem;
  font-family: "Open Sans", sans-serif;
  font-size: 0.9rem;
  color: #888;
}

.article-stats i {
  margin-right: 0.3rem;
}

.article-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f0f0f0;
  border-top: 3px solid #5790dc;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.article-loading p {
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  color: #888;
}

.related-articles {
  margin-top: 3rem;
}

.related-articles h2 {
  font-family: "Montserrat", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2a4d80;
  margin-bottom: 1.5rem;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.related-card {
  background-color: #fff;
  border-radius: 6px;
  padding: 1.25rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.related-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.related-card h3 {
  font-family: "Roboto", sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.related-card p {
  font-family: "Open Sans", sans-serif;
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  font-style: italic;
}

@media (max-width: 768px) {
  .article-view {
    padding: 1rem;
  }

  .article-nav {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .article-actions {
    width: 100%;
    justify-content: space-between;
  }

  .article-title {
    font-size: 1.5rem;
  }

  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .article-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .article-stats {
    flex-direction: column;
    gap: 0.5rem;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
