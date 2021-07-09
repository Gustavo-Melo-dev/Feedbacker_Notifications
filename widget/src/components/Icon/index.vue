<template>
  <div>
    <component :is="name" v-bind="$props"/>
  </div>
</template>

<script>
import Loading from './Loading.vue'
import Copy from './Copy.vue'
import ChevronDown from './ChevronDown.vue'
import Chat from './Chat.vue'
import ChatBox from './ChatBox.vue'
import ArrowRight from './Arrow-right.vue'
import Close from './Close.vue'
import Check from './Check.vue'
import Atention from './Atention.vue'
export default {
  components: { Loading, Copy, ChevronDown, Chat, ArrowRight, Close, Check, Atention, ChatBox },
  props: {
    name: { type: String, required: true }
  }
}
</script>
