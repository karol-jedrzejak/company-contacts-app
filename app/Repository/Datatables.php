<?php

namespace App\Repository;

use Illuminate\Support\Facades\URL;

class Datatables
{
    public static function prepare($searchable, $columnSorting, $querry, $where, $activeFilter)
    {
        $request = request()->post();

        $order = $request['order'];
        $search = $request['search'];
        $filter = $search['value'];

        $querry->where(function ($query) use ($where) {
            for ($i = 0; $i < count($where); $i++) {
                $query->Where($where[$i][0], $where[$i][1], $where[$i][2]);
            }
        });

        $querry->where(function ($query) use ($searchable, $filter) {
            if ($filter != null) {
                for ($i = 0; $i < count($searchable); $i++) {
                    $query->OrWhere($searchable[$i], 'like', '%' . $filter . '%');
                }
            }
        });


        if ($activeFilter) {
            $active = $request['active'];

            $querry->where(function ($query) use ($active, $activeFilter) {
                if ($active == "0") {
                    $query->Where($activeFilter, '=', 1);
                }
            });
        }


        for ($i = 0; $i < count($order); $i++) {

            if (is_array($columnSorting[$order[$i]['column']])) {
                $array = $columnSorting[$order[$i]['column']];
                foreach ($array as $item) {
                    $querry = $querry->orderBy($item, $order[$i]['dir']);
                }
            } else {
                $querry = $querry->orderBy($columnSorting[$order[$i]['column']], $order[$i]['dir']);
            }
        }

        $querry = $querry->paginate($request['length'], $request['columns'], 'page', ($request['start'] / $request['length']) + 1);

        return [$querry, $request['draw']];
    }

    public static function send($draw, $total, $dataArray)
    {
        $json_data = array(
            "draw"            => intval($draw),
            "recordsTotal"    => intval($total),
            "recordsFiltered" => intval($total),
            "data"            => $dataArray  // total data array
        );

        return  json_encode($json_data);
    }

    public static function checkbox($id, $special = '')
    {
        $wrap[0] = '<input class="form-check-input" type="checkbox" value="';
        $wrap[1] = '" id="';
        $wrap[2] = '"';
        $wrap[3] = '>';

        return $wrap[0] . $id . $wrap[1] . $id . $wrap[2] . $special . $wrap[3];
    }

    public static function buttons($data)
    {
        $buttons = '<div class="datatable-button-container">';
        for ($i = 0; $i < count($data); $i++) {
            $disabled = '';
            if (isset($data[$i]['disabled'])) {
                if ($data[$i]['disabled'] = true) {
                    $disabled = ' disabled ';
                }
            }
            if (isset($data[$i]['onclick'])) {
                $buttons .= '<button class="btn datatable-button ' . $data[$i]['class'] . '" onclick="' . $data[$i]['onclick'] .
                    '" ' . $disabled . '><img src="' . URL::to('/') . $data[$i]['image'] . '" class="datatable-icon" $disabled/></button>';
            } else {
                $buttons .= '<a class="btn datatable-button ' . $data[$i]['class'] . '" href="' . $data[$i]['link'] .
                    '" ' . $disabled . '><img src="' . URL::to('/') . $data[$i]['image'] . '" class="datatable-icon" /></a>';
            }
        }
        $buttons .= '</div';

        return  $buttons;
    }

    public static function button($type, $class, $adress, $text)
    {
        switch ($type) {
            case 'mail':
                $wrap[0] = '<button onclick="location.href=\'mailto:';
                $wrap[1] = '\'" class="btn ';
                $wrap[2] = '">';
                $wrap[3] = '</button>';
                break;

            case 'tel':
                $wrap[0] = '<button onclick="location.href=\'tel:+48';
                $wrap[1] = '\'" class="btn ';
                $wrap[2] = '">+48 ';
                $wrap[3] = '</button>';
                break;

            case 'link':
                $wrap[0] = '<a href="';
                $wrap[1] = '" class="btn ';
                $wrap[2] = '">';
                $wrap[3] = '</a>';
                break;

            default:
                $wrap[0] = '<a href="';
                $wrap[1] = '" class="btn ';
                $wrap[2] = '">';
                $wrap[3] = '</a>';
                break;
        }


        $button = $wrap[0] . $adress . $wrap[1] . $class . $wrap[2] . $text . $wrap[3];

        return  $button;
    }


}
