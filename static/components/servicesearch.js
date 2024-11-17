const ServiceSearch={
    template:`
    <div class="row justify-content-center ps-5 pe-5">
           <div class="col shadow-lg border p-3"> 
                <h4>Services</h4>
                <table class="table responsive">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Time(in Hrs.)</th>
         
                    </thead>
                    <tbody>
                    <tr v-for="service in services" :key="service.id">
                        <td>{{service.id}}</td>
                        <td>{{service.name}}</td>
                        <td>{{service.description}}</td>
                        <td>{{service.price}}</td>
                        <td>{{ service.timerequired }}</td>
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
    props: {
        services: {
            type: Array,  // Make sure services is an array
            required: true,  // This prop is required
            default: () => []  // Provide a default empty array if no services are passed
          },
          professionals: {
            type: Array,  // Make sure services is an array
            required: true,  // This prop is required
            default: () => []  // Provide a default empty array if no services are passed
          },
          customers: {
            type: Array,  // Make sure services is an array
            required: true,  // This prop is required
            default: () => []  // Provide a default empty array if no services are passed
          },

      },
      watch: {
        services(newServices) {
          console.log('Updated services:', newServices);
        }
      }
}

export default ServiceSearch