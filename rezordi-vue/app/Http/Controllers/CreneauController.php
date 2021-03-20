<?php

namespace App\Http\Controllers;

use App\Creneau;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator as FacadesValidator;

class CreneauController extends Controller
{
    public function store_reservation(Request $request)
    {
        $date = $request->get('date');
        $hd = $request->get('heure_debut'). ':00:00';
        $hf = $request->get('heure_fin'). ':00:00';
        $poste = $request->get('poste');

        $creneaux = Creneau::where([
            ['date', '=', $date],
            ['ordinateur_id','=',$poste]
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
        }

        else {
            $new_reservation = new Creneau([
                'date' => $request->get('date'),
                'heure_debut' => $request->get('heure_debut') . ':00:00',
                'heure_fin' => $request->get('heure_fin') . ':00:00',
                'utilisateur_id' => $request->get('utilisateur'),
                'ordinateur_id' => $request->get('poste'),
                'etat' => 1
            ]);
           $new_reservation->save();
           $tab = ['succes',$new_reservation];
           return $tab;
        }
    }
}
