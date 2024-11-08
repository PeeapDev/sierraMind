<?php

namespace Modules\CMS\Entities;

use App\Models\Model;
use App\Traits\ModelTrait;
use App\Traits\ModelTraits\hasFiles;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Page extends Model
{
    use hasFiles;

    /**
     * Fillable
     *
     * @var array
     */
    protected $fillable = ['name', 'slug', 'description', 'status', 'meta_title', 'default', 'type', 'meta_description', 'default'];

    /**
     * Scope Slug
     *
     * @param $query
     * @param string $slug
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSlug($query, $slug)
    {
        $query->where('slug', $slug);
    }

    /**
     * Scope Home
     *
     * @param $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeHome($query)
    {
        $query->where('type', 'home');
    }

    /**
     * Scope Default
     *
     * @param $query
     * @param int $flag
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeDefault($query, $flag = 1)
    {
        $query->where('default', $flag);
    }

    /**
     * Relation with Component model
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function components()
    {
        return $this->hasMany(\Modules\CMS\Entities\Component::class);
    }

    /**
     * Store Files
     *
     * @return void
     */
    public function storeFiles()
    {
        return $this->uploadFiles(
            [
                'isUploaded' => false,
                'isOriginalNameRequired' => true,
                'isMediaManager' => true,
                'thumbnail' => false,
                'url' => true,
                'pagebuilder' => true
            ]
        );
    }

    /**
     * Get the description attribute with <br> tags removed and non-HTML text wrapped in <p> tags.
     *
     * @param string $value The original description value.
     * @return string The modified description with <br> tags removed and non-tagged text wrapped in <p> tags.
     */
    public function getDescriptionAttribute($value): string
    {
        $value = preg_replace('/<br\s*\/?>/i', '', $value);

        // Split content into HTML tags and text segments
        $segments = preg_split('/(<[^>]+>)/', $value, -1, PREG_SPLIT_DELIM_CAPTURE);

        foreach ($segments as &$segment) {
            // If the segment is not an HTML tag, wrap it with <p> tags
            // We check if the segment is not an HTML tag using preg_match
            if (!preg_match('/^<[^>]+>$/', $segment)) {
                $text = trim($segment);
                if (!empty($text)) {
                    $segment = '<p>' . $text . '</p>';
                }
            }
        }
        
        return implode('', $segments);
    }
}
