<template>
  <div>
    <span
    :class="`bg-${classColor}`"
    class="p-2 text-xs font-black uppercase text-white rounded-full">
      {{ label }}
    </span>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const label = computed(() => {
      if (props.type === 'ISSUE') {
        return 'problema'
      }
      if (props.type === 'IDEA') {
        return 'ideia'
      }
      return 'outros'
    })
    const classColor = computed(() => {
      if (props.type === 'ISSUE') {
        return 'brand-danger'
      }
      if (props.type === 'IDEA') {
        return 'brand-warning'
      }
      return 'brand-graydark'
    })
    return {
      label,
      classColor
    }
  }
}
</script>

<style>

</style>
