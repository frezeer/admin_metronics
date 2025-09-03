<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
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
       if($request->hasFile("users_imagen")){
            $path = Storage::putFile("users",$request->file("users_imagen"));
            $request->merge(["avatar" => $path]);
       }

       if($request->password){
            $request->merge(["password", bcrypt($request->password)]);
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
    public function updatex(Request $request, string $id)
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
            $request->merge(["avatar" => $path]);
       }

       if($request->password){
            $request->merge(["password", bcrypt($request->password)]);
       }


       if($request->role_id != $user->role_id){
        //viejo Rol

        $role_old = Role::find($user->role_id);
            if ($role_old) {
                 $user->removeRole($role_old); // Solo si lo tiene
            }

        if (!$role_old) {
            return response()->json([
                'error' => true,
                'message_text' => 'Rol no encontrado'
            ], 404);
        }

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

    public function updateh(Request $request, string $id)
{
    // Validar que no haya otro usuario con ese correo
    $USER_EXIST = User::where("email", $request->email)
                      ->where("id", "<>", $id)
                      ->first();

    if ($USER_EXIST) {
        return response()->json([
            "message" => 403,
            "message_text" => "EL USUARIO YA EXISTE"
        ]);
    }

    // Buscar usuario a actualizar
    $user = User::findOrFail($id);

    // Procesar imagen si viene una nueva
    if ($request->hasFile("imagen")) {
        if ($user->avatar) {
            Storage::delete($user->avatar);
        }
        $path = Storage::putFile("users", $request->file("imagen"));
        $request->merge(["avatar" => $path]);
    }

    // Procesar contraseña si viene una nueva
    if ($request->filled("password")) {
        $request->merge(["password" => bcrypt($request->password)]);
    }

    // Verificar que el nuevo rol exista
    $newRole = Role::find($request->role_id);
    if (!$newRole) {
        return response()->json([
            'error' => true,
            'message_text' => 'El rol seleccionado no existe.'
        ], 404);
    }

    // Asignar nuevo rol y quitar el anterior automáticamente
    $user->syncRoles([$newRole]);

    // Actualizar demás datos del usuario
    $user->update($request->except(['role_id', 'imagen'])); // ya los procesamos

    // Preparar respuesta
    return response()->json([
        "message" => 200,
        "user" => [
            'surname'           => $user->surname,
            'full_name'         => $user->name . ' ' . $user->surname,
            'phone'             => $user->phone,
            'role_id'           => $newRole->id,
            'role'              => $newRole,
            'roles'             => $user->roles,
            'sucursal_id'       => $user->sucursal_id,
            'type_document'     => $user->type_document,
            'n_document'        => $user->n_document,
            'address'           => $user->address,
            'gender'            => $user->gender,
            'avatar'            => $user->avatar
                                    ? env("APP_URL") . "storage/" . $user->avatar
                                    : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            'created_format_at' => $user->created_at->format("Y-m-d h:i A"),
        ]
    ]);
}


public function update(Request $request, string $id)
    {
        //
        $USER_EXITS = User::where("email",$request->email)
                        ->where("id","<>",$id)->first();
        if($USER_EXITS){
            return response()->json([
                "message" => 403,
                "message_text" => "EL USUARIO YA EXISTE"
            ]);
        }

        $user = User::findOrFail($id);

        if($request->hasFile("users_imagen")){
            if($user->avatar){
                Storage::delete($user->avatar);
            }
            $path = Storage::putFile("users",$request->file("users_imagen"));
            $request->merge(["avatar" => $path]);
        }

        if($request->password){
            $request->merge(["password" => bcrypt($request->password)]);
        }

        if($request->role_id != $user->role_id){
            // EL VIEJO ROL
            $role_old = Role::findOrFail($user->role_id);
            $user->removeRole($role_old);

            // EL NUEVO ROL
            $role = Role::findOrFail($request->role_id);
            $user->assignRole($role);
        }

        $user->update($request->all());
        return response()->json([
            "message" => 200,
            "user" => [
                "id" => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                "surname" => $user->surname,
                "full_name" => $user->name.' '.$user->surname,
                "phone" =>  $user->phone,
                "role_id" => $user->role_id,
                "role" => $user->role,
                "roles" => $user->roles,
                "sucursal_id" => $user->sucursal_id,
                "type_document" => $user->type_document,
                "n_document" => $user->n_document,
                "gender" => $user->gender,
                "avatar" => $user->avatar ? env("APP_URL")."storage/".$user->avatar : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                "created_format_at" => $user->created_at->format("Y-m-d h:i A"),
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
