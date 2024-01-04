<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CompaniesEmployees extends Model
{
    use HasFactory;

    public function companies(): BelongsTo
    {
        return $this->belongsTo(Companies::class);
    }

    public function salesContacts(): HasMany
    {
        return $this->hasMany(SalesContacts::class);
    }

    public function calendars(): HasMany
    {
        return $this->hasMany(Calendars::class);
    }
}
