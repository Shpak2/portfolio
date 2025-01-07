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
      </Decorative>
    </div>
  </div>
</template>

<script>
import Decorative from '~/components/DecorativeWrapper.vue'
import IconError from '~/components/Svg/Error.vue'
import { messages } from '~/data/errors-message';
import { useFetch } from '#app'
import { useStore } from 'vuex';

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
      correct: false
    }
  },
  beforeMount() {
    const store = useStore();
    this.$store = store;
  },
  methods: {
    async submitForm() {
      if (this.correct) {

        this.$store.commit('setlogoLoader', true);
        this.$store.commit('setFormPopup', true);

        this.loading = true;

        try {
          const response = await fetch('/api/send-email', {
            method: 'POST',
            body: JSON.stringify(this.form),
            headers: {
              'Content-Type': 'application/json',
            }
          });

          const data = await response.json();

          this.$store.commit('setMessagePopup', data.body?.message);

          if (response.status !== 200 || !data.body?.success) {
            this.$store.commit('setError', true);
            this.$store.commit('setMessagePopup', data.body?.message || 'Unknown error');
          } else {
            this.$store.commit('setError', false);
            this.resetForm();
          }
          this.$store.commit('setlogoLoader', false);
        } catch (err) {
          this.$store.commit('setMessagePopup', err || 'Unknown error');
          this.$store.commit('setError', true);
        } finally {
          this.loading = false;
          this.$store.commit('setlogoLoader', false);
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
    @include viewport(tabs) {
      font-size: vw_tabs(32px);
      line-height: vw_tabs(52px);
      margin: vw_tabs(14px) 0;
    }
    @include viewport(swap_tabs) {
      font-size: vw_tabs(24px);
      line-height: vw_tabs(40px);
      margin: vw_tabs(8px) 0;
    }
    @include viewport(sm_mobile) {
      font-size: vmin_mobile(28px);
      line-height: vmin_mobile(32px);
      margin: 0 0 vmin_mobile(14px);
    }
  }
  .content {
    width: vw_big_screen(856px);
    @include viewport(tabs) {
      width: 100%;
      margin-bottom: vw_tabs(140px);
    }
    @include viewport(swap_tabs) {
      width: vw_tabs(542px);
      margin-bottom: 0;
    }
    @include viewport(sm_mobile) {
      margin-bottom: 0;
    }
  }

  p {
    font-size: vw_big_screen(16px);
    font-weight: 500;
    text-align: center;
    max-width: vw_big_screen(580px);
    margin: vw_big_screen(16px) auto;
    @include viewport(tabs) {
      font-size: vw_tabs(16px);
      max-width: vw_tabs(636px);
      margin: vw_tabs(16px) auto;
    }
    @include viewport(swap_tabs) {
      font-size: vw_tabs(10px);
      max-width: vw_tabs(367px);
      margin: vw_tabs(10px) auto;
    }
    @include viewport(sm_mobile) {
      font-size: vmin_mobile(14px);
      max-width: unset;
      margin: vmin_mobile(10px) auto vmin_mobile(16px);
    }
  }

  form {
    position: relative;
    padding: 0;
    & .field {
      position: relative;
      margin: vw_big_screen(12px) 0;
      @include viewport(tabs) {
        margin: vw_tabs(12px) 0;
      }
      @include viewport(swap_tabs) {
        margin: vw_tabs(8px) 0;
      }
      @include viewport(sm_mobile) {
        margin: vmin_mobile(8px) 0;
      }
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
        @include viewport(tabs) {
          font-size: vw_tabs(12px);
          border-radius: 4px;
          padding: 0 vw_tabs(6px);
          line-height: vw_tabs(16px);
        }
        @include viewport(swap_tabs) {
          font-size: vw_tabs(8px);
          padding: 0 vw_tabs(4px);
          line-height: vw_tabs(10px);
        }
        @include viewport(sm_mobile) {
          font-size: vmin_mobile(12px);
          padding: 0 vmin_mobile(6px);
          line-height: vmin_mobile(16px);
        }
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
      @include viewport(tabs) {
        right: vw_tabs(15px);
        font-size: vw_tabs(12px);
        line-height: vw_tabs(16px);
        padding: 0 vw_tabs(6px);
        border-radius: 4px;
      }
      @include viewport(swap_tabs) {
        padding: 0 vw_tabs(4px);
        right: vw_tabs(10px);
        font-size: vw_tabs(8px);
        line-height: vw_tabs(10px);
      }
      @include viewport(sm_mobile) {
        padding: 0 vmin_mobile(6px);
        right: vmin_mobile(15px);
        font-size: vmin_mobile(12px);
        line-height: vmin_mobile(16px);
      }
    }
    & .field-half {
      width: 49%;
      @include viewport(tabs) {
        width: 100%;
      }
    }
    & .field-full {
      width: 100%;
    }
    & textarea {
      resize: none;
      height: vw_big_screen(120px);
      overflow: auto;
      @include viewport(tabs) {
        height: vw_tabs(120px);
      }
      @include viewport(swap_tabs) {
        height: vw_tabs(76px);
      }
      @include viewport(sm_mobile) {
        height: vmin_mobile(120px);
      }
    }
    & input, & textarea {
      width: 100%;
      padding: vw_big_screen(20px);
      border: 1px solid var(--sidebar-color);
      background-color: var(--review-color);
      font-size: vw_big_screen(16px);
      line-height: vw_big_screen(20px);
      font-weight: 500;
      outline: none;
      transition: .2s ease-in;
      color: var(--secondary-color);
      display: flex;
      @include viewport(tabs) {
        padding: vw_tabs(20px);
        font-size: vw_tabs(16px);
        line-height: vw_tabs(20px);
      }
      @include viewport(swap_tabs) {
        padding: vw_tabs(12px);
        font-size: vw_tabs(10px);
        line-height: vw_tabs(13px);
      }
      @include viewport(sm_mobile) {
        padding: vmin_mobile(20px);
        font-size: vmin_mobile(16px);
        line-height: vmin_mobile(20px);
      }
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-background-clip: text;
        -webkit-text-fill-color: var(--secondary-color);
        box-shadow: inset 0 0 vw_big_screen(40px) vw_big_screen(40px) var(--review-color);
        @include viewport(tabs) {
          box-shadow: inset 0 0 40px 40px var(--review-color);
        }
      }
      &::placeholder {
        font-size: vw_big_screen(16px);
        line-height: vw_big_screen(20px);
        color: var(--sidebar-color);
        transition: 0.2s;
        @include viewport(tabs) {
          font-size: vw_tabs(16px);
          line-height: vw_tabs(20px);
        }
        @include viewport(swap_tabs) {
          font-size: vw_tabs(10px);
          line-height: vw_tabs(13px);
        }
        @include viewport(sm_mobile) {
          font-size: vmin_mobile(16px);
          line-height: vmin_mobile(20px);
        }
      }
      &:hover {
        @include viewport(hover) {
          border-color: var(--form-color);
          &::placeholder {
            color: var(--form-color);
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
      font-size: vw_big_screen(16px);
      @include viewport(tabs) {
        bottom: vw_tabs(-50px);
        padding: vw_tabs(12.5px) vw_tabs(16px);
        font-size: vw_tabs(16px);
      }
      @include viewport(swap_tabs) {
        font-size: vw_tabs(10px);
        bottom: vw_tabs(-32px);
        padding: vw_tabs(8.5px) vw_tabs(10px);
      }
      @include viewport(sm_mobile) {
        position: relative;
        bottom: unset;
        justify-content: center;
        padding: vmin_mobile(18px) vmin_mobile(16px);
        font-size: vmin_mobile(16px);
        line-height: vmin_mobile(11.55px);
        width: 100%;
        margin: vmin_mobile(8px) 0;
      }
      & svg {
        width: vw_big_screen(22px);
        margin-left: vw_big_screen(10px);
        @include viewport(tabs) {
          width: vw_tabs(22px);
          margin-left: vw_tabs(10px);
        }
        @include viewport(swap_tabs) {
          width: vw_tabs(14px);
          margin-left: vw_tabs(6px);
        }
        @include viewport(sm_mobile) {
          width: vmin_mobile(22px);
          margin-left: vmin_mobile(10px);
        }
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

</style>
