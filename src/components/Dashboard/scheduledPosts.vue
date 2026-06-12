<script setup>
import { 
  CalendarClock, 
  Pencil, 
  Trash2, 
  Clock, 
  Megaphone, 
  Gift
} from 'lucide-vue-next'

// --- Mock Data for Posts ---
const posts = [
  {
    id: 1,
    status: 'Scheduled',
    category: 'Holiday Greeting',
    icon: Gift, // Using Gift for holiday theme
    content: 'Maligayang Pasko at Manigong Bagong Taon mula sa aming pamilya sa asd! 🎄 Salamat sa inyong walang sawang suporta sa buong taon. Nawa ay puno ng pagmamahal at kasiyahan ang inyong Pasko at Bagong Taon!',
    date: 'Fri, Jun 12, 10:00 AM PHT',
    author: 'asd'
  },
  {
    id: 2,
    status: 'Scheduled',
    category: 'Announcement',
    icon: Megaphone, // Using Megaphone for announcement
    content: 'May bagong balita kami para sa inyo! 📢 Sobrang excited na kaming ibahagi ito. Abangan ang susunod naming post para sa lahat ng detalye. #Anunsyo #asd',
    date: 'Fri, Jun 12, 10:00 AM PHT',
    author: 'asd'
  }
]

// --- Tabs ---
const tabs = ['Upcoming', 'Published', 'All Posts']
const activeTab = 'Upcoming'
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-4 md:p-8">
    <div class="max-w-7xl mx-auto space-y-6">
      
      <!-- ==================== PAGE HEADER ==================== -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Scheduled Posts</h1>
          <p class="text-sm text-gray-500 mt-1">All your upcoming and past posts in one place.</p>
        </div>
        <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 px-5 rounded-lg flex items-center gap-2 transition-all shadow-sm hover:shadow-md shrink-0">
          <Pencil class="w-4 h-4" />
          Create Post
        </button>
      </div>

      <!-- ==================== TABS ==================== -->
      <div class="flex gap-3">
        <button 
          v-for="tab in tabs" 
          :key="tab"
          class="px-5 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="[
            activeTab === tab 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          ]"
        >
          {{ tab }}
        </button>
      </div>

      <!-- ==================== POSTS LIST ==================== -->
      <div class="space-y-4">
        
        <div 
          v-for="post in posts" 
          :key="post.id"
          class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center gap-4"
        >
          <!-- Left: Status Badge -->
          <div class="w-full md:w-32 shrink-0 flex items-center gap-2 text-blue-600 font-medium text-sm">
            <CalendarClock class="w-4 h-4" />
            <span>{{ post.status }}</span>
          </div>

          <!-- Middle: Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <component :is="post.icon" class="w-3 h-3" />
              <span>{{ post.category }}</span>
            </div>
            <p class="text-sm text-gray-800 line-clamp-2 leading-relaxed">
              {{ post.content }}
            </p>
          </div>

          <!-- Right: Date & Actions -->
          <div class="w-full md:w-auto shrink-0 flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
            
            <!-- Date Info -->
            <div class="text-right">
              <p class="text-xs font-semibold text-gray-700">{{ post.date }}</p>
              <p class="text-[10px] text-gray-400">{{ post.author }}</p>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2">
              <button class="flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                <Pencil class="w-3 h-3" />
                Edit
              </button>
              <button class="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 class="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  </div>
</template>