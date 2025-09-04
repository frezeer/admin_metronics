<?php

namespace App\Models\Configuration;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Unit extends Model
{
    use HasFactory;
    use SoftDeletes;

      protected $fillable = [
        "name",
        "description",
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

        /**
     * Get all of the comments for the UnitTransform
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function transforms()
    {
        return $this->hasMany(UnitTransform::class);
    }
}
