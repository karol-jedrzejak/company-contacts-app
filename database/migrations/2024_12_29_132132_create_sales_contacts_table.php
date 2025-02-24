<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sales_contacts', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('companies_employees_id');
            $table->foreign('companies_employees_id')->references('id')->on('companies_employees');

            $table->string('topic');
            $table->set('importance', ['high', 'medium', 'low']);
            $table->boolean('active');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales_contacts');
    }
};
