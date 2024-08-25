<template>
  <div class="container m-auto flex items-center full-height" data-swiper-parallax-y="-10%" data-swiper-parallax-opacity="0" data-swiper-parallax-duration="400">
    <div class="content m-auto">
      <h2 v-html="$t('contactTitle')"></h2>
      <p v-html="$t('contactDescription')"></p>

      <Decorative :content="'form'" :className="'tag-item__text'" :tag="'wrap'">
        <form
          class="flex flex-wrap justify-between items-center"
          @submit.prevent="submitForm">
          <div
            class="field field-half"
            :class="{ 'focused': isNameFocused || form.name, 'error': errors.name }">
            <label for="name" v-html="$t('formName')"></label>
            <input
              class="rounded"
              type="text"
              v-model="form.name"
              id="name"
              @focus="isNameFocused = true"
              @input="validateField('name')"
              @blur="[
                isNameFocused = false,
                validateField('name')
                ]"
              :placeholder="$t('formName')" />
              <span v-if="errors.name" class="error-message flex items-center">
                <IconError/>{{ errors.name }}

              </span>
          </div>

          <div
            class="field field-half"
            :class="{ 'focused': isEmailFocused || form.email, 'error': errors.email }">
            <label for="email" v-html="$t('formEmail')"></label>
            <input
              class="rounded"
              type="email"
              v-model="form.email"
              id="email"
              @focus="isEmailFocused = true"
              @input="validateField('email')"
              @blur="[
                isEmailFocused = false,
                validateField('email')
                ]"
              :placeholder="$t('formEmail')" />
              <span v-if="errors.email" class="error-message flex items-center">
                <IconError/>{{ errors.email }}

              </span>
          </div>

          <div
            class="field field-full"
            :class="{ 'focused': isSubjectFocused || form.subject, 'error': errors.subject }">
            <label for="subject" v-html="$t('formSubject')"></label>
            <input
              class="rounded"
              type="text"
              v-model="form.subject"
              id="subject"
              @focus="isSubjectFocused = true"
              @input="validateField('subject')"
              @blur="[
                isSubjectFocused = false,
                validateField('subject')
                ]"
              :placeholder="$t('formSubject')" />
              <span v-if="errors.subject" class="error-message flex items-center">
                <IconError/>{{ errors.subject }}

              </span>
          </div>

          <div
            class="field field-full"
            :class="{ 'focused': isMessageFocused || form.message, 'error': errors.message }">
            <label for="message" v-html="$t('formMessage')"></label>
            <textarea
              class="rounded"
              v-model="form.message"
              id="message"
              @focus="isMessageFocused = true"
              @input="validateField('message')"
              @blur="[
                isMessageFocused = false,
                validateField('message')
                ]"
              :placeholder="$t('formMessage')"
              @mouseover="checkForScrollbar"
              @mouseout="handleMouseOut" />
              <span v-if="errors.message" class="error-message flex items-center">
                <IconError/>{{ errors.message }}

              </span>
          </div>

          <button
            class="flex items-center rounded"
            type="submit"
            @click="checkForm"
            :disabled="loading">
            <span v-html="$t('formSubmit')"></span>
            <svg class="flex" width="40" height="21" viewBox="0 0 40 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 10.5H39M39 10.5L29.5 1M39 10.5L29.5 20" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </form>

        <p v-if="success" class="success-message">Message sent successfully!</p>
        <p v-if="error" class="error-message">There was an error sending your message.</p>
      </Decorative>
    </div>
  </div>
</template>

<script>
import Decorative from '~/components/DecorativeWrapper.vue'
import IconError from '~/components/Svg/Error.vue'
import { messages } from '~/data/errors-message';
import { useFetch } from '#app'

export default {
  components: {
    Decorative,
    IconError
  },
  data() {
    return {
      messages,
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      errors: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      isNameFocused: false,
      isEmailFocused: false,
      isSubjectFocused: false,
      isMessageFocused: false,
      loading: false,
      success: false,
      error: false,
      correct: false
    }
  },
  methods: {
    async submitForm() {
      if (this.correct) {

        this.loading = true
        this.success = false
        this.error = false

        try {
          const { data, error: fetchError } = await useFetch('/api/send-email', {
            method: 'POST',
            body: this.form,
            headers: {
              'Content-Type': 'application/json',
            }
          })

          if (fetchError.value) {
            this.error = true
          } else {
            this.success = true
            this.resetForm()
          }
        } catch (err) {
          this.error = true
        } finally {
          this.loading = false
        }
      }
    },
    resetForm() {
      this.form = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    },
    handleMouseOut() {
      this.$store.commit('setAllowMouseScroll', true);
    },
    checkForScrollbar(event) {
      if (event.target.scrollHeight > event.target.clientHeight) {
        this.$store.commit('setAllowMouseScroll', false);
      }
    },
    validateField(field) {
      if (!this.form[field]) {
        this.errors[field] = this.messages[field][this.$i18n.locale];
      }else {
        this.errors[field] = '';
      }
      if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form[field])) {
        this.errors.email = this.messages.emailFormat[this.$i18n.locale]
      }
    },
    checkForm() {
      this.correct = true
      for (const [key, value] of Object.entries(this.form)) {
        if (value.trim() === '') {
          this.errors[key] = this.messages[key][this.$i18n.locale];
          this.correct = false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  h2 {
    font-size: vw_big_screen(32px);
    margin: vw_big_screen(14px);
    font-weight: 900;
    width: 100%;
    text-align: center;
  }
  .content {
    width: vw_big_screen(856px);
  }

  p {
    font-size: vw_big_screen(16px);
    font-weight: 500;
    text-align: center;
    max-width: vw_big_screen(580px);
    margin: vw_big_screen(16px) auto;
  }

  form {
    position: relative;
    padding: 0;
    & .field {
      position: relative;
      margin: vw_big_screen(12px) 0;
      & label {
        position: absolute;
        left: vw_big_screen(15px);
        top: 0;
        transition: 0.2s ease-in;
        font-weight: 500;
        font-size: vw_big_screen(12px);
        border-radius: vw_big_screen(4px);
        display: inline-block;
        padding: 0 vw_big_screen(6px);
        line-height: vw_big_screen(16px);
        transform: translateY(-50%) rotateX(90deg);
        background-color: var(--secondary-color);
        color: var(--tags-bg);
      }
      &.focused {
        & label {
          transform: translateY(-50%) rotateX(0deg);
        }
        & input, & textarea {
          border-color: var(--secondary-color);
          &::placeholder {
            opacity: 0;
          }
        }
      }
      &.error {
        & label {
          transform: translateY(-50%) rotateX(0deg);
          background-color: var(--danger-color);
          color: #ffffff;
        }
        & input, & textarea {
          border-color: var(--danger-color);
          &::placeholder {
            opacity: 0;
          }
        }
        & .error-message {
          animation: showError 0.2s ease-in forwards;
        }
      }
    }
    & .error-message {
      position: absolute;
      right: vw_big_screen(15px);
      bottom: 0;
      transform: translateY(50%) rotateX(90deg);
      transition: 0.2s ease-in;
      font-size: vw_big_screen(12px);
      line-height: vw_big_screen(16px);
      border-radius: vw_big_screen(4px);
      background-color: var(--danger-color);
      color: #ffffff;
      padding: 0 vw_big_screen(6px);
    }
    & .field-half {
      width: 49%;
    }
    & .field-full {
      width: 100%;
    }
    & textarea {
      resize: none;
      height: vw_big_screen(120px);
      overflow: auto;
    }
    & input, & textarea {
      width: 100%;
      padding: vw_big_screen(20px);
      border: 1px solid var(--border-color);
      background-color: var(--review-color);
      font-size: vw_big_screen(16px);
      line-height: vw_big_screen(20px);
      font-weight: 500;
      outline: none;
      transition: .2s ease-in;
      color: var(--secondary-color);
      display: flex;
      &::placeholder {
        font-size: vw_big_screen(16px);
        line-height: vw_big_screen(20px);
        color: var(--border-color);
        transition: 0.2s;
      }
      &:hover {
        @include viewport(hover) {
          border-color: var(--sidebar-color);
          &::placeholder {
            color: var(--sidebar-color);
          }
        }
      }
    }
    & button {
      position: absolute;
      right: 0;
      bottom: vw_big_screen(-50px);
      z-index: 10;
      background-color: var(--secondary-color);
      color: var(--primary-color);
      padding: vw_big_screen(12.5px) vw_big_screen(16px);
      transition: 0.2s ease-in;
      & svg {
        width: vw_big_screen(22px);
        margin-left: vw_big_screen(10px);
      }
      &:hover {
        @include viewport(hover) {
          opacity: 0.75;
        }
      }
    }
  }

  @keyframes showError {
    0% {
      transform: translateY(50%) rotateX(90deg);
    }
    100% {
      transform: translateY(50%) rotateX(0deg);
    }
  }

.success-message {
  color: green;
  margin-top: 10px;
}

</style>
