<template>
  <section id="contact" class="contact-form">
    <div class="container">
      <h2 class="animated-title">Обсудим ваш проект?</h2>
      <form @submit.prevent="submitForm" ref="form" v-if="!isSubmitSuccess">
        <!-- Name field unchanged -->
        <div
          class="form-group"
          :class="{ error: errors.name, valid: isValid.name }"
        >
          <label for="name">Имя</label>
          <div class="input-wrapper">
            <input
              type="text"
              id="name"
              v-model="formData.name"
              required
              placeholder="Ваше имя"
              @blur="validateField('name')"
              @focus="focusField('name')"
              @input="allowOnlyLetters"
            />
            <span class="input-highlight"></span>
            <span class="input-icon">
              <i class="fas fa-user"></i>
            </span>
          </div>
          <transition name="slide-fade">
            <span class="error-message" v-if="errors.name">{{
              errors.name
            }}</span>
          </transition>
        </div>

        <!-- Email field unchanged -->
        <div
          class="form-group"
          :class="{ error: errors.email, valid: isValid.email }"
        >
          <label for="email">Email</label>
          <div class="input-wrapper">
            <input
              type="email"
              id="email"
              v-model="formData.email"
              required
              placeholder="Ваш email"
              @blur="validateField('email')"
              @focus="focusField('email')"
            />
            <span class="input-highlight"></span>
            <span class="input-icon">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
          <transition name="slide-fade">
            <span class="error-message" v-if="errors.email">{{
              errors.email
            }}</span>
          </transition>
        </div>

        <!-- Updated Phone field -->
        <div
          class="form-group"
          :class="{ error: errors.phone, valid: isValid.phone }"
        >
          <label for="phone">Телефон</label>
          <div class="input-wrapper">
            <input
              type="text"
              id="phone"
              v-model="formattedPhone"
              required
              placeholder="+375 (##) ###-##-##"
              @blur="validateField('phone')"
              @focus="focusField('phone')"
              @input="formatPhoneNumber"
              @keydown="handlePhoneKeydown"
            />
            <span class="input-highlight"></span>
            <span class="input-icon">
              <i class="fas fa-phone"></i>
            </span>
          </div>
          <transition name="slide-fade">
            <span class="error-message" v-if="errors.phone">{{
              errors.phone
            }}</span>
          </transition>
        </div>

        <!-- Message field unchanged -->
        <div
          class="form-group"
          :class="{ error: errors.message, valid: isValid.message }"
        >
          <label for="message">Сообщение</label>
          <div class="input-wrapper textarea-wrapper">
            <textarea
              id="message"
              v-model="formData.message"
              required
              placeholder="Ваше сообщение"
              @blur="validateField('message')"
              @focus="focusField('message')"
              rows="5"
            ></textarea>
            <span class="input-highlight"></span>
            <span class="input-icon">
              <i class="fas fa-comment"></i>
            </span>
          </div>
          <transition name="slide-fade">
            <span class="error-message" v-if="errors.message">{{
              errors.message
            }}</span>
          </transition>
        </div>

        <!-- Agreement field unchanged -->
        <div
          class="form-group checkbox-group"
          :class="{ error: errors.agreement }"
        >
          <div class="checkbox-wrapper">
            <input
              type="checkbox"
              id="agreement"
              v-model="formData.agreement"
              required
              @change="validateField('agreement')"
            />
            <label for="agreement" class="checkbox-label">
              <span class="checkbox-custom"><i class="fas fa-check"></i></span>
              Согласен на обработку персональных данных
            </label>
          </div>
          <transition name="slide-fade">
            <span class="error-message" v-if="errors.agreement">{{
              errors.agreement
            }}</span>
          </transition>
        </div>

        <button
          type="submit"
          class="submit-btn"
          :class="{ loading: isSubmitting }"
          :disabled="isSubmitting || !isFormValid"
        >
          <span v-if="!isSubmitting">Отправить</span>
          <span v-else class="loader"></span>
        </button>
      </form>

      <transition name="fade-scale">
        <div
          class="success-message"
          v-if="isSubmitSuccess"
          ref="successMessage"
        >
          <div class="success-icon">
            <svg
              class="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                class="checkmark-circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                class="checkmark-check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
          <h3>Спасибо!</h3>
          <p>
            Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее
            время.
          </p>
          <button class="return-btn" @click="resetForm">
            <i class="fas fa-redo"></i> Вернуться к форме
          </button>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "ContactForm",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        phone: "", // Store only the digits
        message: "",
        agreement: false,
      },
      formattedPhone: "+375 (##) ###-##-##", // This is the display value with mask
      errors: {
        name: "",
        email: "",
        phone: "",
        message: "",
        agreement: "",
      },
      isValid: {
        name: false,
        email: false,
        phone: false,
        message: false,
        agreement: false,
      },
      isSubmitting: false,
      isSubmitSuccess: false,
      formTimeline: null,
    };
  },
  computed: {
    isFormValid() {
      return (
        this.isValid.name &&
        this.isValid.email &&
        this.isValid.phone &&
        this.isValid.message &&
        this.isValid.agreement
      );
    },
  },
  mounted() {
    this.initializeAnimations();
  },
  methods: {
    initializeAnimations() {
      //Анимация заголовка
      gsap.from(".animated-title", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },

    allowOnlyLetters() {
      // Разрешаем только буквы (кириллица, латиница) и пробелы
      const lettersOnly = /[^a-zA-Zа-яА-ЯёЁ\s]/g;
      this.formData.name = this.formData.name.replace(lettersOnly, "");
    },

    focusField(field) {
      const input = document.getElementById(field);
      const wrapper = input.closest(".input-wrapper");

      gsap.to(wrapper, {
        boxShadow: "0 0 0 2px rgba(87, 144, 220, 0.4)",
        duration: 0.3,
      });

      gsap.to(wrapper.querySelector(".input-highlight"), {
        width: "100%",
        duration: 0.3,
      });
    },

    validateField(field) {
      const input = document.getElementById(field);
      const wrapper = input.closest(".input-wrapper");

      if (wrapper) {
        gsap.to(wrapper, {
          boxShadow: "0 0 0 0 rgba(87, 144, 220, 0)",
          duration: 0.3,
        });

        gsap.to(wrapper.querySelector(".input-highlight"), {
          width: "0%",
          duration: 0.3,
        });
      }

      this.errors[field] = "";
      this.isValid[field] = false;

      switch (field) {
        case "name":
          if (!this.formData.name) {
            this.errors.name = "Пожалуйста, введите ваше имя";
            this.shakeField("name");
          } else if (this.formData.name.length < 2) {
            this.errors.name = "Имя должно содержать минимум 2 символа";
            this.shakeField("name");
          } else {
            this.isValid.name = true;
            this.showValidationSuccess("name");
          }
          break;

        case "email": {
          // Более строгая проверка email
          const emailRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!this.formData.email) {
            this.errors.email = "Пожалуйста, введите ваш email";
            this.shakeField("email");
          } else if (!emailRegex.test(this.formData.email)) {
            this.errors.email = "Пожалуйста, введите корректный email";
            this.shakeField("email");
          } else {
            this.isValid.email = true;
            this.showValidationSuccess("email");
          }
          break;
        }

        case "phone": {
          // Get only digits from the formatted phone
          const digitsOnly = this.formattedPhone.replace(/\D/g, "");

          if (digitsOnly.length <= 3) {
            // Only +375 is entered
            this.errors.phone = "Пожалуйста, введите ваш телефон";
            this.shakeField("phone");
          } else if (digitsOnly.length < 12) {
            // Not all digits entered
            this.errors.phone = "Введите полный номер телефона";
            this.shakeField("phone");
          } else {
            this.isValid.phone = true;
            this.showValidationSuccess("phone");
          }
          break;
        }

        case "message":
          if (!this.formData.message) {
            this.errors.message = "Пожалуйста, введите ваше сообщение";
            this.shakeField("message");
          } else if (this.formData.message.length < 10) {
            this.errors.message =
              "Сообщение должно содержать минимум 10 символов";
            this.shakeField("message");
          } else {
            this.isValid.message = true;
            this.showValidationSuccess("message");
          }
          break;

        case "agreement":
          if (!this.formData.agreement) {
            this.errors.agreement =
              "Необходимо согласие на обработку персональных данных";
            this.shakeField("agreement");
          } else {
            this.isValid.agreement = true;
          }
          break;
      }
    },

    shakeField(field) {
      const element = document.getElementById(field);
      const wrapper =
        element.closest(".input-wrapper") ||
        element.closest(".checkbox-wrapper") ||
        element;

      gsap.fromTo(
        wrapper,
        { x: -5 },
        { x: 5, duration: 0.1, repeat: 5, yoyo: true }
      );
    },

    showValidationSuccess(field) {
      const input = document.getElementById(field);
      const wrapper = input.closest(".input-wrapper");

      if (wrapper) {
        gsap.fromTo(
          wrapper,
          { borderColor: "#23d160" },
          {
            borderColor: "#23d160",
            boxShadow: "0 0 0 2px rgba(35, 209, 96, 0.2)",
            duration: 0.5,
          }
        );
      }
    },

    validateForm() {
      this.validateField("name");
      this.validateField("email");
      this.validateField("phone");
      this.validateField("message");
      this.validateField("agreement");
      return this.isFormValid;
    },

    async submitForm() {
      if (!this.validateForm()) return;

      this.isSubmitting = true;

      try {
        // Имитация отправки на сервер
        await new Promise((resolve) => setTimeout(resolve, 1500));

        console.log("Форма отправлена:", {
          name: this.formData.name,
          email: this.formData.email,
          phone: this.formData.phone,
          message: this.formData.message,
          agreement: this.formData.agreement,
        });

        // Анимация успешной отправки
        gsap.to(this.$refs.form, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            this.isSubmitSuccess = true;
            this.$nextTick(() => {
              this.animateSuccessCheckmark();
            });
          },
        });
      } catch (error) {
        console.error("Ошибка отправки формы:", error);
        alert(
          "Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз."
        );
      } finally {
        this.isSubmitting = false;
      }
    },

    resetForm() {
      this.formData = {
        name: "",
        email: "",
        phone: "", // Just the digits
        message: "",
        agreement: false,
      };
      this.formattedPhone = "+375 (##) ###-##-##"; // Reset the formatted display
      this.isValid = {
        name: false,
        email: false,
        phone: false,
        message: false,
        agreement: false,
      };

      this.isSubmitSuccess = false;

      // Сбрасываем форму с анимацией
      this.$nextTick(() => {
        gsap.fromTo(
          this.$refs.form,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 }
        );
        this.initializeAnimations();
      });
    },

    animateSuccessCheckmark() {
      if (this.$refs.successMessage) {
        const checkmarkCircle =
          this.$refs.successMessage.querySelector(".checkmark-circle");
        const checkmarkCheck =
          this.$refs.successMessage.querySelector(".checkmark-check");

        gsap.fromTo(
          checkmarkCircle,
          { strokeDasharray: 166, strokeDashoffset: 166 },
          { strokeDashoffset: 0, duration: 1, ease: "sine.inOut" }
        );

        gsap.fromTo(
          checkmarkCheck,
          { strokeDasharray: 48, strokeDashoffset: 48 },
          { strokeDashoffset: 0, duration: 0.5, delay: 0.7 }
        );
      }
    },

    // Format the phone input with proper mask
    formatPhoneNumber(event) {
      // Get the current cursor position
      const input = event.target;
      const cursorPos = input.selectionStart;

      // Get only digits from the input
      const digits = this.formattedPhone.replace(/\D/g, "");

      // Create the mask pattern
      let formatted = "+375 (##) ###-##-##";

      // Replace each # with corresponding digit if available
      let digitIndex = 3; // Start after +375

      // Skip the country code which is already in the mask
      const userDigits = digits.slice(3);

      for (let i = 0; i < formatted.length; i++) {
        if (formatted[i] === "#" && userDigits[digitIndex - 3] !== undefined) {
          formatted =
            formatted.substring(0, i) +
            userDigits[digitIndex - 3] +
            formatted.substring(i + 1);
          digitIndex++;
        }
      }

      // Update the formatted phone and raw digits
      this.formattedPhone = formatted;
      this.formData.phone = digits;

      // Calculate new cursor position
      this.$nextTick(() => {
        // Find next position for cursor (next # or after last entered digit)
        let newCursorPos = cursorPos;

        // Adjust cursor position to skip non-digit characters
        const formattedUpToCursor = formatted.substring(0, cursorPos);
        const digitsUpToCursor = formattedUpToCursor.replace(/\D/g, "").length;

        // Find the position of the next editable character (# symbol)
        for (let i = 0; i < formatted.length; i++) {
          const digitCount = formatted
            .substring(0, i)
            .replace(/\D/g, "").length;
          if (digitCount === digitsUpToCursor && formatted[i] === "#") {
            newCursorPos = i;
            break;
          }
        }

        // Set the cursor position
        input.setSelectionRange(newCursorPos, newCursorPos);
      });
    },

    // Handle keydown events for the phone input
    handlePhoneKeydown(event) {
      // Allow: backspace, delete, tab, escape, enter, ctrl+A, etc.
      const controlKeys = [8, 9, 13, 27, 46];
      const ctrlCombination = event.ctrlKey === true || event.metaKey === true;

      // Allow control keys
      if (controlKeys.indexOf(event.keyCode) !== -1 || ctrlCombination) {
        return;
      }

      // Block non-digit keys (except control keys above)
      if (event.key.length === 1 && !/\d/.test(event.key)) {
        event.preventDefault();
        return;
      }

      // If we're at max length (12 digits for Belarus number) and trying to add more
      const digits = this.formattedPhone.replace(/\D/g, "");
      if (
        digits.length >= 12 &&
        !/^Arrow|Home|End|Delete|Backspace/.test(event.key)
      ) {
        event.preventDefault();
      }
    },
  },
};
</script>

<style scoped>
.contact-form {
  padding: 4rem 2rem;
  background-color: white;
  overflow: hidden;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #2a4d80;
  position: relative;
}

h2::after {
  content: "";
  position: absolute;
  width: 60px;
  height: 3px;
  background: linear-gradient(135deg, #5790dc 0%, #2a4d80 100%);
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative;
  transition: all 0.3s ease;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
  transition: all 0.3s ease;
}

.input-wrapper {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.input-wrapper:focus-within {
  border-color: #5790dc;
}

.input-highlight {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background: linear-gradient(135deg, #5790dc 0%, #2a4d80 100%);
  transition: all 0.3s ease;
}

.input-icon {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  color: #aaa;
  transition: all 0.3s ease;
}

.valid .input-icon {
  color: #23d160;
}

.error .input-icon {
  color: #ff3860;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 0.75rem;
  border: none;
  background: transparent;
  transition: all 0.3s ease;
}

textarea {
  height: auto;
  resize: vertical;
}

input:focus,
textarea:focus {
  outline: none;
}

.error .input-wrapper {
  border-color: #ff3860;
}

.valid .input-wrapper {
  border-color: #23d160;
}

.error-message {
  color: #ff3860;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  display: block;
}

.checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  position: relative;
}

.checkbox-wrapper input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox-custom {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 3px;
  position: relative;
  margin-right: 10px;
  transition: all 0.3s ease;
}

.checkbox-custom i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  color: white;
  font-size: 12px;
  transition: all 0.2s ease;
}

input[type="checkbox"]:checked ~ .checkbox-label .checkbox-custom {
  background: #5790dc;
  border-color: #5790dc;
}

input[type="checkbox"]:checked ~ .checkbox-label .checkbox-custom i {
  transform: translate(-50%, -50%) scale(1);
}

.checkbox-label {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  line-height: 1.4;
  cursor: pointer;
  user-select: none;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #5790dc 0%, #2a4d80 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(42, 77, 128, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.submit-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.submit-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0) 60%
  );
  transform: skewX(-25deg);
  transition: all 0.5s ease;
}

.submit-btn:hover::before:not(:disabled) {
  left: 100%;
}

.loader {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

.success-message {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
}

.success-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto 1rem;
  position: relative;
}

/* SVG чекмарк */
.checkmark {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #5790dc;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px #5790dc;
}

.checkmark-circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #5790dc;
  fill: none;
}

.checkmark-check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  stroke-width: 3;
  stroke: #5790dc;
}

.success-message h3 {
  color: #2a4d80;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.success-message p {
  color: #666;
  margin-bottom: 1.5rem;
}

.return-btn {
  background: #f7f7f7;
  color: #2a4d80;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.return-btn:hover {
  background: #eee;
}

/* Анимации */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.5s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

input {
  font-family: monospace; /* Для равномерного отображения символов */
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
