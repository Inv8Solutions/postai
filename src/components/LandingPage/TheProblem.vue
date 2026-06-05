<template>
  <section class="py-16 md:py-8 px-4 bg-gray-50">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-12 md:mb-16">
        <div class="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <i class="fas fa-exclamation-triangle text-xs"></i>
          <span>THE PROBLEM</span>
        </div>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          You know you should be posting.
        </h2>
        <p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
          But something always gets in the way.
        </p>
        <div class="mt-6 max-w-2xl mx-auto">
          <p class="text-gray-500 text-lg">
            Running your business is already a full-time job. Creating content shouldn't be another stressful task on your list.
          </p>
        </div>
      </div>

      <!-- Problem Cards Grid -->
      <div class="grid md:grid-cols-3 gap-6 md:gap-8">
        <!-- Card 1: No Time -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
         
          <div class="p-6 md:p-8 text-center">
            <!-- Icon -->
            <div class="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <i class="fas fa-clock text-4xl text-orange-500"></i>
            </div>
            
            <!-- Title -->
            <h3 class="text-2xl font-bold text-gray-900 mb-3">
              No Time
            </h3>
            
            <!-- Description -->
            <p class="text-gray-600 mb-4">
              You're busy running your business.
            </p>
            
            <p class="text-gray-500 text-sm mb-4">
              You're managing the store, handling orders, and serving customers. Who has time to create content?
            </p>
            
            <!-- Result Badge -->
            <div class="mt-4 pt-4 border-t border-gray-100">
              <div class="inline-flex items-center gap-2 text-sm font-medium text-red-500 bg-red-50 px-3 py-1.5 rounded-lg">
                <i class="fas fa-arrow-right"></i>
                <span>Result: Content gets pushed aside</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2: No Design Skills -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          
          <div class="p-6 md:p-8 text-center">
            <!-- Icon -->
            <div class="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <i class="fas fa-palette text-4xl text-purple-500"></i>
            </div>
            
            <!-- Title -->
            <h3 class="text-2xl font-bold text-gray-900 mb-3">
              No Design Skills
            </h3>
            
            <!-- Description -->
            <p class="text-gray-600 mb-4">
              Creating posts feels complicated.
            </p>
            
            <p class="text-gray-500 text-sm mb-4">
              Canva feels overwhelming. Writing captions feels awkward. You're a business owner, not a content creator.
            </p>
            
            <!-- Result Badge -->
            <div class="mt-4 pt-4 border-t border-gray-100">
              <div class="inline-flex items-center gap-2 text-sm font-medium text-red-500 bg-red-50 px-3 py-1.5 rounded-lg">
                <i class="fas fa-arrow-right"></i>
                <span>Result: You overthink and don't post</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 3: No Consistency -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          
          <div class="p-6 md:p-8 text-center">
            <!-- Icon -->
            <div class="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <i class="fas fa-chart-line text-4xl text-blue-500"></i>
            </div>
            
            <!-- Title -->
            <h3 class="text-2xl font-bold text-gray-900 mb-3">
              No Consistency
            </h3>
            
            <!-- Description -->
            <p class="text-gray-600 mb-4">
              You post once, then life gets busy.
            </p>
            
            <p class="text-gray-500 text-sm mb-4">
              You get busy, you forget, and your page goes dead. An inactive page signals an inactive business.
            </p>
            
            <!-- Result Badge -->
            <div class="mt-4 pt-4 border-t border-gray-100">
              <div class="inline-flex items-center gap-2 text-sm font-medium text-red-500 bg-red-50 px-3 py-1.5 rounded-lg">
                <i class="fas fa-arrow-right"></i>
                <span>Result: You lose visibility and trust</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Real Cost of not posting card -->
    <div class="bg-yellow-50 rounded-2xl p-6 md:p-8 shadow-lg border border-indigo-100 max-w-4xl mx-auto mt-8">
    <!-- Section Title -->
    <h3 class=" text-sm font-semibold uppercase tracking-wide mb-2 text-center">
      THE REAL COST OF NOT POSTING
    </h3>
    
    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <!-- Left Stat -->
      <div class="text-center">
        <div class="text-4xl md:text-5xl font-bold text-indigo-700">
          3–5
        </div>
        <div class="text-gray-600 text-sm mt-1">
          missed posts per week
        </div>
        <div class="text-gray-400 text-xs mt-1">
          = lost top-of-mind awareness
        </div>
      </div>

      <!-- Right Stat -->
      <div class="text-center">
        <div class="text-4xl md:text-5xl font-bold text-indigo-700">
          Every
        </div>
        <div class="text-gray-600 text-sm mt-1">
          week without posting
        </div>
        <div class="text-gray-400 text-xs mt-1">
          is a week your competitor is in front of your customers
        </div>
      </div>
    </div>

    <!-- Quote -->
    <div class="text-center pt-4 border-t border-indigo-100">
      <p class="text-gray-700 text-sm italic">
        "Stay visible. Stay relevant. Stay top of mind. That's how customers choose you."
      </p>
    </div>
  </div>
      
    </div>
  </section>
</template>

<script setup>
// No additional imports needed - Font Awesome icons are used via CDN
// Make sure to include Font Awesome in your index.html:
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</script>