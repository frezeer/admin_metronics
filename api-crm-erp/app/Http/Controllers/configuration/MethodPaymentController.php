<?php

namespace App\Http\Controllers\Configuration;

use App\Http\Controllers\Controller;
use App\Models\Configuration\MethodPayment;
use Illuminate\Http\Request;

class MethodPaymentController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // This method should return a list of resources
        // You can implement the logic to fetch and return the list of branches (sucursales)
     $search = $request->get("search");

     $method_payments = MethodPayment::where("name","like","%".$search."%")->orderBy("id","desc")->paginate(25);

        return response()->json([
            "total"       => $method_payments->total(),
            "method_payments" => $method_payments->map(function ($method_pay) {
                return [
                    "id"                   => $method_pay->id,
                    "name"                 => $method_pay->name,
                    "state"                => $method_pay->state,
                    "method_payment_id"    => $method_pay->method_payment_id,
                    "method_payment"       => $method_pay->method_payment,
                    "method_payments"      => $method_pay->method_payments,
                    "created_at"           => $method_pay->created_at->format('Y-m-d H:i A'),
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
        $is_exist_payments = MethodPayment::where("name", $request->name)->first();

        if($is_exist_payments) {
            return response()->json([
                "message" => "El Metodo de Pago ya existe",
                "status"  => false,
            ], 403);
        }
        $request->validate([
            "name"    => "required|string|max:255",

        ]);

        $method_pay = MethodPayment::create(
            $request->all()
        );

        return response()->json([
            "message" => "Metodo de Pago creada correctamente",
            "status"  => true,
            "method_payment" => [
                "name"                    => $method_pay->name,
                "state"                   => $method_pay->state ?? 1,
                "created_at"              => $method_pay->created_at->format('Y-m-d H:i A'),
                "method_payment_id"       => $method_pay->method_payment_id,
                "method_payment"          => $method_pay->method_payment,
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
         $is_exist_payments = MethodPayment::where("name", $request->name)
                                        ->where("id","<>",$id)->first();

        if($is_exist_payments) {
            return response()->json([
                "message" => "El Metodo de pago ya existe",
                "status"  => false,
            ], 403);
        }
        $request->validate([
            "name"    => "required|string|max:255",

        ]);

        $method_payments = MethodPayment::findOrFail($id);
        $method_payments->update($request->all());

        return response()->json([
            "message" => "Metodo de Pago creada correctamente",
            "status"  => true,
            "method_payment" => [
                "id"         => $method_payments->id,
                "name"       => $method_payments->name,
                "state"      => $method_payments->state ?? 1,
                "created_at" => $method_payments->created_at->format('Y-m-d H:i A'),
                "method_payment_id" => $method_payments->method_payment_id,
                "method_payment"   => $method_payments->method_payment,
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $method_pay = MethodPayment::findOrFail($id);
         //validacion por prfoforma
         $method_pay->delete();
         return response()->json([
             "message" => "Metodo de Pago eliminada correctamente",
             "status"  => true,
         ]);
    }
}
