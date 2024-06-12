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

          // Create 10 users, each with a store and 10 products.
        User::factory(10)->create()->each(function ($user) {
            // Create a store for each user
            $shop = Shop::factory()->create(['user_id' => $user->id]);

            // Create 10 products for each store
            Product::factory(10)->create(['shop_id' => $shop->id]);
        });

         
    }
}
