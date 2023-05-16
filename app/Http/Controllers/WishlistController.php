<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class WishlistController extends Controller
{
    public function delete_product($id){
        $s = Wishlist::find($id);
        $s -> delete();
        return response('deleted');
    }

    public function clear_cart($id){
        Wishlist::where('user_id',$id)->delete();
        return response('deleted');
    }

    public function add_wishlist(Request $request){
        $request->validate([
            'user_id' => 'required|numeric',
            'product_id' => 'required|numeric',
            'comment' => 'required'
        ]);
        $comment = new Wishlist();
        $comment -> user_id = $request -> user_id;
        $comment -> product_id = $request ->product_id;
        $comment -> date = Carbon::now();
        $comment -> save();
    }


}
