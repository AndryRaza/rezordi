@extends('includes.layout')

@section('content')

<h1>Modifier l'utilisateur {{ $utilisateur->nom . ' ' . $utilisateur->prenom }}</h1>


<form action="{{route('utilisateurs.update',$utilisateur->id)}}" method="POST">
    @csrf
    @method('patch')
    <div class="mb-3 form-floating">
        <input type="text" class="form-control" name="nom" id="nom" placeholder="Nom " value="{{ old('nom') ? old('nom') : $utilisateur-> nom }}" required pattern="[A-Za-z . ]+" minlength="3" maxlength="255">
        <label class="form-label" for="nom">Nom</label>
        @if($errors->has('nom'))
        <div class="text-danger">{{ $errors->first('nom') }}</div>
        @endif
    </div>

    <div class="mb-3 form-floating">
        <input type="text" class="form-control" name="prenom" id="prenom" placeholder="Prénom " value="{{old('prenom') ? old('prenom') : $utilisateur-> prenom}}" required pattern="[A-Za-z- . ]+" minlength="3" maxlength="255">
        <label class="form-label" for="prenom">Prénom</label>
        @if($errors->has('prenom'))
        <div class="text-danger">{{ $errors->first('prenom') }}</div>
        @endif
    </div>

    <div class="mb-3 form-floating">
        <input type="email" class="form-control" name="email" id="email" placeholder="nom.prenom@mail.fr" value="{{old('email') ? old('email') : $utilisateur-> email}}">
        <label class="form-label" for="email">Email</label>
        @if($errors->has('email'))
        <div class="text-danger">{{ $errors->first('email') }}</div>
        @endif
    </div>

    <div class="mb-3 form-floating">
        <input type="phone" class="form-control" name="phone" id="phone" placeholder="0692152585" value="{{old('phone') ? old('phone') : $utilisateur-> telephone}}">
        <label class="form-label" for="phone">Téléphone</label>
        @if($errors->has('phone'))
        <div class="text-danger">{{ $errors->first('phone') }}</div>
        @endif
    </div>

    <span class="d-flex justify-content-end"> <button type="submit" class="btn btn-primary">Modifier</button></span>

</form>

@endsection