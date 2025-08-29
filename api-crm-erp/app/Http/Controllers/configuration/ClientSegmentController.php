<?php

namespace App\Http\Controllers\Configuration;

use App\Http\Controllers\Controller;
use App\Models\Configuration\ClientSegment;
use Illuminate\Http\Request;

class ClientSegmentController extends Controller
{
        /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // This method should return a list of resources
        // You can implement the logic to fetch and return the list of branches (client_segment)
     $search = $request->get("search");

     $client_segment = ClientSegment::where("name","like","%".$search."%")->orderBy("id","desc")->paginate(25);
     //$users = User::where("name", "like", "%".$search."%")->orderBy("id", "desc")->paginate(25);

        return response()->json([
            "total"       => $client_segment->total(),
            "client_segment" => $client_segment->map(function ($cliente) {
                return [
                    "id"      =>    $cliente->id,
                    "name"    =>    $cliente->name,
                    "address" =>    $cliente->address,
                    "state"   =>    $cliente->state,
                    "created_at" => $cliente->created_at->format('Y-m-d H:i A'),
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
       // $is_exist_sucursale = Sucursale::where("name", $request->name)->first();

        $is_exist_client_segment = ClientSegment::where("name", $request->name)->first();

        if($is_exist_client_segment)
        {
            return response()->json([
                "message" => "El Segmento del cliente ya existe",
                "status"  => false,
            ], 403);
        }

        $request->validate([
            "name"    => "required|string|max:255",
            "address" => "required|string|max:255",
        ]);

        $client_segment = ClientSegment::create(
            $request->all()
        );

        return response()->json([
            "message" => "Segmento del cliente creada correctamente",
            "status"  => true,
            "client_segment" => [
                "name"       => $client_segment->name,
                "address"    => $client_segment->address,
                "state"      => $client_segment->state ?? 1,
                "created_at" => $client_segment->created_at->format('Y-m-d H:i A'),
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
         $is_exist_client_segment = ClientSegment::where("name", $request->name)
                                        ->where("id","<>",$id)->first();

        if($is_exist_client_segment) {
            return response()->json([
                "message" => "El Segmento del cliente ya existe",
                "status"  => false,
            ], 403);
        }
        $request->validate([
            "name"    => "required|string|max:255",
            "address" => "required|string|max:255",
        ]);

        $client_segment= ClientSegment::findOrFail($id);
        $client_segment->update($request->all());

        return response()->json([
            "message" => "Segmetno del cliente creada correctamente",
            "status"  => true,
            "client_segment" => [
                "id"         => $client_segment->id,
                "name"       => $client_segment->name,
                "address"    => $client_segment->address,
                "state"      => $client_segment->state ?? 1,
                "created_at" => $client_segment->created_at->format('Y-m-d H:i A'),
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $client_segment= ClientSegment::findOrFail($id);
         //validacion por prfoforma
         $client_segment->delete();
         return response()->json([
             "message" => "Sucursal eliminada correctamente",
             "status"  => true,
         ]);
    }
}
