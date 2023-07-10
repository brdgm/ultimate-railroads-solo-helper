<template>
  <SideBar :navigationState="navigationState"/>

  <h1>{{t('turnBot.title')}}</h1>

  <template v-if="navigationState.cardDeck.currentCard == undefined">
    <p class="mt-4" v-html="t('turnBot.cardDeckEmpty')"></p>

    <button class="btn btn-success btn-lg mt-4" @click="next()">
      {{t('action.next')}}
    </button>
  </template>

  <template v-else>
    <BotAction :navigationState="navigationState" :key="navigationState.cardDeck.currentCard?.id"/>

    <button class="btn btn-success btn-lg mt-4 me-2" @click="next()">
      {{t('turnBot.action.placed')}}
    </button>

    <button class="btn btn-danger btn-lg mt-4 me-2" @click="notPossible()">
      {{t('turnBot.action.notPossible')}}
    </button>

    <button class="btn btn-secondary btn-lg mt-4" @click="noWorkers()">
      {{t('turnBot.action.noWorkers')}}
    </button>
  </template>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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
    const emilPass = ref(navigationState.turnData.emilPass)

    return { t, state, navigationState, round, turn, emilPass }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.turn > 1) {
        return `/round/${this.round}/turn/${this.turn - 1}/player`
      }
      else if (this.round > 1 && this.navigationState.lastTurnLastRound) {
        return `/round/${this.round - 1}/turn/${this.navigationState.lastTurnLastRound}/endOfRound`
      }
      else {
        return ''
      }
    }
  },
  methods: {
    notPossible() : void {
      this.navigationState.cardDeck.draw(this.navigationState.turnData.availableTracks)
      this.$forceUpdate()
    },
    noWorkers() : void {
      this.emilPass = true
      this.next()
    },
    next() : void {
      const nextRoundNo = this.round
      const nextTurnNo = this.turn + 1
      const cardDeck = this.navigationState.cardDeck
      const emilPass = this.emilPass
      const nextTurn = { round: nextRoundNo, turn: nextTurnNo, player: Player.PLAYER,
            availableTracks: this.navigationState.turnData.availableTracks,
            cardDeck: cardDeck.toPersistence(), emilPass }
      this.state.storeTurn(nextTurn)

      this.$router.push(`/round/${nextRoundNo}/turn/${nextTurnNo}/player`)
    }    
  }
})
</script>
