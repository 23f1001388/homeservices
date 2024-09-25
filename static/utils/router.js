import Home from '../pages/home.js'
import About from '../pages/about.js'
import Contact from '../pages/contact.js'
import Login from '../pages/login.js'
import RegisterCustomer from '../pages/registercustomer.js'
import RegisterProfessional from '../pages/registerprofessional.js'
// import AdminMain from '../pages/admin/adminmain.js'
import ServiceCreate from '../pages/admin/servicecreate.js'
import AdminDashboard from '../pages/admin/admindashboard.js'
import ProfessionalDashboard from '../pages/professionals/professionaldashboard.js'
import CustomerDashboard from '../pages/customers/customerdashboard.js'
import store from './store.js'

const routes=[
  {path:'/',component:Home},
  {path:'/about',component:About},
  {path:'/contact',component:Contact},
  {path:'/login',component:Login},
  {path:'/register/customer',component:RegisterCustomer},
  {path:'/register/professional',component:RegisterProfessional},
  {path:'/admin/dashboard',component:AdminDashboard,meta:{requiresLogin:true,role:'admin'}},
  {path:'/admin/service/create',component:ServiceCreate},
  {path:'/professional/dashboard',component:ProfessionalDashboard,meta:{requiresLogin:true,role:'professional'}},
  {path:'/customer/dashboard',component:CustomerDashboard,meta:{requiresLogin:true,role:'customer'}},
  
  ]

const router=VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

router.beforeEach((to,from,next)=>{
  if (to.matched.some((record) => record.meta.requiresLogin)) {
    if (!store.state.loggedIn) {
      next({ path: "/login" });
    } else if (to.meta.role && to.meta.role !== store.state.role) {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    next();
  }
})


export default router;