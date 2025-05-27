<template>
  <section class="contact-info-section" id="contact">
    <div class="container">
      <h2 class="section-title" ref="title">Свяжитесь с нами</h2>

      <div class="contact-grid">
        <div class="logo-container">
          <img
            src="@/assets/images/logo.jpg"
            alt="Логотип компании"
            class="company-logo"
            loading="lazy"
          />
        </div>
        <div class="contact-card">
          <div class="contact-items">
            <div
              class="contact-item"
              v-for="(contact, index) in contactData"
              :key="index"
              @mouseenter="animateIcon(index)"
              ref="contactItems"
            >
              <div class="icon-wrapper">
                <i :class="contact.icon"></i>
              </div>
              <div class="contact-details">
                <h3>{{ contact.title }}</h3>
                <template v-if="contact.type === 'phones'">
                  <p
                    v-for="(phone, idx) in contact.values"
                    :key="'phone-' + idx"
                  >
                    <a :href="`tel:${phone.number.replace(/\D/g, '')}`"
                      >{{ phone.label }}: {{ phone.number }}</a
                    >
                  </p>
                </template>
                <template v-else-if="contact.type === 'emails'">
                  <p
                    v-for="(email, idx) in contact.values"
                    :key="'email-' + idx"
                  >
                    <a :href="`mailto:${email.address}`"
                      >{{ email.label }}: {{ email.address }}</a
                    >
                  </p>
                </template>
                <p v-else>{{ contact.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "ContactInfo",
  data() {
    return {
      contactData: [
        {
          title: "Телефоны",
          icon: "fas fa-phone-alt",
          type: "phones",
          values: [
            { label: "Основной", number: "+7 (495) 123-45-67" },
            { label: "Отдел продаж", number: "+7 (495) 765-43-21" },
          ],
        },
        {
          title: "Электронная почта",
          icon: "fas fa-envelope",
          type: "emails",
          values: [
            { label: "Общие вопросы", address: "info@company.ru" },
            { label: "Для предложений", address: "partners@company.ru" },
          ],
        },
        {
          title: "Адрес офиса",
          icon: "fas fa-map-marker-alt",
          type: "address",
          value: "г. Москва, ул. Примерная, д. 123, офис 456",
        },
        {
          title: "Время работы",
          icon: "fas fa-clock",
          type: "hours",
          value: "Пн-Пт: 9:00 - 18:00, Сб-Вс: выходные",
        },
      ],
    };
  },
  mounted() {
    this.initAnimations();
  },
  methods: {
    initAnimations() {
      // Animate title on mount
      gsap.from(this.$refs.title, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Stagger animation for contact items
      gsap.from(this.$refs.contactItems, {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.3,
      });
    },
    animateIcon(index) {
      const iconElement =
        this.$refs.contactItems[index].querySelector(".icon-wrapper i");
      gsap.to(iconElement, {
        scale: 1.2,
        duration: 0.3,
        ease: "back.out",
        yoyo: true,
        repeat: 1,
      });
    },
  },
};
</script>

<style scoped>
.contact-info-section {
  padding: 40px 0;
  background-color: #e8f1fb;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #2a4d80;
  text-align: center;
  margin-bottom: 30px;
}

.contact-grid {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
}

.logo-container {
  flex: 0 0 300px;
}

.company-logo {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.contact-card {
  flex: 0 0 500px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.contact-item:last-child {
  margin-bottom: 0;
}

.icon-wrapper {
  width: 40px;
  height: 40px;
  background-color: #5790dc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0;
}

.icon-wrapper i {
  color: #ffffff;
  font-size: 18px;
}

.contact-details h3 {
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 16px;
  margin: 0 0 8px;
  color: #2a4d80;
}

.contact-details p {
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #333333;
  margin: 0 0 5px;
}

.contact-details a {
  color: #5790dc;
  text-decoration: none;
  transition: color 0.2s ease;
}

.contact-details a:hover {
  color: #2a4d80;
}

@media (max-width: 992px) {
  .contact-grid {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .logo-container {
    flex: 0 0 250px;
    max-width: 250px;
  }

  .contact-card {
    width: 100%;
    max-width: 500px;
    flex: 0 0 auto;
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 28px;
    margin-bottom: 20px;
  }

  .contact-grid {
    gap: 15px;
  }

  .logo-container {
    max-width: 200px;
  }

  .contact-item {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    padding: 10px;
  }

  .icon-wrapper {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .contact-details h3 {
    font-size: 15px;
  }

  .contact-details p {
    font-size: 13px;
  }
}

@media (max-width: 420px) {
  .contact-info-section {
    padding: 30px 0;
  }

  .section-title {
    font-size: 24px;
  }

  .logo-container {
    max-width: 150px;
  }

  .contact-card {
    padding: 15px;
  }
}
</style>
