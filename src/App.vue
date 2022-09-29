<!--

** Created by Vugar Safarzada (27.09.2022) **

DONE: Yeni tapşırıqların yaradılması üçün bölmə
DONE: Mövcud tapşırıqların siyahısı
====================================
DONE: Yeni tapşırığın yaradılması,
DONE: Tapşırığı tamamlanmış və tamamlanmamış olaraq işarələmək,
DONE: Öncədən qeydə alınmış tapşırığı silmək,
DONE: Tapşırığın başlığını və teqlərin siyahısını redaktə etmək
====================================
TODO: Yeni teqlərin öncədən qeydə alınmış teqlər əsasında təyin olunması.
TODO: Teq ilə taskların filter olunaraq təsvir olunması
TODO: Teq filteri sıfırlamaq

-->

<template>
  <div id="app">
    <layout>
      <router-view />
    </layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout'

export default {
  components: { Layout },
  data() {
    return {}
  },
}

</script>

<style lang="scss">
@import './styles/global.css';
</style>