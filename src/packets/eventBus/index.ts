import {subscribeEvent, broadcastEvent} from './eventBus'
import { saveTime } from './events/SaveTime'

export const eventBus = {
    subscribeEvent,
    broadcastEvent,
    saveTime,
}