<template>
  <div class="contact-page">
    <!-- Вставка компонента ContactInfo -->
    <ContactInfo />
    
    <!-- Карта -->
    <div class="map-container">
      <h2>Как нас найти</h2>
      
        <iframe 
          class="yandex-map"
          src="https://yandex.com/map-widget/v1/?ll=27.576706%2C53.893009&z=12&mode=search&oid=1256524776&ol=biz&z=12" 
          width="100%" 
          height="450" 
          frameborder="1" 
          allowfullscreen="true" 
          style="position:relative;"
        ></iframe>
      
    </div>
  </div>
</template>

<script>
// Импорт компонента ContactInfo
import ContactInfo from '@/components/ContactPage/ContactInfo.vue';

export default {
  name: 'ContactPage',
  components: {
    ContactInfo // Регистрация компонента
  }
}
</script>

<style scoped>
.contact-page {
  padding: 100px 0 2rem;
  margin: 0 auto;
}

.contact-header {
  max-width: 1200px;
  margin: 0 auto 40px;
  padding: 0 2rem;
  text-align: center;
}

.contact-header h1 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 42px;
  line-height: 48px;
  color: #2A4D80;
  margin-bottom: 15px;
}

.contact-header p {
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  color: #333333;
  max-width: 600px;
  margin: 0 auto;
}

.map-container {
  max-width: 1200px;
  margin: 60px auto 0;
  padding: 0 2rem;
}

.map-container h2 {
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 32px;
  line-height: 38px;
  color: #2A4D80;
  margin-bottom: 30px;
  text-align: center;
}

.map-wrapper {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.google-map {
  width: 100%;
  height: 450px;
  border: none;
}

@media (max-width: 768px) {
  .contact-header h1 {
    font-size: 32px;
    line-height: 36px;
  }
  
  .contact-header p {
    font-size: 16px;
  }
  
  .map-container h2 {
    font-size: 24px;
    line-height: 30px;
  }
  
  .google-map {
    height: 300px;
  }
}
</style>