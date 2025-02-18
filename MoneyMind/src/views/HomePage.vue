<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="perfil">
        <div class="user-info">
          <ion-avatar>
            <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="avatar">
          </ion-avatar>
          <ion-label>
            <p>Welcome back</p>
            <h2 class="name">John Doe</h2>
            </ion-label>

        </div>
      </ion-toolbar>
    </ion-header>
  </ion-page>

  <ion-content>

  </ion-content>
</template>

<script setup>

</script>

<style scoped>
ion-toolbar {
  --background: #f4f4f4;
}

ion-content {
  --background: #f4f4f4;
}

.perfil {
  padding: 10px;
  height: 100px;
}

.user-info {
  display: flex;
  align-items: center;
  color: black
}

.name {
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
}
</style>