import Navbar from "../components/navbar.js";

const RegisterProfessional={
  template:`
  <div>
        <Navbar/> 
      </div>
    <div class="row justify-content-center p-3">
    <div class="col-md-4 shadow-lg border p-2">
    <div class="p-2">

      <h4 class="text-center">Service Professional SignUp</h4>

        <div class="form-floating mb-3 mt-3">
          <input type="email" v-model="email" class="form-control" id="email" name="email" placeholder="name@example.com" required>
          <label for="email">Email address</label>
        </div>

        <div class="form-floating">
          <input type="password" v-model="password" class="form-control" id="password" name="password" placeholder="Password" required>
          <label for="password">Password</label>
        </div>
        
        <div class="form-floating mt-3">
          <input type="text" v-model="name" class="form-control" id="name" name="name" placeholder="Full Name" required>
          <label for="name">Full Name</label>
        </div>
        
        <div class="form-floating mt-3">
        <select class="form-select" v-model="selectedservice" id="service" aria-label="service" name='service'>
          <option selected>Select Service</option>
          <option v-for="service in services" :key="service.id" :value="service.name">{{service.name}}</option>
        </select>
        <label for="service">Please Select Service Type</label>
        </div>
  
        <div class="form-floating mt-3">
          <input type="number" v-model="experience" class="form-control" id="experience" name="experience" placeholder="Experience in Years" required>
          <label for="service">Experience in Years</label>
        </div>

        <div class="form-floating mt-3">
          <textarea class="form-control" v-model="address" id="address" name="address" placeholder="Complete Address" required></textarea>
          <label for="address">Complete Address</label>
        </div>
        
        <div class="form-floating mt-3">
          <input type="number"  v-model="pincode" class="form-control" id="pincode" name="pincode" placeholder="PIN Code" required>
          <label for="pincode">PIN Code</label>
        </div>
        
        <div class="text-center mt-3">
          <button class="btn btn-primary" @click="registerProfessional">Sign Up</button>
        </div>
        <div class='text-center'>
          <h6>Already have an account ? <router-link to='/Login'>Login</router-link></h6>
        </div>
       </div>
    </div>
    </div>
  `,
  components:{
    Navbar,
  },
  data(){
    return{
      email:"",
      password:"",
      name:"",
      services:[],
      selectedservice:"",
      experience:"",
      address:"",
      pincode:"",
      contact:"",
      fileupload:"",
    }
  },
  mounted(){
    this.loadServices();
  },
  methods:{
    async loadServices(){
      const url=window.location.origin;
      const result=await fetch(url +'/getservices');
      if(result.ok){
        const data=await result.json();
        this.services=data;
      }
    },
    async registerProfessional(){
      try{
        const url=window.location.origin;
        const result=await fetch(url + '/register/professional',
          {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
              email:this.email,
              password:this.password,
              name:this.name,
              service:this.service,
              experience:this.experience,
              address:this.address,
              pincode:this.pincode,
              contact:this.contact,
              fileupload:this.fileupload
            }),
            credentials:'same-origin',  
          });

          if(result.ok){
            const data=await result.json();
            console.log("Updated Successfully");
          }
          else{
            const errorMsg=await result.json();
            console.log("Updation  Failed : ",errorMsg);
          }
      }
      catch(error){
        console.log("Fetch error:", error);
      }
    }

  }
}

export default RegisterProfessional