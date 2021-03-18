const TableaudeBord = {
    template: `
    <section class="container">

    
    <div class="row row-cols-md-6 row-cols-3 p-2 d-flex justify-content-center">
      <div
        v-for="poste,id  in postes_func" v-bind:key="poste.id"
        class="col border border-2 border-dark rounded vignette-ordi d-flex justify-content-center shadow-lg p-3 mb-5 bg-body align-items-center flex-column mx-2">
        <h2>Poste n°{{poste.id}}</h2>

        <span v-if="poste.en_marche">
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="red" class="bi bi-laptop img-fluid"
            viewBox="0 0 16 16">
            <path
                d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z" />
            </svg>
        </span>

        <span v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="green" class="bi bi-laptop img-fluid"
            viewBox="0 0 16 16">
            <path
                d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z" />
            </svg>
        </span>



            <p class="text-ordi">
            <span class="d-flex justify-content-around mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye"
                viewBox="0 0 16 16">
                <path
                    d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash"
                viewBox="0 0 16 16">
                <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                </svg>
            </span>
            </p>
        </div>

        <div class="col d-flex justify-content-center align-items-center">

        <!-- Button trigger modal -->
        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" style="border:none;background-color:transparent;height:50px">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Nouveau poste</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Voulez-vous ajouter un nouveau poste ?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                    <button v-on:click="ajout_ordi()" type="submit" class="btn btn-primary" data-bs-dismiss="modal">Oui</button>
                </div>
                </div>
            </div>
        </div>


        </div>

      </div>

        <h2>Liste des utilisateurs</h2>
        <div class="row row-cols-2 my-3">

            <div class="col d-flex justify-content-start">
            <label for="select" class="form-label mt-1 mx-3">Affichage : </label>
                <select v-model="affichage" class="form-control w-50 h-100" id="select">
                    <option v-bind:value="utilisateurs.length">Tout montrer</option>
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>

            <div class="col d-flex justify-content-end">
                <label class="form-label mt-1 mx-3"  for="search">Recherche : </label>
                <input v-model="searchUser" class="form-control w-50 h-100 " type="search" id="search"/>
            </div>

        </div>

        <table class="table">

          <thead class="py-5" style="background-color:black;color:white;font-size:20px;">
            <th>#</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Inscrit le</th>
            <th>Voir</th>
          </thead>

          <tbody v-for="utilisateur,id in utilisateurs_func" v-bind:key="utilisateur.id" >
            <tr>
              <td>{{utilisateur.id}}</td>
              <td>{{utilisateur.nom}}</td>
              <td>{{utilisateur.prenom}}</td>
              <td>{{utilisateur.created_at}}</td>
              <td><button v-on:click="openDetail(id)" class="btn btn-primary"> + de détails </button></td>
                
            </tr>

            <div v-if="details.includes(id)" class="w-100">
            <h3>Plus de détails </h3>
            <p>Nom: {{utilisateur.nom}} <br /> Prénom: {{utilisateur.prenom}} <br /> Email: {{utilisateur.email}}</p>
            </div>


          </tbody>


          </table>



    
  </section>
    
    `,
    name: 'TableaudeBord',
    data() {
        return {
            postes: [],
            utilisateurs: [],
            details: [],
            affichage: 10,
            searchUser:''
            // Details : Array pour mettre les id qu'on souhaite voir en détails (utilisateurs)
            //Affichage : Le nbre d'utilisateurs qu'on souhaite afficher
            //searchUser: L'utilisateur qu'on souhaite rechercher 
        }
    },
    computed: {
        utilisateurs_func() {
            let tab = this.utilisateurs.filter((user) => {
                return (user.nom.toLowerCase().includes(this.searchUser.toLowerCase()) || user.prenom.toLowerCase().includes(this.searchUser.toLowerCase())  );
            });

            return tab.slice(0,this.affichage);
        },
        postes_func() {

            return this.postes;
        }
    },
    methods: {
        openDetail(id) {
            if (!this.details.includes(id)) {
                this.details.push(id);
            }
            else {
                this.details = this.details.filter(index => index != id);
                //On va retirer l'élément en passant par un filtrage, 
                //on accepte tous les id différent de l'id qu'on souhaite retirer
            }
        },
        ajout_ordi(){
            axios
            .post('/ajout_ordinateur')
            .then(response => {
                this.postes.push(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        }
    },

    mounted() {
        axios
            .get('/ordi-liste')
            .then(response => {
                this.postes = response.data;
            })
            .catch(error => {
                console.log(error)
            });

        axios
            .get('/utilisateur-liste')
            .then(response => {
                this.utilisateurs = response.data;
            })
            .catch(error => {
                console.log(error)
            });
    }
}

const router = new VueRouter({
    routes: [
        { path: '/', component: TableaudeBord, name: 'TableaudeBord' }
    ]
});


const vue = new Vue({
    router
}).$mount('#app');