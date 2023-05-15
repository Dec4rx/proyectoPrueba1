<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use Illuminate\Http\Response;

class AuthController extends Controller
{//Controller para hacer usuarios y logearlos con Passport

    public function register(Request $request){
        $request->validate([
            'name' => 'required|alpha|max:100',
            'last_name' => 'required|alpha|max:100',
            'birth' => 'required|date_format:Y-m-d',
            'gender' => 'required',
            'phone' => 'required|max:10',
            'email' => 'required|email',
            'password' => ['required', Password::min(8)->mixedCase()->numbers()]
        ]);
        
        // if($request->fails()){
        //     return $this->sendError('Validation Error', $request->error());
        // }

        $user=User::create([
            'name'=>$request->name,
            'last_name'=>$request->last_name,
            'birth'=>$request->birth,
            'gender'=>$request->gender,
            'phone'=>$request->phone,
            'email'=>$request->email,
            'password'=>bcrypt($request->password)
        ]);
        
        $token = $user->createToken('LaravelAuthApp')->accessToken;
        return response()->json(['token' => $token, 'user' => $user], 200);
    }
    
    public function login(Request $request){
        
        if (Auth::attempt(['email'=>$request->email, 'password'=>$request->password])){
            /** @var \App\Models\MyUserModel $user **/
            $user = Auth::user();
            $responseArray = [];
            $responseArray['token'] = $user->createToken('MyApp')->accessToken;
            $responseArray['user'] = $user;
            return response()->json($responseArray, 200);
        } else {
            return response()->json(['error'=>'Unauthorised'], 203);
        }
    }

    public function getTaskList(){
        $data = User::all();
        $responseArray = [
            'status' =>'ok',
            'res'=>$data
        ];
        return response()->json(['results'=>$responseArray],200);
    }
}
