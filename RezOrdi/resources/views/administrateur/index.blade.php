@extends('includes.layout')

@section('content')

<section class="mb-3">
    <h1 class="mt-4 text-center">Tableau de bord
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-house-fill mr-2 mb-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
            <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
        </svg>
    </h1>

    <div class="container w-25  mb-3 text-center">
        @include('flash::message')
    </div>

    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#form_creation_ordinateur">
        Ajouter un ordinateur
    </button>

    <div class="row row-cols-md-6 row-cols-4">
        @foreach($ordis as $ordi)
        <div class="col mt-2">
            <div class="d-flex flex-column align-items-center border border-4 {{ $ordi->en_marche == 0 ? 'border-success' : 'border-danger' }}">
                <img class="img-fluid w-50" src="{{asset('assets/computer.png')}}">

                <p>{{'Poste n°'.$ordi->id}}</p>

                @if ($ordi->en_marche == 1)
                <p>
                    <a href="/eteindre/{{$ordi->id}}"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-power" viewBox="0 0 16 16">
                            <path d="M7.5 1v7h1V1h-1z" />
                            <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                        </svg>
                    </a>
                </p>
                @endif
            </div>
        </div>
        @endforeach
    </div>
</section>

<section class="row row-cols-md-2 row-cols-1">
    <div class="col">
        <h2 class="text-center">Liste des utilisateurs inscrits</h2>
        <div class="mb-3">
            <table class="table table-bordered table-striped table-hover" id="laravel_datatable">
                <thead>
                    <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Prénom</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>

    <div class="col">
        <h2 class="text-center">Liste des créneaux du {{ date('d-m-Y')}}</h2>
        <div class="mb-3">
            <table class="table table-bordered table-striped table-hover" id="laravel_datatable_creneaux">
                <thead>
                    <tr>
                        <th scope="col">Utilisateur</th>
                        <th scope="col">Début</th>
                        <th scope="col">Fin</th>
                        <th scope="col">Poste</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
            </table>
        </div>

    </div>
</section>




<!-- Modals -->
<div class="modal fade" id="form_creation_utilisateur" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Ajouter un utilisateur</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form action="{{route('utilisateurs.store')}}" method="POST">
                    @csrf
                    <div class="mb-3 form-floating">
                        <input type="text" class="form-control" name="nom" id="nom" placeholder="Nom " value="{{old('nom')}}" required pattern="[A-Za-z]+" minlength="3" maxlength="255">
                        <label class="form-label" for="nom">Nom</label>
                    </div>

                    <div class="mb-3 form-floating">
                        <input type="text" class="form-control" name="prenom" id="prenom" placeholder="Prénom " value="{{old('prenom')}}" required pattern="[A-Za-z-]+" minlength="3" maxlength="255">
                        <label class="form-label" for="prenom">Prénom</label>
                    </div>


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                <button type="submit" class="btn btn-primary">Ajouter un utilisateur</button>
                </form>
            </div>

        </div>
    </div>
</div>

<div class="modal fade" id="form_creation_ordinateur" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Ajouter un ordinateur</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Voulez-vous ajouter un nouvel ordinateur ?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <form action="{{route('ordinateurs.store')}}" method="POST">
                    @csrf
                    <button type="submit" class="btn btn-primary">Oui</button>
                </form>
            </div>
        </div>
    </div>
</div>



@endsection

@push('scripts')
<script src="{{asset('javascript/datatable_utilisateur.js')}}">
</script>
@endpush
@push('scripts')
<script src="{{asset('javascript/datatable_creneaux.js')}}">
</script>
@endpush