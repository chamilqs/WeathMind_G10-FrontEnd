<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<transactionHeader />
			</ion-toolbar>
		</ion-header>
		<ion-content>
			
				<FormularioRegistro />
			
		</ion-content>
	</ion-page>

</template>

<script setup>
import FormularioRegistro from '../components/FormularioFinanzas.vue';
import transactionHeader from '../components/TransactionHeader.vue';

</script>

<style scoped>
ion-content {
    --background: #ffffff;
    min-height: 100vh; /* Ocupar toda la pantalla */
    display: flex;
    flex-direction: column;
}


</style>