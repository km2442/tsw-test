import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import(/* webpackChunkName: "Index" */ './components/Index')
const Instruction = () => import(/* webpackChunkName: "Instruction" */ './components/Instruction')
const Test = () => import(/* webpackChunkName: "Test" */ './components/Test')
const Result = () => import(/* webpackChunkName: "Result" */ './components/Result')
const Admin = () => import(/* webpackChunkName: "Admin" */ './components/Admin/Admin')
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
        if(to.params.points){
          next()
        } else {
          next({ name: 'NotFound' })
        }
      }
    },
    {
      path: '/login',
      name: 'AdminLogin',
      component: AdminLogin
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
