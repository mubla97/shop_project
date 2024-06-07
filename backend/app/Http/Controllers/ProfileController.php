<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
   // Método para obtener los detalles del perfil del usuario autenticado
   public function getProfile()
   {
       $user = Auth::user(); // Obtiene el usuario autenticado

       // Comprueba si el usuario está autenticado
       if ($user) {
           // Devuelve los detalles del usuario en formato JSON
           return response()->json([
               'username' => $user->username,
               'email' => $user->email,
               'name' => $user->name,
               'lastname' => $user->lastname,
               'phone' => $user->phone,
           ], 200);
       }

       // Si no está autenticado, devuelve un error 401
       return response()->json(['error' => 'Unauthorized'], 401);
   }
}
