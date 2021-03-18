<?php

use Illuminate\Database\Seeder;


class UtilisateurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Utilisateur::class, 100)->create();
    }
}
