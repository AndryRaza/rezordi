@extends('includes.layout')

@section('content')

<h1>Créneaux</h1>

<div class="container w-25  mb-3 text-center">
    @include('flash::message')
</div>

<button class="btn btn-primary mb-2" data-bs-toggle="modal" data-bs-target="#form_creation_reservation">Ajouter une réservation</button>


<table class="table mt-1">
    <thead>
        <th scope="col">Nom</th>
        <th scope="col">Début :</th>
        <th scope="col">Fin: </th>
        <th scope="col">Poste</th>
        <th scope="col"></th>
    </thead>

    <tbody>
        @foreach($creneaux as $creneau)
        <tr>
            <td>{{$creneau->utilisateur->nom . ' '. $creneau->utilisateur->prenom}}</td>
            <td>{{$creneau->heure_debut}}</td>
            <td>{{$creneau->heure_fin}}</td>
            <td>{{'Poste n°'.$creneau->ordinateur->id}}</td>
            <td><a href="/creneaux/{{$creneau->id}}/edit"><button class="btn btn-primary">Modifier</button></a></td>
        </tr>
        @endforeach
    </tbody>

</table>




<div class="modal fade" id="form_creation_reservation" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Ajouter une réservation</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
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
                            <div class="col form-floating px-2">
                                <select class="form-control" name="heure_debut">
                                    @for($i = 6;$i < 24;$i++) <option value="{{$i < 10 ? '0'.$i : $i}}">{{$i < 10 ? '0'.$i.'h' : $i.'h'}}</option>
                                        @endfor
                                </select>
                                <label class="form-label" for="date">Début</label>
                                @if($errors->has('heure_debut'))
                                <div class="text-danger">{{ $errors->first('heure_debut') }}</div>
                                @endif
                            </div>
                            <div class="col form-floating px-2">
                                <select class="form-control" name="heure_fin">
                                    @for($i = 6;$i < 24;$i++) <option value="{{$i < 10 ? '0'.$i : $i}}">{{$i < 10 ? '0'.$i.'h' : $i.'h'}}</option>
                                        @endfor
                                </select>
                                <label class="form-label" for="heure_fin">Fin</label>
                                @if($errors->has('heure_fin'))
                                <div class="text-danger">{{ $errors->first('heure_fin') }}</div>
                                @endif
                            </div>
                        </div>
                    </div>

                    <div class="mb-3 form-floating">
                        <select class="form-control" name="utilisateur">
                            @foreach($utilisateurs as $utilisateur)
                            <option value="{{$utilisateur->id}}">{{$utilisateur->nom . ' '. $utilisateur->prenom}} </option>
                            @endforeach
                        </select>
                        <label class="form-label" for="date">Utilisateur</label>
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

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                <button type="submit" class="btn btn-primary">Ajouter une réservation</button>
                </form>
            </div>

        </div>
    </div>
</div>

@endsection