<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'quantity',
        'shop_id'
    ];

    // Relation with shop (1:N)
    public function shop()
    {
        return $this->belongsTo(Shop::class, 'shop_id');
    }
}
