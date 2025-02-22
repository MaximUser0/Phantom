<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Models\Subscriber;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Response;

class SubscriberController extends Controller
{
    public function index()
    {
        $subscribers = Subscriber::where("user_id", auth()->user()->id)
            ->join('users', 'users.id', '=', 'subscribers.subscriber_id')
            ->select('src', 'name', 'users.id AS user_id', 'subscribers.id AS id')
            ->get();
        return response()->json($subscribers, 200);
    }
    public function indexMy()
    {
        $subscribers = Subscriber::where("subscriber_id", auth()->user()->id)
            ->join('users', 'users.id', '=', 'subscribers.user_id')
            ->select('src', 'name', 'users.id AS user_id', 'subscribers.id AS id')
            ->get();
        return response()->json($subscribers, 200);
    }

    public function subscribersOfAnother($user_id)
    {
        $subscribers = Subscriber::where("user_id", $user_id)
            ->join('users', 'users.id', '=', 'subscribers.user_id')
            ->select('src', 'name', 'users.id AS user_id')
            ->get();
        return response()->json($subscribers, 200);
    }

    public function subscriptionsOfAnother($user_id)
    {
        $subscribers = Subscriber::where("subscriber_id", $user_id)
            ->join('users', 'users.id', '=', 'subscribers.user_id')
            ->select('src', 'name', 'users.id AS user_id')
            ->get();
        return response()->json($subscribers, 200);
    }

    public function delete($user_id)
    {
        $friend = Subscriber::where("subscriber_id", auth()->user()->id)
            ->where("user_id", $user_id)
            ->first();
        $friend->delete();
        return response('', 204);
    }

    public function subscribe($user_id)
    {
        $user = User::findOrFail($user_id);
        $alreadyExist = Subscriber::where('user_id', '=', $user_id)
            ->where('subscriber_id', '=', auth()->user()->id)
            ->orWhere('subscriber_id', '=', $user_id)
            ->where('user_id', '=', auth()->user()->id)
            ->count();
        if ($alreadyExist > 0)
            return response("Already exist", 403);
        $alreadyExist = Friend::where('user_one_id', '=', $user_id)
            ->where('user_two_id', '=', auth()->user()->id)
            ->orWhere('user_two_id', '=', $user_id)
            ->where('user_one_id', '=', auth()->user()->id)
            ->count();
        if ($alreadyExist > 0)
            return response("Already exist", 403);
        $subscriber = Subscriber::create(['user_id' => $user_id, 'subscriber_id' => auth()->user()->id]);
        return response()->json($subscriber, 200);
    }
}
