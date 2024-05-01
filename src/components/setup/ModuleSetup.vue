<template>
  <h3 class="mt-4 mb-3">{{t('setup.modules.title')}}</h3>

  <div class="row">
    <div class="col">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="moduleCoal" :checked="hasCoalModule" @input="toggleCoalModule">
        <label class="form-check-label" for="moduleCoal">
          <img src="@/assets/module/coal.png" class="icon" alt=""/>
          {{t('setup.modules.coal')}}
        </label>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="moduleManufactoryTrain" :checked="hasManufactoryTrainModule" @input="toggleManufactoryTrainModule">
        <label class="form-check-label" for="moduleManufactoryTrain">
          <img src="@/assets/module/manufactory-train.png" class="icon" alt=""/>
          {{t('setup.modules.manufactory-train')}}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Module from '@/services/enum/Module'
import { useStateStore } from '@/store/state'
import toggleArrayItem from '@brdgm/brdgm-commons/src/util/array/toggleArrayItem'

export default defineComponent({
  name: 'ModuleSetup',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    hasCoalModule() : boolean {
      return this.state.setup.modules.includes(Module.COAL)
    },
    hasManufactoryTrainModule() : boolean {
      return this.state.setup.modules.includes(Module.MANUFACTORY_TRAIN)
    }
  },
  methods: {
    toggleCoalModule() {
      toggleArrayItem(this.state.setup.modules, Module.COAL)
    },
    toggleManufactoryTrainModule() {
      toggleArrayItem(this.state.setup.modules, Module.MANUFACTORY_TRAIN)
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 0.2rem;
  object-fit: contain;
}
</style>