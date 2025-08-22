<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register() {
        $validator = Validator::make(request()->all(), [
            'name'     => 'required',
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = new User;
        $user->name     = request()->name;
        $user->email    = request()->email;
        $user->password = bcrypt(request()->password);
        $user->save();

        return response()->json($user, 201);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth('api')->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth('api')->logout(); // Fixed: Use the correct guard

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        try {
            $user = auth('api')->user();

            // Get permissions safely
            $permissions = [];
            if ($user && method_exists($user, 'getAllPermissions')) {
                $permissions = $user->getAllPermissions()->map(function($perm){
                    return $perm->name;
                });
            }

            // Get new token
            $newToken = auth('api')->refresh();

            return response()->json([
                'access_token' => $newToken, // Fixed: Use auth('api')->refresh()
                'token_type' => 'bearer',
                'expires_in' => JWTAuth::factory()->getTTL() * 60,
                'user' => [
                    "name"      => $user->name,
                    "full_name" => $user->name . ' ' . ($user->surname ?? ''),
                    "email"     => $user->email,
                    "avatar"    => $user->avatar ? env("APP_URL")."storage/".$user->avatar : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', // Fixed typo: avtar -> avatar
                    "role_name"      => $user->role ? $user->role->name : null, // Fixed: rol -> role
                    "permissions" => $permissions,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Token refresh failed',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        try {
            $user = auth('api')->user();

            // Get permissions safely
            $permissions = [];
            if ($user && method_exists($user, 'getAllPermissions')) {
                $permissions = $user->getAllPermissions()->map(function($perm){
                    return $perm->name;
                });
            }

            return response()->json([
                'access_token' => $token,
                'token_type'   => 'bearer',
                'expires_in'   => JWTAuth::factory()->getTTL() * 60,
                'user' => [
                    "id"        => $user->id,
                    "name" => $user->name ,
                    "full_name" => $user->name . ' ' . ($user->surname ?? ''),
                    "email"     => $user->email,
                    "avatar"    => $user->avatar ? env("APP_URL")."storage/".$user->avatar : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                    "role_name"      => $user->role ? $user->role->name : null,
                    "permissions" => $permissions,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to generate token response',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
