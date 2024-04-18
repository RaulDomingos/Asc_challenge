<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CSVController extends Controller
{
    public function upload(Request $request)
    {
        $file = $request->file('file');
        if ($file->isValid()) {
            $csv = fopen($file->getRealPath(), 'r');
            fgetcsv($csv);
            $campaign = $request->input('campaign_id');
            $existingClients = [];
            while (($line = fgetcsv($csv, 0, ';')) !== false) {
                $tel = $this->formatTel($line[3]);
                if($this->validateTel($tel)) {

                    $slices = explode('/', $line[7]);
                    $formatedDate = $slices[2] . '-' . $slices[1] . '-' . $slices[0];

                    $attributes = [
                        'first_name' => $line[0],
                        'second_name' => $line[1],
                        'email' => $line[2],
                        'phone' => $line[3],
                        'address' => $line[5],
                        'cep' => $line[6],
                        'birth_date' => $formatedDate,
                        'campaign_id' => $campaign
                    ];

                    try {
                        $client = Client::firstOrCreate($attributes);
                    } catch(\Exception $e) {
                        return response()->json([ 'error' => 'Erro ao criar o cliente: ' . $client->first_name . ' ' . $client->second_name], 500);
                    }

                } else {
                    return response()->json([ 'error' => 'Este arquivo possui um telefone invalido'], 500);
                }
            }
        } else {
            return response()->json([ 'error' => 'arquivo inválido'], 500);
        }

        return response()->json('Base cadastrada com sucesso!', 200);
    }

    private function formatTel($tel) {
        if (substr($tel, 0, 2) == '55') {
            $tel = substr($tel, 2);
        }
        if (strlen($tel) == 11) {
            $tel = '(' . substr($tel, 0, 2) . ') ' . substr($tel, 2, 5) . '-' . substr($tel, 7);
        } else if (strlen($tel) == 10) {
            $tel = '(' . substr($tel, 0, 2) . ') ' . substr($tel, 2, 4) . '-' . substr($tel, 6);
        }

        return $tel;
    }


    private function validateTel($tel) {
        $pattern = '/^\(\d{2}\) \d{4,5}-\d{4}$/';

        if (preg_match($pattern, $tel)) {
            return true;
        } else {
            return false;
        }
    }

}
