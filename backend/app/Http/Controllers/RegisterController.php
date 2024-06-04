<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisterController extends Controller
{
    public function index()
    {
        return view('register');
    }

    public function register(Request $request)
    {
        // Comprobamos todas las variables que introducen en nuestro registro
        $request->validate([
            'username' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'phone' => ['sometimes', 'max:9'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        try{
            $data = $request->all();
            $data['password'] = Hash::make($data['password']);
            $user = User::create($data);

        } catch (\Exception $e){
            return redirect()->back()->withInput()->with('error', 'There has been error');
        }

       return redirect('/login')->with('success', 'User created successfully');
    }
}
