<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'state',
        'total',
    ];

    // Relation with shop (1:N)
    public function shop()
    {
        return $this->belongsTo(Shop::class, 'shop_id');
    }

    // Relation with user (1:N)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
