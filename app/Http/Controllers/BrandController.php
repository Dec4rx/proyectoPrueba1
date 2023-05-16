<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function create_brand(Request $request)
    {
        $request->validate([
            'name' => 'required|max:100',
        ]);
        $brand = new Brand();
        $brand->name = $request->name;
        $brand->save();
    }

    public function delete_brand($id)
    {
        $brand = Brand::find($id);
        $brand-> delete();
    }

    public function show_brand(){
        $brands = [];
        foreach(Brand::all() as $cat){
            $brands[] = [
                "id" => $cat->id,
                "name" => $cat->name,
            ];
        }
        return response()->json($brands);
    }
}
