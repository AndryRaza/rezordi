@extends('includes.layout')

@section('content')

<h1>Gestionnaire des réservations</h1>

<div class="container w-25  mb-3 text-center">
    @include('flash::message')
</div>

<div class="accordion" id="accordionExample">
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
               <h2> Créer une réservation </h2>
            </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <form action="{{route('creneaux.store')}}" method="POST">
                    @csrf
                    <div class="mb-3 form-floating">
                        <input type="date" class="form-control" name="date" id="date" placeholder="Date" value="{{old('date')}}" required>
                        <label class="form-label" for="date">Date</label>
                        @if($errors->has('date'))
                        <div class="text-danger">{{ $errors->first('date') }}</div>
                        @endif
                    </div>

                    <div class="mb-3">
                        <div class="row row-cols-2">
                            <div class="col px-2">
                                <label class="form-label" for="heure_debut">Début</label>
                                <select class="form-control" name="heure_debut" id="heure_debut">
                                    @for($i = 6;$i < 24;$i++) <option value="{{$i < 10 ? '0'.$i : $i}}">{{$i < 10 ? '0'.$i.'h' : $i.'h'}}</option>
                                        @endfor
                                </select>
                                @if($errors->has('heure_debut'))
                                <div class="text-danger">{{ $errors->first('heure_debut') }}</div>
                                @endif
                            </div>
                            <div class="col px-2">
                                <label class="form-label" for="heure_fin">Fin</label>
                                <select class="form-control" name="heure_fin" id="heure_fin">
                                    @for($i = 6;$i < 24;$i++) <option value="{{$i < 10 ? '0'.$i : $i}}">{{$i < 10 ? '0'.$i.'h' : $i.'h'}}</option>
                                        @endfor
                                </select>

                                @if($errors->has('heure_fin'))
                                <div class="text-danger">{{ $errors->first('heure_fin') }}</div>
                                @endif
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="utilisateur">Utilisateur</label>
                        <select class="form-control" name="utilisateur" id="utilisateur">
                            @foreach($utilisateurs as $utilisateur)
                            <option value="{{$utilisateur->id}}">{{$utilisateur->nom . ' '. $utilisateur->prenom}} </option>
                            @endforeach
                        </select>

                        @if($errors->has('utilisateur'))
                        <div class="text-danger">{{ $errors->first('utilisateur') }}</div>
                        @endif
                    </div>

                    <div class="mb-3 form-floating">
                        <select class="form-control" name="poste">
                            @foreach($ordinateurs as $ordinateur)
                            <option value="{{$ordinateur->id}}">{{$ordinateur->id}}</option>
                            @endforeach
                        </select>
                        <label class="form-label" for="poste">Poste n°</label>
                        @if($errors->has('poste'))
                        <div class="text-danger">{{ $errors->first('poste') }}</div>
                        @endif
                    </div>

                    <span class="d-flex justify-content-end"><button type="submit" class="btn btn-primary">Réserver</button></span>
                </form>
            </div>
        </div>
    </div>
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
              <h2> Liste des réservations </h2>
            </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <table class="table table-bordered table-striped table-hover" id="laravel_datatable_creneaux_detail">
                    <thead>
                        <tr>
                            <th scope="col">Utilisateur</th>
                            <th scope="col">Date</th>
                            <th scope="col">Début</th>
                            <th scope="col">Fin</th>
                            <th scope="col">Poste</th>
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
<script src="{{asset('javascript/datatable_creneaux.js')}}">
</script>
<script>
    $('#utilisateur').selectize();
    $('#heure_debut').selectize();
    $('#heure_fin').selectize();
</script>
@endpush