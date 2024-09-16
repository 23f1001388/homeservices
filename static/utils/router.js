import Home from '../pages/home.js'
import About from '../pages/about.js'
import Contact from '../pages/contact.js'
import Login from '../pages/login.js'
import RegisterCustomer from '../pages/registercustomer.js'
import RegisterProfessional from '../pages/registerprofessional.js'
import AdminDashboard from '../pages/admin/admindashboard.js'

const router=VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes:[
    {path:'/',component:Home},
    {path:'/about',component:About},
    {path:'/contact',component:Contact},
    {path:'/login',component:Login},
    {path:'/register/customer',component:RegisterCustomer},
    {path:'/register/professional',component:RegisterProfessional},
    {path:'/admin/dashboard',component:AdminDashboard}
    
    ]
});

export default router;