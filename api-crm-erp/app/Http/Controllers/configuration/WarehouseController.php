<?php

namespace App\Http\Controllers\Configuration;

use App\Http\Controllers\Controller;
use App\Models\Configuration\Warehouse;
use Illuminate\Http\Request;

class WarehouseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // This method should return a list of resources
        // You can implement the logic to fetch and return the list of branches (sucursales)
     $search = $request->get("search");

     $warehouse = Warehouse::where("name","like","%".$search."%")->orderBy("id","desc")->paginate(25);
     //$users = User::where("name", "like", "%".$search."%")->orderBy("id", "desc")->paginate(25);

        return response()->json([
            "total"       => $warehouse->total(),
            "sucursales"  => $warehouse->map(function ($sucursal) {
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
        $is_exist_warehouse = Warehouse::where("name", $request->name)->first();

        if($is_exist_warehouse) {
            return response()->json([
                "message" => "La sucursal ya existe",
                "status"  => false,
            ], 403);
        }
        $request->validate([
            "name"    => "required|string|max:255",
            "address" => "required|string|max:255",
        ]);

        $warehouse = Warehouse::create(
            $request->all()
        );

        return response()->json([
            "message" => "Sucursal creada correctamente",
            "status"  => true,
            "sucursal" => [
                "name"       => $warehouse->name,
                "address"    => $warehouse->address,
                "state"      => $warehouse->state ?? 1,
                "created_at" => $warehouse->created_at->format('Y-m-d H:i A'),
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
         $is_exist_warehouse = Warehouse::where("name", $request->name)
                                        ->where("id","<>",$id)->first();

        if($is_exist_warehouse) {
            return response()->json([
                "message" => "La sucursal ya existe",
                "status"  => false,
            ], 403);
        }
        $request->validate([
            "name"    => "required|string|max:255",
            "address" => "required|string|max:255",
        ]);

        $warehouse = Warehouse::findOrFail($id);
        $warehouse->update($request->all());

        return response()->json([
            "message" => "Sucursal creada correctamente",
            "status"  => true,
            "sucursal" => [
                "id"         => $warehouse->id,
                "name"       => $warehouse->name,
                "address"    => $warehouse->address,
                "state"      => $warehouse->state ?? 1,
                "created_at" => $warehouse->created_at->format('Y-m-d H:i A'),
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $warehouse = Warehouse::findOrFail($id);
         //validacion por prfoforma
         $warehouse->delete();
         return response()->json([
             "message" => "Sucursal eliminada correctamente",
             "status"  => true,
         ]);
    }
}
