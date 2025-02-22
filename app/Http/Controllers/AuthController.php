<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required',
            'password' => 'required',
            'recaptcha_token' => 'required',
        ]);

        
        $secret = "6LfzjLAqAAAAANfkZJtdoYV1cmMzwH1JxZadUiL1";
        $out = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secret . '&response=' . $request->recaptcha_token);
        $out = json_decode($out);
        if ($out->success != true) {
            return response()->json("Captcha error", 500);
        }
        if ($out->score < 0.5) {
            return response()->json("The captcha blocked access", 403);
        }

        if (auth()->attempt($request->only('email', 'password'))) {
            if (auth()->user()->is_blocked)
                return response()->json('You are blocked', 403);
            $token = auth()->user()->createToken('token')->plainTextToken;
            $user = auth()->user();
            return response()->json(['token' => $token, 'user' => $user], '200');
        } else {
            return response()->json('Unauthorized', 403);
        }
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json('Logout successfully', 200);
    }

    public function create(Request $request)
    {
        $check = [
            'name' => 'required|regex:/^[а-яА-Яa-zA-Z0-9]+ +[а-яА-Яa-zA-Z0-9]+$/u|max:255',
            'number_phone' => 'required|regex:/^[+0-9]+$/u|max:15',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'password_repeat' => 'required|same:password',
            'accept' => 'accepted',
            'recaptcha_token' => 'required',
        ];
        $this->validate($request, $check);

        $secret = "6LfzjLAqAAAAANfkZJtdoYV1cmMzwH1JxZadUiL1";
        $out = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secret . '&response=' . $request->recaptcha_token);
        $out = json_decode($out);
        if ($out->success != true) {
            return response()->json("Captcha error", 500);
        }
        if ($out->score < 0.5) {
            return response()->json("The captcha blocked access", 403);
        }

        $user = User::create([
            'name' => $request->name,
            'number_phone' => $request->number_phone,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        auth()->login($user);
        $token = auth()->user()->createToken('token')->plainTextToken;
        return response()->json(['token' => $token, 'user' => $user], 200);
    }

    public function index(Request $request)
    {
        return $request->user();
    }
}


