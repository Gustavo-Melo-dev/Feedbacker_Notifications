<template>
  <div>
    <div class="bg-brand-main mb-5 flex justify-between">
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
          Nome:
          <input type="text"
            placeholder="Digite seu nome e sobrenome..."
            class="text-black mb-3 bg-gray-200 border-transparent rounded"
            :class="{ 'border-brand-danger': !!state.name.errorMessage }"
            v-model="state.name.value">
          <span
            v-if="!!state.name.errorMessage"
            class="block font-medium text-brand-danger">
            {{ state.name.errorMessage }}
          </span>
        </div>
      </label>

      <label class="block">
        <div class="flex flex-col font-medium text-white">
          E-mail:
          <input type="email"
            placeholder="Digite seu e-mail..."
            class="text-black mb-3 bg-gray-200 border-transparent rounded"
            :class="{ 'border-brand-danger': !!state.email.errorMessage }"
            v-model="state.email.value">
          <span
            v-if="!!state.email.errorMessage"
            class="block font-medium text-brand-danger">
            {{ state.email.errorMessage }}
          </span>
        </div>
      </label>

      <label class="block">
        <div class="flex flex-col font-medium text-white">
          Senha:
          <input type="password"
          placeholder="Digite sua senha..."
          class="text-black mb-5 bg-gray-200 border-transparent rounded"
          :class="{ 'border-brand-danger': !!state.password.errorMessage }"
          v-model="state.password.value">
          <span
            v-if="!!state.password.errorMessage"
            class="block font-medium text-brand-danger"
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
          :disabled="state.isLoading"
          type="submit"
          class="flex flex-col rounded-full bg-white text-brand-main px-7 py-1 mb-1 font-medium focus:outline-none transition-all duration-150"
          :class="{ 'opacity-50': state.isLoading }">
          <icon v-if="state.isLoading" name="loading" class="animate-spin"></icon>
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
import { validateEmptyAndLength3, validateEmptyAndEmail, validateEmptyAndName } from '../../utils/validators'
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

    const {
      value: nameValue,
      errorMessage: nameErrorMessage
    } = useField('name', validateEmptyAndName)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      name: {
        value: nameValue,
        errorMessage: nameErrorMessage
      },
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    async function login ({ email, password }) {
      const { data, errors } = await services.auth.login({ email, password })
      if (!errors) {
        window.localStorage.setItem('token', data.token)
        router.push({ name: 'Feedbacks' })
        modal.close()
      }
      state.isLoading = false
    }

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true

        const { errors } = await services.auth.register({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value
        })
        if (!errors) {
          await login({
            email: state.email.value,
            password: state.password.value
          })
        }
        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao fazer ao criar o login')
        }
        state.isLoading = false
      } catch (error) {
        state.isLoading = false
        state.hasErrors = !!error
        toast.error('Ocorreu um erro ao fazer ao criar o login')
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

<style>
.errorMessage {
  color: white;
}
</style>
