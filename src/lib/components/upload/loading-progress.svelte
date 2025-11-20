<script lang="ts">
	let { progress = 0, currentCard = 0, totalCards = 0 }: { progress?: number; currentCard?: number; totalCards?: number } = $props();
</script>

<div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
	<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
		<!-- Animated logo -->
		<div class="flex justify-center mb-6">
			<div class="relative">
				<img 
					src="/images/ei-1763590404024-removebg-preview.png" 
					alt="Treccy Logo" 
					class="h-20 w-20 animate-spin-slow"
				/>
				<!-- Particles -->
				<div class="absolute inset-0 animate-ping opacity-20">
					<div class="w-full h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"></div>
				</div>
			</div>
		</div>
		
		<h3 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
			Génération en cours...
		</h3>
		
		<!-- Progress bar -->
		<div class="space-y-4">
			<div class="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
				<div 
					class="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
					class:bg-gradient-to-r={true}
					class:from-cyan-600={progress < 100}
					class:to-teal-600={progress < 100}
					class:from-green-600={progress >= 100}
					class:to-green-600={progress >= 100}
					style="width: {progress}%"
				>
					<!-- Shimmer effect -->
					<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
				</div>
			</div>
			
			<div class="flex justify-between items-center text-sm">
				<span class="text-gray-600 dark:text-gray-400">
					Carte {currentCard} sur {totalCards}
				</span>
				<span class="font-bold text-cyan-600 dark:text-cyan-400">
					{Math.round(progress)}%
				</span>
			</div>
			
			{#if progress >= 100}
				<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center">
					<i class="fas fa-check-circle text-green-600 dark:text-green-400 text-2xl mb-2"></i>
					<p class="text-green-600 dark:text-green-400 font-semibold">
						Génération terminée ! Disponible dans Home.
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	@keyframes shimmer {
		0% { transform: translateX(-100%); }
		100% { transform: translateX(100%); }
	}
	
	@keyframes spin-slow {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
	
	.animate-shimmer {
		animation: shimmer 2s infinite;
	}
	
	.animate-spin-slow {
		animation: spin-slow 3s linear infinite;
	}
</style>
