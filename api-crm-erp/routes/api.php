<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Configuration\MethodPaymentController;
use App\Http\Controllers\configuration\SucursaleController;
use App\Http\Controllers\Configuration\SucursaleDeliverieController;
use App\Http\Controllers\Configuration\ClientSegmentController;
use App\Http\Controllers\Configuration\ProductCategorieController;
use App\Http\Controllers\Configuration\ProviderController;
use App\Http\Controllers\Configuration\UnitController;
use App\Http\Controllers\Configuration\WarehouseController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\UserAccessContorller;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group([

    //'middleware' => 'auth:api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login',    [AuthController::class, 'login'])->name('login');
    Route::post('/logout',   [AuthController::class, 'logout'])->name('logout');
    Route::post('/refresh',  [AuthController::class, 'refresh'])->name('refresh');
    Route::post('/me',       [AuthController::class, 'me'])->name('me');
});


Route::group([

    'middleware' => 'auth:api',
    //'prefix' => 'auth'

], function ($router) {
    Route::resource('roles', RolePermissionController::class);
    //se pone en post por que se va guardar una imagen si ponemos put o patch no serviria
    Route::post('/users/{id}',  [UserAccessContorller::class, 'update']);
    Route::get('/users/config', [UserAccessContorller::class, 'config']);
    Route::resource("users", UserAccessContorller::class);

    Route::resource("sucursales", SucursaleController::class);
    Route::resource("warehouse", WarehouseController::class);
    Route::resource("sucursal_deliveries", SucursaleDeliverieController::class);
    Route::resource("Method_payments",     MethodPaymentController::class);
    Route::resource("client_segments",     ClientSegmentController::class);

    //para la actualizacion de la imagen
    Route::post('/product_categories/{id}',  [ProductCategorieController::class, 'update']);
    Route::resource("product_categories",     ProductCategorieController::class);

    Route::post('/providers/{id}',   [ProviderController::class, 'update']);
    Route::resource("providers",     ProviderController::class);

    Route::post('/units/add-transform',          [UnitController::class, 'add_transform']);
    Route::delete('/units/delete-transform/{id}',[UnitController::class, 'delete_transform']);

    Route::post('/units/{id}',   [UnitController::class, 'update']);
    Route::resource("units",     UnitController::class);

});
