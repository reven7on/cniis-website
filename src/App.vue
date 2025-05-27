<template>
  <div id="app">
    <div class="page-loading-indicator" :class="{ active: isLoading }"></div>
    <TheHeader />
    <transition
      name="page"
      mode="out-in"
      @before-enter="startLoading"
      @after-enter="finishLoading"
    >
      <router-view class="page-content" />
    </transition>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  watch: {
    // Следим за изменениями маршрута
    $route() {
      // Прокручиваем страницу вверх при переходе
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  methods: {
    startLoading() {
      this.isLoading = true;
    },
    finishLoading() {
      // Небольшая задержка, чтобы индикатор загрузки выглядел плавно
      setTimeout(() => {
        this.isLoading = false;
      }, 800);
    },
  },
};
</script>

<style>
/* Global styles */
:root {
  /* Основные цвета */
  --primary-color: #5790dc; /* голубой - основной */
  --secondary-color: #2a4d80; /* темно-синий для контраста */
  --light-bg-color: #e8f1fb; /* светло-голубой для фонов */
  --white-color: #ffffff; /* белый */
  --text-color: #333333; /* темно-серый для текста */
  --accent-color: #ff9800; /* оранжевый для кнопок CTA */
}

/* Импорт шрифтов (добавьте в index.html или настройте в зависимости от вашего проекта) */
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@300;400;600&family=Roboto:wght@300;400;500;700&display=swap");

body {
  font-family: "Open Sans", "Roboto", sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--white-color);
  overflow-x: hidden; /* Предотвращение горизонтального скролла */
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Montserrat", "Roboto", sans-serif;
  font-weight: 600;
  margin-top: 0;
}

/* Стили для кнопок CTA */
.btn-primary {
  background-color: var(--accent-color);
  color: var(--white-color);
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #e68a00;
}

/* Дополнительные глобальные стили */
.bg-light {
  background-color: var(--light-bg-color);
}

.text-primary {
  color: var(--primary-color);
}

.text-secondary {
  color: var(--secondary-color);
}

/* Анимации переходов между страницами */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.2, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Добавляем индикатор загрузки страницы */
.page-loading-indicator {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  z-index: 2000;
  width: 0;
  pointer-events: none; /* Чтобы не блокировать клики */
}

.page-loading-indicator.active {
  animation: loading-progress 0.8s ease-in-out;
}

@keyframes loading-progress {
  0% {
    width: 0;
  }
  50% {
    width: 70%;
  }
  100% {
    width: 100%;
  }
}

#app {
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
}

.page-content {
  padding-top: 80px; /* Add padding only to content, not the entire app */
}

/* Добавим сглаживание для анимаций */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
