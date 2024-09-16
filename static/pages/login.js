import router from '../utils/router.js'

const Login = {
  template: `
    <div class="row justify-content-center p-5">
    <div class="col-md-4 shadow-lg border p-2">
    <div class="p-3">
      <h4 class="text-center">User Login</h4>
        <div class="form-floating mb-3">
          <input type="email" v-model="email" class="form-control" placeholder="name@example.com">
          <label for="email">Email address</label>
          <label>{{email}}</label>
        </div>
        <input type="password" v-model="password" class="form-control" placeholder="Password">
        <label for="password">Password</label>
       
      </div>
      <div class="text-center mt-3">
        <button class="btn btn-primary me-3" @click="userLogin">Login</button>
        <router-link to='/' class="btn btn-danger">Cancel</router-link>
      </div>
      <div class='text-center'>
        <h6>Don't have an account ? <router-link to='/register/customer'>Register</router-link></h6>
        </div>
      </div>
    </div>
    </div>
  `,
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async userLogin() {
      try {
        const url = window.location.origin;
        const result=await fetch(url + "/userlogin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.email, password: this.password }),
          credentials:'same-origin',
        });
        if (result.ok) {
          const data=await result.json();
          console.log(data);
          router.push('/admin/dashboard')

          }else{
            const errorMsg=await result.json();
            console.error('Login Falied : ', errorMsg);
          }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    },

    getUser() {
      try {
        const url = window.location.origin;
        fetch(url + "/userlogin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.email, password: this.password }),
          credentials:'same-origin',
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((data) => {
            console.log(data);
          });
      } catch (error) {
        console.error("Fetch error:", error);
      }
    },
  },
};

export default Login;
