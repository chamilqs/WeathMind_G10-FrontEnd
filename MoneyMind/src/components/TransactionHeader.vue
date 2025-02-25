<template>
    <div class="transaction-header">
        <ion-button fill="clear" class="back-button">
            <ion-icon name="chevron-back-outline"></ion-icon>
        </ion-button>
        <div class="text-content">
            <h2>Transacciones</h2>
            <p>Tu saldo actual</p>
            <h1>$125,000</h1>
        </div>
    </div>
</template>

<script setup>
import { IonButton, IonIcon } from '@ionic/vue';
</script>

<style scoped>
.transaction-header {
    text-align: center;
    padding: 20px;
    background: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    position: relative;
}

.back-button {
    position: absolute;
    left: 10px;
    top: 20px;
    color: #1e3a8a;
}

.text-content h2 {
    color: #1f2937;
    font-weight: bold;
    margin: 0;
}

.text-content p {
    color: #9ca3af;
    margin: 0;
}

.text-content h1 {
    color: #1e3a8a;
    font-size: 32px;
    font-weight: bold;
    margin: 10px 0 0;
}
</style>
