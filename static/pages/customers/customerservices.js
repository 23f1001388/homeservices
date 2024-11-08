import CustomerNavbar from "../../components/customernavbar.js";

const CustomerServices = {
    template: `
    <div>
        <CustomerNavbar/>
    </div>
    <div class="row justify-content-center p-5">
           <div class="col shadow-lg border p-3">
                <h4 class="text-center">Best Services in {{service.name}}</h4>
                    
                <table class="table responsive">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Time(in Hrs.)</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{{service.id}}</td>
                        <td>{{service.name}}</td>
                        <td>{{service.price}}</td>
                        <td>{{ service.timerequired }}</td>
                        <td>
                            <router-link :to="'/customer/service/book/' + service.id" class="btn btn-primary btn-sm"><i class="bi bi-bag-plus"></i> Book Service</router-link>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
    </div>
    <div class="row justify-content-center p-5">
           <div class="col shadow-lg border p-3">
                <h4>Service History</h4>
                <table class="table responsive">
                    <thead>
                        <th>ID</th>
                        <th>Service Name</th>
                        <th>Professional Name</th>
                        <th>Phone No</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                    <tr v-for="servicerequest in servicerequests" :key="servicerequest.id">
                        <td>{{servicerequest.id}}</td>
                        <td>{{servicerequest.name}}</td>
                        <td>{{servicerequest.professionals.name}}</td>
                        <td>{{ servicerequest.professionals.contact }}</td>
                        <td>{{servicerequest.status}}</td>
                        <td>
                            <router-link :to="'/admin/service/edit/' + service.id" class="btn btn-warning btn-sm"><i class="bi bi-pencil"></i> Edit</router-link>
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
            services: [],
            service:'',
            serviceId:null,
        }
    },
    components: {
        CustomerNavbar,
    },
    created(){
        this.serviceId = this.$route.params.id;
        this.getService();
        this.getServices();
      },
    methods: {
        async getService() {
            const url = window.location.origin;
            try {
                const result = await fetch(url + `/api/serviceapi/${this.serviceId}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'same-origin',
                });
                if (result.ok) {
                    const data = await result.json();
                    console.log(data);
                    this.service=data;
                }
                else {
                    const error = await result.json();
                    console.log(error);
                }
            } catch (e) {
                console.log(e);
            }
        },

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
                    this.services = data;
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
    
}

export default CustomerServices;