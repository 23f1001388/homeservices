import AdminNavbar from "../../components/adminnavbar.js";
import ServiceSearch from "../../components/servicesearch.js";

const AdminSearch = {
    template: `
    <div>
        <AdminNavbar/>
    </div>

   <div class="row justify-content-center ps-5 pe-5">
           <div class="col shadow-lg border p-3">
                <div class="row">
                    <div class="col-6">
                        <h4 class="text-center">Search</h4>
                    </div>
                    <div class="col-6">
                        <div class="input-group">
                            <select v-model="searchType" @change="getSelected" class="form-select">
                                <option value="Select Search Type">Select Search Type</option>
                                <option value="Professional">Professional</option>
                                <option value="Customer">Customer</option>
                                <option value="Service">Service</option>
                                <option value="ServiceRequest">Service Request</option>
                            </select>
        
                            <select v-model="subType" class="form-select">
                                <option value="Select Subtype">Select Subtype</option>
                                <option v-for="(label, value) in subTypes" :key="value" :value="value">{{ label }}</option>
                            </select>
                             <input v-model="searchText"  class="form-control" name="searchText" id="searchText" type="text" placeholder="Type to Search" aria-label="Search" required />
                            <button @click="getSearched" class="btn btn-primary" ><i class="bi bi-search"></i> Search</button>
                        </div>
                    </div>
                </div> 
            </div>
    </div>
    <ServiceSearch :services="allServices" :professionals="professionals" :customers="customers" />
    `,
    components:{
        AdminNavbar,
        ServiceSearch,
    },
    data() {
        return {
            searchType: "Select Search Type",
            subType: "Select Subtype",
            searchText:'',
            allServices: [],
            professionals:[],
            customers:[],
            servicerequests:[],
            errorMessage:'',
            subTypes: {},
            professionalSearch: {
                "By Name": "By Name",
                "By Description": "By Description",
                "By Address": "By Address",
                "By Pincode": "By Pincode",
                "By Contact":"By Contact",
                "By Experience":"By Experience",
                "By Status":"By Status"
            },
            customerSearch: {
                "By Name": "By Name",
                "By Address": "By Address",
                "By Pincode": "By Pincode",
                "By Contact":"By Contact",
                "By Status":"By Status"
            },
            serviceSearch: {
                "By Name": "By Name",
                "By Description": "By Description",
                "By Price": "By Price",
                "By Status": "By Status",
            },
            serviceRequestSearch: {
                "By Service": "By Service",
                "By Professional": "By Professional",
                "By Customer": "By Customer",
                "By Ratings": "By Ratings",
                "By Status": "By Status",
            },
        }
    },
    mounted(){
        this.getServices();
    },
    methods:{
        getSearched(){
            if(this.searchType == "Professional"){
                 this.getProfessionals();
            }
            if(this.searchType == "Customer"){
                this.getCustomers();
            }
            if(this.searchType == "Service"){
                this.getServices();
            }
            if(this.searchType == "ServiceRequest"){
                this.getServiceRequests();
            }
        },
        getSelected(){
            switch (this.searchType) {
                case 'Professional':
                  this.subTypes = this.professionalSearch;
                  break;
                case 'Customer':
                  this.subTypes = this.customerSearch;
                  break;
                case 'Service':
                  this.subTypes = this.serviceSearch;
                  break;
                case 'ServiceRequest':
                  this.subTypes = this.serviceRequestSearch;
                  break;
                default:
                  this.subTypes = {};
                  break;
              }
              // Reset the selected subtype when search type changes
              this.selectedSubType = "Select Subtype";   
       },
        async getServices() {
            // const url = window.location.origin;
            const url = `${window.location.origin}/api/serviceapi`;
            const params = new URLSearchParams();  
            params.append('subType', this.subType); 
            params.append('searchText', this.searchText);
            try {
                const result = await fetch(`${url}?${params.toString()}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'same-origin',
                });
                if (result.ok) {
                    const data = await result.json();
                    console.log(data);
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
            // const url = window.location.origin;
            const url = `${window.location.origin}/search/professionals`;
            const params = new URLSearchParams();  
            params.append('subType', this.subType); 
            params.append('searchText', this.searchText);
            console.log(this.subType,this,searchText)
            try {
                const result = await fetch(`${url}?${params.toString()}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'same-origin',
                });
                if (result.ok) {
                    const data = await result.json();
                    console.log(data);
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
        async getCustomers() {
            // const url = window.location.origin;
            const url = `${window.location.origin}/search/customers`;
            const params = new URLSearchParams();  
            params.append('subType', this.subType); 
            params.append('searchText', this.searchText);
            console.log(this.subType,this,searchText)
            try {
                const result = await fetch(`${url}?${params.toString()}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'same-origin',
                });
                if (result.ok) {
                    const data = await result.json();
                    console.log(data);
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
        async getServiceRequests() {
            // const url = window.location.origin;
            const url = `${window.location.origin}/search/professionals`;
            const params = new URLSearchParams();  
            params.append('subType', this.subType); 
            params.append('searchText', this.searchText);
            console.log(this.subType,this,searchText)
            try {
                const result = await fetch(`${url}?${params.toString()}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'same-origin',
                });
                if (result.ok) {
                    const data = await result.json();
                    console.log(data);
                    this.servicerequests = data;
                }
                else {
                    const error = await result.json();
                    console.log(error);
                }
            } catch (e) {
                console.log(e);
            }
        },
    }
}

export default AdminSearch