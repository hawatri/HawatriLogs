---
layout: page
title: Settings
---

<div class="max-w-2xl mx-auto p-8">
  <h1 class="font-[Indie Flower] text-3xl mb-6">Settings</h1>
  
  <div class="space-y-6">
    <div class="border-2 border-black rounded-lg p-6">
      <h2 class="font-[Indie Flower] text-2xl mb-4">Appearance</h2>
      
      <div class="space-y-4">
        <div>
          <label class="block text-lg mb-2">Theme Preference</label>
          <div class="flex items-center space-x-4">
            <label class="flex items-center">
              <input 
                type="radio" 
                name="darkMode" 
                value="light" 
                id="darkModeNo"
                class="mr-2"
                checked
              >
              <span>Light Mode</span>
            </label>
            <label class="flex items-center">
              <input 
                type="radio" 
                name="darkMode" 
                value="dark" 
                id="darkModeYes"
                class="mr-2"
              >
              <span>Dark Mode</span>
            </label>
          </div>
        </div>


        
        <p class="text-sm text-gray-600">
          Choose your preferred theme. Dark mode provides a comfortable reading experience in low-light environments.
        </p>
      </div>
    </div>

    
  
    
    <div class="border-2 border-black rounded-lg p-6">
      <h2 class="font-[Indie Flower] text-2xl mb-4">Notifications</h2>
      
      <div class="space-y-4">
        <label class="flex items-center">
          <input type="checkbox" class="mr-2">
          <span>Email notifications for new posts</span>
        </label>
        
        <label class="flex items-center">
          <input type="checkbox" class="mr-2">
          <span>Browser notifications</span>
        </label>
        
        <p class="text-sm text-gray-600">
          Stay updated with the latest content and announcements.
        </p>
      </div>
    </div>
  </div>
</div>