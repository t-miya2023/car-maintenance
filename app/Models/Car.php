<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function maintenances()
    {
        return $this->hasMany(Maintenance::class);
    }

    public function photos()
    {
        return $this->hasMany(Photo::class);
    }

    protected $fillable = [
            'user_id',
            'car_model',
            'vehicle_model',
            'grade',
            'model_year',
            'color',
    ];
}
