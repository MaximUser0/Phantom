<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index()
    {
        $chats = Chat::where("user_one_id", "=", auth()->user()->id)
            ->join('users', 'users.id', '=', 'chats.user_two_id')
            ->select('chats.id AS id', 'src', 'name', 'messages')
            ->get();
        $chats2 = Chat::where("user_two_id", "=", auth()->user()->id)
            ->join('users', 'users.id', '=', 'chats.user_one_id')
            ->select('chats.id AS id', 'src', 'name', 'messages')
            ->get();
        return response()->json($chats->merge($chats2), 200);
    }
    public function show($id)
    {
        $chat = Chat::where("user_one_id", auth()->user()->id)
            ->where("id", $id)
            ->orWhere("user_two_id", auth()->user()->id)
            ->where("id", $id)
            ->first();
        $messages = json_decode($chat->messages, true);
        foreach ($messages as $key => $message) {
            if ($messages[$key]['owner'] != auth()->user()->id) {
                $messages[$key]['read'] = true;
            }
        }
        $chat->messages = json_encode($messages);
        $chat->save();
        return response()->json($messages, 200);
    }
    public function create(Request $request)
    {
        $validated = $this->validate($request, ['user_id' => "required|exists:users,id"]);
        $alreadyExist = Chat::where("user_one_id", auth()->user()->id)
            ->where("user_two_id", $request->user_id)
            ->orWhere("user_two_id", auth()->user()->id)
            ->where("user_one_id", $request->user_id)
            ->get();
        if (count($alreadyExist) != 0) {
            return response()->json($alreadyExist, 200);
        }
        $chat = Chat::create(['user_one_id' => auth()->user()->id, 'user_two_id' => $request->user_id, 'messages' => '[]']);
        return response()->json($chat, 200);
    }
    public function update(Request $request)
    {
        $this->validate($request, [
            'index' => "required|exists:chats,id",
            'message' => "required"
        ]);
        $chat = Chat::where("user_one_id", auth()->user()->id)
            ->where("id", $request->index)
            ->orWhere("user_two_id", auth()->user()->id)
            ->where("id", $request->index)
            ->first();
        date_default_timezone_set(timezoneId: 'Europe/Astrakhan');
        if ($chat->messages == null) {
            $chat->messages = json_encode([
                [
                    'date' => date('d-m-y h:i'),
                    'text' => $request->message,
                    'owner' => auth()->user()->id,
                    'read' => false
                ]
            ]);
            $chat->save();
            return response()->json($chat, 201);
        }
        $array = json_decode($chat->messages);
        $array[] = [
            'date' => date('d-m-y h:i'),
            'text' => $request->message,
            'owner' => auth()->user()->id,
            'read' => false
        ];
        $chat->messages = json_encode($array);
        $chat->save();
        return response()->json($chat, 201);
    }

    public function sentFile(Request $request)
    {
        $this->validate($request, [
            'index' => "required|exists:chats,id",
            'file' => "required|image|max:4096"
        ]);
        $chat = Chat::where("user_one_id", auth()->user()->id)
            ->where("id", $request->index)
            ->orWhere("user_two_id", auth()->user()->id)
            ->where("id", $request->index)
            ->first();
        date_default_timezone_set(timezoneId: 'Europe/Astrakhan');
        $imageName = time() . '.' . $request->file->extension();
        $request->file->storeAs('public/chat_files', $imageName);
        if ($chat->messages == null) {
            $chat->messages = json_encode([
                [
                    'date' => date('d-m-y h:i'),
                    'text' => null,
                    'file' => asset('storage/chat_files/' . $imageName),
                    'owner' => auth()->user()->id,
                    'read' => false
                ]
            ]);
            $chat->save();
            return response()->json($chat, 201);
        }
        $array = json_decode($chat->messages);
        $array[] = [
            'date' => date('d-m-y h:i'),
            'text' => null,
            'file' => asset('storage/chat_files/' . $imageName),
            'owner' => auth()->user()->id,
            'read' => false
        ];
        $chat->messages = json_encode($array);
        $chat->save();
        return response()->json($chat, 201);
    }
}
