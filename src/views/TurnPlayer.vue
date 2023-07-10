<template>
  <SideBar :navigation-state="navigationState"/>

  <h1>{{t('turnPlayer.title')}}</h1>

  <p class="mt-4" v-html="t('turnPlayer.turn')"></p>

  <button class="btn btn-success btn-lg mt-4" @click="next()">
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
import Player from '@/services/enum/Player'

export default defineComponent({
  name: 'TurnPlayer',
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
      return `/round/${this.round}/turn/${this.turn - 1}/bot`
    }
  },
  methods: {
    next() : void {
      const nextRoundNo = this.round
      const nextTurnNo = this.turn + 1
      const cardDeck = this.navigationState.cardDeck
      cardDeck.draw(this.navigationState.turnData.availableTracks)
      const nextTurn = { round: nextRoundNo, turn: nextTurnNo, player: Player.BOT,
            availableTracks: this.navigationState.turnData.availableTracks,
            cardDeck: cardDeck.toPersistence() }
      this.state.storeTurn(nextTurn)

      this.$router.push(`/round/${nextRoundNo}/turn/${nextTurnNo}/bot`)
    }
  }
})
</script>
