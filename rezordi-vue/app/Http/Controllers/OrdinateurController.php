<?php

namespace App\Http\Controllers;

use App\Creneau;
use App\Ordinateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrdinateurController extends Controller
{
    public function ordinateur_list(){
        $ordinateurs = DB::table('ordinateurs')->get();
        return response()->json($ordinateurs);
    }

    public function add_ordinateur(){
        $ordinateur = new Ordinateur(['etat' => 1, 'en_marche' => 0]);
        $ordinateur->save();
        return $ordinateur;
    }

    public function suppression($id){
        $ordinateur = Ordinateur::find($id);
        $ordinateur->delete();

        $creneaux = Creneau::where('ordinateur_id','=',$id);
        $creneaux->delete();

        return 'ok';
    }
   
}
