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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('nip')->nullable();
            $table->string('name_short');
            $table->string('name_complete');
            $table->string('adress_number');
            $table->string('adress_street');
            $table->string('adress_city');
            $table->integer('adress_postcode');
            $table->string('country');
            $table->float('coordinate_latitude', 8, 4)->nullable();
            $table->float('coordinate_longitude', 8, 4)->nullable();
            $table->boolean('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
