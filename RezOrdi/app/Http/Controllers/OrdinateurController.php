<?php

namespace App\Http\Controllers;

use App\Ordinateur;
use App\Creneau;
use Illuminate\Http\Request;

class OrdinateurController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $ordinateur = new Ordinateur(['etat' => 1, 'en_marche' => 0]);
        $ordinateur->save();
        return redirect('/administrateur');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Ordinateur  $ordinateur
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $ordinateur = Ordinateur::find($id);
        $creneaux = Creneau::where([
            ['ordinateur_id', '=', $id],
            ['date','=',date('Y-m-d')]
            ])
            ->orderBy('date', 'asc')
            ->get();

        return view('ordinateurs.show', compact('ordinateur', 'creneaux'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Ordinateur  $ordinateur
     * @return \Illuminate\Http\Response
     */
    public function edit(Ordinateur $ordinateur)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Ordinateur  $ordinateur
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ordinateur $ordinateur)
    {
        //
    }

    public function shutdown($id){
        $ordi = Ordinateur::find($id);
        $ordi->en_marche = 0;
        $ordi->save();
        return back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Ordinateur  $ordinateur
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ordinateur $ordinateur)
    {
        //
    }
}
