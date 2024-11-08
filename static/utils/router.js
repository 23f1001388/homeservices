import Home from '../pages/home.js'
import About from '../pages/about.js'
import Contact from '../pages/contact.js'
import Login from '../pages/login.js'
import RegisterCustomer from '../pages/registercustomer.js'
import RegisterProfessional from '../pages/registerprofessional.js'
import store from './store.js'

// Admin Component/Pages
import UserDetails from '../pages/admin/userdetails.js'
import ServiceCreate from '../pages/admin/servicecreate.js'
import AdminDashboard from '../pages/admin/admindashboard.js'

// Professional Components/Pages
import ProfessionalDashboard from '../pages/professionals/professionaldashboard.js'

// Customer Component/Pages
import CustomerDashboard from '../pages/customers/customerdashboard.js'


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/login', component: Login },
  { path: '/register/customer', component: RegisterCustomer },
  { path: '/register/professional', component: RegisterProfessional },
  // Admin Routes
  { path: '/admin/dashboard', component: AdminDashboard, meta: { requiresLogin: true, role: 'admin' } },
  { path: '/admin/service/create', component: ServiceCreate, meta: { requiresLogin: true, role: 'admin' } },
  { path: '/admin/users', component: UserDetails, meta: { requiresLogin: true, role: 'admin' } },

  // Professional Routes
  { path: '/professional/dashboard', component: ProfessionalDashboard, meta: { requiresLogin: true, role: 'professional' } },

  // Customer Routes
  { path: '/customer/dashboard', component: CustomerDashboard, meta: { requiresLogin: true, role: 'cus  tomer' } },

]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  mode:'history',
  routes,
});

router.beforeEach((to, from, next) => {

  const user=JSON.parse(sessionStorage.getItem('user'));
  const token=user ? user.token: null;
  const role=user ? user.role: null;

  if (user) {
      store.commit('setUser',user);
      store.commit('setRole',user.role);
      store.commit('setLoggedIn',true);
    }

  if(to.meta.requiresLogin){
    if(!token){
      next({path:'/login'})
    }else{next()};
  }else{next()}
})



export default router;