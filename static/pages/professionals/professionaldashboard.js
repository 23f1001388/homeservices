import ProfessionalNavbar from "../../components/professionalnavbar.js";

const ProfessionalDashboard = {
    template: `
    <div>
        <ProfessionalNavbar/>
    </div>

    <div class="row justify-content-center p-5">
           <div class="col shadow-lg border p-3">
                <h4>Service Requests</h4>
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
                            <span v-if="servicerequest.status==='Assigned'" class="badge text-bg-success">{{servicerequest.status}}</span>
                            <span v-if="servicerequest.status==='Closed'" class="badge text-bg-danger">{{servicerequest.status}}</span>
                        </td>
                        <td>
                            <button class="btn btn-danger rounded-3 ms-3 btn-sm"><i class="bi bi-trash3"></i> Close It ? </button>
                        </td>
                    </tr>
                    </tbody>

                </table>
            </div>
    </div>

    <div class="row justify-content-center p-5">
           <div class="col shadow-lg border p-3">
                <h4>Service Closed</h4>
                <table class="table responsive">
                    <thead>
                        <th>ID</th>
                        <th>Service Name</th>
                        <th>Customer Name</th>
                        <th>Phone No</th>
                        <th>Status</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                    <tr v-for="servicerequest in serviceRequests" :key="servicerequest.id">
                        <td>{{servicerequest.id}}</td>
                        <td>{{servicerequest.service_name}}</td>
                        <td>{{servicerequest.customer_name}}</td>
                        <td>{{ servicerequest.customer_contact }}</td>
                        <td>
                            <span v-if="servicerequest.status==='Requested'" class="badge text-bg-primary">{{servicerequest.status}}</span>
                            <span v-if="servicerequest.status==='Assigned'" class="badge text-bg-success">{{servicerequest.status}}</span>
                            <span v-if="servicerequest.status==='Closed'" class="badge text-bg-danger">{{servicerequest.status}}</span>
                        </td>
                        <td>
                            <button class="btn btn-danger rounded-3 ms-3 btn-sm"><i class="bi bi-trash3"></i> Close It ? </button>
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
            professionalId:'',
        }
    },
    components: {
        ProfessionalNavbar,
    },
    created(){
        const user=JSON.parse(sessionStorage.getItem('user'));
        this.professionalId=user.id;
    },  
    mounted() {
        this.getServicesRequests();
    },
    methods: {
        async getServicesRequests() {
            const url = window.location.origin;

            try {
                const result = await fetch(url + `/servicerequests/byprofessionals/${this.professionalId}`, {
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

export default ProfessionalDashboard;