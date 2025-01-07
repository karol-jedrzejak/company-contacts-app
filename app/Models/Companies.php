<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Companies extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nip',
        'name_short',
        'name_complete',
        'adress_number',
        'adress_street',
        'adress_city',
        'adress_postcode',
        'country',
        'coordinate_longitude',
        'coordinate_latitude',
        'active',
        'created_at',
        'updated_at'
    ];

    public function companiesEmployees(): HasMany
    {
        return $this->hasMany(CompaniesEmployees::class);
    }
}
