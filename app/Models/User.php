<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
//use Laravel\Sanctum\HasApiTokens;
use Laravel\Passport\HasApiTokens;


use App\Models\Product;
use App\Models\Address;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'last_name',
        'birth',
        'gender',
        'phone',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    //To middle tables 
    public function buy(){
        return $this->belongsToMany(
            Product::class,
            'histories'
        )
        ->withPivot(['date','id'])
        ->withTimestamps();
    }

    public function wishlist(){
        return $this->belongsToMany(
            Product::class,
            'wishlists'
        )
        ->withPivot(['date','id'])
        ->withTimestamps();
    }

    public function cart(){
        return $this->belongsToMany(
            Product::class,
            'carts'
        )->withPivot(['date','id'])
        ->withTimestamps();
    }

    public function comment(){
        return $this->belongsToMany(
            Product::class,
            'comments'
        )->withPivot('date','comment','id')
        ->withTimestamps();
    }


    //Addresses
    public function address(){
        return $this->hasMany(Address::class);
    }

}
