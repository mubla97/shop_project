<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

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

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'required|string|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'name' => $request->name,
            'lastname' => $request->lastname,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
        ]);

        return response()->json(['message' => 'User successfully registered', 'user' => $user], 201);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);

        if (!$user) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Validación de los datos recibidos del formulario
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => ['required','string','email','max:255',Rule::unique('users')->ignore($user->id),],
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'password' => 'nullable|string|min:8|confirmed',
            'phone' => 'required|string|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Actualizar los campos del usuario
        $user->username = $request->username;
        $user->email = $request->email;
        $user->name = $request->name;
        $user->lastname = $request->lastname;
        $user->phone = $request->phone;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json(['message' => 'User successfully updated', 'user' => $user], 200);
    }

    public function destroy($id){
       
        try {
            $user = User::findOrFail($id);

            if (!$user) {
                return response()->json(['message' => 'User not found.'], 404);
            }

            $user->delete();

            return response()->json(['message' => 'User deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting user.'], 500);
        }
    }

    public function usersWithoutShop()
    {
        // Query para obtener usuarios que no tienen tienda
        $usersWithoutShop = User::whereDoesntHave('shop')->get();

        return response()->json($usersWithoutShop);
    }
}
