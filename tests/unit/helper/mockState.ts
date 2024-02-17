import Module from '@/services/enum/Module';
import { Round, State } from '@/store/state';

export default function (params?: MockStateParams) : State {  
  return {
    language: 'en',
    baseFontSize: 1,
    setup: {
      modules: params?.modules ?? []
    },
    rounds: params?.rounds ?? []
  }
}

export interface MockStateParams {
  modules?: Module[]
  rounds?: Round[]
}
