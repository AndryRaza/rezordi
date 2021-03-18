<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Creneau extends Model
{
    protected $guarded = [];

    public function utilisateur(){
        return $this->belongsTo('App\Utilisateur');
    }
    public function ordinateur(){
        return $this->belongsTo('App\Ordinateur');
    }

}
