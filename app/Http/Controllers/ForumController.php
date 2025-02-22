<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use App\Models\ForumParticipant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ForumController extends Controller
{
    public function index()
    {
        $forums = Forum::select('forums.id AS id', 'src', 'title', 'description AS about', 'messages', 'created_at')->get();
        foreach ($forums as $key => $forum) {
            $forums[$key]->participants_count = ForumParticipant::where('forum_id', $forum['id'])->count();
        }
        return response()->json($forums, 200);
    }
    public function myForums()
    {
        $forums = ForumParticipant::where("user_id", auth()->user()->id)
            ->join('forums', 'forums.id', '=', 'forum_participants.forum_id')
            ->select('forums.id AS id', 'forum_participants.id AS participant_id', 'src', 'title AS name', 'description', 'messages')
            ->get();
        return response()->json($forums, 200);
    }
    public function forumsOfAnother($id)
    {
        $forums = ForumParticipant::where("user_id", $id)
            ->join('forums', 'forums.id', '=', 'forum_participants.forum_id')
            ->select('forums.id AS id', 'src', 'title AS name', 'description', 'messages')
            ->get();
        return response()->json($forums, 200);
    }
    public function show($id)
    {
        $forum = Forum::find($id);
        $messages = json_decode($forum->messages, true);

        if (!$messages[count($messages) - 1]['read']) {
            foreach ($messages as $key => $message) {
                if ($messages[$key]['owner'] != auth()->user()->id) {
                    $messages[$key]['read'] = true;
                }
            }
        }
        $forum->messages = json_encode($messages);
        $forum->save();
        return response()->json($forum, 200);
    }
    public function joinTo(Request $request)
    {
        $this->validate($request, [
            'forum_id' => "required|exists:forums,id",
        ]);
        $alreadyExist = ForumParticipant::where('forum_id', $request->forum_id)->where('user_id', auth()->user()->id)->count() != 0;
        if ($alreadyExist) {
            return response()->json('', 201);
        }
        $forum = ForumParticipant::create(['forum_id' => $request->forum_id, 'user_id' => auth()->user()->id]);
        return response()->json($forum, 201);
    }
    public function outFrom($id)
    {
        $forum = ForumParticipant::where('forum_id', $id)->where('user_id', auth()->user()->id)->first();
        $forum->delete();
        return response()->json("", 204);
    }
    public function create(Request $request)
    {
        $check = [
            'title' => 'required|max:255',
            'description' => 'required',
            'text' => 'required',
            'image' => 'image|max:4096',
        ];
        $forum = $this->validate($request, $check);
        $imageName = time() . '.' . $request->image->extension();
        $request->image->storeAs('public/forum', $imageName);
        $forum['src'] = asset('storage/forum/' . $imageName);
        $forum['owner_id'] = auth()->user()->id;
        $forum['messages'] = '[]';
        $forum = Forum::create($forum);
        return response()->json($forum, 200);
    }
    public function update(Request $request)
    {
        $this->validate($request, [
            'index' => "required|exists:forums,id",
            'message' => "required"
        ]);
        $alreadyExist = ForumParticipant::where('forum_id', "=", $request->index)->where('user_id', "=", auth()->user()->id)->first();
        if (!$alreadyExist) {
            return response()->json('', 404);
        }
        $forum = Forum::find($request->index);
        date_default_timezone_set(timezoneId: 'Europe/Astrakhan');
        $array = json_decode($forum->messages);
        $array[] = [
            'date' => date('d-m-y h:i'),
            'text' => $request->message,
            'owner' => auth()->user()->id,
            'read' => false
        ];
        $forum->messages = json_encode($array);
        $forum->save();
        return response()->json($forum, 201);
    }
    public function delete($id)
    {
        $forum = Forum::findOrFail($id);
        if ($forum->src != null) {
            Storage::disk('public')->delete(explode("storage/", $forum->src)[1]);
        }
        $forum->delete();
        return response()->json("", 204);
    }
}
