<template>
  <section class="services-header" ref="headerSection">
    <div class="overlay"></div>
    <div class="content-wrapper">
      <h1 class="title" ref="titleElement">
        <span
          v-for="(line, index) in titleLines"
          :key="index"
          class="title-line"
          :ref="
            (el) => {
              if (el) titleLineRefs[index] = el;
            }
          "
        >
          {{ line }}
        </span>
      </h1>
      <div class="subtitle" ref="subtitleElement">
        <p>Индивидуальный подход к каждому клиенту.</p>
        <p>
          Мы разрабатываем решения, которые помогают бизнесу расти и
          развиваться.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default {
  name: "ServicesHeader",
  data() {
    return {
      titleLines: ["Наши услуги", "для вашего бизнеса"],
      titleLineRefs: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initAnimations();
    });
  },
  methods: {
    initAnimations() {
      // Анимация для заголовка
      this.titleLineRefs.forEach((line, index) => {
        gsap.fromTo(
          line,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3 + index * 0.2,
            ease: "power3.out",
          }
        );
      });

      // Анимация для подзаголовка
      gsap.fromTo(
        this.$refs.subtitleElement,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.9,
          ease: "power3.out",
        }
      );

      // Параллакс эффект при скролле
      gsap.to(this.$refs.headerSection, {
        scrollTrigger: {
          trigger: this.$refs.headerSection,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        backgroundPositionY: "30%",
        ease: "none",
      });
    },
  },
};
</script>

<style scoped>
.services-header {
  width: 100%;
  height: 80vh;
  min-height: 500px;
  background-image: url("@/assets/images/clean_office.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(42, 77, 128, 0.7); /* #2A4D80 с прозрачностью */
  z-index: 1;
}

.content-wrapper {
  max-width: 1200px;
  width: 90%;
  position: relative;
  z-index: 2;
  text-align: center;
}

.title {
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  font-size: 42px;
  line-height: 48px;
  margin-bottom: 20px;
  color: #ffffff;
}

.title-line {
  display: block;
  margin-bottom: 10px;
}

.subtitle {
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  font-size: 18px;
  line-height: 28px;
  max-width: 800px;
  margin: 0 auto 40px;
  color: #e8f1fb;
}

.subtitle p {
  margin: 0 0 10px;
}

.cta-button {
  background-color: #ff9800;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 16px;
  padding: 14px 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.cta-button:hover {
  background-color: #f57c00;
}

/* Адаптивные стили */
@media (max-width: 768px) {
  .title {
    font-size: 32px;
    line-height: 36px;
  }

  .subtitle {
    font-size: 16px;
    line-height: 24px;
  }

  .cta-button {
    padding: 12px 24px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 28px;
    line-height: 32px;
  }

  .subtitle {
    font-size: 14px;
    line-height: 22px;
  }
}
</style>
