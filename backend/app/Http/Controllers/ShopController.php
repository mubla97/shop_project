<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShopController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'community' => 'required|string|max:255',
            'postal_code' => 'required|string|max:255',
            'job' => 'required|string|max:255',
        ]);

        // Obtener el ID del usuario autenticado
        $userId = $request->user()->id;

        $shop = Shop::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address,
            'job' => $request->job,
            'community' => $request->community,
            'postal_code' => $request->postal_code,
            'user_id' => $userId,
        ]);

        return response()->json(['message' => 'Shop created successfully', 'shop' => $shop], 201);
    }

    public function hasShop()
    {
        // Verificar si el usuario tiene una tienda
        
        /** @var \App\Models\User $user **/
        $user = Auth::user();
        
        $hasShop = $user->shop()->exists();

        if($hasShop){
            $shop = $user->shop()->first();
        }

        return response()->json(['hasShop' => $hasShop, 'shopId' => $shop->id]);
    }

    public function show($id)
    {
        try {
            // Encuentra la tienda por ID
            $shop = Shop::findOrFail($id); 

            // Verificar si el usuario actual es el propietario de la tienda
            if ($shop->user_id !== Auth::id()) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            return response()->json($shop, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Shop not found'], 404);
        }
    }

       // Actualizar los detalles de la tienda
       public function update(Request $request, $id)
       {
           $validatedData = $request->validate([
               'name' => 'required|string|max:255',
               'phone' => 'required|string|max:20',
               'address' => 'required|string|max:255',
               'community' => 'required|string|max:255',
               'postal_code' => 'required|string|max:10',
               'job' => 'required|string|max:255',
           ]);
   
           try {
               $shop = Shop::findOrFail($id);
   
               // Verificar si el usuario actual es el propietario de la tienda
               if ($shop->user_id !== Auth::id()) {
                   return response()->json(['message' => 'Unauthorized'], 403);
               }
   
               // Actualizar los detalles de la tienda con los datos validados
               $shop->update($validatedData);
   
               return response()->json($shop, 200);
           } catch (\Exception $e) {
               return response()->json(['message' => 'Error updating shop', 'error' => $e->getMessage()], 500);
           }
       }
}
