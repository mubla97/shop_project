<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function getProductsByShop($shopId)
    {
        try {
            // Supongamos que tienes una relación de productos con la tienda en el modelo Product
            $products = Product::where('shop_id', $shopId)->get();

            $shop = Shop::findOrFail($shopId); 

            // Verificar si el usuario actual es el propietario de la tienda
            if ($shop->user_id !== Auth::id()) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            // Verificar si la tienda tiene productos
            if ($products->isEmpty()) {
                // Devuelve un mensaje indicando que no hay productos, pero con un código 200
                return response()->json([
                    'message' => 'No products found for this shop.',
                    'products' => [] // Retorna un array vacío para la lista de productos
                ], 200);
            }

            return response()->json($products, 200);
        } catch (\Exception $e) {
            // Manejar cualquier error que ocurra
            return response()->json(['error' => 'An error occurred while fetching products.'], 500);
        }
    }

    public function getProductsByShopPublic($shopId)
    {
        try {
            $products = Product::where('shop_id', $shopId)->get();
    
            if ($products->isEmpty()) {
                return response()->json([$products], 200);
            }
    
            return response()->json($products, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while fetching products.'], 500);
        }
    }
    

    public function store(Request $request, $shopId)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'quantity' => 'required|numeric',
        ]);

        try {
            $product = new Product;
            $product->name = $request->name;
            $product->description = $request->description;
            $product->price = $request->price;
            $product->quantity = $request->quantity;
            $product->shop_id = $shopId;
            $product->save();

            return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);
        } catch (\Exception $e) {
            // Manejar el error de manera adecuada
            return response()->json(['error' => 'Error creating product: ' . $e->getMessage()], 500);
        }
    }

    public function deleteProduct($shopId, $productId)
    {
        try {
            // Buscar el producto por ID y verificar que pertenece a la tienda especificada
            $product = Product::where('shop_id', $shopId)->where('id', $productId)->first();

            if (!$product) {
                // Si el producto no se encuentra o no pertenece a la tienda, devolver un error 404
                return response()->json(['message' => 'Product not found or does not belong to this shop.'], 404);
            }

            // Eliminar el producto
            $product->delete();

            // Retornar una respuesta de éxito
            return response()->json(['message' => 'Product deleted successfully.'], 200);
        } catch (\Exception $e) {
            // Manejar cualquier error que ocurra
            return response()->json(['error' => 'An error occurred while deleting the product.'], 500);
        }
    }

    public function show($shopId, $productId)
    {
        // Buscar el producto por shopId y productId
        $product = Product::where('shop_id', $shopId)->where('id', $productId)->first();

        // Verificar si el producto existe
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Devolver el producto en formato JSON
        return response()->json($product);
    }

    // Método para actualizar un producto específico por shopId y productId
    public function update(Request $request, $shopId, $productId)
    {
        // Validar los datos recibidos
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'shop_id' => 'required|integer|exists:shops,id',
        ]);

        // Si la validación falla, devolver errores
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Buscar el producto por shopId y productId
        $product = Product::where('shop_id', $shopId)->where('id', $productId)->first();

        // Verificar si el producto existe
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Actualizar los campos del producto
        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->price = $request->input('price');
        $product->quantity = $request->input('quantity');
        $product->shop_id = $shopId;

        $product->save();

        // Devolver el producto actualizado en formato JSON
        return response()->json($product);
    }

    public function all()
    {
        // Obtener todos los productos
        $products = Product::orderBy('id', 'asc')->get();

        return response()->json($products);
    }
}
