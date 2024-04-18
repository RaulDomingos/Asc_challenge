<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller
{
    public function index() {
        $clients = Client::all();
        return response()->json($clients);
    }

    public function show(Client $client) {
        return response()->json($client);
    }

    public function store(Request $request) {
        $client = Client::create($request->all());
        return response()->json($client, 201);
    }

    public function update(Request $request, Client $client){
        $client->update($request->all());
        return response()->json($client);
    }

    public function destroy(Client $client){
        $client->delete();
        return response()->json(null, 204);
    }

public function getClientsByCampaign($campaignId)
{
    if ($campaignId === 'all') {
        $clients = Client::all();
        return response()->json($clients);
    } else {
        $clients = Client::where('campaign_id', $campaignId)->get();
        return response()->json($clients);
    }

}


}
