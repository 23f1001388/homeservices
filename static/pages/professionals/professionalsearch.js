import ProfessionalNavbar from "../../components/professionalnavbar.js";

const ProfessionalSearch = {
    template: `
    <div>
        <ProfessionalNavbar/>
    </div>
    `,
    data() {
        return {
            services: [],
            serviceRequests:[],
            serviceProfessionals:[],
            professionalId:'',
        }
    },

    methods:{
        async searchRequests() {
            const url = window.location.origin;
            try {
                const result = await fetch(url + `/professional/search/${this.professionalId}`, {
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
    }
}

export default ProfessionalSearch