<template>
  <section class="science-intro" id="science-intro-section" ref="introSection">
    <div class="intro-content">
      <h1 class="main-title">Научный фронтир</h1>
      <div class="intro-separator"></div>
      <p class="description">
        Наша команда сосредоточена на передовых исследованиях в области
        искусственного интеллекта и анализа данных, стремясь раздвигать границы
        возможного и создавать технологии будущего.
      </p>
      <p class="mission">
        <strong>Наша миссия:</strong> Способствовать прогрессу через инновации в
        ИИ, разрабатывая интеллектуальные решения, которые трансформируют
        отрасли и улучшают жизнь людей.
      </p>

      <div class="intro-stats">
        <div class="stat-item">
          <span class="stat-number" ref="statNumber1">15+</span>
          <span class="stat-label">Исследователей</span>
        </div>
        <div class="stat-item">
          <span class="stat-number" ref="statNumber2">30+</span>
          <span class="stat-label">Публикаций</span>
        </div>
        <div class="stat-item">
          <span class="stat-number" ref="statNumber3">8</span>
          <span class="stat-label">Проектов</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "ScienceIntro",
  mounted() {
    this.animateIntro();
  },
  methods: {
    animateIntro() {
      // Анимация плавного появления текста при загрузке компонента
      const introTimeline = gsap.timeline();

      introTimeline
        .from(this.$refs.introSection.querySelector(".main-title"), {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          this.$refs.introSection.querySelector(".intro-separator"),
          {
            scaleX: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          this.$refs.introSection.querySelectorAll(".description, .mission"),
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=0.3"
        );

      // Анимация счетчиков
      if (
        this.$refs.statNumber1 &&
        this.$refs.statNumber2 &&
        this.$refs.statNumber3
      ) {
        gsap.from(
          [
            this.$refs.statNumber1,
            this.$refs.statNumber2,
            this.$refs.statNumber3,
          ],
          {
            textContent: 0,
            duration: 2,
            ease: "power1.inOut",
            snap: { textContent: 1 },
            stagger: 0.2,
            delay: 0.5,
          }
        );

        // Анимация появления блоков со статистикой
        gsap.from(".stat-item", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.5,
          ease: "back.out(1.2)",
        });
      }
    },
  },
};
</script>

<style scoped>
.science-intro {
  text-align: center;
  padding: 3rem 0;
  color: #333333;
  position: relative;
}

.intro-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.main-title {
  font-family: "Montserrat", sans-serif;
  font-size: 2.625rem; /* 42px */
  line-height: 3rem; /* 48px */
  font-weight: 700;
  color: #2a4d80;
  margin-bottom: 1.5rem;
}

.intro-separator {
  width: 80px;
  height: 4px;
  background-color: #5790dc;
  margin: 0 auto 2rem;
  border-radius: 2px;
}

.description,
.mission {
  font-family: "Open Sans", sans-serif;
  font-size: 1rem; /* 16px */
  line-height: 1.5rem; /* 24px */
  max-width: 800px;
  margin: 0 auto 1.5rem;
}

.mission {
  margin-bottom: 2.5rem;
}

.mission strong {
  color: #5790dc;
  font-weight: 600;
}

.intro-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-family: "Montserrat", sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #5790dc;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-family: "Roboto", sans-serif;
  font-size: 0.95rem;
  color: #666;
  font-weight: 500;
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2rem; /* 32px */
    line-height: 2.25rem; /* 36px */
  }

  .description,
  .mission {
    font-size: 0.875rem; /* 14px */
    line-height: 1.375rem; /* 22px */
  }

  .intro-stats {
    flex-direction: column;
    gap: 1.5rem;
  }

  .stat-item {
    flex-direction: row;
    gap: 0.75rem;
    justify-content: center;
  }

  .stat-number {
    font-size: 1.75rem;
    margin-bottom: 0;
  }
}
</style>
