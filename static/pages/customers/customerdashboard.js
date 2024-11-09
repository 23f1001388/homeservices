import CustomerNavbar from "../../components/customernavbar.js";

const CustomerDashboard = {
    template: `
    <div>
        <CustomerNavbar/>
    </div>
    <div class="row justify-content-center p-5">
            <h4 class="text-center">Lookin For ?</h4>
            <div v-for="service in services" :key="service.id" class="col-4 shadow-lg border p-3 rounded-5 m-2 d-flex flex-column justify-content-between">
                <h5 class="text-center">{{ service.name }}</h5>
                <p><strong>Price:</strong> Rs. {{ service.price }}</p>
                <p><strong>Time Required:</strong> {{ service.timerequired }} Hours</p>
                <router-link :to="'/customer/services/' + service.id" class="btn btn-dark mx-auto btn-sm"><i class="bi bi-binoculars"></i> Explore</router-link>
            </div>
    </div>

    <div class="row justify-content-center p-5">
            <h4 class="text-center">Lookin For ?</h4>
            <div v-for="service in serviceProfessionals" :key="service.id" class="cols-4 shadow-lg border p-3 rounded-5 m-2 d-flex flex-column justify-content-between">
                <h5 class="text-center">{{ service.service_name }}</h5>
                <p><strong>Service Price:</strong> Rs. {{ service.service_price }}</p>
                <p><strong>Time Required:</strong> {{ service.service_timerequired }}  Hours</p>
                <p><strong>Professional Id:</strong> {{ service.professional_id }}</p>
                <p><strong>Professional Name:</strong> {{ service.professional_name }}</p>                
                <router-link :to="'/customer/services/' + service.service_id" class="btn btn-dark mx-auto btn-sm"><i class="bi bi-binoculars"></i> Explore</router-link>
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
            serviceProfessionals:[],
        }
    },
    components: {
        CustomerNavbar,
    },
    mounted() {
        this.getServices();
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

    },
    computed: {
        current_user() {
            return this.$store.state.current_user;
        },

    },
}

export default CustomerDashboard;