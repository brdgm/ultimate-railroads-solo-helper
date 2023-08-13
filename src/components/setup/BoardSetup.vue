<template>
  <h3 class="mt-4 mb-3">{{t('setup.board.title')}}</h3>
  <ol>
    <li>
      <span v-html="t('setup.board.block2CoinsActionSpace')"></span><br/>
      <img src="@/assets/setup/block-2coins-action-space.jpg" class="block-2coins-action-space"/>
    </li>
    <li>
      <span v-html="t('setup.board.unusedComponents')"></span><br/>
      <img src="@/assets/setup/unused-material.jpg" class="unused-material"/>
    </li>
    <li>
      <span v-html="t('setup.board.take5Coins')"></span><br/>
      <img src="@/assets/setup/take-5-coins.jpg" class="take-5-coins"/>
    </li>
    <li>
      <span v-html="t('setup.board.placeWorkers50points')"></span><br/>
      <img src="@/assets/setup/workers-50-points.jpg" class="workers-50-points"/>
    </li>
    <li>
      <img src="@/assets/module/american-railroads.png" class="icon"/>
      <span v-html="t('setup.board.americaStockPriceTile')"></span><br/>
    </li>
  </ol>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'BoardSetup',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>

<style lang="scss" scoped>
img {
  margin-bottom: 10px;
  &.block-2coins-action-space {
    width: 200px;
  }
  &.unused-material {
    width: 150px;
  }
  &.take-5-coins {
    width: 70px;
  }
  &.workers-50-points {
    width: 100px;
  }
  &.icon {
    height: 2rem;
    margin-right: 0.25rem;
  }
}
li {
  clear: both;
}
</style>
