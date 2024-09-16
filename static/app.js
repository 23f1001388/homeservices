import router from '../static/utils/router.js'
import Navbar from '../static/components/navbar.js'

const app=Vue.createApp({
  template:`
  <div>
    <Navbar/> 
    <router-view/>
  </div>`,
  
});
app.component('Navbar',Navbar);
app.use(router);
app.mount("#app");