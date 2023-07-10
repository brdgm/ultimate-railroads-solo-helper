<template>
  <div class="sidebar">
    <p>{{t('sideBar.round')}} <strong>{{round}}</strong> / 6</p>
    
    <h5>Player's Tracks</h5>
    <div v-for="(track) of allTracks" :key="track + isAvailable(track)" class="mt-3">
      <AppIcon :type="isAvailable(track) ? 'track' : 'track-unavailable'" :name="track" @click="toggle(track)"
          class="icon" :class="{[track]:true,toggle:isAllowToggle(track)}" />
    </div>
  </div>
</template>

<script lang="ts">
import Track from '@/services/enum/Track';
import NavigationState from '@/util/NavigationState';
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n';
import getAllEnumValues from 'brdgm-commons/src/util/enum/getAllEnumValues';
import AppIcon from '../structure/AppIcon.vue';
import { useStateStore } from '@/store/state';

export default defineComponent({
  name: "SideBar",
  components: {
    AppIcon
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
      return track != Track.LEVEL1 && !this.navigationState.botTurn
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
  width: 160px;
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
</style>
