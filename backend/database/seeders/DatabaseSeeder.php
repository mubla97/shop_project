<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Product;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        //  USER SEEDERS
        User::factory(10)->create();

        User::factory()->create([
            'username' => 'administrador',
             'name' => 'Admin',
             'email' => 'admin@hotmail.com',
             'password' => Hash::make(env('ADMIN_USER_PASS')),
         ]);

          // Crear 10 usuarios, cada uno con una tienda y 10 productos.
        User::factory(10)->create()->each(function ($user) {
            // Crear una tienda para cada usuario
            $shop = Shop::factory()->create(['user_id' => $user->id]);

            // Crear 10 productos para cada tienda
            Product::factory(10)->create(['shop_id' => $shop->id]);
        });

         
    }
}
