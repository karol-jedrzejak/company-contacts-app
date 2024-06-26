<?php

declare(strict_types=1);

namespace App\Repository\Companies;

interface CompaniesEmployeesRepository
{
    public function ajax(int $companyId);
    public function get(int $id);
}
