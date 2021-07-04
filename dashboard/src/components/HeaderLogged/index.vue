<template>
  <div class="flex items-center justify-between w-4/5 max-w-6xl py-10">
    <div class="w-28 lg:w-36">
      <img class="w-full" src="@/assets/images/white_logo.png" alt="logo">
    </div>
    <div class="flex">
      <ul class="flex list-none">
        <li
        @click="() => router.push({ name: 'Credencials' })"
        class="py-2 px-6 rounded-full font-bold cursor-pointer text-white focus:outline-none">
          Credenciais
        </li>
        <li
        @click="() => router.push({ name: 'Feedbacks' })"
        class="py-2 px-6 mr-5 rounded-full font-bold cursor-pointer text-white focus:outline-none">
          Feedbacks
        </li>
        <li
        @click="handleLogout"
        class="py-2 px-6 rounded-full font-bold cursor-pointer bg-white text-brand-main focus:outline-none">
          {{ logoutLabel }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import useStore from '@/hooks/useStore'
import { clearCurrentUser } from '../../store/user'
export default {
  setup () {
    const router = useRouter()
    const store = useStore('User')
    const logoutLabel = computed(() => {
      if (!store.currentUser.name) {
        return '...'
      }
      return `${!store.currentUser.name} (sair)`
    })
    function handleLogout () {
      window.localStorage.removeItem('token')
      clearCurrentUser()
      router.push({ name: 'Home' })
    }
    return {
      router,
      logoutLabel,
      handleLogout
    }
  }
}
</script>

<style>

</style>
