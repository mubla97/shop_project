<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie','hasShop','profile','shop', 'shop/*', 'register', 'login', 'csrf-token','profile/*',
     'storage', 'storage/*', 'product', 'product/*', 'user', 'user/*', 'users'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:3000'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];