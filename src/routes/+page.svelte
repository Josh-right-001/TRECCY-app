<script lang="ts">
	import Sidebar from '$lib/components/layout/sidebar.svelte';
	import CardItem from '$lib/components/cards/card-item.svelte';
	import EmptyState from '$lib/components/ui/empty-state.svelte';
	import SkeletonCard from '$lib/components/ui/skeleton-card.svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import type { Card } from '$lib/types';
	
	let { data }: { data: PageData } = $props();
	
	let isLoading = $state(false);
	let showCards = $state(false);
	
	// Animation on mount
	$effect(() => {
		setTimeout(() => {
			showCards = true;
		}, 100);
	});
	
	function handleView(card: Card) {
		// TODO: Implement PDF viewer
		console.log('[v0] Viewing card:', card.id);
	}
	
	function handlePrint(card: Card) {
		if (card.pdf_url) {
			window.open(card.pdf_url, '_blank');
		}
	}
	
	function goToUpload() {
		goto('/upload');
	}
</script>

<div class="flex min-h-screen bg-gray-50 dark:bg-gray-950">
	<Sidebar />
	
	<!-- Main Content -->
	<main class="flex-1 ml-64 p-8 transition-all duration-300">
		<!-- Header -->
		<div 
			class="mb-8 transform transition-all duration-700 ease-out"
			class:opacity-0={!showCards}
			class:translate-y-8={!showCards}
			class:opacity-100={showCards}
			class:translate-y-0={showCards}
		>
			<h1 class="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-orange-600 bg-clip-text text-transparent mb-2">
				Mes Cartes
			</h1>
			<p class="text-gray-600 dark:text-gray-400">
				Gérez et consultez vos cartes de service
			</p>
		</div>
		
		<!-- Cards Grid -->
		{#if isLoading}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each Array(6) as _}
					<SkeletonCard />
				{/each}
			</div>
		{:else if data.cards.length === 0}
			<div 
				class="transform transition-all duration-700 ease-out delay-100"
				class:opacity-0={!showCards}
				class:translate-y-8={!showCards}
				class:opacity-100={showCards}
				class:translate-y-0={showCards}
			>
				<EmptyState 
					message="Aucune carte récente. Créez-en une pour commencer."
					icon="fa-id-card"
					action={{ label: 'Créer une carte', onClick: goToUpload }}
				/>
			</div>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each data.cards as card, i}
					<div 
						class="transform transition-all duration-700 ease-out"
						style="transition-delay: {i * 50}ms"
						class:opacity-0={!showCards}
						class:translate-y-8={!showCards}
						class:opacity-100={showCards}
						class:translate-y-0={showCards}
					>
						<CardItem 
							{card} 
							onView={handleView}
							onPrint={handlePrint}
						/>
					</div>
				{/each}
			</div>
		{/if}
	</main>
</div>
