<template>
  <div class="services-page">
    <ServicesHeader />
    <ServiceCategories />
    <WorkProcess />
    <div class="services-content">
      <div class="container">
        <!-- Дополнительный контент при необходимости -->
      </div>
    </div>
  </div>
</template>
  
<script>
import ServicesHeader from '@/components/ServicesPage/ServicesHeader.vue'
import ServiceCategories from '@/components/ServicesPage/ServiceCategories.vue'
import WorkProcess from '@/components/ServicesPage/WorkProcess.vue'

export default {
  name: 'ServicesPage',
  components: {
    ServicesHeader,
    ServiceCategories,
    WorkProcess
  }
}
</script>
  
<style scoped>
.services-page {
  width: 100%;
}

.services-content {
  padding: 60px 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.container {
  width: 100%;
}
</style>