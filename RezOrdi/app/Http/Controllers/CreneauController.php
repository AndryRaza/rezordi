<?php

namespace App\Http\Controllers;

use App\Creneau;
use App\Ordinateur;
use App\Utilisateur;
use Dotenv\Validator;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator as FacadesValidator;

class CreneauController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }

    public function list_date()
    {
        $creneaux = DB::table('creneaus')
            ->select(
                'creneaus.id',
                'creneaus.etat',
                'creneaus.date',
                'creneaus.heure_debut',
                'creneaus.heure_fin',
                'ordinateurs.id as ordinateur',
                'utilisateurs.nom as nom_utilisateur',
                'utilisateurs.prenom as prenom_utilisateur'
            )
            ->where([
                ['creneaus.date', '=', date('Y-m-d')]
            ])
            ->join('ordinateurs', 'ordinateurs.id', '=', 'creneaus.ordinateur_id')
            ->join('utilisateurs', 'utilisateurs.id', '=', 'creneaus.utilisateur_id')
            ->get();


        return datatables()->of($creneaux)
            ->editcolumn('ordinateur_id', function ($row) {
                return $row->ordinateur;
            })
            ->editcolumn('utilisateur_id', function ($row) {
                return $row->nom_utilisateur . ' ' . $row->prenom_utilisateur;
            })
            ->addColumn('attribuer', function ($row) {
                if ($row->etat === 1 && $row->heure_fin > date('H:i:s')) {
                    $btn = '<span class="d-flex justify-content-center"><a href="/valider/' . $row->id . '"  class="btn btn-primary"> Valider </a> </span>';
                }
                if ($row->etat === 0 || $row->heure_fin <= date('H:i:s')) {
                    $btn = 'En cours ou session terminée';
                }
                return $btn;
            })
            ->rawColumns(['attribuer'])
            ->toJson();
    }
    public function list_date_detail()
    {
        $creneaux = DB::table('creneaus')
            ->select(
                'creneaus.id',
                'creneaus.etat',
                'creneaus.date',
                'creneaus.heure_debut',
                'creneaus.heure_fin',
                'ordinateurs.id as ordinateur',
                'utilisateurs.nom as nom_utilisateur',
                'utilisateurs.prenom as prenom_utilisateur'
            )
            ->join('ordinateurs', 'ordinateurs.id', '=', 'creneaus.ordinateur_id')
            ->join('utilisateurs', 'utilisateurs.id', '=', 'creneaus.utilisateur_id')
            ->get();


        return datatables()->of($creneaux)
            ->editcolumn('ordinateur_id', function ($row) {
                return $row->ordinateur;
            })
            ->editcolumn('utilisateur_id', function ($row) {
                return $row->nom_utilisateur . ' ' . $row->prenom_utilisateur;
            })
            ->addColumn('modifier', function ($row) {
                $btn = '<span class="d-flex justify-content-center"><a href="/creneaux/' . $row->id . '/edit"  class="btn btn-primary"> Modifier </a> </span>';
                return $btn;
            })
            ->rawColumns(['modifier'])
            ->toJson();
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        $ordinateurs = Ordinateur::where('etat', '=', 1)->get();
        $utilisateurs = Utilisateur::where('etat', '=', 1)->get();
        $creneaux = Creneau::where('etat', '=', 1)
            ->orderBy('date', 'asc')
            ->get();
        return view('creneaux.create', compact('ordinateurs', 'utilisateurs', 'creneaux'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
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
                flash('Le poste est déjà pris.')->error();
                return back()->withInput();
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
            flash('Une erreur s\'est produite, veuillez recommencer. ')->error();
            return back()->withErrors($validator)->withInput();
        }

        $new_reservation = new Creneau([
            'date' => $request->get('date'),
            'heure_debut' => $request->get('heure_debut') . ':00:00',
            'heure_fin' => $request->get('heure_fin') . ':00:00',
            'utilisateur_id' => $request->get('utilisateur'),
            'ordinateur_id' => $request->get('poste'),
            'etat' => 1
        ]);

      $new_reservation->save();

        flash('Réservation ajoutée');
        return back();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Creneau  $creneau
     * @return \Illuminate\Http\Response
     */
    public function show(Creneau $creneau)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Creneau  $creneau
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $creneau = Creneau::find($id);
        $utilisateurs = Utilisateur::where('etat', '=', 1)->get();
        $ordinateurs = Ordinateur::where('etat', '=', 1)->get();
        return view('creneaux.edit', compact('creneau', 'utilisateurs', 'ordinateurs'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Creneau  $creneau
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = FacadesValidator::make($request->all(), [
            'date' => 'required|date',
            'heure_debut' => 'required|regex:/^[0-9]+$/',
            'heure_fin' => 'required|regex:/^[0-9]+$/|gt:heure_debut',
            'utilisateur' => 'required|integer',
            'poste' => 'required|integer'
        ]);

        if ($validator->fails()) {
            flash('Une erreur s\'est produite, veuillez recommencer. ')->error();
            return back()->withErrors($validator)->withInput();
        }

        $creneau = Creneau::find($id);
        $creneau->date = $request->get('date');
        $creneau->heure_debut = $request->get('heure_debut') . ':00:00';
        $creneau->heure_fin = $request->get('heure_fin') . ':00:00';
        $creneau->utilisateur_id = $request->get('utilisateur');
        $creneau->ordinateur_id = $request->get('poste');

        $creneau->save();

        flash('La réservation n°' . $creneau->id . ' a été modifié')->success();

        return back();
    }

    public function valider($id)
    {
        $creneau = Creneau::find($id);
        $poste = Ordinateur::find($creneau->ordinateur_id);

        if ($poste->en_marche === 1) {
            flash('Le poste est utilisé')->error();
            return back();
        }

        $poste->en_marche = 1;
        $poste->save();

        $creneau->etat = 0;
        $creneau->save();

        return redirect('administrateur');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Creneau  $creneau
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $creneau = Creneau::find($id);
        $creneau->delete();

        return view('creneaux.create');
    }
}
