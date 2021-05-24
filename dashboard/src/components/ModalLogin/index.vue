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
    <div>
      <div class="flex flex-col font-medium text-white">
        E-mail:
        <input type="text" placeholder="Digite seu e-mail..." class="text-black mb-3">
      </div>
      <div class="flex flex-col font-medium text-white">
        Senha:
        <input type="password" placeholder="Digite sua senha..." class="text-black mb-5">
        <span class="lnr lnr-eye"></span>
      </div>
      <div class="flex justify-center">
        <button class="flex flex-col rounded-full bg-white text-brand-main px-7 py-1 mb-1 font-medium focus:outline-none">
          Entrar
        </button>
      </div>
      <div class="flex justify-center">
        <a href="http://www.google.com.br" class="font-medium underline text-white">Esqueceu sua senha?</a>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import useModal from '../../hooks/useModal'
export default {
  setup () {
    const modal = useModal()
    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: '',
        errorEmail: ''
      },
      password: {
        value: '',
        errorPassword: ''
      }
    })
    return {
      state,
      close: modal.close
    }
  }
}
</script>

<style>

</style>
