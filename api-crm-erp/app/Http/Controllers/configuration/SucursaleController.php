<?php

namespace App\Http\Controllers\configuration;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\configuration\Sucursale;

class SucursaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // This method should return a list of resources
        // You can implement the logic to fetch and return the list of branches (sucursales)
     $search = $request->get("search");

     $sucursales = Sucursale::where("name","like","%".$search."%")->orderBy("id","desc")->paginate(25);
     //$users = User::where("name", "like", "%".$search."%")->orderBy("id", "desc")->paginate(25);

        return response()->json([
            "total"       => $sucursales->total(),
            "sucursales" => $sucursales->map(function ($sucursal) {
                return [
                    "id"      =>    $sucursal->id,
                    "name"    =>    $sucursal->name,
                    "address" =>    $sucursal->address,
                    "state"   =>    $sucursal->state,
                    "created_at" => $sucursal->created_at->format('Y-m-d H:i A'),
                ];
            }),
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $is_exist_sucursale = Sucursale::where("name", $request->name)->first();

        if($is_exist_sucursale) {
            return response()->json([
                "message" => "La sucursal ya existe",
                "status"  => false,
            ], 403);
        }
        $request->validate([
            "name"    => "required|string|max:255",
            "address" => "required|string|max:255",
        ]);

        $sucursale = Sucursale::create(
            $request->all()
        );

        return response()->json([
            "message" => "Sucursal creada correctamente",
            "status"  => true,
            "sucursal" => [
                "name"       => $sucursale->name,
                "address"    => $sucursale->address ?? 1,
                "state"      => $sucursale->state,
                "created_at" => $sucursale->created_at->format('Y-m-d H:i A'),
            ],
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
         $is_exist_sucursale = Sucursale::where("name", $request->name)
                                        ->where("id","<>",$id)->first();

        if($is_exist_sucursale) {
            return response()->json([
                "message" => "La sucursal ya existe",
                "status"  => false,
            ], 403);
        }
        $request->validate([
            "name"    => "required|string|max:255",
            "address" => "required|string|max:255",
        ]);

        $sucursale = Sucursale::findOrFail($id);
        $sucursale->update([$request->all()]);

        return response()->json([
            "message" => "Sucursal creada correctamente",
            "status"  => true,
            "sucursal" => [
                "id"         => $sucursale->id,
                "name"       => $sucursale->name,
                "address"    => $sucursale->address,
                "state"      => $sucursale->state ?? 1,
                "created_at" => $sucursale->created_at->format('Y-m-d H:i A'),
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $sucursale = Sucursale::findOrFail($id);
         //validacion por prfoforma
         $sucursale->delete();
         return response()->json([
             "message" => "Sucursal eliminada correctamente",
             "status"  => true,
         ]);
    }
}
