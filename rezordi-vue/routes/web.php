<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/ordi-liste','OrdinateurController@ordinateur_list');
Route::get('/utilisateur-liste','UtilisateurController@user_list');
Route::post('/ajout_ordinateur','OrdinateurController@add_ordinateur');


