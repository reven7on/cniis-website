<template>
  <section class="work-process">
    <div class="container">
      <h2 class="section-title">Процесс работы</h2>
      <div class="timeline">
        <div class="timeline-controls">
          <button 
            v-for="(stage, index) in stages" 
            :key="index"
            :class="['timeline-btn', { active: currentStage === index }]"
            @click="setStage(index)"
          >
            {{ stage.title }}
          </button>
        </div>

        <div class="timeline-visualization">
          <div class="timeline-line">
            <div 
              class="timeline-progress" 
              :style="{ width: `${(currentStage / (stages.length - 1)) * 100}%` }"
            ></div>
            <div 
              v-for="(stage, index) in stages" 
              :key="index"
              :class="['timeline-point', { 
                active: currentStage === index,
                completed: currentStage > index 
              }]"
              :style="{ left: `${(index / (stages.length - 1)) * 100}%` }"
              @click="setStage(index)"
            >
              <div class="point-number">{{ index + 1 }}</div>
            </div>
          </div>
        </div>

        <transition name="fade" mode="out-in">
          <div :key="currentStage" class="stage-content">
            <div class="stage-info">
              <h3>{{ stages[currentStage].title }}</h3>
              <p>{{ stages[currentStage].description }}</p>
            </div>
            <div class="stage-illustration">
              <img 
                :src="stages[currentStage].image" 
                :alt="stages[currentStage].title"
              >
            </div>
          </div>
        </transition>

        <div class="timeline-navigation">
          <button 
            class="nav-btn prev" 
            :disabled="currentStage === 0"
            @click="prevStage"
          >
            Предыдущий этап
          </button>
          <button 
            class="nav-btn next" 
            :disabled="currentStage === stages.length - 1"
            @click="nextStage"
          >
            Следующий этап
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'WorkProcess',
  data() {
    return {
      currentStage: 0,
      stages: [
        {
          title: 'Анализ требований',
          description: 'На этом этапе мы тщательно изучаем ваши потребности, определяем цели проекта и собираем все необходимые требования для успешной реализации.',
          image: require('@/assets/images/banner1.jpg')
        },
        {
          title: 'Концептуальное проектирование',
          description: 'Разрабатываем концепцию проекта, создаем прототипы интерфейса и планируем архитектуру будущего решения, учитывая все собранные требования.',
          image: require('@/assets/images/banner2.jpg')
        },
        {
          title: 'Разработка',
          description: 'Наша команда приступает к непосредственной разработке проекта, следуя утвержденному плану и используя современные технологии.',
          image: require('@/assets/images/banner3.jpg')
        },
        {
          title: 'Тестирование',
          description: 'Проводим комплексное тестирование для выявления и устранения возможных ошибок, обеспечивая высокое качество конечного продукта.',
          image: require('@/assets/images/banner4.png')
        },
        {
          title: 'Внедрение',
          description: 'Осуществляем внедрение готового решения в вашу инфраструктуру, обеспечивая плавный переход и обучение персонала.',
          image: require('@/assets/images/banner5.jpg')
        },
        {
          title: 'Сопровождение',
          description: 'Предоставляем техническую поддержку, обновления и консультации после запуска проекта, обеспечивая его долгосрочное успешное функционирование.',
          image: require('@/assets/images/clean_office.jpg')
        }
      ]
    }
  },
  methods: {
    setStage(index) {
      this.currentStage = index;
    },
    nextStage() {
      if (this.currentStage < this.stages.length - 1) {
        this.currentStage++;
      }
    },
    prevStage() {
      if (this.currentStage > 0) {
        this.currentStage--;
      }
    },
    preloadNextImage(currentIndex) {
      // Предзагрузка следующего изображения
      if (currentIndex < this.stages.length - 1) {
        const nextImage = new Image();
        nextImage.src = this.stages[currentIndex + 1].image;
      }
    }
  },
  mounted() {
    // Опция для добавления автоматической прокрутки при скролле
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Активировать анимацию при появлении в области видимости
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(this.$el);

    // Предзагрузка следующего изображения для более плавного перехода
    this.$nextTick(() => {
      this.preloadNextImage(this.currentStage);
    });
  },
  watch: {
    currentStage(newValue) {
      // Предзагрузка следующего изображения при изменении этапа
      this.preloadNextImage(newValue);
    }
  }
}
</script>

<style scoped>
.work-process {
  padding: 80px 0;
  background-color: #E8F1FB; /* Светло-голубой для фона согласно рекомендациям */
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.work-process.visible {
  opacity: 1;
  transform: translateY(0);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  text-align: center;
  font-family: 'Montserrat', 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 32px;
  line-height: 38px;
  margin-bottom: 50px;
  color: #2A4D80; /* Темно-синий согласно рекомендациям */
}

.timeline {
  position: relative;
  margin-top: 40px;
}

.timeline-controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.timeline-btn {
  padding: 10px 15px;
  background: none;
  border: none;
  font-family: 'Open Sans', 'Roboto', sans-serif;
  font-size: 16px;
  color: #333333; /* Темно-серый для текста согласно рекомендациям */
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.timeline-btn.active {
  color: #5790DC; /* Основной голубой согласно рекомендациям */
  font-weight: bold;
}

.timeline-visualization {
  margin: 40px 0;
  position: relative;
}

.timeline-line {
  position: relative;
  height: 4px;
  background-color: #E8F1FB; /* Светло-голубой согласно рекомендациям */
  margin: 40px 0;
  display: flex;
  justify-content: space-between;
}

.timeline-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #5790DC; /* Основной голубой согласно рекомендациям */
  transition: width 0.5s ease;
}

.timeline-point {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #FFFFFF; /* Белый согласно рекомендациям */
  border: 2px solid #333333; /* Темно-серый согласно рекомендациям */
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.timeline-point.active {
  background-color: #5790DC; /* Основной голубой согласно рекомендациям */
  border-color: #2A4D80; /* Темно-синий согласно рекомендациям */
  transform: translate(-50%, -50%) scale(1.2);
}

.timeline-point.completed {
  background-color: #5790DC; /* Основной голубой согласно рекомендациям */
  border-color: #2A4D80; /* Темно-синий согласно рекомендациям */
}

.point-number {
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: #FFFFFF; /* Белый согласно рекомендациям */
}

.stage-content {
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background-color: #FFFFFF; /* Белый согласно рекомендациям */
}

.stage-info {
  flex: 1;
  min-width: 300px;
  padding: 30px;
}

.stage-info h3 {
  font-family: 'Montserrat', 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #5790DC; /* Основной голубой согласно рекомендациям */
  margin-bottom: 15px;
}

.stage-info p {
  font-family: 'Open Sans', 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #333333; /* Темно-серый для текста согласно рекомендациям */
}

.stage-illustration {
  flex: 1;
  min-width: 300px;
  height: 300px;
  overflow: hidden;
}

.stage-illustration img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.stage-illustration img:hover {
  transform: scale(1.05);
}

.timeline-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.nav-btn {
  padding: 10px 20px;
  background-color: #5790DC; /* Акцентный оранжевый для кнопок согласно рекомендациям */
  color: white;
  font-family: 'Open Sans', 'Roboto', sans-serif;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.nav-btn:hover {
  background-color: #FF9800; /* Затемненный оранжевый при наведении */
}

.nav-btn:disabled {
  background-color: #E8F1FB; /* Светло-голубой согласно рекомендациям */
  color: #333333; /* Темно-серый для текста согласно рекомендациям */
  cursor: not-allowed;
}

/* Анимации */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
  .section-title {
    font-size: 24px;
    line-height: 30px;
  }
  
  .timeline-controls {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  
  .timeline-btn {
    font-size: 14px;
    padding: 8px 10px;
  }
  
  .stage-info, .stage-illustration {
    flex: 100%;
  }
  
  .stage-info h3 {
    font-size: 20px;
    line-height: 26px;
  }
  
  .stage-info p {
    font-size: 14px;
    line-height: 22px;
  }
  
  .timeline-point {
    width: 25px;
    height: 25px;
  }
  
  .point-number {
    font-size: 12px;
  }
}
</style>