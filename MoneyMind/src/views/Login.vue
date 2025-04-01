<template>
  <ion-page :class="{ 'dark-mode': isDarkMode }">
    <ion-content class="ion-padding">
      <div class="form-container centered">
        <h2 class="text-center">{{ isLogin ? 'Sign In' : 'Sign Up' }}</h2>
        <p class="text-center welcome-text font-bold">
          {{ isLogin ? 'Hi, Welcome Back! 👋' : 'Create a new account 🎉' }}
        </p>

        <ion-list>
          <div v-if="!isLogin" class="input-group">
            <label class="input-label">Full Name</label>
            <ion-item class="input-field" lines="none">
              <ion-input v-model="fullName" type="text" placeholder="Enter your full name" required />
            </ion-item>
          </div>

          <div class="input-group">
            <label class="input-label">Email Address</label>
            <ion-item class="input-field" lines="none">
              <ion-input v-model="email" type="email" placeholder="Enter your email address" required />
            </ion-item>
          </div>

          <div v-if="!isLogin" class="input-group">
            <label class="input-label">Profile Picture URL</label>
            <ion-item class="input-field" lines="none">
              <ion-input v-model="profilePicture" type="text" placeholder="https://example.com/image.jpg" />
            </ion-item>
          </div>

          <div class="input-group">
            <label class="input-label">Password</label>
            <ion-item class="input-field" lines="none">
              <ion-input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Enter your password" required />
              <ion-icon :icon="showPassword ? eyeOff : eye" slot="end" @click="togglePassword" class="eye-icon" />
            </ion-item>
            <p v-if="!isLogin" class="password-hint">
              Password must be at least 8 characters, include an uppercase letter, a number, and a special character.
            </p>
          </div>

          <div v-if="!isLogin" class="input-group">
            <label class="input-label">Confirm Password</label>
            <ion-item class="input-field" lines="none">
              <ion-input v-model="confirmPassword" :type="showPassword ? 'text' : 'password'" placeholder="Confirm your password" required />
            </ion-item>
          </div>
        </ion-list>

        <div v-if="isLogin" class="d-flex justify-content-between align-items-center mb-3">
          <div class="form-check">
            <input type="checkbox" class="form-check-input" v-model="rememberMe" />
            <label class="form-check-label">Remember Me</label>
          </div>
          <router-link to="/forgot-password" class="text-decoration-none">Forgot Password?</router-link>
        </div>

        <ion-button v-if="!showOtpInput" expand="full" @click="isLogin ? login() : signUp()" class="form-btn">
          {{ isLogin ? 'Sign In' : 'Sign Up' }}
        </ion-button>

        <ion-button v-if="showOtpInput" expand="full" @click="verifyOtp()" class="form-btn verify-btn">
          Verify OTP
        </ion-button>

        <p class="text-center account-text">
          {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
          <a href="#" @click.prevent="toggleForm" class="toggle-link">{{ isLogin ? 'Sign Up' : 'Sign In' }}</a>
        </p>
      </div>
    </ion-content>
  </ion-page>
</template>


<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonList, IonItem, IonInput, IonButton, IonIcon } from '@ionic/vue';
import { eye, eyeOff } from 'ionicons/icons';

export default {
  name: 'UserLogin',
  components: { IonPage, IonContent, IonList, IonItem, IonInput, IonButton, IonIcon },
  setup() {
    const router = useRouter();
    const isLogin = ref(true);
    const fullName = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const otp = ref('');
    const showPassword = ref(false);
    const isDarkMode = ref(false);
    const showOtpInput = ref(false);
    const rememberMe = ref(false);
    const profilePicture = ref('');

    onMounted(() => {
      if (localStorage.getItem('rememberMe') === 'true') {
        email.value = localStorage.getItem('email') || '';
        password.value = localStorage.getItem('password') || '';
        rememberMe.value = true;
      }
    });

    const togglePassword = () => showPassword.value = !showPassword.value;
    const toggleForm = () => {
      isLogin.value = !isLogin.value;
      showOtpInput.value = false;
    };

    const validatePassword = (password) => {
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    };

    const handleRememberMe = () => {
      if (rememberMe.value) {
        localStorage.setItem('email', email.value);
        localStorage.setItem('password', password.value);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
      }
    };

    const login = async () => {
      if (!email.value.trim() || !password.value.trim()) {
        alert('Por favor, ingresa tu correo o nombre de usuario y la contraseña.');
        return;
      }

      try {
        const credential = encodeURIComponent(email.value);
        const encodedPassword = encodeURIComponent(password.value);
        const url = `https://dev.genlabs.us/api/account/authenticate?credential=${credential}&password=${encodedPassword}`;


        const response = await fetch(url, {
          method: 'POST',
          headers: { Accept: '*/*' }
        });

        const data = await response.json();

        if (data.hasError) {
          alert('Error al iniciar sesión: ' + (data.error || 'Credenciales incorrectas.'));
          return;
        }

        localStorage.setItem('jwtToken', data.jwtToken);
        handleRememberMe();
        router.push('/tabs/homepage');
      } catch (error) {
        alert('Error al conectar con el servidor: ' + error.message);
      }
    };

    const signUp = async () => {
      if (!fullName.value.trim() || !email.value.trim() || !password.value.trim()) {
        alert('Por favor, completa todos los campos.');
        return;
      }

      if (!validatePassword(password.value)) {
        alert('La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, un número y un carácter especial.');
        return;
      }

      if (password.value !== confirmPassword.value) {
        alert('Las contraseñas no coinciden.');
        return;
      }

      const [firstName, ...lastNameParts] = fullName.value.trim().split(' ');
      const lastName = lastNameParts.join(' ') || 'Apellido';
      const userName = email.value.split('@')[0];

      const queryParams = new URLSearchParams({
        firstName,
        lastName,
        email: email.value,
        userName,
        profilePicture: profilePicture.value || '',
        password: password.value,
        confirmPassword: confirmPassword.value,
      });

      const url = `https://dev.genlabs.us/api/account/register?${queryParams.toString()}`;


      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { Accept: '*/*' }
        });

        const data = await response.json();

        if (!response.ok || data.hasError) {
          const errorMsg = data?.error || 'Error al registrar usuario.';
          alert('Registro fallido:\n' + errorMsg);
          return;
        }

        if (data.jwtToken) {
          localStorage.setItem('jwtToken', data.jwtToken);
        }

        router.push('/tabs/homepage');
      } catch (error) {
        alert('Error en el registro: ' + error.message);
      }
    };

    const logout = () => {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('rememberMe');
      router.push('/login');
    };

    return {
      isLogin, fullName, email, password, confirmPassword, otp,
      showPassword, togglePassword, login, signUp, logout,
      eye, eyeOff, toggleForm, isDarkMode, showOtpInput, rememberMe,
      profilePicture
    };
  }
};
</script>

 
 
 
<style>
:root {
  --background-color: #f8f9fa; /* Fondo general claro */
  --form-bg: #ffffff; /* Fondo del formulario */
  --text-color: #212529; /* Negro suave */
  --input-bg: #f1f3f4; /* Fondo de los inputs */
  --input-border: #ced4da; /* Borde gris claro */
  --button-bg: #033974; /* Azul botón */
  --button-hover: #0056b3; /* Azul más oscuro */
  --shadow-light: rgba(0, 0, 0, 0.1);
}
 
/* Estilos generales */
body {
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: 'Arial', sans-serif;
  transition: background-color 0.3s ease-in-out;
}
 
/* Contenedor del formulario */
.form-container {
  max-width: 400px;
  padding: 25px;
  text-align: center;
  background: var(--form-bg);
  border-radius: 12px;
  box-shadow: 0 4px 10px var(--shadow-light);
  transition: box-shadow 0.3s ease-in-out;
}
 
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 400px;
}
 
/* Texto */
.text-center {
  text-align: center;
  color: var(--text-color);
  font-size: large;
  font-weight: bold;
}
 
/* Labels */
label {
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
  color: var(--text-color);
}
 
/* Inputs */
.input-field {
  width: 100%;
  padding: 12px;
  border: none;
  border-bottom: 2px solid var(--input-border);
  border-radius: 5px;
  background-color: var(--input-bg);
  color: var(--text-color);
  outline: none;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 2px 4px var(--shadow-light);
}
 
.input-field:focus {
  border-bottom: 2px solid var(--button-bg);
  box-shadow: 0px 4px 8px rgba(0, 123, 255, 0.2);
}
 
/* Botón */
.form-btn {
  width: 100%;
  padding: 12px;
  color: white;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
 
.form-btn:hover {
  background-color: var(--button-hover);
  transform: scale(1.02);
}
 
.form-btn:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
}
 
/* Enlaces */
.toggle-link {
  color: var(--button-bg);
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
}
 
.toggle-link:hover {
  text-decoration: underline;
  color: var(--button-hover);
}
 
/* Modo Oscuro Automático */
@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #121212;
    --form-bg: #1e1e1e;
    --text-color: #ffffff;
    --input-bg: #2c2c2c;
    --input-border: #444;
    --button-bg: #007bff;
    --button-hover: #0056b3;
    --shadow-light: rgba(255, 255, 255, 0.1);
  }
}
 
</style>