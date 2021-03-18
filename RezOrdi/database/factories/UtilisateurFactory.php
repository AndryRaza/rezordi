<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Utilisateur;
use Faker\Generator as Faker;

$factory->define(Utilisateur::class, function (Faker $faker) {
    return [
        'nom' => $faker->name,
        'prenom'=> $faker->firstName('male'),
        'email'=>$faker->email,
        'telephone'=>$faker->phoneNumber,
        'etat'=>1
    ];
});
