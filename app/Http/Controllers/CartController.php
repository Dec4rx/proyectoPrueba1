<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function clear_cart($id)
    {
        Cart::where('user_id', $id)->delete();
        return response('deleted');
    }

    public function delete_product(Request $request)
    {
        Cart::where('product_id', $request->product_id)
        ->where('user_id', $request->user_id)
        ->delete();
    }
}
