<?php

namespace App\Models\Configuration;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MethodPayment extends Model
{
     use HasFactory;
     use SoftDeletes;

    protected $fillable = [
        "name",
        "method_payment_id",
        "state",

    ];


    public function setCreatedAttribute($value){
        date_default_timezone_set('America/Mexico_City');
        $this->attributes['created_at'] = Carbon::now();
    }
    public function setUpdatedAttribute($value){
        date_default_timezone_set('America/Mexico_City');
        $this->attributes['updated_at'] = Carbon::now();
    }
    //PADRES
    public function method_payment()
    {
        return $this->belongsTo(MethodPayment::class, "method_payment_id");
    }
    //Hijos
    public function method_payments()
    {
        return $this->hasMany(MethodPayment::class, "method_payment_id");
    }

}
