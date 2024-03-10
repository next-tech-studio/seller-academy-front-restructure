<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="9">
        <h2>{{ user?.info?.displayName }}</h2>
        <dashboard-menu
          v-model="tabs"
          :menu="menu"
          selected-class="text-high-emphasis"
          :grow="false"
        ></dashboard-menu>
        <v-window v-model="tabs" class="pa-4">
          <v-window-item value="posts">
            <app-content-card-listing
              :content="posts"
              horizontal="true"
              :responsive-horizontal="true"
              @load:more="toMore"
              see-more-title="see_more_articles"
              grid="12"
              :image-square="true"
              @to:item="toItem($event)"
              :show-filter="false"
            ></app-content-card-listing>
          </v-window-item>
          <v-window-item value="about">
            <!-- <dashboard-address
              :information="userInfo.addressInfo"
            ></dashboard-address> -->
          </v-window-item>
        </v-window>
      </v-col>
      <v-col cols="12" lg="3">
        <profile-user-preview :user="user"> </profile-user-preview>
        <v-list
          :max-width="smAndDown ? '100%' : 400"
          class="pt-4"
          color="secondary"
        >
          <template v-for="item in user.following" :key="item.id">
            <app-profile-list-item
              avatar-size="40px"
              :item="item"
              class="px-0"
              @click="$emit('to:item', item.id)"
              :class="{ 'bg-white rounded-md mb-1': smAndDown }"
            >
              <template #title>
                <span class="text-caption text-text-heading font-weight-bold">{{
                  item.dispalyName
                }}</span>
              </template>
              <template #subtitle>
                <span class="text-caption text-text-high-emphasis">{{
                  item?.bio
                }}</span>
              </template>
              <template #append>
                <v-btn
                  :text="$t('follow')"
                  class="bg-background-primary"
                  slim
                  variant="text"
                  size="small"
                />
              </template>
            </app-profile-list-item>
          </template>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
let tabs = ref(null);
const menu = ref([
  { title: "posts", value: "posts" },
  { title: "about", value: "about" },
]);
let user = ref({
  // info: {
  //   avatarUrl:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFzLQed1JIV2gnckk6wt9i297HcCRSdSht2g&usqp=CAU",
  //   dispalyName: "هانیه محمدی ارزنق",
  //   followersCount: 12,
  //   followingCount: 24,
  //   bio: "فرانت اند دولوپر در دیجی‌نکست، دارم پایان نامه می‌نویسم که ارشد کامپیوترمم از بهشتی بگیرم خدا بخواد:)",
  // },
  // following: [
  //   {
  //     id: 1,
  //     avatarUrl:
  //       "https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
  //     dispalyName: "نیلوفر طهماسب",
  //     bio: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
  //   },
  //   {
  //     id: 2,
  //     avatarUrl:
  //       "https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
  //     dispalyName: "نیلوفر طهماسب",
  //     bio: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
  //   },
  //   {
  //     id: 3,
  //     avatarUrl:
  //       "https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
  //     dispalyName: "نیلوفر طهماسب",
  //     bio: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
  //   },
  //   {
  //     id: 4,
  //     avatarUrl:
  //       "https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
  //     dispalyName: "نیلوفر طهماسب",
  //     bio: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
  //   },
  //   {
  //     id: 5,
  //     avatarUrl:
  //       "https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
  //     dispalyName: "نیلوفر طهماسب",
  //     bio: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
  //   },
  //   {
  //     id: 6,
  //     avatarUrl:
  //       "https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
  //     dispalyName: "نیلوفر طهماسب",
  //     bio: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
  //   },
  // ],
});
let posts = ref([]);
const { $repos } = useNuxtApp();
const route = useRoute();

const getUserprofile = () => {
  $repos.other.getUserProfileSidebar(route.params.id).then((res) => {
    Object.assign(user.value, res.data);
  });
};
const getUserPosts = () => {
  $repos.other.getUserPosts(route.params.id).then((res) => {
    Object.assign(posts.value, res.data);
  });
};
onMounted(() => {
  getUserprofile();
  getUserPosts();
});
</script>
