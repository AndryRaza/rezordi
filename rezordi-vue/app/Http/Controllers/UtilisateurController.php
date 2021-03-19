<?php

namespace App\Http\Controllers;

use App\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator as FacadesValidator;

class UtilisateurController extends Controller
{
 
    public function user_list()
    {
        $utilisateurs = DB::table('utilisateurs')->get();
        return response()->json($utilisateurs);
    }

    public function store_user(Request $request)
    {
        $validator = FacadesValidator::make($request->all(), [
            'nom' => 'required|min:3|max:255|regex:/^[A-Za-z]+$/',
            'prenom' => 'required|min:3|max:255|regex:/^[A-Za-z - é è ]+$/',
            'email'=> 'nullable|email',
            'telephone'=>'nullable|regex:/^[0-9 - () ]+$/'
        ]);

        if ($validator->fails()) {
            $tab = ['erreur', json_encode($validator->errors())];
            return response()->json($tab);
        }
        else {
           $utilisateur = new Utilisateur([
            'nom' => $request->get('nom'),
            'prenom' => $request->get('prenom'),
            'email'=> $request->get('email'),
            'telephone'=> $request->get('telephone'),
            'etat' => 1
           ]);
           $utilisateur->save();
           $tab = ['succes',$utilisateur];
           return $tab;
        }

      
    }
}
