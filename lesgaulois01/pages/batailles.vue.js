var Batailles = Vue.component('Batailles',{
    template:`
    <div class="card">
        <div class="card-header">
            <h5>
                Les batailles
                <span class="float-right" title="Création d'une bataille">
                <a href="../pages/bataille/newBataille.html" >
                    <i class="fa fa-plus fa-lg"></i>
                </a>
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
            listeBatailles:[] // Liste des batailles
        }
    },
    filters:{
        dateFrancais:function(value){
            return moment(value).format("DD/MM/YYYY");
        }
    },
    mounted(){
       // Requete Ajax via axios pour la liste des batailles
        // du backEnd
        axios.get('http://localhost/jsonGaulois/listeBatailles.php')
        // Récupération des données
        .then(response => {
            this.listeBatailles = response.data;
            console.log("Liste des batailles", this.listeBatailles);
        })        
        // Cas d'erreurs
        .catch(error =>{
            console.log(error);
        })               
    },
    methods:{

    }
})