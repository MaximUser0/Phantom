<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Friend;
use App\Models\News;
use App\Models\Subscriber;
use App\Models\User;
use DB;
use Illuminate\Http\Request;

class FriendController extends Controller
{
    public function index()
    {
        $user_id = auth()->user()->id;
        $friends = Friend::where("user_one_id", $user_id)
            ->orWhere("user_two_id", $user_id)
            ->get();
        foreach ($friends as $key => $friend) {
            $friend_id = $friend->user_one_id == $user_id ? $friend->user_two_id : $friend->user_one_id;
            $friend_info = User::find($friend_id);
            $friends[$key]->src = $friend_info->src;
            $friends[$key]->name = $friend_info->name;
            $friends[$key]->user_id = $friend_info->id;
        }
        return response()->json($friends, 200);
    }

    public function indexOfAnother($id)
    {
        $friends = Friend::where("user_one_id", $id)
            ->orWhere("user_two_id", $id)
            ->get();
        foreach ($friends as $key => $friend) {
            $friend_id = $friend->user_one_id == $id ? $friend->user_two_id : $friend->user_one_id;
            $friend_info = User::find($friend_id);
            $friends[$key]->src = $friend_info->src;
            $friends[$key]->name = $friend_info->name;
            $friends[$key]->user_id = $friend_info->id;
        }
        return response()->json($friends, 200);
    }

    public function create(Request $request)
    {
        $this->validate($request, ['user_id' => "required|exists:users,id"]);
        $subscriber = Subscriber::where("user_id", auth()->user()->id)
            ->where("subscriber_id", $request->user_id)
            ->first();
        if (!$subscriber) {
            return response('', 404);
        }
        $friend = Friend::create(['user_one_id' => $subscriber->user_id, 'user_two_id' => $subscriber->subscriber_id]);
        $subscriber->delete();
        return response()->json($friend, 200);
    }

    public function delete($user_id)
    {
        $friend = Friend::where("user_one_id", auth()->user()->id)
            ->where("user_two_id", $user_id)
            ->orWhere("user_two_id", auth()->user()->id)
            ->where("user_one_id", $user_id)
            ->first();
        $friend->delete();
        return response('', 204);
    }

    public function find(Request $request)
    {
        $this->validate($request, ['text' => "required"]);
        $users = User::where('name', 'LIKE', '%' . $request->text . "%")
            ->select('name', 'src', 'id', DB::raw('"user" AS type'))
            ->get();
        $news = News::where('title', 'LIKE', '%' . $request->text . "%")
            ->select('title', 'src', 'id', DB::raw('"news" AS type'))
            ->get();
        $articles = Article::where('title', 'LIKE', '%' . $request->text . "%")
            ->select('title', 'src', 'id', DB::raw('"articles" AS type'))
            ->get();
        $data = $users->merge($news);
        $data = $data->merge($articles);
        return response()->json($data, 200);
    }
}
