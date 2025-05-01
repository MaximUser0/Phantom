<?php

namespace App\Http\Controllers;

use App\Models\ForumParticipant;
use App\Models\NewsComment;
use App\Models\TeamParticipants;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(auth()->user(), 200);
    }
    public function commonInfo()
    {
        $id = auth()->user()->id;
        $info = [
            'teams' => TeamParticipants::where("user_id", "=", $id)->count(),
            'comments' => NewsComment::where("user_id", "=", $id)->count(),
            'forums' => ForumParticipant::where("user_id", "=", $id)->count(),
        ];
        return response()->json($info, 200);
    }
    public function delete()
    {
        $user = auth()->user();
        if ($user->image != null) {
            Storage::disk('public')->delete(explode("storage/", $user->image)[1]);
        }
        $user->tokens()->delete();
        $user->delete();
        return response("", 204);
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
