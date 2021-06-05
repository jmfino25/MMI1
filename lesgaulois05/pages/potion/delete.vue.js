var DeletePotion = Vue.component('DeletePotion',{
    template:`
    <div class="card">
        <form id="form" @submit.prevent="submit">
            <div class="card-header">
                <h6>Suppression d'une potion</h6>
            </div>
                
            <div class="card-body">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Nom</span>
                    </div>
                    <input type="text" class="form-control" 
                    disabled id="nom" v-model="potion.nom"/>
                </div>
            </div>
            <br/> 
                <div class="alert alert-warning text-center">
                    Voulez-vous vraiment supprimer cette potion ?
                </div>
            <div class="card-footer">
                <button type="button" 
                    class="btn btn-default float-left" 
                    id="cancel">
                    <router-link to="/potions">
                        Cancel
                    </router-link>
                </button>                 
                <button type="submit" class="btn btn-primary float-right">Supprimer</button> 
            </div>
        </form>
    </div>
    `,
    data(){
        return{
            potion:{
                id:0,
                nom:null}   // La potion à supprimer
        }
    },
    mounted(){
        // Récupérer le id de la potion
        this.potion.id = this.$route.params.id;
         // Objet FormData pour passage de paramètres
         let params = new FormData();
         // Ajout id de la potion
         params.append("id",        this.potion.id);
         axios.post(backEnd.getPotion, params)
         // Réponse et récupération des données
         .then(response => {
             // Récupérer les données
             this.potion = response.data;
console.log("potion : ", this.potion);
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
            params.append("id",        this.potion.id);

            // Appel Ajax via axios modification de la potion
            axios.post(backEnd.deletePotion, params)
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