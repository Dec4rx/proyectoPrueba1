<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    //Guardar dirección
    public function store_address(Request $request)
    {
        $request->validate([
            'name' => 'required|regex:/^[a-zA-Z0-9\s\.]+$/|max:100',
            'user_id' => 'required'                
        ]);
        $address = new Address();
        $address->name = $request->name;
        $address->user_id = $request->user_id;
        $address->save();
    }

    //Mostrar direcciones
    public function show_addresses($user_id)
    {
        $address = Address::where('user_id', $user_id)->get();
        $a = [];
        foreach($address as $add){
            $a[] = [
                'id' => $add->id,
                'name' => $add->name
            ];
        }
        return response()->json($a);
    }

    //Eliminar dirección
    public function delete_address($id)
    {
        Address::find($id)->delete();
        return response('deleted');
    }


}
