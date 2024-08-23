<template>
  <div class="container m-auto flex items-center full-height">
    <div class="content">
      <h2>Contacts</h2>

      <Decorative :content="'form'" :className="'tag-item__text'" :tag="'wrap'">
        <form @submit.prevent="submitForm">
          <div>
            <label for="name">Name</label>
            <input type="text" v-model="form.name" id="name" required />
          </div>

          <div>
            <label for="email">Email</label>
            <input type="email" v-model="form.email" id="email" required />
          </div>

          <div>
            <label for="subject">Subject</label>
            <input type="text" v-model="form.subject" id="subject" required />
          </div>

          <div>
            <label for="message">Message</label>
            <textarea v-model="form.message" id="message" required></textarea>
          </div>

          <button type="submit" :disabled="loading">Send</button>
        </form>

        <p v-if="success" class="success-message">Message sent successfully!</p>
        <p v-if="error" class="error-message">There was an error sending your message.</p>
      </Decorative>
    </div>
  </div>
</template>

<script>
import Decorative from '~/components/DecorativeWrapper.vue'
import { useFetch } from '#app'

export default {
  components: {
    Decorative,
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      loading: false,
      success: false,
      error: false,
    }
  },
  methods: {
    async submitForm() {
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
    },
    resetForm() {
      this.form = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.success-message {
  color: green;
  margin-top: 10px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
