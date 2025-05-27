// src/views/HomePage.vue (create this file)
<template>
  <div class="home-page">
    <MainBanner />
    <ActivityDirections />
    <LatestProjects />
    <AdvantagesCNIIS />
    <ContactForm />
  </div>
</template>

<script>
import MainBanner from "@/components/HomePage/MainBanner.vue";
import ActivityDirections from "@/components/HomePage/ActivityDirections.vue";
import LatestProjects from "@/components/HomePage/LatestProjects.vue";
import AdvantagesCNIIS from "@/components/HomePage/AdvantagesCNIIS.vue";
import ContactForm from "@/components/HomePage/ContactForm.vue";

export default {
  name: "HomePage",
  components: {
    MainBanner,
    ActivityDirections,
    LatestProjects,
    AdvantagesCNIIS,
    ContactForm,
  },
};
</script>
