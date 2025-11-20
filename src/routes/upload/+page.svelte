<script lang="ts">
	import Sidebar from '$lib/components/layout/sidebar.svelte';
	import UploadZone from '$lib/components/upload/upload-zone.svelte';
	import DataTable from '$lib/components/upload/data-table.svelte';
	import LoadingProgress from '$lib/components/upload/loading-progress.svelte';
	import { parseExcelFile, type ExcelRow } from '$lib/utils/excel-parser';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	
	interface TableData extends ExcelRow {
		photo?: File | null;
	}
	
	let uploadedData = $state<TableData[]>([]);
	let isProcessing = $state(false);
	let progress = $state(0);
	let currentCard = $state(0);
	let showTable = $state(false);
	
	async function handleFileSelect(file: File) {
		isProcessing = true;
		progress = 0;
		
		try {
			// Simulate loading animation
			for (let i = 0; i <= 100; i += 10) {
				progress = i;
				await new Promise(resolve => setTimeout(resolve, 50));
			}
			
			const data = await parseExcelFile(file);
			uploadedData = data.map(row => ({ ...row, photo: null }));
			showTable = true;
		} catch (error) {
			console.error('[v0] Error parsing Excel:', error);
			alert('Erreur lors du traitement du fichier');
		} finally {
			isProcessing = false;
			progress = 0;
		}
	}
	
	function handleAddRow() {
		uploadedData = [...uploadedData, {
			nom: '',
			postnom: '',
			prenom: '',
			departement: '',
			fonction: '',
			photo: null
		}];
	}
	
	function handleDeleteRow(index: number) {
		uploadedData = uploadedData.filter((_, i) => i !== index);
	}
	
	async function handleGenerate() {
		if (uploadedData.length === 0) return;
		
		isProcessing = true;
		progress = 0;
		currentCard = 0;
		
		try {
			// Simulate card generation progress
			for (let i = 0; i < uploadedData.length; i++) {
				currentCard = i + 1;
				progress = ((i + 1) / uploadedData.length) * 100;
				await new Promise(resolve => setTimeout(resolve, 500));
			}
			
			// Wait for success message
			await new Promise(resolve => setTimeout(resolve, 1500));
			
			// Redirect to home
			goto('/');
		} catch (error) {
			console.error('[v0] Error generating cards:', error);
			alert('Erreur lors de la génération des cartes');
		} finally {
			isProcessing = false;
		}
	}
</script>

<div class="flex min-h-screen bg-gray-50 dark:bg-gray-950">
	<Sidebar />
	
	<main class="flex-1 ml-64 p-8 transition-all duration-300">
		<div class="mb-8">
			<h1 class="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-orange-600 bg-clip-text text-transparent mb-2">
				Importer des données
			</h1>
			<p class="text-gray-600 dark:text-gray-400">
				Téléchargez un fichier Excel ou ajoutez manuellement des informations
			</p>
		</div>
		
		{#if !showTable}
			<UploadZone onFileSelect={handleFileSelect} />
		{:else}
			<div class="space-y-6">
				<DataTable 
					data={uploadedData} 
					onDataChange={(newData) => uploadedData = newData}
					onAddRow={handleAddRow}
					onDeleteRow={handleDeleteRow}
				/>
				
				<!-- Actions -->
				<div class="flex gap-4 justify-end">
					<button
						onclick={handleAddRow}
						class="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-cyan-500 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 font-medium flex items-center gap-2"
					>
						<i class="fas fa-plus"></i>
						Ajouter une ligne
					</button>
					
					<button
						onclick={handleGenerate}
						disabled={uploadedData.length === 0}
						class="px-8 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
					>
						<span class="relative z-10 flex items-center gap-2">
							<i class="fas fa-magic"></i>
							Enregistrer & Générer les cartes
						</span>
						<div class="absolute inset-0 bg-gradient-to-r from-cyan-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					</button>
				</div>
			</div>
		{/if}
	</main>
</div>

{#if isProcessing}
	<LoadingProgress {progress} {currentCard} totalCards={uploadedData.length} />
{/if}
