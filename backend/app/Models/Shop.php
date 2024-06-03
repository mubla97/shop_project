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
    ];

    // Relation with user (1:N)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
