<script lang="ts">
	import type { Card } from '$lib/types';
	
	interface Props {
		card: Card;
		onView?: (card: Card) => void;
		onPrint?: (card: Card) => void;
	}
	
	let { card, onView, onPrint }: Props = $props();
	
	let isHovered = false;
</script>

<div 
	class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-300 overflow-hidden group"
	class:scale-105={isHovered}
	onmouseenter={() => isHovered = true}
	onmouseleave={() => isHovered = false}
	style="transform-style: preserve-3d;"
	role="button"
	aria-label="Card item"
	tabindex="0" <!-- Added tabindex for a11y -->
>
	<!-- Glow effect on hover -->
	<div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
	
	<div class="relative p-6 space-y-4">
		<!-- Header with photo -->
		<div class="flex items-center gap-4">
			<div class="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-cyan-500/20 group-hover:ring-cyan-500/40 transition-all duration-300">
				{#if card.photo_url}
					<img 
						src={card.photo_url || "/placeholder.svg"} 
						alt="{card.prenom} {card.nom}"
						class="w-full h-full object-cover"
					/>
				{:else}
					<div class="w-full h-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold">
						{card.prenom[0]}{card.nom[0]}
					</div>
				{/if}
			</div>
			
			<div class="flex-1">
				<h3 class="text-lg font-bold text-gray-900 dark:text-white">
					{card.prenom} {card.nom}
				</h3>
				<p class="text-sm text-gray-600 dark:text-gray-400">
					{card.fonction}
				</p>
			</div>
		</div>
		
		<!-- Details -->
		<div class="space-y-2 text-sm">
			<div class="flex items-center gap-2 text-gray-700 dark:text-gray-300">
				<i class="fas fa-building text-cyan-600 dark:text-cyan-400"></i>
				<span>{card.departement}</span>
			</div>
			<div class="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs">
				<i class="fas fa-calendar text-teal-600 dark:text-teal-400"></i>
				<span>{new Date(card.created_at).toLocaleDateString('fr-FR')}</span>
			</div>
		</div>
		
		<!-- Actions -->
		<div class="flex gap-2 pt-2">
			<button
				on:click={() => onView?.(card)}
				class="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium text-sm relative overflow-hidden group/btn"
			>
				<span class="relative z-10 flex items-center justify-center gap-2">
					<i class="fas fa-eye"></i>
					View
				</span>
				<div class="absolute inset-0 bg-gradient-to-r from-cyan-700 to-teal-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
			</button>
			
			<button
				on:click={() => onPrint?.(card)}
				class="flex-1 px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium text-sm relative overflow-hidden group/btn"
			>
				<span class="relative z-10 flex items-center justify-center gap-2">
					<i class="fas fa-print"></i>
					Print
				</span>
				<div class="absolute inset-0 bg-gradient-to-r from-orange-700 to-red-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
			</button>
		</div>
	</div>
</div>
