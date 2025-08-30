<?php

namespace App\Http\Controllers\Configuration;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Models\Configuration\ProductCategorie;

class ProductCategorieController extends Controller
{
            /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // This method should return a list of resources
        // You can implement the logic to fetch and return the list of branches (product_categories)
     $search = $request->get("search");

     $product_categorie = ProductCategorie::where("name","like","%".$search."%")->orderBy("id","desc")->paginate(25);
     //$users = User::where("name", "like", "%".$search."%")->orderBy("id", "desc")->paginate(25);

        return response()->json([
            "total"       => $product_categorie->total(),
            "product_categories" => $product_categorie->map(function ($categorie) {
                return [
                    "id"      =>    $categorie->id,
                    "name"    =>    $categorie->name,
                    "state"   =>    $categorie->state,
                    'imagen'  =>    $categorie->imagen? env("APP_URL")."storage/".$categorie->imagen: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                    "created_at" => $categorie->created_at->format('Y-m-d H:i A'),
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

        $is_exist_product_categories = ProductCategorie::where("name", $request->name)->first();

        if($is_exist_product_categories)
        {
            return response()->json([
                "message" => "El categoria del product ya existe",
                "status"  => false,
            ], 403);
        }

        if($request->hasFile('categorie_imagen')){
            $path = Storage::putFile("categorie", $request->file("categorie_imagen"));
            $request->add(['imagen' => $path]);//imagen es igual al del modelo
        }

        $request->validate([
            "name"    => "required|string|max:255",

        ]);

        $categorie = ProductCategorie::create(
            $request->all()
        );

        return response()->json([
            "message" => "categoria del producto creada correctamente",
            "status"  => true,
            "categories" => [
                "name"       => $categorie->name,
                "state"      => $categorie->state ?? 1,
                'imagen'     => $categorie->imagen? env("APP_URL")."storage/".$categorie->imagen: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                "created_at" => $categorie->created_at->format('Y-m-d H:i A'),
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
         $is_exist_categories = ProductCategorie::where("name", $request->name)
                                        ->where("id","<>",$id)->first();

        if($is_exist_categories) {
            return response()->json([
                "message" => "La categoria del producto ya existe",
                "status"  => false,
            ], 403);
        }
        $request->validate([
            "name"    => "required|string|max:255",

        ]);

        $categorie = ProductCategorie::findOrFail($id);

        if($request->hasFile('categorie_imagen')){
            //validamos si ya existe una imagen se remueve la ruta para actualizar la nueva
            if($categorie->imagen){
                Storage::delete($categorie->imagen);
            }

            $path = Storage::putFile("categorie", $request->file("categorie_imagen"));
            $request->add(['imagen' => $path]);//imagen es igual al del modelo
        }

        $categorie->update($request->all());

        return response()->json([
            "message" => "la categoria del producto creada correctamente",
            "status"  => true,
            "categories" => [
                "id"         => $categorie->id,
                "name"       => $categorie->name,
                "state"      => $categorie->state ?? 1,
                'imagen'     => $categorie->imagen? env("APP_URL")."storage/".$categorie->imagen: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                "created_at" => $categorie->created_at->format('Y-m-d H:i A'),
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $categorie= ProductCategorie::findOrFail($id);
         //validacion por prfoforma
         $categorie->delete();
         return response()->json([
             "message" => "la categoria del producto eliminada correctamente",
             "status"  => true,
         ]);
    }
}
