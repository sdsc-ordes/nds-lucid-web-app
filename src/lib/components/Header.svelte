<script lang="ts">
  import { page } from '$app/stores';
</script>

<header class=" p-4 flex justify-end items-center">
  <nav>
    <ul class="flex space-x-6">
      <li><a href="/about" class="text-surface-50 hover:text-primary-400" class:text-primary-400={$page.url.pathname === '/about'}>About</a></li>
      <li><a href="/access" class="text-surface-50 hover:text-primary-400" class:text-primary-400={$page.url.pathname === '/access'}>Access</a></li>
      <li><a href="/contact" class="text-surface-50 hover:text-primary-400" class:text-primary-400={$page.url.pathname === '/contact'}>Contact</a></li>
    </ul>
  </nav>
</header>

<style>
  .active {
    background-color: var(--color-primary-500);
    color: var(--color-surface-50);
  }
</style> 