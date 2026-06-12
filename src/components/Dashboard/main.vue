<script setup>
import { useRouter } from 'vue-router';
import { 
  CalendarClock, 
  Zap, 
  Check, 
  Users, 
  Pencil, 
  Palette, 
  CalendarDays, 
  FileText, 
  ArrowRight
} from 'lucide-vue-next';
import { useUserStore } from '../../stores/userStore'
import { computed } from 'vue';

const router = useRouter();
const userStore = useUserStore()

// Get user name from store, fallback to 'User' if not available
const userName = computed(() => userStore.userName || 'User');

function navigateTo(path) {
  router.push(path);
}

// --- Data ---
const stats = [
  { label: 'Scheduled Posts', value: '2', icon: CalendarClock, iconBg: 'bg-blue-50', iconColor: 'text-blue-500' },
  { label: 'Credits Remaining', value: '14', icon: Zap, iconBg: 'bg-amber-50', iconColor: 'text-amber-500' },
  { label: 'Posts Published', value: '0', icon: Check, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-500' },
  { label: 'Referrals Sent', value: '0', icon: Users, iconBg: 'bg-purple-50', iconColor: 'text-purple-500' },
];

const quickActions = [
  { 
    title: 'Create New Post', 
    description: 'Generate a branded Facebook post', 
    icon: Pencil, 
    iconColor: 'text-orange-500',
    route: '/generate'
  },
  { 
    title: 'Edit Brand Kit', 
    description: 'Update your logo, colors & tone', 
    icon: Palette, 
    iconColor: 'text-pink-500',
    route: '/dashboard/brand-kit'
  },
  { 
    title: 'View Schedule', 
    description: 'See your upcoming posts', 
    icon: CalendarDays, 
    iconColor: 'text-blue-500',
    route: '/dashboard/scheduled-posts'
  },
  { 
    title: 'Buy Credits', 
    description: 'Top up and keep posting', 
    icon: Zap, 
    iconColor: 'text-amber-500',
    route: '/dashboard/credits'
  },
];
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-4 md:p-8">
    <div class="max-w-7xl mx-auto space-y-6">
      
      <!-- ==================== HEADER ==================== -->
      <header class="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-6 md:p-8 text-white shadow-lg shadow-blue-100">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div class="space-y-1">
            <h1 class="text-2xl md:text-3xl font-bold flex items-center gap-2">
              Good morning, {{ userName }}! <span class="text-3xl">👋</span>
            </h1>
            <p class="text-blue-100 text-sm md:text-base font-light opacity-90">
              Here's what's happening with your business.
            </p>
          </div>
        <div @click="navigateTo('/generate')">
            <button class="bg-[#FFCC02] hover:bg-yellow-400 text-gray-900 font-semibold text-sm py-2.5 px-6 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
              <Pencil class="w-4 h-4 text-gray-700" />
              Create Post
            </button>
          </div>
        </div>
      </header>

      <!-- ==================== STATS CARDS ==================== -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          v-for="stat in stats" 
          :key="stat.label"
          class="bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div 
            class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            :class="stat.iconBg"
          >
            <component :is="stat.icon" :class="['w-6 h-6', stat.iconColor]" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
            <p class="text-xs font-medium text-gray-500">{{ stat.label }}</p>
          </div>
        </div>
      </div>

      <!-- ==================== QUICK ACTIONS ==================== -->
      <div>
  <h2 class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 ml-1">Quick Actions</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div 
      v-for="action in quickActions" 
      :key="action.title"
      @click="navigateTo(action.route)"
      class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
    >
      <div class="mb-3">
        <component 
          :is="action.icon" 
          :class="['w-8 h-8', action.iconColor, 'opacity-80']" 
        />
      </div>
      <h3 class="font-bold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">
        {{ action.title }}
      </h3>
      <p class="text-xs text-gray-500 leading-relaxed">
        {{ action.description }}
      </p>
    </div>
  </div>
</div>

      <!-- ==================== RECENT ACTIVITY (EMPTY STATE) ==================== -->
      <div>
        <h2 class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 ml-1">Recent Activity</h2>
        
        <!-- Empty State Box -->
        <div class="w-full bg-white rounded-xl border-2 border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center shadow-sm">
          
          <!-- Icon -->
          <div class="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mb-4">
            <FileText class="w-8 h-8 text-gray-400" />
          </div>
          
          <!-- Text -->
          <h3 class="text-lg font-bold text-gray-900 mb-1">No posts yet</h3>
          <p class="text-sm text-gray-500 mb-6 max-w-sm">
            Create your first post to see activity here.
          </p>
          
          <!-- Primary Action Button -->
          <button 
            @click="navigateTo('/generate')"
            class="bg-[#FFCC02] hover:bg-yellow-400 text-gray-900 font-semibold text-sm py-3 px-8 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
          >
            <Pencil class="w-4 h-4 text-gray-700" />
            Create My First Post
            <ArrowRight class="w-4 h-4 text-gray-700" />
          </button>

        </div>
      </div>

    </div>
  </div>
</template>