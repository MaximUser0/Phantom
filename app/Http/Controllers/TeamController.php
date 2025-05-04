<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Team;
use App\Models\TeamParticipants;
use App\Models\TeamRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TeamController extends Controller
{

    public function index()
    {
        $teams = Team::all();
        foreach ($teams as $team) {
            $team['participants'] = TeamParticipants::where('team_id', "=", $team->id)->count() + 1;
            $team['is_participant'] = TeamParticipants::where('team_id', "=", $team->id)
                ->where('user_id', "=", auth()->user()->id)
                ->count() > 0;
            $team['is_owner'] = $team->owner_id == auth()->user()->id;
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
    public function indexMy()
    {
        $teams_owner = Team::where("owner_id", auth()->user()->id)->get();
        $teams_participant = TeamParticipants::where("user_id", auth()->user()->id)
            ->join("teams", "teams.id", "=", "team_participants.team_id")
            ->select("teams.id AS id", "title", "image", "description", "team_participants.id AS participant_id", "owner_id")
            ->get();
        $teams = $teams_owner->merge($teams_participant);
        foreach ($teams as $team) {
            $team['participants'] = TeamParticipants::where('team_id', "=", $team->team_id)->count() + 1;
            $team['is_owner'] = $team->owner_id == auth()->user()->id;
        }
        return response()->json($teams, 200);
    }

    public function show(string $id)
    {
        $team = Team::where("teams.id", $id)
            ->join("users", "users.id", "=", "teams.owner_id")
            ->select("title", "teams.description", "teams.image AS image", "users.image AS owner_image", "name", "genres", "teams.owner_id AS owner_id")
            ->first();
        $team["participants"] = TeamParticipants::where("team_id", $id)
            ->join("users", "users.id", "=", "team_participants.user_id")
            ->select("image", "name", "team_participants.id AS id")->get();
        $team["is_owner"] = $team->owner_id == auth()->user()->id;
        $team["chat_id"] = Chat::where("team_id", $id)->first()->id;
        return response()->json($team, 200);
    }
    public function store(Request $request)
    {
        $validated = $this->validate($request, [
            'title' => 'required',
            'description' => 'required',
            'image' => 'required|image|max:4096',
            'genres' => 'required',
        ]);
        $validated['owner_id'] = auth()->user()->id;
        $imageName = time() . '.' . $request->image->extension();
        $request->image->storeAs('public/team', $imageName);
        $validated['image'] = asset('storage/team/' . $imageName);
        $team = Team::create($validated);
        Chat::create(["team_id" => $team->id, "messages" => "[]"]);
        return response()->json($team, 201);
    }
    public function updateImage(Request $request)
    {
        $this->validate($request, [
            'image' => 'required|image|max:4096',
            'team_id' => 'required|exists:teams,id'
        ]);
        $team = Team::findOrFail($request->team_id);
        if ($team->owner_id != auth()->user()->id) {
            return response("Forbidden for you", 404);
        }
        $imageName = time() . '.' . $request->image->extension();
        $request->image->storeAs('public/team', $imageName);
        if ($team->image != null) {
            Storage::disk('public')->delete(explode("storage/", $team->image)[1]);
        }
        $team->image = asset('storage/team/' . $imageName);
        $team->save();
        return response()->json($team->image, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $this->validate($request, [
            'title' => 'required',
            'description' => 'required',
            'image' => 'required|image|max:4096',
            'genres' => 'required',
        ]);
        $team = Team::findOrFail($id);
        if ($team->owner_id != auth()->user()->id) {
            return response("Forbidden for you", 404);
        }
        if ($team->image != null) {
            Storage::disk('public')->delete(explode("storage/", $team->image)[1]);
        }
        $imageName = time() . '.' . $request->image->extension();
        $request->image->storeAs('public/team', $imageName);
        $validated['image'] = asset('storage/team/' . $imageName);

        $team->update($validated);
        return response()->json($team, 201);
    }

    public function delete($id)
    {
        $team = Team::findOrFail($id);
        if ($team->owner_id != auth()->user()->id) {
            return response("Forbidden for you", 404);
        }
        if ($team->image != null) {
            Storage::disk('public')->delete(explode("storage/", $team->image)[1]);
        }
        $team->delete();
        return response("", 204);
    }
}
