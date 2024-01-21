export const useHeadTags = (item) => {
    const route = useRoute()
    const config = useRuntimeConfig()
    let tags = () => item?.tags?.length ? `, ${item?.tags?.map(i => i.title).toString()}` : ''
    let title = () => `${config.public.appName} | ${item?.title || 'پلتفرم جامع فروشندگان'}`
    let description = () => item?.seo?.description || 'پلتفرم جامع آموزش، ارتباط و ارتقای فروشندگان آنلاین'
    let image = () => item.bannerUrl || config.public.domain + '/images/logo/1.png'
    
    return {
        title: () => title(),
        meta: [
            { charset: 'utf-8' },
            { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1', 'user-scalable': 0 },
            { name: 'description', content: () => description() },
            { name: 'keywords', content: () => `دیجیکالا, فروشنده, آنلاین, آموزش${tags()}` },
            { property: 'og:title', content: title() },
            { property: 'og:description', content: () => description() },
            { property: 'og:image', content: () => image() },
            { property: 'og:type', content: () => item.type || 'website' },
            { property: 'og:site_name', content: config.public.appName },
            { property: 'og:url', content: () => config.public.siteUrl + route.path },
            { property: 'og:locale', content: 'fa_IR' },
            { name: 'twitter:site', content: () => config.public.appName },
            { name: 'twitter:image', content: () => image() },
            { name: 'twitter:title', content: () => title() },
            { name: 'twitter:description', content: () => description() },
        ],
        link: [{ rel: 'canonical', href: () => config.public.siteUrl + route.path }]
    }
}
