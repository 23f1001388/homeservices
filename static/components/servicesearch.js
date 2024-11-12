const Search={
    template:`
    <div class="row justify-content-center ps-5 pe-5">
           <div class="col shadow-lg border p-3">
                <div class="d-flex justify-content-end">
                        <h4>Search</h4>
                        <router-link to="/admin/service/create" class="btn btn-primary btn-sm"><i class="bi bi-plus-circle"></i> </router-link>
                </div>   
            </div>
    </div>
    `,
    data(){
        return{
            services:[],
            serviceRequests:[],
            customers:[],
            professionals:[],
        }
    },
    methods:{
        async searchService(searctype){

        },

    },
}

export default Search