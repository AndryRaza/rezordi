@extends('includes.layout')

@section('content')

<h1>Poste n°{{$ordinateur->id}}</h1>

<table class="table mt-1">
    <thead>
        <th scope="col">Nom</th>
        <th scope="col">Début :</th>
        <th scope="col">Fin: </th>
        <th scope="col"></th>
    </thead>

    <tbody>
        @foreach($creneaux as $creneau)
        <tr>
            <td>{{$creneau->utilisateur->nom . ' '. $creneau->utilisateur->prenom}}</td>
            <td>{{$creneau->heure_debut}}</td>
            <td>{{$creneau->heure_fin}}</td>
            <td><button href="#" class="btn btn-success">Commencer la session</button>
            </td>
        </tr>
        @endforeach
    </tbody>

</table>

@endsection