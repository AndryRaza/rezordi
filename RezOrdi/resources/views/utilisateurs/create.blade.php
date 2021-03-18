@extends('includes.layout')

@section('content')
<h1>Gestionnaire d'utilisateurs</h1>

<div class="accordion" id="accordionExample">
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              <h2>  Créer un utilisateur </h2>
            </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <form action="{{route('utilisateurs.store')}}" method="POST">
                    @csrf
                    <div class="mb-3 form-floating">
                        <input type="text" class="form-control" name="nom" id="nom" placeholder="Nom " value="{{old('nom')}}" required pattern="[A-Za-z]+" minlength="3" maxlength="255">
                        <label class="form-label" for="nom">Nom</label>
                        @if($errors->has('nom'))
                        <div class="text-danger">{{ $errors->first('nom') }}</div>
                        @endif
                    </div>

                    <div class="mb-3 form-floating">
                        <input type="text" class="form-control" name="prenom" id="prenom" placeholder="Prénom " value="{{old('prenom')}}" required pattern="[A-Za-z-]+" minlength="3" maxlength="255">
                        <label class="form-label" for="prenom">Prénom</label>
                        @if($errors->has('prenom'))
                        <div class="text-danger">{{ $errors->first('prenom') }}</div>
                        @endif
                    </div>

                    <div class="mb-3 form-floating">
                        <input type="email" class="form-control" name="email" id="email" placeholder="nom.prenom@mail.fr" value="{{old('email')}}">
                        <label class="form-label" for="email">Email</label>
                        @if($errors->has('email'))
                        <div class="text-danger">{{ $errors->first('email') }}</div>
                        @endif
                    </div>

                    <div class="mb-3 form-floating">
                        <input type="phone" class="form-control" name="phone" id="phone" placeholder="0692152585" value="{{old('phone')}}">
                        <label class="form-label" for="phone">Téléphone</label>
                        @if($errors->has('phone'))
                        <div class="text-danger">{{ $errors->first('phone') }}</div>
                        @endif
                    </div>

                    <span class="d-flex justify-content-end"> <button type="submit" class="btn btn-primary">Créer</button></span>

                </form>
            </div>
        </div>
    </div>
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
              <h2>  Liste des utilisateurs </h2>
            </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <table class="table table-bordered table-striped table-hover" id="laravel_datatable_utilisateur_detail">
                    <thead>
                        <tr>
                            <th scope="col">Nom</th>
                            <th scope="col">Prénom</th>
                            <th scope="col">Crée le </th>
                            <th scope="col">Modifié le </th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>


@endsection

@push('scripts')
<script src="{{asset('javascript/datatable_utilisateur.js')}}">
</script>
@endpush