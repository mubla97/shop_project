<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\UserController;
use App\Models\Product;
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
Route::get('product/all', [ProductController::class, 'all']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/roles', [UserController::class, 'getRoles']);
    Route::post('/shop', [ShopController::class, 'store']);
    Route::post('/shop/upload-image', [ShopController::class, 'uploadImage']);
    Route::get('/hasShop', [ShopController::class, 'hasShop']);
    Route::get('/profile', [ProfileController::class, 'getProfile']);
    Route::put('/profile/edit', [ProfileController::class, 'update']);
    Route::put('/profile/password', [ProfileController::class, 'changePassword']);
    Route::delete('/profile/delete', [ProfileController::class, 'destroy']);
    Route::post('/profile/upload-avatar', [ProfileController::class, 'upload']);
    Route::get('/shop/{id}', [ShopController::class, 'show']);
    Route::get('/shop/{id}/show', [ShopController::class, 'showPublic']);
    Route::post('/shop/{id}', [ShopController::class, 'update']);
    Route::delete('/shop/{id}', [ShopController::class, 'destroy'])->name('shop.destroy');
    Route::get('/shop/{shopId}/products', [ProductController::class, 'getProductsByShop']);
    Route::get('/shop/{shopId}/products/show', [ProductController::class, 'getProductsByShopPublic']);
    Route::delete('/shop/{shopId}/products/{productId}', [ProductController::class, 'deleteProduct']);
    Route::post('/shop/{shopId}/products', [ProductController::class, 'store']);
    Route::get('/shop/{shopId}/products/{productId}', [ProductController::class, 'show']);
    Route::put('/shop/{shopId}/products/{productId}', [ProductController::class, 'update']);

    // Routes only ADMINS
    Route::middleware('admin')->group(function () {
        //USERS
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users', [UserController::class, 'store']);
        Route::get('/users/{id}', [UserController::class, 'show']);
        Route::put('/users/{id}', [UserController::class, 'update']);
        Route::delete('/users/{id}', [UserController::class, 'destroy']);
        
        //SHOPS
        Route::get('/shops', [ShopController::class, 'all']);
        Route::post('/shops', [ShopController::class, 'store']);
        Route::get('/shops/{id}', [ShopController::class, 'show']);
        Route::put('/shops/{id}', [ShopController::class, 'update']);
        Route::delete('/shops/{id}', [ShopController::class, 'destroy']);
        Route::get('/usersWithoutShop', [UserController::class, 'usersWithoutShop']);

        //PRODUCTS
        Route::get('/products', [ProductController::class, 'all']);
        Route::post('/shops/{shopId}/products', [ProductController::class, 'store']);
        Route::get('/products/{productId}', [ProductController::class, 'showProduct']);
        Route::put('/shops/{shopId}/products/{productId}', [ProductController::class, 'update']);
        Route::delete('/shops/{shopId}/products/{productId}', [ProductController::class, 'deleteProduct']);
    });
});



