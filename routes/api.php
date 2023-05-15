<?php

use App\Http\Controllers\AddressController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//Registro e Inicio de Sesión
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);



////USER
//Mostar info de usuario
Route::get('/show_user/{id}', [UserController::class, 'show_user']);//Ok

//Comprar producto
Route::post('/buy_product',[UserController::class, 'buy_products']);//Ok

//Compras realizadas
Route::get('/past_shopping/{user_id}', [UserController::class, 'past_shopping']);//Ok

//Agregar al carrito
Route::post('/add_cart', [UserController::class, 'add_shopping_cart_products']);//Ok

//Mostrar carrito
Route::get('show_cart/{user_id}', [UserController::class, 'show_shopping_cart']);//Ok

//Agregar Wishlist
Route::post('/add_wishlist', [UserController::class, 'add_wishlist_products']);//Ok

//Mostrar Wishlist
Route::get('/show_wishlist/{user_id}', [UserController::class, 'show_wishlist']);//Ok


////Address
//Agregar dirección
Route::post('/add_address', [AddressController::class, 'store_address']);//Ok

//Mostrar direcciones
Route::get('/show_address/{user_id}', [AddressController::class, 'show_addresses']);//Ok

//Eliminar dirección
Route::post('delete_address/{id}', [AddressController::class, 'delete_address']);//Ok


////Cart
//Limpia el carrito del usuario
Route::post('clear_cart/{id}', [CartController::class, 'clear_cart']);//Ok

//Elimina el producto del carrito del usuario
Route::post('delete_product_cart', [CartController::class, 'delete_product']);//Ok




////ADMIN////
////Brand
//Nueva marca
Route::post('/new_brand', [BrandController::class, 'create_brand']);//Ok

//Eliminar marca
Route::post('/delete_brand/{id}', [BrandController::class, 'delete_brand']);//Ok


////Category
//Crear Categoría
Route::post('/create_category', [CategoryController::class, 'create_category']);//Ok

//Eliminar Categoría
Route::post('/delete_category/{id}', [CategoryController::class, 'delete_category']);//Ok

//Mostrar categoría Padre
Route::post('/show_dad/{id}', [CategoryController::class, 'show_subcategory']);












