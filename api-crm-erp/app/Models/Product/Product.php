<?php

namespace App\Models\Product;
use Carbon\Carbon;
use App\Models\Configuration\Unit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        "title",
        "sku",
        "imagen",
        "price_general",
        "description",
        "especifications",
        "max_discount",
        "min_discount",
        "is_gift",
        "umbral",
        "umbral_unit_id",
        "disponibilidad",
        "tiempo_de_abastecimiento",

    ];
    public function setCreatedAttribute($value){
        date_default_timezone_set('America/Mexico_City');
        $this->attributes['created_at'] = Carbon::now();
    }
    public function setUpdatedAttribute($value){
        date_default_timezone_set('America/Mexico_City');
        $this->attributes['updated_at'] = Carbon::now();
    }

    public function umbral_unit(){
        return $this->belongsTo(Unit::class,"umbral_unit_id");
    }

}
