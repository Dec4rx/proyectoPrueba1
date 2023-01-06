<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->boolean('isAdmin')->default(false);
            $table->string('name',100);
            $table->string('last_name', 100);
            $table->string('email')->unique();
            $table->string('password');
            $table->date('birth');
            $table->string('gender', 100);
            $table->string('image')->default('images/default_u.png');
            $table->string('phone',20)->unique();
            $table->foreignId('address_id')->constrained();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
