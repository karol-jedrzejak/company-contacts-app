<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function get_set_values(string $table, string $column)
    {
        // Zapytanie SQL
        $querry = DB::table('information_schema.COLUMNS')
            ->select('COLUMN_TYPE')
            ->where('TABLE_SCHEMA', '=', env('DB_DATABASE'))
            ->where('TABLE_NAME', '=', $table)
            ->where('COLUMN_NAME', '=', $column)->first();

        $options = rtrim($querry->COLUMN_TYPE, ")");
        $options = ltrim($options, "set(");

        $options = str_getcsv($options, ",", "'");

        return $options;
    }

    public function get_multiple_set_values(string $table, array $columns)
    {
        $data = (object) [];

        for ($i = 0; $i < count($columns); $i++) {

            $querry = DB::table('information_schema.COLUMNS')
                ->select('COLUMN_TYPE')
                ->where('TABLE_SCHEMA', '=', env('DB_DATABASE'))
                ->where('TABLE_NAME', '=', $table)
                ->where('COLUMN_NAME', '=', $columns[$i])->first();

            $options = rtrim($querry->COLUMN_TYPE, ")");
            $options = ltrim($options, "set(");

            $options = str_getcsv($options, ",", "'");

            $column_name = strval($columns[$i]);
            $data->$column_name = $options;
        }
        return $data;
    }
}
