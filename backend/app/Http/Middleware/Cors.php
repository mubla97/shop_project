<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Cors
{
  /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:3000');
        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Authorization, Origin, X-Requested-With, Accept');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');

        if ($request->getMethod() == "OPTIONS") {
            $response->headers->set('Access-Control-Max-Age', '86400');
            $response->headers->set('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
        }

        return $response;
    }
}
