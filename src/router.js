import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Test from '@/components/Test'
import Admin from '@/components/Admin'
import AddQuestion from '@/components/AddQuestion'
import EditQuestion from '@/components/EditQuestion'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/addQuestion',
      name: 'AddQuestion',
      component: AddQuestion
    },
    {
      path: '/editQuestion/:questionId',
      name: 'EditQuestion',
      component: EditQuestion
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound
    },
    { path: '*', redirect: '/404' }
  ]
})
