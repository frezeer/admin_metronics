<?php

namespace App\Http\Controllers\Configuration;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Configuration\Unit;
use App\Models\Configuration\UnitTransform;

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

     $units = Unit::where("name","like","%".$search."%")->orderBy("id","asc")->paginate(25);
     //$users = User::where("name", "like", "%".$search."%")->orderBy("id", "desc")->paginate(25);

        return response()->json([
            "total"       => $units->total(),
            "unit"        => $units->map(function ($unit) {
                return [
                    "id"          =>    $unit->id,
                    "name"        =>    $unit->name,
                    "description" =>    $unit->description,
                    "state"       =>    $unit->state,
                    "transforms"  =>    $unit->transforms->map(function ($transform){
                        $transform->unit_to = $transform->unit_to;
                        return $transform;
                    }), //viene del controlador unit // function transforms(){}
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
                "message_text" => "La unidad ya existe",
                "status"  => false,
            ], 403);
        }

        $request->validate([

        ]);

        $unit = Unit::create(
            $request->all()
        );

        return response()->json([
            "message" => "unidad creada correctamente",
            "status"  => true,
            "unit" => [
                "name"         => $unit->name,
                "description"  => $unit->description,
                "transforms"   => $unit->transforms, //viene del controlador unit // function transforms(){}
                "state"        => $unit->state ?? 1,
                "created_at"   => $unit->created_at->format('Y-m-d H:i A'),
            ],
        ]);
    }


    public function add_transform(Request $request)
    {
         $is_exist_unit = UnitTransform::where("unit_id",     $request->unit_id)
                                        ->where("unit_to_id", $request->unit_to_id)
                                        ->first();

        if($is_exist_unit) {
            return response()->json([
                "message" => "La unidad que seleccionaste ya existe",
                "status"  => false,
            ], 403);
        }


        $unit = UnitTransform::create([
             "unit_id"    => $request->unit_id,
             "unit_to_id" => $request->unit_to_id,
        ]
        );

        return response()->json([
            "message" => 200,
            "status"  => true,
            "unit" => [
                "id"            => $unit->id,
                "unit_id"       => $unit->unit_id,
                "unit_to_id"    => $unit->unit_to_id,
                "unit_to"       => $unit->unit_to,
                "created_at"    => $unit->created_at->format('Y-m-d H:i A'),
            ],
        ]);

    }

    public function delete_transform($id)
    {

        $unit = UnitTransform::findOrFail($id);
        $unit->delete();

        return response()->json([
            "message" => 200,
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
                "message" => "La unidad ya existe",
                "status"  => false,
            ], 403);
        }
        $request->validate([
            "name"        => "required|string|max:255",

        ]);

        $unit = Unit::findOrFail($id);
        $unit->update($request->all());

        return response()->json([
            "message" => "unidad creada correctamente",
            "status"  => true,
            "unit" => [
                "id"            => $unit->id,
                "name"          => $unit->name,
                "description"   => $unit->description,
                "transforms"  =>    $unit->transforms->map(function ($transform){
                        $transform->unit_to = $transform->unit_to;
                        return $transform;
                    }), //viene del controlador unit // function transforms(){}
                "state"         => $unit->state ?? 1,
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
             "message" => "unidad eliminada correctamente",
             "status"  => true,
         ]);
    }
}
