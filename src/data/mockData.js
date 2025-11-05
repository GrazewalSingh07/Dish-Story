import biryaniVideo from '../assets/4912627-uhd_3840_2160_24fps.mp4';

export const mockData = {
  "restaurants": [
    {
      "id": "r1",
      "name": "Spice Route Bistro",
      "logo": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop",
      "stories": [
        {
          "dishId": "d1",
          "dishName": "Butter Chicken",
          "description": "Tender chicken pieces simmered in a rich, creamy tomato-based curry with aromatic spices. Served with fragrant basmati rice and naan bread.",
          "basePrice": 9.99,
          "media": [
            {
              "id": "m1",
              "type": "image",
              "url": "https://images.pexels.com/photos/16068667/pexels-photo-16068667.jpeg?_gl=1*2hqk40*_ga*MjA0MTYxNDM5Ny4xNzYyMzMyMzY3*_ga_8JE65Q40S6*czE3NjIzMzIzNjckbzEkZzEkdDE3NjIzMzI0NjUkajU5JGwwJGgw",
              "duration": 5000,
              "hotspots": [
                {
                  "id": "h1",
                  "x": 0.85,
                  "y": 0.5,
                  "ingredientId": "i1"
                },
                {
                  "id": "h2",
                  "x": 0.65,
                  "y": 0.45,
                  "ingredientId": "i2"
                }
              ]
            }
          ],
          "ingredients": [
          {
              "id": "i8",
              "name": "Soft-Boiled Egg",
              "image": "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&h=200&fit=crop",
              "nutrition": {
                "calories": 150,
                "protein_g": 12,
                "carbs_g": 1,
                "fat_g": 10
              },
              "allergens": ["Eggs"],
              "customizable": true,
              "quantity": 1,
              "priceImpact": 0,
              "substitutions": [
                {
                  "name": "Vegan Egg",
                  "priceChange": 0.75,
                  "id": "i5a"
                }
              ]
            },
            {
              "id": "i1",
              "name": "Chicken",
              "image": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=200&fit=crop",
              "nutrition": {
                "calories": 250,
                "protein_g": 25,
                "carbs_g": 0,
                "fat_g": 15
              },
              "allergens": [],
              "customizable": true,
              "quantity": 1,
              "priceImpact": 0,
              "substitutions": [
                {
                  "name": "Tofu",
                  "priceChange": -1,
                  "id": "i1a"
                }
              ]
            },
            {
              "id": "i2",
              "name": "Butter Sauce",
              "image": "https://images.unsplash.com/photo-1603532559029-5a4d3e8b5b3e?w=200&h=200&fit=crop",
              "nutrition": {
                "calories": 180,
                "protein_g": 2,
                "carbs_g": 5,
                "fat_g": 16
              },
              "allergens": ["Dairy"],
              "customizable": true,
              "quantity": 1,
              "priceImpact": 0,
              "substitutions": [
                {
                  "name": "Cashew Cream",
                  "priceChange": 0.5,
                  "id": "i2a"
                }
              ]
            },
            {
              "id": "i3",
              "name": "Cilantro Garnish",
              "image": "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=200&h=200&fit=crop",
              "nutrition": {
                "calories": 5,
                "protein_g": 0.3,
                "carbs_g": 1,
                "fat_g": 0.1
              },
              "allergens": [],
              "customizable": true,
              "quantity": 1,
              "priceImpact": 0,
              "substitutions": [
                {
                  "name": "Mint Leaves",
                  "priceChange": 0.25,
                  "id": "i3a"
                }
              ]
            }
          ]
        },
        {
          "dishId": "d2",
          "dishName": "Paneer Tikka Masala",
          "description": "Creamy and flavorful curry with grilled paneer cubes in a rich tomato-based sauce. Perfect for vegetarians, served with rice and naan.",
          "basePrice": 8.49,
          "media": [
            {
              "id": "m3",
              "type": "image",
              "url": "https://images.pexels.com/photos/12737816/pexels-photo-12737816.jpeg?_gl=1*qwgjyr*_ga*MjA0MTYxNDM5Ny4xNzYyMzMyMzY3*_ga_8JE65Q40S6*czE3NjIzMzIzNjckbzEkZzEkdDE3NjIzMzI1NTckajI4JGwwJGgw",
              "duration": 5000,
              "hotspots": [
                {
                  "id": "h4",
                  "x": 0.4,
                  "y": 0.4,
                  "ingredientId": "i4"
                }
              ]
            }
          ],
          "ingredients": [
            {
              "id": "i4",
              "name": "Paneer Cubes",
              "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop",
              "nutrition": {
                "calories": 320,
                "protein_g": 20,
                "carbs_g": 8,
                "fat_g": 25
              },
              "allergens": ["Dairy"],
              "customizable": true,
              "quantity": 1,
              "priceImpact": 0,
              "substitutions": [
                {
                  "name": "Tofu Cubes",
                  "priceChange": -0.5,
                  "id": "i4a"
                }
              ]
            }
          ]
        },
        {
          "dishId": "d5",
          "dishName": "Lamb Biryani",
          "description": "Fragrant basmati rice layered with tender, slow-cooked lamb pieces, aromatic spices, and saffron. Served with raita and a hard-boiled egg. A true celebration of flavors.",
          "basePrice": 14.99,
          "media": [
            {
              "id": "m6",
              "type": "video",
              "url": biryaniVideo,
              "hotspots": [
                {
                  "id": "h8",
                  "x": 0.5,
                  "y": 0.4,
                  "ingredientId": "i9"
                },
                {
                  "id": "h9",
                  "x": 0.7,
                  "y": 0.6,
                  "ingredientId": "i10"
                }
              ]
            }
          ],
          "ingredients": [
            {
              "id": "i9",
              "name": "Lamb Pieces",
              "image": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=200&fit=crop",
              "nutrition": {
                "calories": 280,
                "protein_g": 28,
                "carbs_g": 0,
                "fat_g": 18
              },
              "allergens": [],
              "customizable": true,
              "quantity": 1,
              "priceImpact": 0,
              "substitutions": [
                {
                  "name": "Chicken Pieces",
                  "priceChange": -2.0,
                  "id": "i9a"
                },
                {
                  "name": "Vegetables",
                  "priceChange": -3.0,
                  "id": "i9b"
                }
              ]
            },
            {
              "id": "i10",
              "name": "Saffron Rice",
              "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop",
              "nutrition": {
                "calories": 200,
                "protein_g": 4,
                "carbs_g": 45,
                "fat_g": 0.5
              },
              "allergens": [],
              "customizable": true,
              "quantity": 1,
              "priceImpact": 0,
              "substitutions": [
                {
                  "name": "Brown Rice",
                  "priceChange": 0,
                  "id": "i10a"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "r2",
      "name": "Tokyo Street Eats",
      "logo": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop",
      "stories": [
        {
          "dishId": "d3",
          "dishName": "Ramen Bowl Deluxe",
          "description": "Authentic Japanese ramen with rich, savory broth, perfectly cooked noodles, tender chashu pork, and a perfectly soft-boiled egg. A comforting bowl of pure satisfaction.",
          "basePrice": 12.5,
          "media": [
            {
              "id": "m4",
              "type": "image",
              "url": "https://images.pexels.com/photos/1907229/pexels-photo-1907229.jpeg?_gl=1*1yv5hjn*_ga*MjA0MTYxNDM5Ny4xNzYyMzMyMzY3*_ga_8JE65Q40S6*czE3NjIzMzIzNjckbzEkZzEkdDE3NjIzMzI4MDgkajIzJGwwJGgw",
              "duration": 5000,
              "hotspots": [
                {
                  "id": "h5",
                  "x": 0.45,
                  "y": 0.55,
                  "ingredientId": "i5"
                },
                {
                  "id": "h6",
                  "x": 0.35,
                  "y": 0.45,
                  "ingredientId": "i6"
                }
              ]
            }
          ],
          "ingredients": [
            {
              "id": "i5",
              "name": "Soft-Boiled Egg",
              "image": "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&h=200&fit=crop",
              "nutrition": {
                "calories": 150,
                "protein_g": 12,
                "carbs_g": 1,
                "fat_g": 10
              },
              "allergens": ["Eggs"],
              "customizable": true,
              "quantity": 1,
              "priceImpact": 0,
              "substitutions": [
                {
                  "name": "Vegan Egg",
                  "priceChange": 0.75,
                  "id": "i5a"
                }
              ]
            },
            {
              "id": "i6",
              "name": "Pork Chashu",
              "image": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=200&fit=crop",
              "nutrition": {
                "calories": 200,
                "protein_g": 22,
                "carbs_g": 0,
                "fat_g": 12
              },
              "allergens": [],
              "customizable": true,
              "quantity": 1,
              "priceImpact": 0,
              "substitutions": [
                {
                  "name": "Tofu Protein",
                  "priceChange": -0.5,
                  "id": "i6a"
                }
              ]
            }
          ]
        },
        {
          "dishId": "d4",
          "dishName": "Sushi Platter",
          "description": "Fresh, premium-grade salmon sushi expertly prepared by our master chefs. Each piece is a perfect balance of flavor and texture, served with wasabi and pickled ginger.",
          "basePrice": 15.99,
          "media": [
            {
              "id": "m5",
              "type": "image",
              "url": "https://images.pexels.com/photos/2098134/pexels-photo-2098134.jpeg?_gl=1*d59qkz*_ga*MjA0MTYxNDM5Ny4xNzYyMzMyMzY3*_ga_8JE65Q40S6*czE3NjIzMzIzNjckbzEkZzEkdDE3NjIzMzI5MjIkajQzJGwwJGgw",
              "duration": 5000,
              "hotspots": [
                {
                  "id": "h7",
                  "x": 0.5,
                  "y": 0.5,
                  "ingredientId": "i7"
                }
              ]
            }
          ],
          "ingredients": [
            {
              "id": "i7",
              "name": "Salmon",
              "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=200&fit=crop",
              "nutrition": {
                "calories": 180,
                "protein_g": 20,
                "carbs_g": 0,
                "fat_g": 10
              },
              "allergens": ["Fish"],
              "customizable": true,
              "quantity": 1,
              "priceImpact": 0,
              "substitutions": [
                {
                  "name": "Avocado (Veg Option)",
                  "priceChange": -1,
                  "id": "i7a"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

