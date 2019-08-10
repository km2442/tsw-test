import Vue from 'vue'
import Router from 'vue-router'
import { store } from './store/store'
const Index = resolve => require.ensure(['./components/Index'], () => resolve(require(/* webpackChunkName: "Index" */ './components/Index')));
const Instruction = resolve => require.ensure(['./components/Instruction'], () => resolve(require(/* webpackChunkName: "Instruction" */ './components/Instruction')));
const Test = resolve => require.ensure(['./components/Test'], () => resolve(require(/* webpackChunkName: "Test" */ './components/Test')));
const Result = resolve => require.ensure(['./components/Result'], () => resolve(require(/* webpackChunkName: "Result" */ './components/Result')));
const Admin = resolve => require.ensure(['./components/Admin/Admin'], () => resolve(require(/* webpackChunkName: "Admin" */ './components/Admin/Admin')));
const ChangeAdminPassword = resolve => require.ensure(['./components/Admin/ChangeAdminPassword'], () => resolve(require(/* webpackChunkName: "ChangeAdminPassword" */ './components/Admin/ChangeAdminPassword')));
const AdminLogin = resolve => require.ensure(['./components/Admin/AdminLogin'], () => resolve(require(/* webpackChunkName: "AdminLogin" */ './components/Admin/AdminLogin')));
const AddQuestion = resolve => require.ensure(['./components/Admin/AddQuestion'], () => resolve(require(/* webpackChunkName: "AddQuestion" */ './components/Admin/AddQuestion')));
const EditQuestion = resolve => require.ensure(['./components/Admin/EditQuestion'], () => resolve(require(/* webpackChunkName: "EditQuestion" */ './components/Admin/EditQuestion')));
const NotFound = resolve => require.ensure(['./components/NotFound'], () => resolve(require(/* webpackChunkName: "NotFound" */ './components/NotFound')));

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
