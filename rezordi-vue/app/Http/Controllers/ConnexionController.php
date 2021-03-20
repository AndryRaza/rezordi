<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConnexionController extends Controller
{
    public function connexion(){

        request()->validate([
            'email' => 'required',
            'password' => 'required'
        ]);


        $result =  AUTH::attempt([
            'identifiant' => request('email'),
            'password' => request('password'),
        ]);

        if ($result) 
        {
            return redirect('/home');
        }
        else {
            return back();
        }

    }

    public function deconnexion(){
        auth::logout();
        return redirect('');
    }

}
