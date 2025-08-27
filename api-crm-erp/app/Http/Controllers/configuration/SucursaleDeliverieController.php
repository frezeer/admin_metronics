<?php

namespace App\Http\Controllers\Configuration;


use App\Models\Configuration\SucursaleDeliverie;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SucursaleDeliverieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // This method should return a list of resources
        // You can implement the logic to fetch and return the list of branches (sucursal_deliverie$sucursales_deliverie)
     $search = $request->get("search");

     $sucursales_deliverie = SucursaleDeliverie::where("name","like","%".$search."%")->orderBy("id","desc")->paginate(25);

        return response()->json([
            "total"       => $sucursales_deliverie->total(),
            "sucursales_deliverie" =>  $sucursales_deliverie->map(function ($sucursal) {
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
        $is_exist_sucursale = SucursaleDeliverie::where("name", $request->name)->first();

        if($is_exist_sucursale) {
            return response()->json([
                "message" => "La sucursalDelivieries ya existe",
                "status"  => false,
            ], 403);
        }
        $request->validate([
            "name"    => "required|string|max:255",
            "address" => "required|string|max:255",
        ]);

        $sucursale_deliverie = SucursaleDeliverie::create(
            $request->all()
        );

        return response()->json([
            "message" => "SucursalDeliveries Lugar de Entrega creada correctamente",
            "status"  => true,
            "sucursal_deliverie" => [
                "name"       => $sucursale_deliverie->name,
                "address"    => $sucursale_deliverie->address,
                "state"      => $sucursale_deliverie->state ?? 1,
                "created_at" => $sucursale_deliverie->created_at->format('Y-m-d H:i A'),
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
         $is_exist_sucursale = SucursaleDeliverie::where("name", $request->name)
                                        ->where("id","<>",$id)->first();

        if($is_exist_sucursale) {
            return response()->json([
                "message" => "La sucursalDeliveries ya existe",
                "status"  => false,
            ], 403);
        }
        $request->validate([
            "name"    => "required|string|max:255",
            "address" => "required|string|max:255",
        ]);

        $sucursale_deliverie = SucursaleDeliverie::findOrFail($id);
        $sucursale_deliverie->update($request->all());

        return response()->json([
            "message" => "SucursalDeliveries Lugar de entrega creada correctamente",
            "status"  => true,
            "sucursal_deliverie" => [
                "id"         => $sucursale_deliverie->id,
                "name"       => $sucursale_deliverie->name,
                "address"    => $sucursale_deliverie->address,
                "state"      => $sucursale_deliverie->state ?? 1,
                "created_at" => $sucursale_deliverie->created_at->format('Y-m-d H:i A'),
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $sucursale_deliverie = SucursaleDeliverie::findOrFail($id);
         //validacion por prfoforma
         $sucursale_deliverie->delete();
         return response()->json([
             "message" => "SucursalDeliveries Lugar de entrega eliminada correctamente",
             "status"  => true,
         ]);
    }
}
