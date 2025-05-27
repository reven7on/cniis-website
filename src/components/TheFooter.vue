<template>
  <footer class="site-footer" ref="footer" :class="{ visible: isVisible }">
    <div class="container">
      <div class="footer-content">
        <div class="footer-company">
          <div class="footer-logo">
            <img
              src="@/assets/images/logo.jpg"
              alt="ЦНИИС Логотип"
              loading="lazy"
            />
          </div>
          <div class="company-info">
            <p>
              ЦНИИС — ведущий проектный институт в области транспортной
              инфраструктуры с более чем 20-летним опытом. Мы создаем
              современные инженерные решения, объединяя традиции и инновационные
              технологии.
            </p>
          </div>
        </div>

        <div class="footer-contacts">
          <h3>Контакты</h3>
          <p><i class="icon icon-phone"></i> +7 (495) 999-99-99</p>
          <p><i class="icon icon-email"></i> info@cniis.ru</p>
          <p>
            <i class="icon icon-location"></i> г. Москва, ул. Примерная, д. 10
          </p>
        </div>

        <div class="footer-sitemap">
          <h3>Карта сайта</h3>
          <ul>
            <li><a href="/home">Главная</a></li>
            <li><a href="/about">О компании</a></li>
            <li><a href="/projects">Проекты</a></li>
            <li><a href="/services">Услуги</a></li>
            <li><a href="/contact">Контакты</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-social">
        <h3>Мы в соцсетях</h3>
        <div class="social-icons">
          <a href="#" class="social-icon linkedin">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="#" class="social-icon telegram">
            <i class="fab fa-telegram"></i>
          </a>
          <a href="#" class="social-icon vk">
            <i class="fab fa-vk"></i>
          </a>
          <a href="#" class="social-icon youtube">
            <i class="fab fa-youtube"></i>
          </a>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} ЦНИИС. Все права защищены.</p>
        <div class="legal-links">
          <a href="/privacy">Политика конфиденциальности</a>
          <a href="/terms">Условия использования</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
  data() {
    return {
      isVisible: false,
    };
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
  mounted() {
    // Используем GSAP для анимации появления футера при скролле
    import("gsap").then(({ gsap }) => {
      this.gsap = gsap;
      window.addEventListener("scroll", this.checkVisibility);
      this.checkVisibility();
    });
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.checkVisibility);
  },
  methods: {
    checkVisibility() {
      if (this.$refs.footer) {
        const rect = this.$refs.footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight * 0.8) {
          if (this.gsap) {
            this.gsap.to(this.$refs.footer, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            });
          } else {
            this.isVisible = true;
          }
        }
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@300;400;600&display=swap");

.site-footer {
  background-color: #2a4d80;
  color: #ffffff;
  padding: 4rem 2rem 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  font-family: "Open Sans", sans-serif;
}

.site-footer.visible {
  opacity: 1;
  transform: translateY(0);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.footer-company {
  display: flex;
  flex-direction: column;
}

.footer-logo {
  margin-bottom: 1.5rem;
}

.footer-logo img {
  max-width: 120px;
  transition: transform 0.3s ease;
}

.footer-logo img:hover {
  transform: scale(1.05);
}

.company-info p {
  font-size: 14px;
  line-height: 22px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
}

.footer-contacts h3,
.footer-sitemap h3,
.footer-social h3 {
  color: #5790dc;
  margin-bottom: 1.5rem;
  font-size: 20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  position: relative;
  display: inline-block;
}

.footer-contacts h3::after,
.footer-sitemap h3::after,
.footer-social h3::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, #5790dc, #e8f1fb);
}

.footer-contacts p {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  transition: transform 0.3s ease;
  font-size: 14px;
}

.footer-contacts p:hover {
  transform: translateX(5px);
}

.icon {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  display: inline-block;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.footer-sitemap ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.footer-sitemap li {
  margin-bottom: 0.8rem;
}

.footer-sitemap a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;
  display: inline-block;
  position: relative;
  font-size: 14px;
}

.footer-sitemap a::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: #5790dc;
  transition: width 0.3s ease;
}

.footer-sitemap a:hover {
  color: #5790dc;
  transform: translateX(5px);
}

.footer-sitemap a:hover::after {
  width: 100%;
}

.footer-social {
  text-align: center;
  margin-bottom: 3rem;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.social-icon::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #5790dc, #2a4d80);
  transform: scale(0);
  transition: transform 0.3s ease;
  border-radius: 50%;
  z-index: -1;
}

.social-icon:hover {
  transform: translateY(-5px);
}

.social-icon:hover::before {
  transform: scale(1);
}

.social-icon i {
  transition: transform 0.3s ease;
  font-size: 18px;
}

.social-icon:hover i {
  transform: scale(1.2);
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-bottom p {
  margin-bottom: 1rem;
  font-size: 14px;
}

.legal-links {
  display: flex;
  gap: 1.5rem;
}

.legal-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease, transform 0.3s ease;
  position: relative;
  font-family: "Open Sans", sans-serif;
}

.legal-links a::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: #5790dc;
  transition: width 0.3s ease;
}

.legal-links a:hover {
  color: #5790dc;
  transform: translateY(-2px);
}

.legal-links a:hover::after {
  width: 100%;
}

@media (max-width: 992px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  h3 {
    font-size: 20px;
    line-height: 26px;
  }

  .social-icons {
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-social {
    text-align: left;
    margin-bottom: 2rem;
  }

  .social-icons {
    justify-content: flex-start;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .legal-links {
    flex-direction: column;
    gap: 0.8rem;
  }

  .footer-company {
    order: 1;
  }

  .footer-contacts {
    order: 2;
  }

  .footer-sitemap {
    order: 3;
  }
}

@media (max-width: 480px) {
  .site-footer {
    padding: 3rem 1rem 1.5rem;
  }

  h3 {
    font-size: 18px;
    line-height: 24px;
  }

  .footer-logo img {
    max-width: 100px;
  }

  .company-info p {
    font-size: 13px;
    line-height: 20px;
  }

  .footer-contacts p,
  .footer-sitemap a {
    font-size: 13px;
  }

  .social-icon {
    width: 35px;
    height: 35px;
  }

  .social-icon i {
    font-size: 16px;
  }

  .footer-bottom p,
  .legal-links a {
    font-size: 12px;
  }
}
</style>
