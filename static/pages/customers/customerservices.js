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
                        <th>Professional</th>
                        <th>Actions</th>
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
                            <button class="btn btn-primary btn-sm" @click="createServiceRequest(service.professional_id)"><i class="bi bi-bag-plus"></i> Book Service</button>
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
            serviceProfessionals: [],
            service:'',
            serviceId:null,
            professionalId:'',
        }
    },
    components: {
        CustomerNavbar,
    },
    created(){
        this.serviceId = this.$route.params.id;
        this.getServiceProfessional();
        // this.getService();
        // this.getServices();
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

        async getServiceProfessional() {
            const url = window.location.origin;
            try {
                const result = await fetch(url + `/service/professionals/${this.serviceId}`, {
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


        async createServiceRequest(professional_id){
            try{
                const url=window.location.origin;
                const user=JSON.parse(sessionStorage.getItem('user'));
                const customerId=user.id;
                console.log(customerId);
                const result=await fetch(url + `/servicerequest/create/${professional_id}`,{
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        serviceId:this.serviceId,
                        customerId: customerId,
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