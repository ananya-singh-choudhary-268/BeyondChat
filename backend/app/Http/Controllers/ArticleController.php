<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;

class ArticleController extends Controller
{
    /**
     * Get all articles
     */
    public function index()
    {
        return response()->json(
            Article::orderBy('created_at', 'desc')->get()
        );
    }

    /**
     * Get latest BeyondChats article
     */
    public function latest()
    {
        return response()->json(
            Article::where('source', 'beyondchats')
                ->orderBy('created_at', 'desc')
                ->first()
        );
    }
}
