import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      component: Main,
      children: [
        { name: 'home', path: '', component: ()=>import('../views/Main/Home') },
        { name: 'farmers', path: 'farmers', component: ()=>import('../views/Main/Farmers') },
        { name: 'access-control', path: 'access-control', component: ()=>import('../views/Main/AccessControl') },

      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: ()=>import('../views/Auth')
    }
]

const router = new VueRouter({
  routes
})

export default router
