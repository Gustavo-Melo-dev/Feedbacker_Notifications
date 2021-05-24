<template>
  <div>
     <ModalFactory></ModalFactory>
    <router-view/>
  </div>
</template>

<script>
import ModalFactory from '../src/components/ModalFactory'

export default {
  components: { ModalFactory }
}
</script>
