<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;

use Illuminate\Http\Request;


class ProductController extends Controller
{
    public function create_product(Request $request)
    {
        $request->validate([
            'name' => 'required|max:100',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            'price' => 'required|numeric|min:1',
            'description' => 'required|min:20',
            'rate' => 'numeric',
            'quantity' => 'required|numeric',
            'deliverTime' => 'required|numeric|min:1',
            'category_id' => 'required|numeric|min:1',
            'brand_id' => 'required|numeric|min:1',
        ]);

        $filename = date('His') . 'product-' . $request->name . '.' . $request->file('image')->getClientOriginalExtension();

        $product = new Product();
        $product->name = $request->name;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->rate = $request->rate;
        $product->quantity = $request->quantity;
        $product->image = $request->file('image')->move('images/', $filename, 'public');
        $product->deliverTime = $request->deliverTime;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->save();
    }

    public function show_specific_product($id)
    {
        $product = Product::find($id);
        $p = [];
        $categoryDad = Category::find($product->category_id)->categoryDad;
        $categoryDad_name = $categoryDad ? $categoryDad->name : null;
        $p[] = [
            'id' => $product->id,
            'name' => $product->name,
            'price' => $product->price,
            'rate' => $product->rate,
            'description' => $product->description,
            'quantity' => $product->quantity,
            'image' => $product->image,
            'deliverTime' => $product->deliverTime,
            'category_name' => Category::find($product->category_id)->name,
            'category_id' => $product->category_id,
            'categoryDad_id' => Category::find($product->category_id)->category_id,
            'categoryDad_name' => $categoryDad_name,
            'brand_name' => Brand::find($product->brand_id)->name,
            'brand_id' => $product->brand_id,
        ];
        return response()->json($p);
        // return response()->json($product);
    }

    public function delete_product($id)
    {
        $product = Product::find($id);
        $product->delete();
        return response('deleted');
    }

    public function show_products()
    {
        $products = Product::where('enable', true)->get();
        $p = [];
        foreach ($products as $product) {
            $categoryDad = Category::find($product->category_id)->categoryDad;
            $categoryDad_name = $categoryDad ? $categoryDad->name : null;
            $p[] = [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'rate' => $product->rate,
                'description' => $product->description,
                'quantity' => $product->quantity,
                'image' => $product->image,
                'deliverTime' => $product->deliverTime,
                'category_name' => Category::find($product->category_id)->name,
                'category_id' => $product->category_id,
                'categoryDad_id' => Category::find($product->category_id)->category_id,
                'categoryDad_name' => $categoryDad_name,
                'brand_name' => Brand::find($product->brand_id)->name,
                'brand_id' => $product->brand_id,
            ];
        }
        return response()->json($p);
    }

    public function show_products_3($category_id)
    {
        $products = Product::where('category_id', $category_id)->where('enable', true)->limit(3)->get();
        $p = [];
        foreach ($products as $product) {
            $p[] = [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'rate' => $product->rate,
                'description' => $product->description,
                'quantity' => $product->quantity,
                'image' => $product->image,
                'deliverTime' => $product->deliverTime,
                'category_name' => Category::find($product->category_id)->name,
                'category_id' => $product->category_id,
                'brand_name' => Brand::find($product->brand_id)->name,
                'brand_id' => $product->brand_id,
            ];
        }
        return response()->json($p);
    }

    public function update_product(Request $request)
    {
        $request->validate([    
            'name' => 'max:100',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg',
            'price' => 'numeric|min:1',
            'description' => 'min:20',
            'rate' => 'numeric',
            'quantity' => 'numeric',
            'deliverTime' => 'numeric|min:1',
            'category_id' => 'numeric|min:1',
            'brand_id' => 'numeric|min:1',
        ]);

        $filename = date('His') . 'product-' . $request->name . '.' . $request->file('image')->getClientOriginalExtension();


        $product = Product::find($request->product_id);
        $product->name = $request->name ?? $product->name;
        $product->image = $request->file('image')->move('images/', $filename, 'public') ?? $product->name;
        $product->price = $request->price ?? $product->price;
        $product->description = $request->description ?? $product->description;
        $product->rate = $request->rate ?? $product->rate;
        $product->quantity = $request->quantity ?? $product->quantity;
        $product->deliverTime = $request->deliverTime ?? $product->deliverTime;
        $product->category_id = $request->category_id ?? $product->category_id;
        $product->brand_id = $request->brand_id ?? $product->brand_id;
        $product->save();
    }

    public function update_product_img(Request $request)
    {
        $product = Product::find($request->product_id);
        $filename = date('His') . 'product-' . $request->name . '.' . $request->file('image')->getClientOriginalExtension();
        $product->image = $request->file('image')->move('images/', $filename, 'public');
        $product->save();
    }
}
