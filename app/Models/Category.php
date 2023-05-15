<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Product;

class Category extends Model
{
    use HasFactory;

    public function categoryDad()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function subcategory()
    {
        return $this->hasMany(Category::class);
    }

    public function products(){
        return $this->hasMany(Product::class);
    }
}
