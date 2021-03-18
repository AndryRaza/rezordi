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

Route::get('/', function () {
    return view('welcome');
});


Route::resource('utilisateurs','UtilisateurController');
Route::get('/utilisateurs/desactivate/{id}','UtilisateurController@desactivate');
Route::get('/utilisateurs/activate/{id}','UtilisateurController@activate');


Route::resource('administrateur','AdministrateurController');
Route::resource('ordinateurs','OrdinateurController');
Route::resource('creneaux','CreneauController');

Route::view('/configurations','configurations.index');

Route::get('/utilisateur-list','UtilisateurController@list_user');
Route::get('/utilisateur-list-detail','UtilisateurController@list_user_detail');


Route::get('/creneaux-list','CreneauController@list_date');
Route::get('/creneaux-list-detail','CreneauController@list_date_detail');

Route::get('/eteindre/{id}','OrdinateurController@shutdown');

Route::get('/valider/{id}','CreneauController@valider');