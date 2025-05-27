<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <router-link to="/home" class="logo-link">
      <div class="logo" @mouseenter="animateLogo" @mouseleave="resetLogo">
        <img
          ref="logoImage"
          src="@/assets/images/logo.jpg"
          alt="ЦНИИС Логотип"
          loading="eager"
          fetchpriority="high"
          decoding="sync"
          v-img-optimize="{ critical: true }"
        />
      </div>
    </router-link>
    <nav class="navigation">
      <ul>
        <li v-for="item in menuItems" :key="item.id">
          <router-link
            :to="item.link"
            custom
            v-slot="{ href, navigate, isActive }"
          >
            <a :href="href" @click="navigate" :class="{ active: isActive }">
              {{ item.title }}
            </a>
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="header-right">
      <div class="phone">
        <a href="tel:+74959999999">+7 (495) 999-99-99</a>
      </div>
    </div>
  </header>
</template>

<script>
import { gsap } from "gsap";
export default {
  name: "TheHeader",
  data() {
    return {
      menuItems: [
        { id: 1, title: "Главная", link: "/home" },
        { id: 2, title: "О компании", link: "/about" },
        { id: 3, title: "Проекты", link: "/projects" },
        { id: 4, title: "Услуги", link: "/services" },
        { id: 5, title: "Контакты", link: "/contact" },
      ],
      isScrolled: false,
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
      this.isScrolled = window.scrollY > 50;
    },
    isActive(link) {
      // First, check if this is a regular route link (without #)
      if (!link.includes("#")) {
        return this.$route.path === link;
      }

      // If it's a hash link, we need to check both path and hash
      const [path, hash] = link.includes("#") ? link.split("#") : [link, ""];

      // If there's only a hash (e.g. "#services"), check if it matches current hash
      if (path === "" && hash) {
        return window.location.hash === `#${hash}`;
      }

      // Otherwise check both path and hash
      return (
        this.$route.path === path &&
        (hash ? window.location.hash === `#${hash}` : true)
      );
    },
    animateLogo() {
      // Использование GSAP для более сложной анимации согласно ТЗ
      gsap.to(this.$refs.logoImage, {
        rotation: 360,
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    resetLogo() {
      gsap.to(this.$refs.logoImage, {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.inOut",
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@300;400;500;600&display=swap");

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  font-family: "Open Sans", sans-serif;
}

.header.scrolled {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  padding: 0.7rem 4rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.logo {
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.logo:hover {
  background-color: rgba(87, 144, 220, 0.1);
}

.logo img {
  max-height: 50px;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.navigation {
  margin: 0 auto;
}

.navigation ul {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.navigation li {
  margin: 0 1.2rem;
}

.navigation a {
  text-decoration: none;
  color: #2a4d80;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
}

.navigation a:hover,
.navigation a.active {
  color: #5790dc;
}

.navigation a::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #5790dc, #2a4d80);
  transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease;
  border-radius: 2px;
  opacity: 0;
}

.navigation a:hover::after,
.navigation a.active::after {
  width: 100%;
  opacity: 1;
}

.header-right {
  display: flex;
  align-items: center;
}

.phone {
  margin-right: 1.5rem;
  position: relative;
  overflow: hidden;
}

.phone a {
  color: #2a4d80;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  display: inline-block;
  position: relative;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
}

.phone a:hover {
  color: #5790dc;
}

.phone a::before {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #5790dc;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.phone a:hover::before {
  transform: translateX(0);
}

/* Медиа-запросы для адаптивности */
@media (max-width: 1024px) {
  .header {
    padding: 1rem 2rem;
  }
  .navigation li {
    margin: 0 0.8rem;
  }
  .navigation a {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 0.8rem 1.5rem;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .logo {
    flex: 0 0 auto;
  }

  .logo img {
    max-height: 40px;
  }

  .navigation {
    display: none; /* На мобильных устройствах заменяется бургер-меню */
    /* Будущее дополнение: бургер-меню */
  }

  .header-right {
    flex: 0 0 auto;
  }

  .phone a {
    font-size: 14px;
  }

  .phone {
    margin-right: 0;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 0.6rem 1rem;
  }

  .logo img {
    max-height: 35px;
  }

  .phone a {
    font-size: 12px;
  }
}

.logo-link {
  text-decoration: none;
  display: block;
  color: inherit;
  cursor: pointer;
}
</style>
