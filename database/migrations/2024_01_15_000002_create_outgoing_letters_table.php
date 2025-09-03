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
        Schema::create('outgoing_letters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->integer('sequence_number')->comment('Auto-generated sequential number');
            $table->string('letter_code')->comment('Manual letter code input');
            $table->string('subject')->comment('Letter subject/matter');
            $table->string('destination')->comment('Letter destination');
            $table->date('letter_date')->comment('Letter date');
            $table->enum('category', ['ketua', 'sekretaris', 'panitera'])->comment('Letter category');
            $table->string('full_number')->comment('Complete formatted letter number');
            $table->integer('year')->comment('Year extracted from letter_date');
            $table->integer('month')->comment('Month extracted from letter_date');
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['category', 'year']);
            $table->index('letter_date');
            $table->index('user_id');
            $table->index(['year', 'month']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('outgoing_letters');
    }
};