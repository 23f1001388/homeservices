const ServiceSearch={
    template:`
    <div class="row justify-content-center ps-5 pe-5">
           <div class="col shadow-lg border p-3"> 
                <h4>Services</h4>
                <table class="table responsive">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Time(in Hrs.)</th>
         
                    </thead>
                    <tbody>
                    <tr v-for="service in services" :key="service.id">
                        <td>{{service.id}}</td>
                        <td>{{service.name}}</td>
                        <td>{{service.price}}</td>
                        <td>{{ service.timerequired }}</td>
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
          }
      },
      watch: {
        services(newServices) {
          console.log('Updated services:', newServices);
        }
      }
}

export default ServiceSearch