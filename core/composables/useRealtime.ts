import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { mapper } from "~/mappers";
import collection from "~/mappers/models/schema/collection";
import noPaginationCollection from "~/mappers/models/schema/noPaginationCollection";
export const useRealtime = (channel, event, model) => {
    const runTimeConfig = useRuntimeConfig()
    const status = ref('Connecting...');
    const stream = ref([]);
    let response = ref()
    let listeningTo = ref(null);
    
    if (process.client) {
        window.Pusher = Pusher;
        window.Echo = new Echo({
            broadcaster: 'pusher',
            key: runTimeConfig.public.pusherKey,
            wsHost: runTimeConfig.public.pusherWsHost,
            wsPort: runTimeConfig.public.pusherWsPort,
            forceTLS: runTimeConfig.public.pusherForceTLS,
            disableStats: true,
            cluster: 'us2'
        });

        window.Echo.connector.pusher.connection.bind('connected', () => {
            status.value = 'Connected';
        });

        window.Echo.connector.pusher.connection.bind('disconnected', () => {
            status.value = 'Disconnected';
        });
    }

    const listen = () => {
        window.Echo.channel(channel).listen(event, async (update) => {
            stream.value.push(JSON.stringify(update, null, 4));
            
            if (model) {
                if (model.collection) {
                    if (model.pagination) {
                      response.value = mapper({...update}, collection({...update.newMessage}, model.name), model.raw);
                    } else {
                      response.value = mapper(
                        {...update},
                        noPaginationCollection({...update.newMessage}, model.name),
                        model.raw
                      );
                    }
                  } else {
                    response.value = mapper({...update.newMessage}, model.name, model.raw);
                  }
            } else {
                response.value = {...update}
            }            
        });
        listeningTo.value = channel + '/' + event;
    }

    const clear = () => {
        stream.value = [];
    }

    return  {
        status,
        listeningTo,
        listen,
        clear,
        stream,
        response
    }
}
