<?php

declare(strict_types=1);

namespace App\Repository\Companies\Builder;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\DB;

use App\Models\Companies;
use App\Repository\Companies\CompaniesRepository as CompaniesRepositoryInterface;
use App\Repository\Datatables;

class CompaniesRepository implements CompaniesRepositoryInterface
{
    public function ajax()
    {

/*
id
nip
name_short
name_complete
adress_number
adress_street
adress_city
adress_postcode
country
coordinate_latitude
coordinate_longitude
active
created_at
updated_at
 */

        // Pola do wyszukania
        $searchable = [
            'name_short',
            'name_complete',
            'adress_city',
            'country',
        ];

        // Sortwanie kolumn
        $columnSorting = [
            'name_short',
            'name_complete',
            'country',
        ];

        // Zapytanie SQL
        $querry = DB::table('companies')->select(
                'id',
                'nip',
                'name_short',
                'name_complete',
                'adress_number',
                'adress_street',
                'adress_city',
                'adress_postcode',
                'country',
                'coordinate_latitude',
                'coordinate_longitude',
                'active',
            );

        $where = [];

        $getValues = Datatables::prepare($searchable, $columnSorting, $querry, $where,null);
        $data = $getValues[0];


        $dataArray = [];
        // Kolumny
        foreach ($data->items() as $item) {
            $buttonsData = [
                [
                    'class' => 'btn-info bi bi-binoculars',
                    'color' => 'blue',
                    'link' => route('companies.show', ['company' => $item->id]),
                    'image' => '/images/icons/datatables/view.svg'
                ], [
                    'class' => 'btn-warning bi bi-pencil-square',
                    'color' => 'yellow',
                    'link' => route('companies.edit', ['company' => $item->id]),
                    'image' => '/images/icons/datatables/employees.svg'
                ]
            ];

            $full_adress = $item->adress_number.'+'.
            $item->adress_street.'+'.
            $item->adress_city.'+'.
            $item->adress_postcode.'+'.
            $item->country;

            $googleLink = config('google.api.maps.route') . $full_adress;

            $dataArray[] = [
                $item->name_short,
                $item->name_complete,
                $item->country,
                Datatables::button('link', 'btn-primary', $googleLink, str_replace('+',' ',$full_adress)),
                Datatables::buttons($buttonsData)
            ];
        }

        return  Datatables::send($getValues[1], $data->total(), $dataArray);
    }

    public function get(int $id)
    {
        // Zapytanie SQL
        $querry = DB::table('companies')->where('companies.id', '=', $id)->first();
        return $querry;
    }

}
