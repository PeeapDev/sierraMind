<?php
/**
 * @package BlogCategory Model
  *@author peeap <dev@peeap.com>
 * @contributor mohamed <[dev@peeap.com]>
 * @created 29-09-2024
 */

namespace Modules\Blog\Http\Models;

use App\Models\Model;
use App\Traits\ModelTrait;

class BlogCategory extends Model
{
    use ModelTrait;

    /**
    * Relation with Blog model
    *
    * @return \Illuminate\Database\Eloquent\Relations\hasMany
    */
    public function blog()
    {
        return $this->hasMany('Modules\Blog\Http\Models\Blog', 'category_id');
    }
    /**
     * store
     * @param array $data
     * @return boolean
     */
    public function store($data = [])
    {
       if (parent::insertGetId($data)) {
           return true;
       }
       return false;
    }
   /**
     * Update
     * @param array $data
     * @param int $id
     * @return array
     */
    public function updateCategory($data = [])
    {
        $result = $this->where('id', $data['id']);
        if ($result->exists()) {
            $result->update($data);
            return true;
        }

        return false;
    }

    /**
     * Get All Blog Category
     *
     * @param string|null $name
     * @param string|null $status
     */
    public static function getAllBlogCategory($name = null, $status = null)
    {
        $blog = BlogCategory::select('id', 'name', 'status', 'created_at')->orderBy('created_at','desc');

        if (!empty($name)) {
            $blog->where('name', $name);
        }

        if (!empty($status)) {
            $blog->where('status', $status);
        }

        return $blog;
    }

}
