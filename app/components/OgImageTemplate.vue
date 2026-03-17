<template>
  <div
    style="width: 1280px; height: 640px; background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 35%, #ffffff 65%, #f0fdf4 100%); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 64px; position: relative; overflow: hidden;"
  >
    <!-- Background decorative elements - subtle carbon waves -->
    <div style="position: absolute; top: -150px; right: -150px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%); border-radius: 50%;" />
    <div style="position: absolute; bottom: -120px; left: -120px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%); border-radius: 50%;" />
    <div style="position: absolute; top: 50%; left: -100px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(5, 150, 105, 0.05) 0%, transparent 70%); border-radius: 50%;" />
    <div style="position: absolute; top: 50%; right: -100px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(5, 150, 105, 0.05) 0%, transparent 70%); border-radius: 50%;" />

    <!-- Subtle pattern overlay -->
    <div style="position: absolute; inset: 0; background-image: repeating-linear-gradient(0deg, transparent, transparent 48px, rgba(16, 185, 129, 0.02) 48px, rgba(16, 185, 129, 0.02) 49px); pointer-events: none;" />

    <!-- Main icon - Carbon/Earth stylized -->
    <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 28px; position: relative;">
      <!-- Outer ring -->
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="position: absolute;">
        <circle cx="50" cy="50" r="45" stroke="url(#gradient-ring)" stroke-width="2" opacity="0.3"/>
        <circle cx="50" cy="50" r="38" stroke="url(#gradient-ring)" stroke-width="1.5" opacity="0.2"/>
        <defs>
          <linearGradient id="gradient-ring" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stop-color="#16a34a"/>
            <stop offset="50%" stop-color="#10b981"/>
            <stop offset="100%" stop-color="#16a34a"/>
          </linearGradient>
        </defs>
      </svg>
      <!-- Leaf icon -->
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="position: relative; z-index: 1;">
        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="url(#leaf-gradient)" opacity="0.15"/>
        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 22V12" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 12L20 5" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 12L4 5" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <defs>
          <linearGradient id="leaf-gradient" x1="4" y1="2" x2="20" y2="22">
            <stop offset="0%" stop-color="#16a34a"/>
            <stop offset="100%" stop-color="#10b981"/>
          </linearGradient>
        </defs>
      </svg>
    </div>

    <!-- Main title -->
    <h1 style="font-size: 52px; font-weight: 800; color: #166534; margin: 0 0 12px 0; text-align: center; line-height: 1.15; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; letter-spacing: -0.5px; text-shadow: 0 1px 2px rgba(22, 101, 52, 0.08);">
      {{ title || 'Carbon Market Handbook' }}
    </h1>

    <!-- Subtitle with accent -->
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
      <div style="width: 32px; height: 2px; background: linear-gradient(90deg, transparent, #10b981);" />
      <p style="font-size: 26px; color: #059669; margin: 0; text-align: center; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; letter-spacing: 0.3px;">
        {{ subtitle || 'For Vietnamese SMEs' }}
      </p>
      <div style="width: 32px; height: 2px; background: linear-gradient(270deg, transparent, #10b981);" />
    </div>

    <!-- Description -->
    <p style="font-size: 20px; color: #64748b; margin: 0; text-align: center; max-width: 850px; line-height: 1.7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-weight: 400;">
      {{ description || 'Comprehensive handbook on carbon markets, MRV, green finance, and emissions trading' }}
    </p>

    <!-- Bottom accent bar -->
    <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 8px; background: linear-gradient(90deg, #16a34a 0%, #10b981 25%, #34d399 50%, #10b981 75%, #16a34a 100%);" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  subtitle?: string
}>()
</script>
