<?php

/**
 * @package PageDataTable
 * @author peeap <dev@peeap.com>
 * @contributor peeap <[dev@peeap.com]>
 * @created 27-06-2024
 */

namespace Modules\CMS\DataTables;

use App\DataTables\DataTable;
use Yajra\DataTables\Facades\DataTables;
use Yajra\DataTables\Html\Builder as HtmlBuilder;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;
use Illuminate\Http\JsonResponse;
use Modules\CMS\Http\Models\Page;

class PageDataTable extends DataTable
{
    /*
    * DataTable Ajax
    *
    * @return JsonResponse
    */
    public function ajax(): JsonResponse
    {
        $pages = $this->query();

        return DataTables::eloquent($pages)
            ->addColumn('name', function ($pages) {
                return '<a href="' . route('page.edit', ['id' => $pages->id]) . '">' . ucfirst($pages->name) . '</a>';
            })
            ->addColumn('status', function ($pages) {
                return statusBadges(ucfirst($pages->status));
            })
            ->addColumn('type', function ($pages) {
                if (!$pages->type || $pages->type == 'page') {
                    return __('Page');
                } else if ($pages->type && $pages->default && $pages->type == 'home') {
                    return ucfirst($pages->type) . '<span class="badge btn-success text-white f-12 ml-2">' . __('Default') . '</span>';
                }
                return ucfirst($pages->type);
            })
            ->addColumn('created_at', function ($pages) {
                return $pages->format_created_at;
            })
            ->addColumn('action', function ($pages) {
                $edit = '<a title="' . __('Edit :x', ['x' => __('Page')]) . '" href="' . route('page.edit', ['id' => $pages->id]) . '" class="btn btn-xs btn-primary"><i class="feather icon-edit"></i></a>&nbsp';
                $view = '<a title="' . __('View page') . '" href="' . route('site.page', $pages->slug) . '" target="_blank" class="btn btn-xs btn-outline-warning"><i class="feather icon-eye"></i></a>&nbsp';
                $delete = '<form method="post" action="' . route('page.delete', ['id' => $pages->id]) . '" id="delete-Pages-' . $pages->id . '" accept-charset="UTF-8" class="display_inline">
                        ' . csrf_field() . '
                        <button title="' . __('Delete :x', ['x' => __('Page.')]) . '" class="btn btn-xs btn-danger" type="button" data-id=' . $pages->id . ' data-label="Delete" data-delete="Pages" data-bs-toggle="modal" data-bs-target="#confirmDelete" data-title="' . __('Delete :x', ['x' => __('Page')]) . '" data-message="' . __('Are you sure to delete this?') . '">
                        <i class="feather icon-trash-2"></i>
                        </button>
                        </form>';
                $str = '';

                if ($this->hasPermission(['Modules\CMS\Http\Controllers\CMSController@edit'])) {
                    $str .= $edit;
                }

                $str .= $view;

                if ($this->hasPermission(['Modules\CMS\Http\Controllers\CMSController@delete'])) {
                    $str .= $delete;
                }

                return $str;
            })
            ->rawColumns(['name', 'status', 'action', 'type'])
            ->make(true);
    }

    /*
    * DataTable Query
    *
    * @return QueryBuilder
    */
    public function query(): QueryBuilder
    {
        $pages = Page::get();

        return $this->applyScopes($pages);
    }

    /*
    * DataTable HTML
    *
    * @return HtmlBuilder
    */
    public function html(): HtmlBuilder
    {
        return $this->builder()
            ->addColumn(['data' => 'name', 'name' => 'name', 'title' => __('Name')])
            ->addColumn(['data' => 'status', 'name' => 'status', 'title' => __('Status')])
            ->addColumn(['data' => 'type', 'name' => 'type', 'title' => __('Type')])
            ->addColumn(['data' => 'created_at', 'name' => 'Crete', 'title' => __('Created At')])
            ->addColumn([
                'data' => 'action', 'name' => 'action', 'title' => __('Action'), 'width' => '5%',
                'visible' => $this->hasPermission(['Modules\CMS\Http\Controllers\CMSController@edit', 'Modules\CMS\Http\Controllers\CMSController@delete']),
                'orderable' => false, 'searchable' => false
            ])
            ->dom('Bfrtip')
            ->parameters(dataTableOptions());
    }
}
