<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <transactionHeader />
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <TransactionList />
        </ion-content>
    </ion-page>
</template>

<script setup>
import TransactionList from '../components/TransactionList.vue';
import TransactionHeader from '../components/TransactionHeader.vue';

</script>

<style scoped>

</style>