<template>
    <div class="consumo-mes">
        <h3>Consumo del mes</h3>
        <div v-for="(item, index) in expenses" :key="index" class="gasto-item">
            <div class="icono" :style="{ backgroundColor: item.color }">
                <ion-icon :icon="item.icon" />
            </div>
            <div class="detalle">
                <h4>{{ item.name }}</h4>
                <ion-progress-bar :value="item.percentage / 100" color="medium"></ion-progress-bar>
            </div>
            <div class="monto">
                ${{ item.amount.toFixed(2) }}
            </div>
        </div>
        <p class="ver-mas">See more &gt;&gt;</p>
    </div>
</template>

<script setup>
import { IonProgressBar } from '@ionic/vue';
import { bulbOutline } from 'ionicons/icons';

const expensesData = [
    {
        name: 'Compras online',
        percentage: 16,
        amount: 250.00,
        icon: bulbOutline,
        color: '#007bff'
    },
    {
        name: 'Supermercado',
        percentage: 22,
        amount: 250.00,
        icon: bulbOutline,
        color: '#fd7e14'
    },
    {
        name: 'Compras online',
        percentage: 22,
        amount: 250.00,
        icon: bulbOutline,
        color: '#1e3a8a'
    }
];

const expenses = expensesData; // Asignación correcta después de declarar expensesData
</script>

<style scoped>
.consumo-mes {
    color: #1e3a8a;
    background: rgb(252, 251, 251);
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 20px;
}

.consumo-mes h3 {
    color: #1e3a8a;
    font-weight: bold;
}

.gasto-item {
    display: flex;
    align-items: center;
    margin: 15px 0;
}

.icono {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-right: 15px;
}

.icono ion-icon {
    font-size: 20px;
}

.detalle {
    flex-grow: 1;
}

.monto {
    font-weight: bold;
}

.ver-mas {
    color: #1e3a8a;
    text-align: right;
    cursor: pointer;
}
</style>
