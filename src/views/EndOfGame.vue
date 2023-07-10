<template>
  <SideBar :navigation-state="navigationState"/>

  <h1>{{t('endOfGame.title')}}</h1>

  <p class="mt-4" v-html="t('endOfGame.scorePoints')"></p>
  <p v-html="t('endOfGame.engineerMajority')"></p>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import SideBar from '@/components/round/SideBar.vue'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'EndOfGame',
  components: {
    FooterButtons,
    SideBar
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)

    const { round, turn } = navigationState

    return { t, state, navigationState, round, turn }
  },
  computed: {
    backButtonRouteTo() : string {
      return `/round/${this.round}/turn/${this.turn}/player`
    }
  }
})
</script>
