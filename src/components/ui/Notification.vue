<template>
  <transition name="fade">
    <div v-if="ui.notification" class="notification">
      <span>{{ ui.notification }}</span>
      <button class="close-btn" @click="ui.clearNotification">✕</button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useUIStore } from "../../stores/ui.store"

const ui = useUIStore()
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #2ecc71;
  color: white;
  padding: 12px 18px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 9999;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
