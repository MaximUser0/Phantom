<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'text',
        'description',
        'src',
        'example_image',
        'owner_id'
    ];
}
