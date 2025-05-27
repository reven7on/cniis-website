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
          description: 'Наши специалисты имеют многолетний опыт работы в сфере информационных технологий и отраслевой экспертизы',
          icon: 'fas fa-users'
        },
        {
          title: 'Инновационные технологии',
          description: 'Мы используем передовые технологии и современные подходы при разработке решений',
          icon: 'fas fa-lightbulb'
        },
        {
          title: 'Научный подход',
          description: 'Все наши решения основаны на научных исследованиях и проверенных методологиях',
          icon: 'fas fa-flask'
        },
        {
          title: 'Отраслевая экспертиза',
          description: 'Глубокое понимание бизнес-процессов и специфики различных отраслей',
          icon: 'fas fa-industry'
        },
        {
          title: 'Надежность решений',
          description: 'Высоконадежные решения, проверенные в реальных условиях эксплуатации',
          icon: 'fas fa-shield-alt'
        },
        {
          title: 'Сопровождение после внедрения',
          description: 'Мы обеспечиваем полную поддержку и развитие систем после их внедрения',
          icon: 'fas fa-headset'
        }
      ]
    }
  }
}
</script>

<style scoped>
.advantages {
  padding: 5rem 2rem;
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
  font-size: 2.5rem;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-top: 2rem;
}

/* Стили для гексагональных карточек */
.hex-card {
  position: relative;
  width: 300px;
  height: 260px;
  margin: 30px 15px;
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
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hex-card:hover .hex-content {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
}

.hex-icon {
  font-size: 2.5rem;
  color: var(--primary-color, #0077cc);
  margin-bottom: 1rem;
}

.hex-content h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--heading-color, #222);
}

.hex-content p {
  font-size: 0.9rem;
  text-align: center;
  color: var(--text-light, #666);
}

/* Медиа-запросы для адаптивности */
@media (max-width: 768px) {
  .hex-card {
    width: 260px;
    height: 230px;
  }
  
  .hex-content {
    padding: 20px;
  }
  
  .hex-icon {
    font-size: 2rem;
  }
  
  .hex-content h3 {
    font-size: 1.1rem;
  }
  
  .hex-content p {
    font-size: 0.8rem;
  }
}

@media (max-width: 576px) {
  .advantages-grid {
    gap: 15px;
  }
  
  .hex-card {
    width: 230px;
    height: 200px;
    margin: 20px 10px;
  }
  
  .hex-content {
    padding: 15px;
  }
}
</style>