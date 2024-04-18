<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Campaign;

class CampaignController extends Controller
{
    public function index()
{
    $campaigns = Campaign::all();
    $transformed = $campaigns->map(function($campaign) {
        return [
            'id' => $campaign->id,
            'name' => $campaign->name
        ];
    });
    return response()->json($transformed);
}

public function show(Campaign $campaign)
{
    return response()->json($campaign);
}

public function store(Request $request)
{
    $campaign = Campaign::create($request->all());
    return response()->json($campaign, 201);
}

public function update(Request $request, Campaign $campaign)
{
    $campaign->update($request->all());
    return response()->json($campaign);
}

public function destroy(Campaign $campaign)
{
    $campaign->delete();
    return response()->json(null, 204);
}
}
