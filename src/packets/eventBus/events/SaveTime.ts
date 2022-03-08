import {subscribeEvent, broadcastEvent} from "../eventBus";

const eventName = 'SAVE_TIME'

const subscribe = (callback : any) => {
    return subscribeEvent(eventName, callback)
}

const broadcast = () => {
    broadcastEvent(eventName)
}

export const saveTime = {
    subscribe,
    broadcast,
}