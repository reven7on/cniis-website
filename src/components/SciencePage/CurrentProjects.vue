<template>
  <section class="current-projects-section" id="current-projects-section">
    <h2 class="section-title">Текущие проекты</h2>
    <div class="projects-container" ref="projectsContainer">
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="project-card"
        ref="projectCards"
      >
        <h3 class="project-title">{{ project.title }}</h3>
        <div class="project-meta">
          <span class="project-period"
            ><i class="far fa-calendar-alt"></i> {{ project.period }}</span
          >
          <span class="project-lead"
            ><i class="far fa-user"></i> {{ project.lead }}</span
          >
        </div>
        <p class="project-description">{{ project.description }}</p>
        <div class="project-status" :class="statusClass(project.status)">
          <span class="status-dot"></span>
          <span class="status-text">{{ statusText(project.status) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "CurrentProjects",
  data() {
    return {
      projects: [
        {
          title: "Интеллектуальная система анализа медицинских изображений",
          period: "2023-2025",
          lead: "Кузнецов К.К.",
          description:
            "Разработка системы машинного обучения для автоматического анализа медицинских снимков с целью раннего выявления патологий и поддержки принятия решений врачами-диагностами.",
          status: "active",
        },
        {
          title: "Оптимизация процессов в производстве с помощью ИИ",
          period: "2022-2024",
          lead: "Петров П.П.",
          description:
            "Внедрение интеллектуальных алгоритмов для оптимизации производственных процессов, сокращения издержек и повышения эффективности на промышленных предприятиях.",
          status: "active",
        },
        {
          title: "Разработка персонализированной рекомендательной системы",
          period: "2023-2024",
          lead: "Иванов И.И.",
          description:
            "Создание адаптивной рекомендательной системы, способной предлагать персонализированный контент и товары на основе поведения пользователя и анализа предпочтений.",
          status: "planning",
        },
        {
          title: "Исследование методов обработки естественного языка",
          period: "2022-2023",
          lead: "Сидоров С.С.",
          description:
            "Комплексное исследование современных подходов к обработке естественного языка для решения задач классификации, извлечения информации и генерации контента.",
          status: "completed",
        },
      ],
    };
  },
  mounted() {
    this.animateProjects();
  },
  methods: {
    statusClass(status) {
      switch (status) {
        case "active":
          return "status-active";
        case "planning":
          return "status-planning";
        case "completed":
          return "status-completed";
        default:
          return "";
      }
    },
    statusText(status) {
      switch (status) {
        case "active":
          return "В процессе";
        case "planning":
          return "Планируется";
        case "completed":
          return "Завершен";
        default:
          return "Неизвестно";
      }
    },
    animateProjects() {
      // Анимация появления карточек проектов при скролле
      if (this.$refs.projectCards && this.$refs.projectCards.length) {
        gsap.from(this.$refs.projectCards, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: this.$refs.projectsContainer,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }
    },
  },
};
</script>

<style scoped>
.current-projects-section {
  padding: 2rem 0;
}

.section-title {
  font-family: "Montserrat", sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: #2a4d80;
  margin-bottom: 2rem;
  text-align: center;
}

.projects-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-top: 4px solid #5790dc;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.project-title {
  font-family: "Roboto", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.8rem;
}

.project-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  font-family: "Open Sans", sans-serif;
  font-size: 0.9rem;
  color: #666;
}

.project-meta i {
  margin-right: 0.3rem;
  color: #5790dc;
}

.project-description {
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 1.2rem;
}

.project-status {
  display: flex;
  align-items: center;
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.status-active .status-dot {
  background-color: #4caf50; /* Зеленый */
}

.status-planning .status-dot {
  background-color: #ffc107; /* Желтый */
}

.status-completed .status-dot {
  background-color: #9e9e9e; /* Серый */
}

.status-active .status-text {
  color: #4caf50;
}

.status-planning .status-text {
  color: #ffc107;
}

.status-completed .status-text {
  color: #9e9e9e;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 1.5rem; /* H2 mobile size */
  }

  .project-title {
    font-size: 1.25rem; /* H3 mobile size */
  }

  .project-description {
    font-size: 0.875rem; /* Body text mobile size */
    line-height: 1.6;
  }

  .projects-container {
    grid-template-columns: 1fr;
  }
}
</style>
