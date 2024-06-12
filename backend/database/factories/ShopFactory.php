<?php

namespace Database\Factories;

use App\Models\Shop;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ShopFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Shop::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->company,
            'phone' => fake()->unique()->phoneNumber,
            'address' => $this->faker->address,
            'community' => $this->faker->randomElement(['Andalucía', 'Aragón', 'Asturias', 'Islas Baleares', 'Canarias', 'Cantabria', 'Castilla-La Mancha', 'Castilla y León', 'Cataluña', 'Extremadura', 'Galicia', 'Madrid', 'Murcia', 'Navarra', 'País Vasco', 'La Rioja', 'Comunidad Valenciana']),
            'postal_code' => $this->faker->postcode,
            'job' => $this->faker->randomElement(['Restaurant', 'Clothing Store', 'Supermarket', 'Cafeteria', 'Bookstore', 'Pharmacy', 'Hardware Store', 'Jewelry Store', 'Bakery', 'Flower Shop', 'Hair Salon', 'Beauty Salon', 'Electronics Store', 'Pet Store', 'Sporting Goods Store', 'Furniture Store', 'Mechanic Workshop', 'Toy Store', 'Pastry Shop', 'Ice Cream Shop', 'Tobacco Shop', 'Greengrocery', 'Shoe Store', 'Optics', 'Laundry', 'Photography Studio', 'Travel Agency', 'Stationery Store', 'Video Store', 'Music Store']),
        ];
    }
}
