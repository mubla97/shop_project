<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Función que muestra la vista de logados o la vista con el formulario de Login.
     */
    public function index()
    {
        // Comprobamos si el usuario ya está logado
        //if (Auth::check()) {
            // Si está logado le mostramos la vista de logados
         //   return view('logados');
       // }

        // Si no está logado le mostramos la vista con el formulario de login
        return view('login');
    }

    /**
     * Función que se encarga de recibir los datos del formulario de login, comprobar que el usuario existe y
     * en caso correcto logar al usuario.
     */
    public function login(Request $request)
    {
        // Comprobamos que el email y la contraseña han sido introducidos
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        // Almacenamos las credenciales de email y contraseña
        $credentials = $request->only('email', 'password');

        // Si el usuario existe lo logamos y devolvemos un token o una respuesta JSON
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            // Aquí podrías generar un token de acceso si estás usando una API basada en tokens (JWT, Passport, etc.)
            // $token = $user->createToken('authToken')->accessToken;

            return response()->json([
                'message' => 'Logueado Correctamente',
                // 'accessToken' => $token,
                'user' => $user,
            ], 200);
        }

        // Si el usuario no existe devolvemos un mensaje de error
        return response()->json([
            'message' => 'Los datos introducidos no son correctos',
        ], 401);
    }

}
