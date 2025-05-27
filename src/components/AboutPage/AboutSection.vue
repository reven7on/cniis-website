<template>
  <section id="about" class="about-section">
    <div class="container" :class="{ animated: isVisible }">
      <h2 class="section-title">О Центре ЦНИИС</h2>
      <div class="about-content">
        <div class="about-text">
          <p>{{ aboutDescription }}</p>
          <div class="key-facts">
            <div class="fact" v-for="(fact, index) in keyFacts" :key="index">
              <div class="fact-number">
                <span>{{ displayedNumbers[index] }}</span
                >{{ fact.suffix }}
              </div>
              <div class="fact-text">{{ fact.text }}</div>
            </div>
          </div>
        </div>
        <div class="about-image">
          <div class="image-container">
            <img
              src="@/assets/images/clean_office.jpg"
              alt="Офис компании"
              loading="lazy"
            />
            <div class="gradient-overlay"></div>
          </div>
        </div>
      </div>
      <div class="action-container">
        <button class="learn-more-btn">Подробнее о нас</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AboutSection",
  data() {
    return {
      aboutDescription:
        "Центр новых интеллектуальных интегрированных систем - это передовая компания, специализирующаяся на разработке инновационных технологических решений. Мы объединяем экспертизу в области искусственного интеллекта, машинного обучения и системной интеграции для решения сложных задач современного бизнеса.",
      keyFacts: [
        { number: 15, suffix: "+", text: "лет опыта работы" },
        { number: 200, suffix: "+", text: "успешных проектов" },
        { number: 50, suffix: "", text: "экспертов в команде" },
      ],
      displayedNumbers: [0, 0, 0],
      isVisible: false,
      animationStarted: false,
    };
  },
  mounted() {
    // Упрощенный вариант без внешних библиотек
    this.isVisible = true;
    this.startCountAnimation();

    // Добавляем обработчик скролла для более комплексного проекта
    window.addEventListener("scroll", this.checkVisibility);
    this.checkVisibility();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.checkVisibility);
  },
  methods: {
    checkVisibility() {
      const element = this.$el;
      const rect = element.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      if (rect.top <= windowHeight * 0.75 && !this.animationStarted) {
        this.isVisible = true;
        this.startCountAnimation();
      }
    },
    startCountAnimation() {
      if (this.animationStarted) return;
      this.animationStarted = true;

      this.keyFacts.forEach((fact, index) => {
        const targetNumber = fact.number;
        const duration = 2000; // 2 секунды
        const steps = 60; // 60 шагов
        const increment = targetNumber / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
          currentStep++;
          this.displayedNumbers[index] = Math.min(
            Math.round(increment * currentStep),
            targetNumber
          );

          if (currentStep >= steps) {
            clearInterval(timer);
            this.displayedNumbers[index] = targetNumber;
          }
        }, duration / steps);
      });
    },
  },
};
</script>

<style scoped>
.about-section {
  padding: 6rem 2rem;
  background-color: #ffffff;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.container.animated {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  position: relative;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  color: #333;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background-color: #5790dc;
}

.about-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
}

.about-text {
  flex: 1;
}

.about-text p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.key-facts {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
}

.fact {
  flex: 1;
  min-width: 120px;
}

.fact-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #5790dc;
  margin-bottom: 0.5rem;
}

.fact-text {
  font-size: 1rem;
  color: #555;
}

.about-image {
  flex: 1;
  max-width: 500px;
}

.image-container {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.image-container img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(87, 144, 220, 0.4) 0%,
    rgba(87, 144, 220, 0) 50%
  );
  z-index: 1;
}

.action-container {
  text-align: center;
  margin-top: 2rem;
}

.learn-more-btn {
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background-color: #5790dc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.learn-more-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.7s ease;
}

.learn-more-btn:hover {
  background-color: #4678c0;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(87, 144, 220, 0.4);
}

.learn-more-btn:hover::before {
  left: 100%;
}

@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
  }

  .about-text,
  .about-image {
    width: 100%;
    max-width: 100%;
  }

  .key-facts {
    justify-content: space-around;
    gap: 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .about-text p {
    font-size: 1rem;
  }

  .fact-number {
    font-size: 2rem;
  }
}

@media (max-width: 576px) {
  .fact {
    flex: 0 0 100%;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .key-facts {
    flex-direction: column;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .learn-more-btn {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .about-section {
    padding: 4rem 1rem;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .about-text p {
    font-size: 0.9rem;
  }
}
</style>
