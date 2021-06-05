var DeleteBataille = Vue.component('DeleteBataille',{
    template:`
    <div class="card">
        <form id="form" @submit.prevent="submit">
            <div class="card-header">
                <h6>Suppression d'une bataille</h6>
            </div>
                
            <div class="card-body">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Nom</span>
                    </div>
                    <input type="text" class="form-control" id="nom" 
                        disabled="" v-model="bataille.nom" />
                </div>
                <br/>
                <div class="input-group"> 
                    <div class="input-group-prepend">
                        <span class="input-group-text">Date</span>
                    </div>
                    <input type="date" class="form-control" 
                        name="date" id="date" disabled v-model="bataille.date" />
                </div>
                <br/>
                <div class="input-group"> 
                    <div class="input-group-prepend">
                        <span class="input-group-text">Lieu</span>
                    </div>
                    <input type="text" class="form-control" 
                        disabled v-model="bataille.leLieu.nom" />
                </div>
                <br/> 
                <div class="alert alert-warning text-center">
                Voulez-vous vraiment supprimer cette bataille ?
                </div>  
            </div>


            <div class="card-footer">
                <button type="button" 
                    class="btn btn-default float-left" 
                    id="cancel">
                    <router-link to="/batailles">
                        Cancel
                    </router-link>
                </button>      
                <button type="submit" class="btn btn-primary float-right">
                    Valider
                </button> 
            </div>
        </form>
    </div>    
    `,
    data(){
        return{
            bataille:{ // Bataille à supprimer
                id:0,
                nom:null,
                date: '0045-01-01',
                leLieu:{
                    id:0,
                    nom:null
                }
            },
        }
    },
    mounted(){
        // Récupérer le id de la bataille
         this.bataille.id = this.$route.params.id;
         // Objet FormData pour passage de paramètres
         let params = new FormData();
         // Ajout id de la bataille
         params.append("id",        this.bataille.id);

         axios.post(backEnd.getBataille, params)
         // Réponse et récupération des données
         .then(response => {
             // Récupérer les données
             this.bataille = response.data;
             // Récupérer la partie date de la date de la bataille
             let d = this.bataille.date.split(" ");
             this.bataille.date = d[0];
console.log("bataille : ", this.bataille);
        })
         // Cas d'erreur
         .catch(error =>{
             console.log("Erreur : ", error);
         })

    },
    methods:{
        submit:function(){
            // Objet FormData pour passage de paramètres
            let params = new FormData();
            // Ajout des paramètres de la bataille
            params.append("id",         this.bataille.id);

            // Appel Ajax via axios suppression de la bataille
            axios.post(backEnd.deleteBataille, params)
            // Réponse et récupération des données
            .then(response => {
                // Récupérer les données
                console.log("retour de la promesse : ",response);
                // Redirection sur la liste des batailles
                this.$router.push('/batailles');
            })
            // Cas d'erreur
            .catch(error =>{
                console.log("Erreur : ", error);
            })

        }

    }
})