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
          E-mail:
          <input type="email"
            placeholder="Digite seu e-mail..."
            class="text-black mb-3 bg-gray-200 border-transparent rounded"
            :class="{ 'border-brand-danger': !!state.email.errorEmail }"
            v-model="state.email.value">
          <span
            v-if="!!state.email.errorEmail"
            class="block font-medium text-brand-danger">
            {{ state.email.errorEmail }}
          </span>
        </div>
      </label>

      <label class="block">
        <div class="flex flex-col font-medium text-white">
          Senha:
          <input type="password"
          placeholder="Digite sua senha..."
          class="text-black mb-5 bg-gray-200 border-transparent rounded"
          :class="{ 'border-brand-danger': !!state.password.errorPassword }"
          v-model="state.password.value">
          <span
            v-if="!!state.password.errorPassword"
            class="block font-medium text-brand-danger"
          >
            {{ state.password.errorPassword }}
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
          Entrar
        </button>
      </div>
      <div class="flex justify-center">
        <a
          href="http://www.google.com.br"
          class="font-medium underline text-white">Esqueceu sua senha?</a>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useField } from 'vee-validate'
import useModal from '../../hooks/useModal'
import { validateEmptyAndLength5, validateEmptyAndEmail } from '../../utils/validators'
export default {
  setup () {
    const modal = useModal()

    const {
      value: emailValue,
      errorEmail: emailErrorMessage
    } = useField('email', validateEmptyAndEmail)

    const {
      value: passwordValue,
      errorPassword: passwordErrorMessage
    } = useField('password', validateEmptyAndLength5)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorEmail: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorPassword: passwordErrorMessage
      }
    })

    function handleSubmit () {}

    return {
      state,
      close: modal.close,
      handleSubmit
    }
  }
}
</script>

<style>

</style>
