<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;

class UserController extends Controller
{

    //Permite cambiar y almacenar una nueva imagen para el usuario
    public function add_image(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        $filename = date('His') . 'user-' . $request->user_id . '.' . $request->file('image')->getClientOriginalExtension();

        $user = User::find($request->user_id);
        $user->image = $request->file('image')->move('images/', $filename, 'public');
        $user->save();
        return response('jalo?');
    }


    //Mostrar info de usuario
    public function show_user($id)
    {
        return response()->json(User::find($id));
    }

    //Comprar producto
    public function buy_products(Request $request)
    {
        $request->validate([
            'user_id' => 'required|numeric',
            'product_id' => 'required|numeric',
        ]);
        $user = User::find($request->user_id); //PROBAR
        $product = Product::find($request->product_id);
        if ($product->quantity == 1) { //Se resta el producto y si solo quedaba uno se desactiva
            $product->quantity = $product->quantity - 1;
            $product->enable = false;
            $product->save();
        } elseif ($product->quantity > 0) {
            $product->quantity = $product->quantity - 1;
            $product->save();
        }
        return $user->buy()->attach($request->product_id, ['date' => now()]); //Se agrega en la tabla buys
    }


    //Compras realizadas
    public function past_shopping($user_id)
    {
        $user = User::find($user_id); //PROBAR
        $p = [];
        foreach ($user->buy as $product) { //Iteramos en cada relación de los productos y usuarios
            $p[] = [
                'product_id' => $product->id,
                'product' => $product->name, //Generamos el nombre del producto
                'price' => $product->price,
                'description' => $product->description,
                'date_of_buy' => $product->pivot->date, //con base a la tabla intermediaria se obtiene la fecha de compra
                'image' => $product->image,
                'rate' => $product->rate,
                'category' => Category::find($product->category_id)->name,
                'brand' => Brand::find($product->brand_id)->name
            ];
        }
        return response()->json($p);
    }

    //Agregar Carrito
    public function add_shopping_cart_products(Request $request){//Al usuario ingresar productos a su carrito
        $request->validate([
            'user_id' => 'required|numeric',
            'product_id' => 'required|numeric',
        ]);
        $user = User::find($request->user_id);//PROBAR
        return $user->cart()->attach($request->product_id, ['date' => now()]);//Se agrega en la tabla shopingcart
    }

    //show wishlist
    public function show_wishlist($user_id){
        $user = User::find($user_id);//PROBAR
        $p = [];
        foreach($user->wishlist as $product){
            $p [] = [
                'id' => $product->pivot->id,
                'product_id' => $product->id,
                'product_price' => $product->price,
                'product_des' => $product->description,
                'rate' => $product->rate,
                'product' => $product->name,//Generamos el nombre del producto
                'date_add' => $product->pivot->date,//con base a la tabla intermediaria se obtiene la fecha de compra
                'image' => $product->image,
                'category' => Category::find($product->category_id)->name
            ];
        }
        return response()->json($p);
    }

    //Mostrar show cart
    public function show_shopping_cart($user_id){
        $user = User::find($user_id);//PROBAR
        $p = [];
        foreach($user->cart as $product){
            $p [] = [
                'id' => $product->pivot->id,
                'product_id' => $product->id,
                'product_price' => $product->price,
                'product_des' => $product->description,
                'rate' => $product->rate,
                'product' => $product->name,//Generamos el nombre del producto
                'date_add' => $product->pivot->date,//con base a la tabla intermediaria se obtiene la fecha de compra
                'image' => $product->image,
                'category' => Category::find($product->category_id)->name
            ];
        }
        return response()->json($p);
    }

    //Agrega productos a la Wishlist
    public function add_wishlist_products(Request $request){//Al usuario ingresar productos a su wishlist
        $request->validate([
            'user_id' => 'required|numeric',
            'product_id' => 'required|numeric',
        ]);
        $user = User::find($request->user_id);//PROBAR
        return $user->wishlist()->attach($request->product_id, ['date' => now()]);//Se agrega en la tabla wishlists
    }
}
