import { RouteRecordRaw } from 'vue-router'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import SetupGame from '@/views/SetupGame.vue'
import TurnPlayer from '@/views/TurnPlayer.vue'
import TurnBot from '@/views/TurnBot.vue'
import EndOfRound from '@/views/EndOfRound.vue'
import EndOfGame from '@/views/EndOfGame.vue'
import createRouter from 'brdgm-commons/src/util/router/createRouter'
import { name } from '@/../package.json'

const LOCALSTORAGE_KEY = `${name}.route`

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome
  },
  {
    path: '/setupGame',
    name: 'SetupGame',
    component: SetupGame
  },
  {
    path: '/round/:round/turn/:turn/player',
    name: 'TurnPlayer',
    component: TurnPlayer
  },
  {
    path: '/round/:round/turn/:turn/bot',
    name: 'TurnBot',
    component: TurnBot
  },
  {
    path: '/round/:round/turn/:turn/endOfRound',
    name: 'EndOfRound',
    component: EndOfRound
  },
  {
    path: '/round/:round/turn/:turn/endOfGame',
    name: 'EndOfGame',
    component: EndOfGame
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouter(routes, LOCALSTORAGE_KEY, 'AppHome')