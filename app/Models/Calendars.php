<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Calendars extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'companies_employees_id',
        'description',
        'start',
        'end',
        'created_at',
        'updated_at'
    ];

    protected $attributes = [
        'user_id' => "",
        'companies_employees_id' => "",
        'description' => "",
        'start' => "",
        'end' => "",
    ];

    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function companiesEmployees(): BelongsTo
    {
        return $this->belongsTo(CompaniesEmployees::class);
    }
}
