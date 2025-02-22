<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArticleComment extends Model
{
    use HasFactory;
    protected $fillable = [
        'text',
        'user_id',
        'article_id'
    ];
}
