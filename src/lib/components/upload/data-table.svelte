<script lang="ts">
	import type { ExcelRow } from '$lib/utils/excel-parser';
	
	interface TableData extends ExcelRow {
		photo?: File | null;
	}
	
	let { data = [], onDataChange, onAddRow, onDeleteRow }: { 
		data: TableData[];
		onDataChange: (data: TableData[]) => void;
		onAddRow?: () => void;
		onDeleteRow?: (index: number) => void;
	} = $props();
	
	let hoveredColumn = $state<number | null>(null);
	let editingCell = $state<{ row: number; col: string } | null>(null);
	
	function handleCellClick(rowIndex: number, colName: string) {
		editingCell = { row: rowIndex, col: colName };
	}
	
	function handleCellChange(rowIndex: number, colName: keyof ExcelRow, value: string) {
		const newData = [...data];
		newData[rowIndex] = { ...newData[rowIndex], [colName]: value };
		onDataChange(newData);
		editingCell = null;
	}
	
	async function handlePhotoUpload(rowIndex: number, event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			const newData = [...data];
			newData[rowIndex] = { ...newData[rowIndex], photo: input.files[0] };
			onDataChange(newData);
		}
	}
</script>

<div class="overflow-x-auto rounded-2xl shadow-xl">
	<table class="w-full bg-white dark:bg-gray-800">
		<thead class="bg-gradient-to-r from-cyan-600 to-teal-600 text-white">
			<tr>
				<th class="px-6 py-4 text-left text-sm font-semibold">#</th>
				<th class="px-6 py-4 text-left text-sm font-semibold">Photo</th>
				<th class="px-6 py-4 text-left text-sm font-semibold">Nom</th>
				<th class="px-6 py-4 text-left text-sm font-semibold">Postnom</th>
				<th class="px-6 py-4 text-left text-sm font-semibold">Prénom</th>
				<th class="px-6 py-4 text-left text-sm font-semibold">Département</th>
				<th class="px-6 py-4 text-left text-sm font-semibold">Fonction</th>
				<th class="px-6 py-4 text-left text-sm font-semibold">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each data as row, i}
				<tr 
					class="border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
				>
					<td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
						{i + 1}
					</td>
					<td class="px-6 py-4">
						<div class="flex items-center gap-2">
							{#if row.photo}
								<div class="w-10 h-10 rounded-full overflow-hidden ring-2 ring-cyan-500">
									<img 
										src={URL.createObjectURL(row.photo) || "/placeholder.svg"} 
										class="w-full h-full object-cover"
										alt="Uploaded photo"
									/>
								</div>
							{:else}
								<label class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200">
									<i class="fas fa-camera text-gray-500 dark:text-gray-400"></i>
									<input 
										type="file" 
										accept="image/*"
										onchange={(e) => handlePhotoUpload(i, e)}
										class="hidden"
									/>
								</label>
							{/if}
						</div>
					</td>
					<td 
						class="px-6 py-4 text-sm text-gray-900 dark:text-white cursor-pointer hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors duration-200"
						class:bg-cyan-50={hoveredColumn === 2}
						class:dark:bg-cyan-900={hoveredColumn === 2}
						onmouseenter={() => hoveredColumn = 2}
						onmouseleave={() => hoveredColumn = null}
						onclick={() => handleCellClick(i, 'nom')}
						role="button"
						tabindex="0"
					>
						{#if editingCell?.row === i && editingCell?.col === 'nom'}
							<input
								type="text"
								value={row.nom}
								onblur={(e) => handleCellChange(i, 'nom', e.currentTarget.value)}
								onkeydown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
								class="w-full px-2 py-1 border border-cyan-500 rounded"
							/>
						{:else}
							{row.nom || '-'}
						{/if}
					</td>
					<td 
						class="px-6 py-4 text-sm text-gray-900 dark:text-white cursor-pointer hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors duration-200"
						onclick={() => handleCellClick(i, 'postnom')}
						role="button"
						tabindex="0"
					>
						{#if editingCell?.row === i && editingCell?.col === 'postnom'}
							<input
								type="text"
								value={row.postnom}
								onblur={(e) => handleCellChange(i, 'postnom', e.currentTarget.value)}
								onkeydown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
								class="w-full px-2 py-1 border border-cyan-500 rounded"
							/>
						{:else}
							{row.postnom || '-'}
						{/if}
					</td>
					<td 
						class="px-6 py-4 text-sm text-gray-900 dark:text-white cursor-pointer hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors duration-200"
						onclick={() => handleCellClick(i, 'prenom')}
						role="button"
						tabindex="0"
					>
						{#if editingCell?.row === i && editingCell?.col === 'prenom'}
							<input
								type="text"
								value={row.prenom}
								onblur={(e) => handleCellChange(i, 'prenom', e.currentTarget.value)}
								onkeydown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
								class="w-full px-2 py-1 border border-cyan-500 rounded"
							/>
						{:else}
							{row.prenom || '-'}
						{/if}
					</td>
					<td 
						class="px-6 py-4 text-sm text-gray-900 dark:text-white cursor-pointer hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors duration-200"
						onclick={() => handleCellClick(i, 'departement')}
						role="button"
						tabindex="0"
					>
						{#if editingCell?.row === i && editingCell?.col === 'departement'}
							<input
								type="text"
								value={row.departement}
								onblur={(e) => handleCellChange(i, 'departement', e.currentTarget.value)}
								onkeydown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
								class="w-full px-2 py-1 border border-cyan-500 rounded"
							/>
						{:else}
							{row.departement || '-'}
						{/if}
					</td>
					<td 
						class="px-6 py-4 text-sm text-gray-900 dark:text-white cursor-pointer hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors duration-200"
						onclick={() => handleCellClick(i, 'fonction')}
						role="button"
						tabindex="0"
					>
						{#if editingCell?.row === i && editingCell?.col === 'fonction'}
							<input
								type="text"
								value={row.fonction}
								onblur={(e) => handleCellChange(i, 'fonction', e.currentTarget.value)}
								onkeydown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
								class="w-full px-2 py-1 border border-cyan-500 rounded"
							/>
						{:else}
							{row.fonction || '-'}
						{/if}
					</td>
					<td class="px-6 py-4">
						<button
							onclick={() => onDeleteRow?.(i)}
							class="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
							aria-label="Delete row"
						>
							<i class="fas fa-trash"></i>
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
