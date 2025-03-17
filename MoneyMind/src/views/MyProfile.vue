<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- Botón para volver a Home -->
        <ion-buttons slot="start">
          <ion-button @click="goToHome">
            <ion-icon slot="icon-only" name="arrow-back-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
        
        <ion-title class="title">Mi Perfil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="foto-perfil">
        <ion-avatar>
          <img :src="user.avatarUrl" alt="avatar" />
        </ion-avatar>
      </div>

      <div class="info-perfil">
        <ion-list lines="full">
          <ion-item>
            <ion-label>
              <p class="label">Full Name</p>
              <h3>{{ user.fullName }}</h3>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label>
              <p class="label">Username</p>
              <h3>{{ user.username }}</h3>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label>
              <p class="label">Email</p>
              <h3>{{ user.email }}</h3>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label>
              <p class="label">Phone Number</p>
              <h3>{{ user.phone }}</h3>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label>
              <p class="label">Address</p>
              <h3>{{ user.address }}</h3>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import User from "@/models/User";

const router = useRouter();

const goToHome = () => {
  router.push("/tabs/homepage");
};

// Cargar datos desde el modelo User.js
const user = ref(User.mockData());
</script>


<style scoped>
	ion-header {
		padding-top: 20px;
    background-color: white;
	}

	ion-toolbar {
		--background: white;
		--padding-top: 0;
		--padding-bottom: 0;
		--pading-left: 0;
		--padding-right: 0;
	}

	.title {
		color: black;
		align-items: center;
		text-align: center;
		font-size: 18px;
	}

	ion-content {
		--background: white;
		--padding-top: 35px;
	}

	.foto-perfil {
		display: flex;
		justify-content: center;
		margin-bottom: 20px;

	}

	ion-avatar {
		width: 100px;
		height: 100px;
	}

	ion-list {
		background-color: white;
	}

	.label {
  font-size: 14px;
  color: gray;
  margin-bottom: 20px;
}

h3 {
  margin: 0;
  font-size: 18px;
  font-weight: normal;
}

</style>