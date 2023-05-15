<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->asciify('Producto-*****'),
            'price' => $this->faker->randomFloat(2, 50, 5000),
            'description' => $this->faker->paragraph(),
            'rate' => $this->faker->randomFloat(1, 0, 5),
            'quantity' => $this->faker->numberBetween(1, 100),
            'deliverTime' => $this->faker->numberBetween(1, 32),
            'category_id' => Category::inRandomOrder()->first()->id,
            'brand_id' => Brand::inRandomOrder()->first()->id,
        ];
    }
}
