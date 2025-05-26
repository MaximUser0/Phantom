<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TeamParticipantController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('signup', [AuthController::class, 'create']);
Route::post('login', [AuthController::class, 'login']);

/*Route::get('news', [NewsController::class, 'index']);
Route::get('news/{id}', [NewsController::class, 'show']);
Route::get('article', [ArticleController::class, 'index']);
Route::get('article/{id}', [ArticleController::class, 'show']);
Route::get('forum', [ForumController::class, 'index']);*/

Route::middleware('auth:sanctum')->group(
    function () {
        Route::get('logout', [AuthController::class, 'logout']);
        Route::get('user', [UserController::class, 'index']);
        Route::get('user/info', [UserController::class, 'commonInfo']);
        Route::delete('user', [UserController::class, 'delete']);
        Route::post('user/image', [UserController::class, 'updateImage']);
        Route::post('user/by-array', [UserController::class, 'indexByArray']);
        Route::post('survey', [AuthController::class, 'survey']);

        Route::get('team', [TeamController::class, 'index']);
        Route::get('team/my', [TeamController::class, 'indexMy']);
        Route::get('team/{id}', [TeamController::class, 'show']);
        Route::post('team', [TeamController::class, 'store']);
        Route::post('team/image', [TeamController::class, 'updateImage']);
        Route::post('team/{id}', [TeamController::class, 'update']);
        Route::delete('team/participant/{participant_id}', [TeamParticipantController::class, 'delete']);
        Route::delete('team/out/{participant_id}', [TeamParticipantController::class, 'outFormTeam']);
        Route::delete('team/{id}', [TeamController::class, 'delete']);
        Route::get('request', [TeamParticipantController::class, 'indexRequests']);
        Route::get('request/my', [TeamParticipantController::class, 'indexMyRequests']);
        Route::post('request/accept/{id}', [TeamParticipantController::class, 'update']);
        Route::post('request/{team_id}', [TeamParticipantController::class, 'request']);

        Route::get('news', [NewsController::class, 'index']);
        Route::get('news/paginate', [NewsController::class, 'indexPaginate']);
        Route::get('news/{id}', [NewsController::class, 'show']);
        Route::post('news/{id}/comment', [NewsController::class, 'addComment']);

        Route::get('forum', [ForumController::class, 'index']);
        Route::get('forum/{id}', [ForumController::class, 'show']);
        Route::post('forum/{id}/message', [ForumController::class, 'sentMessage']);
        Route::post('forum', [ForumController::class, 'create']);

        Route::get('game', [GameController::class, 'index']);
        Route::get('game/{id}', [GameController::class, 'show']);

        Route::get('chat/{id}', [ChatController::class, 'show']);
        Route::post('chat/{id}', [ChatController::class, 'sentMessage']);

        Route::middleware('admin')->group(
            function () {
                Route::post('news', [NewsController::class, 'create']);
                Route::post('news/{id}', [NewsController::class, 'update']);
                Route::delete('news/{id}', [NewsController::class, 'delete']);
                Route::get('comment', [NewsController::class, 'comments']);
                Route::delete('comment/{id}', [NewsController::class, 'deleteComment']);

                Route::post('game', [GameController::class, 'create']);
                Route::post('game/{id}', [GameController::class, 'update']);
                Route::delete('game/{id}', [GameController::class, 'delete']);

                Route::get('users', [UserController::class, 'indexAll']);
                Route::get('user/block/{id}', [UserController::class, 'block']);

                Route::get('teams', [TeamController::class, 'indexPaginate']);

                Route::delete('forum/{id}', [ForumController::class, 'delete']);
            }
        );
    }
);
