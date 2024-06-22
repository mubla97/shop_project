<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShopController extends Controller
{
    public function store(Request $request)
    {
        // Validar los datos de la tienda y la imagen
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'community' => 'required|string|max:100',
            'postal_code' => 'required|string|max:10',
            'job' => 'required|string|max:100',
            'shopImage' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if($request->user_id){
            $userId = $request->user_id;
        }else{
            $userId = $request->user()->id;
        }

        // Crear la tienda
        $shop = Shop::create([
            'name' => $request->input('name'),
            'phone' => $request->input('phone'),
            'address' => $request->input('address'),
            'community' => $request->input('community'),
            'postal_code' => $request->input('postal_code'),
            'job' => $request->input('job'),
            'user_id' => $userId,
        ]);

        // Subir la imagen si está presente
        if ($request->hasFile('shopImage')) {
            $image = $request->file('shopImage');
            $path = $image->store('', 'shop_images'); 
            $shop->image = $path;
            $shop->save();
        }

        return response()->json([
            'message' => 'Shop created successfully',
            'shop' => $shop,
        ], 201);
    }

    public function hasShop()
    {
        // Verificar si el usuario tiene una tienda
        
        /** @var \App\Models\User $user **/
        $user = Auth::user();
        
        $hasShop = $user->shop()->exists();

        if($hasShop){
            $shop = $user->shop()->first();

            return response()->json(['hasShop' => $hasShop, 'shopId' => $shop->id]);
        }

        return response()->json(['message' => 'No existe una tienda'], 200);
    }

    public function show($id)
    {
        try {
            // Encuentra la tienda por ID
            $shop = Shop::findOrFail($id); 
            
            return response()->json($shop, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Shop not found'], 404);
        }
    }

    public function showPublic($id)
    {
        try {
            // Encuentra la tienda por ID
            $shop = Shop::findOrFail($id); 

            return response()->json($shop, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Shop not found'], 404);
        }
    }

       // Actualizar los detalles de la tienda
       public function update(Request $request, $id)
       {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'community' => 'required|string|max:255',
            'postal_code' => 'required|string|max:10',
            'job' => 'required|string|max:255',
            'shopImage' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        try {
            $shop = Shop::findOrFail($id);
    
            // Actualizar los detalles de la tienda con los datos validados
            $shop->update([
                'name' => $request->input('name'),
                'phone' => $request->input('phone'),
                'address' => $request->input('address'),
                'community' => $request->input('community'),
                'postal_code' => $request->input('postal_code'),
                'job' => $request->input('job'),
            ]);
    
            // Procesar la imagen si se envió
            if ($request->hasFile('shopImage')) {
                $image = $request->file('shopImage');
                $path = $image->store('', 'shop_images'); 
                $shop->image = $path;
                $shop->save();
            }
    
            return response()->json($shop, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating shop', 'error' => $e->getMessage()], 500);
        }
       }

       public function destroy($id)
    {
        try {
            
            $shop = Shop::findOrFail($id);

            // Eliminar todos los productos asociados a la tienda
            Product::where('shop_id', $id)->delete();

            // Eliminar la tienda
            $shop->delete();

            return response()->json(['message' => 'Shop deleted successfully'], 200);
        } catch (\Exception $e) {
                       
            return response()->json(['message' => 'Error deleting shop'], 500);
        }
    }

    public function news()
    {
        // Obtener las últimas 10 tiendas
        $shops = Shop::orderByDesc('id')->take(10)->get();

        return response()->json($shops);
    }

    public function all()
    {
        // Obtener todas las tiendas
        $shops = Shop::orderBy('id', 'asc')->get();

        return response()->json($shops);
    }
}
