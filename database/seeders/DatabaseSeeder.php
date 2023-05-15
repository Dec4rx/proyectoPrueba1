<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Address;
use App\Models\Brand;
use App\Models\Cart;
use App\Models\Category;
use App\Models\Comment;
use App\Models\History;
use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        Brand::factory(10)->create();
        Category::factory(10)->create();
        Product::factory(10)->create();
        Address::factory(10)->create();
        Cart::factory(10)->create();
        Comment::factory(10)->create();
        History::factory(10)->create();
        Wishlist::factory(10)->create();
    }
}
