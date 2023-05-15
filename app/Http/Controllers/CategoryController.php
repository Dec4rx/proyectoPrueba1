<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function create_category(Request $request)
    {
        $request->validate([
            'name' => 'required|max:100',
        ]);
        $category = new Category();
        $category->name = $request->name;
        if ($request->category_id) {
            $category->category_id = $request->category_id;
            // $parent = Category::find($request->category_id);
            // $category->categoryDad()->associate($parent);
            // $category->depth = $parent->depth + 1;
        }

        $category->save();
    }

    public function delete_category($id)
    {
        $category = Category::find($id);
        $category->delete();
    }

    // Obtener la categoría padre de una subcategoría
    public function show_subcategory($id)
    {
        $subcategory = Category::find($id);
        $dadCategory = $subcategory->categoryDad;
        $c = [];
        $c = [
            "dadCategory" => $dadCategory
        ];
        return response()->json($c);
    }

    // Obtener todas las subcategorías de una categoría
    public function show_dadCategory($id)
    {
        $category = Category::find($id);
        $subCategory = $category->subcategory;
        $c = [];
        $c = [
            "subcategory" => $subCategory
        ];
        return response()->json($c);
    }
}
