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

    public function delete_product($id){
        $s = Cart::find($id);
        $s -> delete();
        return response('deleted');
    }
}
