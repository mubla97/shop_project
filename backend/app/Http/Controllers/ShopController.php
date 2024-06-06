<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Illuminate\Http\Request;

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
}
