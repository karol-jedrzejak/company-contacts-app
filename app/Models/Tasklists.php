<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tasklists extends Model
{
    use HasFactory;

    protected $attributes = [
        'id' => '',
        'user_id' => '',
        'description' => 'Text of task',
        'importance' => 'High',
        'created_at' => '',
        'updated_at' => '',
    ];

    protected $fillable = [
        'id',
        'user_id',
        'description',
        'importance',
        'created_at',
        'updated_at',
    ];

    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
