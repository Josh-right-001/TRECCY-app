<script lang="ts">
	let { message = 'Aucune donnée disponible', icon = 'fa-inbox', action }: { message?: string; icon?: string; action?: { label: string; onClick: () => void } } = $props();
</script>

<div class="flex flex-col items-center justify-center py-16 px-4">
	<div class="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center mb-6 animate-pulse">
		<i class="fas {icon} text-5xl text-gray-400 dark:text-gray-500"></i>
	</div>
	
	<h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
		{message}
	</h3>
	
	{#if action}
		<button
			onclick={action.onClick}
			class="mt-4 px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium"
		>
			{action.label}
		</button>
	{/if}
</div>
