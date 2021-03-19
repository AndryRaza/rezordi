const TableaudeBord = {
    template: `
    <section class="container">

        <div class="d-flex justify-content-center align-items-center mb-4">

            <button v-on:click="ajout_utilisateur" class="btn border border-3 border-dark rounded m-auto" > Ajouter un utilisateur <br /> 
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
            </button>

            <button class="btn border border-3 border-dark rounded m-auto"> Faire une réservation <br />
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
            </svg>
            </button>

        </div>

        <div v-if="form_utilisateur" class="d-flex justify-content-center ">
            <form class="w-50 border border-2 border-secondary p-3 rounded">
                <h2> Formulaire d'ajout d'un utilisateur </h2>
                <div class="mb-3 form-floating">
                    <input v-model="form_nom" type="text" class="form-control" name="nom" id="nom" placeholder="Nom " required pattern="[A-Za-z]+" minlength="3" maxlength="255">
                    <label class="form-label" for="nom">Nom*</label>
                    <div v-for="erreur in erreurs">
                        <span v-if="erreur.nom" class="text-danger">
                            {{erreur.nom[0]}}
                        </span>
                    </div>
                </div>

                <div class="mb-3 form-floating">
                    <input v-model="form_prenom" type="text" class="form-control" name="prenom" id="prenom" placeholder="Prénom" required pattern="[A-Za-z-]+" minlength="3" maxlength="255">
                    <label class="form-label" for="prenom">Prénom*</label>
                    <div v-for="erreur in erreurs">
                        <span v-if="erreur.prenom" class="text-danger">
                            {{erreur.prenom[0]}}
                        </span>
                    </div>
                </div>

                <div class="mb-3 form-floating">
                    <input v-model="form_email" type="email" class="form-control" name="email" id="email" placeholder="nom.prenom@mail.fr">
                    <label class="form-label" for="email">Email</label>
                    <div v-for="erreur in erreurs">
                        <span v-if="erreur.email" class="text-danger">
                            {{erreur.email[0]}}
                        </span>
                    </div>
                </div>

                <div class="mb-3 form-floating">
                    <input v-model="form_telephone" type="text" class="form-control" name="telephone" id="telephone" placeholder="0692152585" >
                    <label class="form-label" for="telephone">Téléphone</label>
                    <div v-for="erreur in erreurs">
                        <span v-if="erreur.telephone" class="text-danger">
                            {{erreur.telephone[0]}}
                        </span>
                    </div>
                </div>
    
                <p class="text-muted">Les champs suivis d'un * sont obligatoires.</p>

                <span class="d-flex justify-content-end">
                 <button v-on:click="ajout_utilisateur" class="btn btn-danger mx-3">Annuler</button>
                 <button type="button" v-on:click="envoi_utilisateur" class="btn btn-primary">Ajouter</button>
                </span>

                

            </form>
        </div>

        <h2> Liste des postes </h2>
        <div class="row row-cols-md-6 row-cols-3 p-2 d-flex justify-content-center">
    
         <div
            v-for="poste,id  in postes_func" v-bind:key="poste.id"
            class="col border border-2 border-dark rounded vignette-ordi d-flex justify-content-center shadow-lg p-3 mb-5 bg-body align-items-center flex-column mx-2"
         >
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


        <div class="position-fixed bottom-0 end-0 p-3 " style="z-index: 5">
            <div id="toast_success_ordinateur" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header alert-success">
                    <strong class="me-auto">Ajout réussi</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body alert-success">
                    Un nouveau poste a été ajouté !
                </div>
            </div>
        </div>

        <div class="position-fixed bottom-0 end-0 p-3 " style="z-index: 5">
            <div id="toast_success_utilisateur" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header alert-success">
                    <strong class="me-auto">Ajout réussi</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body alert-success">
                    L'utilisateur a été ajouté !
                </div>
            </div>
        </div>

  </section>
    
    `,
    name: 'TableaudeBord',
    data() {
        return {
            postes: [],
            utilisateurs: [],
            details: [],
            erreurs: [],
            erreur_telephone: null,
            affichage: 10,
            searchUser: '',
            form_utilisateur: false,
            form_reservation: false,
            form_nom: '',
            form_prenom: '',
            form_email: '',
            form_telephone: null
            // Details : Array pour mettre les id qu'on souhaite voir en détails (utilisateurs)
            //Affichage : Le nbre d'utilisateurs qu'on souhaite afficher
            //searchUser: L'utilisateur qu'on souhaite rechercher
            //form_utilisateur: pour afficher ou non le formulaire d'ajout d'un utilisateur 
        }
    },
    computed: {
        utilisateurs_func() {
            let tab = this.utilisateurs.filter((user) => {
                return (user.nom.toLowerCase().includes(this.searchUser.toLowerCase()) || user.prenom.toLowerCase().includes(this.searchUser.toLowerCase()));
            });

            return tab.slice(0, this.affichage);
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
        ajout_ordi() {
            axios
                .post('/ajout_ordinateur')
                .then(response => {
                    this.postes.push(response.data);
                    $('#toast_success_ordinateur').toast('show');
                })
                .catch(error => {
                    console.log(error);
                })
        },
        ajout_utilisateur() {
            if (this.form_utilisateur) {
                this.form_utilisateur = false;
            }
            else {
                this.form_utilisateur = true;
            }
        },
        envoi_utilisateur() {
            axios
                .post('/store_user', {
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    nom: this.form_nom,
                    prenom: this.form_prenom,
                    email: this.form_email,
                    telephone: this.form_telephone
                })
                .then(response => {
                    if (response.data[0] === 'succes') {
                        this.utilisateurs.push(response.data[1]);
                        this.form_nom = '';
                        this.form_prenom = '';
                        this.form_email = '';
                        this.form_telephone = '';
                        $('#toast_success_utilisateur').toast('show');
                    }
                    if (response.data[0] === 'erreur')
                    {     
                        this.erreurs = [];
                        this.erreurs.push(JSON.parse(response.data[1]));
                    }
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