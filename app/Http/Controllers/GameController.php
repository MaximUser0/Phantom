<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;

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

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
