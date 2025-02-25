<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <div class="fecha">
                    <ion-datetime-button datetime="datetime"></ion-datetime-button>
                    <ion-modal :keep-contents-mounted="true">
                        <ion-datetime
                            id="datetime"
                            presentation="date"
                            value="2023-11-02T01:22:00"
                        >
                        </ion-datetime>
                    </ion-modal>
                </div>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div class="container-contenido">
                <ion-grid>
                    <ion-row>
                        <ion-col size="8">
                            <p class="label">Gastos</p>
                            <h2 class="balance">$125,000</h2>
                        </ion-col>
                        <ion-col size="4" class="text-align">
                            <p class="resumen">Last month summary</p>
                            <p class="porcentaje">+5.57%</p>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            
            <!-- Aquí se muestra la gráfica -->
            <div class="estadistica">
                <PieChart />
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonContent } from '@ionic/vue';
import { IonDatetime, IonDatetimeButton, IonModal } from '@ionic/vue';
import { IonGrid, IonRow, IonCol } from '@ionic/vue';
import PieChart from '@/components/PieChart.vue'; // IMPORTANTE: Importa el componente aquí
import ConsumeDelMes from '../components/ConsumeDelMes.vue';

</script>

<style scoped>
ion-content {
    --background: #f4f4f4;
}

.estadistica {
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
