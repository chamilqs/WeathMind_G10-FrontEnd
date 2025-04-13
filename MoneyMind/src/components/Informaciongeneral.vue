<template>
  <div class="container-contenido">
        <ion-grid>
          <ion-row>
            <ion-col size="8">
              <p class="label">Your Balance</p>
              <h2 class="balance">$125,000</h2>
            </ion-col>
            <ion-col size="4" class="text-align">
              <p class="resumen">Last month summary</p>
              <p class="porcentaje">+5.57%</p>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

</template>

<script>

</script>

<style>

.container-contenido {
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 0px;
  padding-bottom: 16px;
  display: flex;
  background-color: #f4f4f4;
  
}

.label {
  font-size: 14px;
  color: #0A2A62;
  margin: 0;
}

.balance {
  font-size: 24px;
  font-weight: bold;
  color: #0A2A62;
  margin: 5px 0 0;
}

.resumen {
  font-size: 12px;
  color: gray;
  text-align: right;
  margin: 0;
}

.porcentaje {
  font-size: 14px;
  color: #5C9EFF;
  text-align: right;
  margin: 5px 0 0;
}

</style>