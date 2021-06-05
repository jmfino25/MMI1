var DeleteVillageois = Vue.component('DeleteVillageois',{
    template:`
    <div class="card">
        <form @submit.prevent="submit">
        <div class="card-header">
            <h6>Suppression d'un villageois</h6>                    
        </div>
        
        <div class="card-body table-responsive">
    
            <div class="form-group">

                <div class="container">
                    <div class="row">
                        <div class="col-5">
                            <img :src="villageois.image" 
                                id="previewImage" 
                                class="img-responsive" 
                                alt="image du villageois"
                                style="width:50%;border:1px solid lightgray;margin:10px;"
                            />
                        </div>

                        <div class="col-7">
                            <div class="input-group input-group-sm">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Nom</span>
                                </div>
                                <input 
                                    type="text" 
                                    class="form-control"
                                    disabled
                                    v-model="villageois.nom"
                                />
                            </div>
                            <br/>
                            <div class="input-group input-group-sm">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Adresse</span>
                                </div>
                                <input type="text" class="form-control" value="3° chène à droite de la carrière" disabled />
                            </div>
                            <br/>
                            <div class="input-group input-group-sm">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Lieu</span>
                                </div>
                                <input type="text" class="form-control" 
                                v-model="villageois.adresse" disabled />
                            </div>
                            <br/>
                            <div class="input-group input-group-sm">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Spécialité</span>
                                </div>
                                <input type="text" class="form-control" 
                                v-model="villageois.laSpecialite.nom" 
                                disabled />
                            </div>
                            <br/>
                            <div class="input-group input-group-sm">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Latitude</span>
                                </div>
                                <input type="number" class="form-control" disabled 
                                v-model="villageois.latitude" required />
                            </div>
                            <br/>
                            <div class="input-group input-group-sm">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Longitude</span>
                                </div>
                                <input type="number" class="form-control" disabled 
                                v-model="villageois.longitude" required />
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="alert alert-warning text-center">Voulez-vous vraiment supprimer ce villageois ?</div>  
            </div>
        </div>
        <div class="card-footer">
            <button type="button" 
                class="btn btn-default float-left" 
                id="cancel">
                <router-link to="/villageois">
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
            villageois:{    // Villageois à supprimer
                id:0,
                nom:null,
                adresse:null,
                image:null,
                leLieuHabitat:{
                    id:0,
                    nom:null
                },
                laSpecialite:{
                    id:0,
                    nom:null
                },
                latitude:0,
                longitude:0
            }
        }
    },
    mounted(){

        // Récupérer le id du villageois
        this.villageois.id = this.$route.params.id;
        // Objet FormData pour passage de paramètres
        let params = new FormData();
        // Ajout id du villageois
        params.append("id",        this.villageois.id);
        axios.post(backEnd.getVillageois, params)
        // Réponse et récupération des données
        .then(response => {
            // Récupérer les données
            this.villageois = response.data;
            console.log("villageois : ", this.villageois);
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
            // Ajout des paramètres de la batailles
            params.append("id",             this.villageois.id);

            // Appel Ajax via axios suppression
            axios.post(backEnd.deleteVillageois, params)
            // Réponse et récupération des données
            .then(response => {
                // Récupérer les données
                console.log("retour de la promesse : ",response);
                // Redirection sur la liste des villageois
                this.$router.push('/villageois');
            })
            // Cas d'erreur
            .catch(error =>{
                console.log("Erreur : ", error);
            })

        }



    }
})