<template>
  <div class="sidebar">
    <p>{{t('sideBar.round')}} <strong>{{round}}</strong> / 6</p>
    <button class="btn btn-outline-secondary btn-sm" v-html="t('sideBar.rules.title')" data-bs-toggle="modal" data-bs-target="#rulesModal"></button>
    <h5 class="mt-3" v-html="t('sideBar.tracks')"></h5>
    <div v-for="(track) of allTracks" :key="track + isAvailable(track)" class="icon-container">
      <AppIcon :type="isAvailable(track) ? 'track' : 'track-unavailable'" :name="track" @click="toggle(track)"
          class="icon" :class="{[track]:true,toggle:isAllowToggle(track)}" />
    </div>
  </div>

  <ModalDialog id="rulesModal" :title="t('sideBar.rules.title')" :sizeLg="true" :scrollable="true">
    <template #body>
      <h6 v-html="t('sideBar.rules.updateAvailableTracks.title')"></h6>
      <p v-html="t('sideBar.rules.updateAvailableTracks.rule')"></p>
      <h6 v-html="t('sideBar.rules.emilBlocked.title')"></h6>
      <p v-html="t('sideBar.rules.emilBlocked.rule')"></p>
      <h6 v-html="t('sideBar.rules.emilCollectsLocomtivesEngineers.title')"></h6>
      <p v-html="t('sideBar.rules.emilCollectsLocomtivesEngineers.rule')"></p>
      <h6 v-html="t('sideBar.rules.emilGetsNewToys.title')"></h6>
      <p v-html="t('sideBar.rules.emilGetsNewToys.rule')"></p>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import Player from '@/services/enum/Player';
import Track from '@/services/enum/Track';
import NavigationState from '@/util/NavigationState';
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n';
import getAllEnumValues from 'brdgm-commons/src/util/enum/getAllEnumValues';
import AppIcon from '../structure/AppIcon.vue';
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'
import { useStateStore } from '@/store/state';

export default defineComponent({
  name: "SideBar",
  components: {
    AppIcon,
    ModalDialog
  },
  setup() {
    const { t } = useI18n();
    const state = useStateStore()
    return { t, state };
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    round() : number {
      return this.navigationState.round
    },
    turn() : number {
      return this.navigationState.turn
    },
    allTracks(): Track[] {
      return getAllEnumValues(Track);
    }
  },
  methods: {
    isAvailable(track: Track) : boolean {
      return this.navigationState.turnData.availableTracks.includes(track)
    },
    isAllowToggle(track: Track) : boolean {
      return this.navigationState.player == Player.PLAYER && track != Track.LEVEL1
    },
    toggle(track: Track) : void {
      if (!this.isAllowToggle(track)) {
        return
      }
      const toggleIndex = this.allTracks.indexOf(track)
      const newValue = !this.navigationState.turnData.availableTracks.includes(track)
      const availableUpToIndex = newValue ? toggleIndex : toggleIndex - 1
      const newAvailableTracks : Track[] = []
      for (let index=0; index<=availableUpToIndex; index++) {
        newAvailableTracks.push(this.allTracks[index])
      }
      this.state.updateTurnAvailableTracks(this.round, this.turn, newAvailableTracks)
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: 150px;
  margin-left: 10px;
  margin-bottom: 10px;
  @media (max-width: 600px) {
    width: 100px;
  }
}
.icon {
  width: 45px;
  &.level5 {
    width: 51px;
  }
  &.toggle {
    cursor: pointer;
  }
}
.icon-container {
  margin-top: 15px;
  @media (max-width: 600px) {
    margin-top: 5px;
    margin-right: 5px;
    display: inline-block;
  }
}
</style>
