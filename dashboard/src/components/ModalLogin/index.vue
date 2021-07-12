<template>
  <div>
    <div class="bg-brand-main mb-5 flex justify-between" id="modal-login-account">
      <p>
        <center>
          <img
          class="w-60 justify-center"
          src="../../assets/images/white_logo.png"
          alt="logo"
        />
        </center>
      </p>
      <button
        class="flex text-4xl text-white focus:outline-none"
        @click="close"
      >
        &times;
      </button>
    </div>
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <div class="flex flex-col font-medium text-white">
          E-mail:
          <input
            id="email-field"
            type="email"
            placeholder="Digite seu e-mail..."
            class="text-black mb-3 bg-gray-200 border-transparent rounded"
            :class="{ 'border-brand-danger': !!state.email.errorMessage }"
            v-model="state.email.value">
          <span
            id="email-error"
            v-if="!!state.email.errorMessage"
            class="errorMessage">
            {{ state.email.errorMessage }}
          </span>
        </div>
      </label>

      <label class="block">
        <div class="flex flex-col font-medium text-white">
          Senha:
          <input
          id="password-field"
          type="password"
          placeholder="Digite sua senha..."
          class="text-black mb-5 bg-gray-200 border-transparent rounded"
          :class="{ 'border-brand-danger': !!state.password.errorMessage }"
          v-model="state.password.value">
          <span
            id="password-error"
            v-if="!!state.password.errorMessage"
            class="errorMessage"
          >
            {{ state.password.errorMessage }}
          </span>
          <span
            class="lnr lnr-eye">
          </span>
        </div>
      </label>

      <div class="flex justify-center">
        <button
          id="submit-button"
          :disabled="state.isLoading"
          type="submit"
          class="flex flex-col rounded-full bg-white text-brand-main px-7 py-1 mb-1 font-medium focus:outline-none transition-all duration-150"
          :class="{ 'opacity-50': state.isLoading }">
          <icon v-if="state.isLoading" name="loading" class="animate_animated animate-spin"></icon>
          <span v-else>Entrar</span>
        </button>
      </div>
      <div class="flex justify-center">
        <a
          href="http://www.gmail.com.br"
          target="_blank"
          class="font-medium underline text-white">Esqueceu sua senha?</a>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useField } from 'vee-validate'
import { useToast } from 'vue-toastification'
import useModal from '../../hooks/useModal'
import Icon from '../Icon'
import { validateEmptyAndLength3, validateEmptyAndEmail } from '../../utils/validators'
import services from '../../services'
export default {
  components: { Icon },
  setup () {
    const modal = useModal()

    const router = useRouter()

    const toast = useToast()

    const {
      value: emailValue,
      errorMessage: emailErrorMessage
    } = useField('email', validateEmptyAndEmail)

    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true
        const { data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value
        })
        if (!errors) {
          window.localStorage.setItem('token', data.token)
          router.push({ name: 'Feedbacks' })
          state.isLoading = false
          modal.close()
          return
        }
        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao fazer o login')
        }
        if (errors.status === 401) {
          toast.error('E-mail/Senha inválidos')
        }
        if (errors.status === 404) {
          toast.error('E-mail não encontrado')
        }
        state.isLoading = false
      } catch (error) {
        state.isLoading = false
        state.hasErrors = !!error
        toast.error('Ocorreu um erro ao fazer o login')
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit
    }
  }
}
</script>

<style lang="postcss" scoped>
.errorMessage {
  @apply block font-medium text-white;
}
</style>
