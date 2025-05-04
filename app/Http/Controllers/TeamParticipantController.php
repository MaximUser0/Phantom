<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\TeamParticipants;
use App\Models\TeamRequest;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TeamParticipantController extends Controller
{
    public function indexRequests()
    {
        $teams_owner = Team::where("owner_id", auth()->user()->id)->get();
        $requests = new Collection();
        foreach ($teams_owner as $team) {
            $requests = $requests->merge(
                TeamRequest::where("team_id", $team->id)
                    ->join("users", "users.id", "=", "team_requests.user_id")
                    ->select("image", "name", "team_requests.id AS id", "description", DB::raw("'" . $team->title . "' AS title"))
                    ->where("status", 0)
                    ->get()
            );
        }
        return response()->json($requests, 200);
    }
    public function indexMyRequests()
    {
        $requests = TeamRequest::where("user_id", auth()->user()->id)
            ->join("teams", "teams.id", "=", "team_requests.team_id")
            ->select("image", "title", "status", "description", "teams.id AS team_id")
            ->get();
        foreach ($requests as $key => $request) {
            $requests[$key]['participants'] = TeamParticipants::where('team_id', "=", $request->team_id)->count() + 1;
        }
        return response()->json($requests, 200);
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
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'accept' => 'required|boolean',
        ]);
        $team_request = TeamRequest::findOrFail($id);
        $team = Team::findOrFail($team_request->team_id);
        if ($team->owner_id != auth()->user()->id) {
            return response("Forbidden for you", 404);
        }
        if ($request['accept']) {
            $team_participant = TeamParticipants::create(["team_id" => $team->id, "user_id" => $team_request->user_id]);
            $team_request->delete();
            return response()->json($team_participant, 201);
        } else {
            $team_request->status = 1;
            $team_request->save();
            return response()->json($team_request, 200);
        }
    }
    public function delete($participant_id)
    {
        $participant = TeamParticipants::findOrFail($participant_id);
        $team = Team::findOrFail($participant->team_id);
        if ($team->owner_id != auth()->user()->id) {
            return response("Forbidden for you", 404);
        }
        $participant->delete();
        return response("", 204);
    }
    public function outFormTeam($participant_id)
    {
        $participant = TeamParticipants::findOrFail($participant_id);
        if ($participant->user_id != auth()->user()->id) {
            return response("Forbidden for you", 404);
        }
        $participant->delete();
        return response("", 204);
    }
}
