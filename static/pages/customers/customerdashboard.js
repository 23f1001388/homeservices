import CustomerNavbar from "../../components/customernavbar.js";

const CustomerDashboard = {
    template: `
    <div>
        <CustomerNavbar/>
    </div>
    <div class="row justify-content-center">
        <div class="col-md-6 text-center">
            <router-link to="/admin/service/create" class="btn btn-primary"> <i class="bi bi-plus-circle"></i> Add Service</router-link>
            <button @click="getServices" class="btn btn-primary">Get Services</button>
        </div>
    </div>
    <div class="row cols-2">
        <div class="col" v-for="service in allServices" :key="service.id">
            <div class="card">
                <div class="card-header">
                        <h3>{{ service.name }}</h3>
                </div>
                <div class="card-body">
                        <p>Description: {{ service.description }}</p>
                        <p>Price (in Rs.): {{ service.price }}</p>
                        <p>Time Required: {{ service.timerequired }}</p>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            allServices: [],
        }
    },
    components: {
        CustomerNavbar,
    },
    mounted() {
        this.getServices();
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
    },
    computed: {
        current_user() {
            return this.$store.state.current_user;
        },

    },
}

export default CustomerDashboard;