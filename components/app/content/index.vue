<template>
  <component :is="component" :content="content" v-bind="componentProps" />
</template>

<script setup>
import banner from "@/components/app/content/Banner.vue";
import divider from "@/components/app/content/Divider.vue";
import html from "@/components/app/content/Html.vue";
import media from "@/components/app/content/Media.vue";
import quiz from "@/components/app/content/Quiz.vue";
import faq from "@/components/app/content/Faq.vue";
import img from "@/components/app/content/Img.vue";
import vid from "@/components/app/content/Vid.vue";
import audio from "@/components/app/content/Audio.vue";
import contentCardListing from "@/components/app/ContentCardListing.vue";

const props = defineProps({
  type: {
    default: "html",
    type: String,
  },
  content: {
    default: "html",
    type: String,
  },
  element: Object,
});

let componentProps = ref(null);
const component = computed(() => {
  let component;
  switch (props.type) {
    case "banner":
      component = banner;
      break;
    case "divider":
      component = divider;
      break;
    case "html":
      component = html;
      break;
    case "img":
      component = img;
      break;
    case "vid":
      component = vid;
      break;
    case "audio":
      component = audio;
      componentProps.value = { bannerUrl: props.element.bannerUrl };
      break;
    case "exam":
      component = quiz;
      break;
    case "faq":
      component = faq;
      break;
    case "reference":
      component = contentCardListing;
      componentProps.value = { showSeeMore: false, horizontal: true, grid: 12 };
      break;
  }
  return component;
});
</script>
