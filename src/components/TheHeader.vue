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
    
    <!-- Десктопная навигация -->
    <nav class="navigation desktop-nav">
      <ul>
        <li v-for="item in menuItems" :key="item.id">
          <router-link
            :to="item.link"
            exact-active-class="active"
          >
            {{ item.title }}
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="header-right">
      <div class="phone">
        <a href="tel:+74959999999">+7 (495) 999-99-99</a>
      </div>
      
      <!-- Кнопка бургер-меню -->
      <button 
        class="burger-btn" 
        @click="toggleMobileMenu"
        :class="{ active: isMobileMenuOpen }"
        aria-label="Открыть меню"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Мобильное меню -->
    <div class="mobile-menu" :class="{ open: isMobileMenuOpen }">
      <nav class="mobile-navigation">
        <ul>
          <li v-for="item in menuItems" :key="item.id">
            <router-link
              :to="item.link"
              custom
              v-slot="{ href, navigate, isExactActive }"
            >
              <a 
                :href="href" 
                @click="handleMobileNavClick(navigate)" 
                :class="{ active: isExactActive }"
              >
                {{ item.title }}
              </a>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Overlay для закрытия меню -->
    <div 
      class="mobile-menu-overlay" 
      :class="{ visible: isMobileMenuOpen }"
      @click="closeMobileMenu"
    ></div>
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
      isMobileMenuOpen: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    handleResize() {
      if (window.innerWidth > 768 && this.isMobileMenuOpen) {
        this.closeMobileMenu();
      }
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
      document.body.style.overflow = '';
    },
    handleMobileNavClick(navigate) {
      navigate();
      this.closeMobileMenu();
    },
    animateLogo() {
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
  gap: 1rem;
}

.phone {
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

/* Burger Menu Styles */
.burger-btn {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.burger-btn span {
  width: 100%;
  height: 3px;
  background-color: #2a4d80;
  border-radius: 3px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.burger-btn.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.burger-btn.active span:nth-child(2) {
  opacity: 0;
}

.burger-btn.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 280px;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transition: right 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 999;
  padding-top: 80px;
}

.mobile-menu.open {
  right: 0;
}

.mobile-navigation ul {
  flex-direction: column;
  padding: 2rem 0;
}

.mobile-navigation li {
  margin: 0;
  border-bottom: 1px solid rgba(42, 77, 128, 0.1);
}

.mobile-navigation a {
  display: block;
  padding: 1.2rem 2rem;
  font-size: 18px;
  color: #2a4d80;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.mobile-navigation a:hover,
.mobile-navigation a.active {
  background-color: rgba(87, 144, 220, 0.1);
  color: #5790dc;
  font-weight: 600;
}

.mobile-navigation a::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background-color: #5790dc;
  transition: width 0.3s ease;
}

.mobile-navigation a.active::after,
.mobile-navigation a:hover::after {
  width: 4px;
}

/* Mobile Menu Overlay */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 998;
}

.mobile-menu-overlay.visible {
  opacity: 1;
  visibility: visible;
}

/* Медиа-запросы */
@media (max-width: 1024px) {
  .header {
    padding: 1rem 2rem;
  }
  .header.scrolled {
    padding: 0.7rem 2rem;
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
  }
  .header.scrolled {
    padding: 0.6rem 1.5rem;
  }

  .logo img {
    max-height: 40px;
  }

  .desktop-nav {
    display: none;
  }

  .burger-btn {
    display: flex;
  }

  .phone a {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 0.6rem 1rem;
  }
  .header.scrolled {
    padding: 0.5rem 1rem;
  }

  .logo img {
    max-height: 35px;
  }

  .phone a {
    font-size: 12px;
  }

  .mobile-menu {
    width: 100%;
    right: -100%;
  }

  .mobile-navigation a {
    font-size: 16px;
    padding: 1rem 1.5rem;
  }
}

@media (max-width: 360px) {
  .phone {
    display: none;
  }
  
  .header-right {
    gap: 0;
  }
}

.logo-link {
  text-decoration: none;
  display: block;
  color: inherit;
  cursor: pointer;
}
</style>