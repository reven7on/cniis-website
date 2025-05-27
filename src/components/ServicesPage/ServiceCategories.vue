<template>
    <section class="services-categories">
      <div class="container">
        <h2 class="section-title">Категории услуг</h2>
        
        <div class="categories-tabs">
          <div class="tabs-header">
            <button 
              v-for="(category, index) in categories" 
              :key="index"
              class="tab-button" 
              :class="{ active: activeCategory === index }"
              @click="setActiveCategory(index)"
            >
              {{ category.title }}
            </button>
          </div>
          
          <transition name="fade" mode="out-in">
            <div class="tab-content" :key="activeCategory">
              <div class="content-wrapper">
                <div class="content-icon">
                  <img :src="categories[activeCategory].icon" :alt="categories[activeCategory].title">
                </div>
                <div class="content-text">
                  <h3>{{ categories[activeCategory].title }}</h3>
                  <p>{{ categories[activeCategory].description }}</p>
                  <ul class="services-list">
                    <li v-for="(service, i) in categories[activeCategory].services" :key="i">
                      {{ service }}
                    </li>
                  </ul>
                  <button class="details-button">Подробнее</button>
                </div>
              </div>
            </div>
          </transition>
        </div>
        
        <div class="categories-cards">
          <div 
            v-for="(category, index) in categories" 
            :key="index"
            class="category-card"
            :class="{ active: activeCategory === index }"
            @click="setActiveCategory(index)"
          >
            <div class="card-icon">
              <img :src="category.icon" :alt="category.title">
            </div>
            <h3>{{ category.title }}</h3>
            <p>{{ category.shortDescription }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ServiceCategories',
    data() {
      return {
        activeCategory: 0,
        categories: [
          {
            title: 'Разработка интеллектуальных систем',
            icon: require('@/assets/icons/ai-development.svg'),
            shortDescription: 'Создание и внедрение систем на основе искусственного интеллекта',
            description: 'Мы специализируемся на разработке интеллектуальных систем, которые автоматизируют сложные процессы и повышают эффективность бизнеса.',
            services: [
              'Машинное обучение и нейронные сети',
              'Системы компьютерного зрения',
              'Обработка естественного языка',
              'Предиктивная аналитика',
              'Разработка интеллектуальных агентов'
            ]
          },
          {
            title: 'Консалтинг в области ИИ',
            icon: require('@/assets/icons/ai-consulting.svg'),
            shortDescription: 'Экспертное сопровождение проектов в сфере искусственного интеллекта',
            description: 'Наши эксперты помогут вам определить потенциал применения ИИ в вашем бизнесе и разработать стратегию внедрения.',
            services: [
              'Аудит бизнес-процессов',
              'Оценка возможностей автоматизации',
              'Разработка дорожной карты внедрения ИИ',
              'Подбор оптимальных технологий',
              'Оценка эффективности ИИ-проектов'
            ]
          },
          {
            title: 'Системная интеграция',
            icon: require('@/assets/icons/system-integration.svg'),
            shortDescription: 'Внедрение ИИ-решений в существующую инфраструктуру',
            description: 'Мы обеспечиваем плавную интеграцию интеллектуальных систем с вашими существующими IT-решениями и бизнес-процессами.',
            services: [
              'Интеграция с корпоративными системами',
              'Настройка API и интерфейсов',
              'Миграция данных',
              'Разработка коннекторов',
              'Оптимизация инфраструктуры'
            ]
          },
          {
            title: 'Научные исследования',
            icon: require('@/assets/icons/research.svg'),
            shortDescription: 'Проведение инновационных исследований в сфере ИИ',
            description: 'Наша команда ученых и инженеров проводит передовые исследования в области искусственного интеллекта и машинного обучения.',
            services: [
              'Фундаментальные исследования в области ИИ',
              'Разработка прототипов и концептов',
              'Научно-технический консалтинг',
              'Публикация научных статей',
              'Патентование технологий'
            ]
          },
          {
            title: 'Обучение и сопровождение',
            icon: require('@/assets/icons/training.svg'),
            shortDescription: 'Подготовка специалистов и техническая поддержка',
            description: 'Мы обеспечиваем полный цикл обучения и сопровождения для эффективного использования внедренных ИИ-систем.',
            services: [
              'Корпоративное обучение',
              'Разработка учебных материалов',
              'Техническая поддержка 24/7',
              'Обновление и масштабирование систем',
              'Аналитика эффективности использования'
            ]
          }
        ]
      }
    },
    methods: {
      setActiveCategory(index) {
        this.activeCategory = index
      }
    }
  }
  </script>
  
  <style scoped>
  .services-categories {
    background-color: #E8F1FB;
    padding: 80px 0;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .section-title {
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 32px;
    color: #2A4D80;
    margin-bottom: 50px;
  }
  
  /* Tabs styling */
  .categories-tabs {
    margin-bottom: 60px;
  }
  
  .tabs-header {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 30px;
    gap: 10px;
  }
  
  .tab-button {
    padding: 12px 20px;
    background-color: #FFFFFF;
    border: 2px solid #5790DC;
    color: #5790DC;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 15px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .tab-button.active {
    background-color: #5790DC;
    color: #FFFFFF;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .tab-button:hover:not(.active) {
    background-color: #E8F1FB;
  }
  
  .tab-content {
    background-color: #FFFFFF;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .content-wrapper {
    display: flex;
    gap: 30px;
  }
  
  .content-icon {
    flex: 0 0 120px;
  }
  
  .content-icon img {
    width: 100%;
    height: auto;
  }
  
  .content-text {
    flex: 1;
  }
  
  .content-text h3 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 24px;
    color: #2A4D80;
    margin-bottom: 15px;
  }
  
  .content-text p {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: #333333;
    margin-bottom: 20px;
  }
  
  .services-list {
    margin-bottom: 25px;
    padding-left: 20px;
  }
  
  .services-list li {
    font-family: 'Open Sans', sans-serif;
    font-size: 15px;
    line-height: 24px;
    color: #333333;
    margin-bottom: 8px;
    position: relative;
    list-style-type: none;
  }
  
  .services-list li::before {
    content: "•";
    color: #5790DC;
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
  
  .details-button {
    background-color: #5790DC;
    color: #FFFFFF;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .details-button:hover {
    background-color: #FF9800;
  }
  
  /* Cards styling */
  .categories-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 30px;
  }
  
  .category-card {
    background-color: #FFFFFF;
    border-radius: 8px;
    padding: 25px 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .category-card.active {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(87, 144, 220, 0.3);
    border: 2px solid #5790DC;
  }
  
  .card-icon {
    width: 70px;
    height: 70px;
    margin-bottom: 20px;
  }
  
  .card-icon img {
    width: 100%;
    height: auto;
  }
  
  .category-card h3 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 18px;
    color: #2A4D80;
    margin-bottom: 10px;
  }
  
  .category-card p {
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: #333333;
  }
  
  /* Transitions */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  
  /* Responsive */
  @media (max-width: 992px) {
    .categories-tabs {
      display: none;
    }
  }
  
  @media (min-width: 993px) {
    .categories-cards {
      display: none;
    }
  }
  
  @media (max-width: 768px) {
    .section-title {
      font-size: 28px;
    }
    
    .categories-cards {
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 20px;
    }
  }
  
  @media (max-width: 480px) {
    .section-title {
      font-size: 24px;
    }
    
    .categories-cards {
      grid-template-columns: 1fr;
      gap: 15px;
    }
  }
  </style>