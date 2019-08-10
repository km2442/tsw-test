import Vue from 'vue'
import Router from 'vue-router'
import { store } from './store/store'
const Index = () => import(/* webpackChunkName: "Index" */ './components/Index')
const Instruction = () => import(/* webpackChunkName: "Instruction" */ './components/Instruction')
const Test = () => import(/* webpackChunkName: "Test" */ './components/Test')
const Result = () => import(/* webpackChunkName: "Result" */ './components/Result')
const Admin = () => import(/* webpackChunkName: "Admin" */ './components/Admin/Admin')
const ChangeAdminPassword = () => import(/* webpackChunkName: "ChangeAdminPassword" */ './components/Admin/ChangeAdminPassword')
const AdminLogin = () => import(/* webpackChunkName: "AdminLogin" */ './components/Admin/AdminLogin')
const AddQuestion = () => import(/* webpackChunkName: "AddQuestion" */ './components/Admin/AddQuestion')
const EditQuestion = () => import(/* webpackChunkName: "EditQuestion" */ './components/Admin/EditQuestion')
const NotFound = () => import(/* webpackChunkName: "NotFound" */ './components/NotFound')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/instruction',
      name: 'Instruction',
      component: Instruction
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/result',
      name: 'Result',
      component: Result,
      props: true,
      beforeEnter: (to, from, next) => {
        if (to.params.points >= 0) {
          next()
        } else {
          next({ name: 'NotFound' })
        }
      }
    },
    {
      path: '/adminlogin',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      beforeEnter: (to, from, next) => {
        if (store.getters.user !== null && store.getters.user !== undefined) {
          next();
        } else {
          next({ name: 'AdminLogin' });
        }
      }
    },
    {
      path: '/changepasswd',
      name: 'ChangeAdminPassword',
      component: ChangeAdminPassword,
      beforeEnter: (to, from, next) => {
        if (store.getters.user !== null && store.getters.user !== undefined) {
          next();
        } else {
          next({ name: 'AdminLogin' });
        }
      }
    },
    {
      path: '/addQuestion',
      name: 'AddQuestion',
      component: AddQuestion,
      beforeEnter: (to, from, next) => {
        if (store.getters.user !== null && store.getters.user !== undefined) {
          next();
        } else {
          next({ name: 'AdminLogin' });
        }
      }
    },
    {
      path: '/editQuestion/:questionId',
      name: 'EditQuestion',
      component: EditQuestion,
      beforeEnter: (to, from, next) => {
        if (store.getters.user !== null && store.getters.user !== undefined) {
          next();
        } else {
          next({ name: 'AdminLogin' });
        }
      }
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound
    },
    { path: '*', redirect: '/404' }
  ]
})
