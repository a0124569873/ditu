import Vue from 'vue'
import Router from 'vue-router'

import main from '@/views/main'

import xunjian from '@/views/xunjian'
import add_record from '@/views/xunjian/add_record'
import shoudong_list from '@/views/xunjian/shoudong_list'
import shoudong_detail from '@/views/xunjian/shoudong_detail'
import zidong_list from '@/views/xunjian/zidong_list'
import zidong_detail from '@/views/xunjian/zidong_detail'
import local_record from '@/views/xunjian/local_record'
import shoudong_record_list_item_detail from '@/views/xunjian/shoudong_record_list_item_detail'
import shoudong_record_list_items_list from '@/views/xunjian/shoudong_record_list_items_list'

import guzhang from '@/views/guzhang'
import gz_detail from '@/views/guzhang/gz_detail'

import wode from '@/views/wode'
import test from '@/views/wode/testpage.vue'
import warning from '@/views/wode/warning.vue'

import login from '@/views/login'
import passwd from '@/views/login/alterpasswd'

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
        {
          path: 'add_record',
          name: 'add_record',
          component: add_record,
        },
        {
          path: 'gz_detail',
          name: 'gz_detail',
          component: gz_detail,
        },
        {
          path: 'shoudong_list',
          name: 'shoudong_list',
          component: shoudong_list,
        },
        {
          path: 'shoudong_detail',
          name: 'shoudong_detail',
          component: shoudong_detail,
        },
        {
          path: 'zidong_list',
          name: 'zidong_list',
          component: zidong_list,
        },
        {
          path: 'zidong_detail',
          name: 'zidong_detail',
          component: zidong_detail,
        },
        {
          path: 'local_record',
          name: 'local_record',
          component: local_record,
        },
        {
          path: 'shoudong_record_list_item_detail',
          name: 'shoudong_record_list_item_detail',
          component: shoudong_record_list_item_detail,
        },
        {
          path: 'shoudong_record_list_items_list',
          name: 'shoudong_record_list_items_list',
          component: shoudong_record_list_items_list,
        },
        {
          path: 'test',
          name: 'test',
          component: test,
        },
        {
          path: 'warning',
          name: 'warning',
          component: warning,
        },
      ]
    }
  ]
})
