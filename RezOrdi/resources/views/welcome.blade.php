<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
    <title>Page de connexion</title>
</head>

<body>
    <div class="container-fluid d-flex flex-column justify-content-center align-items-center" style="height:100vh">

        <form class="d-flex flex-column p-5 border border-primary " method="post">
            {{ csrf_field() }}
            <h1 class="text-center mb-3">Rez'Ordi</h1>
            <h3>Gestion d'attribution d'ordinateurs</h3>
            <div class="container text-center mt-2 ">
                @include('flash::message')
            </div>
            <div class="form-floating  mb-3">              
                <input class="form-control" type="email" name="email" placeholder="Identifiant" value="{{ old('email') }}">
                @if($errors->has('email'))
                <p class="help is-danger">{{ $errors->first('email') }}</p>
                @endif
                <label class="form-label">Identifiant : </label>
            </div>
            <div class="form-floating  mb-3">               
                <input class="form-control" type="password" name="password" placeholder="Mot de passe">
                @if($errors->has('password'))
                <p class="help is-danger">{{ $errors->first('password') }}</p>
                @endif
                <label class="form-label">Mot de passe : </label>
            </div>
            <button class="btn btn-primary mb-3" type="submit">Se connecter</button>
        </form>
    </div>
</body>

</html>





@push('scripts')
<script>
</script>
@endpush