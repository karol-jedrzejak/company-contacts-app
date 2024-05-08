<?php

declare(strict_types=1);

namespace App\Repository\Companies;

interface CompaniesRepository
{
    public function ajax();
    public function get(int $id);
}
