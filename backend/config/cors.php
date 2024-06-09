<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie','hasShop','profile','shop', 'register', 'login', 'csrf-token','/profile/edit', 'profile/delete',
                 '/profile/password', '/profile/upload-avatar'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:3000'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];