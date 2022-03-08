

let subscriptions : {[key : string] : any} = {}

export const subscribeEvent = (eventName : string, callback : any) => {
    if ( !subscriptions[eventName] ) {
        subscriptions[eventName] = new Set()
    }

    const callbacks = subscriptions[eventName]
    callbacks.add(callback)

    return () => {
        callbacks.delete(callback)
        if (callbacks.size === 0) {
            delete subscriptions[eventName]
        }
    }
}

export const broadcastEvent = (eventName : string, ...args : any) => {
    if (!subscriptions[eventName]) return
    for (const callback of subscriptions[eventName]) {
        callback(...args)
    }
}
