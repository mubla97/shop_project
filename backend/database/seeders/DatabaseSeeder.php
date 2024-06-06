<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Shop;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        //SHOP SEEDERS
        Shop::factory()->count(10)->create();

        //  USER SEEDERS
        \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'username' => 'administrador',
             'name' => 'Admin',
             'email' => 'admin@hotmail.com',
             'password' => Hash::make(env('ADMIN_USER_PASS')),
         ]);

         
    }
}
