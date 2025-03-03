<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SalesContacts extends Model
{
    use HasFactory;

    public function salesContactsStatuses(): HasMany
    {
        return $this->hasMany(SalesContactsStatuses::class);
    }

    public function companiesEmployees(): BelongsTo
    {
        return $this->belongsTo(CompaniesEmployees::class);
    }

    protected $fillable = [
        'companies_employees_id',
        'topic',
        'importance',
        'active',
        'created_at',
        'updated_at'
    ];

    protected $attributes = [
        'companies_employees_id' => "",
        'topic' => "",
        'importance' => "high",
        'active' => 1,
    ];
}
