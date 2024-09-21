import Home from '../pages/home.js'
import About from '../pages/about.js'
import Contact from '../pages/contact.js'
import Login from '../pages/login.js'
import RegisterCustomer from '../pages/registercustomer.js'
import RegisterProfessional from '../pages/registerprofessional.js'
import AdminMain from '../pages/admin/adminmain.js'
import ServiceCreate from '../pages/admin/servicecreate.js'


const router=VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes:[
    {path:'/',component:Home},
    {path:'/about',component:About},
    {path:'/contact',component:Contact},
    {path:'/login',component:Login},
    {path:'/register/customer',component:RegisterCustomer},
    {path:'/register/professional',component:RegisterProfessional},
    {path:'/admin/main',component:AdminMain},
    {path:'/admin/service/create',component:ServiceCreate},
    
    ]
});

export default router;