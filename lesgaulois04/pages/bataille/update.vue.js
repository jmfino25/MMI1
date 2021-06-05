var UpdateBataille = Vue.component('UpdateBataille',{
    template:`
        <div class="card">
            <form id="form" @submit.prevent="submit">
                <div class="card-header">
                    <h6>Modification d'une bataille</h6>
                </div>
                    
                <div class="card-body">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Nom</span>
                        </div>
                        <input 
                            type="text" 
                            class="form-control" 
                            maxlength="32" 
                            id="nom" 
                            v-model="bataille.nom"
                            required 
                            placeholder="Nom de la bataille" />
                    </div>
                    <br/>
                    <div class="input-group"> 
                        <div class="input-group-prepend">
                            <span class="input-group-text">Date</span>
                        </div>
                        <input 
                            type="date" 
                            class="form-control" 
                            name="date" 
                            id="date" 
                            value="0045-01-01" 
                            v-model="bataille.date"
                        />
                    </div>
                    <br/>
                    <div class="input-group"> 
                        <div class="input-group-prepend">
                            <span class="input-group-text">Lieu</span>
                        </div>
                        <select class="form-control" name="lieu" id="lieu" v-model="bataille.leLieu.id"> 
                            <option disabled selected>Sélectionner un lieu</option> 
                            <option 
                                v-for="lieu in listeLieux" 
                                :key="lieu.id"
                                :value="lieu.id"
                            >
                                {{lieu.nom}}
                            </option>                           
                        </select>
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
                    <button type="submit" class="btn btn-primary float-right">Valider</button> 
                </div>
            </form>
        </div>
    `,
    data(){
        return{
            bataille:{ // Bataille à modifier
                id:0,
                nom:null,
                date: '0045-01-01',
                leLieu:{
                    id:0,
                    nom:null
                }
            },
            listeLieux:[] // Alimentation liste des lieux
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

            // Appel Ajax via axios liste des lieux
            axios.get(backEnd.listeLieux)
            // Réponse et récupération des données
            .then(response => {
                // Récupérer les données
                this.listeLieux = response.data;
                console.log("Liste des lieux : ",this.listeLieux);
            })
            // Cas d'erreur
            .catch(error =>{
                console.log("Erreur : ", error);
            })        

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
            params.append("nom",        this.bataille.nom);
            params.append("date",       this.bataille.date);
            params.append("idLieu",     this.bataille.leLieu.id);

            // Appel Ajax via axios création de la bataille
            axios.post(backEnd.updateBataille, params)
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