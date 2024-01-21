export const useReactions = (reactions) => {
    const items = [
        {
            id: 1,
            value: 'like',
            src: '/images/emojis/like.png'
        },
        {
            id: 2,
            value: 'dislike',
            src: '/images/emojis/dislike.png'
        },
        {
            id: 3,
            value: 'happy',
            src: '/images/emojis/happy.png'
        },
        {
            id: 4,
            value: 'smile',
            src: '/images/emojis/smile.png'
        },
        {
            id: 5,
            value: 'sad',
            src: '/images/emojis/sad.png'
        },
        {
            id: 6,
            value: 'ok',
            src: '/images/emojis/ok.png'
        },
        {
            id: 7,
            value: 'clap',
            src: '/images/emojis/clap.png'
        }
    ]

    items.forEach(element => {
        return element.count = () => reactions?.find(r => {
            return r.reaction == element.value
        })?.total || 0
    })

    return items
}
