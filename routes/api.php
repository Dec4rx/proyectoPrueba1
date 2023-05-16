<?php

use App\Http\Controllers\AddressController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WishlistController;
use App\Models\User;
use App\Models\Wishlist;

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



//Mostrar categoría Padre
Route::post('/show_dad/{id}', [CategoryController::class, 'show_subcategory']);

//Mostrar categorias
Route::get('/show_categories', [CategoryController::class, 'showCategoriesWithSubcategories']); //Ok

//Mostrar categoria
Route::get('/info_category/{id}', [CategoryController::class, 'info_category']); //Ok

//Mostrar todos los comentarios de un producto
Route::get('/show_comment/{id_product}', [CommentController::class, 'show_comment']);


//Mostrar producto en específico
Route::get('/show_specific_product/{id}', [ProductController::class, 'show_specific_product']); //Ok


//Mostrar productos
Route::get('/show_products', [ProductController::class, 'show_products']); //Ok


//Mostrar 3 productos
Route::get('/show_products_3/{category_id}', [ProductController::class, 'show_products_3']);









//Routes Auth
Route::middleware('auth:api')->group(function () {
    ////USUARIO NORMAL////
    ////USER
    //Mostar info de usuario
    Route::get('/show_user/{id}', [UserController::class, 'show_user']); //Ok

    //Agregar imagen
    Route::post('/add_image', [UserController::class, 'add_image']); //Ok

    //Comprar producto
    Route::post('/buy_product', [UserController::class, 'buy_products']); //Ok

    //Compras realizadas
    Route::get('/past_shopping/{user_id}', [UserController::class, 'past_shopping']); //Ok

    //Agregar al carrito
    Route::post('/add_cart', [UserController::class, 'add_shopping_cart_products']); //Ok

    //Mostrar carrito
    Route::get('show_cart/{user_id}', [UserController::class, 'show_shopping_cart']); //Ok

    //Agregar Wishlist
    Route::post('/add_wishlist', [UserController::class, 'add_wishlist_products']); //Ok

    //Mostrar Wishlist
    Route::get('/show_wishlist/{user_id}', [UserController::class, 'show_wishlist']); //Ok

    //Wishlist
    Route::delete('quit_from_wishlist/{id}', [WishlistController::class, 'delete_product']);
    Route::delete('clear_wishlist/{id}', [WishlistController::class, 'clear_cart']);


    ////Address
    //Agregar dirección
    Route::post('/add_address', [AddressController::class, 'store_address']); //Ok

    //Mostrar direcciones
    Route::get('/show_address/{user_id}', [AddressController::class, 'show_addresses']); //Ok

    //Eliminar dirección
    Route::delete('delete_address/{id}', [AddressController::class, 'delete_address']); //Ok

    ////Cart
    //Limpia el carrito del usuario
    Route::delete('clear_cart/{id}', [CartController::class, 'clear_cart']); //Ok

    //Elimina el producto del carrito del usuario
    Route::delete('delete_product_cart/{id}', [CartController::class, 'delete_product']); //Ok

    ////Comment
    //Guardar comentario
    Route::post('/store_comment', [CommentController::class, 'store_comment']); //Ok

    //Eliminar comentario
    Route::delete('/delete_comment/{id}', [CommentController::class, 'delete_comment']); //Ok

    //Actualiza comentario
    Route::post('/update_comment', [CommentController::class, 'update_comment']); //Ok



    ////ADMIN////
    ////Brand
    //Nueva marca
    Route::post('/new_brand', [BrandController::class, 'create_brand']); //Ok

    //Eliminar marca
    Route::delete('/delete_brand/{id}', [BrandController::class, 'delete_brand']); //Ok

    //Mostrar
    Route::get('/show_brand', [BrandController::class, 'show_brand']);

    ////Category
    //Crear Categoría
    Route::post('/create_category', [CategoryController::class, 'create_category']); //Ok

    //Eliminar Categoría
    Route::post('/delete_category/{id}', [CategoryController::class, 'delete_category']); //Ok

    ////Product
    //Crear producto
    Route::post('/create_product', [ProductController::class, 'create_product']); //Ok (checar que la /products jale o cambiarla a images)

    //Eliminar producto
    Route::delete('/delete_product/{id}', [ProductController::class, 'delete_product']); //Ok

    //Actualizar productos///
    Route::post('/update_product', [ProductController::class, 'update_product']); //Ok

});
