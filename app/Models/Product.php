<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Category;
use App\Models\User;
use App\Models\Brand;

class Product extends Model
{
    use HasFactory;

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function brand(){
        return $this->belongsTo(Brand::class);
    }

    public function buy(){
        return $this->belongsToMany(
            User::class,
            'histories'
        )
        ->withPivot('date')
        ->as('buys')
        ->withTimestamps();
    }

    public function wishlist(){
        return $this->belongsToMany(
            User::class,
            'wishlists'
        )->withPivot('date')
        ->withTimestamps();
    }

    public function cart(){
        return $this->belongsToMany(
            User::class,
            'carts'
        )->withPivot('date')
        ->withTimestamps();
    }

    public function comment(){
        return $this->belongsToMany(
            User::class,
            'comments'
        )->withPivot('date','comment')
        ->withTimestamps();
    }

}
