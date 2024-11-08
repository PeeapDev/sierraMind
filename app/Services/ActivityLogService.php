<?php

/**
 * @package ActivityLogService
* @author Mohamed <dev@peeap.com>
 * @contributor Sabbi <[dev@peeap.com]>
 * @contributor  Mamun <[dev@peeap.com]>
 * @created 20-05-2024
 * @modified 04-10-2024
 */

namespace App\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Request;
use App\Services\UserAgentParserService;

class ActivityLogService
{
    protected $request = null;

    /**
     * Log Name
     * @var string|null $logName
     */
    protected $logName = null;

    /**
     * Log Description
     * @var string $description
     */
    protected $description = 'Not Provided';

    /**
     * Causer Model
     * @var Model|null $causerModel
     */
    protected $causerModel = null;

    /**
     * Subject Model
     * @var Model|null $subjectModel
     */
    protected $subjectModel = null;

    /**
     * Properties data to store in the log
     * @param array|null $properties
     */
    protected $properties = null;

    /**
     * Define constructor
     */
    public function __construct()
    {
        $this->request = Request::instance();
    }

    /**
     * Log login activities
     * @param string $status
     * @param string $message
     * @return void
     */
    public function userLogin(string $status = null, string $message = null)
    {
        $causerTypeArray = ['Incorrect', 'Deleted', 'Pending', 'Inactive'];
        $this->logName = 'USER LOGIN';
        $this->properties['status'] = $status;
        $this->setRequestProperties();

        if (in_array($message, $causerTypeArray)) {
            $this->causerModel = User::where('email', $this->request->email)->first();
            $this->description = $message . ' user';
        } else {
            $this->description = $message;
        }

        $this->storeActivity();
    }

    /**
     * Log logout activities
     * @param string $status
     * @param string $message
     * @param User $causerModel
     * @return void
     */
    public function userLogout(string $status = null, string $message = null, User $causerModel)
    {
        $this->logName = 'USER LOGOUT';
        $this->properties['status'] = $status;
        $this->setRequestProperties();
        $this->description = $message;
        $this->causerModel = $causerModel;

        $this->storeActivity();
    }

    /**
     * Set url, method, ip address and user agent as properties
     * @return void
     */
    public function setRequestProperties()
    {
        $this->properties['url'] = Request::fullUrl();
        $this->properties['method'] = Request::method();
        $this->properties['ip_address'] = Request::ip();
        $this->properties['user_agent'] = Request::header('user-agent');

        $UAP = new UserAgentParserService();
        $parsedUA = $UAP->parse($this->properties['user_agent']);

        $this->properties['browser'] = $parsedUA['browser'];
        $this->properties['browser_version'] = $parsedUA['version'];
        $this->properties['platform'] = $parsedUA['platform'];
    }

    /**
     * Store activity using package helper function
     * @return void
     */
    public function storeActivity()
    {
        $activity = activity($this->logName);

        if ($this->properties != null) {
            $activity->withProperties($this->properties);
        }
        if ($this->causerModel != null) {
            $activity->causedBy($this->causerModel);
        }
        if ($this->subjectModel != null) {
            $activity->performedOn($this->subjectModel);
        }

        $activity->log($this->description);                 //finally saves the activity
    }
}
