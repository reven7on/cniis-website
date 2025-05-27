<template>
  <div class="about-page">
    <!-- Полноэкранный герой-блок с параллакс-эффектом -->
    <AboutHero />

    <!-- Основное содержимое страницы -->
    <div class="content-container">
      <!-- Используем существующий компонент AboutSection -->
      <AboutSection />

      <!-- Дополнительная информация о компании -->
      <section class="company-info">
        <div class="container">
          <div class="info-grid">
            <div class="info-card">
              <div class="icon">
                <i class="fas fa-lightbulb"></i>
              </div>
              <h3>Наша миссия</h3>
              <p>
                Разрабатывать инновационные интеллектуальные системы, которые
                решают сложные задачи и улучшают качество жизни.
              </p>
            </div>

            <div class="info-card">
              <div class="icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <h3>Наши цели</h3>
              <p>
                Стать лидером в области интегрированных интеллектуальных систем
                и создавать технологии будущего.
              </p>
            </div>

            <div class="info-card">
              <div class="icon">
                <i class="fas fa-users"></i>
              </div>
              <h3>Наша команда</h3>
              <p>
                Коллектив опытных специалистов из различных областей,
                объединенных общей страстью к инновациям.
              </p>
            </div>

            <div class="info-card">
              <div class="icon">
                <i class="fas fa-handshake"></i>
              </div>
              <h3>Наши ценности</h3>
              <p>
                Открытость, честность, инновационность и стремление к
                постоянному совершенствованию.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- История компании -->
      <section class="company-history">
        <div class="container">
          <h2>История центра</h2>
          <div class="timeline">
            <div class="timeline-item">
              <div class="year">2015</div>
              <div class="milestone">
                <h4>Основание центра</h4>
                <p>
                  Центр новых интеллектуальных интегрированных систем был
                  основан группой энтузиастов и экспертов в области ИИ.
                </p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="year">2017</div>
              <div class="milestone">
                <h4>Первый крупный проект</h4>
                <p>
                  Реализация первой интегрированной системы для промышленного
                  применения.
                </p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="year">2020</div>
              <div class="milestone">
                <h4>Расширение компании</h4>
                <p>
                  Открытие новых направлений исследований и разработок,
                  увеличение штата сотрудников.
                </p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="year">2023</div>
              <div class="milestone">
                <h4>Международное признание</h4>
                <p>
                  Получение международных наград и сертификатов за инновационные
                  разработки.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Показатели компании -->
      <section class="company-stats">
        <div class="container">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">50+</div>
              <div class="stat-desc">Экспертов</div>
            </div>

            <div class="stat-item">
              <div class="stat-number">100+</div>
              <div class="stat-desc">Проектов</div>
            </div>

            <div class="stat-item">
              <div class="stat-number">30+</div>
              <div class="stat-desc">Клиентов</div>
            </div>

            <div class="stat-item">
              <div class="stat-number">8</div>
              <div class="stat-desc">Лет опыта</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import AboutHero from "@/components/AboutPage/AboutHero.vue";
import AboutSection from "@/components/AboutPage/AboutSection.vue";

export default {
  name: "AboutPage",
  components: {
    AboutHero,
    AboutSection,
  },
  metaInfo: {
    title: "О компании - Центр новых интеллектуальных интегрированных систем",
  },
};
</script>

<style scoped>
.about-page {
  min-height: 100vh;
}

/* Отступ для fixed header */
.about-hero {
  margin-top: 0; /* Обнуляем внешний отступ, так как header фиксированный */
  padding-top: 82px; /* Приблизительная высота header с padding */
}

.content-container {
  padding-top: 50px;
  padding-bottom: 80px;
  background-color: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

section {
  margin-bottom: 80px;
}

h2 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
  color: #333;
  position: relative;
}

h2:after {
  content: "";
  position: absolute;
  width: 100px;
  height: 3px;
  background-color: #5790dc;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

/* Стили для информационных карточек */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.info-card {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.info-card:hover {
  transform: translateY(-10px);
}

.icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #5790dc;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 1.8rem;
}

.info-card h3 {
  margin-bottom: 15px;
  color: #333;
}

/* Стили для истории компании */
.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline:before {
  content: "";
  position: absolute;
  width: 3px;
  background-color: #2a4d80;
  top: 0;
  bottom: 0;
  left: 120px;
}

.timeline-item {
  display: flex;
  margin-bottom: 40px;
  position: relative;
}

.year {
  width: 100px;
  font-size: 1.5rem;
  font-weight: bold;
  padding-right: 20px;
  text-align: right;
  color: #0066cc; /* Замените на корпоративный цвет */
}

.milestone {
  padding-left: 40px;
  flex: 1;
}

.milestone:before {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #0066cc; /* Замените на корпоративный цвет */
  left: 111px;
  top: 5px;
}

.milestone h4 {
  margin-bottom: 10px;
  color: #333;
}

/* Стили для статистики */
.company-stats {
  background-color: #0066cc; /* Замените на корпоративный цвет */
  padding: 60px 0;
  color: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  text-align: center;
}

.stat-number {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.stat-desc {
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Адаптивность */
@media (max-width: 768px) {
  .timeline:before {
    left: 30px;
  }

  .year {
    width: 60px;
    font-size: 1.2rem;
  }

  .milestone {
    padding-left: 20px;
  }

  .milestone:before {
    left: 21px;
  }

  h2 {
    font-size: 2rem;
  }

  .info-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
