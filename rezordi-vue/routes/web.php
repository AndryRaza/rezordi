<?php

use Illuminate\Support\Facades\Route;

date_default_timezone_set('Indian/Reunion');
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

Route::view('/','welcome');
Route::post('','ConnexionController@connexion');



Route::group([
    'middleware' => 'App\Http\Middleware\Administrateur',
],function () {
    
    Route::get('/home', function () {
        return view('index');
    });
    
    Route::post('/deconnexion','ConnexionController@deconnexion');

    Route::get('/ordi-liste','OrdinateurController@ordinateur_list');
    Route::get('/utilisateur-liste','UtilisateurController@user_list');
    Route::get('/reservation-liste','CreneauController@creneau_list');
    
    Route::post('/ajout_ordinateur','OrdinateurController@add_ordinateur');
    Route::post('/delete_ordinateur/{id}','OrdinateurController@suppression');
    
    
    Route::post('/store_user','UtilisateurController@store_user');
    Route::post('/modification_utilisateur/{id}','UtilisateurController@modification_user');
    Route::post('/delete_user/{id}','UtilisateurController@suppression');
    
    Route::post('/store_reservation','CreneauController@store_reservation');
    Route::post('/modification_reservation/{id}','CreneauController@modification_reservation');
    Route::post('/delete_reservation/{id}','CreneauController@suppression');
});


