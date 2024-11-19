import AdminNavbar from "../../components/adminnavbar.js";


const AdminSummary = {
    template: `
        <div>
            <AdminNavbar/>
        </div>

        <div class="row row-cols-2 justtify-content-center p-5" >

            <div class="col-6 shadow-lg border p-3" id="ratings">
                <div class="card h-100">
                    <div class="card-header">
                        <h3 class="text-center">Users Charts</h3>
                    </div>
                    <div class="card-body">
                        <canvas id="myChart"></canvas>
                    </div>
                </div>
            </div> 
            <div class="col-6 shadow-lg border p-3" id="requests">
                <div class="card h-100">
                    <div class="card-header">
                        <h3 class="text-center">Campaign Progress Chart</h3>
                    </div>
                    <div class="card-body">
                        <canvas id="campaignProgressChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

    `,
    components:{
        AdminNavbar,
    },
    data(){
        return{
            userData: [12, 19, 3, 5, 2, 3],
            campaignData: [5, 10, 15, 7, 3, 9]
        }
    },
    mounted() {
        // Initialize the Users Charts
        const myChart = new Chart(document.getElementById("myChart"), {
          type: "bar", // You can change the chart type here
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
              label: "Users",
              data: this.userData,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
    
        // Initialize the Campaign Progress Chart
        const campaignProgressChart = new Chart(document.getElementById("campaignProgressChart"), {
          type: "line", // You can change the chart type here
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
              label: "Campaign Progress",
              data: this.campaignData,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
}

export default AdminSummary
