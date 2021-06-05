var Batailles = Vue.component('Batailles',{
    template:`
    <div class="card">
        <div class="card-header">
            <h5>
                Les batailles
                <span class="float-right" title="Création d'une bataille">
                <router-link to="/createBataille">
                    <i class="fa fa-plus fa-lg"></i>
                </router-link>
                </span>
            </h5>                    
        </div>
        <div class="card-body table-responsive">
        <table class="table ">
        <thead class="thead-light">
            <tr>                      
            <th scope="col">Nom Bataille</th>
            <th scope="col">Date</th>
            <th scope="col">Lieu</th>
            <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="bataille in listeBatailles" :key="bataille.id">
                <td>{{bataille.nom}}</td>
                <td>{{bataille.date | dateFrancais}}</td>
                <td>{{bataille.leLieu.nom}}</td>
                <td>
                <span title="Supprimer la bataille">
                        <a href="../pages/bataille/suppBataille.html">
                            <i class="fa fa-times fa-lg" ></i>
                        </a>
                    </span>
                <span title="Modifier la bataille" >
                        <a href="../pages/bataille/modifBataille.html" >
                            <i class="fa fa-edit fa-lg" ></i>
                        </a>
                </span>    
                <span title="Gérer les participants de la bataille" >
                        <a href="../pages/bataille/participBataille.html" >
                            <i class="fa fa-users fa-lg" ></i>
                        </a>
                </span>               
                </td>
            </tr>

        </tbody>
        </table>

        </div>	
    </div>
    `,
    data(){
        return{
            listeBatailles:[] // Structure de données pour les batailles
        }
    },
    filters:{ // Filtre de formatage des dates en français
        dateFrancais:function(valeur){
            return moment(valeur).format("DD/MM/YYYY");
        }
    },
    mounted(){
        // Appel Ajax via axios liste des batailles
        axios.get(backEnd.listeBatailles)
        // Réponse et récupération des données
        .then(response => {
            // Récupérer les données
            this.listeBatailles = response.data;
            console.log("Liste des batailles : ",this.listeBatailles);
        })
        // Cas d'erreur
        .catch(error =>{
            console.log("Erreur : ", error);
        })        
    },
    methods:{

    }
})