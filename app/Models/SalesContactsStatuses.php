<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SalesContactsStatuses extends Model
{
    use HasFactory;

    public function salesContacts(): BelongsTo
    {
        return $this->belongsTo(SalesContacts::class);
    }

    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
