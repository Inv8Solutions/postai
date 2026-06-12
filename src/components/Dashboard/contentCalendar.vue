<script setup>
import { ref, computed } from 'vue'
import { 
  Pencil, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Plus,
  Sun,
  Gift,
  Medal,
  Church,
  Heart,
  Star
} from 'lucide-vue-next'
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays,
  getDaysInMonth
} from 'date-fns'

// --- Calendar Logic ---
const currentDate = ref(new Date(2026, 5, 1)) // June 2026
const selectedDate = ref(new Date(2026, 5, 18)) // June 18, 2026 (From screenshot)

// Generate days for the current month view
const days = computed(() => {
  const start = startOfWeek(startOfMonth(currentDate.value), { weekStartsOn: 0 })
  const end = endOfWeek(endOfMonth(currentDate.value), { weekStartsOn: 0 })
  const daysArray = []
  let day = start
  
  while (day <= end) {
    daysArray.push(day)
    day = addDays(day, 1)
  }
  return daysArray
})

// --- Mock Data for Holidays & Events ---
// (Based on the screenshot showing June 12, 2026 as Independence Day)
const events = [
  { 
    date: new Date(2026, 5, 12), 
    title: 'Independence Day', 
    type: 'regular', 
    color: 'red',
    icon: Star
  }
]

// Check if a date has an event
const getEventForDate = (date) => {
  return events.find(event => isSameDay(event.date, date))
}

const getEventTypeClass = (type) => {
  const classes = {
    red: 'border-red-200 bg-red-50 text-red-700',
    // Adding other placeholder types
    special: 'border-orange-200 bg-orange-50 text-orange-700'
  }
  return classes[type] || classes.red
}

// --- Upcoming Holidays List (Mock Data) ---
const upcomingHolidays = [
  { 
    id: 1, 
    name: 'Independence Day', 
    date: 'Jun 12, 2026', 
    daysLeft: 'Today!', 
    icon: Star, 
    color: 'red',
    bg: 'bg-red-50 border-red-200'
  },
  { 
    id: 2, 
    name: 'Ninoy Aquino Day', 
    date: 'Aug 21, 2026', 
    daysLeft: 'In 70 days', 
    icon: Medal, 
    color: 'orange',
    bg: 'bg-orange-50 border-orange-200'
  },
  { 
    id: 3, 
    name: 'National Heroes Day', 
    date: 'Aug 31, 2026', 
    daysLeft: 'In 80 days', 
    icon: Medal, 
    color: 'orange',
    bg: 'bg-orange-50 border-orange-200'
  },
  { 
    id: 4, 
    name: 'All Saints\' Day', 
    date: 'Nov 1, 2026', 
    daysLeft: 'In 142 days', 
    icon: Church, 
    color: 'orange',
    bg: 'bg-orange-50 border-orange-200'
  },
  { 
    id: 5, 
    name: 'All Souls\' Day', 
    date: 'Nov 2, 2026', 
    daysLeft: 'In 143 days', 
    icon: Church, 
    color: 'orange',
    bg: 'bg-orange-50 border-orange-200'
  },
  { 
    id: 6, 
    name: 'Bonifacio Day', 
    date: 'Nov 30, 2026', 
    daysLeft: 'In 171 days', 
    icon: Medal, 
    color: 'orange',
    bg: 'bg-orange-50 border-orange-200'
  },
  { 
    id: 7, 
    name: 'Feast of the Immaculate Conception', 
    date: 'Dec 8, 2026', 
    daysLeft: 'In 179 days', 
    icon: Church, 
    color: 'orange',
    bg: 'bg-orange-50 border-orange-200'
  },
  { 
    id: 8, 
    name: 'Christmas Day', 
    date: 'Dec 25, 2026', 
    daysLeft: 'In 196 days', 
    icon: Gift, 
    color: 'red',
    bg: 'bg-red-50 border-red-200'
  }
]

// --- Navigation ---
const prevMonth = () => { currentDate.value = subMonths(currentDate.value, 1) }
const nextMonth = () => { currentDate.value = addMonths(currentDate.value, 1) }
const goToToday = () => { 
  currentDate.value = new Date()
  selectedDate.value = new Date()
}

// --- Formatting Helpers ---
const formatDateHeader = (date) => {
  return format(date, 'EEEE, MMMM d, yyyy')
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-4 md:p-8">
    <div class="max-w-[1400px] mx-auto space-y-6">
      
      <!-- ==================== PAGE HEADER ==================== -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Content Calendar</h1>
          <p class="text-sm text-gray-500 mt-1">Schedule posts around Philippine holidays and key dates.</p>
        </div>
        <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 px-5 rounded-lg flex items-center gap-2 transition-all shadow-sm hover:shadow-md shrink-0">
          <Pencil class="w-4 h-4" />
          Create Post
        </button>
      </div>

      <!-- ==================== MAIN LAYOUT ==================== -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        <!-- Left: Calendar (3 cols) -->
        <div class="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
          
          <!-- Calendar Header Controls -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-1">
                <button @click="prevMonth" class="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                  <ChevronLeft class="w-5 h-5 text-gray-600" />
                </button>
                <h2 class="text-lg font-bold text-gray-800 ml-1">{{ format(currentDate, 'MMMM yyyy') }}</h2>
                <button @click="nextMonth" class="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                  <ChevronRight class="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            <button @click="goToToday" class="bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-medium px-4 py-1.5 rounded-lg transition-colors">
              Today
            </button>
          </div>

          <!-- Calendar Grid -->
          <div class="w-full">
            <!-- Day Headers -->
            <div class="grid grid-cols-7 mb-2 text-center">
              <div class="text-xs font-semibold text-red-500">SUN</div>
              <div class="text-xs font-semibold text-gray-400">MON</div>
              <div class="text-xs font-semibold text-gray-400">TUE</div>
              <div class="text-xs font-semibold text-gray-400">WED</div>
              <div class="text-xs font-semibold text-gray-400">THU</div>
              <div class="text-xs font-semibold text-gray-400">FRI</div>
              <div class="text-xs font-semibold text-red-500">SAT</div>
            </div>

            <!-- Days Grid -->
            <div class="grid grid-cols-7 gap-1">
              <div 
                v-for="day in days" 
                :key="day.toISOString()"
                class="aspect-square p-1 md:p-2 rounded-lg border border-transparent relative transition-all cursor-pointer"
                :class="[
                  isSameDay(day, selectedDate) ? 'border-blue-400 bg-blue-50 shadow-sm' : 'hover:bg-gray-50',
                  !isSameMonth(day, currentDate) ? 'text-gray-300' : 'text-gray-800'
                ]"
                @click="selectedDate = day"
              >
                <div class="flex flex-col items-center justify-center h-full relative">
                  <span class="text-sm font-medium">{{ format(day, 'd') }}</span>
                  
                  <!-- Holiday/Event Indicator -->
                  <div v-if="getEventForDate(day)" class="mt-1 w-full">
                    <div 
                      class="text-[8px] md:text-[10px] leading-tight text-center px-1 py-0.5 rounded-sm border font-medium truncate"
                      :class="getEventTypeClass(getEventForDate(day).type)"
                    >
                      {{ getEventForDate(day).title }}
                    </div>
                    <!-- Dot indicators -->
                    <div class="flex justify-center gap-0.5 mt-0.5">
                      <div class="w-1 h-1 rounded-full bg-blue-500"></div>
                      <div class="w-1 h-1 rounded-full bg-blue-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Legend -->
            <div class="flex flex-wrap items-center gap-4 mt-6 text-xs text-gray-600">
              <div class="flex items-center gap-1.5">
                <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>Today</span>
              </div>
              <div class="flex items-center gap-1.5">
                <div class="w-2 h-2 rounded-full bg-red-500"></div>
                <span>Regular Holiday</span>
              </div>
              <div class="flex items-center gap-1.5">
                <div class="w-2 h-2 rounded-full bg-orange-400"></div>
                <span>Special Holiday</span>
              </div>
              <div class="flex items-center gap-1.5">
                <div class="w-2 h-2 rounded-full bg-blue-400"></div>
                <span>Scheduled Post</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Sidebar (1 col) -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
          <h3 class="text-base font-bold text-gray-800 mb-4">
            {{ formatDateHeader(selectedDate) }}
          </h3>
          
          <div class="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
            <Plus class="w-5 h-5 mx-auto text-gray-400 group-hover:text-blue-500 transition-colors mb-1" />
            <p class="text-xs text-gray-500 group-hover:text-blue-600 transition-colors">
              Schedule a Post for This Day
            </p>
          </div>

          <!-- Event details if any -->
          <div v-if="getEventForDate(selectedDate)" class="mt-4 border-t pt-4">
            <div class="flex items-center gap-2">
              <component :is="getEventForDate(selectedDate).icon" class="w-4 h-4 text-red-500" />
              <span class="text-sm font-semibold text-gray-700">{{ getEventForDate(selectedDate).title }}</span>
            </div>
            <p class="text-xs text-gray-500 mt-1">Regular Holiday</p>
          </div>
        </div>

      </div>

      <!-- ==================== UPCOMING HOLIDAYS (BOTTOM STRIP) ==================== -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
        <h3 class="text-sm font-bold text-gray-700 mb-4">Upcoming Philippine Holidays</h3>
        
        <div class="relative">
          <!-- Scrollable Container -->
          <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            
            <div 
              v-for="holiday in upcomingHolidays" 
              :key="holiday.id"
              class="min-w-[200px] md:min-w-[220px] p-3 rounded-xl border-2 snap-start flex items-start gap-3"
              :class="holiday.bg"
            >
              <!-- Icon -->
              <div class="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center shrink-0">
                <component :is="holiday.icon" :class="['w-5 h-5', holiday.color === 'red' ? 'text-red-500' : 'text-orange-500']" />
              </div>
              
              <!-- Info -->
              <div>
                <p class="text-sm font-semibold text-gray-800 leading-tight">{{ holiday.name }}</p>
                <p class="text-xs text-gray-600 mt-0.5">{{ holiday.date }}</p>
                <p class="text-[10px] font-bold mt-1" :class="holiday.color === 'red' ? 'text-red-600' : 'text-orange-600'">
                  {{ holiday.daysLeft }}
                </p>
              </div>
            </div>

          </div>
          
          <!-- Scroll buttons (Visual only) -->
          <div class="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 hidden md:block">
            <div class="w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-50">
              <ChevronLeft class="w-4 h-4 text-gray-600" />
            </div>
          </div>
          <div class="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 hidden md:block">
            <div class="w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-50">
              <ChevronRight class="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>