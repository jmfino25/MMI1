var Villageois = Vue.component('Villageois',{
    template:`
    <div class="card">
        <div class="card-header">
            <h5>Les villageois
                <span class="float-right" title="Créer un nouveau villageois">
                <router-link to="/createVillageois" >
                    <i class="fa fa-plus fa-lg"></i>
                </router-link>
                </span>
            </h5>
        </div>                
        <div class="card-body cardGlobale">

        <div class="card cardGaulois" v-for="villageois in listeVillageois" :key="villageois.id">
            <img class="card-img-top imageSmall center" 
            :src="villageois.image" :alt="villageois.nom">
            <div class="card-body">
            <h4 class="card-title titre">{{villageois.nom}}</h4>
            <p class="card-text texte">
                {{villageois.laSpecialite.nom}}
                <br/>
                {{villageois.leLieuHabitat.nom}}
            </p>
            <div class="btn btn-primary paveFct">
                <span title="Supprimer le villageois" >
                <a href="villageois/suppVillageois.html" >
                    <i class="fa fa-times fa-lg faPave"></i>
                </a>
                </span>
                <span title="Modifier le villageois" >
                <router-link :to="{ name : 'UpdateVillageois', params : {id: villageois.id} }" >
                    <i class="fa fa-edit fa-lg faPave"></i>
                </router-link>
                </span>            
                <span title="Mettre à jour les droits aux potions" >
                <a href="villageois/droitPotion.html" >
                    <i class="fa fa-glass fa-lg faPave"></i>
                </a>
                </span>            
                <span title="Mettre à jour les consommations de potion" >
                <a href="villageois/consoPotion.html" >
                    <i class="fa fa-hourglass-3 fa-lg faPave"></i>
                </a>
                </span>            
            </div>
            </div>
        </div>

    </div>
    </div>
    `,
    data(){
        return{
            listeVillageois:[] // Structure de données des villageois
        }
    },
    mounted(){
         // Appel Ajax via axios liste des villageois
         axios.get(backEnd.listeVillageois)
         // Réponse et récupération des données
         .then(response => {
             // Récupérer les données
             this.listeVillageois = response.data;
             console.log("Liste des villageois : ",this.listeVillageois);
         })
         // Cas d'erreur
         .catch(error =>{
             console.log("Erreur : ", error);
         })        
    },
    methods:{

    }
})