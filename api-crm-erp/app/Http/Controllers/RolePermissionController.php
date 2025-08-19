<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RolePermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input("search");

        $roles = Role::with(["permissions"])->where("name", "like", "%".$search."%")->orderBy("id", "desc")->paginate(30);

        return response()->json([
            "total" => $roles->total(),
            "roles" => $roles->map(function ($rol) {
                $rol->permission_pluck  = $rol->permissions->pluck('name');
                $rol->created_format_at = $rol->created_at->format("Y-m-d h:i A");
                return $rol;
                }),
        ]);
    }


    public function store(Request $request)
    {
        // Verificar si ya existe un rol con el mismo nombre
        $IS_ROLE = Role::where("name", $request->name)->first();

        if ($IS_ROLE) {
            return response()->json([
                "message" => 403,
                "message_text" => "El rol ya existe", // Corregido: era "message_test"
            ]);
        }

        try {
            // Crear el rol
            $role = Role::create([
                "guard_name" => "api", // Corregido: era "guard-name" (con guión)
                "name"       => $request->name,
            ]);

            // Asignar permisos si existen
            if ($request->permissions && is_array($request->permissions)) {
                foreach ($request->permissions as $permission) {
                    $role->givePermissionTo($permission);
                }
            }

            // Recargar el rol con permisos
            $role = $role->fresh(['permissions']);

            return response()->json([
                "message" => 200,
                "message_text" => "Rol creado correctamente",
                "success" => true,
                "role" => [
                    "id" => $role->id,
                    "name" => $role->name,
                    "permissions" => $role->permissions,
                    "permission_pluck" => $role->permissions->pluck('name'),
                    "created_at" => $role->created_at->format("Y-m-d H:i A"),
                ],
            ]);

        } catch (\Exception $e) {
            return response()->json([
                "message" => 500,
                "message_text" => "Error al crear el rol: " . $e->getMessage(),
                "success" => false
            ], 500);
        }
    }

     public function stores(Request $request)
    {

     $IS_ROLE = Role::where("name",$request->name)->first();

     if($IS_ROLE) {
        return response()->json([
            "message" => 403,
            "message_test"  => "El rol ya existe",
        ]);
      }
        //[["id" => 1 , name => "egreso] , ["id" => 2 , name => "ingreso], ["id" => 1 , name => "close_caja"]]
        $role = Role::create([
           "guard-name" => "api",
           "name"       => $request->name,
        ]);

        foreach ($request->permissions as $key => $permission) {
            $role->givePermissionTo($permission);
        }

        return response()->json([
            "message" => 200,

            "role" => [
                "id"               => $role->id,
                "permission"       => $role->permissions,
                "permission_pluck" => $role->permissions->pluck('name'),
                "created_at"       => $role->created_at->format("Y-m-d H:i A"),
                "name"             => $role->name,
            ],
        ]);


        if($request->permissions) {
            $rol->syncPermissions($request->permissions);
        }

        return response()->json([
            "message" => "Rol creado correctamente",
            "status"  => true,
            "rol"     => $rol,
        ]);


    }


     public function update(Request $request, string $id)
{
    // Verificar si ya existe un rol con el mismo nombre (excluyendo el actual)
    $IS_ROLE = Role::where("name", $request->name)->where("id", "<>", $id)->first();

    if ($IS_ROLE) {
        return response()->json([
            "message" => 403,
            "message_text" => "El rol ya existe", // Corregido: era "message_test"
        ]);
    } // ← ESTA LLAVE FALTABA EN TU CÓDIGO

    // Buscar y actualizar el rol
    $role = Role::findOrFail($id);
    $role->update([
        'name' => $request->name // Solo actualizar el nombre específicamente
    ]);

    // Sincronizar permisos (corregido: era symlink)
    if ($request->permissions) {
        $role->syncPermissions($request->permissions);
    }

    // Recargar el rol con permisos
    $role = $role->fresh(['permissions']);

    return response()->json([
        "message" => 200,
        "message_text" => "Rol actualizado correctamente",
        "role" => [
            "id" => $role->id,
            "name" => $role->name,
            "permissions" => $role->permissions,
            "permission_pluck" => $role->permissions->pluck('name'),
            "created_at" => $role->created_at->format("Y-m-d h:i A"),
        ],
    ]);
}

    public function show(string $id)
    {
        //
    }


    public function destroy(string $id)
    {
        $role = Role::findOrFail($id);
        //la validacion del usuario admin se hace en el front
        $role->delete();

        return response()->json([
            "message" => 200,
        ]);
    }
}
