<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Friend;
use App\Models\Subscriber;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(auth()->user(), 200);
    }
    public function show($id)
    {
        $user = User::find($id);
        unset($user->is_admin);
        $isSubscribedForMe = Subscriber::where('user_id', auth()->user()->id)->where('subscriber_id', $id)->count() != 0;
        if ($isSubscribedForMe) {
            $user->relation = 1;
            return response()->json($user, 200);
        }
        $isISubscribedForHim = Subscriber::where('user_id', auth()->user()->id)->where('subscriber_id', $id)->count() != 0;
        if ($isISubscribedForHim) {
            $user->relation = 2;
            return response()->json($user, 200);
        }
        $isFriends = Friend::where('user_one_id', auth()->user()->id)
            ->where('user_two_id', $id)
            ->orWhere('user_one_id', $id)
            ->where('user_two_id', auth()->user()->id)
            ->count() != 0;
        if ($isFriends) {
            $user->relation = 3;
            return response()->json($user, 200);
        }
        $user->relation = 0;
        return response()->json($user, 200);
    }

    public function info()
    {
        $friends = Friend::where("user_one_id", auth()->user()->id)
            ->orWhere("user_two_id", auth()->user()->id)
            ->count();
        $subscribers = Subscriber::where("user_id", auth()->user()->id)->count();
        $chats = Chat::where("user_one_id", auth()->user()->id)
            ->orWhere("user_two_id", auth()->user()->id)
            ->count();
        return response()->json([
            'friends' => $friends,
            'subscribers' => $subscribers,
            'chats' => $chats
        ], 200);
    }
    public function update(Request $request)
    {
        $check = [
            'name' => 'required|regex:/^[а-яА-Яa-zA-Z0-9]+ +[а-яА-Яa-zA-Z0-9]+$/u|max:255',
            'date_of_birth' => '',
            'purpose_of_dating' => '',
            'hobbies' => '',
            'about' => '',
            'email' => 'email|unique:users,email',
            'number_phone' => 'required|regex:/^[+0-9]+$/u|max:15',
            'city' => '',
            'src' => 'image|max:4096',
        ];
        $validated = $this->validate($request, $check);
        if (isset($request->src)) {
            $user = auth()->user();
            $imageName = time() . '.' . $request->src->extension();
            $request->src->storeAs('public/photo', $imageName);
            if ($user->src != null) {
                Storage::disk('public')->delete(explode("storage/", $user->src)[1]);
            }
            $validated['src'] = asset('storage/photo/' . $imageName);
        }
        auth()->user()->update($validated);
        return response()->json(auth()->user(), 200);
    }
    public function updateImage(Request $request)
    {
        $this->validate($request, [
            'image' => 'required|image|max:4096',
        ]);
        $user = auth()->user();
        $imageName = time() . '.' . $request->image->extension();
        $request->image->storeAs('public/photo', $imageName);
        if ($user->image != null) {
            Storage::disk('public')->delete(explode("storage/", $user->image)[1]);
        }
        $user->image = asset('storage/photo/' . $imageName);
        $user->save();
        return response()->json($user, 200);
    }

    public function indexAll()
    {
        return response()->json(User::select('id', 'name', 'src', 'is_blocked')->get(), 200);
    }
    public function block($id)
    {
        $user = User::findOrFail($id);
        $user->is_blocked = !$user->is_blocked;
        $user->save();
        return response()->json($user, 200);
    }
}
