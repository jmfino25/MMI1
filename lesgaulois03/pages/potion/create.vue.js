var CreatePotion = Vue.component('CreatePotion',{
    template:`
    <div class="card">
        <form id="form" @submit.prevent="submit">
            <div class="card-header">
                <h6>Creation d'une potion</h6>
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
                        v-model="potion.nom"
                        placeholder="Nom potion" 
                        required>
                </div>
            </div>

            <div class="card-footer">
                <button type="button" 
                    class="btn btn-default float-left" 
                    id="cancel">
                    <router-link to="/potions">
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
            potion:{nom:null}   // La potion à créer
        }
    },
    mounted(){
    },
    methods:{

        submit:function(){

            // Objet FormData pour passage de paramètres
            let params = new FormData();
            // Ajout du nom de la potion
            params.append("nom",        this.potion.nom);

            // Appel Ajax via axios création de la potion
            axios.post(backEnd.createPotion, params)
            // Réponse et récupération des données
            .then(response => {
                // Récupérer les données
                console.log("retour de la promesse : ",response);
                // Redirection sur la liste des potions
                this.$router.push('/potions');
            })
            // Cas d'erreur
            .catch(error =>{
                console.log("Erreur : ", error);
            })




        }

    }
})