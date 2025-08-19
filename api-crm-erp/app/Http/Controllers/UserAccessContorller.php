<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class UserAccessContorller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get("search");

        $users = User::where("name", "like", "%".$search."%")->orderBy("id", "desc")->paginate(25);

        return response()->json([
            "total" => $users->total(),
            "users" => $users->map(function($user){ //es la propiedad que usa el response de listUsers
                return [
                'id'                => $user->id,
                'name'              => $user->name,
                'surname'           => $user->surname,
                'full_name'         => $user->name.' '.$user->surname,
                'email'             => $user->email,
                'phone'             => $user->phone,
                'role_id'           => $user->role_id,
                'role'              => $user->role,
                'roles'             => $user->roles,
                'sucursal_id'       => $user->sucursal_id,
                'type_document'     => $user->type_document,
                'n_document'        => $user->n_document,
                'address'           => $user->address,
                'gender'            => $user->gender,
                'avatar'            => $user->avatar? env("APP_URL")."storage/".$user->avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                'created_format_at' => $user->created_at->format("Y-m-d h:i A"),
                ];
            }),
          ]);
    }

    public function config(){
        return response()->json([
            "roles" => Role::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $USER_EXIST = User::where("email", $request->email)->first();

        //Log::class($USER_EXIST);

        if($USER_EXIST){
            return response()->json([
                   "message" => 403,
                   "message_tex" => "EL USUARIO YA EXISTE"
            ]);
       }
       if($request->hasFile("imagen")){
            $path = Storage::putFile("users",$request->file("imagen"));
            $request->request->add(["avatar" => $path]);
       }

       if($request->password){
            $request->request->add(["password", bcrypt($request->password)]);
       }

       $role = Role::findOrFail($request->role_id);
       $user = User::create($request->all());
       $user->assignRole($role);
       return response()->json([
            "message" => 200,
             "user" => [
                'surname'           => $user->name,
                'full_name'         => $user->name.' '.$user->surname,
                'phone'             => $user->phone,
                'role_id'           => $user->role_id,
                'role'              => $user->role,
                'roles'             => $user->roles,
                'sucursal_id'       => $user->sucursal_id,
                'type_document'     => $user->type_document,
                'n_document'        => $user->n_document,
                'address'           => $user->address,
                'gender'            => $user->gender,
                'avatar'            => $user->avatar? env("APP_URL")."storage/".$user->avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                'created_format_at' => $user->created_at->format("Y-m-d h:i A"),
                ]
       ]);

     }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
          $USER_EXIST = User::where("email", $request->email)
                            ->where("id","<>",$id)->first();
        if($USER_EXIST){
            return response()->json([
                   "message" => 403,
                   "message_tex" => "EL USUARIO YA EXISTE"
            ]);
       }


       $user = User::findOrFail($id);

       if($request->hasFile("imagen")){
        if($user->avatar){
            Storage::delete($user->avatar);
        }
            $path = Storage::putFile("users",$request->file("imagen"));
            $request->request->add(["avatar" => $path]);
       }

       if($request->password){
            $request->request->add(["password", bcrypt($request->password)]);
       }


       if($request->role_id != $user->role_id){
        //viejo Rol
        $role_old = Role::findOrFail($user->role_id);
        $user->removeRol($role_old);
        //nuevo Rol
        $role = Role::findOrFail($request->role_id);
        $user->assignRole($role);
       }
       $user->update($request->all());

       //$user = User::create($request->all());

       return response()->json([
            "message" => 200,
             "user" => [
                'surname'           => $user->name,
                'full_name'         => $user->name.' '.$user->surname,
                'phone'             => $user->phone,
                'role_id'           => $user->role_id,
                'role'              => $user->role,
                'roles'             => $user->roles,
                'sucursal_id'       => $user->sucursal_id,
                'type_document'     => $user->type_document,
                'n_document'        => $user->n_document,
                'address'           => $user->address,
                'gender'            => $user->gender,
                'avatar'            => $user->avatar? env("APP_URL")."storage/".$user->avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                'created_format_at' => $user->created_at->format("Y-m-d h:i A"),
                ]
       ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user  = User::findOrFail($id);
        $user->delete();
        if($user->avatar){
            Storage::delete($user->avatar);
        }
        return response()->json([
            "message" => 200,

        ]);
    }
}
