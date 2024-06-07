<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'address',
        'job',
        'postal_code',
        'community',
        'user_id',
    ];

    // Relation with user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
