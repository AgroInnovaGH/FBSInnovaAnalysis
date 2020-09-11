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
        { name: 'farmers', path: 'farmers', component: ()=>import('../views/Main/Farmers') }
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
