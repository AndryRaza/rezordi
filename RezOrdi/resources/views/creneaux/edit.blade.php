@extends('includes.layout')

@section('content')

<h1>Créneau : {{$creneau->id}}</h1>
<div class="container w-25  mb-3 text-center">
    @include('flash::message')
</div>
<form action="{{route('creneaux.update',$creneau->id)}}" method="POST">
    @csrf
    @method('patch')
    <div class="mb-3 form-floating">
        <input type="date" class="form-control" name="date" id="date" placeholder="Date" value="{{old('date') ? old('date') : $creneau->date }}" required>
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
        <select class="form-control" name="utilisateur" id="utilisateur">
            @foreach($utilisateurs as $utilisateur)
            <option value="{{$utilisateur->id}}" {{$utilisateur->id === $creneau->utilisateur_id ? 'selected' : ''}} > {{$utilisateur->nom . ' '. $utilisateur->prenom}} </option>
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
            <option value="{{$ordinateur->id}}" {{$ordinateur->id === $creneau->ordinateur_id ? 'selected' : ''}}> {{ $ordinateur->id}} </option>
            @endforeach
        </select>
        <label class="form-label" for="poste">Poste n°</label>
        @if($errors->has('poste'))
        <div class="text-danger">{{ $errors->first('poste') }}</div>
        @endif
    </div>

    <span class="d-flex justify-content-end"><button type="submit" class="btn btn-primary">Modifier</button></span>
</form>


@endsection