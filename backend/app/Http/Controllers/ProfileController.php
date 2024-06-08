<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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

   public function update(Request $request)
   {
        // Validar los datos del formulario
        $validatedData = $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        // Obtener el usuario autenticado
        /** @var \App\Models\User $user **/
        $user = Auth::user();

        if($user){
        // Actualizar los campos del perfil
        $user->username = $validatedData['username'];
        $user->email = $validatedData['email'];
        $user->name = $validatedData['name'];
        $user->lastname = $validatedData['lastname'];
        $user->phone = $validatedData['phone'];

        // Guardar los cambios en la base de datos
        $user->save();

        // Devolver una respuesta JSON
        return response()->json(['message' => 'Profile updated successfully'], 200);
        }

        // Si no está autenticado, devuelve un error 401
       return response()->json(['error' => 'Unauthorized'], 401);

   }

    // Método para eliminar un usuario
    public function destroy()
    {
        /** @var \App\Models\User $user **/
        $user = Auth::user();

        if ($user) {
            try {

                if($user->shop()){
                    $user->shop()->delete();
                }

                // Invalidar el token de autenticación actual del usuario (logout)
                $user->tokens()->delete();

                $user->delete();

                return response()->json(['message' => 'User deleted successfully'], 200);

            } catch (\Exception $e) {
                return response()->json(['error' => 'An error occurred while deleting the user.'. $e->getMessage()], 500);
            }
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'oldPassword' => 'required',
            'newPassword' => 'required|min:6',
            'newPassword2' => 'required|same:newPassword',
        ]);
        
        /** @var \App\Models\User $user **/
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if (!Hash::check($request->oldPassword, $user->password)) {
            return response()->json(['error' => 'Invalid old password'], 422);
        }

        $user->password = Hash::make($request->newPassword);
        $user->save();

        return response()->json(['message' => 'Password updated successfully'], 200);
    }
}
