<template>
      <ion-list>
        <ion-item>
          <ion-label position="stacked">Tipo</ion-label>
          <ion-input placeholder="Gasto" disabled></ion-input>
        </ion-item>
        
        <ion-item>
          <ion-label position="stacked">Monto</ion-label>
          <ion-input type="number" placeholder="$0.00"></ion-input>
        </ion-item>
        
        <ion-item>
          <ion-label position="stacked">Fecha</ion-label>
          <ion-input placeholder="dd/mm/aaaa"></ion-input>
        </ion-item>
        
        <ion-item>
          <ion-label position="stacked">Categoría</ion-label>
          <ion-select placeholder="Seleccionar categoría">
            <ion-select-option value="comida">Comida</ion-select-option>
            <ion-select-option value="transporte">Transporte</ion-select-option>
            <ion-select-option value="salud">Salud</ion-select-option>
          </ion-select>
        </ion-item>
        
        <ion-item>
          <ion-label position="stacked">Tipo de cuenta</ion-label>
          <ion-select placeholder="Seleccionar tipo de cuenta">
            <ion-select-option value="debito">Débito</ion-select-option>
            <ion-select-option value="credito">Crédito</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
      
      <ion-button expand="full" color="primary">Guardar</ion-button>
</template>

<script setup>
import {  IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';

</script>

<style>
ion-item {
  --background: white;
  --color: black;
}


ion-button {
  margin-top: 20px;
  --background: #0a2f73;
  --color: white;
}
</style>