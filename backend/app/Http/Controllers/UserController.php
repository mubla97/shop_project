<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    // Obtener los roles del usuario autenticado
    public function getRoles()
    {
        $user = Auth::user();

        // Obtener los roles del usuario y devolverlos como un array de nombres de roles
        $roles = $user->roles->pluck('name');

        return response()->json($roles);
    }

    public function index()
    {
        $users = User::all();

        return response()->json($users);
    }
}
