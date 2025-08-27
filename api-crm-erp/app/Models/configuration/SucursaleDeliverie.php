<?php

namespace App\Models\Configuration;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class SucursaleDeliverie extends Model
{

    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        "name",
        "address",
        "state",
        "sucursale_id"
    ];


    public function setCreatedAttribute($value){
        date_default_timezone_set('America/Mexico_City');
        $this->attributes['created_at'] = Carbon::now();
    }
    public function setUpdatedAttribute($value){
        date_default_timezone_set('America/Mexico_City');
        $this->attributes['updated_at'] = Carbon::now();
    }


}
