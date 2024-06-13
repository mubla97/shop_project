<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'name',
        'lastname',
        'phone',
        'photo',
        'email',
        'password',
        'avatar',
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
        'password' => 'hashed',
    ];

    public function shop()
    {
        return $this->hasOne(Shop::class);
    }

        // Relación con roles
        public function roles()
        {
            return $this->belongsToMany(Role::class);
        }
    
        // Método para asignar roles
        public function assignRole($role)
        {
            return $this->roles()->sync($role);
        }
    
        // Método para verificar si tiene un rol específico
        public function hasRole($role)
        {
            return $this->roles()->where('name', $role)->exists();
        }
    
        // Método para verificar si tiene alguno de los roles proporcionados
        public function hasAnyRole($roles)
        {
            return $this->roles()->whereIn('name', $roles)->exists();
        }
    
        // Método para verificar si tiene todos los roles proporcionados
        public function hasAllRoles($roles)
        {
            return $this->roles()->whereIn('name', $roles)->count() == count($roles);
        }
}
