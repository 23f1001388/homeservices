import router from "../utils/router.js";

const AdminNavbar={
    template:`<div class="container-fluid">
    <nav class="navbar navbar-expand-lg bg-light navbar-light">
      <div class="container-fluid">
        <router-link class="navbar-brand fs-3" to="/admin/dashboard">ADMIN</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to='/admin/dashboard' class="nav-link active" aria-current="page">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to='/admin/search' class="nav-link">Search</router-link>
            </li>
            <li class="nav-item">
              <router-link to='/admin/summary' class="nav-link" >Summary</router-link>
            </li>
            <li class="nav-item">
              <router-link to='/logout' class="nav-link" >Logout</router-link>
            </li>
           
          </ul>
          <ul class="navbar-nav ms-auto me-3">
            <li>Welcome: {{current_user.email }}</li>
          </ul>
         
         <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-person-circle"></i>
            </button>
            
            <div class="dropdown-menu dropdown-menu-start dropdown-menu-lg-end dropdown-menu-light">
                  <ul class="list-unstyled">
                    <li><button class="dropdown-item" @click="logout">Logout</button></li>
                    <li><button class="dropdown-item" @click="sendEmail">Send Mail</button></li>
                    <li><router-link class="dropdown-item" to="/profile">Profile</router-link></li>
                  </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </div>`,
    methods:{
      logout(){
        this.$store.commit('clearUser');
        // sessionStorage.removeItem('user');
        router.push('/');
      },
      async sendEmail() {
        try {
          const url = window.location.origin;
          const result=await fetch(url + "/sendemail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ to: "tlsetia@gmail.com", subject: "Subjetc Test Mail",body:"Test Message" }),
            credentials:'same-origin',
          });
          if (result.ok) {
            const data=await result.json();
            console.log(data);
            }else{
              const errorMsg=await result.json();
              this.errormessage=errorMsg.message;
              console.error('Mail Falied : ', errorMsg);
            }
        } catch (error) {
          console.error("Fetch error:", error);
          this.errormessage="Error Occured";
        }
      },
    },
    computed:{
      current_user(){
          return this.$store.state.current_user;
      }
  },
}

export default AdminNavbar;