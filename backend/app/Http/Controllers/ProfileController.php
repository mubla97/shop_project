<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
   // Método para obtener los detalles del perfil del usuario autenticado
   public function getProfile()
   {
       $user = Auth::user();

       if ($user) {
           return response()->json([
               'username' => $user->username,
               'email' => $user->email,
               'name' => $user->name,
               'lastname' => $user->lastname,
               'phone' => $user->phone,
               'avatar' => $user->avatar
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
            'newPassword' => 'required|min:8',
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

    public function upload(Request $request)
    {
        // Validar la solicitud
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        // Obtener el archivo subido
        $file = $request->file('avatar');
    
        // Generar un nombre único para la imagen
        $filename = 'avatar_' . Auth::id() . '.' . $file->getClientOriginalExtension();
    
        // Guardar la imagen en el disco personalizado 'avatars'
        $path = Storage::disk('avatars')->putFileAs('', $file, $filename);
    
        // Guardar la ruta de la imagen en el perfil del usuario
        /** @var \App\Models\User $user **/
        $user = Auth::user();
        $user->avatar = $path;
        $user->save();
    
        return response()->json(['message' => 'Imagen subida con éxito', 'path' => $path], 200);
    }
}
