<script lang="ts">
	import { goto } from '$app/navigation';
	import { createClient } from '$lib/supabase/client';
	
	let password = $state('');
	let error = $state('');
	let isLoading = $state(false);
	let showLogo = $state(false);
	
	// Animation on mount
	$effect(() => {
		setTimeout(() => {
			showLogo = true;
		}, 100);
	});
	
	async function handleLogin(e: Event) {
		e.preventDefault();
		
		// Check if password is "Treccy" or "TRECCY"
		if (password.toLowerCase() !== 'treccy') {
			error = 'Mot de passe incorrect. Tapez "Treccy" pour accéder.';
			return;
		}
		
		isLoading = true;
		error = '';
		
		const supabase = createClient();
		
		// Simple authentication with a demo email
		const demoEmail = 'demo@treccy.com';
		const demoPassword = 'TreccyDemo123!';
		
		try {
			// Try to sign in first
			let { data, error: signInError } = await supabase.auth.signInWithPassword({
				email: demoEmail,
				password: demoPassword
			});
			
			// If user doesn't exist, sign up
			if (signInError && signInError.message.includes('Invalid')) {
				const { error: signUpError } = await supabase.auth.signUp({
					email: demoEmail,
					password: demoPassword,
					options: {
						emailRedirectTo: `${window.location.origin}/`,
						data: {
							auto_confirm: true
						}
					}
				});
				
				if (signUpError) throw signUpError;
				
				// Sign in after signup
				const { error: newSignInError } = await supabase.auth.signInWithPassword({
					email: demoEmail,
					password: demoPassword
				});
				
				if (newSignInError) throw newSignInError;
			} else if (signInError) {
				throw signInError;
			}
			
			goto('/');
		} catch (err: any) {
			error = err.message || 'Une erreur est survenue';
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-teal-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
	<div 
		class="w-full max-w-md transform transition-all duration-700 ease-out"
		class:opacity-0={!showLogo}
		class:translate-y-8={!showLogo}
		class:opacity-100={showLogo}
		class:translate-y-0={showLogo}
	>
		<!-- Logo with heartbeat animation -->
		<div class="flex justify-center mb-8 animate-pulse">
			<img 
				src="/images/ei-1763590404024-removebg-preview.png" 
				alt="Treccy Logo" 
				class="h-32 w-32 object-contain filter drop-shadow-2xl"
			/>
		</div>
		
		<!-- Card with glassmorphism effect -->
		<div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 transform hover:scale-[1.02] transition-transform duration-300">
			<div class="text-center mb-6">
				<h1 class="text-3xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-orange-600 bg-clip-text text-transparent mb-2">
					Bienvenue
				</h1>
				<p class="text-gray-600 dark:text-gray-300 text-sm">
					Entrez le mot de passe pour accéder à l'application
				</p>
			</div>
			
			<form onsubmit={handleLogin} class="space-y-6">
				<div class="space-y-2">
					<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
						Mot de passe
					</label>
					<div class="relative">
						<input
							id="password"
							type="text"
							bind:value={password}
							placeholder="Tapez 'Treccy'"
							class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 outline-none"
							required
						/>
					</div>
					<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
						Indice: Le nom de l'application
					</p>
				</div>
				
				{#if error}
					<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm animate-shake">
						{error}
					</div>
				{/if}
				
				<button
					type="submit"
					disabled={isLoading}
					class="w-full bg-gradient-to-r from-cyan-600 via-teal-600 to-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
				>
					<span class="relative z-10">
						{isLoading ? 'Connexion...' : 'Accéder à l\'application'}
					</span>
					<div class="absolute inset-0 bg-gradient-to-r from-cyan-700 via-teal-700 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				</button>
			</form>
		</div>
		
		<!-- Footer -->
		<div class="text-center mt-8">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				Développé par 
				<a 
					href="https://josh-right-congo.netlify.app" 
					target="_blank"
					rel="noopener noreferrer"
					class="font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 relative inline-block group"
				>
					Josh Right
					<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 dark:bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
				</a>
			</p>
		</div>
	</div>
</div>

<style>
	@keyframes shake {
		0%, 100% { transform: translateX(0); }
		25% { transform: translateX(-10px); }
		75% { transform: translateX(10px); }
	}
	
	.animate-shake {
		animation: shake 0.3s ease-in-out;
	}
</style>
