import AdminNavbar from "../../components/adminnavbar.js";

const AdminDashboard = {
    template: `
    <div>
        <AdminNavbar/>
    </div>
    <div class="row justify-content-center ps-5 pe-5">
           <div class="col shadow-lg border p-3">
                <div class="d-flex justify-content-between">
                        <h4>Services</h4>
                        <router-link to="/admin/service/create" class="btn btn-primary btn-sm"><i class="bi bi-plus-circle"></i> Add Service</router-link>
                </div>    
                <table class="table responsive">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Time(in Hrs.)</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                    <tr v-for="service in allServices" :key="service.id">
                        <td>{{service.id}}</td>
                        <td>{{service.name}}</td>
                        <td>{{service.price}}</td>
                        <td>{{ service.timerequired }}</td>
                        <td>
                            <router-link :to="'/admin/service/edit/' + service.id" class="btn btn-warning btn-sm"><i class="bi bi-pencil"></i> Edit</router-link>
                            <button class="btn btn-danger ms-3 btn-sm"><i class="bi bi-trash3"></i> Delete</button>
                        </td>
                    </tr>
                    </tbody>

                </table>
               

            </div>
    </div>

    <div class="row justify-content-center ps-5 pe-5">
           <div class="col shadow-lg border p-3 border">
                <h3>Professionals</h3>
                <table class="table responsive">
                    <thead>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Experience</th>
                        <th>Service Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                    <tr v-for="professional in professionals" :key="professional.id">
                        <td>{{professional.id}}</td>
                        <td>{{professional.email}}</td>
                        <td>{{professional.name}}</td>
                        <td>{{professional.experience}} Years</td>
                        <td>{{ professional.services.join(', ') }}</td>
                        <td><span v-if="professional.active==1" class="badge text-bg-success">Active</span>
                            <span v-else class="badge text-bg-danger">Inactive</span></td>
                        <td>
                            <button class="btn btn-success btn-sm" @click="approveProfessional(professional.id)"><i class="bi bi-check-circle"></i> Approve</button>
                            <button class="btn btn-warning btn-sm ms-3" @click="rejectProfessional(professional.id)"><i class="bi bi-x-circle"></i> Reject</button>
                            <button class="btn btn-danger ms-3 btn-sm"><i class="bi bi-trash3"></i> Delete</button>
                        </td>
                    </tr>
                    </tbody>

                </table>
            </div>
    </div>

        <div class="row justify-content-center ps-5 pe-5">
           <div class="col shadow-lg border p-3 border">
                <h3>Customers</h3>
                <table class="table responsive">
                    <thead>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                    <tr v-for="customer in customers" :key="customer.id">
                        <td>{{customer.id}}</td>
                        <td>{{customer.email}}</td>
                        <td>{{customer.name}}</td>
                        <td>{{customer.address}} Years</td>
                        <td>{{ customer.contact }}</td>
                        <td><span v-if="customer.active==1" class="badge text-bg-success">Active</span>
                            <span v-else class="badge text-bg-danger">Inactive</span></td>
                        <td>
                            <button class="btn btn-success btn-sm" @click="approveCustomer(customer.id)"><i class="bi bi-check-circle"></i> Approve</button>
                            <button class="btn btn-warning btn-sm ms-3" @click="rejectCustomer(customer.id)"><i class="bi bi-x-circle"></i> Reject</button>
                            <button class="btn btn-danger ms-3 btn-sm"><i class="bi bi-trash3"></i> Delete</button>
                        </td>
                    </tr>
                    </tbody>

                </table>
            </div>
    </div>

    `,
    data() {
        return {
            allServices: [],
            professionals:[],
            customers:[],
            serviceRequests:[],
            professionalId:'',
            customerId:'',
            errorMessage:'',
        }
    },
    components: {
        AdminNavbar,
    },
    mounted() {
        this.getServices();
        this.getProfessionals();
        this.getCustomers();
        // this.getServiceRequests();
    },
    methods: {
        async getServices() {
            const url = window.location.origin;
            try {
                const result = await fetch(url + "/api/serviceapi", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'same-origin',
                });
                if (result.ok) {
                    const data = await result.json();
                    this.allServices = data;
                }
                else {
                    const error = await result.json();
                    console.log(error);
                }
            } catch (e) {
                console.log(e);
            }
        },
        async getProfessionals() {
            const url = window.location.origin;
            try {
                const result = await fetch(url + "/admin/professionals", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'same-origin',
                });
                if (result.ok) {
                    const data = await result.json();
                    this.professionals = data;
                }
                else {
                    const error = await result.json();
                    console.log(error);
                }
            } catch (e) {
                console.log(e);
            }
        },
        async getServiceRequests(id) {
            const url = window.location.origin;
            try {
                const result = await fetch(url + "/api/serviceapi", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        professionalId:this.professionalId,
                    }),
                    credentials: "same-origin",  // ensures credentials are sent (like cookies, etc.)
                });
                if (result.ok) {
                    const data = await result.json();
                    this.errorMessage = data;
                }
                else {
                    const error = await result.json();
                    console.log(error);
                }
            } catch (e) {
                console.log(e);
            }
        },
        async approveProfessional(id){
            const url = window.location.origin;
            try {
                const result = await fetch(url + `/admin/approveprofessional/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                });
                if (result.ok) {
                    const data = await result.json();
                    this.errorMessage = data;
                    const updatedProfessional = this.professionals.find(prof => prof.id === id);
                    if (updatedProfessional) {
                        updatedProfessional.active = 1;  // Update to active status
                    }
                }
                else {
                    const error = await result.json();
                    console.log(error);
                }
            } catch (e) {
                console.log(e);
            }
        },
        async rejectProfessional(id){
            const url = window.location.origin;
            try {
                const result = await fetch(url + `/admin/rejectprofessional/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                });
                if (result.ok) {
                    const data = await result.json();
                    this.errorMessage = data;
                    const updatedProfessional = this.professionals.find(prof => prof.id === id);
                    if (updatedProfessional) {
                        updatedProfessional.active = 0;  // Update to active status
                    }
                }
                else {
                    const error = await result.json();
                    console.log(error);
                }
            } catch (e) {
                console.log(e);
            }
        },

        async getCustomers() {
            const url = window.location.origin;
            try {
                const result = await fetch(url + "/admin/customers", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'same-origin',
                });
                if (result.ok) {
                    const data = await result.json();
                    this.customers = data;
                }
                else {
                    const error = await result.json();
                    console.log(error);
                }
            } catch (e) {
                console.log(e);
            }
        },

        async approveCustomer(id){
            const url = window.location.origin;
            try {
                const result = await fetch(url + `/admin/approvecustomer/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                });
                if (result.ok) {
                    const data = await result.json();
                    this.errorMessage = data;
                    const updatedCustomer = this.customers.find(cust => cust.id === id);
                    if (updatedCustomer) {
                        updatedCustomer.active = 1;  // Update to active status
                    }
                }
                else {
                    const error = await result.json();
                    console.log(error);
                }
            } catch (e) {
                console.log(e);
            }
        },
        async rejectCustomer(id){
            const url = window.location.origin;
            try {
                const result = await fetch(url + `/admin/rejectcustomer/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                });
                if (result.ok) {
                    const data = await result.json();
                    this.errorMessage = data;
                    const updatedCustomer = this.customers.find(cust => cust.id === id);
                    if (updatedCustomer) {
                        updatedCustomer.active = 0;  // Update to active status
                    }
                }
                else {
                    const error = await result.json();
                    console.log(error);
                }
            } catch (e) {
                console.log(e);
            }
        },
    },
    computed: {
        current_user() {
            return this.$store.state.current_user;
        },

    },
}

export default AdminDashboard;