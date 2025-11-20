<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { createClient } from '$lib/supabase/client';
	
	interface NavItem {
		name: string;
		path: string;
		icon: string;
	}
	
	const navItems: NavItem[] = [
		{ name: 'Home', path: '/', icon: 'fa-home' },
		{ name: 'Upload', path: '/upload', icon: 'fa-cloud-upload-alt' },
		{ name: 'Settings', path: '/settings', icon: 'fa-cog' }
	];
	
	let isOpen = $state(true);
	
	async function handleLogout() {
		const supabase = createClient();
		await supabase.auth.signOut();
		goto('/auth/login');
	}
</script>

<!-- Sidebar -->
<aside 
	class="fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-50 shadow-xl"
	class:w-64={isOpen}
	class:w-20={!isOpen}
>
	<div class="flex flex-col h-full">
		<!-- Logo Section -->
		<div class="p-6 flex items-center justify-center border-b border-gray-200 dark:border-gray-800">
			<img 
				src="/images/ei-1763590404024-removebg-preview.png" 
				alt="Treccy Logo" 
				class="transition-all duration-300"
				class:h-16={isOpen}
				class:h-12={!isOpen}
			/>
		</div>
		
		<!-- Navigation -->
		<nav class="flex-1 p-4 space-y-2">
			{#each navItems as item}
				<a
					href={item.path}
					class="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden"
					class:bg-gradient-to-r={$page.url.pathname === item.path}
					class:from-cyan-600={$page.url.pathname === item.path}
					class:to-teal-600={$page.url.pathname === item.path}
					class:text-white={$page.url.pathname === item.path}
					class:hover:bg-gray-100={$page.url.pathname !== item.path}
					class:dark:hover:bg-gray-800={$page.url.pathname !== item.path}
					class:text-gray-700={$page.url.pathname !== item.path}
					class:dark:text-gray-300={$page.url.pathname !== item.path}
					aria-label={item.name}
				>
					<i class="fas {item.icon} text-xl transition-transform duration-200 group-hover:scale-110"></i>
					{#if isOpen}
						<span class="font-medium">{item.name}</span>
					{/if}
					
					<!-- Ripple effect -->
					<div class="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 transition-transform duration-300 rounded-xl"></div>
				</a>
			{/each}
		</nav>
		
		<!-- Footer -->
		<div class="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
			<button
				onclick={handleLogout}
				class="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group"
				aria-label="Déconnexion"
			>
				<i class="fas fa-sign-out-alt text-xl transition-transform duration-200 group-hover:scale-110"></i>
				{#if isOpen}
					<span class="font-medium">Déconnexion</span>
				{/if}
			</button>
			
			{#if isOpen}
				<div class="text-center text-xs text-gray-500 dark:text-gray-400 pt-2">
					Développé par 
					<a 
						href="https://josh-right-congo.netlify.app" 
						target="_blank"
						rel="noopener noreferrer"
						class="text-cyan-600 dark:text-cyan-400 hover:underline"
					>
						Josh Right
					</a>
				</div>
			{/if}
		</div>
		
		<!-- Toggle button -->
		<button
			onclick={() => isOpen = !isOpen}
			class="absolute -right-3 top-20 w-6 h-6 bg-cyan-600 text-white rounded-full shadow-lg hover:bg-cyan-700 transition-colors duration-200 flex items-center justify-center"
			aria-label="Toggle Sidebar"
		>
			<i class="fas fa-chevron-{isOpen ? 'left' : 'right'} text-xs"></i>
		</button>
	</div>
</aside>

<!-- Add Font Awesome -->
<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
</svelte:head>
