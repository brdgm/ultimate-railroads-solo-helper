<template>
  <SideBar :navigation-state="navigationState"/>

  <h1>{{t('turnPlayer.title')}}</h1>

  <div class="mt-4">
    <template v-if="emilDeckExhausted">
      <p v-html="t('turnPlayer.turnEmilDeckExhausted')"></p>
    </template>
    <template v-else-if="emilPass">
      <p v-html="t('turnPlayer.turnEmilPass1')"></p>
      <p v-html="t('turnPlayer.turnEmilPass2')"></p>
    </template>
    <template v-else>
      <p v-html="t('turnPlayer.turn')"></p>
    </template>
  </div>

  <button class="btn btn-success btn-lg mt-4 me-2" @click="next()" v-if="!emilDeckExhausted">
    {{t('action.next')}}
  </button>

  <button class="btn btn-outline-secondary btn-lg mt-4" @click="endRound()">
    {{t('turnPlayer.action.endRound', {round})}}
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
    },
    emilDeckExhausted() : boolean {
      return this.navigationState.cardDeck.currentCard == undefined
    },
    emilPass() : boolean|undefined {
      return this.navigationState.turnData.emilPass
    }
  },
  methods: {
    next() : void {
      const nextRoundNo = this.round
      const nextTurnNo = this.turn + 1
      const cardDeck = this.navigationState.cardDeck
      const emilPass = this.emilPass
      if (!emilPass) {
        cardDeck.draw(this.navigationState.turnData.availableTracks)
      }
      const nextTurn = { round: nextRoundNo, turn: nextTurnNo, player: Player.BOT,
            availableTracks: this.navigationState.turnData.availableTracks,
            cardDeck: cardDeck.toPersistence(), emilPass }
      this.state.storeTurn(nextTurn)

      this.$router.push(`/round/${nextRoundNo}/turn/${nextTurnNo}/bot`)
    },
    endRound() : void {
      if (this.round == 6) {
        this.$router.push(`/round/${this.round}/turn/${this.turn}/endOfGame`)
      }
      else {
        this.$router.push(`/round/${this.round}/turn/${this.turn}/endOfRound`)
      }
    }
  }
})
</script>
