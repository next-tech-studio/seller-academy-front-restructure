<template>
    <v-img
        id="chat-room-header"
         :src="item.bannerUrl"
         class="align-end"
         gradient="180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.56) 100%"
         height="260px"
         cover
       >
         <v-container>
             <v-list-item class="w-100 px-0">
                <template v-slot:prepend>
                  <v-avatar
                    class="bordered"
                    color="n050"
                    size="96"
                    :image="item.avatarUrl"
                  ></v-avatar>
                </template>

                <v-list-item-title>
                    <span class="text-body-1 text-text-light font-weight-bold">
                        {{ item.name }}
                    </span>
                </v-list-item-title>

                <v-list-item-title>
                    <v-chip size="small" class="bg-background-light">{{ item?.category?.title }}</v-chip>
                </v-list-item-title>
            </v-list-item>
         </v-container>
       </v-img>
</template>

<script setup>
const props = defineProps({
    item: Object
})
</script>

<style lang="css">
#chat-room-header .v-list-item__content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
}
</style>
