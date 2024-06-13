<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
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
Route::get('shop/news', [ShopController::class, 'news']);
Route::get('shop/all', [ShopController::class, 'all']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/shop', [ShopController::class, 'store']);
    Route::get('/hasShop', [ShopController::class, 'hasShop']);
    Route::get('/profile', [ProfileController::class, 'getProfile']);
    Route::put('/profile/edit', [ProfileController::class, 'update']);
    Route::put('/profile/password', [ProfileController::class, 'changePassword']);
    Route::delete('/profile/delete', [ProfileController::class, 'destroy']);
    Route::post('/profile/upload-avatar', [ProfileController::class, 'upload']);
    Route::get('/shop/{id}', [ShopController::class, 'show']);
    Route::get('/shop/{id}/show', [ShopController::class, 'showPublic']);
    Route::put('/shop/{id}', [ShopController::class, 'update']);
    Route::delete('/shop/{id}', [ShopController::class, 'destroy'])->name('shop.destroy');
    Route::get('/shop/{shopId}/products', [ProductController::class, 'getProductsByShop']);
    Route::get('/shop/{shopId}/products/show', [ProductController::class, 'getProductsByShopPublic']);
    Route::delete('/shop/{shopId}/products/{productId}', [ProductController::class, 'deleteProduct']);
    Route::post('/shop/{shopId}/products', [ProductController::class, 'store']);
    Route::get('/shop/{shopId}/products/{productId}', [ProductController::class, 'show']);
    Route::put('/shop/{shopId}/products/{productId}', [ProductController::class, 'update']);

});


