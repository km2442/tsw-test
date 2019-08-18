import Vue from 'vue'
import Router from 'vue-router'
import { store } from './store/store'
import { timeout } from 'q';
const Index = () => import(/* webpackChunkName: "Index" */ './components/Index')
const Instruction = () => import(/* webpackChunkName: "Instruction" */ './components/Instruction')
const Test = () => import(/* webpackChunkName: "Test" */ './components/Test')
const Result = () => import(/* webpackChunkName: "Result" */ './components/Result')
const Admin = () => import(/* webpackChunkName: "Admin" */ './components/Admin/Admin')
const ChangeAdminPassword = () => import(/* webpackChunkName: "ChangeAdminPassword" */ './components/Admin/ChangeAdminPassword')
const AdminLogin = () => import(/* webpackChunkName: "AdminLogin" */ './components/Admin/AdminLogin')
const AddQuestion = () => import(/* webpackChunkName: "QuestionEditor" */ './components/Admin/AddQuestion')
const EditQuestion = () => import(/* webpackChunkName: "QuestionEditor" */ './components/Admin/EditQuestion')
const NotFound = () => import(/* webpackChunkName: "NotFound" */ './components/NotFound')

Vue.use(Router)

const auth = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
  } else {
    next({ name: 'AdminLogin' });
  }
}

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
      component: AdminLogin,
      beforeEnter: (to, from, next) => {
        setTimeout(() => {
          if (store.getters.isAuthenticated) {
            next({ name: 'Admin' });
          } else {
            next();
          }
        }, 500);
      }
    },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: auth
  },
  {
    path: '/administrator',
    redirect: '/admin'
  },
  {
    path: '/changepasswd',
    name: 'ChangeAdminPassword',
    component: ChangeAdminPassword,
    beforeEnter: auth
  },
  {
    path: '/addQuestion',
    name: 'AddQuestion',
    component: AddQuestion,
    beforeEnter: auth
  },
  {
    path: '/editQuestion/:questionId',
    name: 'EditQuestion',
    component: EditQuestion,
    beforeEnter: auth
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  { path: '*', redirect: '/404' }
  ]
})