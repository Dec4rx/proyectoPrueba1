<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

use App\Models\User;

class CommentController extends Controller
{  
    public function store_comment(Request $request){
        $request->validate([
            'user_id' => 'required|numeric',
            'product_id' => 'required|numeric',
            'comment' => 'required'
        ]);
        $comment = new Comment();
        $comment -> user_id = $request -> user_id;
        $comment -> product_id = $request ->product_id;
        $comment -> comment = $request -> comment;
        $comment -> date = Carbon::now();
        $comment -> save();
    }

    public function delete_comment($id){
        $comment = Comment::find($id);
        $comment -> delete();
        return response('deleted');
    }

    public function update_comment(Request $request){
        $request->validate([
            'id' => 'required|numeric',
            'comment' => 'required'
        ]);
        $comment = Comment::find($request->id);
        $comment -> comment = $request -> comment;
        $comment -> save();
    }

    //Mostar Comentarios
    public function show_comment($id_product)
    {
        $p = [];
        foreach(Comment::where('product_id', $id_product)->get() as $c){
            $p [] = [
                'id' => $c->id,
                'user_id' => $c->user_id,
                'user_name' => User::find($c->user_id)->name,
                'user_lastname' => User::find($c->user_id)->last_name,
                'product_id' => $c->product_id,
                'date' => $c->date,
                'comment' => $c->comment               
            ];
        }
        return response()->json($p);
    }
}
