<?php

namespace App\Http\Controllers\Configuration;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Configuration\Provider;
use Illuminate\Support\Facades\Storage;

class ProviderController extends Controller
{
              /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // This method should return a list of resources
        // You can implement the logic to fetch and return the list of branches (product_provider)
     $search = $request->get("search");

     $provider = Provider::where("full_name","like","%".$search."%")->orderBy("id","desc")->paginate(25);
     //$users = User::where("full_name", "like", "%".$search."%")->orderBy("id", "desc")->paginate(25);

        return response()->json([
            "total"       => $provider->total(),
            "providers" => $provider->map(function ($_provider) {
                return [
                    "id"           =>    $_provider->id,
                    "full_name"    =>    $_provider->full_name,
                    "rfc"          =>    $_provider->rfc,
                    "address"      =>    $_provider->address,
                    "phone"        =>    $_provider->phone,
                    "email"        =>    $_provider->email,
                    "state"        =>    $_provider->state,
                    'imagen'       =>    $_provider->imagen? env("APP_URL")."storage/".$_provider->imagen: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                    "created_at"   =>    $_provider->created_at->format('Y-m-d H:i A'),
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
       // $is_exist_sucursale = Sucursale::where("full_name", $request->full_name)->first();

        $is_exist_product_provider = Provider::where("full_name", $request->full_name)->first();

        if($is_exist_product_provider)
        {
            return response()->json([
                "message" => "El Proveedor ya existe",
                "status"  => false,
            ], 403);
        }

        if($request->hasFile('provider_imagen')){
            $path = Storage::putFile("providers", $request->file("provider_imagen"));
            $request->merge(['imagen' => $path]);//imagen es igual al del modelo
        }

        $request->validate([
            "full_name"    => "required|string|max:255",
            "rfc"          => "required|string|max:255",
            "address"      => "required|string|max:255",
            "phone"        => "required|string|max:255",
            "email"        => "required|string|max:255",
            "state"        => "required|string|max:255 "
        ]);

        $_provider = Provider::create(
            $request->all()
        );

        return response()->json([
            "message" => "categoria del producto creada correctamente",
            "status"  => true,
            "providers" => [
                "full_name"  => $_provider->full_name,
                "rfc"        => $_provider->rfc,
                "address"    => $_provider->address,
                "phone"      => $_provider->phone,
                "email"      => $_provider->email,
                "state"      => $_provider->state,
                "state"      => $_provider->state ?? 1,
                'imagen'     => $_provider->imagen? env("APP_URL")."storage/".$_provider->imagen: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                "created_at" => $_provider->created_at->format('Y-m-d H:i A'),
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
         $is_exist_provider = Provider::where("full_name", $request->full_name)
                                        ->where("id","<>",$id)->first();

        if($is_exist_provider) {
            return response()->json([
                "message" => "La categoria del producto ya existe",
                "status"  => false,
            ], 403);
        }
        $request->validate([
            "full_name"    => "required|string|max:255",

        ]);

        $_provider = Provider::findOrFail($id);

        if($request->hasFile('provider_imagen')){
            //validamos si ya existe una imagen se remueve la ruta para actualizar la nueva
            if($_provider->imagen){
                Storage::delete($_provider->imagen);
            }

            $path = Storage::putFile("providers", $request->file("provider_imagen"));
            $request->merge(['imagen' => $path]);//imagen es igual al del modelo
        }

        $_provider->update($request->all());

        return response()->json([
            "message" => "El proveedor ha sido editado correctamente",
            "status"  => true,
            "providers" => [
                "full_name"  => $_provider->full_name,
                "rfc"        => $_provider->rfc,
                "address"    => $_provider->address,
                "phone"      => $_provider->phone,
                "email"      => $_provider->email,
                "state"      => $_provider->state,
                "state"      => $_provider->state ?? 1,
                'imagen'     => $_provider->imagen? env("APP_URL")."storage/".$_provider->imagen: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                "created_at" => $_provider->created_at->format('Y-m-d H:i A'),
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $_provider = Provider::findOrFail($id);
         //validacion por prfoforma
         $_provider->delete();
         return response()->json([
             "message" => "la categoria del producto eliminada correctamente",
             "status"  => true,
         ]);
    }
}
