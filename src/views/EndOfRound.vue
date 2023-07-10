<template>
  <SideBar :navigation-state="navigationState"/>

  <h1>{{t('endOfRound.title', {round})}}</h1>

  <p class="mt-4" v-html="t('endOfRound.scorePoints')"></p>
  <ul>
    <li v-html="t('endOfRound.returnWorkers')"></li>
    <li v-html="t('endOfRound.returnCoins')"></li>
    <li v-html="t('endOfRound.moveEngineers')"></li>
  </ul>

  <button class="btn btn-success btn-lg mt-4 me-2" @click="next()">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import SideBar from '@/components/round/SideBar.vue'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import RoundManager from '@/services/RoundManager'

export default defineComponent({
  name: 'EndOfRound',
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
  },
  methods: {
    next() : void {
      const roundManager = new RoundManager(this.state)
      const nextRound = roundManager.prepareNextRound(this.round + 1,
          this.navigationState.turnData.availableTracks, this.navigationState.cardDeck)
      this.state.storeRound(nextRound)

      this.$router.push(`/round/${this.round + 1}/turn/1/bot`)
    }
  }
})
</script>
