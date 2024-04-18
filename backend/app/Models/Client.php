<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Capmaign;

class Client extends Model
{
    use HasFactory;

     protected $fillable = ['first_name', 'second_name', 'email', 'phone', 'address', 'cep', 'birth_date', 'campaign_id'];

     public function campaign() {
        return $this->belongsTo(Campaign::class);
     }
}
