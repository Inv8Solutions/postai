<template>
  <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <a href="/" class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition">
            PostAI
          </a>
        </div>

        <!-- Desktop Navigation Links -->
        <div class="hidden md:flex md:items-center md:space-x-8">
          <a
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            class="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out hover:bg-gray-50 rounded-md"
          >
            {{ item.name }}
          </a>
        </div>

        <!-- Desktop CTA Button -->
        <div class="hidden md:block">
          <button
            @click="handleGetStarted"
            class="px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out shadow-sm"
          >
            Get Started Free
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMenu"
            class="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-1"
            aria-label="Toggle menu"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              v-if="!menuOpen"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              v-else
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu panel (with transition) -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-show="menuOpen" class="md:hidden border-t border-gray-200 bg-white py-2 shadow-lg">
        <div class="space-y-1 px-2 pt-2 pb-3">
          <a
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            @click="closeMenu"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition duration-150"
          >
            {{ item.name }}
          </a>
          <div class="pt-3">
            <button
              @click="handleGetStartedMobile"
              class="w-full text-center px-3 py-2 rounded-md text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 shadow-sm"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Navigation items data
const navigation = [
  { name: 'How It Works', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Credits', href: '#' },
  { name: 'Referral', href: '#' }
];

const menuOpen = ref(false);

// Emit custom event for parent component
const emit = defineEmits(['get-started']);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};

const handleGetStarted = () => {
  emit('get-started');
};

const handleGetStartedMobile = () => {
  emit('get-started');
  closeMenu();
};

// Close mobile menu when window is resized to desktop breakpoint (md: 768px)
const handleResize = () => {
  if (window.innerWidth >= 768 && menuOpen.value) {
    menuOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
/* Tailwind CSS handles all styling - no custom CSS needed */
/* Transition classes are applied via Vue Transition component */
</style>