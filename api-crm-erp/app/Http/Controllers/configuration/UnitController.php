<?php

namespace App\Http\Controllers\Configuration;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Configuration\Unit;

class UnitController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // This method should return a list of resources
        // You can implement the logic to fetch and return the list of branches (units)
     $search = $request->get("search");

     $units = Unit::where("name","like","%".$search."%")->orderBy("id","desc")->paginate(25);
     //$users = User::where("name", "like", "%".$search."%")->orderBy("id", "desc")->paginate(25);

        return response()->json([
            "total"       => $units->total(),
            "unidades" => $units->map(function ($unit) {
                return [
                    "id"          =>    $unit->id,
                    "name"        =>    $unit->name,
                    "description" =>    $unit->description,
                    "state"       =>    $unit->state,
                    "transforms"  =>    $unit->transforms, //viene del controlador unit // function transforms(){}
                    "created_at"  =>    $unit->created_at->format('Y-m-d H:i A'),
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
        $is_exist_unit = Unit::where("name", $request->name)->first();

        if($is_exist_unit) {
            return response()->json([
                "message" => "La unit ya existe",
                "status"  => false,
            ], 403);
        }
        $request->validate([
            "name"    => "required|string|max:255",
            "description" => "required|string|max:255",
        ]);

        $unit = Unit::create(
            $request->all()
        );

        return response()->json([
            "message" => "unit creada correctamente",
            "status"  => true,
            "unidades" => [
                "name"         => $unit->name,
                "description"  => $unit->description,
                "transforms"   => $unit->transforms, //viene del controlador unit // function transforms(){}
                "state"        => $unit->state ?? 1,
                "created_at"   => $unit->created_at->format('Y-m-d H:i A'),
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
         $is_exist_unit = Unit::where("name", $request->name)
                                        ->where("id","<>",$id)->first();

        if($is_exist_unit) {
            return response()->json([
                "message" => "La unit ya existe",
                "status"  => false,
            ], 403);
        }
        $request->validate([
            "name"    => "required|string|max:255",
            "description" => "required|string|max:255",
        ]);

        $unit = Unit::findOrFail($id);
        $unit->update($request->all());

        return response()->json([
            "message" => "unit creada correctamente",
            "status"  => true,
            "unidades" => [
                "id"            => $unit->id,
                "name"        => $unit->name,
                "description"  => $unit->description,
                "transforms"   => $unit->transforms, //viene del controlador unit // function transforms(){}
                "state"        => $unit->state ?? 1,
                "created_at"    => $unit->created_at->format('Y-m-d H:i A'),
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $unit = Unit::findOrFail($id);
         //validacion por compras
         //producto
         $unit->delete();
         return response()->json([
             "message" => "unit eliminada correctamente",
             "status"  => true,
         ]);
    }
}
