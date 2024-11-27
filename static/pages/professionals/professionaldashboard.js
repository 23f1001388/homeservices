import ProfessionalNavbar from "../../components/professionalnavbar.js";

const ProfessionalDashboard = {
    template: `
    <div>
        <ProfessionalNavbar/>
    </div>

    <div class="row justify-content-center p-5">
           <div class="col shadow-lg border p-3 rounded-5">
                <h4>Service Requests</h4>
                <table class="table responsive mt-3">
                    <thead>
                        <th>ID</th>
                        <th>Request Date/Time</th>
                        <th>Service Name</th>
                        <th>Customer Name</th>
                        <th>Contact No</th>
                        <th>Location</th>
                        <th>Pin Code</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                    <tr v-for="servicerequest in serviceRequests" :key="servicerequest.id">
                        <td>{{servicerequest.id}}</td>
                        <td>{{servicerequest.requestdate}}</td>
                        <td>{{servicerequest.service_name}}</td>
                        <td>{{servicerequest.customer_name}}</td>
                        <td>{{ servicerequest.customer_contact }}</td>
                        <td>{{ servicerequest.customer_address }}</td>
                        <td>{{ servicerequest.customer_pincode }}</td>
                        <td>
                            <span v-if="servicerequest.status==='Requested'" class="badge text-bg-warning">{{servicerequest.status}}</span>
                            <span v-if="servicerequest.status==='Accepted'" class="badge text-bg-success">{{servicerequest.status}}</span>
                            <span v-if="servicerequest.status==='Closed'" class="badge text-bg-danger">{{servicerequest.status}}</span>
                            <span v-if="servicerequest.status==='Rejected'" class="badge text-bg-danger">{{servicerequest.status}}</span>
                        </td>
                        <td>
                            <button v-if="servicerequest.status==='Requested'" class="btn btn-success rounded-3 ms-3 btn-sm" @click="approveServiceRequest(servicerequest.id)"><i class="bi bi-check-circle"></i> Approve </button>
                            <button v-if="servicerequest.status==='Requested'" class="btn btn-danger rounded-3 ms-3 btn-sm" @click="rejectServiceRequest(servicerequest.id)"><i class="bi bi-x-circle"></i> Reject</button>
                        </td>
                    </tr>
                    </tbody>

                </table>
            </div>
    </div>

    <div class="row justify-content-center p-5">
           <div class="col shadow-lg border p-3 rounded-5" >
                <div v-if="closedRequests.length > 0 ">
                <h4>Service Closed</h4>
                <table class="table responsive">
                    <thead>
                        <th>ID</th>
                        <th>Service Name</th>
                        <th>Professional Name</th>
                        <th>Phone No</th>
                        <th>Location</th>
                        <th>Pin Code</th>
                        <th>Ratings</th>
                        <th>Feedback</th>
                        <th>Status</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                    <tr v-for="servicerequest in serviceRequests" :key="servicerequest.id" v-if="servicerequest.status==='Closed'">
                        <td>{{servicerequest.id}}</td>
                        <td>{{servicerequest.service_name}}</td>
                        <td>{{servicerequest.customer_name}}</td>
                        <td>{{ servicerequest.customer_contact }}</td>
                        <td>{{ servicerequest.customer_address }}</td>
                        <td>{{ servicerequest.customer_pincode }}</td>
                        <td>{{ servicerequest.ratings }}</td>
                        <td>{{ servicerequest.remarks }}</td>
                        <td>{{servicerequest.status}}</td>
                    </tr>
                    </tbody>

                </table>
                </div>
                <div v-else>
                    <h5>No Closed Requests</h5>
                </div>
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
        this.professionalId=user.user_id;
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

        async approveServiceRequest(id){
            const url = window.location.origin;
            try {
                const result = await fetch(url + `/professional/servicerequest/approve/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                });
                if (result.ok) {
                    const data = await result.json();
                    this.errorMessage = data;
                    const updatedServiceRequest = this.serviceRequests.find(request => request.id === id);
                    if (updatedServiceRequest) {
                        updatedServiceRequest.status = 'Accepted';  // Update to active status
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

        async rejectServiceRequest(id){
            const url = window.location.origin;
            try {
                const result = await fetch(url + `/professional/servicerequest/reject/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                });
                if (result.ok) {
                    const data = await result.json();
                    this.errorMessage = data;
                    const updatedServiceRequest = this.serviceRequests.find(request => request.id === id);
                    if (updatedServiceRequest) {
                        updatedServiceRequest.status = 'Rejected';  // Update to active status
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
        closedRequests() {
            return this.serviceRequests.filter(record => record.status === 'Closed');
        },
    }
}
export default ProfessionalDashboard;