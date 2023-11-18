<template>
  <div class="mt-4 mb-4">
    <p v-if="card=='use-engineer-light-side'" v-html="t('turnBot.placement.use-engineer-light-side')"></p>
    <p v-else v-html="t(`turnBot.placement.${placement}`, {count:workerCount}, workerCount)"></p>
    <AppIcon v-if="card" type="card" :name="card" extension="jpg"
        class="icon" :class="{[card]:true}"/>
    <p v-if="locomotiveFactory" class="locomotiveFactory mt-3" v-html="t('turnBot.locomotiveFactoryRules')"
        data-bs-toggle="modal" data-bs-target="#rulesModal"></p>
  </div>
</template>

<script lang="ts">
import Placement from '@/services/enum/Placement';
import AppIcon from '../structure/AppIcon.vue';
import NavigationState from '@/util/NavigationState';
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: "BotAction",
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    card() : string|undefined {
      return this.navigationState.cardDeck.currentCard?.id
    },
    placement() : Placement {
      return this.navigationState.cardDeck.currentCard?.placement ?? Placement.WORKER
    },
    workerCount() : number {
      return this.navigationState.cardDeck.currentCard?.workerCount ?? 1
    },
    locomotiveFactory() : boolean {
      return this.navigationState.cardDeck.currentCard?.locomotiveFactory ?? false
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 120px;
  filter: drop-shadow(2px 2px 3px #888);
  border-radius: 10px;
  &.hire-engineer {
    height: 300px;
    filter: none;
    border-radius: 0;
  }
  &.use-engineer-light-side {
    height: 150px;
  }
  &.module-coal {
    height: 220px;
  }
}
.locomotiveFactory {
  cursor: pointer;
  :deep(b) {
    text-decoration: underline;
    text-decoration-style: dotted;
  }
}
</style>
