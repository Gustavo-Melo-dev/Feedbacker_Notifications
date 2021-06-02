<template>
  <div>
     <ModalFactory></ModalFactory>
    <router-view/>
  </div>
</template>

<script>
import ModalFactory from '../src/components/ModalFactory'
import { useRouter, useRoute } from 'vue-router'
import { watch } from 'vue'
import services from './services'
import { setCurrentUser } from './store/user'

export default {
  components: { ModalFactory },
  setup () {
    // const store = useStore()
    const router = useRouter()
    const route = useRoute()

    watch(() => route.path, async () => {
      if (route.meta.hasAuth) {
        const token = window.localStorage.getItem('token')
        if (!token) {
          router.push({ name: 'Home' })
          return
        }
        const { data } = await services.getMe()
        setCurrentUser(data)
      }
    })
  }
}
</script>
