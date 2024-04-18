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

        $getValues = Datatables::prepare($searchable, $columnSorting, $querry, $where, 'active');
        $data = $getValues[0];


        $dataArray = [];
        // Kolumny
        foreach ($data->items() as $item) {

            $buttonsData = [
                [
                    'class' => 'btn-info',
                    'link' => route('companies.show', ['company' => $item->id]),
                    'image' => '/images/icons/datatables/view.svg'
                ], [
                    'class' => 'btn-primary',
                    'link' => route('companies.employees.index', ['company' => $item->id]),
                    'image' => '/images/icons/datatables/employees.svg'
                ], [
                    'class' => 'btn-warning',
                    'link' => route('companies.edit', ['company' => $item->id]),
                    'image' => '/images/icons/datatables/edit.svg'
                ]
            ];

            $dataArray[] = [
                $item->name_short,
                $item->name_complete,
                $item->country,
                Datatables::button('link', 'btn-ts-yellow', 'www.google.pl', 'show'),
                Datatables::buttons($buttonsData)
            ];
        }

        return  Datatables::send($getValues[1], $data->total(), $dataArray);
    }

    public function get(int $id)
    {
        // Zapytanie SQL
        $querry = DB::table('companies')->where('companies.id', '=', $id)->first();
        if ($querry->highways) {
            $querry->highways = explode(',', $querry->highways);
        } else {
            $querry->highways = [];
        }
        return $querry;
    }

    public function getList()
    {
        $querry = DB::table('companies')->select(
            'id',
            'name_short',
            'name_complete'
        )->orderBy('name_short', 'ASC')->get();

        return $querry;
    }

    public function getWithAdress(int $id)
    {
        // Zapytanie SQL
        $querry = DB::table('companies')->where('companies.id', '=', $id)->first();

        if ($querry->highways) {
            $querry->highways = explode(',', $querry->highways);
        } else {
            $querry->highways = [];
        }
        $higway_data = [];
        foreach ($querry->highways as $value) {
            $higway_data[] = DB::table('prices_highways')->select(
                'id',
                'name',
                'segment',
                'price',
            )->where('id', '=', $value)->first();
        }

        $querry->highways = $higway_data;

        $data[0] = $querry;

        return $data[0];
    }

    public function canBeRemoved(int $id)
    {
        // Zapytanie SQL
        $emplyees = DB::table('companies_employees')->where('company', '=', $id)->count();;
        $systems = DB::table('robotics_systems')->where('company_id', '=', $id)->count();;

        if (($emplyees + $systems) > 0) {
            return false;
        } else {
            return true;
        }
    }
}
