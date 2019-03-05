import Vue from 'vue'
import Router from 'vue-router'

import main from '@/views/main'

import xunjian from '@/views/xunjian'

import guzhang from '@/views/guzhang'

import wode from '@/views/wode'

import login from '@/views/login'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: "/",
      name: "def",
      redirect: {name: "main"}
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: '/',
      name: 'main',
      component: main,
      children: [
        {
          path: '',
          name: 'def',
          component: guzhang,
        },
        {
          path: 'guzhang',
          name: 'guzhang',
          component: guzhang,
        },
        {
          path: 'wode',
          name: 'wode',
          component: wode,
        },
        {
          path: 'xunjian',
          name: 'xunjian',
          component: xunjian,
        },

      ]
    }
  ]
})
