<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class CompaniesEmployees extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'surname',
        'position',
        'mobile',
        'phone',
        'email',
        'active',
        'companies_id',
        'created_at',
        'updated_at'
    ];

    protected $attributes = [
        'name' => "",
        'surname' => "",
        'position' => "",
        'mobile' => "",
        'phone' => "",
        'email' => "",
        'active' => 1,
    ];


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

    public function scopeInCompany(Builder $query, $id): Builder
    {
        return $query->where('companies_id', '=', $id);
    }

    protected $appends = ['has_contacts', 'has_calendars'];

    public function getHasContactsAttribute()
    {
        return $this->salesContacts()->exists();
    }

    public function getHasCalendarsAttribute()
    {
        return $this->calendars()->exists();
    }
}
