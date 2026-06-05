<template>
  <section class="py-6 md:py-6 px-2 bg-white">
    <div class="max-w-7xl mx-auto text-center">
      <!-- Section Title -->
      <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
        Trusted by small businesses across the Philippines
      </h2>

      <!-- Business Categories Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
        <div
          v-for="business in businesses"
          :key="business.name"
          class="group flex flex-col items-center p-4 rounded-xl transition-all duration-300 hover:bg-gray-50 hover:shadow-md cursor-default"
        >
          <!-- Icon Container -->
          <div class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
            <i :class="[business.icon, business.iconColor]" class="text-3xl md:text-4xl"></i>
          </div>
          
          <!-- Business Name -->
          <span class="text-gray-700 font-medium text-sm md:text-base text-center">
            {{ business.name }}
          </span>
        </div>
      </div>

      <!-- Decorative Divider Line -->
      <div class="mt-12 flex justify-center">
        <div class="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

// Business data with Font Awesome / Icons8 icons
const businesses = ref([
  {
    name: 'Carinderias',
    icon: 'fas fa-utensils', // Font Awesome solid
    iconColor: 'text-orange-500'
  },
  {
    name: 'Salons',
    icon: 'fas fa-cut', // Font Awesome solid
    iconColor: 'text-pink-500'
  },
  {
    name: 'Resto-Bars',
    icon: 'fas fa-cocktail', // Font Awesome solid
    iconColor: 'text-red-500'
  },
  {
    name: 'Hardware Stores',
    icon: 'fas fa-tools', // Font Awesome solid
    iconColor: 'text-yellow-600'
  },
  {
    name: 'Clothing Boutiques',
    icon: 'fas fa-tshirt', // Font Awesome solid
    iconColor: 'text-purple-500'
  },
  {
    name: 'And more!',
    icon: 'fas fa-ellipsis-h', // Font Awesome solid
    iconColor: 'text-indigo-500'
  }
]);
</script>