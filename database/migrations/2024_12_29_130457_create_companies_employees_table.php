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
        Schema::create('companies_employees', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('companies_id');
            $table->foreign('companies_id')->references('id')->on('companies');

            $table->string('name');
            $table->string('surname');
            $table->string('position')->nullable();
            $table->string('mobile')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->boolean('active');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies_employees');
    }
};
