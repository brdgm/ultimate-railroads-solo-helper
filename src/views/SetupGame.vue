<template>
  <h1>{{t('setup.title')}}</h1>

  <BoardSetup/>
  <ModuleSetup/>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import BoardSetup from '@/components/setup/BoardSetup.vue'
import ModuleSetup from '@/components/setup/ModuleSetup.vue'

export default defineComponent({
  name: 'SetupGame',
  components: {
    FooterButtons,
    BoardSetup,
    ModuleSetup
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  methods: {
    startGame() : void {
      this.state.resetGame()
      this.$router.push('/round/1/turn/1')
    }
  }
})
</script>
