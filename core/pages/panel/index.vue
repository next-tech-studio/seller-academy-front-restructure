<template>
    <NuxtLayout name="sidebar">
      <div class="pa-8 text-center">
        <iframe
          title="FirstSeller"
          width="100%"
          height="800"
          src="https://app.powerbi.com/view?r=eyJrIjoiNDliODFkOTMtNWFmYi00Njg1LTlkYzctNzNjZTgxNTM0NWM3IiwidCI6IjdjMzg2MTliLTdlOTQtNDFjOC04ZmM1LTE4YWI5MWM1MWFiNCIsImMiOjZ9"
          frameborder="0"
          allowFullScreen="true"
        ></iframe>
      </div>
    </NuxtLayout>
  </template>
  
  <script setup>
  definePageMeta({
    middleware: ["auth"],
    layout: false,
  });
  </script>
  