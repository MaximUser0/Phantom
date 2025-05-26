<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $forums = Game::select("id", "title", "description", "images", "created_at", "image", "genres")
            ->paginate(5);
        return response()->json($forums, 200);
    }

    public function show($id)
    {
        $game = Game::findOrFail($id);
        return response()->json($game, 200);
    }

    public function create(Request $request)
    {
        $check = [
            'title' => 'required|max:255',
            'description' => 'required',
            'genres' => 'required',
            'image' => 'required|image|max:4096',
            'images.*' => 'image|max:4096',
        ];
        $game = $this->validate($request, $check);
        $imageName = time() . '.' . $request->image->extension();
        $request->image->storeAs('public/game', $imageName);
        $game['image'] = asset('storage/game/' . $imageName);
        $images = "";
        foreach ($request->images as $key => $image) {
            $imageName = time() . $key . '.' . $image->extension();
            $image->storeAs('public/game/images', $imageName);
            $images .= ($key == 0 ? "" : "&") . asset('storage/game/images/' . $imageName);
        }
        $game['images'] = $images;
        $game = Game::create($game);
        return response()->json($game, 200);
    }
    public function update(Request $request, $id)
    {
        $check = [
            'title' => 'required|max:255',
            'description' => 'required',
            'genres' => 'required',
            'image' => 'image|max:4096',
            'images.*' => 'image|max:4096',
        ];
        $validated = $this->validate($request, $check);
        $game = Game::findOrFail($id);
        if (isset($validated["image"])) {
            if ($game->image != null) {
                Storage::disk('public')->delete(explode("storage/", $game->image)[1]);
            }
            $imageName = time() . '.' . $request->image->extension();
            $request->image->storeAs('public/game', $imageName);
            $validated['image'] = asset('storage/game/' . $imageName);
        }
        if (isset($validated["images"])) {
            $images = "";
            if ($game->images != null) {
                foreach (explode('&', $game->images) as $image) {
                    Storage::disk('public')->delete(explode("storage/", $image)[1]);
                }
            }
            foreach ($request->images as $key => $image) {
                $imageName = time() . $key . '.' . $image->extension();
                $image->storeAs('public/game/images', $imageName);
                $images .= ($key == 0 ? "" : "&") . asset('storage/game/images/' . $imageName);
            }
            $validated['images'] = $images;
        }
        $game->update($validated);
        return response()->json($game, 200);
    }
    public function delete($id)
    {
        $game = Game::findOrFail($id);
        if ($game->image != null) {
            Storage::disk('public')->delete(explode("storage/", $game->image)[1]);
        }
        if ($game->images != null) {
            foreach (explode('&', $game->images) as $image) {
                Storage::disk('public')->delete(explode("storage/", $image)[1]);
            }
        }
        $game->delete();
        return response()->json("", 204);
    }
}
