<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\NewsComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    public function index()
    {
        $news = News::all();
        return response()->json($news, 200);
    }
    public function indexPaginate()
    {
        $news = News::paginate(5);
        return response()->json($news, 200);
    }
    public function show($id)
    {
        $news = News::findOrFail($id);
        $comments = NewsComment::where('news_id', $id)
            ->join("users", "users.id", "=", "news_comments.user_id")
            ->select("users.image", 'name', 'content')
            ->get();
        $news->comments = $comments;
        return response()->json($news, 200);
    }
    public function create(Request $request)
    {
        $check = [
            'title' => 'required|max:255',
            'description' => 'required',
            'content' => 'required',
            'image' => 'required|image|max:4096',
        ];
        $news = $this->validate($request, $check);
        $imageName = time() . '.' . $request->image->extension();
        $request->image->storeAs('public/news', $imageName);
        $news['image'] = asset('storage/news/' . $imageName);
        $news = News::create($news);
        return response()->json($news, 200);
    }
    public function update(Request $request, $id)
    {
        $check = [
            'title' => 'required|max:255',
            'description' => 'required',
            'content' => 'required',
            'image' => 'image|max:4096',
        ];
        $validated = $this->validate($request, $check);
        $news = News::findOrFail($id);
        if (isset($validated["image"])) {
            if ($news->image != null) {
                Storage::disk('public')->delete(explode("storage/", $news->image)[1]);
            }
            $imageName = time() . '.' . $request->image->extension();
            $request->image->storeAs('public/news', $imageName);
            $validated['image'] = asset('storage/news/' . $imageName);
        }
        $news->update($validated);
        return response()->json($news, 200);
    }
    public function delete($id)
    {
        $news = News::findOrFail($id);
        if ($news->image != null) {
            if (count(explode("storage/", $news->image)) == 2) {
                Storage::disk('public')->delete(explode("storage/", $news->image)[1]);
            }
        }
        $news->delete();
        return response()->json("", 204);
    }

    public function addComment(Request $request, $id)
    {
        $this->validate($request, [
            "content" => "required"
        ]);
        $comment = [
            'content' => $request->content,
            'news_id' => $id,
            'user_id' => auth()->user()->id,
        ];
        $comment = NewsComment::create($comment);
        $comment->image = auth()->user()->image;
        $comment->name = auth()->user()->name;
        return response()->json($comment, 200);
    }

    public function comments()
    {
        $comments = NewsComment::join("users", "users.id", "=", "news_comments.user_id")
            ->join("news", "news.id", "=", "news_comments.news_id")
            ->select('news_comments.created_at', 'name', 'news_comments.content', 'news_comments.id', 'news.id AS link_id', 'title', DB::raw("'news' AS type"))
            ->paginate(5);
        return response()->json($comments, 200);
    }
    public function deleteComment($id)
    {
        $comment = NewsComment::findOrFail($id);
        $comment->delete();
        return response()->json("", 204);
    }
}
