self.addEventListener('fetch', e =>{
    e.respondewith(cache.match(e.request ));
});

self.addEventListener('install', e =>{
    const cacheProm = caches.open('cache-v1')
        .then(cache => {
            return cache.addAll([
                'index.html',
                'css/style.css',
                'app.js',
                'img/Pera.png',
                'img/Pizza.png'
            ])
        });
    e.waitUntil(cacheProm);
});
self.addEventListener('fetch', e =>{
    //cache with network fallback
    const respuesta = caches.match( e.request )
        .then ( res => {
            if ( res ) return res;
            //no existe el archivo
            //tengo que ir a la web
            console.log('No existe', e.request.url);
            return fetch( e.request ).then ( newResp => {
                caches.open('cache-v1')
                    .then( cache => {
                        cache.put( e.request, newResp);
                    }
                    )
                return newResp.clone;
            });
        });
        e.respondWith(respuesta);
    //only cache
    //e.respondWith( caches.match(e.request));
});

