<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import { createClient } from '$lib/supabase/client';
	import { theme } from '$lib/stores/theme';
	
	let { children, data } = $props();
	
	onMount(() => {
		const supabase = createClient();
		
		const { data: authListener } = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});
		
		// Apply theme on mount
		if ($theme === 'dark') {
			document.documentElement.classList.add('dark');
		}
		
		return () => {
			authListener?.subscription.unsubscribe();
		};
	});
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/images/ei-1763590404024-removebg-preview.png" />
	<title>Treccy - Générateur de Cartes PVC</title>
</svelte:head>

<div class="min-h-screen bg-background text-foreground">
	{@render children()}
</div>
