const CAHCHE_NAME="version-1"
const urlsToCache=["index.html","offline.html"]

this.addEventListener('install',(event)=>{
    event.waituntil(
        caches.open(CAHCHE_NAME).then((cache)=>{
            console.log('Opened cache')
            return cache.addAll(urlsToCache)
        })

    )

})

this.addEventListener('fetch',(event)=>{
    event.respondWith(
        caches.match(event.request).then((res)=>{
            return fetch(event.request).catch(()=>caches.match('offline.html'))
        })
    )
})

this.addEventListener('activate',(event)=>{
    const cacheWhiteList=[]
    cacheWhiteList.push(CAHCHE_NAME)
    event.waituntil(caches.keys().then((cachesNames)=>Promise.all(
        cachesNames.map((cacheName)=>{
            if(!cacheWhiteList.includes(cacheName)){
                return caches.delete(cacheName)
            }
        })
    )))
})