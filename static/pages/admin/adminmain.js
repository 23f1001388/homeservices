import AdminNavbar from "../../components/adminnavbar.js";

const AdminMain={
    template:`
    <div>
        <AdminNavbar/>
    </div>
    <div class="row justify-content-center">
        <div class="col-md-6 text-center">
            <router-link to="/admin/service/create" class="btn btn-primary"> <i class="bi bi-plus-circle"></i> Add Service</router-link>
        </div>
    </div>
    `,
    components:{
        AdminNavbar,
    },
    computed:{
        current_user(){
            return this.$store.state.current_user;
        }
    },
}

export default AdminMain;