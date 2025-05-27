<template>
  <section class="key-projects">
    <div class="container">
      <h2>Ключевые проекты</h2>
      <div class="projects-slider-container">
        <!-- Swiper component -->
        <swiper
          :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation, SwiperA11y]"
          :slides-per-view="1"
          :loop="true"
          :speed="800"
          :autoplay="{
            delay: 7000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }"
          :pagination="{
            clickable: true,
            el: '.swiper-pagination',
            bulletActiveClass: 'active',
            bulletClass: 'nav-dot'
          }"
          :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }"
          :a11y="{
            prevSlideMessage: 'Предыдущий проект',
            nextSlideMessage: 'Следующий проект',
            firstSlideMessage: 'Это первый проект',
            lastSlideMessage: 'Это последний проект',
          }"
          @swiper="onSwiper"
        >
          <swiper-slide v-for="(project, index) in projects" :key="index" class="project-card">
            <img :src="project.image" :alt="project.title">
            <div class="project-info">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div class="technologies">
                <span v-for="(tech, techIndex) in project.technologies" 
                      :key="techIndex" 
                      class="tech-tag">
                  {{ tech }}
                </span>
              </div>
              <a :href="project.link" class="project-link">Подробнее</a>
            </div>
          </swiper-slide>
        </swiper>

        <!-- Custom navigation arrows -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        
        <!-- Custom pagination -->
        <div class="swiper-pagination slider-navigation"></div>
      </div>
      
      <a href="/projects" class="all-projects-btn">Все проекты</a>
    </div>
  </section>
</template>

<script>
// Import Swiper Vue components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper modules
import { Autoplay, Pagination, Navigation, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default {
  name: 'KeyProjects',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      // Setup Swiper modules
      SwiperAutoplay: Autoplay,
      SwiperPagination: Pagination,
      SwiperNavigation: Navigation,
      SwiperA11y: A11y,

      // Project data
      projects: [
        {
          title: 'Интеллектуальная система управления',
          description: 'Разработка комплексной системы управления для крупного производственного предприятия',
          image: require('@/assets/images/project1.jpg'),
          technologies: ['AI', 'Big Data', 'IoT'],
          link: '#project1'
        },
        {
          title: 'AI-решение для банка',
          description: 'Внедрение системы машинного обучения для анализа финансовых рисков',
          image: require('@/assets/images/project2.jpg'),
          technologies: ['Machine Learning', 'Python', 'TensorFlow'],
          link: '#project2'
        },
        {
          title: 'Цифровая трансформация логистики',
          description: 'Создание интегрированной платформы управления логистическими процессами',
          image: require('@/assets/images/project3.jpg'),
          technologies: ['Cloud', 'ReactJS', 'NodeJS'],
          link: '#project3'
        },
        {
          title: 'Умный город',
          description: 'Разработка экосистемы умного города с интеграцией городских сервисов',
          image: require('@/assets/images/project4.jpg'),
          technologies: ['IoT', 'Blockchain', 'Mobile'],
          link: '#project4'
        },
        {
          title: 'Автоматизация производства',
          description: 'Внедрение роботизированных систем и автоматизация производственных линий',
          image: require('@/assets/images/project5.jpg'),
          technologies: ['Robotics', 'PLC', 'Industrial IoT'],
          link: '#project5'
        }
      ],
      swiper: null
    }
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper;
    }
  }
}
</script>

<style scoped>
/* --- Existing styles --- */
.key-projects {
  padding: 4rem 2rem;
  background-color: var(--background-color);
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.projects-slider-container {
  position: relative;
  /* overflow: hidden; */ /* Let's keep this commented out during debugging, sometimes it hides the issue rather than fixing it. Add back if needed. */
  margin: 2rem 0;
  padding-bottom: 3rem; /* Add space for pagination dots */
}

/* --- Revised Project Card Styles --- */
.project-card {
  display: flex;
  /* Use gap for spacing instead of margin-left on one item */
  gap: 2rem;
  align-items: center; /* Keep vertical alignment */
  padding: 1rem 2rem; /* Adjust padding slightly if needed */
  box-sizing: border-box; /* Crucial: include padding in element's total width/height */
  /* Ensure the slide itself takes full width, which Swiper usually handles,
     but good practice to ensure no conflicting min/max width */
  width: 100%;
}

.project-card img {
  /* Let flexbox control the size basis */
  flex: 0 1 45%; /* Don't grow, shrink if needed, base size ~45% */
  max-width: 450px; /* Keep max width constraint */
  height: 300px; /* Keep fixed height */
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  box-sizing: border-box;
}

.project-info {
  /* Let flexbox control the size basis */
  flex: 1 1 50%; /* Grow and shrink, base size ~50% (adjust ratio as needed with image) */
  /* Remove fixed width and margin-left */
  padding: 1rem; /* Adjust padding if needed, was 2rem */
  text-align: left;
  box-sizing: border-box;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .project-card {
    flex-direction: column;
    padding: 1rem; /* Adjust mobile padding */
    gap: 1rem; /* Adjust mobile gap */
  }

  .project-card img {
    /* Take full width on mobile, respect max-width */
    flex-basis: auto; /* Reset flex-basis */
    width: 100%;
    max-width: 450px; /* Still respect max-width if desired */
    /* Adjust height for mobile? maybe auto? */
    height: 250px; /* Example: slightly smaller height */
    margin: 0 auto; /* Center image if it's narrower than container */
  }

  .project-info {
    flex-basis: auto; /* Reset flex-basis */
    width: 100%; /* Take full width */
    padding: 1rem 0; /* Adjust mobile padding */
    text-align: center; /* Center text on mobile? Or keep left? */
  }
}


/* --- Existing Link, Tech, Navigation, Button styles --- */
.project-link {
  display: inline-block;
  margin-top: 1.5rem;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: 2px solid var(--primary-color);
  border-radius: 5px;
  transition: all 0.3s ease;
}

.project-link:hover {
  background-color: var(--primary-color);
  color: white;
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  /* Justify center if text-align is center */
  justify-content: flex-start; /* Keep left aligned */
}
@media (max-width: 768px) {
  .technologies {
     justify-content: center; /* Center tags below centered text */
  }
}


.tech-tag {
  background-color: rgba(0,0,0,0.05);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  color: var(--secondary-color);
}

.slider-navigation {
  display: flex;
  justify-content: center;
  /* Removed margin-top as it's positioned absolutely */
  gap: 0.8rem;
  position: absolute;
  bottom: 10px; /* Adjust position from bottom */
  left: 0;
  right: 0;
  z-index: 10; /* Ensure pagination is above slides */
}

/* Swiper uses ::before for content, let's target that */
.nav-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(0,0,0,0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block; /* Needs to be inline-block or block */
  margin: 0 4px; /* Keep margin */
  /* Swiper adds span inside, remove default bullet styles */
  opacity: 1;
  border: none;
}

/* Swiper uses specific classes, target the correct one */
.swiper-pagination-bullet-active { /* Swiper's default active class */
  background-color: #5790DC !important; /* Use !important cautiously, only if needed */
  transform: scale(1.2);
}
/* If you still use custom classes via pagination options */
.nav-dot.active {
   background-color: #5790DC !important;
   transform: scale(1.2);
}

/* Custom navigation arrows - ИСПРАВЛЕННОЕ ПОЗИЦИОНИРОВАНИЕ ДЛЯ МОБИЛОК */
.swiper-button-prev,
.swiper-button-next {
  /* Базовые стили для всех размеров */
  color: #5790DC;
  width: 35px;
  height: 35px;
  margin-top: -17.5px; /* Центрирование по вертикали */
}

/* Десктоп стили */
.swiper-button-prev {
  left: -35px;
}

.swiper-button-next {
  right: -35px;
}

/* МОБИЛЬНЫЕ СТИЛИ - ИСПРАВЛЕНИЕ СИММЕТРИИ */
@media (max-width: 768px) {
  .swiper-button-prev,
  .swiper-button-next {
    width: 30px;
    height: 30px;
    margin-top: -15px;
    /* Одинаковое расстояние от краев на мобилке, но подальше друг от друга */
  }
  
  .swiper-button-prev {
    left: -10px; /* Отодвигаем левую стрелку левее */
  }

  .swiper-button-next {
    right: -10px; /* Отодвигаем правую стрелку правее */
  }
}

/* Еще более маленькие экраны */
@media (max-width: 480px) {
  .swiper-button-prev {
    left: -5px; /* Чуть ближе для очень маленьких экранов */
  }

  .swiper-button-next {
    right: -5px; /* Чуть ближе для очень маленьких экранов */
  }
}

.swiper-button-next:after,
.swiper-button-prev:after {
  font-size: 1.5rem; /* Adjust size as needed */
}

/* Уменьшаем размер стрелок на мобилках */
@media (max-width: 768px) {
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 1.2rem;
  }
}

.all-projects-btn {
  display: inline-block;
  margin-top: 2rem; /* Ensure enough space above button */
  padding: 0.8rem 2rem;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.all-projects-btn:hover {
  background-color: var(--primary-color-dark, #0056b3);
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0,0,0,0.15);
}

/* Add this globally or ensure it's inherited if you suspect box-sizing issues */
* {
  box-sizing: border-box;
}
</style>