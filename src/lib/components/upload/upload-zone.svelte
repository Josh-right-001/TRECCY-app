<script lang="ts">
	let { onFileSelect }: { onFileSelect: (file: File) => void } = $props();
	
	let isDragging = $state(false);
	let fileInputRef: HTMLInputElement | null = null;
	
	function handleDrop(e: DragEvent) {
		e.preventDefault();
		isDragging = false;
		
		const files = e.dataTransfer?.files;
		if (files && files.length > 0) {
			const file = files[0];
			if (file.type.includes('spreadsheet') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
				onFileSelect(file);
			}
		}
	}
	
	function handleFileChange(e: Event) {
		const input = e.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			onFileSelect(input.files[0]);
		}
	}
</script>

<div
	class="border-2 border-dashed rounded-3xl p-12 transition-all duration-300 relative overflow-hidden group"
	class:border-cyan-500={isDragging}
	class:bg-cyan-50={isDragging}
	class:dark:bg-cyan-950={isDragging}
	class:border-gray-300={!isDragging}
	class:dark:border-gray-700={!isDragging}
	ondragover={(e) => { e.preventDefault(); isDragging = true; }}
	ondragleave={() => isDragging = false}
	ondrop={handleDrop}
	role="button"
	aria-label="Upload zone"
	tabindex="0"
>
	<!-- Background animation -->
	<div class="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-teal-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
	
	<div class="relative flex flex-col items-center justify-center space-y-6">
		<!-- Icon with animation -->
		<div class="w-24 h-24 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
			<i class="fas fa-cloud-upload-alt text-4xl text-white"></i>
		</div>
		
		<div class="text-center space-y-2">
			<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
				Glissez votre fichier Excel ici
			</h3>
			<p class="text-sm text-gray-600 dark:text-gray-400">
				ou cliquez pour sélectionner un fichier
			</p>
			<p class="text-xs text-gray-500 dark:text-gray-500">
				Formats acceptés: .xlsx, .xls
			</p>
		</div>
		
		<button
			onclick={() => fileInputRef?.click()}
			class="px-8 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-medium relative overflow-hidden group/btn"
		>
			<span class="relative z-10 flex items-center gap-2">
				<i class="fas fa-file-excel"></i>
				Sélectionner un fichier
			</span>
			<div class="absolute inset-0 bg-gradient-to-r from-cyan-700 to-teal-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
		</button>
		
		<input
			bind:this={fileInputRef}
			type="file"
			accept=".xlsx,.xls"
			onchange={handleFileChange}
			class="hidden"
		/>
	</div>
</div>
