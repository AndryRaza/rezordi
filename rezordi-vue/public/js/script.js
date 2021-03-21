const TableaudeBord = {
    template: `
    <section>

        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
            <button class="nav-link active" id="accueil-tab" data-bs-toggle="tab" data-bs-target="#accueil" type="button" role="tab"
                aria-controls="accueil" aria-selected="true">Accueil</button>
            </li>
            <li class="nav-item" role="presentation">
            <button class="nav-link" id="utilisateurs-tab" data-bs-toggle="tab" data-bs-target="#utilisateurs" type="button" role="tab"
                aria-controls="utilisateurs" aria-selected="false">Utilisateurs</button>
            </li>
            <li class="nav-item" role="presentation">
            <button class="nav-link" id="reservations-tab" data-bs-toggle="tab" data-bs-target="#reservations" type="button" role="tab"
                aria-controls="reservations" aria-selected="false">Réservations</button>
            </li>
        </ul>


        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active border border-1 border-secondary rounded py-2" id="accueil" role="tabpanel" aria-labelledby="accueil-tab">
            <div class="d-flex justify-content-center align-items-center mb-4">

            <button v-on:click="ajout_utilisateur" class="btn border border-3 border-dark rounded m-auto" > Ajouter un utilisateur <br /> 
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
            </button>

            <button v-on:click="ajout_reservation" class="btn border border-3 border-dark rounded m-auto"> Faire une réservation <br />
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                </svg>
            </button>

        </div>

        <div v-if="form_utilisateur" class="d-flex justify-content-center ">
            <form class="w-50 border border-2 border-secondary p-3 rounded">
                <h2> Formulaire d'ajout d'un utilisateur </h2>
                <div class="mb-3 form-floating">
                    <input v-model="form_nom" type="text" class="form-control" name="nom" id="nom" placeholder="Nom" >
                    <label class="form-label" for="nom">Nom*</label>
                    <div v-for="erreur in erreurs">
                        <span v-if="erreur.nom" class="text-danger">
                            {{erreur.nom[0]}}
                        </span>
                    </div>
                </div>

                <div class="mb-3 form-floating">
                    <input v-model="form_prenom" type="text" class="form-control" name="prenom" id="prenom" placeholder="Prénom"  >
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


        <div v-if="form_reservation" class="d-flex justify-content-center align-items-center"> 
            <form class="w-50 border border-2 border-secondary p-3 rounded">  
                <h2>Ajouter une réservation </h2>
                <div class="mb-3 form-floating">
                    <input v-model="form_date" type="date" class="form-control" name="date" id="date" placeholder="Date">
                    <label class="form-label" for="date">Date</label>
                    <div v-for="erreur in erreurs">
                        <span v-if="erreur.date" class="text-danger">
                            {{erreur.date[0]}}
                        </span>
                    </div>
                </div>
                
                <div class="mb-3">
                    <div class="row row-cols-2">
                    
                        <div class="col px-2">
                            <label class="form-label" for="heure_debut">Début</label>
                            <select v-model="form_heure_debut" class="form-control" name="heure_debut" id="heure_debut">
                                    <option v-for="i in heures" v-bind:value="i.heure"> {{i.heure}}h</option>
                            </select>
                            <div v-for="erreur in erreurs">
                                <span v-if="erreur.heure_debut" class="text-danger">
                                    {{erreur.heure_debut[0]}}
                                </span>
                            </div>
                        </div>

                        <div class="col px-2">
                            <label class="form-label" for="heure_fin">Fin</label>
                            <select v-model="form_heure_fin" class="form-control" name="heure_fin" id="heure_fin">
                                    <option v-for="i in heures" v-bind:value="i.heure">{{i.heure}}h</option>
                            </select>
                            <div v-for="erreur in erreurs">
                                <span v-if="erreur.heure_fin" class="text-danger">
                                    {{erreur.heure_fin[0]}}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>


                <div class="mb-3 form-floating">
                    <select v-model="form_utilisateur_reservation" class="form-control" name="utilisateur" id="utilisateur" autocomplete=on >
                        <option v-for="utilisateur, id in utilisateurs" v-bind:value="utilisateur.id"> {{utilisateur.nom}} {{utilisateur.prenom}} </option>
                    </select>
                    <label class="form-label" for="utilisateur">Utilisateur</label>
                    <div v-for="erreur in erreurs">
                        <span v-if="erreur.utilisateur" class="text-danger">
                            {{erreur.utilisateur[0]}}
                        </span>
                    </div>
                </div>

                <div class="mb-3 form-floating">
                    <select v-model="form_poste_reservation" class="form-control" name="poste">
                        <option v-for="poste,id in postes"  v-bind:value="poste.id">{{poste.id}}</option>
                    </select>
                    <label class="form-label" for="poste">Poste n°</label>
                    <div v-for="erreur in erreurs">
                        <span v-if="erreur.poste" class="text-danger">
                            {{erreur.poste[0]}}
                        </span>
                    </div>
                </div>

                <p class="text-muted">Tous les champs sont obligatoires.</p>

                <span class="d-flex justify-content-end">
                    <button v-on:click="ajout_reservation" class="btn btn-danger mx-3">Annuler</button>
                    <button type="button" v-on:click="envoi_reservation" class="btn btn-primary">Ajouter</button>
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
                            <button v-on:click="eteindre_ordinateur(poste.id,poste.en_marche)" class="bg-transparent border border-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-power pb-2" viewBox="0 0 16 16">
                                    <path d="M7.5 1v7h1V1h-1z"/>
                                    <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
                                </svg>
                            </button>
                            <button v-on:click="suppression_ordinateur(poste.id)" class="bg-transparent border border-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash pb-2"
                                viewBox="0 0 16 16">
                                <path
                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path fill-rule="evenodd"
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                </svg>
                            </button>
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
            
            </div>

            <div class="tab-pane fade border border-1 border-secondary rounded py-2 px-1" id="utilisateurs" role="tabpanel" aria-labelledby="utilisateurs-tab">

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

                <div class="table-responsive">
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
                            <tr>
                                <td colspan=5>

                                    <div v-if="details.includes(id)" class="w-100">
                                        <h3 class="mr-5">Plus de détails</h3>
                                        <form>

                                            <div class="mb-3 form-floating">
                                                <input v-model="form_nom_modification = utilisateur.nom" type="text" class="form-control" name="nom_modification" id="nom_modification" placeholder="Nom " required pattern="[A-Za-z . ]+" minlength="3" maxlength="255">
                                                <label class="form-label" for="nom_modification">Nom*</label>
                                                <div v-for="erreur in erreurs">
                                                    <span v-if="erreur.nom_modification" class="text-danger">
                                                        {{erreur.nom_modification[0]}}
                                                    </span>
                                                </div>
                                            </div>
                        
                                            <div class="mb-3 form-floating">
                                                <input v-model="form_prenom_modification = utilisateur.prenom" type="text" class="form-control" name="prenom_modification" id="prenom_modification" placeholder="Prénom" required pattern="[A-Za-z-]+" minlength="3" maxlength="255">
                                                <label class="form-label" for="prenom_modification">Prénom*</label>
                                                <div v-for="erreur in erreurs">
                                                    <span v-if="erreur.prenom_modification" class="text-danger">
                                                        {{erreur.prenom_modification[0]}}
                                                    </span>
                                                </div>
                                            </div>
                            
                                            <div class="mb-3 form-floating">
                                                <input v-model="form_email_modification = utilisateur.email" type="email" class="form-control" name="email_modification" id="email_modification" placeholder="nom.prenom@mail.fr">
                                                <label class="form-label" for="email_modification">Email</label>
                                                <div v-for="erreur in erreurs">
                                                    <span v-if="erreur.email_modification" class="text-danger">
                                                        {{erreur.email_modification[0]}}
                                                    </span>
                                                </div>
                                            </div>
                        
                                            <div class="mb-3 form-floating">
                                                <input v-model="form_telephone_modification = utilisateur.telephone" type="text" class="form-control" name="telephone_modification" id="telephone_modification" placeholder="0692152585" >
                                                <label class="form-label" for="telephone_modification">Téléphone</label>
                                                <div v-for="erreur in erreurs">
                                                    <span v-if="erreur.telephone_modification" class="text-danger">
                                                        {{erreur.telephone_modification[0]}}
                                                    </span>
                                                </div>
                                            </div>
                        
                                        
                                            <p class="text-muted">Les champs suivis d'un * sont obligatoires.</p>
                                            <span class="d-flex justify-content-end">
                                                <button type="button" v-on:click="suppression_utilisateur(utilisateur.id)" class="btn btn-danger mx-3">Supprimer</button>
                                                
                                                <button type="button" v-on:click="envoi_utilisateur_modification(utilisateur.id)" class="btn btn-primary">Modifier</button>
                                            </span>

                                        </form>                               
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            <div class="tab-pane fade border border-1 border-secondary rounded py-2 px-1" id="reservations" role="tabpanel" aria-labelledby="reservations-tab">
                <h2>Liste des réservations</h2>

                <div class="row row-cols-2 my-3">

                    <div class="col d-flex justify-content-start">
                        <label for="select" class="form-label mt-1 mx-2">Affichage : </label>
                        <select v-model="affichage_reservation" class="form-control w-50 h-100 mx-2" id="select">
                            <option v-bind:value="reservations.length">Tout montrer</option>
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>

                        <input v-model="today" type="checkbox" class="btn-check mx-2" id="today" autocomplete="off">
                        <label class="btn btn-outline-secondary" for="today">Aujourd'hui</label>

                    </div>

                    <div class="col d-flex justify-content-end">
                        <label class="form-label mt-1 mx-3"  for="search_">Recherche : </label>
                        <input v-model="searchReservation" class="form-control w-50 h-100 " type="search" id="search_"/>
                    </div>

                </div>

                <div class="table-responsive">
                    <table class="table" >
                        <thead style="background-color:black;color:white;font-size:20px;"> 
                            <th>#</th>
                            <th>Utilisateur</th>
                            <th>Date (AAAA-MM-JJ)</th>
                            <th>Début</th>
                            <th>Fin</th>
                            <th>Poste</th>
                            <th></th>
                            <th></th>
                        </thead>

                        <tbody v-for="reservation,id in reservations_func" v-bind:key="reservation.id">
                            <tr> 
                                <td>{{reservation.id}} </td>
                                <td>{{reservation.nom}}{{reservation.prenom}} </td>
                                <td>{{reservation.date}} </td>
                                <td>{{reservation.heure_debut}} </td>
                                <td>{{reservation.heure_fin}} </td>
                                <td>{{reservation.poste}} </td>
                                <td><button v-on:click="openModificationReservation(reservation.id)" class="btn btn-primary"> Modifier </button></td>
                                <td><button v-on:click="suppression_reservation(reservation.id)" class="btn btn-danger"> Supprimer </button></td>
                            </tr>
                            <tr>
                            <td colspan=8>
                                <div v-if="modification_reservation.includes(reservation.id)" class="">
                                
                                    <form class="w-100">  
                                        <h3>Modifier </h3>
                                        <div class="mb-3 form-floating">
                                            <input v-model="form_date_modification=reservation.date" type="date" class="form-control" name="date" id="date_modification" placeholder="Date" required>
                                            <label class="form-label" for="date_modification">Date</label>
                                            <div v-for="erreur in erreurs">
                                                <span v-if="erreur.date_modification" class="text-danger">
                                                    {{erreur.date_modification[0]}}
                                                </span>
                                            </div>
                                        </div>
                                
                                        <div class="mb-3">
                                            <div class="row row-cols-2">
                                    
                                                <div class="col px-2">
                                                    <label class="form-label" for="heure_debut">Début</label>
                                                    <select v-model="form_heure_debut_modification" class="form-control" name="heure_debut" id="heure_debut_modification">
                                                            <option v-for="i in heures" v-bind:value="i.heure" > {{i.heure}}h</option>
                                                    </select>
                                                    <div v-for="erreur in erreurs">
                                                        <span v-if="erreur.heure_debut_modification" class="text-danger">
                                                            {{erreur.heure_debut_modification[0]}}
                                                        </span>
                                                    </div>  
                                                </div>

                                                <div class="col px-2">
                                                    <label class="form-label" for="heure_fin_modification">Fin</label>
                                                    <select v-model="form_heure_fin_modification" class="form-control" name="heure_fin" id="heure_fin_modification">
                                                            <option v-for="i in heures" v-bind:value="i.heure">{{i.heure}}h</option>
                                                    </select>
                                                    <div v-for="erreur in erreurs">
                                                        <span v-if="erreur.heure_fin_modification" class="text-danger">
                                                            {{erreur.heure_fin_modification[0]}}
                                                        </span>
                                                    </div> 
                                                </div>

                                            </div>
                                        </div>


                                        <div class="mb-3 form-floating">
                                            <select v-model="form_utilisateur_reservation_modification = reservation.utilisateur_id" class="form-control" name="utilisateur" id="utilisateur_modification">
                                                <option v-for="utilisateur, id in utilisateurs" v-bind:value="utilisateur.id"> {{utilisateur.nom}} {{utilisateur.prenom}} </option>
                                            </select>
                                            <label class="form-label" for="utilisateur_modification">Utilisateur</label>
                                            <div v-for="erreur in erreurs">
                                                <span v-if="erreur.utilisateur_modification" class="text-danger">
                                                    {{erreur.utilisateur_modification[0]}}
                                                </span>
                                            </div> 
                                        </div>

                                        <div class="mb-3 form-floating">
                                            <select v-model="form_poste_reservation_modification = reservation.poste" class="form-control" name="poste" id="poste_modification">
                                                <option v-for="poste,id in postes"  v-bind:value="poste.id">{{poste.id}}</option>
                                            </select>
                                            <label class="form-label" for="poste_modification">Poste n°</label>
                                            <div v-for="erreur in erreurs">
                                                <span v-if="erreur.poste_modification" class="text-danger">
                                                    {{erreur.poste_modification[0]}}
                                                </span>
                                            </div>
                                        </div>


                                        <span class="d-flex justify-content-end">
                                            <button type="button" v-on:click="envoi_reservation_modification(reservation.id)" class="btn btn-primary">Modifier</button>
                                        </span>

                                    </form>
                                </div>
                                </td>
                            </tr>
                        </tbody>
                    
                    </table>
                </div>
            </div>
        </div>


        
  
               

  
           
  

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

        <div class="position-fixed bottom-0 end-0 p-3 " style="z-index: 5">
            <div id="toast_success_reservation" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header alert-success">
                    <strong class="me-auto">Ajout réussi</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body alert-success">
                    La réservation a été ajoutée !
                </div>
            </div>
        </div>

        <div class="position-fixed bottom-0 end-0 p-3 " style="z-index: 5">
            <div id="toast_success_reservation_modification" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header alert-success">
                    <strong class="me-auto">Modification réussie</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body alert-success">
                    La modification a été effectuée!
                </div>
            </div>
        </div>

        <div class="position-fixed bottom-0 end-0 p-3 " style="z-index: 5">
            <div id="toast_fail_reservation" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header ">
                    <strong class="me-auto">Problème</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body alert-danger">
                    Ce créneau horaire est déjà réservé pour cette date et ce poste !
                </div>
            </div>
        </div>

        <div class="position-fixed bottom-0 end-0 p-3 " style="z-index: 5">
            <div id="toast_suppression_creneau" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header ">
                    <strong class="me-auto">Succès</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body alert-success">
                   La réservation a été supprimée ! 
                </div>
            </div>
        </div>

        <div class="position-fixed bottom-0 end-0 p-3 " style="z-index: 5">
            <div id="toast_suppression_utilisateur" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header ">
                    <strong class="me-auto">Succès</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body alert-success">
                   L'utilisateur a été supprimé ! 
                </div>
            </div>
        </div>

        <div class="position-fixed bottom-0 end-0 p-3 " style="z-index: 5">
            <div id="toast_suppression_ordinateur" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header ">
                    <strong class="me-auto">Succès</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body alert-success">
                   Le poste a été supprimé ! 
                </div>
            </div>
        </div>

        <div class="position-fixed bottom-0 end-0 p-3 " style="z-index: 5">
            <div id="toast_success_utilisateur_modification" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header ">
                    <strong class="me-auto">Succès</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body alert-success">
                   La modification a été effectuée !
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
            reservations: [],
            details: [],
            modification_reservation: [],
            erreurs: [],
            erreur_telephone: null,
            affichage: 10,
            affichage_reservation: 10,
            searchUser: '',
            searchReservation: '',
            today: false,

            form_utilisateur: false,
            form_reservation: false,

            form_nom: '',
            form_prenom: '',
            form_email: '',
            form_telephone: null,

            form_nom_modification: '',
            form_prenom_modification: '',
            form_email_modification: '',
            form_telephone_modification: null,

            form_date: '',
            form_heure_debut: null,
            form_heure_fin: '',
            form_utilisateur_reservation: '',
            form_poste_reservation: '',

            form_date_modification: '',
            form_heure_debut_modification: '',
            form_heure_fin_modification: '',
            form_utilisateur_reservation_modification: '',
            form_poste_reservation_modification: ''
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
        },
        reservations_func() {

            var date = new Date();
            date_year = date.getFullYear();
            date_month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1).toString() : date.getMonth() + 1;
            date_day = date.getDate() < 10 ? "0" + (date.getDate()).toString() : date.getDate();

            date_str = date_year + "-" + date_month + "-" + date_day;

            if (this.today) {

                let tab = this.reservations.filter((reservation) => {
                    return ((reservation.nom.toLowerCase().includes(this.searchReservation.toLowerCase()) || reservation.prenom.toLowerCase().includes(this.searchReservation.toLowerCase())) && reservation.date.toLowerCase().includes(date_str))
                })
                return tab.slice(0, this.affichage_reservation);
            }


            let tab = this.reservations.filter((reservation) => {
                return (reservation.nom.toLowerCase().includes(this.searchReservation.toLowerCase()) || reservation.prenom.toLowerCase().includes(this.searchReservation.toLowerCase()) || reservation.date.toLowerCase().includes(this.searchReservation.toLowerCase()))
            })
            return tab.slice(0, this.affichage_reservation);
        },
        heures() {
            let heures = [];
            for (i = 6; i < 24; i++) {
                if (i < 10) {
                    heures.push({ id: i, heure: '0' + i });
                }
                else { heures.push({ id: i, heure: '' + i }); }
            }
            return heures;
        }
    },
    methods: {
        openDetail(id) {

            if (this.details === []) {
                this.details.push(id);
            }


            if (this.details.includes(id)) {
                this.details = [];
            }

            else {
                this.details = [];
                this.details.push(id);
            }

        },
        openModificationReservation(id) {

            let tab = this.reservations_func.filter(res => res.id == id);
            this.form_heure_debut_modification = tab[0].heure_debut.substr(0, 2);
            this.form_heure_fin_modification = tab[0].heure_fin.substr(0, 2);

            //Si aucune modification n'est ouverte c'est facile on push l'id pour ouvrir
            if (this.modification_reservation === []) {
                this.modification_reservation.push(id);
            }

            //Si on appuie deux fois sur le même bouton modifier, on va fermer la fenetre donc tableau vide
            if (this.modification_reservation.includes(id)) {
                this.modification_reservation = [];
            }
            //Sinon si on appuie sur un autre bouton, on remet le tableau vide et on push le nouveau id, la nouvelle fenêtre
            else {
                this.modification_reservation = [];
                this.modification_reservation.push(id);
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
                this.form_reservation = false;
            }
        },
        ajout_reservation() {
            if (this.form_reservation) {
                this.form_reservation = false;
            }
            else {
                this.form_reservation = true;
                this.form_utilisateur = false;
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
                    if (response.data[0] === 'erreur') {
                        this.erreurs = [];
                        this.erreurs.push(JSON.parse(response.data[1]));
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        envoi_reservation() {
            axios
                .post('/store_reservation', {
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    date: this.form_date,
                    heure_debut: this.form_heure_debut,
                    heure_fin: this.form_heure_fin,
                    utilisateur: this.form_utilisateur_reservation,
                    poste: this.form_poste_reservation
                })
                .then(response => {
                    if (response.data === 'erreur_creneau_pris') {
                        this.form_date = '';
                        $('#toast_fail_reservation').toast('show');
                    }
                    if (response.data[0] === 'succes') {
                        this.form_date = '';
                        this.form_heure_debut = '';
                        this.form_heure_fin = '';
                        this.form_utilisateur_reservation = '';
                        this.form_poste_reservation = '';
                        $('#toast_success_reservation').toast('show');

                        this.reservations.push({
                            created_at: response.data[1],
                            date: response.data[2],
                            heure_debut: response.data[3],
                            heure_fin: response.data[4],
                            id: response.data[5],
                            nom: response.data[6],
                            poste:response.data[7],
                            prenom: response.data[8],
                            utilisateur_id: response.data[9]
                        })


                    }
                    if (response.data[0] === 'erreur') {
                        this.erreurs = [];
                        this.erreurs.push(JSON.parse(response.data[1]));
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        envoi_utilisateur_modification(id) {
            axios
                .post('/modification_utilisateur/' + id, {
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    nom_modification: this.form_nom_modification,
                    prenom_modification: this.form_prenom_modification,
                    email_modification: this.form_email_modification,
                    telephone_modification: this.form_telephone_modification,
                })
                .then(response => {
                    if (response.data[0] === 'succes') {
                        this.form_nom_modification = '';
                        this.form_prenom_modification = '';
                        this.form_email_modification = '';
                        this.form_telephone_modification = '';
                        $('#toast_success_utilisateur_modification').toast('show');
                        this.details = [];
                        this.erreurs = [];
                    }
                    if (response.data[0] === 'erreur') {
                        this.erreurs = [];
                        this.erreurs.push(JSON.parse(response.data[1]));
                    }
                })
                .catch(error => {
                    console.log(error);
                })

        },

        envoi_reservation_modification(id) {
            axios
                .post('/modification_reservation/' + id, {
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    date_modification: this.form_date_modification,
                    heure_debut_modification: this.form_heure_debut_modification,
                    heure_fin_modification: this.form_heure_fin_modification,
                    utilisateur_modification: this.form_utilisateur_reservation_modification,
                    poste_modification: this.form_poste_reservation_modification
                })
                .then(response => {
                    if (response.data === 'erreur_creneau_pris') {
                        $('#toast_fail_reservation').toast('show');
                    }
                    if (response.data[0] === 'succes') {

                        this.form_date_modification = '';
                        this.form_heure_debut_modification = '';
                        this.form_heure_fin_modification = '';
                        this.form_utilisateur_reservation_modification = '';
                        this.form_poste_reservation_modification = '';
                        this.modification_reservation = [];
                        $('#toast_success_reservation_modification').toast('show');

                        
                        this.reservations.filter(res => res.id == id)[0].created_at = response.data[1];
                        this.reservations.filter(res => res.id == id)[0].date = response.data[2];
                        this.reservations.filter(res => res.id == id)[0].heure_debut = response.data[3];
                        this.reservations.filter(res => res.id == id)[0].heure_fin = response.data[4];
                        this.reservations.filter(res => res.id == id)[0].id = response.data[5];
                        this.reservations.filter(res => res.id == id)[0].nom = response.data[6];
                        this.reservations.filter(res => res.id == id)[0].poste = response.data[7];
                        this.reservations.filter(res => res.id == id)[0].prenom = response.data[8];
                        this.reservations.filter(res => res.id == id)[0].utilisateur_id = response.data[9];
                       

                    }
                    if (response.data[0] === 'erreur') {
                        this.erreurs = [];
                        this.erreurs.push(JSON.parse(response.data[1]));
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        suppression_utilisateur(id) {
            axios
                .post('/delete_user/' + id)
                .then(response => {
                    if (response.data === 'ok') {
                        this.utilisateurs = this.utilisateurs.filter(res => res.id != id);
                        $('#toast_suppression_utilisateur').toast('show');
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        suppression_reservation(id) {
            axios
                .post('/delete_reservation/' + id)
                .then(response => {
                    if (response.data === 'ok') {
                        this.reservations = this.reservations.filter(res => res.id != id);
                        $('#toast_suppression_creneau').toast('show');
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        suppression_ordinateur(id) {
            axios
                .post('/delete_ordinateur/' + id)
                .then(response => {
                    if (response.data === 'ok') {
                        this.postes = this.postes.filter(res => res.id != id);
                        this.reservations = this.reservations.filter(res => res.poste != id);
                        $('#toast_suppression_ordinateur').toast('show');
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        eteindre_ordinateur(id, p) {
            axios
                .post('/power_ordinateur/' + id,
                    {
                        en_marche: p
                    })
                .then(response => {
                    if (response.data[0] === 'ok'){
                        this.postes.filter(res => res.id == id)[0].en_marche = response.data[1];
                    }
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

        axios
            .get('/reservation-liste')
            .then(response => {
                this.reservations = response.data;
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

