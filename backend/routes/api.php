<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CampaignController;

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

Route::resource('clients', ClientController::class);
Route::resource('campaigns', CampaignController::class);
Route::post('upload', 'App\Http\Controllers\CSVController@upload');
Route::get('/clients/campaign/{campaign_id}', [ClientController::class, 'getClientsByCampaign']);




