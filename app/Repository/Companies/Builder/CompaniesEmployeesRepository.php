<?php

declare(strict_types=1);

namespace App\Repository\Companies\Builder;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\DB;

use App\Repository\Companies\CompaniesEmployeesRepository as CompaniesEmployeesRepositoryInterface;
use App\Http\Datatransfer\Datatable;

class CompaniesEmployeesRepository implements CompaniesEmployeesRepositoryInterface
{
    public function ajax(int $companyId)
    {
        // Pola do wyszukania
        $searchable = [
            'name',
            'surname',
            'name_short',
            'position',
            'phone',
        ];

        // Sortwanie kolumn
        $columnSorting = [
            'name',
            'surname',
            'name_short',
            'position',
            'phone',
            'email',
            'name'
        ];

        // Zapytanie SQL
        $querry = DB::table('companies_employees')
            ->join('companies', 'companies_employees.company', '=', 'companies.id')
            ->select(
                'companies_employees.id as employee_id',
                'name_short',
                'name',
                'surname',
                'position',
                'phone',
                'email',
                'companies.id as company_id',
            );

        $where = [['companies.id', '=', $companyId]];

        $getValues = Datatable::prepare($searchable, $columnSorting, $querry, $where, 'companies_employees.active');
        $data = $getValues[0];

        $dataArray = [];
        // Kolumny
        foreach ($data->items() as $item) {
            if ($item->email != '') {
                $item->email = Datatable::button('mail', 'btn-ts-yellow', $item->email, $item->email);
            }

            if ($item->phone != '') {
                $item->phone = Datatable::button('tel', 'btn-ts-yellow', $item->phone, $item->phone);
            }

            $buttonsData = [
                [
                    'class' => 'btn-info',
                    'link' => route('employees.show', ['employee' => $item->employee_id]),
                    'image' => '/images/icons/datatables/view.svg'
                ], [
                    'class' => 'btn-ts-yellow',
                    'link' => route('employees.edit', ['employee' => $item->employee_id]),
                    'image' => '/images/icons/datatables/edit.svg'
                ]
            ];

            $dataArray[] = [
                $item->name,
                $item->surname,
                $item->position,
                $item->phone,
                $item->email,
                Datatable::buttons($buttonsData),
            ];
        }

        return  Datatable::send($getValues[1], $data->total(), $dataArray);
    }

    public function get(int $id)
    {
        // Zapytanie SQL
        $querry = DB::table('companies_employees')->where('id', '=', $id)->first();
        if (substr($querry->name, -1) == 'a') {
            $querry->gender = "female";
        } else {
            $querry->gender = "male";
        }
        return $querry;
    }

    public function getCompany(int $id)
    {
        // Zapytanie SQL
        $querry = DB::table('companies')->join('companies_employees', 'companies.id', '=', 'companies_employees.company')
            ->select(
                'companies.id',
                'companies.nip',
                'companies.name_short',
                'companies.name_complete',
                'companies.adress_street',
                'companies.adress_number',
                'companies.adress_sub_number',
                'companies.adress_city',
                'companies.adress_postcode',
                'companies.adress_post_office',
            )->where('companies_employees.id', '=', $id)->first();

        $data[0] = $querry;
        Datatable::addAdress($data);

        return $data[0];
    }

    public function getList()
    {
        // Zapytanie SQL
        $querry = DB::table('companies_employees')
            ->select(
                'id',
                'name',
                'surname',
                'company',
            )->orderBy('name', 'ASC')->orderBy('surname', 'ASC')->get();

        return $querry;
    }

    public function canBeRemoved(int $id)
    {
        // Zapytanie SQL
        $sales_topics = DB::table('sales_topics')->where('companies_employees_id', '=', $id)->count();;
        $r_certificates = DB::table('ceia_participation')->where('employee_id', '=', $id)->count();;
        $c_certificates = DB::table('robotics_certificates')->where('employee_id', '=', $id)->count();;

        if (($sales_topics + $r_certificates + $c_certificates) > 0) {
            return false;
        } else {
            return true;
        }
    }
}
