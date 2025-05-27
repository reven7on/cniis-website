<template>
  <section class="main-banner">
    <!-- Фоновый слайдер с Swiper -->
    <div class="background-slider">
      <swiper
        :modules="[SwiperEffectFade, SwiperAutoplay, SwiperPagination]"
        :effect="'fade'"
        :autoplay="{
          delay: 6000,
          disableOnInteraction: false,
        }"
        :speed="1500"
        :pagination="{
          clickable: true,
          dynamicBullets: true,
        }"
        :loop="true"
        class="mySwiper"
      >
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <div
            class="slide-bg"
            :style="{ backgroundImage: `url(${slide.image})` }"
          ></div>
        </swiper-slide>
      </swiper>

      <!-- Видео опция (если useVideo активировано) -->
      <video v-if="useVideo" class="background-video" autoplay muted loop>
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>
    </div>

    <div class="banner-content" v-rellax="{ speed: -2, center: true }">
      <!-- Заголовок с gsap typing эффектом -->
      <h1 class="typing-text" ref="typingText">{{ displayedSlogan }}</h1>

      <!-- Подзаголовок с анимацией появления через GSAP -->
      <p class="fade-in-text" ref="fadeInText">{{ companyDescription }}</p>

      <!-- Кнопка CTA с пульсирующим эффектом -->
      <button @click="scrollToContact" class="cta-button pulse" ref="ctaButton">
        Обсудить проект
      </button>
    </div>
  </section>
</template>

<script>
// Импорт необходимых модулей Swiper
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// Импорт GSAP для анимаций
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Импорт Rellax для параллакс эффектов
import VueRellax from "vue-rellax";

import project1 from "@/assets/images/banner1.jpg";
import project2 from "@/assets/images/banner2.jpg";
import project3 from "@/assets/images/banner3.jpg";
import project4 from "@/assets/images/banner4.png";
import project5 from "@/assets/images/banner5.jpg";

// Регистрация GSAP плагинов
gsap.registerPlugin(ScrollTrigger);

export default {
  name: "MainBanner",
  components: {
    Swiper,
    SwiperSlide,
  },
  directives: {
    rellax: VueRellax,
  },
  data() {
    return {
      companySlogan: "Инновационные системы. Интегрированные решения.",
      fullSlogan: "Инновационные системы. Интегрированные решения.",
      displayedSlogan: "",

      companyDescription:
        "Центр новых интеллектуальных интегрированных систем - ваш надежный партнер в мире передовых технологий.",

      // Данные для слайдера
      slides: [
        { image: project1 },
        { image: project2 },
        { image: project3 },
        { image: project4 },
        { image: project5 },
      ],

      // Swiper модули
      SwiperEffectFade: EffectFade,
      SwiperAutoplay: Autoplay,
      SwiperPagination: Pagination,

      // Опционально для видео
      useVideo: false,

      // Анимация с GSAP
      typingAnimation: null,
      fadeInAnimation: null,
      buttonAnimation: null,
    };
  },
  mounted() {
    // Запуск эффекта печатающегося текста с GSAP
    this.initGSAPAnimations();

    // Настройка ScrollTrigger для эффектов при скролле
    this.initScrollAnimations();
  },
  beforeUnmount() {
    // Очистка анимаций GSAP
    if (this.typingAnimation) this.typingAnimation.kill();
    if (this.fadeInAnimation) this.fadeInAnimation.kill();
    if (this.buttonAnimation) this.buttonAnimation.kill();

    // Очистка ScrollTrigger
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  },
  methods: {
    scrollToContact() {
      // Плавный скролл к контактной форме с помощью GSAP
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: "#contact", offsetY: 50 },
        ease: "power2.inOut",
      });
    },

    // Инициализация анимаций GSAP
    initGSAPAnimations() {
      // Эффект печатающегося текста
      const tl = gsap.timeline();

      // Сначала очистим текст
      this.displayedSlogan = "";

      // Затем анимируем каждый символ
      tl.to(this, {
        duration: this.fullSlogan.length * 0.06,
        displayedSlogan: this.fullSlogan,
        ease: "none",
        onUpdate: () => {
          const progress = tl.progress();
          const targetLength = Math.floor(progress * this.fullSlogan.length);
          this.displayedSlogan = this.fullSlogan.substring(0, targetLength);
        },
      });

      this.typingAnimation = tl;

      // Анимация появления подзаголовка
      this.fadeInAnimation = gsap.from(this.$refs.fadeInText, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        delay: this.fullSlogan.length * 0.06 + 0.2,
        ease: "power2.out",
      });

      // Анимация кнопки
      this.buttonAnimation = gsap.from(this.$refs.ctaButton, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        delay: this.fullSlogan.length * 0.06 + 1,
        ease: "back.out(1.7)",
        onComplete: () => {
          // Добавляем класс pulse после появления кнопки
          this.$refs.ctaButton.classList.add("pulse");
        },
      });
    },

    // Инициализация анимаций при скролле
    initScrollAnimations() {
      // Параллакс эффект для фона
      gsap.to(".background-slider", {
        scrollTrigger: {
          trigger: ".main-banner",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: "30%",
        ease: "none",
      });
    },
  },
};
</script>

<style scoped>
.main-banner {
  position: relative;
  height: 85vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

/* Стили для фонового слайдера с Swiper */
.background-slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.background-slider .swiper {
  width: 100%;
  height: 100%;
}

.slide-bg {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

/* Стили для видео фона */
.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Стили для контента */
.banner-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem;
  position: relative;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  backdrop-filter: blur(8px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Стили для печатающегося текста */
.typing-text {
  font-size: 3.2rem;
  margin-bottom: 1.8rem;
  min-height: 3.8rem;
  position: relative;
  font-weight: 700;
  line-height: 1.2;
}

/* Стили для анимации появления подзаголовка */
.fade-in-text {
  font-size: 1.35rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

/* Стили для кнопки CTA с пульсацией */
.cta-button {
  background-color: #5790dc;
  color: white;
  border: none;
  padding: 1.2rem 2.5rem;
  margin-top: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #4678c0;
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 10px 20px rgba(87, 144, 220, 0.5);
}

.cta-button.pulse {
  animation: pulse 2.5s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(87, 144, 220, 0.8);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(87, 144, 220, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(87, 144, 220, 0);
  }
}

/* Настройки для Swiper пагинации */
:deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background-color: white;
  opacity: 0.5;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background-color: #5790dc;
}

/* Медиа-запросы для адаптивности */
@media (max-width: 768px) {
  .typing-text {
    font-size: 2.2rem;
  }

  .fade-in-text {
    font-size: 1.1rem;
  }

  .cta-button {
    padding: 1rem 1.8rem;
    font-size: 1.1rem;
  }

  .banner-content {
    padding: 2rem;
    max-width: 90%;
  }
}

@media (max-width: 480px) {
  .typing-text {
    font-size: 1.8rem;
  }

  .fade-in-text {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
}
</style>
