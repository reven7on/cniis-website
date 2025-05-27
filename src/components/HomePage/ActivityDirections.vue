<template>
  <section class="activity-directions">
    <div class="container">
      <h2 class="section-title">Направления деятельности</h2>
      <div class="coordinate-system">
        <div class="axis x-axis"></div>
        <div class="axis y-axis"></div>
        
        <div 
          v-for="(direction, index) in activityDirections" 
          :key="index" 
          class="direction-circle"
          :class="[`quadrant-${index + 1}`, { 'show': isVisible[index] }]"
          @mouseover="hoverCircle(index)"
          @mouseout="unhoverCircle(index)"
        >
          <div class="circle-content">
            <div class="card-icon">
              <img :src="direction.icon" :alt="direction.title">
            </div>
            <h3>{{ direction.title }}</h3>
            <p>{{ direction.description }}</p>
            <button class="more-button">Подробнее</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from 'gsap';
// Импортируем изображения напрямую
import aiDevelopmentIcon from '@/assets/icons/ai-development.svg';
import aiConsultingIcon from '@/assets/icons/ai-consulting.svg';
import systemIntegrationIcon from '@/assets/icons/system-integration.svg';
import researchIcon from '@/assets/icons/research.svg';

export default {
  name: 'ActivityDirections',
  data() {
    return {
      activityDirections: [
        {
          title: 'Разработка интеллектуальных систем',
          description: 'Создание и внедрение передовых решений на базе искусственного интеллекта и машинного обучения',
          icon: aiDevelopmentIcon
        },
        {
          title: 'Консалтинг в области ИИ',
          description: 'Экспертная поддержка и стратегическое планирование внедрения ИИ-технологий в бизнес-процессы',
          icon: aiConsultingIcon
        },
        {
          title: 'Системная интеграция',
          description: 'Комплексные решения по объединению и синхронизации различных IT-систем в единую экосистему',
          icon: systemIntegrationIcon
        },
        {
          title: 'Научные исследования',
          description: 'Фундаментальные и прикладные исследования в области искусственного интеллекта и обработки данных',
          icon: researchIcon
        }
      ],
      isVisible: [false, false, false, false]
    }
  },
  mounted() {
    // Анимированное появление кругов с использованием GSAP
    this.activityDirections.forEach((_, index) => {
      setTimeout(() => {
        this.isVisible[index] = true;
        gsap.fromTo(
          `.quadrant-${index + 1}`,
          { 
            opacity: 0, 
            scale: 0.8,
            x: this.getInitialX(index),
            y: this.getInitialY(index)
          },
          { 
            opacity: 1, 
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          }
        );
      }, index * 300);
    });
  },
  methods: {
    getInitialX(index) {
      // Определяем начальную X-координату в зависимости от квадранта
      return [30, 30, -30, -30][index];
    },
    getInitialY(index) {
      // Определяем начальную Y-координату в зависимости от квадранта
      return [-30, 30, 30, -30][index];
    },
    hoverCircle(index) {
      gsap.to(`.quadrant-${index + 1}`, {
        scale: 1.05,
        boxShadow: '0 10px 25px rgba(42, 77, 128, 0.2)',
        duration: 0.3
      });
    },
    unhoverCircle(index) {
      gsap.to(`.quadrant-${index + 1}`, {
        scale: 1,
        boxShadow: '0 5px 15px rgba(42, 77, 128, 0.1)',
        duration: 0.3
      });
    }
  }
}
</script>

<style scoped>
.activity-directions {
  padding: 6rem 2rem;
  text-align: center;
  background-color: #E8F1FB;
  font-family: 'Open Sans', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.section-title {
  margin-bottom: 4rem;
  font-size: 32px;
  line-height: 38px;
  font-weight: 700;
  color: #333333;
  font-family: 'Montserrat', sans-serif;
  position: relative;
}

.section-title:after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: #5790DC;
}

.coordinate-system {
  position: relative;
  height: 900px; /* Увеличил высоту с 800px до 900px */
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.axis {
  position: absolute;
  background-color: rgba(42, 77, 128, 0.1);
  z-index: 1;
}

.x-axis {
  width: 100%;
  height: 1px;
  top: 50%;
}

.y-axis {
  height: 100%;
  width: 1px;
  left: 50%;
}

.direction-circle {
  position: absolute;
  width: 320px;  /* Было 280px */
  height: 320px; /* Было 280px */
  border-radius: 50%;
  background-color: #FFFFFF;
  box-shadow: 0 5px 15px rgba(42, 77, 128, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  z-index: 2;
  opacity: 0;
}

.direction-circle.show {
  opacity: 1;
}

.quadrant-1 {
  top: 5%; /* Было 10% */
  left: 10%;
}

.quadrant-2 {
  top: 5%; /* Было 10% */
  right: 10%;
}

.quadrant-3 {
  bottom: 5%; /* Было 10% */
  right: 10%;
}

.quadrant-4 {
  bottom: 5%; /* Было 10% */
  left: 10%;
}

.circle-content {
  text-align: center;
  max-width: 85%;
}

.card-icon img {
  width: 70px;
  height: 70px;
  margin-bottom: 1.2rem;
}

h3 {
  margin-bottom: 1rem;
  color: #2A4D80;
  font-size: 20px;
  line-height: 26px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
}

p {
  color: #333333;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  font-size: 14px;
  font-weight: 400;
}

.more-button {
  background-color: #5790DC;
  color: white;
  border: none;
  padding: 0.7rem 1.4rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 2px 5px rgba(255, 152, 0, 0.3);
}

.more-button:hover {
  background-color: #FF9800;
}

@media (max-width: 1200px) {
  .direction-circle {
    width: 280px;  /* Было 250px */
    height: 280px; /* Было 250px */
  }
}

@media (max-width: 1024px) {
  .coordinate-system {
    height: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  
  .direction-circle {
    position: relative;
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    top: auto;
    left: auto;
    right: auto;
    bottom: auto;
  }
  
  .axis {
    display: none;
  }
}

@media (max-width: 640px) {
  .coordinate-system {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 24px;
    line-height: 30px;
  }
  
  .activity-directions {
    padding: 4rem 1.5rem;
  }
}
</style>