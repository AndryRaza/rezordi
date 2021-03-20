<?php

namespace App\Http\Controllers;

use App\Creneau;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator as FacadesValidator;

class CreneauController extends Controller
{
    public function creneau_list()
    {
        $creneaux = DB::table('creneaus')
            ->select(
                'creneaus.id',
                'creneaus.created_at',
                'creneaus.date',
                'creneaus.heure_debut',
                'creneaus.heure_fin',
                'creneaus.ordinateur_id as poste',
                'creneaus.utilisateur_id',
                'utilisateurs.nom',
                'utilisateurs.prenom'
            )
            ->join('utilisateurs', 'utilisateurs.id', '=', 'creneaus.utilisateur_id')
            ->get();
        return response()->json($creneaux);
    }

    public function store_reservation(Request $request)
    {
        $date = $request->get('date');
        $hd = $request->get('heure_debut') . ':00:00';
        $hf = $request->get('heure_fin') . ':00:00';
        $poste = $request->get('poste');

        $creneaux = Creneau::where([
            ['date', '=', $date],
            ['ordinateur_id', '=', $poste]
        ])
            ->get();



        foreach ($creneaux as $creneau) {
            if ($creneau->heure_debut <= $hd && $creneau->heure_fin >= $hf) {
                return 'erreur_creneau_pris';
            }
        }

        $validator = FacadesValidator::make($request->all(), [
            'date' => 'required|date',
            'heure_debut' => 'required|regex:/^[0-9]+$/',
            'heure_fin' => 'required|regex:/^[0-9]+$/|gt:heure_debut',
            'utilisateur' => 'required|integer',
            'poste' => 'required|integer'
        ]);

        if ($validator->fails()) {
            $tab = ['erreur', json_encode($validator->errors())];
            return response()->json($tab);
        } else {
            $new_reservation = new Creneau([
                'date' => $request->get('date'),
                'heure_debut' => $request->get('heure_debut') . ':00:00',
                'heure_fin' => $request->get('heure_fin') . ':00:00',
                'utilisateur_id' => $request->get('utilisateur'),
                'ordinateur_id' => $request->get('poste'),
                'etat' => 1
            ]);
            $new_reservation->save();
            $tab = ['succes', $new_reservation];
            return $tab;
        }
    }

    public function modification_reservation(Request $request, $id)
    {
        $date = $request->get('date_modification');
        $hd = $request->get('heure_debut_modification') . ':00:00';
        $hf = $request->get('heure_fin_modification') . ':00:00';
        $poste = $request->get('poste_modification');

        $creneaux = Creneau::where([
            ['date', '=', $date],
            ['ordinateur_id', '=', $poste],
            ['id','!=',$id]
        ])
            ->get();



        foreach ($creneaux as $creneau) {
            if ($creneau->heure_debut <= $hd && $creneau->heure_fin >= $hf) {
                return 'erreur_creneau_pris';
            }
        }

        $validator = FacadesValidator::make($request->all(), [
            'date_modification' => 'required|date',
            'heure_debut_modification' => 'required|regex:/^[0-9]+$/',
            'heure_fin_modification' => 'required|regex:/^[0-9]+$/|gt:heure_debut_modification',
            'utilisateur_modification' => 'required|integer',
            'poste_modification' => 'required|integer'
        ]);


        if ($validator->fails()) {
            $tab = ['erreur', json_encode($validator->errors())];
            return response()->json($tab);
        } else {
            $creneau = Creneau::find($id);
            $creneau->date = $request->get('date_modification');
            $creneau->heure_debut = $request->get('heure_debut_modification'). ':00:00';
            $creneau->heure_fin = $request->get('heure_fin_modification'). ':00:00';
            $creneau->utilisateur_id = $request->get('utilisateur_modification');
            $creneau->ordinateur_id = $request->get('poste_modification');
            $creneau->save();
            $tab = ['succes', $creneau];
            return $tab;
        }
    }

    public function suppression($id){
        $creneau = Creneau::find($id);
        $creneau->delete();
        return 'ok';
    }

}
