<?php
/**
 * @package DirectBankTransferProcessor
* @author peeap <pay.peeap@gmail.com>
 * @contributor peeap <[pay.peeap@gmail.com]>
 * @created 05-09-2024
 */

namespace Modules\DirectBankTransfer\Processor;

use Modules\DirectBankTransfer\Response\DirectBankTransferResponse;
use Modules\Gateway\Contracts\PaymentProcessorInterface;
use Modules\Gateway\Services\GatewayHelper;
use Modules\CashOnDelivery\Response\CashOnDeliveryResponse;

class DirectBankTransferProcessor implements PaymentProcessorInterface
{
    private $data;
    private $key;
    private $helper;

    /**
     * Undocumented function
     */
    public function __construct()
    {
        $this->helper = GatewayHelper::getInstance();
    }


    /**
     * Handles payment for direct bank transfer.
     *
     * @param \Illuminate\Http\Request
     * @return DirectBankTransferResponse
     */
    public function pay($request)
    {

        $this->data = $this->helper->getPurchaseData($this->key);

        $charge = [
            'status' => 'succeeded',
            'amount' => $this->data->total,
            "currency" => $this->data->currency_code,
        ];

        return new DirectBankTransferResponse($this->data, $charge);
    }
}
