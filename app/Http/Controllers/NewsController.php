<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\NewsComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    public function index()
    {
        $news = News::all();
        foreach ($news as $one) {
            $one->comment_counter = NewsComment::where('news_id', $one->id)->count();
        }
        return response()->json($news, 200);
    }
    public function show($id)
    {
        $news = News::select("title", "text", "src AS image", "description", "created_at AS date")->findOrFail($id);
        $comments = NewsComment::where('news_id', $id)
            ->join("users", "users.id", "=", "news_comments.user_id")
            ->select('user_id', "news_comments.id AS id", "news_comments.created_at AS date", "users.src AS src", 'name', 'text')
            ->get();
        $news->comment_counter = count($comments);
        $news->comments = $comments;
        return response()->json($news, 200);
    }
    public function create(Request $request)
    {
        $check = [
            'title' => 'required|max:255',
            'description' => 'required',
            'text' => 'required',
            'image' => 'image|max:4096',
        ];
        $news = $this->validate($request, $check);
        $imageName = time() . '.' . $request->image->extension();
        $request->image->storeAs('public/news', $imageName);
        $news['src'] = asset('storage/news/' . $imageName);
        $news['owner_id'] = auth()->user()->id;
        $news = News::create($news);
        return response()->json($news, 200);
    }
    public function update(Request $request, $id)
    {
        $check = [
            'title' => 'required|max:255',
            'description' => 'required',
            'text' => 'required',
            'image' => 'image|max:4096',
        ];
        $validated = $this->validate($request, $check);
        $news = News::findOrFail($id);
        if (isset($validated["image"])) {
            if ($news->src != null) {
                Storage::disk('public')->delete(explode("storage/", $news->src)[1]);
            }
            $imageName = time() . '.' . $request->image->extension();
            $request->image->storeAs('public/news', $imageName);
            $validated['src'] = asset('storage/news/' . $imageName);
        }
        $news->update($validated);
        return response()->json($news, 200);
    }
    public function delete($id)
    {
        $news = News::findOrFail($id);
        if ($news->src != null) {
            Storage::disk('public')->delete(explode("storage/", $news->src)[1]);
        }
        $news->delete();
        return response()->json("", 204);
    }

    public function addComment(Request $request, $id)
    {
        $this->validate($request, [
            "text" => "required"
        ]);
        $comment = [
            'text' => $request->text,
            'news_id' => $id,
            'user_id' => auth()->user()->id,
        ];
        $comment = NewsComment::create($comment);
        $comment->user_id = auth()->user()->id;
        $comment->src = auth()->user()->src;
        $comment->date = $comment->created_at;
        return response()->json($comment, 200);
    }
    public function deleteComment($id)
    {
        $comment = NewsComment::findOrFail($id);
        $comment->delete();
        return response()->json("", 204);
    }
}
