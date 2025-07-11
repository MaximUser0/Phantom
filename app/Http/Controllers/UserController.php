<?php

namespace App\Http\Controllers;

use App\Models\ForumParticipant;
use App\Models\NewsComment;
use App\Models\TeamParticipants;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
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
        $users = User::where('is_admin', 0)->select('id', 'name', 'image', 'is_blocked', 'date_of_birth', 'gender')->paginate(5);
        foreach ($users as $user) {
            $user['teams'] = TeamParticipants::where("user_id", "=", $user->id)->count();
            $user['comments'] = NewsComment::where("user_id", "=", $user->id)->count();
            $user['forums'] = ForumParticipant::where("user_id", "=", $user->id)->count();
        }
        return response()->json($users, 200);
    }
    public function indexByArray(Request $request)
    {
        $users = new Collection();
        $this->validate($request, [
            'users' => 'required|json',
        ]);
        $list = json_decode($request['users'], true);
        foreach ($list as $item) {
            $users = $users->merge(
                User::where("id", $item)
                    ->select("image", "name", "id")
                    ->orderBy('id')
                    ->get()
            );
        }
        return response()->json($users, 200);
    }
    public function block($id)
    {
        $user = User::findOrFail($id);
        $user->is_blocked = !$user->is_blocked;
        $user->save();
        return response()->json($user, 200);
    }
}
