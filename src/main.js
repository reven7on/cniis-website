// src/main.js для Vue 3
import "@fortawesome/fontawesome-free/css/all.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Импорт Swiper CSS
import "swiper/css";
import "swiper/css/bundle";

// Импорт GSAP и плагинов
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
gsap.config({
  autoSleep: 60,
  force3D: false,
  nullTargetWarn: false,
});
// Импорт vue-rellax для параллакс эффектов
import VueRellax from "vue-rellax";
import VueMask from "v-mask";
// Регистрация плагинов GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Функция для предзагрузки критически важных изображений
const preloadCriticalImages = () => {
  const criticalImages = [
    require("@/assets/images/logo.jpg"),
    // Добавляем ключевые изображения для быстрой загрузки
    require("@/assets/images/clean_office.jpg"), // AboutHero image
    // Другие ключевые изображения
    //require("@/assets/images/main_banner.jpg"), // предполагаемое имя для главного баннера
    //require("@/assets/images/services_banner.jpg"), // предполагаемое имя для баннера услуг
  ];

  criticalImages.forEach((src) => {
    const img = new Image();
    img.src = src;
    img.importance = "high";
    img.fetchPriority = "high";
    img.decoding = "sync";
  });
};

// Вызов функции предзагрузки
preloadCriticalImages();

const app = createApp(App);

// Регистрация директивы rellax
app.directive("rellax", VueRellax);
app.directive("mask", VueMask.VueMaskDirective);

// Глобальная директива для оптимизации изображений
app.directive("img-optimize", {
  mounted(el, binding) {
    // Определяем, является ли изображение критическим
    const isCritical = binding.value && binding.value.critical;

    // Добавляем поддержку для адаптивных изображений
    if (binding.value && binding.value.responsive) {
      // Добавляем srcset для разных размеров экрана, если задано
      if (binding.value.srcset) {
        el.srcset = binding.value.srcset;
      }

      // Добавляем sizes атрибут для адаптивных изображений
      if (binding.value.sizes) {
        el.sizes = binding.value.sizes;
      }
    }

    // Для некритических изображений используем ленивую загрузку
    if (!isCritical && !el.getAttribute("loading")) {
      el.setAttribute("loading", "lazy");
    }

    // Для критических изображений устанавливаем приоритеты
    if (isCritical) {
      el.importance = "high";
      el.fetchPriority = "high";
      el.decoding = "sync";
    } else if (!el.getAttribute("decoding")) {
      el.decoding = "async";
    }

    // Оптимизация для мобильных устройств
    if (window.innerWidth <= 768) {
      // На мобильных устройствах добавляем атрибут sizes для адаптивных изображений
      if (!el.getAttribute("sizes")) {
        el.sizes = "100vw";
      }
    }

    // Добавляем srcset для разных размеров экрана, если задано
    if (binding.value && binding.value.srcset) {
      el.srcset = binding.value.srcset;
    }

    // Добавляем обработчик ошибок для изображений
    el.onerror = function () {
      // Заменяем неработающее изображение на плейсхолдер
      this.src =
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
    };

    // Добавляем обработчик загрузки для статистики и оптимизации
    el.onload = function () {
      // Если изображение загрузилось, можно удалить плейсхолдер или добавить анимацию появления
      if (el.classList.contains("fade-in-image")) {
        setTimeout(() => {
          el.style.opacity = 1;
        }, 50);
      }

      // Можно добавить код для отслеживания производительности загрузки
      if (window.performance && window.performance.mark) {
        window.performance.mark(`img-loaded-${el.src.split("/").pop()}`);
      }
    };

    // Добавляем CSS для плавного появления изображений
    if (!isCritical) {
      el.style.transition = "opacity 0.3s ease-in-out";
      el.style.opacity = 0;
      el.classList.add("fade-in-image");
    }
  },
});

app.use(router);
app.mount("#app");
