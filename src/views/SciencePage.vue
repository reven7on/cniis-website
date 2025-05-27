<template>
  <div class="science-page">
    <!-- Секция 1: Заголовок и введение -->
    <ScienceIntro id="science-intro-section" />

    <!-- Секция 4: Публикации -->
    <PublicationsList id="publications-section" />
  </div>
</template>

<script>
// Импортируем компоненты для каждой секции
import ScienceIntro from "@/components/SciencePage/ScienceIntro.vue";
import PublicationsList from "@/components/SciencePage/PublicationsList.vue";

export default {
  name: "SciencePage",
  components: {
    // Регистрируем импортированные компоненты
    ScienceIntro,
    PublicationsList,
  },
  mounted() {
    // Устанавливаем заголовок страницы
    document.title = "Научный фронтир - ЦНИИС";

    // Обработка скролла при прямых переходах по хешу в URL
    this.handleInitialHash();
  },
  methods: {
    handleInitialHash() {
      // Если есть хеш в URL при загрузке страницы, прокручиваем к соответствующей секции
      if (window.location.hash) {
        // Необходима небольшая задержка для корректной работы
        setTimeout(() => {
          const targetElement = document.querySelector(window.location.hash);
          if (targetElement) {
            // Переходим к элементу без учета навигации, так как она удалена
            window.scrollTo({
              top: targetElement.offsetTop,
              behavior: "smooth",
            });
          }
        }, 300);
      }
    },
  },
};
</script>

<style scoped>
.science-page {
  padding: 4rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem; /* Увеличенный отступ между секциями для лучшей читаемости */
  font-family: "Open Sans", sans-serif; /* Базовый шрифт для страницы */
}

@media (max-width: 768px) {
  .science-page {
    padding: 3rem 1rem 2rem;
    gap: 3rem;
  }
}

/* Глобальные стили для типографики */
:deep(h1) {
  font-family: "Montserrat", sans-serif;
  font-size: 2.625rem; /* 42px */
  line-height: 3rem; /* 48px */
  font-weight: 700;
}

:deep(h2) {
  font-family: "Montserrat", sans-serif;
  font-size: 2rem; /* 32px */
  line-height: 2.375rem; /* 38px */
  font-weight: 600;
}

:deep(h3) {
  font-family: "Roboto", sans-serif;
  font-size: 1.5rem; /* 24px */
  line-height: 1.875rem; /* 30px */
  font-weight: 600;
}

:deep(p),
:deep(li),
:deep(span) {
  font-family: "Open Sans", sans-serif;
  font-size: 1rem; /* 16px */
  line-height: 1.5rem; /* 24px */
}

/* Адаптивная типографика для мобильных устройств */
@media (max-width: 768px) {
  :deep(h1) {
    font-size: 2rem; /* 32px */
    line-height: 2.25rem; /* 36px */
  }

  :deep(h2) {
    font-size: 1.5rem; /* 24px */
    line-height: 1.875rem; /* 30px */
  }

  :deep(h3) {
    font-size: 1.25rem; /* 20px */
    line-height: 1.625rem; /* 26px */
  }

  :deep(p),
  :deep(li),
  :deep(span) {
    font-size: 0.875rem; /* 14px */
    line-height: 1.375rem; /* 22px */
  }
}
</style>
