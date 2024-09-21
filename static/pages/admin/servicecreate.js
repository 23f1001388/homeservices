import AdminNavbar from "../../components/adminnavbar.js";

const ServiceCreate = {
  template: `
        <div>
            <AdminNavbar/>
        </div>
        <div class="row justify-content-center p-5">
    <div class="col-md-4 shadow-lg border p-2">
    <div class="p-3">
      <h4 class="text-center">Create Service</h4>
        <div class="badge text-danger alert fs-6" v-show="errormessage">{{errormessage}}</div>
       <div class="form-floating mb-3 mt-3">
          <input v-model="name" type="name" class="form-control" id="name" name="name" placeholder="name@example.com" required>
          <label for="name">Name of Service</label>
        </div>

        <div class="form-floating">
          <input v-model="description" type="text" class="form-control" id="description" name="description" placeholder="Description" required>
          <label for="description">Description</label>
        </div>
        
        <div class="form-floating mt-3">
          <input v-model="price" type="number" class="form-control" id="price" name="price" placeholder="Price" required>
          <label for="price">Price for Service</label>
        </div>
        
        <div class="form-floating mt-3">
          <input v-model="timerequired" type="number" class="form-control" id="timerequired" name="timerequired" placeholder="Time Required" required>
          <label for="timerequired">Time Required(in Days)</label>
        </div>
        
        <div class="text-center mt-3">
          <button class="btn btn-primary me-3" @click="createService">Save</button>
          <router-link to='/admin/dashboard' class="btn btn-danger">Cancel</router-link>
        </div>
       </div>
    </div>
    </div>
    `,
  data() {
    return {
      name: "",
      description: "",
      price: null,
      timerequired: null,
      errormessage: null,
    };
  },
  components: {
    AdminNavbar,
  },
  methods: {
    async createService() {
      try {
        const url = window.location.origin;
        const result = await fetch(url + "/api/serviceapi", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            name: this.name,
            description: this.description,
            price: this.price,
            timerequired: this.timerequired,
          }),
          credentials: "same-origin",
        });
        if (result.ok) {
          const data = await result.json();
          console.log(data);
        } else {
          const errorMsg = await result.json();
          this.errormessage = errorMsg.message;
          console.log("Service not Created : ", errorMsg);
        }
      } catch (error) {
        console.log("Fetch error:", error);
        this.errormessage = "Error Occured";
      }
    },
  },
};

export default ServiceCreate;
