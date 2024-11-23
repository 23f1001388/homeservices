import CustomerNavbar from "../../components/customernavbar.js";

const CustomerDashboard = {
    template: `
    <div>
        <CustomerNavbar/>
    </div>
    <div class="row justify-content-center p-5">
            <h4 class="text-center">Looking For ?</h4>
            <div v-for="service in serviceProfessionals" :key="service.id" class="cols-4 shadow-lg border p-3 rounded-5 m-2 d-flex flex-column justify-content-between">
                <h5 class="text-center">{{ service.service_name }}</h5>
                <p class="text-center"><strong>Service Price:</strong> Rs. {{ service.service_price }}</p>
                <p class="text-center"><strong>Time Required:</strong> {{ service.service_timerequired }}  Hours</p>
                <p class="text-center"><strong>Professional Id:</strong> {{ service.professional_id }}</p>
                <p class="text-center"><strong>Professional Name:</strong> {{ service.professional_name }}</p>                
                <router-link :to="'/customer/services/' + service.service_id" class="btn btn-dark mx-auto btn-sm"><i class="bi bi-binoculars"></i> Explore</router-link>
            </div>
    </div>

    <div class="row justify-content-center p-5">
           <div class="col shadow-lg border p-3 rounded-5">
                <h4>Service History</h4>
                <table class="table responsive">
                    <thead>
                        <th>ID</th>
                        <th>Service Name</th>
                        <th>Professional Name</th>
                        <th>Phone No</th>
                        <th>Status</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                    <tr v-for="servicerequest in serviceRequests" :key="servicerequest.id">
                        <td>{{servicerequest.id}}</td>
                        <td>{{servicerequest.service_name}}</td>
                        <td>{{servicerequest.professional_name}}</td>
                        <td>{{ servicerequest.professional_contact }}</td>
                        <td>
                            <span v-if="servicerequest.status==='Requested'" class="badge text-bg-primary">{{servicerequest.status}}</span>
                            <span v-if="servicerequest.status==='Assigned'" class="badge text-bg-warning">{{servicerequest.status}}</span>
                            <span v-if="servicerequest.status==='Accepted'" class="badge text-bg-success">{{servicerequest.status}}</span>
                            <span v-if="servicerequest.status==='Closed'" class="badge text-bg-danger">{{servicerequest.status}}</span>
                        </td>
                        <td>
                            <router-link :to="'/customer/feedback/' + servicerequest.id" class="btn btn-danger rounded-3 ms-3 btn-sm"><i class="bi bi-trash3"></i> Close It ? </router-link>
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
            serviceRequests:[],
            serviceProfessionals:[],
            customerId:'',
        }
    },
    components: {
        CustomerNavbar,
    },
    created(){
        const user=JSON.parse(sessionStorage.getItem('user'));
        this.customerId=user.user_id;
        console.log("User Id is: " ,user.id);
    },  
    mounted() {
        this.getServicesRequests();
        this.getServicesProfessionals();
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
                    console.log(data);
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

        async getServicesProfessionals() {
            const url = window.location.origin;
            try {
                const result = await fetch(url + "/service/professionals", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'same-origin',
                });
                if (result.ok) {
                    const data = await result.json();
                    console.log(data);
                    this.serviceProfessionals = data;
                }
                else {
                    const error = await result.json();
                    console.log(error);
                }
            } catch (e) {
                console.log(e);
            }
        },

        async getServicesRequests() {
            const url = window.location.origin;

            try {
                const result = await fetch(url + `/servicerequests/bycustomers/${this.customerId}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'same-origin',
                });
                if (result.ok) {
                    const data = await result.json();
                    console.log("Service Request Data: ",data);
                    this.serviceRequests = data;
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

export default CustomerDashboard;