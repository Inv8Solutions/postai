<template>
  <div class="bg-white border-b border-gray-200 py-7">
    <div class="max-w-6xl mx-auto px-6">
      <p class="text-center text-sm font-bold text-gray-900 mb-5">
        Trusted by small businesses across the Philippines
      </p>
      <div class="flex justify-center flex-wrap gap-8">
        <div v-for="item in businesses" :key="item.name" class="flex flex-col items-center gap-1.5">
          <span class="text-3xl text-blue-600">{{ item.emoji }}</span>
          <span class="text-sm font-semibold text-gray-600">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const businesses = [
  { emoji: '🏪', name: 'Carinderias' },
  { emoji: '✂️', name: 'Salons' },
  { emoji: '🍻', name: 'Resto-Bars' },
  { emoji: '🔧', name: 'Hardware Stores' },
  { emoji: '👗', name: 'Clothing Boutiques' },
  { emoji: '···', name: 'And more!' },
];
</script>
