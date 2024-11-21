import CustomerNavbar from "../../components/customernavbar.js";

const CustomerServices = {
    template: `
    <div>
        <CustomerNavbar/>
    </div>
    <div class="row justify-content-center p-5">
           <div class="col shadow-lg border p-3">
                <h4 class="text-center">Best Services in {{service.name}}</h4>
                <span v-if="errorMessage">{{erroMessage}}</span>
                <table class="table responsive">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Time(in Hrs.)</th>
                        <th>Professional Id</th>
                        <th>Name</th>
                        <th>Actions/Status</th>
                    </thead>
                    <tbody>
                    <tr v-for="service in serviceProfessionals">
                        <td>{{service.service_id}}</td>
                        <td>{{service.service_name}}</td>
                        <td>{{service.service_price}}</td>
                        <td>{{service.service_timerequired }}</td>
                        <td>{{service.professional_id }}</td>
                        <td>{{service.professional_name }}</td>
                        <td>
                            <button v-if="service.request_status == ''" class="btn btn-primary btn-sm" @click="createServiceRequest(service.professional_id)">
                                <i class="bi bi-bag-plus"></i> Book Service
                            </button>
                            <span class="badge text-bg-warning" v-else>{{ service.request_status }}</span>
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
    `,
    data() {
        return {
            serviceProfessionals: [],
            serviceRequests:[],
            service:'',
            serviceId:null,
            professionalId:'',
            userId:'',
            customerId:'',
        }
    },
    components: {
        CustomerNavbar,
    },
    created(){
        this.serviceId = this.$route.params.id;
        const user=JSON.parse(sessionStorage.getItem('user'));
        this.userId=user.id;
        this.customerId=user.user_id;
      },
    mounted(){
        this.getServicesRequests();
        this.getServiceProfessional();
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

        async getCustomerId() {
            const url = window.location.origin;
            try {
                const result = await fetch(url + `/getcustomerid/${this.userId}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'same-origin',
                });
                if (result.ok) {
                    const data = await result.json();
                    console.log("getCustomer Id is :" + data);
                    this.customerId=data;
                }
                else {
                    const error = await result.json();
                    console.log(error);
                }
            } catch (e) {
                console.log(e);
            }
        },

        async getServiceProfessional() {
            const url = window.location.origin;
            console.log("this.CustomerId" + this.customerId);
            try {
                const result = await fetch(url + `/service/professionals/${this.serviceId}?customerId=${this.customerId}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'same-origin',
                });
                if (result.ok) {
                    const data = await result.json();
                    console.log(data);
                    this.serviceProfessionals=data;
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


        async createServiceRequest(professional_id){
            try{
                const url=window.location.origin;
                const result=await fetch(url + `/servicerequest/create/${professional_id}`,{
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        serviceId:this.serviceId,
                        userId: this.userId,
                    }),
                    credentials: 'same-origin',
                });
    
                if(result.ok){
                    const data=await result.json();
                    console.log(data);
                    this.errorMessage=data.message;
                }else {
                    const errorMsg = await result.json();
                    console.log("Failed to create Service request : ", errorMsg);
                    this.errormessage="Failed to create Service request";
                  }
            }catch (error) {
                console.log("Fetch error:", error);
                this.errormessage="Fetch error:", error;
              }
        },


    },
    
}

export default CustomerServices;