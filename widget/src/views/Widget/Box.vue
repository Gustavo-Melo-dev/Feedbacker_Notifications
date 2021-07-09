<template>
  <div
  class="box animate__animated animate__fadeInUp animate__faster">
    <div
    class="relative w-full flex"
    :class="{
      'justify-between': canShowAdditionalControlAndInfo,
      'justify-end': !canShowAdditionalControlAndInfo
    }">
      <button v-if="canShowAdditionalControlAndInfo"
      @click="() => ({})"
      :disabled="canGoBack"
      :class="{ invisible: canGoBack }"
      class="text-xl text-gray-800 focus:outline-none">
        <icon
        name="arrow-right"
        color="colors.gray['800']"
        />
      </button>
      <p v-if="canShowAdditionalControlAndInfo"
      class="text-xl font-black text-center text-brand-main">
        {{ label }}
      </p>
      <button
      @click="() => emit('close-box')"
      class="text-xl text-gray-800 focus:outline-none">
        <icon
        name="close"
        color="colors.gray['800']"
        size="14"
        />
      </button>
    </div>
    <div class="text-gray-800 text-sm flex" v-if="canShowAdditionalControlAndInfo">
      <icon
      name="chat_box"
      class="mr-1"
      color="gray"/>
      Widget by
      <span class="ml-1 font-bold">Feedbacker Notifications</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef, SetupContext } from 'vue'
import { brand } from '../../../palette.js'
import colors from 'tailwindcss/colors'
import useStore from '@/hooks/store'
import Icon from '@/components/Icon/index.vue'

interface SetupReturn {
  emit: SetupContext['emit'];
  canGoBack: ComputedRef<boolean>;
  canShowAdditionalControlAndInfo: ComputedRef<boolean>;
  label: ComputedRef<string>;
  brandColors: Record<string, string>;
  colors: Record<string, string>;
}

export default defineComponent({
  components: { Icon },
  emits: ['close-box'],
  setup (_, { emit }: SetupContext): SetupReturn {
    const store = useStore()
    const label = computed<string>(() => {
      if (store.feedbackType === 'ISSUE') {
        return 'Reporte um problema'
      }
      if (store.feedbackType === 'IDEA') {
        return 'Diga sua ideia'
      }
      if (store.feedbackType === 'OTHER') {
        return 'Fique a vontade para falar'
      }
      return 'O que você tem em mente?'
    })
    const canGoBack = computed<boolean>(() => {
      return store.currentComponent === 'SelectFeedbackType'
    })
    const canShowAdditionalControlAndInfo = computed<boolean>(() => {
      return store.currentComponent !== 'Sucess' && store.currentComponent !== 'Error'
    })
    return {
      emit,
      label,
      colors,
      brandColors: brand,
      canGoBack,
      canShowAdditionalControlAndInfo
    }
  }
})
</script>

<style lang="postcss" scoped>
.box {
  @apply fixed z-50 bottom-0 right-0 mb-5 mr-5 bg-white rounded-xl py-5 px-5 flex flex-col items-center shadow-xl select-none;
  width: 400px;
}
</style>
