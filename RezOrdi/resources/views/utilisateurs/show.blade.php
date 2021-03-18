@extends('includes.layout')

@section('content')

<h1>{{$utilisateur->nom . ' ' . $utilisateur->prenom}} </h1>

<section class="row row-cols-md-2 row-cols-1">

    <div class="col">
        <h2>Coordonnées</h2>
        <table class="table table-bordered">
            <tbody>

                <tr>
                    <td class="table-dark fw-bolder">Crée le</td>
                    <td>{{ date('d-m-Y H:i:s',strtotime($utilisateur->created_at))}}</td>
                </tr>
                <tr>
                    <td class="table-dark fw-bolder">Dernière modification le </td>
                    <td>{{ date('d-m-Y H:i:s',strtotime($utilisateur->updated_at))}}</td>
                </tr>



            </tbody>
        </table>
        <table class="table table-bordered">
            <tbody>

                <tr>
                    <td class="table-dark fw-bolder">Nom</td>
                    <td>{{$utilisateur->nom}}</td>
                </tr>
                <tr>
                    <td class="table-dark fw-bolder">Prénom</td>
                    <td>{{$utilisateur->prenom}}</td>
                </tr>
                <tr>
                    <td class="table-dark fw-bolder">Email</td>
                    <td>{{$utilisateur->email}}</td>
                </tr>
                <tr>
                    <td class="table-dark fw-bolder">Téléphone</td>
                    <td>{{$utilisateur->telephone}}</td>
                </tr>

            </tbody>
        </table>



    </div>

    <div class="col">
        <h2>Réservations</h2>
        <table class="table table-bordered">
            <thead>
                <th>Date</th>
                <th>Heure de début</th>
                <th>Heure de fin</th>
            </thead>
            <tbody>

                @if ($creneaux === [])
                <tr>
                    <td> Pas de réservations</td>
                </tr>
                @endif

                @foreach($creneaux as $creneau)
                <tr>
                    <td>{{$creneau->date}}</td>
                    <td>{{$creneau->heure_debut}}</td>
                    <td>{{$creneau->heure_fin}}</td>
                </tr>
                @endforeach
            </tbody>

        </table>


    </div>

</section>

<span class="d-flex justify-content-end"> <a href="{{route('utilisateurs.edit',$utilisateur->id)}}"><button class="btn btn-primary">Modifier</button></a></span>

@endsection