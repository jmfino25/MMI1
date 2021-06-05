var Potions = Vue.component('Potions',{
    template:`
    <div class="card">
        <div class="card-header">
            <h5> Les potions
                <span class="float-right" title="Créer une nouvelle potion">
                <router-link to="createPotion" >
                    <i class="fa fa-plus fa-lg"></i>
                </router-link>
                </span>
            </h5>                    
        </div>
        <div class="card-body table-responsive">
            <table class="table ">
                <thead class="thead-light">
                    <tr>                      
                        <th scope="col">Nom Potion</th>
                        <th scope="col">Nb Composants</th>
                        <th scope="col">Action</th>
                    </tr>                        
                </thead>                        
                <tbody>
                    <tr v-for="potion in listePotions" :key="potion.id">
                        <td>{{potion.nom}}</td>
                        <td>{{potion.lesIngredients.length}}</td>
                        <td>
                            <span title="Supprimer la potion">
                                <a href="../pages/potion/suppPotion.html">
                                    <i class="fa fa-times fa-lg" ></i>
                                </a>
                            </span>
                            <span  title="Modifier la potion">
                                <router-link :to="{ name:'UpdatePotion', params: {id: potion.id} }">
                                    <i class="fa fa-edit fa-lg" ></i>
                                </router-link>
                            </span>    
                            <span title="Gérer la composiion de la potion">
                                <a href="../pages/potion/compositionPotion.html" >
                                    <i class="fa fa-balance-scale fa-lg" ></i>
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
            listePotions:[] // Structure des données pour les potions
        }
    },
    mounted(){
        // Appel Ajax via axios liste des potions
        axios.get(backEnd.listePotions)
        // Réponse et récupération des données
        .then(response => {
            // Récupérer les données
            this.listePotions = response.data;
            console.log("Liste des potions : ",this.listePotions);
        })
        // Cas d'erreur
        .catch(error =>{
            console.log("Erreur : ", error);
        })
    },
    methods:{

    }
})