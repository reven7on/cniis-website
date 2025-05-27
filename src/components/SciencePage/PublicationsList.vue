<template>
  <section class="publications-section">
    <div class="section-container">
      <h2 class="section-title">Научные публикации</h2>
      <p class="section-description">
        Результаты исследований наших специалистов публикуются в ведущих научных
        журналах. Ниже представлены последние статьи с возможностью фильтрации
        по тематикам.
      </p>

      <div class="filters">
        <button
          v-for="category in categories"
          :key="category.id"
          class="filter-button"
          :class="{ active: selectedCategory === category.id }"
          @click="selectedCategory = category.id"
        >
          {{ category.name }}
        </button>
      </div>

      <div class="publications-list">
        <div
          v-for="publication in filteredPublications"
          :key="publication.id"
          class="publication-card"
        >
          <div
            class="publication-category"
            :class="'category-' + publication.category"
          >
            {{ getCategoryName(publication.category) }}
          </div>
          <h3 class="publication-title">
            <router-link :to="`/article/${publication.id}`">
              {{ publication.title }}
            </router-link>
          </h3>
          <p class="publication-authors">{{ publication.authors }}</p>
          <p class="publication-date">{{ formatDate(publication.date) }}</p>
          <p class="publication-abstract">{{ publication.abstract }}</p>
          <div class="publication-footer">
            <span class="views-count">
              <i class="far fa-eye"></i> {{ publication.views }}
            </span>
            <router-link
              :to="`/article/${publication.id}`"
              class="read-more-link"
            >
              Читать статью <i class="fas fa-arrow-right"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PublicationsList",
  data() {
    return {
      selectedCategory: "all",
      publications: [
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
        },
      ],
      categories: [
        { id: "all", name: "Все публикации" },
        { id: "ml", name: "Машинное обучение" },
        { id: "data", name: "Анализ данных" },
        { id: "cv", name: "Компьютерное зрение" },
        { id: "nlp", name: "Обработка текста" },
      ],
    };
  },
  computed: {
    filteredPublications() {
      if (this.selectedCategory === "all") {
        return this.publications;
      }
      return this.publications.filter(
        (pub) => pub.category === this.selectedCategory
      );
    },
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
    },
    getCategoryName(categoryId) {
      const category = this.categories.find((c) => c.id === categoryId);
      return category ? category.name : "Другое";
    },
  },
};
</script>

<style scoped>
.publications-section {
  padding: 4rem 0;
  background-color: #f7f9fc;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-title {
  font-size: 2.5rem;
  color: #2a4d80;
  margin-bottom: 1rem;
  text-align: center;
}

.section-description {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2.5rem;
  color: #566a7f;
  font-size: 1.1rem;
  line-height: 1.6;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
}

.filter-button {
  background: #fff;
  border: 1px solid #e0e0e0;
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  color: #566a7f;
}

.filter-button:hover {
  border-color: #2a4d80;
  color: #2a4d80;
}

.filter-button.active {
  background: #2a4d80;
  color: white;
  border-color: #2a4d80;
}

.publications-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.publication-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.publication-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.publication-category {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 2rem;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  text-transform: uppercase;
}

.category-ml {
  background-color: #e1f5fe;
  color: #0288d1;
}

.category-data {
  background-color: #e8f5e9;
  color: #388e3c;
}

.category-cv {
  background-color: #fff8e1;
  color: #ffa000;
}

.category-nlp {
  background-color: #f3e5f5;
  color: #8e24aa;
}

.publication-title {
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
  line-height: 1.4;
}

.publication-title a {
  color: #2a4d80;
  text-decoration: none;
  transition: color 0.2s ease;
}

.publication-title a:hover {
  color: #5790dc;
}

.publication-authors {
  font-size: 0.9rem;
  color: #566a7f;
  margin-bottom: 0.5rem;
}

.publication-date {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 1rem;
  font-style: italic;
}

.publication-abstract {
  font-size: 0.95rem;
  color: #444;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.publication-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.views-count {
  font-size: 0.85rem;
  color: #888;
}

.views-count i {
  margin-right: 0.3rem;
}

.read-more-link {
  color: #2a4d80;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

.read-more-link:hover {
  color: #5790dc;
}

.read-more-link i {
  margin-left: 0.3rem;
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .publications-list {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-description {
    font-size: 1rem;
  }
}
</style>
