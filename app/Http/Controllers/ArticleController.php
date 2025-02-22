<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::all();
        foreach ($articles as $one) {
            $one->comment_counter = ArticleComment::where('article_id', $one->id)->count();
        }
        return response()->json($articles, 200);
    }
    public function show($id)
    {
        $article = Article::select("title", "text", "src AS image", "created_at AS date", "description")->findOrFail($id);
        $comments = ArticleComment::where('article_id', $id)
            ->join("users", "users.id", "=", "article_comments.user_id")
            ->select('user_id', "article_comments.id AS id", "article_comments.created_at AS date", "users.src AS src", 'name', 'text')
            ->get();
        $article->comment_counter = count($comments);
        $article->comments = $comments;
        return response()->json($article, 200);
    }
    public function create(Request $request)
    {
        $check = [
            'title' => 'required|max:255',
            'description' => 'required',
            'text' => 'required',
            'image' => 'image|max:4096',
        ];
        $article = $this->validate($request, $check);
        $imageName = time() . '.' . $request->image->extension();
        $request->image->storeAs('public/article', $imageName);
        $article['src'] = asset('storage/article/' . $imageName);
        $article['owner_id'] = auth()->user()->id;
        $article = Article::create($article);
        return response()->json($article, 200);
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
        $article = Article::findOrFail($id);
        if (isset($validated["image"])) {
            if ($article->src != null) {
                Storage::disk('public')->delete(explode("storage/", $article->src)[1]);
            }
            $imageName = time() . '.' . $request->image->extension();
            $request->image->storeAs('public/article', $imageName);
            $validated['src'] = asset('storage/article/' . $imageName);
        }
        $article->update($validated);
        return response()->json($article, 200);
    }
    public function delete($id)
    {
        $article = Article::findOrFail($id);
        if ($article->src != null) {
            Storage::disk('public')->delete(explode("storage/", $article->src)[1]);
        }
        $article->delete();
        return response()->json("", 204);
    }
    public function addComment(Request $request, $id)
    {
        $this->validate($request, [
            "text" => "required"
        ]);
        $comment = [
            'text' => $request->text,
            'article_id' => $id,
            'user_id' => auth()->user()->id,
        ];
        $comment = ArticleComment::create($comment);
        $comment->user_id = auth()->user()->id;
        $comment->src = auth()->user()->src;
        $comment->date = $comment->created_at;
        return response()->json($comment, 200);
    }
    public function deleteComment($id)
    {
        $comment = ArticleComment::findOrFail($id);
        $comment->delete();
        return response()->json("", 204);
    }
}
