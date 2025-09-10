<?php

namespace App\Http\Controllers\Product;

use Illuminate\Http\Request;
use App\Models\Product\Product;
use App\Models\Configuration\Unit;
use App\Http\Controllers\Controller;
use App\Models\configuration\Sucursale;
use App\Models\Configuration\Warehouse;
use Illuminate\Support\Facades\Storage;
use App\Models\Configuration\ClientSegment;
use App\Models\Configuration\ProductCategorie;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // This method should return a list of resources
        // You can implement the logic to fetch and return the list of branches (products)
     $search = $request->get("search");

     $product = Product::where("title","like","%".$search."%")->orderBy("id","desc")->paginate(25);
     //$users = User::where("name", "like", "%".$search."%")->orderBy("id", "desc")->paginate(25);

        return response()->json([
            "total"       => $product->total(),
            "products"    => $product,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
       // $is_exist_sucursale = Sucursale::where("name", $request->name)->first();

        $is_exist_product = Product::where("title", $request->name)->first();

        if($is_exist_product)
        {
            return response()->json([
                "message" => 403,
                "message_text"    => "El nombre del producto ya existe"
            ]);
        }

        if($request->hasFile('product_imagen')){
            $path = Storage::putFile("product", $request->file("product_imagen"));
            $request->merge(['imagen' => $path]);//imagen es igual al del modelo
        }

        $request->validate([
            "name"    => "required|string|max:255",

        ]);

        $product = Product::create(
            $request->all()
        );

        return response()->json([
            "message" => 200,
            "message_text"    => "la categoria del producto creada correctamente",
        ]);
    }

       public function config(){
        return response()->json([
            "alamacenes"       => Warehouse::all(),
            "sucursales"       => Sucursale::all(),
            "segments_clients" => ClientSegment::all(),
            "categories"       => ProductCategorie::all(),
            "units"            => Unit::all(),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $product = Product::findOrFail($id);

        return response()->json([
            "product" =>  $product,

        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
         $is_exist_product = Product::where("title", $request->name)
                                        ->where("id","<>",$id)->first();

        if($is_exist_product) {
            return response()->json([
                "message" => "El Nombre del producto ya existe",
                "status"  => false,
            ], 403);
        }
        $request->validate([
            "title"    => "required|string|max:255",

        ]);

        $product = Product::findOrFail($id);

        if($request->hasFile('product_imagen')){
            //validamos si ya existe una imagen se remueve la ruta para actualizar la nueva
            if($product->imagen){
                Storage::delete($product->imagen);
            }

            $path = Storage::putFile("product", $request->file("product_imagen"));
            $request->merge(['imagen' => $path]);//imagen es igual al del modelo
        }

        $product->update($request->all());

        return response()->json([
            "message" => 200,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $product = Product::findOrFail($id);
         //validacion por proforma
         $product->delete();
         return response()->json([
             "message" => "la categoria del producto eliminada correctamente",
             "status"  => true,
         ]);
    }
}
