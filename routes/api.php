<?php

use App\Http\Controllers\ArticleCommentController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\FundController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
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

Route::get('news', [NewsController::class, 'index']);
Route::get('news/{id}', [NewsController::class, 'show']);
Route::get('article', [ArticleController::class, 'index']);
Route::get('article/{id}', [ArticleController::class, 'show']);
Route::get('forum', [ForumController::class, 'index']);
Route::get('fund', [FundController::class, 'index']);
Route::get('fund/{id}', [FundController::class, 'show']);
Route::get('find', [FriendController::class, 'find']);

Route::middleware('auth:sanctum')->group(
    function () {
        Route::get('logout', [AuthController::class, 'logout']);
        Route::get('user', [UserController::class, 'index']);
        Route::get('user/info', [UserController::class, 'info']);
        Route::get('user/{id}', [UserController::class, 'show']);
        Route::post('user', [UserController::class, 'update']);

        Route::post('article/{id}/comment', [ArticleController::class, 'addComment']);
        Route::post('news/{id}/comment', [NewsController::class, 'addComment']);

        Route::get('friend', [FriendController::class, 'index']);
        Route::get('friend/{id}', [FriendController::class, 'indexOfAnother']);
        Route::post('friend', [FriendController::class, 'create']);
        Route::delete('friend/{user_id}', [FriendController::class, 'delete']);
        Route::get('subscriber', [SubscriberController::class, 'index']);
        Route::get('subscriptions', [SubscriberController::class, 'indexMy']);
        Route::get('subscriber/{user_id}', [SubscriberController::class, 'subscribersOfAnother']);
        Route::get('subscriptions/{user_id}', [SubscriberController::class, 'subscriptionsOfAnother']);
        Route::delete('subscriber/{user_id}', [SubscriberController::class, 'delete']);
        Route::get('subscribe/{user_id}', [SubscriberController::class, 'subscribe']);


        Route::get('chat', [ChatController::class, 'index']);
        Route::get('chat/{id}', [ChatController::class, 'show']);
        Route::post('chat', [ChatController::class, 'create']);
        Route::post('chat/file', [ChatController::class, 'sentFile']);
        Route::patch('chat', [ChatController::class, 'update']);

        Route::get('forum/my', [ForumController::class, 'myForums']);
        Route::get('forum/ofAnother/{id}', [ForumController::class, 'forumsOfAnother']);
        Route::get('forum/{id}', [ForumController::class, 'show']);
        Route::post('forum/join', [ForumController::class, 'joinTo']);
        Route::delete('forum/out/{id}', [ForumController::class, 'outFrom']);
        Route::patch('forum', [ForumController::class, 'update']);

        Route::get('fundMy', [FundController::class, 'showMy']);
        Route::delete('fundMy', [FundController::class, 'deleteMy']);
        Route::post('fund', [FundController::class, 'addMy']);

        Route::middleware('admin')->group(
            function () {
                Route::post('news', [NewsController::class, 'create']);
                Route::post('news/{id}', [NewsController::class, 'update']);
                Route::delete('news/{id}', [NewsController::class, 'delete']);
                Route::delete('news/comment/{id}', [NewsController::class, 'deleteComment']);

                Route::post('article', [ArticleController::class, 'create']);
                Route::post('article/{id}', [ArticleController::class, 'update']);
                Route::delete('article/{id}', [ArticleController::class, 'delete']);
                Route::delete('article/comment/{id}', [ArticleController::class, 'deleteComment']);

                Route::delete('fund/{id}', [FundController::class, 'delete']);

                Route::get('users', [UserController::class, 'indexAll']);
                Route::get('user/block/{id}', [UserController::class, 'block']);

                Route::delete('forum/{id}', [ForumController::class, 'delete']);
                Route::post('forum', [ForumController::class, 'create']);

            }
        );
    }
);
