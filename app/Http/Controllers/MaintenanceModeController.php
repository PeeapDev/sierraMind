<?php
/**
 * @package CaptchaConfigurationController
* @author Mohamed <dev@peeap.com>
 * @contributor Sabbi <[dev@peeap.com]>
 * @contributor  Mamun <[dev@peeap.com]>
 * @created 20-05-2024
 * @modified 04-10-2024
 */
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class MaintenanceModeController extends Controller
{

    /**
     * Maintenance Mode Constructor
     *
     * @param Request $request
     * @return void
     */
    public function __construct(Request $request)
    {
        //this middleware should be for POST request only
        if ($request->isMethod('post')) {
            $this->middleware('checkForDemoMode')->only('enable');
        }
    }

    /**
     * Maintenance Mode Constructor
     *
     * @param Request $request
     * @return \Illuminate\Contracts\View\View
     */
    public function enable(Request $request)
    {
        $data = [
            'list_menu' => 'maintenance'
        ];

        if ($request->isMethod('post')) {

            if ($request->maintenance == 'true') {
                $secret = \Str::random(20);

                Artisan::call('down', ['--secret' => $secret]);

                \Session::flash('success', __('Maintenance mode successfully updated.'));

                return redirect('admin/maintenance-mode?bypass_key=' . $secret);

            } else {
                Artisan::call('up');
            }
        }

        if (app()->isDownForMaintenance()) {
            $maintenance = json_decode(file_get_contents(storage_path() . '/framework/down'), true);
            $data['secret'] = $maintenance['secret'];
        }

        return view('admin.maintenance.index', $data);
    }
}
