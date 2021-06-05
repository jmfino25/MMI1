var CreateVillageois = Vue.component('CreateVillageois',{
    template:`
        <div class="card">
        <form @submit="submit" enctype="multipart/form-data">
            <div class="card-header">
                <h6>Création d'un villageois</h6>                    
            </div>
        
            <div class="card-body table-responsive">
        
                <div class="form-group">

                    <div class="container">
                        <div class="row">
                            <div class="col-5">
                                <img 
                                    :src="imageData" 
                                    id="previewImage" 
                                    class="img-responsive" 
                                    alt="image du villageois"
                                    style="width:50%;border:1px solid lightgray;margin:10px;"
                                />
                                <div class="custom-file">
                                <input 
                                    type="file" 
                                    class="custom-file-input" 
                                    @change="previewImage"
                                    id="validatedCustomFile" required                                    
                                    >
                                <label 
                                    class="custom-file-label" 
                                    for="validatedCustomFile">Choisir une image...</label>
                                    <div class="invalid-feedback">Image invalide</div>
                                </div>
                            </div>

                            <div class="col-7">
                                <div class="input-group input-group-sm">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Nom</span>
                                    </div>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        placeholder="Nom du villageois" 
                                        v-model="villageois.nom"
                                        required 
                                    />
                                </div>
                                <br/>
                                <div class="input-group input-group-sm">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Adresse</span>
                                    </div>
                                    <input type="text" 
                                        class="form-control" 
                                        placeholder="Adresse du villageois"  
                                        v-model="villageois.adresse"
                                        required />
                                </div>
                                <br/>
                                <div class="input-group input-group-sm">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Lieu</span>
                                    </div>
                                    <select class="form-control"  v-model="villageois.idLieu" required>
                                        <option disabled selected>Selectionner un lieu</option>
                                        <option v-for="lieu in listeLieux" 
                                            :key="lieu.id" 
                                            :value="lieu.id">
                                            {{lieu.nom}}
                                        </option>
                                    </select>  
                                </div>
                                <br/>
                                <div class="input-group input-group-sm">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Spécialité</span>
                                    </div>
                                    <select class="form-control" v-model="villageois.idSpecialite" required>
                                        <option disabled selected>Selectionner une spécialités</option>
                                        <option v-for="sp in listeSpecialites" 
                                            :key="sp.id" 
                                            :value="sp.id">
                                            {{sp.nom}}
                                        </option>
                                    </select>  
                                </div>
                                <br/>
                                <div class="input-group input-group-sm">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Latitude</span>
                                    </div>
                                    <input type="number" 
                                    class="form-control" 
                                    placeholder="Latitude du villageois" 
                                    v-model="villageois.latitude"
                                    required />
                                </div>
                                <br/>
                                <div class="input-group input-group-sm">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Longitude</span>
                                    </div>
                                    <input type="number" 
                                        class="form-control" 
                                        placeholder="Longitude du villageois" 
                                        v-model="villageois.longitude"                                        
                                        required />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="card-footer">
                    <button type="button" 
                        class="btn btn-default float-left" 
                        id="cancel">
                        <router-link to="villageois">
                            Cancel
                        </router-link>
                    </button>         
                    <button type="submit" class="btn btn-primary float-right">Valider</button> 
                </div>
            </div>
        </form>
    </div>
    `,
    data(){
        return{
            // Pour pour la previsualisation des images
            imageData: host+"imagesGaulois/Asterix.png",
            listeLieux:[],
            listeSpecialites:[],
            villageois:{    // Villageois à créer
                nom:null,
                adresse:null,
                image:null,
                idLieu:0,
                idSpecialite:0,
                latitude:0,
                longitude:0
            }
        }
    },
    mounted(){
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

          // Appel Ajax via axios liste des specialites
          axios.get(backEnd.listeSpecialites)
          // Réponse et récupération des données
          .then(response => {
              // Récupérer les données
              this.listeSpecialites = response.data;
              console.log("Liste des specialites : ",this.listeSpecialites);
          })
          // Cas d'erreur
          .catch(error =>{
              console.log("Erreur : ", error);
          })        



    },
    methods:{

        // Prévisualisation de l'image
		previewImage: function(event) {
			// Au chargement d'un nouvelle image
            // On met à jour l'image du villageois
            this.villageois.image = event.target.files[0];      
            // Reference à l'origine de l'évenement
            var input = event.target;
            // Récupération d'un ou de champs file existants
            // et renseignés
            if (input.files && input.files[0]) {      
              // Création d'un objet FileReader
              // fichier en lecture
              var reader = new FileReader();      
              // Création d'un callback sur event onload
              reader.onload = (e) => {
                // Lecture de l'image en base64 
                // pour la charger dans imageData
                this.imageData = e.target.result;
              }
              // Render de l'image en tant qu'URL
              // Format base64 pour affichage
              reader.readAsDataURL(input.files[0]);        
            }
        },

        submit:function(){

            // Objet FormData pour passage de paramètres
            let params = new FormData();
            // Ajout des paramètres de la batailles
            params.append("nom",            this.villageois.nom);
            params.append("idLieu",         this.villageois.idLieu);
            params.append("idSpecialite",   this.villageois.idSpecialite);
            params.append("adresse",        this.villageois.adresse);
            params.append("image",          this.villageois.image);
            params.append("latitude",       this.villageois.latitude);
            params.append("longitude",      this.villageois.longitude);

            // Appel Ajax via axios création du villageois
            axios.post(backEnd.createVillageois, params)
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