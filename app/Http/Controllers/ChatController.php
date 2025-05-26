<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Team;
use App\Models\TeamParticipants;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function show($id)
    {
        $chat = Chat::findOrFail($id);
        $team = Team::findOrFail($chat->team_id);
        $isParticipant = TeamParticipants::where("team_id", $chat->team_id)->where("user_id", auth()->user()->id)->count() > 0;
        if ($team->owner_id != auth()->user()->id && !auth()->user()->is_admin && !$isParticipant) {
            return response("Forbidden for you", 404);
        }
        return response()->json($chat, 200);
    }
    public function sentMessage($id, Request $request)
    {
        $this->validate($request, [
            'content' => "required"
        ]);
        $chat = Chat::findOrFail($id);
        $team = Team::findOrFail($chat->team_id);
        $is_participant = TeamParticipants::where("team_id", $chat->team_id)->where("user_id", auth()->user()->id)->count() > 0;
        if (!$is_participant && $team->owner_id != auth()->user()->id) {
            return response("Forbidden for you", 404);
        }
        date_default_timezone_set(timezoneId: 'Europe/Astrakhan');
        $array = json_decode($chat->messages);
        $new_message = [
            'content' => $request->content,
            'name' => auth()->user()->name,
            'image' => auth()->user()->image,
            'id' => auth()->user()->id
        ];
        $array[] = $new_message;
        $chat->messages = json_encode($array);
        $chat->save();
        return response()->json($new_message, 201);
    }

}
