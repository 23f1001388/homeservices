import CustomerNavbar from "../../components/customernavbar.js";

const CustomerDashboard = {
    template: `
    <div>
        <CustomerNavbar/>
    </div>
    `,
    data() {
        return {
            allServices: [],
        }
    },
    components: {
        CustomerNavbar,
    },
    mounted() {
        this.getServices();
    },
    methods: {
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
    },
    computed: {
        current_user() {
            return this.$store.state.current_user;
        },

    },
}

export default CustomerDashboard;