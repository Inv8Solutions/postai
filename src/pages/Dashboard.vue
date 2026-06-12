<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar - Left Side -->
    <Sidebar />

    <!-- Main Content - Right Side -->
    <main class="flex-1 overflow-y-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Sidebar from '../components/Dashboard/Sidebar.vue';
</script>