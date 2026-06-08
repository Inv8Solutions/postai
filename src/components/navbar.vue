<template>
  <nav class="bg-white sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <a href="/" class="text-2xl font-bold hover:opacity-80 transition">
            <span class="text-gray-900">Post</span><span class="text-blue-600">AI</span>
          </a>
        </div>

        <!-- Desktop Navigation Links -->
        <div class="hidden md:flex md:items-center md:space-x-8">
          <a
            v-for="item in navigation"
            :key="item.name"
            href="#"
            @click.prevent="scrollTo(item.sectionId)"
            class="text-gray-700 hover:text-gray-900 text-sm font-medium transition duration-150 ease-in-out cursor-pointer"
          >
            {{ item.name }}
          </a>
        </div>

        <!-- Desktop CTA Button -->
        <div class="hidden md:block">
          <button
            @click="handleGetStarted"
            class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 focus:outline-none transition duration-150 ease-in-out"
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
            href="#"
            @click.prevent="scrollTo(item.sectionId); closeMenu()"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition duration-150 cursor-pointer"
          >
            {{ item.name }}
          </a>
          <div class="pt-3">
            <button
              @click="handleGetStartedMobile"
              class="w-full text-center px-3 py-2 rounded-lg text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-150"
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

const navigation = [
  { name: 'How It Works', sectionId: 'how-it-works' },
  { name: 'Features',     sectionId: 'features' },
  { name: 'Credits',      sectionId: 'pricing' },
  { name: 'Referral',     sectionId: 'referral' },
];

const menuOpen = ref(false);

const scrollTo = (sectionId) => {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const offset = 64; // navbar height
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};

const handleGetStarted = () => {
  scrollTo('pricing');
};

const handleGetStartedMobile = () => {
  scrollTo('pricing');
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