<?php

namespace App\Http\Controllers;

use App\Creneau;
use Illuminate\Http\Request;
use App\Utilisateur;
use Hamcrest\Util;
use Illuminate\Support\Facades\DB;

class UtilisateurController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('utilisateurs.index');
    }

    public function list_user()
    {
        //$utilisateurs = Utilisateur::all();

        $utilisateurs = DB::table('utilisateurs')
            ->select('*')
            ->get();

        return datatables()->of($utilisateurs)
            ->addColumn('voir', function ($row) {
                $btn = '<span class="d-flex justify-content-center"><a href="/utilisateurs/' . $row->id . '"  class="btn btn-primary"> + de détails </a> </span>';
                return $btn;
            })
            ->rawColumns(['voir'])
            ->toJson();
    }

    public function list_user_detail(){
        $utilisateurs = DB::table('utilisateurs')
        ->select('*')
        ->get();

        return datatables()->of($utilisateurs)
        ->addColumn('désactiver',function($row){
            if ($row->etat == 1)
            {  $btn = '<span class="d-flex justify-content-center"><a href="/utilisateurs/desactivate/' . $row->id . '"  class="btn btn-danger"> Désactiver </a></span>';}
            else  {  $btn = '<span class="d-flex justify-content-center"><a href="/utilisateurs/activate/' . $row->id . '"  class="btn btn-success"> Activer </a></span>';}
              return $btn;
        })
        ->addColumn('voir', function ($row) {
            $btn = '<span class="d-flex justify-content-center"><a href="/utilisateurs/' . $row->id . '"  class="btn btn-primary"> + de détails </a> </span>';
            return $btn;
        })
        ->rawColumns(['désactiver','voir'])
        ->toJson();
    }

    public function list_user_details(){
        $utilisateurs = DB::table('utilisateurs')
        ->select('*')
        ->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('utilisateurs.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|min:3|max:255|regex:/^[A-Za-z]+$/',
            'prenom' => 'required|min:3|max:255|regex:/^[A-Za-z - é è ]+$/',
            'email'=> 'nullable|email',
            'phone'=>'nullable|regex:/^[0-9 - () ]+$/'
        ]);

        $utilisateur = new Utilisateur([
            'nom' => $request->get('nom'),
            'prenom' => $request->get('prenom'),
            'etat' => 1
        ]);

        $utilisateur->save();
        return redirect('/administrateur');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $utilisateur = Utilisateur::find($id);

        $creneaux = Creneau::where('utilisateur_id','=',$id)->get();


        return view('utilisateurs.show',compact('utilisateur','creneaux'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $utilisateur = Utilisateur::find($id);
        return view('utilisateurs.edit',compact('utilisateur'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nom' => 'required|min:3|max:255|regex:/^[A-Za-z . ]+$/',
            'prenom' => 'required|min:3|max:255|regex:/^[A-Za-z - é è ]+$/',
            'email'=> 'nullable|email',
            'phone'=>'nullable|regex:/^[0-9 - () ]+$/'
        ]);

        $utilisateur = Utilisateur::find($id);
        $utilisateur->nom = $request->get('nom');
        $utilisateur->prenom = $request->get('prenom');
        $utilisateur->email = $request->get('email');
        $utilisateur->telephone = $request->get('phone');

        $utilisateur->save();
        flash($utilisateur->nom . ' ' . $utilisateur->prenom . ' a été modifié.')->success();

        return redirect('/administrateur');
    }

    public function desactivate($id)
    {
        $utilisateur = Utilisateur::find($id);
        $utilisateur->etat = 0;
        $utilisateur->save();
        return view('utilisateurs.create');
    }
    public function activate($id)
    {
        $utilisateur = Utilisateur::find($id);
        $utilisateur->etat = 1;
        $utilisateur->save();
        return view('utilisateurs.create');
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
