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
        $forums = Forum::join("users", "users.id", "=", "forums.owner_id")
            ->select("forums.id", "title", "forums.description", "messages", "images", "forums.created_at", "image", "name")
            ->paginate(5, 1);
        foreach ($forums as $key => $forum) {
            $forums[$key]->participants_count = ForumParticipant::where('forum_id', $forum['id'])->count();
        }
        return response()->json($forums, 200);
    }
    public function show($id)
    {
        $forum = Forum::where("forums.id", "=", $id)
            ->join("users", "users.id", "=", "forums.owner_id")
            ->select("title", "image", "images", "forums.description", "messages", "forums.created_at", "name")
            ->first();
        return response()->json($forum, 200);
    }
    public function create(Request $request)
    {
        $check = [
            'title' => 'required|max:255',
            'description' => 'required',
            'images.*' => 'image|max:4096',
        ];
        $forum = $this->validate($request, $check);
        $images = "";
        foreach ($request->images as $key => $image) {
            $imageName = time() . $key . '.' . $image->extension();
            $image->storeAs('public/forum/images', $imageName);
            $images .= ($key == 0 ? "" : "&") . asset('storage/forum/images/' . $imageName);
        }
        $forum['images'] = $images;
        $forum['owner_id'] = auth()->user()->id;
        $forum['messages'] = '[]';
        $forum = Forum::create($forum);
        return response()->json($forum, 200);
    }
    public function sentMessage($id, Request $request)
    {
        $this->validate($request, [
            'content' => "required"
        ]);
        $forum = Forum::find($id);
        date_default_timezone_set(timezoneId: 'Europe/Astrakhan');
        $array = json_decode($forum->messages);
        $new_message = [
            'created_at' => date('d.m.y'),
            'content' => $request->content,
            //'name' => auth()->user()->name,
            //'image' => auth()->user()->image,
            'id' => auth()->user()->id
        ];
        $array[] = $new_message;
        $forum->messages = json_encode($array);
        $forum->save();
        $isParticipant = ForumParticipant::where('forum_id', $id)->where('user_id', auth()->user()->id)->count() > 0;
        if (!$isParticipant) {
            ForumParticipant::create(["forum_id" => $id, "user_id" => auth()->user()->id]);
        }
        return response()->json($new_message, 201);
    }
    public function delete($id)
    {
        $forum = Forum::findOrFail($id);
        if ($forum->image != null) {
            Storage::disk('public')->delete(explode("storage/", $forum->image)[1]);
        }
        if ($forum->images != null) {
            foreach (explode('&', $forum->images) as $image) {
                Storage::disk('public')->delete(explode("storage/", $image)[1]);
            }
        }
        $forum->delete();
        return response()->json("", 204);
    }
}
