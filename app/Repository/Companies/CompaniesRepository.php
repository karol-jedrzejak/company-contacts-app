<?php

declare(strict_types=1);

namespace App\Repository\Companies;

interface CompaniesRepository
{
    public function ajax();
    public function get(int $id);
}

/*     public function getList();
    public function getWithAdress(int $id);
    public function canBeRemoved(int $id); */
