<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\TeamParticipants;
use App\Models\TeamRequest;
use Illuminate\Http\Request;

class TeamController extends Controller
{

    public function index()
    {
        $teams = Team::all();
        foreach ($teams as $team) {
            $team['participants'] = TeamParticipants::where('team_id', "=", $team->id)->count();
            $team['is_participant'] = TeamParticipants::where('team_id', "=", $team->id)
                ->where('user_id', "=", auth()->user()->id)
                ->count() > 0;
            $request = TeamRequest::where('team_id', "=", $team->id)
                ->where('user_id', "=", auth()->user()->id)
                ->first();
            $team['is_request'] = 0;
            if ($request) {
                $team['is_request'] = $request->status + 1;
            }
        }
        return response()->json($teams, 200);
    }

    public function request($team_id)
    {
        $id = auth()->user()->id;
        $is_participant = TeamParticipants::where('team_id', "=", $team_id)
            ->where('user_id', "=", $id)
            ->count() > 0;
        if ($is_participant) {
            return response("Already a member", 404);
        }
        $alreadyExist = TeamRequest::where('team_id', "=", $team_id)
            ->where('user_id', "=", $id)
            ->count() > 0;
        if ($alreadyExist) {
            return response("The request already exists", 404);
        }
        $request = TeamRequest::create(['user_id' => $id, "team_id" => $team_id]);
        return response()->json($request, 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
