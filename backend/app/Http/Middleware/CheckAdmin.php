<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        // Verificar si el usuario está autenticado y tiene el rol 'admin'

         /** @var \App\Models\User $user **/
         $user = Auth::user();

        if (Auth::check() && $user->roles()->where('name', 'admin')->exists()) {
            return $next($request);
        }

        // Si no es admin, redirigir o devolver una respuesta de error
        return response()->json(['error' => 'Unauthorized'], 403);
    }
}
