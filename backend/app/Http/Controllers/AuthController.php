<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        // Almacenamos las credenciales de email y contraseña
        $credentials = $request->only('email', 'password');

        // Si el usuario existe lo logamos y devolvemos un token o una respuesta JSON
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            
            return response()->json([
                'message' => 'Logueado Correctamente',
                'user' => $user,
            ], 200);
        }

        // Si el usuario no existe devolvemos un mensaje de error
        return response()->json([
            'message' => 'Los datos introducidos no son correctos',
        ], 401);
    }

}
