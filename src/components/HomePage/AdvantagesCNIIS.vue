<template>
  <section class="advantages">
    <div class="container">
      <h2 class="animated-heading">Преимущества ЦНИИС</h2>
      
      <div class="advantages-grid">
        <div class="hex-card" v-for="(advantage, index) in advantages" :key="index">
          <div class="hex-content">
            <div class="hex-icon">
              <i :class="advantage.icon"></i>
            </div>
            <h3>{{ advantage.title }}</h3>
            <p>{{ advantage.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AdvantagesCNIIS',
  data() {
    return {
      advantages: [
        {
          title: 'Опытная команда экспертов',
          description: 'Многолетний опыт в IT и глубокая отраслевая экспертиза наших специалистов',
          icon: 'fas fa-users'
        },
        {
          title: 'Инновационные технологии',
          description: 'Передовые технологии и современные подходы в разработке решений',
          icon: 'fas fa-lightbulb'
        },
        {
          title: 'Научный подход',
          description: 'Решения на основе научных исследований и проверенных методологий',
          icon: 'fas fa-flask'
        },
        {
          title: 'Отраслевая экспертиза',
          description: 'Глубокое понимание бизнес-процессов различных отраслей',
          icon: 'fas fa-industry'
        },
        {
          title: 'Надежность решений',
          description: 'Высоконадежные системы, проверенные в реальных условиях',
          icon: 'fas fa-shield-alt'
        },
        {
          title: 'Полное сопровождение',
          description: 'Поддержка и развитие систем на всех этапах жизненного цикла',
          icon: 'fas fa-headset'
        }
      ]
    }
  }
}
</script>

<style scoped>
.advantages {
  padding: 3rem 1rem;
  background-color: var(--background-color, #f8f9fa);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

/* Анимированный заголовок с подчеркиванием */
.animated-heading {
  display: inline-block;
  position: relative;
  margin-bottom: 3rem;
  color: var(--text-color, #333);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  padding: 0 1rem;
}

.animated-heading::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -10px;
  width: 0;
  height: 4px;
  background-color: var(--primary-color, #0077cc);
  transition: width 0.6s ease, left 0.6s ease;
}

.animated-heading:hover::after {
  width: 100%;
  left: 0;
}

/* Сетка гексагональных блоков */
.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  justify-items: center;
}

/* Стили для гексагональных карточек */
.hex-card {
  position: relative;
  width: 100%;
  max-width: 320px;
  aspect-ratio: 1.15;
  margin: 1rem 0;
}

.hex-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(1.5rem, 4vw, 2rem);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
}

.hex-card:hover .hex-content {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
}

.hex-icon {
  font-size: clamp(1.8rem, 3vw, 2.2rem);
  color: var(--primary-color, #0077cc);
  margin-bottom: 0.8rem;
  flex-shrink: 0;
}

.hex-content h3 {
  font-size: clamp(0.95rem, 2.5vw, 1.1rem);
  margin-bottom: 0.5rem;
  color: var(--heading-color, #222);
  text-align: center;
  line-height: 1.3;
  font-weight: 600;
}

.hex-content p {
  font-size: clamp(0.7rem, 1.8vw, 0.8rem);
  text-align: center;
  color: var(--text-light, #666);
  line-height: 1.3;
  margin: 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  hyphens: auto;
  word-break: break-word;
}

/* Медиа-запросы для мобильных устройств */
@media (max-width: 768px) {
  .advantages {
    padding: 2rem 0.5rem;
  }
  
  .advantages-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
  }
  
  .hex-card {
    max-width: 280px;
  }
  
  .hex-content {
    padding: clamp(1.2rem, 3vw, 1.8rem);
  }

  .animated-heading {
    margin-bottom: 2rem;
  }
}

@media (max-width: 480px) {
  .advantages {
    padding: 1.5rem 0.5rem;
  }
  
  .advantages-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .hex-card {
    max-width: 250px;
    margin: 0.5rem 0;
  }
  
  .hex-content {
    padding: 1rem;
  }
  
  .hex-content h3 {
    margin-bottom: 0.3rem;
  }
  
  .hex-content p {
    -webkit-line-clamp: 3;
  }
}

/* Дополнительные стили для очень маленьких экранов */
@media (max-width: 360px) {
  .hex-card {
    max-width: 220px;
  }
  
  .hex-content {
    padding: 0.8rem;
  }
  
  .hex-icon {
    margin-bottom: 0.5rem;
  }
}

/* Стили для больших экранов */
@media (min-width: 1200px) {
  .advantages-grid {
    grid-template-columns: repeat(3, 1fr);
    max-width: 1000px;
    margin: 2rem auto 0;
  }
}</style>