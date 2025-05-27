<template>
  <div class="about-hero" ref="heroContainer">
    <div
      class="hero-image"
      :style="{ transform: `translateY(${parallaxOffset}px)` }"
    >
      <img
        src="@/assets/images/clean_office.jpg"
        alt="Офис компании"
        loading="eager"
        fetchpriority="high"
        decoding="sync"
        v-img-optimize="{ critical: true, responsive: true, sizes: '100vw' }"
      />
    </div>
    <div class="overlay"></div>
    <div class="hero-content">
      <h1>О Центре новых интеллектуальных интегрированных систем</h1>
      <h2>Инновации и решения для будущего</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutHero",
  data() {
    return {
      parallaxOffset: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollPosition = window.scrollY;
      this.parallaxOffset = scrollPosition * 0.4; // Настройте скорость параллакс-эффекта здесь
    },
  },
};
</script>

<style scoped>
.about-hero {
  position: relative;
  height: 80vh;
  width: 100%;
  overflow: hidden;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(42, 77, 128, 0.8) 0%,
    rgba(87, 144, 220, 0.8) 100%
  );
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  width: 80%;
  max-width: 1000px;
  z-index: 2;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

h2 {
  font-size: 1.8rem;
  font-weight: 400;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .about-hero {
    height: 70vh; /* Smaller height on tablets */
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.2rem;
  }
}

@media (max-width: 576px) {
  .about-hero {
    height: 60vh; /* Even smaller height on mobile */
  }

  .hero-content {
    width: 90%;
  }

  h1 {
    font-size: 1.7rem;
    margin-bottom: 0.7rem;
  }

  h2 {
    font-size: 1rem;
  }
}

@media (max-width: 420px) {
  .about-hero {
    height: 50vh;
  }

  h1 {
    font-size: 1.5rem;
  }
}
</style>
