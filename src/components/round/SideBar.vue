<template>
  <div class="sidebar">
    <p>{{t('sideBar.round')}} <strong>{{navigationState.round}}</strong> / 6</p>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState';
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: "SideBar",
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
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: 160px;
}
</style>
