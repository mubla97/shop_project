<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ShopController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/csrf-token', function () {
    return response()->json(['csrfToken' => csrf_token()]);
});

Route::get('/', [AuthController::class, 'index'])->name('home');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [RegisterController::class, 'register']);
Route::middleware('auth:sanctum')->post('/shop', [ShopController::class, 'store']);
Route::middleware('auth:sanctum')->get('/hasShop', [ShopController::class, 'hasShop']);
Route::middleware('auth:sanctum')->get('/profile', [ProfileController::class, 'getProfile']);
Route::middleware('auth:sanctum')->put('/profile/edit', [ProfileController::class, 'update']);
Route::middleware('auth:sanctum')->delete('/profile/delete', [ProfileController::class, 'destroy']);

