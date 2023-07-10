<template>
  <SideBar :navigationState="navigationState"/>

  <h1>{{t('turnBot.title')}}</h1>

  <BotAction :navigationState="navigationState"/>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import BotAction from '@/components/round/BotAction.vue'
import SideBar from '@/components/round/SideBar.vue'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import Player from '@/services/enum/Player'

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
    BotAction,
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
      if (this.turn > 1) {
        return `/round/${this.round}/turn/${this.turn - 1}/player`
      }
      else {
        return ''
      }
    }
  },
  methods: {
    next() : void {
      const nextRoundNo = this.round
      const nextTurnNo = this.turn + 1
      const cardDeck = this.navigationState.cardDeck
      const nextTurn = { round: nextRoundNo, turn: nextTurnNo, player: Player.PLAYER,
            availableTracks: this.navigationState.turnData.availableTracks,
            cardDeck: cardDeck.toPersistence() }
      this.state.storeTurn(nextTurn)

      this.$router.push(`/round/${nextRoundNo}/turn/${nextTurnNo}/player`)
    }
  }
})
</script>
