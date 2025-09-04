<?php

namespace App\Models\Configuration;


use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnitTransform extends Model
{
     use HasFactory;
     use SoftDeletes;

     protected $fillable = [
        "unit_id",
        "unit_to_id",
    ];


    public function setCreatedAttribute($value){
        date_default_timezone_set('America/Mexico_City');
        $this->attributes['created_at'] = Carbon::now();
    }
    public function setUpdatedAttribute($value){
        date_default_timezone_set('America/Mexico_City');
        $this->attributes['updated_at'] = Carbon::now();
    }

    /**
     * Get all of the comments for the UnitTransform
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function unit_to()
    {
        return $this->belongsTo(Unit::class,"unit_to_id");
    }
}
