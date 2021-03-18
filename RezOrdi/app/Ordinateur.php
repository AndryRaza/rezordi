<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ordinateur extends Model
{
    
    protected $guarded = [];

    public function creneau(){
        return $this->belongsTo('App\Creneau');
    }
    
}
