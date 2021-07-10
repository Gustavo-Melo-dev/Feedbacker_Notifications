<template>
  <component
  :is="store.currentComponent"
  @next="next"
  @select-feedback-type="handleSelectFeedbackType"
  />
</template>

<script lang="ts">
import useNavigation, { Navigation } from '@/hooks/navigation'
import useStore from '@/hooks/store'
import { setFeedbackType, StoreState } from '@/store'
import { defineComponent } from 'vue'
import SelectFeedbackType from './SelectFeedbackType.vue'
import WriteAFeedback from './WriteFeedback.vue'

interface SetupReturn {
  store: StoreState;
  handleSelectFeedbackType(type: string): void;
  next: Navigation['next'];
}

export default defineComponent({
  components: { SelectFeedbackType, WriteAFeedback },
  setup (): SetupReturn {
    const store = useStore()
    const { next } = useNavigation()
    function handleSelectFeedbackType (type: string): void {
      setFeedbackType(type)
    }
    return {
      store,
      next,
      handleSelectFeedbackType
    }
  }
})

</script>
