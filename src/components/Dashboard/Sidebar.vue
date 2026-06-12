<script setup>
import { useRoute } from 'vue-router';
import { 
  LayoutDashboard, 
  Pencil, 
  CalendarClock, 
  CalendarDays, 
  Palette, 
  Zap, 
  Users, 
  ArrowRight, 
  LogOut 
} from 'lucide-vue-next';

const route = useRoute();

const navigationItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard/main' },
  { name: 'Create Post', icon: Pencil, path: '/generate' },
  { name: 'Scheduled Posts', icon: CalendarClock, path: '/dashboard/scheduled-posts' },
  { name: 'Calendar', icon: CalendarDays, path: '/dashboard/calendar' },
  { name: 'Brand Kit', icon: Palette, path: '/dashboard/brand-kit' },
  { name: 'Credits', icon: Zap, path: '/dashboard/credits' },
  { name: 'Referrals', icon: Users, path: '/dashboard/referrals' },
];

function isActive(item) {
  return route.path === item.path;
}
</script>

<template>
  <aside class="w-72 h-screen bg-white border-r border-gray-100 flex flex-col font-sans">
    
    <!-- Logo -->
    <div class="px-6 py-5">
      <h1 class="text-xl font-bold tracking-tight">
        Post<span class="text-blue-600">AI</span>
      </h1>
    </div>

    <!-- Scrollable Navigation Area -->
    <div class="flex-1 overflow-y-auto px-4 py-2 space-y-2">
      
      <!-- Navigation Links -->
      <router-link 
        v-for="item in navigationItems" 
        :key="item.name"
        :to="item.path"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-200"
        :class="[
          isActive(item) 
            ? 'bg-blue-50 text-blue-700' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        ]"
      >
        <component 
          :is="item.icon" 
          class="w-5 h-5 shrink-0"
          :class="isActive(item) ? 'text-blue-600' : 'text-gray-500'"
        />
        <span class="text-sm font-medium">{{ item.name }}</span>
      </router-link>

    </div>

    <!-- Bottom Section: Credits & Profile -->
    <div class="px-4 pb-4 space-y-4">
      
      <!-- Blue Credits Card -->
      <div class="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-center shadow-lg shadow-blue-200">
        <p class="text-blue-200 text-[10px] uppercase tracking-wider font-semibold mb-1">
          Credits Left
        </p>
        <p class="text-white text-3xl font-bold mb-3">14</p>
        <button class="w-full bg-[#FFCC02] hover:bg-yellow-400 text-gray-900 text-xs font-bold py-2 rounded-full flex items-center justify-center gap-1 transition-colors">
          Top Up
          <ArrowRight class="w-3 h-3" />
        </button>
      </div>

      <!-- User Profile Section -->
      <div class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
        <div class="flex items-center gap-3">
          <!-- Avatar Placeholder -->
          <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <Users class="w-4 h-4" />
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-bold text-gray-900">User</span>
            <span class="text-[10px] text-gray-500">asd</span>
          </div>
        </div>
        <button class="text-gray-400 hover:text-gray-600">
          <LogOut class="w-4 h-4" />
        </button>
      </div>

    </div>
  </aside>
</template>